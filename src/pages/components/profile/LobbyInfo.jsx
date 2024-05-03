import React, { useState } from "react";
import useAuthHeaders from "../../../utils/useAuthHeaders";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";
import UsersModal from "./UsersModal";
import GroupModal from "./GroupModal";

const LobbyInfo = ({ lobbyInfo, userCur, createUserChat, setPage }) => {
  const [lobbyUsers, setLobbyUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUserIsOpen, setIsOpenModaluser] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = useAuthHeaders();
  const customStyles = {
    content: {
      position: "absolute",
      top: "-1px",
      bottom: "-2px",
      right: "-2px",
      left: "auto",
      width: "400px",
      backgroundColor: "#232428",
      padding: "0px",
      borderRadius: "12px 0 0 12px",
    },
  };

  const fetchLobbyUsers = async (lobbyId) => {
    setIsOpen(true);
    const response = await fetch(
      `https://be-course-1d3f5a338434.herokuapp.com/api/lobby/${lobbyId}/users`,
      authHeaders
    );
    const data = await response.json();
    setLobbyUsers(data);
  };

  const removeUser = async (userId, nick, lobbyId) => {
    const nickname = nick;
    const response = await fetch(
      `https://be-course-1d3f5a338434.herokuapp.com/api/lobby/${lobbyId}/remove-user/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    alert(`${nickname} was deleted from the ${lobbyInfo.info?.name}`);

    fetchLobbies();
  };

  const getDeletedFromLobby = async (lobbyId, userId) => {
    const response = await fetch(
      `https://be-course-1d3f5a338434.herokuapp.com/delete/lobby/${lobbyId}/user/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert(`you deleted lobby`);
    fetchLobbies();
  };

  function closeModal() {
    setIsOpen(false);
  }
  function closeUserModal() {
    setIsOpenModaluser(false);
  }
  const getSingleUser = (user) => {
    setModalUser(user);
    setIsOpenModaluser(true);
  };
  const createChat = () => {
    setPage("chats");
    createUserChat(modalUser);
  };

  return (
    <div>
      {lobbyInfo.length == 0 && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl text-center px-1 bg-gray-700 rounded-lg">
            Select a lobby to start messaging
          </p>
        </div>
      )}

      {lobbyInfo.info && (
        <div className="bg-[#202C33] h-20 text-2xl flex items-center justify-between px-[7%]">
          <div className="flex items-center gap-5">
            <div className="py-2 px-3.5 bg-[#6a7175] w-fit rounded-full">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl">{lobbyInfo.info?.name} </span>
              <span className="text-sm">
                {lobbyInfo.info?.count === "1"
                  ? `${lobbyInfo.info.count} user`
                  : `${lobbyInfo.info.count} users`}
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            {lobbyInfo.info?.admin_id === userCur.user[0]?.id ? (
              <i
                className="fa-solid fa-trash hover:text-gray-500"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Delete chat"
                onClick={() =>
                  getDeletedFromLobby(lobbyInfo.info?.id, userCur.user[0]?.id)
                }
              ></i>
            ) : (
              <i
                className="fa-solid fa-circle-minus hover:text-gray-500"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Quit chat"
                onClick={() =>
                  getDeletedFromLobby(lobbyInfo.info?.id, userCur.user[0]?.id)
                }
              ></i>
            )}
            <i
              data-tooltip-id="my-tooltip"
              data-tooltip-content="See users"
              className="fa-solid fa-users hover:text-gray-500"
              onClick={() => fetchLobbyUsers(lobbyInfo.info.id)}
            ></i>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-[#232428] px-6 pb-10   text-white flex flex-col  ">
          <i
            className="fa-solid fa-xmark self-end mb-6 mt-2 text-3xl"
            onClick={closeModal}
          ></i>
          <div className="bg-[#111214] rounded-lg p-2  px-4">
            <h2 className="text-2xl mb-4 text-center">
              {lobbyInfo.info?.count === "1"
                ? `${lobbyInfo.info?.count} user`
                : `${lobbyInfo.info?.count} users`}
            </h2>
            <ul>
              {lobbyUsers.users?.map((user, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-6 text-[#9CA3AF] text-lg mb-3"
                >
                  <div
                    className="flex items-center justify-start gap-6"
                    onClick={
                      lobbyInfo.info?.admin_id === userCur.user[0]?.id &&
                      userCur.user[0]?.id !== user.id
                        ? () => getSingleUser(user)
                        : null
                    }
                  >
                    <div className="py-2.5 px-4 bg-[#6a7175] w-fit rounded-full">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <p>{user.nickname}</p>
                  </div>

                  {lobbyInfo.info?.admin_id === userCur.user[0]?.id &&
                  userCur.user[0]?.id !== user.id ? (
                    <button
                      className="text-sm
                    bg-red-800 h-fit rounded-md px-4" py-2
                      onClick={() =>
                        removeUser(user.id, user.nickname, lobbyInfo.info?.id)
                      }
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      {modalUser && (
        <UsersModal
          createChat={createChat}
          closeModal={closeUserModal}
          modalIsOpen={modalUserIsOpen}
          modalUser={modalUser}
          setShowModal={setShowModal}
        />
      )}

      {showModal && (
        <GroupModal uId={modalUser.id} uNick={modalUser.nickname} />
      )}
    </div>
  );
};

export default LobbyInfo;

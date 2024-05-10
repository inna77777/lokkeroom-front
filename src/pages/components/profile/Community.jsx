import React, { useState, useEffect } from "react";
import GroupModal from "./GroupModal";
import UsersModal from "./UsersModal";
import { Tooltip } from "react-tooltip";

const Community = ({
  community,
  user,
  setPage,
  createUserChat,
  fetchLobbies,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [group, setGroup] = useState("users");
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredLobbies, setFilteredLobbies] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (group === "users") {
      const filteredUsers = community.users.filter((user) =>
        user.nickname.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
    if (group === "lobbies") {
      const filteredLobbies = community.lobbies.filter((lobby) =>
        lobby.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredLobbies(filteredLobbies);
    }
  }, [searchInput, group, community.users, community.lobbies]);

  const searchCommunity = (e) => {
    setSearchInput(e.target.value);
  };

  const addUserToTheLobby = async (uId, lobbyId) => {
    const response = await fetch(
      `https://be-course-1d3f5a338434.herokuapp.com/api/lobby/${lobbyId}/add-user/${uId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
  };

  const getSingleUser = (user) => {
    setModalUser(user);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
    setShowModal(false);
  }

  const createChat = () => {
    setPage("chats");
    createUserChat(modalUser);
  };

  return (
    <div className="h-screen w-full bg-[#111B21] ">
      <form action="" className=" py-2 my-3 flex justify-center w-full">
        <input
          type="search"
          placeholder="Find your friend"
          name=""
          id=""
          onChange={(e) => searchCommunity(e)}
          className="self-center rounded h-12 bg-[#2A3942] focus:outline-none placeholder:bg-[#2A3942] placeholder:text-xl pl-2 text-white  placeholder:pb-2 placeholder:pl-2 w-5/6"
        />
        <button
          type="submit"
          className="bg-[#2A3942] ml-2 px-5 rounded h-12 text-[#9CA3AF] text-xl hover:bg-cyan-500 hover:text-white cursor-pointer"
        >
          Search
        </button>
      </form>
      <div className="w-full flex py-3  mb-5 justify-center text-3xl gap-10 text-white">
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Find user"
          className={`fa-solid fa-user-secret hover:text-cyan-200 cursor-pointer ${
            group === "users" ? "" : "text-gray-400"
          }`}
          onClick={() => setGroup("users")}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Find lobby"
          className={`fa-solid fa-users-line hover:text-cyan-200 cursor-pointer ${
            group === "lobbies" ? "" : "text-gray-400"
          }`}
          onClick={() => setGroup("lobbies")}
        ></i>
      </div>

      <ul className="px-[4%]">
        {group === "users" &&
          filteredUsers.map((user, index) => (
            <li
              key={index}
              className="flex justify-between items-center hover:text-cyan-200 cursor-pointer text-gray-400"
              onClick={() => getSingleUser(user)}
            >
              <div className="flex items-center gap-3 my-1">
                <div className="py-4 px-5 bg-[#6a7175] w-fit rounded-full">
                  <i className="fa-solid fa-user"></i>
                </div>
                <p className=" text-lg ">{user.nickname}</p>
              </div>

              <p className="text-sm">
                View details
              </p>
            </li>
          ))}
        {group === "lobbies" &&
          filteredLobbies.map((lobby, index) => (
            <li key={index} className="flex justify-between items-center my-2">
              <div className="flex items-center gap-3 my-1">
                <div className="py-4 px-5 bg-[#6a7175] w-fit rounded-full">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white text-lg">{lobby.name}</p>
                  <p className="text-white text-xs">
                    {lobby.user_count === "1"
                      ? `${lobby.user_count} user`
                      : `${lobby.user_count} users`}
                  </p>
                </div>
              </div>

              <button
                className="text-white text-sm bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded h-fit"
                onClick={() => addUserToTheLobby(user.user[0]?.id, lobby.id)}
              >
                Join
              </button>
            </li>
          ))}
      </ul>
      
      {modalUser && (
        <UsersModal
          createChat={createChat}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
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

export default Community;

import React, { useState } from "react";
import Modal from "react-modal";
import useAuthHeaders from "../../../utils/useAuthHeaders";

const GroupModal = ({ uId, uNick }) => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [lobbies, setLobbies] = useState([]);
  const authHeaders = useAuthHeaders();
  const token = localStorage.getItem("token");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "200px",
      borderRadius: "12px",
    },
  };
  const fetchLobbies = async () => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/user/lobbies",
      authHeaders
    );
    const data = await response.json();
    setLobbies(data);
  };
  fetchLobbies();

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
    alert(`${uNick} was added to the lobby`);
    setIsOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {lobbies && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="bg-[#232428] px-3 pb-5  text-white flex flex-col ">
            <i className="fa-solid fa-xmark self-end mb-3 mt-1" onClick={closeModal}></i>
            <div className="bg-[#111214] rounded-8 p-1">
              <h2 className="text-base mb-2 capitalize">add {uNick} to: </h2>
              <p className="text-sm mb-2">Your lobbies:</p>
              <ul>
                {lobbies.lobbies?.map((lobby, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-[#9CA3AF] text-xs mb-1"
                  >
                    <p>{lobby.name}</p>
                    <div onClick={() => addUserToTheLobby(uId, lobby.id)}>
                      <i className="fa-solid fa-plus text-cyan-600 text-sm"></i>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GroupModal;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Sidebar = ({ fetchChats, fetchLobbies, fetchCommunity, openModal }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col justify-between items-center pt-3 pb-3 px-3 text-gray-400 bg-[#202c33] text-xl h-screen">
      <div className="flex flex-col gap-3 w-full">
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Chats"
          className="fa-brands fa-rocketchat"
          onClick={fetchChats}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Lobbies"
          className="fa-solid fa-user-group"
          onClick={fetchLobbies}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Community"
          className="fa-solid fa-people-group"
          onClick={fetchCommunity}
        ></i>
        <hr />
      </div>
      <div>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Logout"
          className="fa-solid fa-right-from-bracket"
          onClick={() => logout()}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Your info"
          className="fa-solid fa-user my-2"
          onClick={openModal}
        ></i>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Sidebar;

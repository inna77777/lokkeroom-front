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
    <div className="flex flex-col justify-between items-center pt-3 pb-3 px-3 text-gray-400 bg-[#202c33] text-4xl h-screen">
      <div className="flex flex-col gap-7 w-full">
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Chats"
          data-placement="right"
          className="fa-brands fa-rocketchat hover:text-cyan-200 cursor-pointer"
          onClick={fetchChats}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Lobbies"
          data-placement="right"
          className="fa-solid fa-user-group hover:text-cyan-200 cursor-pointer"
          onClick={fetchLobbies}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Community"
          data-placement="right"
          className="fa-solid fa-people-group hover:text-cyan-200 cursor-pointer"
          onClick={fetchCommunity}
        ></i>
        <hr />
      </div>
      <div>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Logout"
          className="fa-solid fa-right-from-bracket hover:text-red-500 cursor-pointer"
          onClick={() => logout()}
        ></i>
        <i
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Your info"
          className="fa-solid fa-user my-2 hover:text-cyan-200 cursor-pointer"
          onClick={openModal}
        ></i>
      </div>
    </div>
  );
};

export default Sidebar;

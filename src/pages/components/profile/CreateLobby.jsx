import React, { useState } from "react";

const CreateLobby = ({ setPage, fetchLobbies }) => {
  const [privateChecked, setPrivateChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setPrivateChecked(event.target.checked);
  };

  const createLobby = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    let lobbyName = e.target[0].value;

    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/lobbies/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: lobbyName, private: privateChecked }),
      }
    );
    const data = await response.json();
    e.target[0].value = "";

    alert("Lobby was created");
    setPage("lobbies");
    fetchLobbies()
  };
  return (
      <form
        action=""
        className="py-2 flex flex-col justify-center items-center w-full mt-[10%] gap-2"
        onSubmit={(e) => createLobby(e)}
      >
        <label htmlFor="lobbyName" className="text-base">Name Lobby</label>
        <input
          type="text"
          name="lobbyName"
          placeholder="Name your lobby"
          className="rounded pb-1 pl-3 bg-[#2A3942] focus:outline-none placeholder:bg-[#2A3942] placeholder:text-[10px]  placeholder:pb-2 placeholder:pl-2 w-5/6"
        />
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="private"
            id="private"
            checked={privateChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="private" className="text-sm">
            Private
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#2A3942] hover:bg-gray-700 ml-1 px-2 rounded h-7 text-[8px] w-fit"
        >
          Create Lobby
        </button>
      </form>
  );
};

export default CreateLobby;

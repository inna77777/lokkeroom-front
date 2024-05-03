import React, { useState, useEffect } from "react";
import moment from "moment";
import LobbyMess from "./LobbyMess";
import useAuthHeaders from "../../../utils/useAuthHeaders";
import LobbyInfo from "./LobbyInfo";
import CreateLobby from "./CreateLobby";

const LobbiesList = ({
  lobbies,
  user,
  page,
  setPage,
  fetchLobbies,
  createUserChat,
}) => {
  const [lobby, setLobby] = useState(null);
  const [lobbyMessages, setLobbyMessages] = useState([]);
  const [lobbyInfo, setLobbyInfo] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredLobbies, setFilteredLobbies] = useState([]);

  // console.log(user);

  const authHeaders = useAuthHeaders();

  const fetchMessages = async (lobbyId) => {
    setPage("lobbies");
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/lobby/" + lobbyId,
      authHeaders
    );
    const response2 = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/lobby/info/" + lobbyId,
      authHeaders
    );

    const data = await response.json();
    const data2 = await response2.json();
    setLobbyMessages(data);

    setLobbyInfo(data2);
    setLobby(lobbyId);
  };

  useEffect(() => {
    const filteredResult = lobbies.lobbies.filter((lobby) =>
      lobby.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredLobbies(filteredResult);
  }, [searchInput, lobbies]);

  const searchLobby = (e) => {
    setSearchInput(e.target.value);
  };
  // className = "w-full h-screen flex";
  return (
    <div className="flex w-full">
      <div className="bg-[#111B21] w-4/12 flex flex-col px-2 py-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="">Lobbies</h2>
          <i
            className="fa-solid fa-plus"
            onClick={() => setPage("createLobby")}
          ></i>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="   🔍  search"
          onChange={(e) => searchLobby(e)}
          className="self-center w-full rounded mt-2 pb-1 pl-3 h-4 mb-5 bg-[#202C33] focus:outline-none placeholder:bg-[#202C33] placeholder:text-[10px]  placeholder:pb-2	"
        />
        {lobbies.lobbies?.length === 0 && <p>You don't have any lobbies.</p>}
        {lobbies.lobbies?.length > 0 && (
          <ul>
            {filteredLobbies.map((lobby, index) => {
              return (
                <li
                  key={index}
                  onClick={() => fetchMessages(lobby.id)}
                  className="flex justify-between items-center my-2"
                >
                  <p className="text-sm">{lobby.name}</p>
                  {lobby.latest_message_time ? (
                    <p className="text-[6px]">
                      {moment(lobby.latest_message_time).isSame(moment(), "day")
                        ? moment(lobby.latest_message_time).format("HH:mm")
                        : moment(lobby.latest_message_time).format("D.MM.YY")}
                    </p>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {page === "lobbies" && (
        <div className="self-end bg-[#0B141A]  flex flex-col justify-between h-screen w-8/12">
          {lobbyInfo && (
            <LobbyInfo
              setPage={setPage}
              lobbyInfo={lobbyInfo}
              userCur={user}
              createUserChat={createUserChat}
            />
          )}
          {lobbyMessages && (
            <LobbyMess
              fetchMessages={fetchMessages}
              lobbyMessages={lobbyMessages}
              lobbyInfo={lobbyInfo}
              user={user}
              lobby={lobby}
            />
          )}
        </div>
      )}
      {page === "createLobby" && (
        <div className="self-end bg-[#0B141A] h-screen w-8/12">
          <CreateLobby setPage={setPage} fetchLobbies={fetchLobbies} />
        </div>
      )}
    </div>
  );
};

export default LobbiesList;

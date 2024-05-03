import React, { useState, useEffect } from "react";
import moment from "moment";
import NewMessForm from "./NewMessForm";
import useAuthHeaders from "../../../utils/useAuthHeaders";
import { Tooltip } from "react-tooltip";

const Chats = ({ chats, user, newChatUser = null }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const authHeaders = useAuthHeaders();
  const [searchInput, setSearchInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [filteredChats, setFilteredChats] = useState([]);
  const token = localStorage.getItem("token");

  const [form, setForm] = useState("sendMess");
  const [messValue, setMessValue] = useState("");
  const [messId, setMessId] = useState("");
  const [at, setAt] = useState("");

  useEffect(() => {
    if (newChatUser) {
      const userId = newChatUser.id;
      fetchChatMessages(
        chats.chats?.find((chat) => chat.id === userId)?.chat_id ?? null,
        userId
      );
    }
  }, [newChatUser]);

  const fetchChatMessages = async (chatId, userId) => {
    setChatId(chatId);
    if (chatId) {
      const response = await fetch(
        "https://be-course-1d3f5a338434.herokuapp.com/api/chat/" + chatId,
        authHeaders
      );
      const data = await response.json();
      setChatMessages(data);
    }
    const response2 = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/chat/friend/" + userId,
      authHeaders
    );
    const data2 = await response2.json();
    setChatUser(data2);
  };

  const sendNewMess = async (content) => {
    let chatFriendId = chatUser.user?.id;
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/chat/user/" +
        chatFriendId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: content }),
      }
    );
    const data = await response.json();
    console.log(data);
    fetchChatMessages(data.content?.chat_id, chatUser.user?.id);
  };
  useEffect(() => {
    const filteredResult = chats.chats.filter((chat) =>
      chat.nickname.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredChats(filteredResult);
  }, [searchInput, chats]);

  const searchChat = (e) => {
    setSearchInput(e.target.value);
  };

  const setEditMess = async (id, content, at) => {
    setMessValue(content);
    setMessId(id);
    setAt(at);
    setForm("modifyMess");
  };

  const updateMess = async (id, content, at) => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/chat/message/" + messId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: content }),
      }
    );

    const data = await response.json();
    console.log(data);
    setMessValue("");
    fetchChatMessages(chatId, chatUser.user.id);
  };

  const deleteMessage = async (messId) => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/chat/messages/" +
        messId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert("mess was deleted");
    fetchChatMessages(chatId, chatUser.user.id);

    // window.location.reload();
  };

  const reset = () => {
    setMessValue("");
  };
  const deleteChat = async (chatId) => {
    const response = await fetch(
      `https://be-course-1d3f5a338434.herokuapp.com/delete/chat/${chatId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    window.location.reload();

    alert(`you deleted chat`);
  };

  return (
    <section className="flex text-slate-200 w-full h-screen">
      <div className="bg-[#111B21] w-4/12 flex flex-col px-4 py-2">
        <h2 className="my-2  text-3xl">Chats</h2>

        {chats.chats?.length === 0 && (
          <p className="mt-2 text-2xl text-center">
            You don't have
            <br />
            any chats.
          </p>
        )}
        {chats.chats?.length > 0 && (
          <div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="   🔍  search"
              onChange={(e) => searchChat(e)}
              className="self-center w-full rounded mt-2 pb-1 pl-3 h-10 mb-5 bg-[#202C33] focus:outline-none placeholder:bg-[#202C33] placeholder:text-base  placeholder:pb-2	"
            />
            <ul>
              {filteredChats.map((chat, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => fetchChatMessages(chat.chat_id, chat.id)}
                    className="flex justify-between items-center my-3"
                  >
                    <p className="text-xl">{chat.nickname}</p>
                    <p className="text-xs">
                      {moment(chat.created_at).isSame(moment(), "day")
                        ? moment(chat.created_at).format("HH:mm")
                        : moment(chat.created_at).format("D.MM.YY")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="self-end bg-[#0B141A]  flex flex-col justify-between h-screen w-8/12">
        {chatUser.length == 0 && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-2xl text-center px-2 bg-gray-700 rounded-lg">
              Select a chat to start messaging
            </p>
          </div>
        )}
        {chatUser.user && (
          <div className="bg-[#202C33] h-20 flex items-center justify-between px-[7%] text-2xl">
            <div className="flex items-center gap-5">
              <div className="py-2 px-3.5 bg-[#6a7175] w-fit rounded-full">
                <i className="fa-solid fa-user"></i>
              </div>
              {chatUser.user?.nickname}
            </div>
            <div className="flex gap-5">
              <i
                className="fa-solid fa-trash hover:text-gray-500"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Delete chat"
                onClick={() => deleteChat(chatId)}
              ></i>{" "}
              <i
                className="fa-solid fa-ellipsis-vertical"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="I just exists"
              ></i>
            </div>
          </div>
        )}

        <div>
          {chatMessages && (
            <ul className="flex justify-between flex-col mx-[6%]">
              {chatMessages.chat_messages?.map((message, index) => {
                const isMyMessage = message.user_id == user.user[0]?.id;
                return (
                  <li
                    key={index}
                    className={`w-fit  rounded bg-[#202C33] text-2xl mb-2 flex flex-col items-start px-5 ${
                      isMyMessage ? "self-end" : "self-start"
                    }`}
                  >
                    {/* group-hover:block hover:bg-[red] hidden */}
                    <div className="flex gap-3 justify-center group items-center">
                      <p>{message.content}</p>
                      {isMyMessage ? (
                        <span className="text-sm group-hover:block  hidden ">
                          <div className="flex gap-1 ">
                            <i
                              className="fa-solid fa-pencil"
                              onClick={() =>
                                setEditMess(
                                  message.id,
                                  message.content,
                                  message.created_at
                                )
                              }
                            ></i>
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteMessage(message.id)}
                            ></i>
                          </div>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <p className="text-xs self-end">
                      {moment(message.created_at).isSame(moment(), "day")
                        ? moment(message.created_at).format("HH:mm")
                        : moment(message.created_at).format("D.MM | HH:mm")}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
          {chatUser.user && form === "sendMess" && (
            <NewMessForm sendNewMess={sendNewMess} form="sendMess" />
          )}
          {form === "modifyMess" && (
            <NewMessForm
              updateMess={updateMess}
              form={form}
              reset={reset}
              setForm={setForm}
              messageValue={messValue}
              messageId={messId}
              atC={at}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;

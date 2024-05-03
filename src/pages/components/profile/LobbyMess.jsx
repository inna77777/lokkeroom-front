import React, { useState } from "react";
import moment from "moment";
import NewMessForm from "./NewMessForm";

const LobbyMess = ({
  lobbyMessages,
  lobbyInfo,
  user,
  lobby,
  fetchMessages,
}) => {
  const [form, setForm] = useState("sendMess");
  const [messValue, setMessValue] = useState("");
  const [messId, setMessId] = useState("");
  const [at, setAt] = useState("");

  const token = localStorage.getItem("token");

  const sendNewMess = async (content) => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/lobby/" + lobby,
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
    fetchMessages(lobby);
  };

  const setEditMess = async (id, content, at) => {
    setMessValue(content);
    setMessId(id);
    setAt(at);
    setForm("modifyMess");
  };

  const updateMess = async (id, content, at) => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/lobby/message/" +
        messId,
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
    setMessValue("");
    fetchMessages(lobby);
  };

  const deleteMessage = async (messId) => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/messages/" + messId,
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
    fetchMessages(lobby);

    // window.location.reload();
  };

  const reset = () => {
    setMessValue("");
  };

  return (
    <div>
      <ul className="flex justify-between flex-col mx-[6%]">
        {lobbyMessages.messages?.map((message, index) => {
          const isMyMessage = message.user_id == user.user[0]?.id;
          return (
            <li
              key={index}
              className={`w-fit px-2 rounded bg-[#202C33] text-[12px] mb-1 flex flex-col ${
                isMyMessage ? "self-end" : "self-start"
              }`}
            >
              <div className="flex gap-1 justify-center group relative">
                <div>
                  {isMyMessage ? (
                    ""
                  ) : (
                    <p className="text-[6px]">{message.nickname}</p>
                  )}
                  <p>{message.content}</p>
                </div>
                <div className="flex gap-3 justify-center group items-center">
                  {isMyMessage ? (
                    <span className="text-[8px] group-hover:block hidden ml-1">
                      <div className="flex gap-1">
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
                  ) : null}
                </div>
              </div>

              <p className="text-[6px] self-end">
                {moment(message.created_at).isSame(moment(), "day")
                  ? moment(message.created_at).format("HH:mm")
                  : moment(message.created_at).format("D.MM | HH:mm")}
              </p>
            </li>
          );
        })}
      </ul>
      <div>
        {lobbyInfo.info && form === "sendMess" && (
          <NewMessForm
            sendNewMess={sendNewMess}
            form={form}
            messageValue={messValue}
            setForm={setForm}
          />
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
  );
};

export default LobbyMess;

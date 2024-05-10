import React, { useState } from "react";

const NewMessForm = ({
  sendNewMess,
  updateMess,
  messageValue,
  messageId,
  atC,
  form,
  setForm,
  reset,
}) => {
  const [valueMess, setValueMess] = useState(messageValue);
  const [isVisible, setIsVisible] = useState(form === "modifyMess");

  const stopEditing = () => {
    reset();
    setValueMess("");
    setForm("sendMess");
    setIsVisible(false);
  };
  const handleSubmit = (e) => {
    e.nativeEvent.preventDefault();
    let content = e.target[0].value;
    if (form === "sendMess") {
      sendNewMess(content).then(() => setValueMess(""));
    } else if (form === "modifyMess") {
      updateMess(messageId, content, atC);
      stopEditing();
    }
  };

  return (
    <div>
      <div className={`${isVisible ? "" : "hidden"}`}>
        {form === "modifyMess" && (
          <div className="flex justify-between items-center px-3 pt-4">
            <p>{messageValue}</p>
            <i className="fa-solid fa-xmark" onClick={stopEditing}></i>
          </div>
        )}
      </div>
      <form
        action=""
        className="bg-[#202C33] py-5 flex justify-center w-full mt-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          name=""
          value={valueMess}
          onChange={(e) => setValueMess(e.target.value)}
          placeholder="Write message"
          className="self-center rounded-xl h-12  pl-3 bg-[#2A3942] focus:outline-none placeholder:bg-[#2A3942] placeholder:text-xl  placeholder:pb-2 placeholder:pl-3 w-5/6 "
        />
        <button
          type="submit"
          className="bg-[#2A3942] ml-1 h-12 px-4 rounded-xl  hover:bg-cyan-500"
        >
          <i className="fa-regular fa-paper-plane text-2xl"></i>
        </button>
      </form>
    </div>
  );
};

export default NewMessForm;



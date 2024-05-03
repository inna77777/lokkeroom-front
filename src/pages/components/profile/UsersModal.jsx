import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";

const UsersModal = ({
  createChat,
  closeModal,
  modalIsOpen,
  modalUser,
  setShowModal,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#747264",
      padding: "0",
      width: "300px",
      color: "white",
      borderRadius: "16px",
    },
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example§ Modal"
      >
        <div className="bg-[#D77660] flex justify-end h-14 p-2 relative">
          <i className="fa-regular fa-user py-2.5 px-3 bg-[#6a7175] w-fit rounded-full text-[35px] h-fit absolute left-3 bottom-[-28px] border-4 border-[#232428]"></i>
          <i className="fa-solid fa-xmark" onClick={closeModal}></i>
          {/* <i className="fa-solid fa-pencil  bg-slate-500 rounded-full flex justify-center items-center text-xs  h-fit py-1 px-1.5"></i> */}
        </div>
        <div className="bg-[#232428] p-2 pt-2">
          <div className="pb-5 flex gap-2 justify-end">
            <button
              className="bg-cyan-600 hover:bg-cyan-600  py-1 px-3 rounded text-zinc-100 text-[8px] flex items-center gap-1"
              onClick={() => createChat()}
            >
              Write message <i className="fa-solid fa-envelope"></i>
            </button>
            <button
              className="bg-cyan-600 hover:bg-cyan-600  py-1 px-3 rounded text-zinc-100 text-[8px] flex items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              Add to lobby
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="bg-[#111214] rounded p-1 pb-16">
            <h2 className="text-base mb-2 capitalize">{modalUser.nickname}</h2>
            <div className="bg-white h-[0.5px]"></div>
            <span className="text-[8px] uppercase font-bold 	">
              Some words about myself :
            </span>
            <p className="text-zinc-300 text-[14px]">{modalUser.description}</p>
            <span className="uppercase text-[8px] font-bold	">
              On the platform from :
            </span>
            <p className="text-zinc-300 text-[14px]">
              {moment(modalUser.created_at).format("D.MM.YY")}
            </p>
          
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersModal;

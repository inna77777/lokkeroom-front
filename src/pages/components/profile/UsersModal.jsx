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
      width: "600px",
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
        <div className="bg-[#D77660] flex justify-end h-28 p-4 relative">
          <i className="fa-regular fa-user py-5 px-6 bg-[#6a7175] w-fit rounded-full text-[70px] h-fit absolute left-3 bottom-[-56px] border-8 border-[#232428]"></i>
          <i className="fa-solid fa-xmark text-3xl ounded text-zinc-200 hover:text-zinc-100 cursor-pointer" onClick={closeModal}></i>
          {/* <i className="fa-solid fa-pencil  bg-slate-500 rounded-full flex justify-center items-center text-xs  h-fit py-1 px-1.5"></i> */}
        </div>
        <div className="bg-[#232428] p-4 pt-4">
          <div className="pb-10 flex gap-4 justify-end">
            <button
              className="bg-cyan-700 hover:bg-cyan-600  py-2 px-6 rounded text-zinc-300 hover:text-zinc-100 text-base flex items-center gap-1"
              onClick={() => createChat()}
            >
              Write message <i className="fa-solid fa-envelope"></i>
            </button>
            <button
              className="bg-cyan-700 hover:bg-cyan-600  py-2 px-6 rounded text-zinc-300 hover:text-zinc-100  text-base flex items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              Add to lobby
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="bg-[#111214] rounded p-2 pb-32">
            <h2 className="text-3xl mb-2 capitalize">{modalUser.nickname}</h2>
            <div className="bg-white h-[1px] my-3"></div>
            <span className="text-base uppercase font-bold 	">
              Some words about myself :
            </span>
            <p className="text-zinc-300 text-[28px] mb-4 mt-2">{modalUser.description}</p>
            <span className="uppercase text-base font-bold	">
              On the platform from :
            </span>
            <p className="text-zinc-300 text-[28px] mb-2 mt-2">
              {moment(modalUser.created_at).format("D.MM.YY")}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersModal;

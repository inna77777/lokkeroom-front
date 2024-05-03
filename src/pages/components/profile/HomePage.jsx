import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Lobbies from "./Lobbies";
import Chats from "./Chats";
import Sidebar from "./Sidebar";
import moment from "moment";

import useAuthHeaders from "../../../utils/useAuthHeaders";
import Community from "./Community";
import { Tooltip } from "react-tooltip";

const HomePage = () => {
  const [chats, setChats] = useState([]);
  const [lobbies, setLobbies] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [community, setCommunity] = useState([]);
  const [newChatUser, setNewChatUser] = useState(null);
  const authHeaders = useAuthHeaders();

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
     width: "500px",
     color: "white",
     borderRadius: "16px",
   },
 };

  const fetchChats = async () => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/api/user/chats",
      authHeaders
    );
    const data = await response.json();
    setPage("chats");
    setChats(data);
  };

  const fetchLobbies = async () => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/user/lobbies",
      authHeaders
    );
    const data = await response.json();
    setPage("lobbies");
    setLobbies(data);
  };

  const fetchCommunity = async () => {
    const response = await fetch(
      "https://be-course-1d3f5a338434.herokuapp.com/community",
      authHeaders
    );
    const data = await response.json();
    setPage("community");
    setCommunity(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const currentUser = async () => {
    try {
      const response = await fetch(
        "https://be-course-1d3f5a338434.herokuapp.com/api/user",
        authHeaders
      );
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await currentUser();
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  async function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const createUserChat = async (user) => {
    await fetchChats();
    setNewChatUser(user);
  };

  return (
    <section className="flex">
      <Sidebar
        fetchChats={fetchChats}
        fetchLobbies={fetchLobbies}
        fetchCommunity={fetchCommunity}
        openModal={openModal}
      />
      {page === "chats" && user && (
        <Chats chats={chats} user={user} newChatUser={newChatUser} />
      )}
      {page === "lobbies" && user && (
        <Lobbies
          lobbies={lobbies}
          user={user}
          fetchLobbies={fetchLobbies}
          createUserChat={createUserChat}
        />
      )}
      {page === "community" && user && (
        <Community
          fetchLobbies={fetchLobbies}
          community={community}
          user={user}
          setPage={setPage}
          createUserChat={createUserChat}
        />
      )}

      {user?.user?.length && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example§ Modal"
        >
          <div className="bg-[#D77660] flex justify-end h-[120px] p-3 relative ">
            <i className="fa-regular fa-user py-3 px-4 bg-[#6a7175] w-fit rounded-full text-[80px] h-fit absolute left-6 bottom-[-50px] border-8 border-[#232428]"></i>
            <i className="fa-solid fa-xmark text-3xl" onClick={closeModal}></i>
            {/* <i className="fa-solid fa-pencil  bg-slate-500 rounded-full flex justify-center items-center text-xs  h-fit py-1 px-1.5"></i> */}
          </div>
          <div className="bg-[#232428] p-6 pt-16">
            <div className="bg-[#111214] rounded p-4 pb-24">
              <h2 className="text-4xl mb-3 capitalize">
                {user.user[0].nickname}
              </h2>
              <div className="bg-white h-[0.5px] mb-3"></div>
              <span className="text-lg uppercase font-bold">
                Some words about myself :
              </span>
              <p className="text-zinc-300 text-base my-2">
                {user.user[0].description}
              </p>
              <span className="uppercase text-lg font-bold	">
                On the platform from :
              </span>
              <p className="text-zinc-300 text-base mt-2">
                {moment(user.user[0].created_at).format("D.MM.YY")}
              </p>
            </div>
          </div>
        </Modal>
      )}
      <Tooltip id="my-tooltip" />
    </section>
  );
};

export default HomePage;


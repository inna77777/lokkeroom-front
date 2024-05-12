import React, { useState } from "react";
import LobbiesList from "./LobbiesList";

const Lobbies = ({ lobbies, user, fetchLobbies, createUserChat }) => {
  const [page, setPage] = useState("lobbies");

  return (
    <section className="flex text-slate-200 w-full h-screen">
      <LobbiesList
        fetchLobbies={fetchLobbies}
        lobbies={lobbies}
        user={user}
        page={page}
        createUserChat={createUserChat}
        setPage={setPage}
      />
    </section>
  );
};

export default Lobbies;

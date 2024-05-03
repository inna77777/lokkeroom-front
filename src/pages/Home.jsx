import React from "react";
import { Tooltip } from "react-tooltip";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-neutral-900 mt-10 mb-5 text-4xl">
        Welcome to the app!
      </h1>
      <p className="flex gap-1 justify-center text-3xl">
        <a href="/register" className="text-sky-700 hover:text-sky-950 ">
          Register
        </a>
        <span>or</span>
        <a href="/login" className="text-sky-700  hover:text-sky-950 ">
          Login
        </a>
      </p>
      <Tooltip id="my-tooltip" />
    </div>
  );
}

export default Home;

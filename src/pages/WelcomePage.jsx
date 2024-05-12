import React from "react";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="text-center">
      <h1 className="text-neutral-900 mt-10 mb-5 text-4xl">
        Welcome to the app!
      </h1>
      <p className="flex gap-1 justify-center text-3xl">
        <a href="/register" className="text-sky-700 hover:text-sky-950 ">
          <Link to="/register">Register</Link>
        </a>

        <span>or</span>
        <a href="/login" className="text-sky-700  hover:text-sky-950 ">
          <Link to="/login">Login</Link>
        </a>
      </p>
      <Tooltip id="my-tooltip" />
    </div>
  );
}

export default WelcomePage;

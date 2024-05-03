import React from "react";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-neutral-900 mt-10 mb-5">Welcome to the app!</h1>
      <p className="flex gap-1 justify-center">
        <a href="/register" className="text-sky-700 hover:text-sky-950">
          Register
        </a> 
       <span>or</span>  
        <a href="/login" className="text-sky-700  hover:text-sky-950">
          Login
        </a>
      </p>
    </div>
  );
}

export default Home;

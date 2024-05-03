import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://be-course-1d3f5a338434.herokuapp.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password, nickname, description }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Registration successful");
      } else {
        throw new Error("Registration failed");
      }
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center	items-center">
      <div className="border-2 m-10 p-10 w-[500px] rounded">
        <h1 className="text-4xl text-center text-neutral-900 mb-5">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="text-2xl text-gray-500 flex flex-col"
        >
          <label className="flex flex-col mb-2" for="login">
            Login:
          </label>
          <input
            type="text"
            id="login"
            className="border rounded border-sky-900 mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label className="flex flex-col mb-2" for="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border rounded border-sky-900 mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="flex flex-col mb-2" for="nickname">
            Nickname:
          </label>
          <input
            type="text"
            id="nickname"
            className="border rounded border-sky-900 mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <label className="flex flex-col mb-2" for="description">
            Description:
          </label>

          <textarea
            name="description"
            value={description}
            id="description"
            className="border rounded border-sky-900 mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            onChange={(e) => setDescription(e.target.value)}
            cols="20"
            rows="3"
          ></textarea>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

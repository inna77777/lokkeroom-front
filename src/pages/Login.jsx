import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://be-course-1d3f5a338434.herokuapp.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert("Login successful");
        localStorage.setItem("token", data.token);
        console.log(data.token);
        navigate("/home-page", { replace: true }); 
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center	items-center">
      <div className="border-2 m-10 p-10 w-[500px] rounded">
        <h1 className="text-4xl text-center text-neutral-900 mb-5">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="text-2xl text-gray-500 flex flex-col"
        >
          <label for="login" className="flex flex-col mb-2">
            Username:
          </label>
          <input
            id="login"
            type="text"
            className="border rounded border-sky-900 mb-1 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <br />
          <label for="password" className="flex flex-col mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="border rounded border-sky-900 mb-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

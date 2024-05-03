// import React, { useState, useEffect } from "react";

// function Lobby({ match }) {
//   const [lobby, setLobby] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     fetch(
//       `https://be-course-1d3f5a338434.herokuapp.com/api/lobby/${match.params.lobbyId}`
//     )
//       .then((response) => response.json())
//       .then((data) => setLobby(data));
//   }, [match.params.lobbyId]);

//   useEffect(() => {
//     fetch(
//       `https://be-course-1d3f5a338434.herokuapp.com/api/lobby/${match.params.lobbyId}/messages`
//     )
//       .then((response) => response.json())
//       .then((data) => setMessages(data));
//   }, [match.params.lobbyId]);

//   const handleSendMessage = async () => {
//     try {
//       const response = await fetch(
//         `https://be-course-1d3f5a338434.herokuapp.com/api/lobby/${match.params.lobbyId}/messages`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ content: newMessage }),
//         }
//       );
//       const data = await response.json();
//       setMessages([...messages, data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Lobby {match.params.lobbyId}</h1>
//       {lobby && (
//         <div>
//           <h2>{lobby.name}</h2>
//           <ul>
//             {messages.map((message) => (
//               <li key={message.id}>{message.content}</li>
//             ))}
//           </ul>
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Lobby;

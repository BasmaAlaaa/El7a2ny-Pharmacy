import "../assets/Chat.css";
//import { useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import io from "socket.io-client";

 
import Chat from "../components/chat";

const socket = io.connect("http://localhost:8000");

function ChatPharmacistOptions() {
  const {username} = useParams();
  //const [room, setRoom] = useState('');
  const navigate = useNavigate();


  const [showChat1, setShowChat1] = useState(false);
  const [showChat2, setShowChat2] = useState(false);

  const joinRoom1 = () => {
    socket.emit("join_room", 1);
    setShowChat1(true);
};

const joinRoom2 = () => {
  socket.emit("join_room", 2);
  setShowChat2(true);
};

  return (
    <div className="App">
      <div className="joinChatContainer">

    {!showChat1 ? (
      <button
        onClick={joinRoom1}
      >
        Chat with a patient
      </button>
      ) : (
        <Chat socket={socket} username={username} room={1} />
      )}

    {!showChat2 ? (
      <button
        onClick={joinRoom2}
      >
        Chat with a doctor
      </button>
      ) : (
        <Chat socket={socket} username={username} room={2} />
      )}
          </div>

    </div>
  );
}

export default ChatPharmacistOptions;
import { useState, useEffect} from 'react';

import { ToggleButton } from './components/ToggleButton';
import { ChatInput } from './components/ChatInput';
import {ChatMessage } from './components/ChatMessage';

import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
  const saved = localStorage.getItem('messages');
  return saved ? JSON.parse(saved) : [];
});

  const [position, setPosition] = useState("bottom");
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages]);

  return (
    <div className={`chat-container ${position === "top" ? "with-input-top" : "with-input-bottom"}`}>
      <ToggleButton position={position} setPosition={setPosition} />
      <ChatMessage chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} position={position} />
    </div>
  );
}

export default App;

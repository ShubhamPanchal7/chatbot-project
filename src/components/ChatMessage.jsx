import {useEffect, useRef } from 'react';
import {ChatMessageFormat } from './ChatMessageFormat';
import './ChatMessage.css';

export function ChatMessage({ chatMessages}) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((m) => (
        <ChatMessageFormat key={m.id} message={m.message} timestamp={m.timestamp} sender={m.sender} />
      ))}
    </div>
  );
}


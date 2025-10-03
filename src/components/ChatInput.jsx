import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages, position }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(e) {
    setInputText(e.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText.trim() === "") return;
    setIsLoading(true);
    const userMessage = inputText.trim();
    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        message: userMessage,
        sender: "user",
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            src={LoadingSpinnerGif}
            style={{ height: 40, margin: -15 }}
            alt="loading.."
          />
        ),
        sender: "robot",
        id: "loading",
      },
    ]);

    try {
      const response = await Chatbot.getResponseAsync(userMessage);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: "robot",
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error(error);
      setChatMessages([
        ...newChatMessages,
        {
          message: "Error. Please try again later.",
          sender: "robot",
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") sendMessage();
    else if (event.key === "Escape") setInputText("");
  }

  function clearMessages(){
        localStorage.removeItem("messages");
        setChatMessages([]);
    }
  

  return (
    <div className={`chat-input-box ${position}`}>
      <input
        type="text"
        placeholder="Type message to chatbot..."
        value={inputText}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage} disabled={isLoading}>
        {isLoading ? "Sending..." : "Send"}
      </button>
      <button onClick={clearMessages} disabled={isLoading}>
        Clear
      </button>
    </div>
  );
}

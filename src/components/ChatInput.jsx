import { useState, useEffect, useRef } from "react";
import { processUserMessageAsync } from "../chatbot/chatbotEngine.js";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages, position }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null); // { label, message, secondsRemaining, intervalId }
  const recognitionRef = useRef(null);

  // Setup Web Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const timerCompleteRef = useRef(null);

  function handleTimerComplete(timerInfo) {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const completionMsg = {
      message: timerInfo.message || `⏰ Timer for ${timerInfo.label} has completed!`,
      sender: "robot",
      id: crypto.randomUUID(),
      timestamp: timeNow
    };

    setChatMessages((prev) => [...prev, completionMsg]);

    // Speak alert if speech synthesis is available
    if ("speechSynthesis" in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(timerInfo.message || "Timer finished!");
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
      }
    }
  }

  useEffect(() => {
    timerCompleteRef.current = handleTimerComplete;
  });

  // Timer countdown handler
  useEffect(() => {
    let interval = null;
    if (activeTimer && activeTimer.secondsRemaining > 0) {
      interval = setInterval(() => {
        setActiveTimer((prev) => {
          if (!prev) return null;
          if (prev.secondsRemaining <= 1) {
            // Timer expired!
            if (timerCompleteRef.current) {
              timerCompleteRef.current(prev);
            }
            return null;
          }
          return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer]);

  function toggleVoiceInput() {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge for speech-to-text.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Could not start speech recognition:", err);
        setIsListening(false);
      }
    }
  }

  function cancelTimer() {
    setActiveTimer(null);
  }

  function formatTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function speakText(text) {
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        // Clean markdown bold and links for clean speech
        const cleanSpeech = text
          .replace(/\[(.*?)\]\(.*?\)/g, "$1")
          .replace(/[*_#`~]/g, "")
          .replace(/\p{Extended_Pictographic}/gu, "");

        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
      }
    }
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function saveInputText(e) {
    setInputText(e.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText.trim() === "") return;
    setIsLoading(true);
    const userMessage = inputText.trim();
    setInputText("");

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const newChatMessages = [
      ...chatMessages,
      {
        message: userMessage,
        sender: "user",
        id: crypto.randomUUID(),
        timestamp
      }
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
        id: "loading"
      }
    ]);

    // Find the last robot message for context (used for repeat that / speak response)
    const robotMessages = chatMessages.filter(
      (m) => m.sender === "robot" && typeof m.message === "string"
    );
    const lastRobotMessage =
      robotMessages.length > 0 ? robotMessages[robotMessages.length - 1].message : "";

    try {
      const responseObj = await processUserMessageAsync(userMessage, {
        lastRobotMessage,
        voiceMode
      });

      const responseText = responseObj.text;
      const action = responseObj.action;

      // Handle custom actions
      if (action) {
        if (action.type === "CLEAR_CHAT") {
          localStorage.removeItem("messages");
          setChatMessages([]);
          setIsLoading(false);
          return;
        }

        if (action.type === "RESET_CHAT") {
          localStorage.removeItem("messages");
          setChatMessages([
            {
              message: responseText,
              sender: "robot",
              id: crypto.randomUUID(),
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            }
          ]);
          setIsLoading(false);
          return;
        }

        if (action.type === "OPEN_URL" && action.url) {
          try {
            window.open(action.url, "_blank");
          } catch (e) {
            console.warn("Popup blocked by browser:", e);
          }
        }

        if (action.type === "SET_TIMER" || action.type === "SET_REMINDER") {
          setActiveTimer({
            label: action.label,
            message: action.message,
            secondsRemaining: action.durationSeconds
          });
        }

        if (action.type === "SPEAK") {
          speakText(action.textToSpeak || responseText);
        }

        if (action.type === "STOP_SPEAK") {
          stopSpeaking();
        }

        if (action.type === "VOICE_MODE") {
          setVoiceMode(action.enabled);
          if (!action.enabled) {
            stopSpeaking();
          }
        }
      }

      // Auto-read response if voiceMode is on
      if (voiceMode && (!action || action.type !== "STOP_SPEAK")) {
        speakText(responseText);
      }

      setChatMessages([
        ...newChatMessages,
        {
          message: responseText,
          sender: "robot",
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);
    } catch (error) {
      console.error(error);
      setChatMessages([
        ...newChatMessages,
        {
          message: "Error processing your request. Please try again.",
          sender: "robot",
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") sendMessage();
    else if (event.key === "Escape") setInputText("");
  }

  function clearMessages() {
    localStorage.removeItem("messages");
    setChatMessages([]);
  }

  return (
    <div className={`chat-input-wrapper ${position}`}>
      {activeTimer && (
        <div className="active-timer-banner">
          <span>⏳ <strong>{activeTimer.label}:</strong> {formatTimerDisplay(activeTimer.secondsRemaining)} remaining</span>
          <button className="cancel-timer-btn" onClick={cancelTimer} title="Cancel timer">✕</button>
        </div>
      )}
      {voiceMode && (
        <div className="voice-mode-indicator">
          <span>🎙️ Voice Mode Active</span>
          <button onClick={() => setVoiceMode(false)} className="voice-mode-toggle" title="Turn voice mode off">✕</button>
        </div>
      )}
      <div className="chat-input-box">
        <input
          type="text"
          placeholder={isListening ? "Listening to your voice..." : "Type message to chatbot..."}
          value={inputText}
          onChange={saveInputText}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={toggleVoiceInput}
          className={`mic-button ${isListening ? "listening" : ""}`}
          title={isListening ? "Stop listening" : "Click to speak"}
          disabled={isLoading}
        >
          {isListening ? "🔴" : "🎤"}
        </button>
        <button onClick={sendMessage} disabled={isLoading} className="send-btn">
          {isLoading ? "..." : "Send"}
        </button>
        <button onClick={clearMessages} disabled={isLoading} className="clear-btn">
          Clear
        </button>
      </div>
    </div>
  );
}

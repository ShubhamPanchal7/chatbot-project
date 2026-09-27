import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessageFormat.css';

/**
 * Safely parses markdown links [text](url) and bold **text** into React elements
 */
function renderFormattedMessage(text) {
  if (typeof text !== "string") return text;

  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = [];
    let lastIndex = 0;
    const regex = /\[(.*?)\]\((https?:\/\/[^\s)]+)\)|\*\*(.*?)\*\*/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      if (match[1] && match[2]) {
        parts.push(
          <a
            key={`link-${lineIdx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        parts.push(
          <strong key={`bold-${lineIdx}-${match.index}`}>
            {match[3]}
          </strong>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return (
      <span key={`line-${lineIdx}`}>
        {parts}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function ChatMessageFormat({ message, sender, timestamp }) {
  return (
    <div className={`chat-message ${sender}`}>
      {sender === "robot" && (
        <img className="avatar" src={RobotProfileImage} alt="robot" />
      )}
      <div className="chat-bubble">
        <div className="chat-text">{renderFormattedMessage(message)}</div>
        <div className="chat-time">{timestamp}</div>
      </div>
      {sender === "user" && (
        <img className="avatar" src={UserProfileImage} alt="user" />
      )}
    </div>
  );
}
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessageFormat.css';

export function ChatMessageFormat({ message, sender, timestamp }) {
  return (
    <div className={`chat-message ${sender}`}>
      {sender === "robot" && (
        <img className="avatar" src={RobotProfileImage} alt="robot" />
      )}
      <div className="chat-bubble">
        <div className="chat-text">{message}</div>
        <div className="chat-time">{timestamp}</div>
      </div>
      {sender === "user" && (
        <img className="avatar" src={UserProfileImage} alt="user" />
      )}
    </div>
  );
}
import React, { useState } from "react";
import ReactDOM from "react-dom";
import s from "./LiveChatStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

function LiveChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return ReactDOM.createPortal(
    <div className={s.chat_container}>
        <button className={s.chat_button} onClick={toggleChat}>
            <FontAwesomeIcon icon={faMessage} />
        </button>
        <div className={`${s.popup_chat} ${isChatOpen ? s.open : ""}`}>
            <div className={s.chat_box}>
                <div className={s.chat_header}>
                    <h4>Helpdesk</h4>
                    <FontAwesomeIcon icon={faWindowMinimize} className={s.minimize_button} onClick={toggleChat} title="Minimize window"/>
                </div>
                <div className={s.chat_content}>
                    <div className={s.helpdesk_message}>
                        <p>Welcome to Live Chat!</p>
                    </div>
                    <div className={s.helpdesk_message}>
                        <p>How can we help you?</p>
                    </div>
                    <div className={s.user_message}>
                        <p>Just wanted to say hi!</p>
                    </div>
                </div>
                <div className={s.message_area}>
                    <input type="text" placeholder="Γράψτε το μήνυμα σας εδώ..." className={s.text_area}></input>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById("portal-root") // Το Portal root
  );
}

export default LiveChat;

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../chat-bot-kit/config";
import MessageParser from "../../chat-bot-kit/MessageParser";
import ActionProvider from "../../chat-bot-kit/ActionProvider";
import styles from "./home.module.scss";
import Card from "../../component/card/Card";
import React from "react";



const ChatBot: React.FC = () => {
    return (
        <Card cardClass={styles.card}>
            <div className={styles["bot-container"]}>
                <Chatbot 
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
        </Card>
    );
}

export default ChatBot;
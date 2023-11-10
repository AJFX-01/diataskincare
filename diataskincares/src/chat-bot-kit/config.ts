import { createChatBotMessage } from 'react-chatbot-kit';

interface BotConfig {
    initialMessages: [];
    botNmae: string;
    customstyles?: {
        botMessageBox?: {
            backgroundColor: string;
        };
        chatButton: {
            backgroundColor: string;
        };
    };
}

const botNmae = "Diata's Bot";

const config: BotConfig = {
    initialMessages: [createChatBotMessage(`Hi! I'm ${botNmae}`)],
    botNmae,
    customstyles: {
        botMessageBox: {
            backgroundColor: "#3c4448",
        },
        chatButton: {
            backgroundColor: '#c07d53'
        },
    },
};

// export default config;

// import { createChatBotMessage } from "react-chatbot-kit";

// interface CustomStyles {
//   [key: string]: React.CSSProperties;
// }

// interface Config {
//   initialMessages: CreateChatBotMessage[];
//   botName: string;
//   customStyles: {
//     botMessageBox: React.CSSProperties;
//     chatButton: React.CSSProperties;
//   };
// }

// const botName: string = "ShopLand Bot";

// const config: Config = {
//   initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
//   botName: botName,
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#3c4448",
//     },
//     chatButton: {
//       backgroundColor: "#c07d53",
//     },
//   },
// };

// export default config;

// import { createChatBotMessage } from "react-chatbot-kit";
// import ChatbotMessage from "react-chatbot-kit";

// const botName = "ShopLand Bot";

// const config: BotConfig = {
//   initialMessages: [
//     createChatBotMessage(`Hi! I'm ${botName}`),
//   ] as ChatbotMessage[],
//   botName,
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#3c4448",
//     },
//     chatButton: {
//       backgroundColor: "#c07d53",
//     },
//   },
// };

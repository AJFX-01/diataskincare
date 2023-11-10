import { createChatBotMessage } from 'react-chatbot-kit';

interface BotConfig {
    initialMessages: any[];
    botName: string;
    customstyles?: {
        botMessageBox?: {
            backgroundColor: string;
        };
        chatButton: {
            backgroundColor: string;
        };
    };
}

const botName = "Diata's Bot";

const config: BotConfig = {
    initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`, {})],
    botName,
    customstyles: {
        botMessageBox: {
            backgroundColor: "#3c4448",
        },
        chatButton: {
            backgroundColor: '#c07d53'
        },
    },
};

export default config;

//
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

export default config;
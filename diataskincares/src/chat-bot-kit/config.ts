import { createChatBotMessage } from 'react-chatbot-kit';

interface BotConfig {
    initialMessages: ChatbotMessage[];
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
    
}
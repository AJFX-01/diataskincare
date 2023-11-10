import { createChatBotMessage } from 'react-chatbot-kit';

interface BotConfig {
  initialMessages: ChatBotMessage[];
  botName: string;
  customStyles?: {
    botMessageBox?: {
      backgroundColor: string;
    };
    chatButton?: {
      backgroundColor: string;
    };
  };
}

const botName = 'ShopLand Bot';

const config: BotConfig = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#3c4448',
    },
    chatButton: {
      backgroundColor: '#c07d53',
    },
  },
};

export default config;

import React, { ReactNode } from "react"


interface ActionProviderProps {
    createChatBotMessage: (message : string, option?: Record<string , any>) => any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    children: ReactNode;
};


const ActionProvider: React.FC<ActionProviderProps> = ({
    createChatBotMessage,
    setState,
    children
}) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage("Hello. Nice to meeet you");

        setState((prev : any) => {
            const messages = [...prev.state.messages, botMessage];
            return {
              ...prev.state,
              messages,
            };
          });
    };

    const handleThanks = () => {
        const botMessage = createChatBotMessage("You are welcome!");

        setState((prev : any) => ({
            ...prev,
            messages: [...prev.messages, botMessage]
        }));
    };

    const handleOkay = () => {
        const botMessage = createChatBotMessage("That\'s great to hear!");

        setState((prev : any) => {
            const messages = [...prev.state.messages, botMessage];
            return {
              ...prev.state,
              messages,
            };
          });
    }


    return(
        <div>bots</div>
    );
};

export default ActionProvider;
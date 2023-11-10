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

        setState((prev) => {
            ...prev,
            messages: [...prev.messages, botMessage],
        });
    };

    const handleThanks = () => {
        const botMessage = createChatBotMessage("You are welcome!");

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage]
        }));
    }
}
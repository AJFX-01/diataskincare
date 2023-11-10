import React, { ReactNode } from "react"


interface ActionProviderProps {
    createChatBotMessage: (message : string, option?: Record<string , any>) => any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    children: ReactNode;
};


const ActionProvider: React.FC<ActionProviderProps>
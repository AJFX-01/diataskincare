import React from 'react';

interface MessageParserProps {
    children: ReactNode;
    actions: {
        handleHello: () => void;
        handleGood: () => void;
        handleProducts: () => void;
        handleOkay: () => void;
        hanldeThanks: () => void;
        handleAccount: () => void;
    };
}

const MessageParser : React.FC<MessageParserProps> = ({ children, action})
import React from 'react';

interface MessageParserProps {
  children: ReactNode;
  actions: {
    handleHello: () => void;
    handleGood: () => void;
    handleOkay: () => void;
    handleProducts: () => void;
    handleThanks: () => void;
    handleAccount: () => void;
  };
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
  const parse = (message: string) => {
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good')) {
      actions.handleHello();
    }

    if (message.includes('how')) {
      actions.handleGood();
    }

    if (message.includes('good') || message.includes('fine') || message.includes('great') || message.includes('okay')) {
      actions.handleOkay();
    }

    if (message.includes('product') || message.includes('item') || message.includes('help') || message.includes('assistance') || message.includes('password')) {
      actions.handleProducts();
    }

    if (message.includes('thank')) {
      actions.handleThanks();
    }

    if (message.includes('login') || message.includes('account') || message.includes('sign')) {
      actions.handleAccount();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;

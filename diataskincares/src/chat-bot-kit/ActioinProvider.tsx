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
        const botMessage = createChatBotMessage('You are welcome');

        setState((prev: any) => ({
            ...prev,
            messsages: [...prev.messages, botMessage]
        }));
    }

    const handleOkay = () => {
        const botMessage = createChatBotMessage('That\'s great to hear!');
    
        setState((prev : any ) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

    const handleGood = () => {
        const botMessage = createChatBotMessage('I\'m great!, how about you');

        setState((prev : any) => ({
            ...prev,
            messages: [...prev.messages, botMessage]
        }));
    };

    const handleAccount = () => {
        const botMessage = createChatBotMessage('Having trouble signing in or setting up your account? let us know, go to the contact page and send us a message.');

        setState((prev : any) => {
            const messages = [...prev.state.messages, botMessage];
            return {
              ...prev.state,
              messages,
            };
          });
    };

    const handleProducts = () => {
        const botMessage = createChatBotMessage(
            'If you have any inquiries about a product or you need assistance in any way, go to our contact page and submit your issue. All the best!.',
        );

        setState((prev : any) => {
            const messages = [...prev.state.messages, botMessage];
            return {
              ...prev.state,
              messages,
            };
          });
    };


    return(
        <div>
            {React.Children.map(children, (child : any) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleProducts,
                        handleThanks,
                        handleGood,
                        handleOkay,
                        handleAccount,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
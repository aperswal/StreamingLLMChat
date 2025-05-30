import { useState } from 'react';
import { Message } from '../types/message';
import { createMessage } from '../utils/addMessage.ts'; 
import { useChatMutation } from './useChatMutation.tsx';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (text: string, sender: 'user' | 'llm'): Message => {
        const message = createMessage(text, sender);
        setMessages(prev => [...prev, message]);
        return message;
    };

    const updateLastMessage = (chunk: string) => {
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessageIndex = newMessages.length - 1;
            if (lastMessageIndex >= 0 && newMessages[lastMessageIndex].sender === 'llm') {
                newMessages[lastMessageIndex] = {
                    ...newMessages[lastMessageIndex],
                    text: newMessages[lastMessageIndex].text + chunk,
                };
            }
            return newMessages;
        });
    };

    const chatMutation = useChatMutation({
        onMessageUpdate: updateLastMessage,
        onError: (error) => {
            addMessage("Sorry I couldn't process that", 'llm');
        }
    });

    const handleSendMessage = (text: string) => {
        addMessage(text, 'user');
        addMessage("", 'llm');
        chatMutation.mutate(text);
    };

    return {
        messages,
        isLoading: chatMutation.isPending,
        handleSendMessage,
    };
};
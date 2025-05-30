import { useState } from 'react';
import { Message } from '../types/message';
import { sendChatMessage } from '../lib/chatApi.ts';
import { v4 as uuidv4 } from 'uuid';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addMessage = (text: string, sender: 'user' | 'llm'): Message => {
        const message: Message = {
            uuid: uuidv4(),
            text,
            sender,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, message]);
        return message;
    };

    const handleSendMessage = async (text: string) => {
        if (isLoading) return;

        addMessage(text, 'user');
        setIsLoading(true);

        try {
            const reply = await sendChatMessage(text);
            addMessage(reply, 'llm');
        } catch (error) {
            console.error('Error sending message:', error);
            addMessage("Sorry I couldn't process that", 'llm');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        isLoading,
        handleSendMessage,
    }
}
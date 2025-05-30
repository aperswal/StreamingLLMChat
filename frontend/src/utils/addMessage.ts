import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/message';

export const createMessage = (text: string, sender: 'user' | 'llm'): Message => {
    const message: Message = {
        uuid: uuidv4(),
        text,
        sender,
        timestamp: new Date(),
    };
    return message;
};

export const addMessageToArray = (messages: Message[], text: string, sender: 'user' | 'llm'): Message[] => {
    const message: Message = createMessage(text, sender);
    return [...messages, message];
}
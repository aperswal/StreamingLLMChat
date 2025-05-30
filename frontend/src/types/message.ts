export interface Message {
    uuid: string;
    text: string;
    sender: 'user' | 'llm';
    timestamp: Date;
}

export interface ChatHistoryProps {
    messages: Message[];
}
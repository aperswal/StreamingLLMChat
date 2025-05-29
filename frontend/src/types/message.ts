export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'llm';
    timestamp: Date;
}

export interface ChatHistoryProps {
    messages: Message[];
}
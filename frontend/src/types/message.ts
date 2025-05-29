export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

export interface ChatHistoryProps {
    messages: Message[];
}
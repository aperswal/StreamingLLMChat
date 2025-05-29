import React, { useState } from 'react';
import { Message } from '../types/message';
import ChatHistory from './chatHistory.tsx';  // Remove .tsx extension
import ChatInput from './chatInput.tsx';      // Remove .tsx extension
import styles from './chatApp.module.css'; // Add CSS import

export default function ChatApp() {
    const [messages, setMessages] = useState<Message[]>([]);
    
    const handleSendMessage = (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage]);
    };

    return (
        <div className={styles.chatApp}>
            <div className={styles.chatContainer}>
                <div className={styles.historySection}>
                    <ChatHistory messages={messages} />
                </div>
                <div>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    )
}
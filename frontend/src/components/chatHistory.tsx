import React, {useEffect, useRef} from 'react';
import styles from './chatHistory.module.css';
import { Message } from '../types/message.ts';

interface ChatHistoryProps {
    messages: Message[];
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.chatHistory}>
            <h1 className={styles.chatHistoryTitle}>Chat History</h1>
            <div className={styles.messagesContainer}>
            {messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <h3>No messages yet. Start the conversation!</h3>
                </div>
            ) : (
                messages.map((message) => (
                    <div 
                        key={message.id}
                        className={`${styles.messageWrapper} ${
                            message.sender === 'user' ? styles.userMessage : styles.llmMessage
                        }`}
                    >
                        <div className={styles.messageBubble}>
                            <p className={styles.messageText}>{message.text}</p>
                            <span className={styles.timestamp}>
                                {message.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))
            )}
        <div ref = {messagesEndRef}/>
        </div>
    </div>
    );
}
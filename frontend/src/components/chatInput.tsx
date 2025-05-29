import React, {useState} from 'react';
import styles from './chatInput.module.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export default function ChatInput ({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <div className={styles.chatInput}>
            <form onSubmit={handleSubmit} className={styles.chatForm}>
                <input
                    type = "text"
                    value = {message}
                    onChange = {(event) => setMessage(event.target.value)}
                    placeholder = "Ask anything..."
                    className={styles.messageInput}
                />
                <button type="submit" className={styles.sendButton}>
                    Send
                </button>
            </form>
        </div>
    )
}
import React, {useState} from 'react';
import styles from './chatInput.module.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput ({ onSendMessage, disabled}: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim() && !disabled) {
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
                    disabled={disabled}
                />
                <button 
                    type="submit" 
                    className={styles.sendButton}
                    disabled={disabled || !message.trim()}
                >
                    {disabled ? "..." : "Send"}
                </button>
            </form>
        </div>
    )
}
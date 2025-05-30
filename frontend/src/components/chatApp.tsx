import React from 'react';
import ChatHistory from './chatHistory.tsx';   
import ChatInput from './chatInput.tsx';      
import styles from './chatApp.module.css'; 
import { useChat } from '../hooks/useChat.tsx'; 

export default function ChatApp() {
   const { messages, isLoading, handleSendMessage } = useChat();

    return (
        <div className={styles.chatApp}>
            <div className={styles.chatContainer}>
                <div className={styles.historySection}>
                    <ChatHistory messages={messages} />
                </div>
                <div className = {styles.inputSection}>
                    <ChatInput 
                        onSendMessage={handleSendMessage} 
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}
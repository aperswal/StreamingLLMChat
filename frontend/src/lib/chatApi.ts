export interface ChatApiResponse {
    reply: string;
}

export const sendChatMessage = async (message: string): Promise<string> => {
    const response = await fetch('/api/chat', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    const data: ChatApiResponse = await response.json();
    return data.reply;
};
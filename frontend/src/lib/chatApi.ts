export interface ChatApiResponse {
    reply: string;
}

export const sendChatMessage = async (message: string, onChunk: (chunk: string) => void): Promise<string> => {

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok || !response.body) {
            throw new Error('Failed to send message');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = decoder.decode(value);
            const lines = text.split('\n\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        break;
                    }

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.content) {
                            fullResponse += parsed.content;
                            onChunk(parsed.content);
                        }
                    } catch (error) {
                        console.error('Error parsing chunk:', error);
                    }
                }
            }
        }
        return fullResponse;
    } catch (error) {
        console.error('Error in sendChatMessage:', error);
        throw new Error('Failed to send message');
    }
};
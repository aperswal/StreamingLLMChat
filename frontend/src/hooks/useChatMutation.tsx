import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '../lib/chatApi.ts';

interface UseChatMutationProps {
    onMessageUpdate: (chunk: string) => void;
    onError: (error: Error) => void;
}

export const useChatMutation = ({ onMessageUpdate, onError }: UseChatMutationProps) => {
    return useMutation ({
        mutationFn: async (text: string) => {
            await sendChatMessage(text, onMessageUpdate);
            return "Complete";
        },
        onError,
    });
};
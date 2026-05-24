import apiClient from '../api/apiClient';
import type {
  ConversationDTO,
  ConversationPagesResponse,
  MessageDTO,
  SendMessagePayload,
} from '../types/api.types';

export const conversationService = {
  async getConversations(): Promise<ConversationDTO[]> {
    const { data } = await apiClient.get<ConversationDTO[]>('/conversations');
    return data;
  },

  async getMessages(conversationId: string): Promise<MessageDTO[]> {
    const { data } = await apiClient.get<ConversationPagesResponse>(
      `/conversations/${conversationId}/pages`
    );
    const pages = data.pages.list;
    if (pages.length === 0) return [];
    return pages[pages.length - 1].messages;
  },

  async sendMessage(payload: SendMessagePayload): Promise<void> {
    await apiClient.post('/conversations/messages', payload);
  },
};
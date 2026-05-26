// Auth
export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  access_token_expires_in: number;
  access_token_expires_at: string;
  refresh_token_expires_in: number;
  refresh_token_expires_at: string;
}

// Conversations
export interface ConversationDTO {
  _id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

// Messages
export interface MessageDTO {
  _id: string;
  sender: string;
  content: string;
  timestamp?: string;
}

export interface PageDTO {
  messages: MessageDTO[];
}

export interface ConversationPagesResponse {
  pages: {
    list: PageDTO[];
  };
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
}
// Auth
export interface AuthUser {
  _id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
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
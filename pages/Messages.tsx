import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Smile, Paperclip } from 'lucide-react';
import { Input, Button, Badge, Avatar, Tooltip, Typography, Space } from 'antd';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import apiClient from '../src/api/apiClient';

const { Text, Title } = Typography;

interface IConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface IMessage {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

const TOKEN = '#e8385a';

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get('/conversations');
      const convData: IConversation[] = response.data.map((conv: any) => ({
        id: conv._id,
        ...conv,
        avatar: conv.avatar || `https://i.pravatar.cc/150?u=${conv._id}`,
        lastMessage: conv.lastMessage || 'No messages yet',
        timestamp: conv.timestamp || new Date().toLocaleTimeString(),
        unread: conv.unread || 0,
      }));
      setConversations(convData);
      if (convData.length > 0) setSelectedConversation(convData[0]);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      const response = await apiClient.get(`/conversations/${selectedConversation.id}/pages`);
      const pages = response.data.pages.list;
      if (pages.length === 0) { setMessages([]); return; }
      const lastPage = pages[pages.length - 1];
      const messagesData: IMessage[] = lastPage.messages.map((message: any) => ({
        id: message._id,
        sender: message.sender,
        text: message.content,
        timestamp: message.timestamp || new Date().toLocaleTimeString(),
      }));
      setMessages(messagesData);
    };
    fetchMessages().catch(console.error);
  }, [selectedConversation]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const optimisticMsg: IMessage = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setNewMessage('');
    setIsSending(true);

    try {
      await apiClient.post('/conversations/messages', {
        conversationId: selectedConversation?.id,
        content: optimisticMsg.text,
      });
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
      console.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 8rem)', overflow: 'hidden' }}>
      {/* Conversation List */}
      <div style={{ width: '25%', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: '0 0 12px' }}>Chats</Title>
          <Input
            placeholder="Search messages"
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            style={{ borderRadius: 999 }}
            aria-label="Search messages"
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((convo) => {
            const isSelected = selectedConversation?.id === convo.id;
            return (
              <div
                key={convo.id}
                onClick={() => setSelectedConversation(convo)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: isSelected ? '#fff0f3' : undefined,
                  borderLeft: isSelected ? `3px solid ${TOKEN}` : '3px solid transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#fafafa'; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = ''; }}
              >
                <Avatar src={convo.avatar} alt={convo.name} size={48} style={{ flexShrink: 0, marginRight: 12 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {convo.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 11, flexShrink: 0, marginLeft: 8 }}>
                      {convo.timestamp}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary" style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {convo.lastMessage}
                    </Text>
                    {convo.unread > 0 && <Badge count={convo.unread} size="small" style={{ marginLeft: 8, flexShrink: 0 }} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Chat Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Space>
            <Avatar src={selectedConversation?.avatar} size={40} />
            <div>
              <Text strong style={{ display: 'block' }}>{selectedConversation?.name || ''}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>Online</Text>
            </div>
          </Space>
          <Space size={4}>
            <Tooltip title="Voice call">
              <Button type="text" icon={<Phone size={20} />} aria-label="Voice call" />
            </Tooltip>
            <Tooltip title="Video call">
              <Button type="text" icon={<Video size={20} />} aria-label="Video call" />
            </Tooltip>
            <Tooltip title="More options">
              <Button type="text" icon={<MoreVertical size={20} />} aria-label="More options" />
            </Tooltip>
          </Space>
        </div>

        {/* Messages Area */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', background: '#fafafa' }}>
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} style={{ display: 'flex', marginBottom: 16, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: 420,
                  padding: '10px 14px',
                  borderRadius: 16,
                  background: isMe ? TOKEN : '#fff',
                  border: isMe ? 'none' : '1px solid #f0f0f0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}>
                  <Text style={{ display: 'block', color: isMe ? '#fff' : undefined }}>{msg.text}</Text>
                  <Text style={{ display: 'block', fontSize: 11, marginTop: 4, textAlign: 'right', color: isMe ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
                    {msg.timestamp}
                  </Text>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <form onSubmit={handleSendMessage}>
            <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tooltip title="Attach file">
                <Button type="text" icon={<Paperclip size={20} />} aria-label="Attach file" />
              </Tooltip>
              <Tooltip title="Emoji">
                <Button type="text" icon={<Smile size={20} />} aria-label="Emoji" />
              </Tooltip>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ borderRadius: 999, flex: 1 }}
                aria-label="Message input"
              />
              <Button
                type="primary"
                htmlType="submit"
                shape="circle"
                icon={<SendOutlined />}
                loading={isSending}
                disabled={!newMessage.trim()}
                aria-label="Send message"
              />
            </Space.Compact>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

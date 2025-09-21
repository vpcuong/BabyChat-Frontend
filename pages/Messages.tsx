import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Video, Phone, MoreVertical, Smile, Paperclip } from 'lucide-react';
import apiClient from '../src/api/apiClient';
// --- MOCK DATA ---
const conversationsData: IConversation[] = [
  { id: '1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice', lastMessage: 'Sounds good!', timestamp: '10:42 AM', unread: 2 },
  { id: '2', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=bob', lastMessage: 'See you then.', timestamp: '9:30 AM', unread: 0 },
  { id: '3', name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=charlie', lastMessage: 'Can you send the file?', timestamp: 'Yesterday', unread: 0 },
  { id: '4', name: 'Diana', avatar: 'https://i.pravatar.cc/150?u=diana', lastMessage: 'Happy Birthday!', timestamp: 'Yesterday', unread: 1 },
  { id: '5', name: 'Ethan', avatar: 'https://i.pravatar.cc/150?u=ethan', lastMessage: 'Project update is ready.', timestamp: '2 days ago', unread: 0 },
];

// --- END MOCK DATA ---
interface IConversation{
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface IMessage{
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

interface Props {
  // Define your props here
  userId?: number;
}

const MessagesPage: React.FC<Props> = () => {
  const [conversations, setConversations]: [IConversation[] | [], React.Dispatch<React.SetStateAction<IConversation[] | []>>] = useState<IConversation[] | []>([]);
  const [selectedConversation, setSelectedConversation]: [IConversation | null, React.Dispatch<React.SetStateAction<IConversation | null>>] = useState<IConversation | null>(conversations[0]);
  const [messages, setMessages]: [IMessage[] | [], React.Dispatch<React.SetStateAction<IMessage[] | []>>]
  = useState<IMessage[] | []>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
        const data = await apiClient.get('/conversations');
        const convData: IConversation[] = data.data.map((conv: { _id: string; [key: string]: any }) => {
          const { _id, ...rest } = conv;
          return {
            id: _id,
            ...rest
          };
        });

        setConversations(
          convData.map(conv => ({
            ...conv,
            unread: 2,
            avatar: `https://i.pravatar.cc/150`,
            lastMessage: 'Sounds good!',
            timestamp: '10:42 AM'
          }))
        )

        setSelectedConversation(convData[0])
    }
    
    fetchData().catch(console.error) // Handle any errors
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
   
    setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, sender: 'user', text: newMessage, timestamp: new Date().toLocaleTimeString() }]);
    setNewMessage('');
  };

  const setCurrentChat = (convo: IConversation): void => {
    console.log(convo)
    setSelectedConversation(convo)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Conversation List (Sidebar) */}
      <div className="w-1/4 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl dark:text-white font-bold">Chats</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {conversations.map((convo) => (
            <div key={convo.id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-300 ${selectedConversation?.id === convo.id ? 'bg-gray-200' : 'bg-gray-100'}`}
              onClick={() => setCurrentChat(convo)}
            >
              <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{convo.name}</h3>
                  <span className="text-xs text-gray-500">{convo.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                  {convo.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{convo.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center">
            <img src={selectedConversation?.avatar || ''} alt={selectedConversation?.name|| ''} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h3 className="font-semibold text-lg dark:text-white">{selectedConversation?.name || ''}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <Phone size={22} className="cursor-pointer hover:text-primary-500" />
            <Video size={22} className="cursor-pointer hover:text-primary-500" />
            <MoreVertical size={22} className="cursor-pointer hover:text-primary-500" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50 dark:bg-surface">
          {messages.map((msg: IMessage) => (
            <div key={msg.id} className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white border' } rounded-lg p-3`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'} text-right`}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <Paperclip className="text-gray-500 cursor-pointer hover:text-primary-500" size={22} />
            <Smile className="text-gray-500 cursor-pointer hover:text-primary-500" size={22} />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="submit" className="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 cursor-pointer">
              <Send size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
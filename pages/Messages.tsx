import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Video, Phone, MoreVertical, Smile, Paperclip } from 'lucide-react';

// --- MOCK DATA ---
const conversationsData = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice', lastMessage: 'Sounds good!', timestamp: '10:42 AM', unread: 2 },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=bob', lastMessage: 'See you then.', timestamp: '9:30 AM', unread: 0 },
  { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=charlie', lastMessage: 'Can you send the file?', timestamp: 'Yesterday', unread: 0 },
  { id: 4, name: 'Diana', avatar: 'https://i.pravatar.cc/150?u=diana', lastMessage: 'Happy Birthday!', timestamp: 'Yesterday', unread: 1 },
  { id: 5, name: 'Ethan', avatar: 'https://i.pravatar.cc/150?u=ethan', lastMessage: 'Project update is ready.', timestamp: '2 days ago', unread: 0 },
];

const messagesData = {
  1: [
    { id: 1, sender: 'Alice', text: 'Hey, are we still on for lunch tomorrow?', timestamp: '10:40 AM' },
    { id: 2, sender: 'me', text: 'Yes, absolutely! 1 PM at The usual place?', timestamp: '10:41 AM' },
    { id: 3, sender: 'Alice', text: 'Sounds good!', timestamp: '10:42 AM' },
  ],
  2: [
    { id: 1, sender: 'Bob', text: 'Meeting is confirmed for 3 PM.', timestamp: '9:29 AM' },
    { id: 2, sender: 'me', text: 'Great, I will be there.', timestamp: '9:29 AM' },
    { id: 3, sender: 'Bob', text: 'See you then.', timestamp: '9:30 AM' },
  ],
};
// --- END MOCK DATA ---

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversationsData[0]);
  const [messages, setMessages] = useState(messagesData[selectedConversation.id] || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setMessages(messagesData[selectedConversation.id] || []);
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Conversation List (Sidebar) */}
      <div className="w-1/4 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Chats</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {conversationsData.map((convo) => (
            <div
              key={convo.id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${selectedConversation.id === convo.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedConversation(convo)}
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
            <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h3 className="font-semibold text-lg">{selectedConversation.name}</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <Phone size={22} className="cursor-pointer hover:text-blue-500" />
            <Video size={22} className="cursor-pointer hover:text-blue-500" />
            <MoreVertical size={22} className="cursor-pointer hover:text-blue-500" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
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
            <Paperclip className="text-gray-500 cursor-pointer hover:text-blue-500" size={22} />
            <Smile className="text-gray-500 cursor-pointer hover:text-blue-500" size={22} />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
              <Send size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
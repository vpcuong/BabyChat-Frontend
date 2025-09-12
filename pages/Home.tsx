import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText, Users, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: <Zap size={32} className="text-primary-500" />,
    title: 'Instant Messaging',
    description: 'Connect in real-time with our blazing-fast messaging infrastructure. No delays, just conversation.',
  },
  {
    icon: <Users size={32} className="text-primary-500" />,
    title: 'Group Chats',
    description: 'Create groups for your friends, family, or team. Stay connected with everyone in one place.',
  },
  {
    icon: <ShieldCheck size={32} className="text-primary-500" />,
    title: 'Secure & Private',
    description: 'Your conversations are yours. With end-to-end encryption, your privacy is our top priority.',
  },
  {
    icon: <MessageSquareText size={32} className="text-primary-500" />,
    title: 'Rich Communication',
    description: 'Express yourself fully with support for emojis, GIFs, and file sharing. Make every chat lively.',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Connect Instantly,
            <br />
            <span className="text-primary-500">Chat Seamlessly.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Welcome to Baby Chat, the simple, fast, and secure way to stay in touch with the people who matter most.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/messages"
              className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-full shadow-lg hover:bg-primary-600 transition-transform transform hover:scale-105"
            >
              Start Chatting
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-surface text-primary-500 dark:bg-gray-700 dark:text-primary-300 font-semibold rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need to Connect
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              A feature-rich experience designed for modern communication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface p-6 rounded-lg shadow-sm text-center card-hover"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Ready to Join the Conversation?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Create an account in seconds and start connecting with your world today. It's free!
          </p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="px-10 py-4 bg-primary-500 text-white font-bold text-lg rounded-full shadow-xl hover:bg-primary-600 transition-transform transform hover:scale-105"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import React, { type JSX } from 'react';
import { MessageSquare, Shield, Zap, Users, Globe, Heart } from 'lucide-react';

interface FeatureCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: <MessageSquare className="h-6 w-6 text-primary-500" />,
    title: 'Instant Messaging',
    description: 'Real-time messaging with friends and family across any device.',
  },
  {
    icon: <Shield className="h-6 w-6 text-primary-500" />,
    title: 'Secure Communication',
    description: 'End-to-end encryption ensures your conversations stay private.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary-500" />,
    title: 'Group Chats',
    description: 'Create groups for family, friends, or team collaboration.',
  },
  {
    icon: <Globe className="h-6 w-6 text-primary-500" />,
    title: 'Cross-Platform',
    description: 'Available on web, mobile, and desktop platforms.',
  },
  {
    icon: <Zap className="h-6 w-6 text-primary-500" />,
    title: 'Lightning Fast',
    description: 'Optimized for speed and reliability.',
  },
  {
    icon: <Heart className="h-6 w-6 text-primary-500" />,
    title: 'User-Friendly',
    description: 'Intuitive interface designed for everyone.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Baby Chat
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Baby Chat is a modern messaging platform designed to bring people closer together through seamless communication. We believe in making conversations more meaningful, secure, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Baby Chat?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
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

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We're on a mission to transform how people connect and communicate in the digital age. By providing a secure, fast, and intuitive messaging platform, we're making it easier for everyone to stay connected with the people who matter most.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-4xl font-bold text-primary-500">
              <span className="block mb-2">1M+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
            </div>
            <div className="text-4xl font-bold text-primary-500">
              <span className="block mb-2">150+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Countries</span>
            </div>
            <div className="text-4xl font-bold text-primary-500">
              <span className="block mb-2">24/7</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-500 dark:bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join millions of users already enjoying Baby Chat's secure messaging platform.
          </p>
          <button className="bg-white text-primary-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Create Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
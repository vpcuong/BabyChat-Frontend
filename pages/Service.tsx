import React, { type JSX } from 'react';
import { MessageSquare, Video, Phone, Cloud, Lock, Headphones, Check } from 'lucide-react';

interface ServiceFeature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const services: ServiceFeature[] = [
  {
    icon: <MessageSquare className="h-8 w-8 text-primary-500" />,
    title: 'Text Messaging',
    description: 'Send instant messages with emoji support and file sharing capabilities.',
  },
  {
    icon: <Video className="h-8 w-8 text-primary-500" />,
    title: 'Video Calls',
    description: 'Crystal clear video calls with up to 8 participants simultaneously.',
  },
  {
    icon: <Phone className="h-8 w-8 text-primary-500" />,
    title: 'Voice Calls',
    description: 'High-quality voice calls with noise cancellation technology.',
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary-500" />,
    title: 'Cloud Storage',
    description: 'Secure cloud storage for your messages and shared files.',
  },
  {
    icon: <Lock className="h-8 w-8 text-primary-500" />,
    title: 'Enhanced Security',
    description: 'End-to-end encryption and two-factor authentication.',
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary-500" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your needs.',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for personal use',
    features: [
      'Unlimited text messaging',
      'Basic file sharing',
      'Group chats up to 10 people',
      '1GB cloud storage',
      'Standard support',
    ],
  },
  {
    name: 'Pro',
    price: '$9.99/mo',
    description: 'Great for small teams',
    highlighted: true,
    features: [
      'Everything in Basic',
      'Video calls up to 8 people',
      'Group chats up to 50 people',
      '10GB cloud storage',
      'Priority support',
      'Custom emojis',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Unlimited video calls',
      'Unlimited group size',
      'Custom storage options',
      '24/7 dedicated support',
      'Admin dashboard',
      'Custom integration',
    ],
  },
];

const ServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the full range of communication tools and services designed to keep you connected with the world.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-surface rounded-lg shadow-sm card-hover transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${
                  plan.highlighted
                    ? 'bg-primary-500 text-white transform scale-105'
                    : 'bg-white dark:bg-gray-700'
                }`}
              >
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold mb-2">{plan.price}</div>
                  <p className={`mb-6 ${
                    plan.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className={`h-5 w-5 mr-2 ${
                        plan.highlighted ? 'text-white' : 'text-primary-500'
                      }`} />
                      <span className={plan.highlighted ? 'text-white' : 'dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-8 py-3 px-6 rounded-full font-semibold ${
                    plan.highlighted
                      ? 'bg-white text-primary-500 hover:bg-gray-100'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  } transition-colors`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Contact our sales team to discuss custom enterprise solutions tailored to your organization's needs.
          </p>
          <button className="bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors">
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
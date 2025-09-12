// src/components/Layout/Footer.tsx
import React from 'react';
import type { FooterProps } from '../../types/layout';

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-surface text-primary-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Baby chat</h3>
              <p className="text-primary-500 text-sm">
                Building amazing experiences with React, TypeScript, and Tailwind CSS.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-primary-500 hover:text-primary-700 text-sm transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-primary-500 hover:text-primary-700 text-sm transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-primary-500 hover:text-primary-700 text-sm transition-colors duration-200">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-primary-500 hover:text-primary-700 text-sm transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="text-primary-500 text-sm space-y-2">
                <p>Email: contact@yourapp.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-800 mt-8 pt-8">
            <p className="text-center text-primary-500 text-sm">
              © {currentYear} Your App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
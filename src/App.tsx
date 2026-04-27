// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme, Typography } from 'antd';
import { Layout } from '../components/Layout';
import MessagesPage from '../pages/Messages';
import HomePage from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import Service from '../pages/Service';
import { Toaster } from 'react-hot-toast';

// Example page components


const Dashboard: React.FC = () => (
  <div>
    <Typography.Title level={2}>Dashboard</Typography.Title>
    <Typography.Text type="secondary">Your dashboard content goes here.</Typography.Text>
  </div>
);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#e8385a',
          borderRadius: 8,
          fontFamily: 'inherit',
        },
      }}
    >
    <div className="App">
      <Router>
        <Routes>
          {/* Routes with standard layout */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          <Route
            path="/services"
            element={
              <Layout>
                <Service />
              </Layout>
            }
          />

          <Route
            path="/messages"
            element={
              <Layout showFooter={false}>
                <MessagesPage />
              </Layout>
            }
          />
          
          {/* Route with sidebar */}
          <Route
            path="/dashboard"
            element={
              <Layout showSidebar={true}>
                <Dashboard />
              </Layout>
            }
          />
          
          {/* Route without header/footer */}
          <Route
            path="/minimal"
            element={
              <Layout showHeader={false} showFooter={false}>
                <div>
                  <Typography.Title level={3}>Minimal Layout</Typography.Title>
                  <p>No header or footer on this page.</p>
                </div>
              </Layout>
            }
          />

          <Route
            path="/login"
            element={
                <Login />
            }
          />

          <Route
            path="/signup"
            element={
                <SignUp />
            }
          />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
    </ConfigProvider>
  );
};

export default App;
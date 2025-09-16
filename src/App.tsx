// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <p className="text-gray-600">Your dashboard content goes here.</p>
  </div>
);

const App: React.FC = () => {
  return (
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
                  <h1 className="text-2xl font-bold">Minimal Layout</h1>
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
  );
};

export default App;
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import MessagesPage from '../pages/Messages';
import HomePage from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import Service from '../pages/Service';

// Example page components


const Dashboard: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <p className="text-gray-600">Your dashboard content goes here.</p>
  </div>
);

const App: React.FC = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;
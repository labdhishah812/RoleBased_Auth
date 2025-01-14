import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';

const NavigationBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-orange-500">AuthApp</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/customer/register"
                className="border-transparent text-gray-500 hover:text-orange-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Customer Register
              </Link>
              <Link
                to="/admin/register"
                className="border-transparent text-gray-500 hover:text-orange-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Admin Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const location = useLocation();
  const showNavbar = !location.pathname.includes('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <NavigationBar />}
      
      <Routes>
        <Route path="/customer/register" element={<Register />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/customer/register" />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
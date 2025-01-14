import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/customer/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-50">
      <div className="text-center bg-white shadow-xl p-8 rounded-2xl max-w-md w-full mx-4 transform transition-all hover:scale-105">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h2 className="text-4xl font-bold text-orange-500 mb-4">
          Thank You!
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          Your Login was successful! Welcome to our Application.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleBackToLogin}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform transition-all active:scale-95 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
          
          <p className="text-sm text-gray-400">
            You can now access all features with your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
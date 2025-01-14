import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Settings, Target } from 'lucide-react';
import FormInput from '../../components/FormInput';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.pathname.includes('admin');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
        if (!formData.email || !formData.password) {
          setError("Please fill in all fields");
          return false;
        }
        return true;
      };

  const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        setIsLoading(true);
        setError("");
    
        try {
          const endpoint = isAdminLogin
            ? "http://localhost:5000/api/auth/admin/login"
            : "http://localhost:5000/api/auth/login";
    
          console.log("Sending login request to:", endpoint);
          console.log("With data:", formData);
    
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });
    
          console.log("Response status:", response.status);
    
          const data = await response.json();
          console.log("Response data:", data);
    
          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }
          if (isAdminLogin && data.user.role !== "admin") {
            throw new Error("You do not have permission to access the admin panel");
          }
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
    
          if (data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/admin/dashboard");
          }
        } catch (err) {
          console.error("Login error:", err);
          setError(err.message || "An error occurred during login");
        } finally {
          setIsLoading(false);
        }
      };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 relative bg-orange-500 text-white p-12 flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">New here?</h2>
          <p className="text-orange-100">
            Join our platform to access all features and services.
          </p>
          <Link
            to={isAdminLogin ? "/admin/register" : "/customer/register"}
            className="mt-4 inline-block px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-colors rounded-lg"
          >
            SIGN UP
          </Link>
        </div>

        {/* Illustration Section */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute -left-8 top-0 p-3 bg-white rounded-full shadow-lg">
            <Lock className="w-6 h-6 text-orange-500" />
          </div>
          <div className="absolute right-0 top-8 p-3 bg-white rounded-full shadow-lg">
            <Settings className="w-6 h-6 text-orange-500" />
          </div>
          <div className="absolute right-8 bottom-0 p-3 bg-white rounded-full shadow-lg">
            <Target className="w-6 h-6 text-orange-500" />
          </div>
          <div className="absolute left-4 bottom-8 p-3 bg-white rounded-full shadow-lg">
            <User className="w-6 h-6 text-orange-500" />
          </div>

          {/* Main Illustration */}
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-orange-400 rounded-lg transform -rotate-6"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isAdminLogin ? 'Admin Login' : 'Sign in'}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              icon={Mail}
            />

            <div className="relative">
              <FormInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={Lock}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
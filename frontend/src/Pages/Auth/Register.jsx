import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Settings,
  Target,
  Shield,
} from "lucide-react";
import FormInput from "../../components/FormInput";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRegistration = location.pathname.includes("admin");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const endpoint = isAdminRegistration
        ? "http://localhost:5000/api/auth/register/admin"
        : "http://localhost:5000/api/auth/register/customer";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: isAdminRegistration ? "admin" : "customer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      alert("Registration successful!.");
      navigate(isAdminRegistration ? "/admin/login" : "/customer/login");
    } catch (error) {
      setErrors({
        general:
          error.message ||
          "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section with Orange Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-orange-500 text-white p-12 flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Already have an account?</h2>
          <p className="text-orange-100">
            Sign in to continue your journey with us.
          </p>
          <Link
            to={isAdminRegistration ? "/admin/login" : "/customer/login"}
            className="mt-4 inline-block px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-colors rounded-lg"
          >
            SIGN IN
          </Link>
        </div>

        {/* Illustration Section */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute -left-8 top-0 p-3 bg-white rounded-full shadow-lg">
            <Shield className="w-6 h-6 text-orange-500" />
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
            <div className="absolute inset-0 bg-orange-400 rounded-lg transform rotate-6"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Right Section with Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isAdminRegistration ? "Create Admin Account" : "Create Account"}
            </h2>
          </div>

          {errors.general && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                icon={User}
                error={errors.firstName}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                icon={User}
                error={errors.lastName}
              />
            </div>

            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email}
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
                error={errors.password}
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
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;

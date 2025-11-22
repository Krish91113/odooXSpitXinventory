import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted:", formData);
    alert("Login info logged to console");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      
      {/* Main Card */}
      <div className="max-w-md w-full space-y-8 bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your inventory
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Login ID */}
            <div>
              <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-1">
                Login ID
              </label>
              <input
                id="loginId"
                name="loginId"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="Enter your Login ID"
                value={formData.loginId}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition duration-200 shadow-lg"
              onClick={navigate("/dashboard")}
            >
              Sign In
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-gray-900 hover:underline">
                Create account
              </a>
            </p>    
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
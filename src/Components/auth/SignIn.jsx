import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signIn } from "../../lib/auth";

const Signin = () => {
  const navigate = useNavigate(); // ✅ Only declared ONCE

  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });

  // ✅ Added status state
  const [status, setStatus] = useState({
    error: '',
    success: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user types
    if (status.error) {
      setStatus({ error: '', success: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setStatus({ error: '', success: '' });

    // Basic validation
    if (formData.password.length < 6 || formData.password.length > 10) {
      setStatus({ error: 'Password must be between 6-10 characters', success: '' });
      return;
    }

    try {
      console.log("Login Submitted:", formData);
      
      // TODO: Replace with actual signIn API call
      // const response = await signIn({
      //   email: formData.loginId,
      //   password: formData.password
      // });

      setStatus({ success: 'Login successful!', error: '' });
      
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      setStatus({ error: 'Login failed. Please check your credentials.', success: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 font-sans">
      
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

        {/* Status messages */}
        {status.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {status.error}
          </div>
        )}
        {status.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
            {status.success}
          </div>
        )}

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
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="Enter your email"
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

              {/* Password Requirement */}
              {formData.password.length > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    formData.password.length >= 6 && formData.password.length <= 10
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Password must be between 6–10 characters
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status.success !== ''}
            >
              {status.success ? 'Redirecting...' : 'Sign In'}
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
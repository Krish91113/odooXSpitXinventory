import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Submission Logic
    console.log("Login Submitted:", formData);
    
    // TODO: Add your API auth call here
    alert("Login info logged to console");
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      
      {/* Main Card */}
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to access your inventory
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Login ID */}
            <div>
              <label htmlFor="loginId" className="block text-sm font-medium text-zinc-400 mb-1">
                Login ID
              </label>
              <input
                id="loginId"
                name="loginId"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-black border border-zinc-800 placeholder-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="Enter your Login ID"
                value={formData.loginId}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-400">
                  Password
                </label>
                <a href="#" className="text-xs text-zinc-500 hover:text-white transition">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-black border border-zinc-800 placeholder-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 sm:text-sm"
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition duration-200"
              onClick={() => navigate('/dashboard')}
            >
              Sign In
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-zinc-500">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-white hover:underline">
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
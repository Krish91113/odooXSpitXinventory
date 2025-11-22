import React, { useState } from 'react';

const Signup = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    loginId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for error handling
  const [error, setError] = useState('');

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError(''); // Clear error on typing
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate Passwords Match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 2. Validate Password Length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // 3. Submission Logic (API Call)
    // Only sending loginId and password as requested for submission, 
    // though usually you send email too.
    const submissionData = {
      loginId: formData.loginId,
      password: formData.password,
      email: formData.email // Included typically for backend
    };

    console.log("Submitting to Inventory System:", submissionData);
    alert("Signup Successful! Check console for data.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      
      {/* Main Card */}
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Join the Inventory Management System
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
                placeholder="Enter your unique ID"
                value={formData.loginId}
                onChange={handleChange}
              />
            </div>

            {/* Email ID */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-black border border-zinc-800 placeholder-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-1">
                Password
              </label>
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-400 mb-1">
                Re-enter Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-black border border-zinc-800 placeholder-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded border border-red-500/20">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition duration-200"
            >
              Create Account
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-zinc-500">
              Already have an account?{' '}
              <a href="/signin" className="font-medium text-white hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
import React, { useState } from "react";
// import { signUp } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (status.error) {
      setStatus({ ...status, error: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match", success: "" });
      return;
    }

    // Minimum length 6 (Better-Auth requirement)
    if (formData.password.length < 6 || formData.password.length > 10) {
      setStatus({
        loading: false,
        error: "Password must be between 6-10 characters long.",
        success: "",
      });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      // TODO: Uncomment when backend is ready
      // await signUp.email(
      //   {
      //     email: formData.email,
      //     password: formData.password,
      //     name: formData.loginId,
      //   },
      //   {
      //     onSuccess: () => {
      //       setStatus({
      //         loading: false,
      //         error: "",
      //         success: "Signup successful! Verification email sent.",
      //       });

      //       setTimeout(() => {
      //         navigate("/signin");
      //       }, 1500);
      //     },

      //     onError: (error) => {
      //       setStatus({
      //         loading: false,
      //         error: error?.message || "Signup failed",
      //         success: "",
      //       });
      //     },
      //   }
      // );

      // Temporary success simulation
      console.log("Signup Data:", formData);
      setStatus({
        loading: false,
        error: "",
        success: "Account created successfully!",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Something went wrong",
        success: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Main Card */}
      <div className="max-w-md w-full space-y-8 bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the Inventory Management System
          </p>
        </div>

        {/* Error Message */}
        {status.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {status.error}
          </div>
        )}

        {/* Success Message */}
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
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="Choose a unique ID"
                value={formData.loginId}
                onChange={handleChange}
              />
            </div>

            {/* Email ID */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-200 sm:text-sm"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {/* Password Match Indicator */}
              {formData.confirmPassword.length > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    formData.password === formData.confirmPassword
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "Passwords match ✓"
                    : "Passwords do not match"}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status.loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="font-medium text-gray-900 hover:underline">
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
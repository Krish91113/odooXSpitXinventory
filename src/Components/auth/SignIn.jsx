import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../lib/auth";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user types
    if (status.error) {
      setStatus({ error: "", success: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password length
    if (formData.password.length < 6 || formData.password.length > 12) {
      setStatus({
        loading: false,
        error: "Password must be between 6-12 characters",
        success: "",
      });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      await signIn({
        email: formData.loginId,
        password: formData.password,
      });

      setStatus({
        loading: false,
        error: "",
        success: "Login successful!",
      });

      setTimeout(() => navigate("/dashboard"), 800);

    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Login failed. Please check your credentials.",
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
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your inventory
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
              <label
                htmlFor="loginId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="/forgetpassword"
                  className="text-xs text-gray-600 hover:text-gray-900 transition"
                >
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

              {/* Password Requirement */}
              {formData.password.length > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    formData.password.length >= 6 &&
                    formData.password.length <= 12
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Password must be between 6–12 characters
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
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-gray-900 hover:underline"
              >
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
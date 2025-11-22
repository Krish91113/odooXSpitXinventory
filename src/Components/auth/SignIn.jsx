import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signIn } from "../../lib/auth";

const Signin = () => {
  const navigate = useNavigate(); // ✅ Only declared ONCE

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
      setStatus({ error: '', success: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: "", success: "" });

    try {
      await signIn.email(
        {
          email: formData.loginId,
          password: formData.password,
        },
        {
          onSuccess: () => {
            setStatus({
              loading: false,
              error: "",
              success: "Login successful!",
            });

            setTimeout(() => navigate("/dashboard"), 800);
          },

          onError: (ctx) => {
            setStatus({
              loading: false,
              error: ctx.error?.message || "Login failed",
              success: "",
            });
          },
        }
      );
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Something went wrong",
        success: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
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
              <label
                htmlFor="loginId"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Login ID
              </label>
              <input
                id="loginId"
                name="loginId"
                type="email"
                required
                className="w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Enter your email"
                value={formData.loginId}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
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
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Password must be between 6-12 characters
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {status.loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-zinc-500">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-white hover:underline"
              >
                Create account
              </a>
            </p>
          </div>
          <div className="text-center text-sm">
            <p className="text-zinc-500">
              <a
                href="/forgetpassword"
                className="font-medium text-white hover:underline"
              >
                ForgetPassword
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
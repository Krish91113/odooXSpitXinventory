import React, { useState } from "react";
import { signUp } from "../../lib/auth";
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
    if (formData.password.length < 6) {
      setStatus({
        loading: false,
        error: "Password must be at least 6 characters long.",
        success: "",
      });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      await signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.loginId, // storing loginId as name
        },
        {
          onSuccess: () => {
            setStatus({
              loading: false,
              error: "",
              success: "Signup successful! Verification email sent.",
            });

            setTimeout(() => {
              navigate("/signin");
            }, 1500);
          },

          onError: (error) => {
            setStatus({
              loading: false,
              error: error?.message || "Signup failed",
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
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the Inventory Management System
          </p>
        </div>

        {/* Error */}
        {status.error && (
          <p className="text-red-400 text-center bg-red-500/10 py-2 rounded border border-red-500/20 text-sm">
            {status.error}
          </p>
        )}

        {/* Success */}
        {status.success && (
          <p className="text-green-400 text-center bg-green-500/10 py-2 rounded border border-green-500/20 text-sm">
            {status.success}
          </p>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Login ID */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Login ID</label>
              <input
                name="loginId"
                type="text"
                required
                className="w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg"
                placeholder="Choose a unique ID"
                value={formData.loginId}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-bold hover:bg-zinc-200"
          >
            {status.loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center text-sm">
            <p className="text-zinc-500">
              Already have an account?{" "}
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

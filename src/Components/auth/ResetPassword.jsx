import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../lib/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setStatus({
        loading: false,
        error: "Passwords do not match",
        success: "",
      });
      return;
    }

    // Validate password length
    if (formData.password.length < 6 || formData.password.length > 10) {
      setStatus({
        loading: false,
        error: "Password must be between 6-10 characters",
        success: "",
      });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      await resetPassword(
        {
          newPassword: formData.password,
          token
        },
        {
          onSuccess: () => {
            setStatus({
              loading: false,
              error: "",
              success: "Password reset successful! Redirecting to login...",
            });
            setTimeout(() => navigate("/signin"), 2000);
          },
          onError: (ctx) => {
            setStatus({
              loading: false,
              error: ctx.error?.message || "Failed to reset password",
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

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full text-center bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Invalid Link</h2>
          <p className="text-zinc-400 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <a
            href="/request-password-reset"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition"
          >
            Request New Link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Set New Password
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your new password below
          </p>
        </div>

        {/* Status messages */}
        {status.error && (
          <p className="text-red-500 text-center text-sm">{status.error}</p>
        )}
        {status.success && (
          <p className="text-green-500 text-center text-sm">{status.success}</p>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                New Password
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
              {formData.password.length > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    formData.password.length >= 6 &&
                    formData.password.length <= 10
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Password must be between 6–10 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formData.confirmPassword.length > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    formData.password === formData.confirmPassword
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {status.loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="text-center text-sm">
            <p className="text-zinc-500">
              Remember your password?{" "}
              <a
                href="/signin"
                className="font-medium text-white hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
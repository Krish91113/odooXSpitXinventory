import React, { useState } from "react";
import { requestPasswordReset } from "../../lib/auth";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: "", success: "" });

    try {
      await requestPasswordReset(
        {
          email: email,
          redirectTo: `${window.location.origin}/reset-password`,
        },
        {
          onError: (ctx) => {
            setStatus({
              loading: false,
              error: ctx.error?.message || "Failed to send reset email",
              success: "",
            });
          },
          onSuccess: () => {
            setStatus({
              loading: false,
              error: "",
              success: "Password reset link sent! Check your email.",
            });
            setEmail("");
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your email to receive a password reset link
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
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-black border border-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {status.loading ? "Sending..." : "Send Reset Link"}
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

export default RequestPasswordReset;
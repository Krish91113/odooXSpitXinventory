import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../lib/auth"; 
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    success: "",
    error: "",
  });

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) {
      setStatus({
        loading: false,
        error: "Invalid verification link. Token missing.",
        success: "",
      });
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(
          {
            query: { token },
          },
          {
            onSuccess: () => {
              setStatus({
                loading: false,
                success: "Email verified successfully!",
                error: "",
              });

              setTimeout(() => navigate("/signin"), 1500);
            },
            onError: (err) => {
              setStatus({
                loading: false,
                error: err?.message || "Failed to verify email.",
                success: "",
              });
            },
          }
        );
      } catch (error) {
        setStatus({
          loading: false,
          error: "Server error while verifying email.",
          success: "",
        });
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full p-8 bg-zinc-900/60 rounded-2xl border border-zinc-800 text-center">

        <h2 className="text-2xl font-bold text-white mb-4">Email Verification</h2>

        {status.loading && (
          <p className="text-zinc-300">Verifying your email...</p>
        )}

        {status.success && (
          <p className="text-green-400 bg-green-500/10 p-3 rounded">
            {status.success}
          </p>
        )}

        {status.error && (
          <p className="text-red-400 bg-red-500/10 p-3 rounded">
            {status.error}
          </p>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;

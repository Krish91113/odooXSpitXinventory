import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL:`${import.meta.env.VITE_API_URL}/api/auth`, // must point to the auth route
  autoSignIn: false,
});

// You must extract methods AFTER creating authClient
export const { requestPasswordReset,resetPassword,verifyEmail,signIn,signOut, signUp, useSession } = authClient;

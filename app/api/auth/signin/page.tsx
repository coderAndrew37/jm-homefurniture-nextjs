"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Sign in to Your Account
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Choose your preferred sign-in method
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/account" })}
          className="w-full flex items-center justify-center gap-3 border px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <Image src="/google.svg" alt="Google" width={24} height={24} />
          <span className="font-medium">Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-400 text-center mt-8">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

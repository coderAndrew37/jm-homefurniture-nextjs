"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Error Illustration */}
            <div className="mb-8 text-6xl">😔</div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Something went wrong!
              </h1>
              <p className="text-gray-600 mb-4">
                We apologize for the inconvenience. An unexpected error has
                occurred.
              </p>
              <p className="text-gray-500 text-sm">
                Our technical team has been notified and is working on a fix.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={reset}
                className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300"
              >
                Go Home
              </Link>
            </div>

            {/* Technical Details (Optional - for development) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-8 p-4 bg-red-50 rounded-lg text-left">
                <summary className="cursor-pointer font-semibold text-red-800">
                  Technical Details
                </summary>
                <pre className="mt-2 text-sm text-red-700 overflow-auto">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-sm text-red-700">
                    Error Digest: {error.digest}
                  </p>
                )}
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

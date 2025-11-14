"use client";

import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Phone number and message - update these with your actual details
  const phoneNumber = "254713874796"; // Replace with your WhatsApp number
  const defaultMessage =
    "Hello! I'm interested in your furniture designs. Can you help me?";

  // Show button after a short delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Hide initial tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-20 right-0 mb-3">
          <div className="bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl max-w-xs animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">Online Now</span>
            </div>
            <p>Need help with your custom design? Chat with us!</p>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-105"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Animated Ring */}
        <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-60 group-hover:animate-none"></div>

        {/* WhatsApp Icon */}
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418" />
        </svg>

        {/* Online Status Indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-3 border-white rounded-full animate-pulse"></div>

        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
          <span>💬</span>
        </div>
      </button>

      {/* Quick Action Menu */}
      <div className="mt-3 space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-100">
        <button
          onClick={() => {
            const message = encodeURIComponent(
              "Hi! I'd like to see more examples of your custom furniture work."
            );
            window.open(
              `https://wa.me/${phoneNumber}?text=${message}`,
              "_blank"
            );
          }}
          className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gray-50 w-full"
        >
          <span>📸 See Examples</span>
        </button>
        <button
          onClick={() => {
            const message = encodeURIComponent(
              "Hello! I need a quick quote for a custom furniture piece."
            );
            window.open(
              `https://wa.me/${phoneNumber}?text=${message}`,
              "_blank"
            );
          }}
          className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gray-50 w-full"
        >
          <span>💰 Get Quote</span>
        </button>
        <button
          onClick={() => {
            const message = encodeURIComponent(
              "I have questions about your customization process and timelines."
            );
            window.open(
              `https://wa.me/${phoneNumber}?text=${message}`,
              "_blank"
            );
          }}
          className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gray-50 w-full"
        >
          <span>❓ Ask Questions</span>
        </button>
      </div>
    </div>
  );
}

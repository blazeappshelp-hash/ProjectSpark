import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "919884995206"; // replace this

  const message = encodeURIComponent(
  "Hi, I'm ______\nI came from your website.\nI want details regarding Project Spark"
);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:brightness-110 transition-all duration-300 p-4 rounded-full shadow-lg"
    >
      {/* WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="white"
      >
        <path d="M16 .4C7.5.4.6 7.3.6 15.8c0 2.8.7 5.5 2.1 7.9L.4 31.6l8.1-2.1c2.3 1.3 4.9 2 7.5 2 8.5 0 15.4-6.9 15.4-15.4S24.5.4 16 .4zm0 28.1c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.3 6-13.3 13.3-13.3s13.3 6 13.3 13.3-6 13.3-13.3 13.3zm7.4-9.9c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.5-.2.2-.4.3-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6 0-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.5.2.2 2.3 3.6 5.6 5 .8.3 1.4.5 1.9.6.8.3 1.5.2 2.1.1.6-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
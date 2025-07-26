import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function WhatsAppButton({ 
  phoneNumber = "9061854239", 
  message = "Hello! I'm interested in Royal Taste Food Products.", 
  className = "",
  children
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center gap-2 transition-all duration-300 ${className}`}
    >
      {children || (
        <>
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </>
      )}
    </button>
  );
}

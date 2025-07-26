import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsSubmitting(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Thank you for subscribing!</p>
        <p className="text-green-700 text-sm">You'll receive updates about our latest products.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-amber-700" />
        Stay Updated
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Get notified about new products and special offers.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

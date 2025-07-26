import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminSetup() {
  const [isSettingUpAdmin, setIsSettingUpAdmin] = useState(false);
  const [setupStatus, setSetupStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const setupAdmin = async () => {
    setIsSettingUpAdmin(true);
    setSetupStatus('idle');

    try {
      // Set user as admin
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setSetupStatus('success');
        setMessage('Admin access granted successfully! You can now access the admin panel.');
        
        // Initialize sample products
        await fetch('/api/admin/init-products', {
          method: 'POST',
        });
        
        // Refresh page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setSetupStatus('error');
        setMessage(result.message || 'Failed to setup admin access');
      }
    } catch (error) {
      // Log error only in development
      if (import.meta.env.DEV) {
        console.error('Admin setup error:', error);
      }
      setSetupStatus('error');
      setMessage('Error setting up admin access');
    } finally {
      setIsSettingUpAdmin(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-500 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Admin Setup</h3>
          <p className="text-sm text-gray-600">Configure admin access for this application</p>
        </div>
      </div>

      {setupStatus === 'success' && (
        <div className="flex items-center gap-2 text-green-600 mb-4">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}

      {setupStatus === 'error' && (
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}

      <button
        onClick={setupAdmin}
        disabled={isSettingUpAdmin}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSettingUpAdmin ? 'Setting up...' : 'Setup Admin Access'}
      </button>
    </div>
  );
}

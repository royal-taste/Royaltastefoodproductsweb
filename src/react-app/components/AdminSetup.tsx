import { useState } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminSetup() {
  const { user } = useAuth();
  const [isSettingUpAdmin, setIsSettingUpAdmin] = useState(false);
  const [setupStatus, setSetupStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const setupAdmin = async () => {
    if (!user) return;
    
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
      console.error('Admin setup error:', error);
      setSetupStatus('error');
      setMessage('Error setting up admin access');
    } finally {
      setIsSettingUpAdmin(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Setup Admin Access</h2>
          
          {setupStatus === 'idle' && (
            <>
              <p className="text-gray-600 mb-6">
                Welcome! It looks like this is the first time you're accessing the admin panel. 
                Click below to set up your admin privileges and initialize the product database.
              </p>
              <button
                onClick={setupAdmin}
                disabled={isSettingUpAdmin}
                className="w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-4 rounded-lg hover:from-amber-800 hover:to-orange-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSettingUpAdmin ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Setting up...
                  </>
                ) : (
                  'Setup Admin Access'
                )}
              </button>
            </>
          )}

          {setupStatus === 'success' && (
            <div>
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-green-800 font-medium mb-2">Setup Complete!</p>
              <p className="text-gray-600 text-sm">{message}</p>
            </div>
          )}

          {setupStatus === 'error' && (
            <div>
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <p className="text-red-800 font-medium mb-2">Setup Failed</p>
              <p className="text-gray-600 text-sm mb-4">{message}</p>
              <button
                onClick={setupAdmin}
                className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-800 hover:to-orange-700 transition-all duration-300 font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              You are signed in as: {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

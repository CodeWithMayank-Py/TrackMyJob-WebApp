import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { resetPassword } from './authService';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      await resetPassword(email);
      setMessage('Password reset email sent. Please check your inbox.');
      setIsLoading(false);
      // Optionally redirect to sign-in page after a few seconds
      setTimeout(() => navigate('/signin'), 5000);
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-200 p-2 rounded w-full"
          />
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            {isLoading ? 'Sending...' : 'Send Password Reset Email'}
          </Button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

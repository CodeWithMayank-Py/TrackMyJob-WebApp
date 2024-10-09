import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => navigate('/signin'), 5000); // Redirect after a short delay
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full" />
          <span className="text-xl font-semibold">JobVault</span>
        </div>
        <a href="/signin" className="text-sm hover:underline">
          Sign In
        </a>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-zinc-400">Enter your email to reset your password</p>
          </div>
          <form className="space-y-4" onSubmit={handlePasswordReset}>
            <Input
              className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-700" type="submit">
              Send Password Reset Email
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

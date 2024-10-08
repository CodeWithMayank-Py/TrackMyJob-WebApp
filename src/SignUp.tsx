import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { signUpWithEmail } from './authService';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await signUpWithEmail(email, password);
      setIsLoading(false);
      navigate('/demo'); // Navigate to the sign-in page or home page after successful sign-up
    } catch (error) {
      setError('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full" />
          <span className="text-xl font-semibold">Acme Inc</span>
        </div>
        <a href="/signIn" className="text-sm hover:underline">
          SignIn
        </a>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-zinc-400">Enter your email below to create your account</p>
          </div>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <Input
              className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <Input
              className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-700" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-zinc-400">Or continue with</span>
            </div>
          </div>
          <Button className="w-full bg-gray-900 text-white border-zinc-800 hover:bg-gray-700">
            {/* Add Google Sign-up logic here */}
            Google
          </Button>
          <p className="text-center text-sm text-zinc-400">
            By clicking continue, you agree to our <u>Terms of Service</u>
          </p>
        </div>
      </main>
    </div>
  );
}

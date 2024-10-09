import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { signUpWithEmail, signUpWithGoogle } from './authService';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { Link } from 'react-router-dom';


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
      navigate('/job-application-tracker'); // Navigate to the sign-in page or home page after successful sign-up
    } catch (error) {
      setError('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUpWithGoogle();
      setIsLoading(false);
      navigate('/job-application-tracker');
    } catch (error) {
      setError('Failed to sign up with Google. Please try again.');
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
        <Link to="/">
          <span
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            TrackMyJob
          </span>
        </Link>
        </div>
        <a href="/signin" className="text-sm hover:underline">
          Sign In
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
          <Button className="w-full bg-gray-900 text-white border-zinc-800 hover:bg-gray-700" onClick={handleGoogleSignUp}>
          <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
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

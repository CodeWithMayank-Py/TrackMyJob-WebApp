import { useState } from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side content */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 justify-center items-center p-8">
        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold mb-6">Acme Inc</h1>
          <p className="text-lg mb-4">
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </p>
          <p className="text-base">- Sofia Davis</p>
        </div>
      </div>

      {/* Right side card */}
      <div className="flex-1 flex justify-center items-center p-6 bg-gray-800">
        <div className="relative p-1 w-full max-w-sm">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x"></div>

          {/* Glassmorphism card */}
          <div className="relative bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-white text-center mb-4">Create an account</h1>
            <p className="text-white text-center mb-6">
              Enter your email below to create your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white bg-opacity-20 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white bg-opacity-20 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white placeholder-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign Up with Google
              </Button>
            </div>

            <p className="mt-4 text-sm text-gray-400 text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300">
                Privacy Policy
              </a>.
            </p>

            <p className="mt-4 text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-400 hover:text-blue-300 transition duration-300">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

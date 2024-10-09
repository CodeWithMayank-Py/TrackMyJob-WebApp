import { Button } from 'components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function DemoPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Demo Page!</h1>
      <p className="text-lg text-zinc-400 mb-8">
        Your registration was successful. You are now logged in and can explore the features of the application.
      </p>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGoBack}>
        Go to Log In Page
      </Button>
    </div>
  );
}

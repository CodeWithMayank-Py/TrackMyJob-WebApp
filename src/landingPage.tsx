import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


// StarryBackground component
const StarryBackground = () => {
  interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
  }
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])


  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 10 - 5],
            y: [0, Math.random() * 10 - 5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

// Header component
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center w-full py-4 px-6 md:px-12">
    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      TrackMyJob
    </div>
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <button className="px-4 py-2 text-white bg-transparent hover:bg-white/10 transition-colors rounded"
      onClick={() => navigate('/signin')}
      >
        Sign In
      </button>
      <button className="px-4 py-2 text-black bg-white hover:bg-gray-200 transition-colors rounded"
      onClick={() => navigate('/signup')}
      >
        Sign up
      </button>
    </div>
  </header>
)
}

// Main component
const Main = () => (
  <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
    <motion.h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-gray-300 to-white text-transparent bg-clip-text"
      style={{ lineHeight: '1.5' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Stay Organized with Your Job Applications
    </motion.h1>
    <motion.p
      className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Manage all your job applications in one place. Track status, set reminders, and stay updated on your career journey with ease.
    </motion.p>
    <motion.button
      className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <a href="/signup" className="text-black">
        Start Tracking Now
      </a>
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  </main>
)

// LandingPage component
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <StarryBackground />
      <Header />
      <Main />
    </div>
  )
}
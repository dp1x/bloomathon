import { motion } from 'framer-motion'
import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    // Hide scrollbar when component mounts
    document.body.style.overflow = 'hidden';
    
    // Restore scrollbar when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className="min-h-screen bg-luxury-gradient relative overflow-hidden" style={{ overflow: 'hidden' }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto container-padding section-padding">
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="heading-xl mb-8">
            About This Project
          </h1>
          <p className="text-body-lg text-gray-300 max-w-4xl mx-auto">
            This project highlights how social media affects youth mental health. It also helps users understand and manage their online habits through an interactive online experience.
          </p>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div
          className="text-center mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            Contact at dhaneshhh888@gmail.com
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
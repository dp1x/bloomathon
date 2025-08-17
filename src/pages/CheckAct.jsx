import { useState } from 'react'
import { motion } from 'framer-motion'

const CheckAct = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [diagnosis, setDiagnosis] = useState(null)
  const [plan, setPlan] = useState(null)

  const questions = [
    {
      id: 'screenTime',
      question: "How many hours do you spend on screens daily?",
      options: [
        { value: 'low', label: 'Less than 2 hours', score: 1 },
        { value: 'medium', label: '2-5 hours', score: 2 },
        { value: 'high', label: '5-8 hours', score: 3 },
        { value: 'very-high', label: 'More than 8 hours', score: 4 }
      ]
    },
    {
      id: 'sleep',
      question: "How would you rate your sleep quality?",
      options: [
        { value: 'excellent', label: 'Excellent - I feel well-rested', score: 1 },
        { value: 'good', label: 'Good - Mostly rested', score: 2 },
        { value: 'fair', label: 'Fair - Sometimes tired', score: 3 },
        { value: 'poor', label: 'Poor - Often exhausted', score: 4 }
      ]
    },
    {
      id: 'anxiety',
      question: "How often do you feel anxious or stressed?",
      options: [
        { value: 'rarely', label: 'Rarely', score: 1 },
        { value: 'sometimes', label: 'Sometimes', score: 2 },
        { value: 'often', label: 'Often', score: 3 },
        { value: 'always', label: 'Almost always', score: 4 }
      ]
    },
    {
      id: 'focus',
      question: "How difficult is it to focus on tasks?",
      options: [
        { value: 'easy', label: 'Easy - I can focus well', score: 1 },
        { value: 'moderate', label: 'Moderate - Sometimes distracted', score: 2 },
        { value: 'difficult', label: 'Difficult - Often distracted', score: 3 },
        { value: 'very-difficult', label: 'Very difficult - Hard to concentrate', score: 4 }
      ]
    },
    {
      id: 'socialMedia',
      question: "How often do you check social media?",
      options: [
        { value: 'rarely', label: 'Rarely - Once or twice a day', score: 1 },
        { value: 'sometimes', label: 'Sometimes - A few times a day', score: 2 },
        { value: 'often', label: 'Often - Multiple times daily', score: 3 },
        { value: 'constantly', label: 'Constantly - Every few minutes', score: 4 }
      ]
    },
    {
      id: 'productivity',
      question: "How would you rate your daily productivity?",
      options: [
        { value: 'high', label: 'High - I accomplish most of my goals', score: 1 },
        { value: 'good', label: 'Good - I get most things done', score: 2 },
        { value: 'moderate', label: 'Moderate - I complete some tasks', score: 3 },
        { value: 'low', label: 'Low - I struggle to complete tasks', score: 4 }
      ]
    },
    {
      id: 'mood',
      question: "How would you describe your overall mood lately?",
      options: [
        { value: 'positive', label: 'Positive - Generally happy and content', score: 1 },
        { value: 'stable', label: 'Stable - Mostly balanced emotions', score: 2 },
        { value: 'fluctuating', label: 'Fluctuating - Ups and downs', score: 3 },
        { value: 'negative', label: 'Negative - Often sad or irritable', score: 4 }
      ]
    },
    {
      id: 'physical',
      question: "How would you rate your physical well-being?",
      options: [
        { value: 'excellent', label: 'Excellent - I feel energetic and healthy', score: 1 },
        { value: 'good', label: 'Good - Generally healthy with minor issues', score: 2 },
        { value: 'fair', label: 'Fair - Some health concerns', score: 3 },
        { value: 'poor', label: 'Poor - Significant health issues', score: 4 }
      ]
    },
    /* Question 9 removed as requested */
  ]

  // States for additionalInfo and showTextbox removed as question 9 was removed

  const handleAnswer = (questionId, value, score) => {
    setAnswers(prev => ({ ...prev, [questionId]: { value, score } }))
    // Special handling for "anything else" question removed as question 9 was removed
  }

  const calculateDiagnosis = () => {
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0)
    const maxScore = questions.length * 4
    
    if (totalScore <= 12) {
      return {
        level: 'Low Risk',
        description: 'You show minimal signs of digital overstimulation. Keep up your healthy habits!',
        color: 'emerald'
      }
    } else if (totalScore <= 20) {
      return {
        level: 'Moderate Risk',
        description: 'You may be experiencing some effects of digital overstimulation. Consider implementing some coping strategies.',
        color: 'amber'
      }
    } else if (totalScore <= 28) {
      return {
        level: 'High Risk',
        description: 'You are likely experiencing significant digital overstimulation effects. Implementing coping strategies is recommended.',
        color: 'orange'
      }
    } else {
      return {
        level: 'Very High Risk',
        description: 'You are experiencing severe digital overstimulation effects. Consider seeking professional help and implementing immediate changes.',
        color: 'red'
      }
    }
  }

  const generatePlan = (diagnosis) => {
    const basePlan = [
      {
        title: "Digital Detox Schedule",
        items: [
          "Set phone to grayscale mode",
          "Use app timers to limit usage",
          "Create phone-free zones (bedroom, dinner table)",
          "Schedule 1-hour digital breaks daily"
        ]
      },
      {
        title: "Sleep Optimization",
        items: [
          "Stop using screens 1 hour before bed",
          "Use blue light filters in the evening",
          "Create a relaxing bedtime routine",
          "Keep your phone outside the bedroom"
        ]
      },
      {
        title: "Mindfulness & Focus",
        items: [
          "Practice 10-minute meditation daily",
          "Use the Pomodoro technique for work",
          "Take regular breaks every 45 minutes",
          "Practice single-tasking instead of multitasking"
        ]
      },
      {
        title: "Physical Wellness",
        items: [
          "Exercise for 30 minutes daily",
          "Take walks without your phone",
          "Practice deep breathing exercises",
          "Maintain regular sleep schedule"
        ]
      }
    ]

    if (diagnosis.level === 'High Risk' || diagnosis.level === 'Very High Risk') {
      basePlan.push({
        title: "Professional Support",
        items: [
          "Consider therapy or counseling",
          "Consult with a mental health professional",
          "Join support groups for digital wellness",
          "Consider medication if recommended by a doctor"
        ]
      })
    }

    return basePlan
  }

  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      const diagnosis = calculateDiagnosis()
      const plan = generatePlan(diagnosis)
      setDiagnosis(diagnosis)
      setPlan(plan)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const canProceed = () => {
    if (currentStep < questions.length) {
      const answer = answers[questions[currentStep].id]
      if (!answer) return false
      
      // Special handling for "anything else" question removed as question 9 was removed
      
      return true
    }
    return true
  }

  const downloadPlan = () => {
    const planText = `
(Dis)connected - PERSONALIZED COPING PLAN

Diagnosis: ${diagnosis.level}
${diagnosis.description}

/* Reference to additionalInfo removed as question 9 was removed */

YOUR ACTION PLAN:
${plan.map(section => `
${section.title}:
${section.items.map(item => `• ${item}`).join('\n')}
`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `.trim()

    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'disconnected-wellness-plan.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (diagnosis && plan) {
    return (
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
      }}>
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-24">
          <motion.div 
            style={{
              textAlign: 'center',
              marginBottom: '5rem'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '2rem'
            }}>
              Your Assessment Results
            </h1>
          </motion.div>

          {/* Diagnosis */}
          <motion.div 
            style={{
              backgroundColor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(4px)',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '3rem',
              border: '2px solid #374151'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              color: 'white',
              fontWeight: '600',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              backgroundColor: diagnosis.color === 'emerald' ? '#059669' :
                              diagnosis.color === 'amber' ? '#d97706' :
                              diagnosis.color === 'orange' ? '#ea580c' : '#dc2626'
            }}>
              {diagnosis.level}
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem'
            }}>Diagnosis</h2>
            <p style={{
              color: '#d1d5db',
              fontSize: '1.125rem'
            }}>{diagnosis.description}</p>
          </motion.div>

          {/* Plan */}
          <motion.div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              marginBottom: '4rem'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              marginBottom: '4rem'
            }}>Your Personalized Coping Plan</h2>
            
            {plan.map((section, index) => (
              <motion.div 
                key={section.title}
                style={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '2px solid #374151',
                  marginBottom: '2rem'
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1.5rem'
                }}>{section.title}</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        color: '#60a5fa',
                        marginRight: '1rem',
                        marginTop: '0.25rem',
                        fontSize: '1.125rem'
                      }}>•</span>
                      <span style={{
                        color: '#d1d5db',
                        fontSize: '1.125rem'
                      }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              marginTop: '3rem'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              onClick={downloadPlan}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                padding: '1.5rem 4rem',
                borderRadius: '0.75rem',
                transition: 'all 0.3s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                border: '2px solid #3b82f6',
                minWidth: '240px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Download Plan
            </button>
            <button 
              onClick={() => {
                setCurrentStep(0)
                setAnswers({})
                setDiagnosis(null)
                setPlan(null)
                // Reset for additionalInfo and showTextbox removed as question 9 was removed
              }}
              style={{
                backgroundColor: '#4b5563',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                padding: '1.5rem 4rem',
                borderRadius: '0.75rem',
                transition: 'all 0.3s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                border: '2px solid #6b7280',
                minWidth: '240px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Take Assessment Again
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
    }}>
      <div className="relative z-10 max-w-5xl mx-auto px-8 py-24">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold text-white mb-8">
            Digital Wellness Assessment
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Answer a few questions to get your personalized assessment and coping plan
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-6 mb-8">
            {/* Progress Bar */}
            <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {/* Percentage */}
            <span className="text-xl font-bold text-white">
              {Math.round(((currentStep + 1) / questions.length) * 100)}% COMPLETE
            </span>
          </div>
          
          {/* Question Counter */}
          <div className="text-center">
            <span className="text-3xl font-bold text-white">
              Question {currentStep + 1} of {questions.length}
            </span>
          </div>
        </motion.div>

        {/* Question Card */}
        {currentStep < questions.length && (
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-24 border-2 border-gray-700 mb-20 shadow-2xl"
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-20 text-center px-6">
              {questions[currentStep].question}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[currentStep].id, option.value, option.score)}
                  style={{
                    backgroundColor: answers[questions[currentStep].id]?.value === option.value 
                      ? '#2563eb' // Blue when selected
                      : '#111827', // Dark gray when not selected
                    color: 'white',
                    border: answers[questions[currentStep].id]?.value === option.value 
                      ? '3px solid #3b82f6' // Blue border when selected
                      : '3px solid #4b5563', // Gray border when not selected
                    borderRadius: '18px',
                    padding: '48px 44px',
                    fontSize: '19px',
                    fontWeight: '600',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: answers[questions[currentStep].id]?.value === option.value 
                      ? '0 16px 24px -4px rgba(37, 99, 235, 0.4)' 
                      : '0 8px 14px -2px rgba(0, 0, 0, 0.15)',
                    transform: answers[questions[currentStep].id]?.value === option.value ? 'scale(1.05)' : 'scale(1)',
                    margin: '6px 0'
                  }}
                  onMouseEnter={(e) => {
                    if (answers[questions[currentStep].id]?.value !== option.value) {
                      e.target.style.backgroundColor = '#1f2937'
                      e.target.style.borderColor = '#6b7280'
                      e.target.style.transform = 'scale(1.05)'
                      e.target.style.boxShadow = '0 16px 24px -4px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[questions[currentStep].id]?.value !== option.value) {
                      e.target.style.backgroundColor = '#111827'
                      e.target.style.borderColor = '#4b5563'
                      e.target.style.transform = 'scale(1)'
                      e.target.style.boxShadow = '0 8px 14px -2px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <span className="block px-2">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Conditional Textbox for 9th Question removed as question 9 was removed */}
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <motion.div 
          className="flex justify-between items-center px-10 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            style={{
              backgroundColor: currentStep === 0 ? '#374151' : '#1f2937',
              color: currentStep === 0 ? '#9ca3af' : 'white',
              border: currentStep === 0 ? '3px solid #4b5563' : '3px solid #1f2937',
              borderRadius: '16px',
              padding: '34px 64px',
              fontSize: '22px',
              fontWeight: 'bold',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: currentStep === 0 ? 'none' : '0 16px 22px -3px rgba(0, 0, 0, 0.2)',
              margin: '0 16px'
            }}
            onMouseEnter={(e) => {
              if (currentStep !== 0) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.transform = 'scale(1.08)'
                e.target.style.boxShadow = '0 20px 28px -5px rgba(0, 0, 0, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== 0) {
                e.target.style.backgroundColor = '#1f2937'
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 16px 22px -3px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              backgroundColor: canProceed() ? '#2563eb' : '#374151',
              color: canProceed() ? 'white' : '#9ca3af',
              border: canProceed() ? '3px solid #3b82f6' : '3px solid #4b5563',
              borderRadius: '16px',
              padding: '34px 64px',
              fontSize: '22px',
              fontWeight: 'bold',
              cursor: canProceed() ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: canProceed() ? '0 16px 22px -3px rgba(37, 99, 235, 0.4)' : 'none',
              margin: '0 16px'
            }}
            onMouseEnter={(e) => {
              if (canProceed()) {
                e.target.style.backgroundColor = '#1d4ed8'
                e.target.style.transform = 'scale(1.08)'
                e.target.style.boxShadow = '0 20px 28px -5px rgba(37, 99, 235, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (canProceed()) {
                e.target.style.backgroundColor = '#2563eb'
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 16px 22px -3px rgba(37, 99, 235, 0.4)'
              }
            }}
          >
            {currentStep === questions.length - 1 ? 'Get Results' : 'Next'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default CheckAct
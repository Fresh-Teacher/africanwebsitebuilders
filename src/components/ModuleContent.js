import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, Unlock, X, Brain, ArrowRight, Star, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

// Define default course modules
const defaultCourseModules = [
  {
    id: 1,
    title: "Introduction to Zylosite",
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Introduction to Zylosite</h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Welcome to Zylosite</h3>
          <p class="mb-4">Welcome to Zylosite! This platform empowers you to create stunning websites with ease. In this module, you'll learn the basics of the Zylosite platform and get familiar with its interface.</p>
          
          <h4 class="font-semibold mb-2">What You'll Learn:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Platform overview and navigation</li>
            <li>Basic website building concepts</li>
            <li>Getting started with your first project</li>
          </ul>
        </div>

        <div class="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Core Features</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">1. Dashboard Overview</h4>
              <p>Your central hub for managing all website projects and tracking progress.</p>
            </div>
            
            <div>
              <h4 class="font-semibold">2. Project Management</h4>
              <p>Tools and features to organize and maintain multiple websites efficiently.</p>
            </div>
            
            <div>
              <h4 class="font-semibold">3. Site Settings</h4>
              <p>Essential configurations and customization options for your websites.</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Getting Started</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Project Creation:</strong> Learn to start new website projects</li>
            <li><strong>Interface Navigation:</strong> Master the platform's layout and tools</li>
            <li><strong>Basic Customization:</strong> Understand fundamental design options</li>
            <li><strong>Publishing Process:</strong> Learn how to take your site live</li>
          </ul>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Support Resources</h3>
          <p class="mb-4">Access comprehensive documentation, tutorials, and community support to help you succeed with Zylosite.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl border-2 border-red-500">
          <h3 class="text-xl font-semibold mb-4">💼 Career Opportunities</h3>
          <p class="mb-2">As a Zylosite website builder, you can earn:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Per Active Website:</strong> £7 monthly recurring income</li>
            <li><strong>Target Goal:</strong> Build and maintain 20 active websites</li>
            <li><strong>Potential Income:</strong> £140 monthly recurring revenue</li>
          </ul>
        </div>
      `,
      quiz: [
        {
          question: "What is AWB in full?",
          options: ["African Web Builders", "African Website Builders", "African World Builders", "African Work Builders"],
          correct: 1
        },
        {
          question: "Who are the founders of the African Website Builder's Platform?",
          options: ["Mr. Angel & Mr. Zion", "Ms. Grace & Mr. John", "Mr. Smith & Mr. Brown", "Dr. Ali & Mr. Moses"],
          correct: 0
        },
        {
          question: "In which city are the headquarters of African Website Builders?",
          options: ["New York", "London", "Paris", "Cape Town"],
          correct: 1
        },
        {
          question: "How many lectures will you attend per week during your course of study?",
          options: ["1 day", "2 days", "3 days", "5 days"],
          correct: 2
        },
        {
          question: "Which platform does AWB use to develop websites?",
          options: ["Zylo", "WordPress", "Wix", "Shopify"],
          correct: 0
        },
        {
          question: "How long does the AWB training course last?",
          options: ["2 weeks", "3 weeks", "4 weeks", "6 weeks"],
          correct: 2
        },
        {
          question: "How much money will you earn for every active website you build?",
          options: ["£5", "£6", "£7", "£8"],
          correct: 2
        },
        {
          question: "How much recurring monthly income will you earn if you build 20 active websites?",
          options: ["£100", "£120", "£140", "£160"],
          correct: 2
        },
        {
          question: "How often do you get paid for the active websites you built?",
          options: ["Weekly", "Monthly", "Yearly", "On-demand"],
          correct: 1
        },
        {
          question: "What is the official website of AWB?",
          options: ["www.africanwebsitebuilders.com", "www.awbplatform.com", "www.zylosite.com", "www.websitebuildersafrica.com"],
          correct: 0
        }
      ]
    },
    {
      id: 2,
      title: "Understanding Websites and the Internet",
      content: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold">Understanding Websites and the Internet</h2>
          
          <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-semibold mb-4">The Internet and How It Works</h3>
            <p class="mb-4">The Internet is a global network of connected computers that communicate using standardized protocols. Think of it like a massive postal system where information is sent between computers instead of physical mail.</p>
            
            <h4 class="font-semibold mb-2">Key Terms Explained:</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>WWW (World Wide Web):</strong> The system of interlinked web pages accessed via the Internet</li>
              <li><strong>HTTP/HTTPS:</strong> Protocols for transferring data (HTTPS is secure, encrypted)</li>
              <li><strong>Domain Names:</strong> Easy-to-remember addresses for websites (e.g., google.com)</li>
              <li><strong>Email:</strong> Electronic mail system using Internet protocols</li>
            </ul>
          </div>
  
          <div class="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-semibold mb-4">Website Creation Methods</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold">1. Traditional Coding</h4>
                <p>Requires knowledge of HTML, CSS, and JavaScript. Complex but offers full control.</p>
              </div>
              
              <div>
                <h4 class="font-semibold">2. Content Management Systems (CMS)</h4>
                <p>Platforms like WordPress that balance customization and ease of use.</p>
              </div>
              
              <div>
                <h4 class="font-semibold">3. Drag-and-Drop Builders (Used by AWB)</h4>
                <p>The simplest method, used by Zylo Platform. Perfect for quick, professional websites without coding.</p>
              </div>
            </div>
          </div>
  
          <div class="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-semibold mb-4">Website Components</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Header:</strong> Top section with logo and main navigation</li>
              <li><strong>Navigation Bar:</strong> Menu for accessing different pages</li>
              <li><strong>Content Area:</strong> Main information section</li>
              <li><strong>Footer:</strong> Bottom section with additional links and information</li>
            </ul>
          </div>
  
          <div class="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-semibold mb-4">Website Hosting</h3>
            <p class="mb-4">Hosting is like renting space on a server to make your website accessible online. The Zylo Platform provides hosting services for all websites built through AWB.</p>
          </div>
  
          <div class="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl border-2 border-red-500">
            <h3 class="text-xl font-semibold mb-4">💰 Earning Potential with AWB</h3>
            <p class="mb-2">When clients pay for hosting on the Zylo platform, you earn:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Per Website:</strong> £7 (32,050 UGX) monthly</li>
              <li><strong>TARGET - 20 Websites:</strong> £140 (652,850 UGX) monthly recurring income</li>
            </ul>
            <p class="mt-4 font-semibold text-red-600 dark:text-red-400">
              Your goal is to build and maintain 20 active websites to achieve the target monthly income of £140 (652,850 UGX)!
            </p>
          </div>
        </div>
      `,
      quiz: [
        {
          question: "What does WWW stand for?",
          options: ["World Wide Web", "World Web Width", "Wide World Web", "World Web Work"],
          correct: 0
        },
        {
          question: "Which method of website creation does AWB use on the Zylo Platform?",
          options: ["Traditional Coding", "Content Management System", "Drag-and-Drop Builder", "Mobile App Development"],
          correct: 2
        },
        {
          question: "What is website hosting?",
          options: ["A domain name", "Server space rental for websites", "Website design", "Email service"],
          correct: 1
        },
        {
          question: "Which is a secure protocol for transferring data?",
          options: ["WWW", "HTTP", "HTTPS", "HTML"],
          correct: 2
        },
        {
          question: "What is typically found in a website's header?",
          options: ["Contact form", "Blog posts", "Logo and main navigation", "Comments section"],
          correct: 2
        },
        {
          question: "How much can you earn monthly from one active website on Zylo?",
          options: ["£5 (23,000 UGX)", "£7 (32,050 UGX)", "£10 (45,785 UGX)", "£15 (68,677 UGX)"],
          correct: 1
        },
        {
          question: "What is the target number of websites to build?",
          options: ["10 websites", "15 websites", "20 websites", "25 websites"],
          correct: 2
        },
        {
          question: "What's the monthly target income from 20 websites?",
          options: ["£100 (458,500 UGX)", "£120 (550,200 UGX)", "£140 (652,850 UGX)", "£160 (733,600 UGX)"],
          correct: 2
        },
        {
          question: "Which component contains additional links at the bottom of a website?",
          options: ["Header", "Navigation Bar", "Content Area", "Footer"],
          correct: 3
        },
        {
          question: "What makes drag-and-drop builders different from traditional coding?",
          options: ["They're more expensive", "No coding knowledge required", "They're slower", "They use different servers"],
          correct: 1
        }
      ]
    }
  ];

const useAudio = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
    }
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const playNote = useCallback((frequency, startTime, duration, context, gainValue = 0.2) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);
    
    gainNode.gain.setValueAtTime(gainValue, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled || !audioContext) return;

    const now = audioContext.currentTime;

    const soundPatterns = {
      'correct': () => {
        playNote(440, now, 0.3, audioContext);
        playNote(880, now + 0.1, 0.2, audioContext);
      },
      'wrong': () => {
        playNote(330, now, 0.3, audioContext);
        playNote(220, now + 0.1, 0.2, audioContext);
      },
      'perfect': () => {
        [440, 554.37, 659.25, 880].forEach((freq, i) => {
          playNote(freq, now + i * 0.15, 0.2, audioContext);
        });
      },
      'passing': () => {
        [440, 550, 660].forEach((freq) => {
          playNote(freq, now, 0.4, audioContext, 0.15);
        });
      },
      'try-again': () => {
        [440, 523.25, 659.25].forEach((freq) => {
          playNote(freq, now, 0.3, audioContext, 0.1);
        });
      }
    };

    soundPatterns[type]?.();
  }, [soundEnabled, audioContext, playNote]);

  return { playSound, soundEnabled, setSoundEnabled, audioContext };
};

// Separate confetti utility
const triggerConfetti = () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
  const defaults = {
    origin: { y: 0.7 },
    colors,
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0
  };

  const fire = (particleRatio, opts) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(200 * particleRatio)
    });
  };

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

// Separate quiz option component
const QuizOption = React.memo(({ option, index, isCorrect, selected, showFeedback, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(index)}
      disabled={showFeedback}
      className={`w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all text-lg shadow-sm
        ${showFeedback 
          ? index === isCorrect ? "bg-green-100 dark:bg-green-900 border-green-500 shadow-green-200"
          : index === selected
            ? "bg-red-100 dark:bg-red-900 border-red-500 shadow-red-200"
            : "border-gray-200 dark:border-gray-700"
        : "border-gray-200 dark:border-gray-700 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md"
      } border-2`}
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
        ${showFeedback && index === isCorrect ? "border-green-500" : 
          showFeedback && index === selected ? "border-red-500" : "border-gray-400"}`}
      >
        {showFeedback && index === isCorrect && "✓"}
        {showFeedback && index === selected && index !== isCorrect && "×"}
      </div>
      <span>{option}</span>
      {showFeedback && index === isCorrect && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto text-green-600"
        >
          🌟
        </motion.span>
      )}
    </motion.button>
  );
});

// Separate module list item component
const ModuleListItem = React.memo(({ module, index, status, isCompleted, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600"
    >
      <p className="text-black dark:text-white flex-1 flex items-center font-medium">
        {status === "Completed" ? (
          <span className="mr-2 text-green-600 dark:text-green-400">
            <Unlock className="w-5 h-5" />
          </span>
        ) : isCompleted ? (
          <span className="mr-2 text-blue-600 dark:text-blue-400">
            <Unlock className="w-5 h-5" />
          </span>
        ) : (
          <span className="mr-2 text-gray-600 dark:text-gray-300">
            <Lock className="w-5 h-5" />
          </span>
        )}
        <span className="text-lg font-semibold">Level {index + 1}: {module}</span>
      </p>
      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
        status === "Completed" 
          ? "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100" 
          : "bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100"
      }`}>
        {status === "Completed" ? "Completed ✔️" : "Pending ⚠️"}
      </span>
    </motion.div>
  );
});

const ModuleContent = ({ userData, modules = defaultCourseModules }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([1]);
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    correctAnswers: 0,
    submitted: false,
    selectedAnswer: null,
    showFeedback: false
  });

  const { playSound, soundEnabled, setSoundEnabled, audioContext } = useAudio();

  const handleModuleClick = useCallback(async (moduleId) => {
    const previousModuleCompleted = moduleId === 1 || completedModules.includes(moduleId - 1);
    
    if (!previousModuleCompleted) {
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }
      playSound('wrong');
      alert("Complete the previous level first! 🔒");
      return;
    }
    
    setSelectedModule(modules.find(m => m.id === moduleId));
    setQuizState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    });
  }, [completedModules, modules, audioContext, playSound]);

  const handleAnswerSelect = useCallback(async (optionIndex) => {
    if (quizState.showFeedback || !selectedModule) return;
    
    if (audioContext?.state === 'suspended') {
      await audioContext.resume();
    }
    
    setQuizState(prev => ({ ...prev, selectedAnswer: optionIndex, showFeedback: true }));
  
    const currentQuiz = selectedModule.quiz[quizState.currentQuestionIndex];
    const isCorrect = optionIndex === currentQuiz.correct;
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (isCorrect) {
      playSound('correct');
      triggerConfetti();
    } else {
      playSound('wrong');
    }
  
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    if (isCorrect) {
      setQuizState(prev => ({ ...prev, correctAnswers: prev.correctAnswers + 1 }));
    }
  
    if (quizState.currentQuestionIndex < selectedModule.quiz.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showFeedback: false
      }));
    } else {
      const finalScore = isCorrect ? quizState.correctAnswers + 1 : quizState.correctAnswers;
      const passed = finalScore >= Math.ceil(selectedModule.quiz.length * 0.7);
      
      const scorePercentage = (finalScore / selectedModule.quiz.length) * 100;
      if (scorePercentage === 100) {
        playSound('perfect');
      } else if (passed) {
        playSound('passing');
      } else {
        playSound('try-again');
      }

      if (passed) {
        await new Promise(resolve => setTimeout(resolve, 200));
        triggerConfetti();
        setCompletedModules(prev => [...prev, selectedModule.id + 1]);
      }
      
      setQuizState(prev => ({ ...prev, submitted: true }));
    }
  }, [quizState, selectedModule, audioContext, playSound]);

  // Memoize the current quiz
  const currentQuiz = useMemo(() => 
    selectedModule?.quiz[quizState.currentQuestionIndex],
    [selectedModule, quizState.currentQuestionIndex]
  );

  const renderQuiz = useCallback(() => {
    if (quizState.submitted) {
      const finalScore = quizState.correctAnswers;
      const passed = finalScore >= Math.ceil(selectedModule.quiz.length * 0.7);
      const isPerfectScore = finalScore === selectedModule.quiz.length;
      const hasNextModule = selectedModule.id < modules.length;

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className={`p-8 rounded-xl shadow-lg ${
            isPerfectScore 
              ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
              : passed 
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
                : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
          }`}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: passed ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Star className={`w-20 h-20 mx-auto mb-4 ${
                isPerfectScore ? "text-purple-400" : passed ? "text-yellow-400" : "text-gray-400"
              }`} />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4">
              {isPerfectScore ? "🌟 Perfect Score! 🌟" : passed ? "🎉 Well Done! 🎉" : "Almost There! 💫"}
            </h3>
            <p className="text-xl mb-2">You collected {quizState.correctAnswers} out of {selectedModule.quiz.length} stars!</p>
            <div className="flex justify-center gap-2 my-4">
              {Array.from({ length: quizState.correctAnswers }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
              {Array.from({ length: selectedModule.quiz.length - quizState.correctAnswers }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-gray-300" />
              ))}
            </div>
            {!passed && (
              <p className="mt-4 text-lg">Keep going! You're getting better with each try! 🚀</p>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            {passed && hasNextModule && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleModuleClick(selectedModule.id + 1)}
                className="flex items-center justify-center gap-3 px-8 py-4 mx-auto bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-xl font-bold shadow-lg"
              >
                Continue to Next Level! 🎮 <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}
            
            {!passed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuizState({
                    currentQuestionIndex: 0,
                    correctAnswers: 0,
                    submitted: false,
                    selectedAnswer: null,
                    showFeedback: false
                  });
                }}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-xl font-bold shadow-lg"
              >
                Try Again! 🚀
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedModule(null);
                setQuizState({
                  currentQuestionIndex: 0,
                  correctAnswers: 0,
                  submitted: false,
                  selectedAnswer: null,
                  showFeedback: false
                });
              }}
              className="px-8 py-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors text-xl font-bold shadow-lg"
            >
              Close Module ✖️
            </motion.button>
          </div>
        </motion.div>
      );
    }

    if (!currentQuiz) return null;
    
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Question {quizState.currentQuestionIndex + 1} of {selectedModule.quiz.length}</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: quizState.currentQuestionIndex }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              {Array.from({ length: selectedModule.quiz.length - quizState.currentQuestionIndex }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={quizState.currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <p className="text-xl font-medium mb-6">{currentQuiz.question}</p>
          <div className="space-y-4">
            {currentQuiz.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                isCorrect={currentQuiz.correct}
                selected={quizState.selectedAnswer}
                showFeedback={quizState.showFeedback}
                onClick={handleAnswerSelect}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }, [quizState, selectedModule, currentQuiz, soundEnabled, handleAnswerSelect, modules.length]);

  return (
    <div>
      <div className="space-y-4">
        {Object.entries(userData.courseProgress).map(([module, status], index) => (
          <ModuleListItem
            key={index}
            module={module}
            index={index}
            status={status}
            isCompleted={completedModules.includes(index + 1)}
            onClick={() => handleModuleClick(index + 1)}
          />
        ))}
      </div>

      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full h-full overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-3">
                  <span>Level {selectedModule.id}:</span> 
                  <span>{selectedModule.title}</span>
                </h3>
                <button 
                  onClick={() => {
                    setSelectedModule(null);
                    setQuizState({
                      currentQuestionIndex: 0,
                      correctAnswers: 0,
                      submitted: false,
                      selectedAnswer: null,
                      showFeedback: false
                    });
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="prose dark:prose-invert max-w-none [&>div]:text-gray-900 [&>div]:dark:text-white">
                <div 
                  dangerouslySetInnerHTML={{ __html: selectedModule.content }} 
                  className="[&_p]:text-gray-900 [&_p]:dark:text-white [&_li]:text-gray-900 [&_li]:dark:text-white [&_h2]:text-black [&_h2]:dark:text-white [&_h3]:text-black [&_h3]:dark:text-white" 
                />
                <div className="mt-12 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const quizSection = document.getElementById('quiz-section');
                      quizSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-xl font-bold shadow-lg"
                  >
                    <Brain className="w-6 h-6" />
                    Start Challenge! 🎮
                  </motion.button>
                </div>
              </div>

              <div id="quiz-section" className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
                  Level {selectedModule.id} Challenge
                </h3>
                <div className="text-gray-900 dark:text-gray-100">
                  {renderQuiz()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ModuleContent);

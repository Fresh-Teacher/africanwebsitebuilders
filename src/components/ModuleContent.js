import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, Unlock, X, Brain, ArrowRight, Star, Volume2, VolumeX, Medal, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Monitor, Type, Layout, Image, Repeat, Lightbulb, Clock, Search, GraduationCap, Users, ShoppingCart } from 'lucide-react';



const badges = {
  1: {
    name: "Website Pioneer",
    description: "Introduction to Zylosite, Website Tour & Practice",
    icon: <Monitor className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />,
    color: "bg-blue-100 dark:bg-blue-900/30"
  },
  2: {
    name: "Content Crafter",
    description: "Text, Button & Block Editing, Add Video",
    icon: <Type className="w-8 h-8 md:w-12 md:h-12 text-purple-500" />,
    color: "bg-purple-100 dark:bg-purple-900/30"
  },
  3: {
    name: "Layout Master",
    description: "Cogs, Grids, Components, Pages & Pop-Ups",
    icon: <Layout className="w-8 h-8 md:w-12 md:h-12 text-green-500" />,
    color: "bg-green-100 dark:bg-green-900/30"
  },
  4: {
    name: "Design Virtuoso",
    description: "Parallax, Padding, Slide Show, Forms",
    icon: <Image className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />,
    color: "bg-yellow-100 dark:bg-yellow-900/30"
  },
  5: {
    name: "Site Builder Pro",
    description: "Re-Create Site from Scratch",
    icon: <Repeat className="w-8 h-8 md:w-12 md:h-12 text-red-500" />,
    color: "bg-red-100 dark:bg-red-900/30"
  },
  6: {
    name: "AI Expert",
    description: "Chat GPT and Speed Test",
    icon: <Brain className="w-8 h-8 md:w-12 md:h-12 text-indigo-500" />,
    color: "bg-indigo-100 dark:bg-indigo-900/30"
  },
  7: {
    name: "Master Practitioner",
    description: "Recap Test and Practicals",
    icon: <Lightbulb className="w-8 h-8 md:w-12 md:h-12 text-pink-500" />,
    color: "bg-pink-100 dark:bg-pink-900/30"
  },
  8: {
    name: "Time Wizard",
    description: "Creating Countdowns with Zylo Modules",
    icon: <Clock className="w-8 h-8 md:w-12 md:h-12 text-orange-500" />,
    color: "bg-orange-100 dark:bg-orange-900/30"
  },
  9: {
    name: "SEO Specialist",
    description: "Website SEO, Favicons & Social Media",
    icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-teal-500" />,
    color: "bg-teal-100 dark:bg-teal-900/30"
  },
  10: {
    name: "Master Tutor",
    description: "AWB Tutor Course Training",
    icon: <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-cyan-500" />,
    color: "bg-cyan-100 dark:bg-cyan-900/30"
  },
  11: {
    name: "Freelance Pro",
    description: "Become Freelance Ready",
    icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-emerald-500" />,
    color: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  12: {
    name: "Sales Master",
    description: "Sales Online and Local",
    icon: <ShoppingCart className="w-8 h-8 md:w-12 md:h-12 text-violet-500" />,
    color: "bg-violet-100 dark:bg-violet-900/30"
  }
};


// Badge award animation component
const BadgeAward = ({ badge, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 text-center space-y-6">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
          className={`w-32 h-32 rounded-full ${badge.color} flex items-center justify-center mx-auto`}
        >
          {badge.icon}
        </motion.div>
        <h2 className="text-3xl font-bold">New Badge Unlocked! 🎉</h2>
        <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{badge.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{badge.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Learning 🚀
        </motion.button>
      </div>
    </motion.div>
  );
};

const BadgeDisplay = ({ earnedBadges }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  
  const visibleBadges = 4;
  const totalBadges = Object.keys(badges).length;
  const maxIndex = Math.max(0, totalBadges - visibleBadges);

  // Move scroll function inside component where setActiveIndex is available
  const scroll = (direction) => {
    setActiveIndex(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      }
      return Math.min(maxIndex, prev + 1);
    });
  };

  // Move visibleSlots inside the component where earnedBadges is available
  const visibleSlots = Array.from({ length: totalBadges }, (_, index) => {
    const moduleId = index + 1;
    const isEarned = earnedBadges.includes(moduleId);
    return isEarned ? { ...badges[moduleId], id: moduleId } : null;
  });

  return (
    <div className="mt-4 md:mt-8 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <h3 className="text-xl md:text-2xl font-bold">Achievement Badges</h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="relative">
        {!showAll && (
          <>
            {activeIndex > 0 && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-4 p-1.5 md:p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            )}

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-2 md:gap-4"
                style={{ transform: `translateX(-${activeIndex * (100 / visibleBadges)}%)` }}
              >
                {visibleSlots.map((badge, index) => (
                  <div
                    key={index}
                    className="flex-none w-1/2 md:w-1/4"
                  >
                    {renderBadge(badge)}
                  </div>
                ))}
              </div>
            </div>

            {activeIndex < maxIndex && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-4 p-1.5 md:p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            )}
          </>
        )}

        {showAll && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSlots.map((badge, index) => (
              <div key={index} className="w-full">
                {renderBadge(badge)}
              </div>
            ))}
          </div>
        )}
      </div>

      {earnedBadges.length === 0 && (
        <div className="text-center mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-sm md:text-base text-blue-600 dark:text-blue-400">
            Complete modules to unlock achievement badges! 🏆
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to render individual badge
const renderBadge = (badge) => {
  if (badge) {
    return (
      <div className={`relative group cursor-pointer rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 p-3 md:p-4 ${badge.color}`}>
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white/20">
            {badge.icon}
          </div>
          <h4 className="font-bold text-xs md:text-sm line-clamp-1">{badge.name}</h4>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            EARNED
          </span>
        </div>
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 md:p-4">
          <p className="text-white text-xs text-center line-clamp-3 md:line-clamp-none">
            {badge.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 p-3 md:p-4 bg-gray-100 dark:bg-gray-700">
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
          <Lock className="w-6 h-6 md:w-8 md:h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h4 className="font-bold text-xs md:text-sm text-gray-400 dark:text-gray-500">Locked Badge</h4>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400">
          LOCKED
        </span>
      </div>
    </div>
  );
};

// Define default course modules
const defaultCourseModules = [
  {
    id: 1,
    title: "Introduction to Zylosite",
    units: [
      {
        id: 1,
        title: "Learn Website Sequence",
        content: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold">Introduction to Zylosite</h2>
            <video className="w-full rounded-lg" controls>
              <source src="https://awb-silk.vercel.app/VID-20241216-WA0157.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
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
          </div>
        `
      }
    ],
    quiz: [
      {
        question: "What is AWB in full?",
        options: ["African Web Builders", "African Website Builders", "African World Builders", "African Work Builders"],
        correct: 1
      },
      {
        question: "Who are the founders of the African Website Builder's Platform?",
        options: ["Fresh Teacher", "Ms. Grace & Mr. John", "Mr. Angel & Mr. Zion", "Dr. Ali & Mr. Moses"],
        correct: 2
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
    title: "Text, Button & Block Editing",
    units: [
      {
        id: 1,
        title: "Add Video and Basic Editing",
        content: `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold">Text, Button & Block Editing, Add Video</h2>
            <video className="w-full rounded-lg" controls>
              <source src="https://awb-silk.vercel.app/VID-20241226-WA0076.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: "What is the first step in editing a text block?",
        options: ["Click the delete button", "Select the block", "Add a new block", "Save the page"],
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
const ModuleListItem = React.memo(({ module, completedUnits, onClick }) => {
  const totalUnits = module.units.length;
  const completedCount = completedUnits.filter(unit => 
    unit.moduleId === module.id
  ).length;
  const isLocked = completedCount === 0 && module.id !== 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isLocked ? (
              <Lock className="w-5 h-5 text-gray-500" />
            ) : (
              <Unlock className="w-5 h-5 text-green-500" />
            )}
            <h3 className="text-lg font-semibold">Module {module.id}: {module.title}</h3>
          </div>
          <span className="text-sm font-medium">
            {completedCount}/{totalUnits} units completed
          </span>
        </div>
        
        <div className="space-y-2">
          {module.units.map((unit, index) => {
            const isUnitCompleted = completedUnits.some(
              completed => completed.moduleId === module.id && completed.unitId === unit.id
            );
            const isUnitLocked = index > 0 && !completedUnits.some(
              completed => completed.moduleId === module.id && completed.unitId === unit.id - 1
            );
            
            return (
              <button
                key={unit.id}
                onClick={() => !isUnitLocked && onClick(module.id, unit.id)}
                disabled={isUnitLocked}
                className={`w-full text-left p-3 rounded-md flex items-center justify-between ${
                  isUnitLocked 
                    ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isUnitCompleted ? '✅' : isUnitLocked ? '🔒' : '📝'}
                  Unit {unit.id}: {unit.title}
                </span>
                {isUnitCompleted && <span className="text-sm text-green-600">Completed</span>}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});

const ModuleContent = ({ userData, modules = defaultCourseModules }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [completedUnits, setCompletedUnits] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [showBadgeAward, setShowBadgeAward] = useState(null);
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    correctAnswers: 0,
    submitted: false,
    selectedAnswer: null,
    showFeedback: false
  });

  // Check if module is completed and award badge
  const checkAndAwardBadge = useCallback((moduleId) => {
    if (!earnedBadges.includes(moduleId)) {
      const moduleUnits = modules.find(m => m.id === moduleId)?.units || [];
      const isModuleCompleted = moduleUnits.every(unit =>
        completedUnits.some(
          completed => completed.moduleId === moduleId && completed.unitId === unit.id
        )
      );

      if (isModuleCompleted) {
        setEarnedBadges(prev => [...prev, moduleId]);
        setShowBadgeAward(badges[moduleId]);
        triggerConfetti();
      }
    }
  }, [earnedBadges, completedUnits, modules]);

  const handleModuleUnitSelect = useCallback((moduleId, unitId) => {
    const module = defaultCourseModules.find(m => m.id === moduleId);
    const unit = module.units.find(u => u.id === unitId);
    
    setSelectedModule(module);
    setSelectedUnit(unit);
    setQuizState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    });
  }, []);
  
  // Update handleQuizComplete to include badge checks
  const handleQuizComplete = useCallback((passed) => {
    if (passed) {
      setCompletedUnits(prev => {
        const newCompletedUnits = [
          ...prev,
          { moduleId: selectedModule.id, unitId: selectedUnit.id }
        ];

        // Check if all units in the current module are completed
        const allUnitsCompleted = selectedModule.units.every(unit =>
          newCompletedUnits.some(completed => 
            completed.moduleId === selectedModule.id && 
            completed.unitId === unit.id
          )
        );

        if (allUnitsCompleted) {
          // Award badge for completing the module
          setTimeout(() => {
            checkAndAwardBadge(selectedModule.id);
          }, 1000); // Delay badge award to allow for quiz completion animation
        }

        return newCompletedUnits;
      });

      // Find next unit in current module
      const nextUnit = selectedModule.units.find(u => u.id === selectedUnit.id + 1);
      
      if (nextUnit) {
        // Move to next unit in same module
        setTimeout(() => {
          setSelectedUnit(nextUnit);
        }, 2000); // Delay unit transition to show completion state
      } else {
        // All units in current module completed
        const nextModule = defaultCourseModules.find(m => m.id === selectedModule.id + 1);
        if (nextModule) {
          setTimeout(() => {
            setSelectedModule(nextModule);
            setSelectedUnit(nextModule.units[0]);
          }, 2000); // Delay module transition to show completion state
        }
      }
    }
    
    setQuizState(prev => ({ ...prev, submitted: true }));
  }, [selectedModule, selectedUnit, checkAndAwardBadge, defaultCourseModules]);

  const { playSound, soundEnabled, setSoundEnabled, audioContext } = useAudio();

  const handleModuleClick = useCallback(async (moduleId) => {
    // Check if previous module's all units are completed
    const previousModuleCompleted = moduleId === 1 || completedUnits.some(unit => 
      unit.moduleId === moduleId - 1
    );
    
    if (!previousModuleCompleted) {
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }
      playSound('wrong');
      alert("Complete the previous module first! 🔒");
      return;
    }
    
    const selectedMod = defaultCourseModules.find(m => m.id === moduleId);
    setSelectedModule(selectedMod);
    setSelectedUnit(selectedMod.units[0]); // Select first unit of module
    setQuizState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    });
  }, [completedUnits, audioContext, playSound]);

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
        // Instead of setCompletedModules, we'll update completedUnits
        const nextModuleFirstUnit = { moduleId: selectedModule.id + 1, unitId: 1 };
        setCompletedUnits(prev => [...prev, nextModuleFirstUnit]);
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
            <p className="text-xl mb-2">You've scored {quizState.correctAnswers} out of {selectedModule.quiz.length} marks!</p>
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
                Continue to Next Course Unit! 🎮 <ArrowRight className="w-6 h-6" />
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
    <div className="space-y-8">
      <BadgeDisplay earnedBadges={earnedBadges} />
      
      <div className="grid gap-6">
        {defaultCourseModules.map(module => (
          <ModuleListItem
            key={module.id}
            module={module}
            completedUnits={completedUnits}
            onClick={handleModuleUnitSelect}
          />
        ))}
      </div>

      {showBadgeAward && (
        <BadgeAward 
          badge={showBadgeAward} 
          onClose={() => setShowBadgeAward(null)} 
        />
      )}

      {selectedModule && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full h-full overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-3">
                  <span>Module {selectedModule.id}, Unit {selectedUnit.id}:</span> 
                  <span>{selectedUnit.title}</span>
                </h3>
                <button 
                  onClick={() => {
                    setSelectedModule(null);
                    setSelectedUnit(null);
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
                  dangerouslySetInnerHTML={{ __html: selectedUnit.content }} 
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
                    Attempt Quiz!
                  </motion.button>
                </div>
              </div>

              <div id="quiz-section" className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
                  Unit {selectedUnit.id} Challenge
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

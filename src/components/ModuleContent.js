import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, Unlock, X, Brain, ArrowRight, ArrowLeft, Star, Volume2, VolumeX, Medal, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
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
const EnhancedBadgeAward = ({ badge, onClose, isLastBadge = false }) => {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    // Trigger confetti explosion
    const colors = ['#FFD700', '#FFA500', '#FF6347'];
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
    setTimeout(() => setShowStars(true), 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-8 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {showStars && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                >
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge content */}
        <div className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex flex-col items-center"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mb-2" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Achievement Unlocked!
            </h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`w-32 h-32 rounded-full ${badge.color} mx-auto flex items-center justify-center`}
          >
            {badge.icon}
          </motion.div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {badge.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {badge.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              {isLastBadge ? (
                <>
                  Complete Course
                  <Medal className="w-5 h-5" />
                </>
              ) : (
                <>
                  Continue Learning
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
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
        content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Welcome to Your Website Building Adventure! 🚀</h2>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">🌟 The Future is Digital! 🌟</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "If your business is not on the internet, then you are not in business."
          <footer class="text-sm mt-2">- Bill Gates, Microsoft Founder</footer>
        </blockquote>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🤔 Let's Start With a Story...</h4>
            <p class="mb-4">Meet Sarah, a small business owner in Lagos. She makes beautiful traditional clothing but only sells to people who walk past her shop. One day, a customer from London found her shop online (through a website her nephew quickly made) and ordered 50 pieces! Sarah's business transformed overnight. This is the power of having an online presence!</p>
            <p>Now, imagine being the person who can create such transformative opportunities for businesses across Africa! That's exactly what you're about to become.</p>
          </div>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🌍 The Digital Divide: A Golden Opportunity</h4>
            <ul class="list-disc pl-6 space-y-2">
            <li>While 95% of businesses in developed countries have websites, only 20% of African businesses have an online presence</li>
            <li>Over 60% of consumers check online before making purchases</li>
            <li>Businesses with websites are 2.8 times more likely to grow than those without</li>
          </ul>
          </div>
          <p class="font-semibold text-lg">THIS IS WHERE YOU COME IN! 💪</p>
          <p>You're about to become part of the solution, helping African businesses step into the digital age while building a rewarding career for yourself.</p>
        </div>
        </div>
    
        <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">🎯 Your Mission (Should You Choose to Accept It!)</h3>
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <p class="text-lg mb-4">Become a professional website builder and help bridge the digital divide while building a successful career! Here's what makes this opportunity exciting:</p>
            <ul class="list-disc pl-6 space-y-3">
              <li><span class="font-semibold">Massive Market:</span> 80% of African businesses need websites</li>
              <li><span class="font-semibold">Recurring Income:</span> Earn monthly from each active website</li>
              <li><span class="font-semibold">Growing Demand:</span> Digital presence is becoming essential</li>
              <li><span class="font-semibold">Low Competition:</span> Few skilled website builders in the market</li>
              <li><span class="font-semibold">Future-Proof Skills:</span> Digital skills are always in demand</li>
            </ul>
          </div>
        </div>
    
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">🎓 Your 4-Week Learning Adventure</h3>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-lg mb-4">WEEK 1: BEGINNERS</h4>
            <div class="space-y-4">
              <div class="border-l-4 border-blue-500 pl-4">
                <h5 class="font-semibold">Navigating The System</h5>
                <p>The first week of training focuses on website building, with participants following daily 2-hour lectures by Mr. Zion and Mr. Angel from London. Each day you learn essential skills guided by three key meetings on Google Meet — at the start, middle, and end of the week.</p>
              </div>
            </div>
          </div>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-lg mb-4">WEEK 2: INTERMEDIATE</h4>
            <div class="space-y-4">
              <div class="border-l-4 border-green-500 pl-4">
                <h5 class="font-semibold">Hands-in Practice</h5>
                <p>In the second week, you will undergo intensive training on the Zylo website building system. Throughout this week, you will be required to create three test websites. At the end of the week, our team will provide you with valuable tips and guidance to help you achieve better results and enhance your skills.</p>
              </div>
            </div>
          </div>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-lg mb-4">WEEK 3: AFFILIATE</h4>
            <div class="space-y-4">
              <div class="border-l-4 border-purple-500 pl-4">
                <h5 class="font-semibold">Marketing</h5>
                <p>Week 3, participants will learn how to make money with commissions from affiliate products, eCommerce, and online marketing. These high-powered classes are compulsory for those wishing to earn recurring income and are only available to participants who complete the first two weeks.</p>
              </div>
            </div>
          </div>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-lg mb-4">WEEK 4: SALES</h4>
            <div class="space-y-4">
              <div class="border-l-4 border-yellow-500 pl-4">
                <h5 class="font-semibold">Sales Mastery</h5>
                <p>Week 4 features a sales course created by Mr. Brown, an American entrepreneur with a proven track record of generating millions in revenue through sales and business-to-business transactions. These lessons provide valuable insights on how to earn $500 per month by attracting local and international clients to purchase your websites.</p>
              </div>
            </div>
          </div>
        </div>

    
        <div class="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/30 dark:to-red-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">💰 Your Income Potential</h3>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-lg mb-4">Let's Do The Math! 🧮</h4>
            
            <div class="space-y-4">
              <div class="p-4 border border-green-500 rounded-lg">
                <h5 class="font-semibold text-green-700">Monthly Recurring Revenue</h5>
                <ul class="list-disc pl-6">
                  <li>Each active website: £7/month</li>
                  <li>Target: 20 websites</li>
                  <li>Potential monthly income: £140</li>
                  <li>Annual recurring revenue: £1,680</li>
                </ul>
              </div>
              
              <div class="p-4 border border-blue-500 rounded-lg">
                <h5 class="font-semibold text-blue-700">Additional Income Streams</h5>
                <ul class="list-disc pl-6">
                  <li>Affiliate marketing commissions</li>
                  <li>Custom website projects</li>
                  <li>Maintenance services</li>
                  <li>Consultation fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    
      </div>`,
  quiz: [
    {
      question: "According to Bill Gates' quote in the course introduction, what happens if your business is not on the internet?",
      options: [
        "It grows more slowly",
        "You are not in business",
        "It costs more to run",
        "You need better marketing"
      ],
      correct: 1,
      explanation: "Bill Gates emphasizes that in today's digital age, not having an online presence is equivalent to not being in business at all."
    },
    {
      question: "What unique opportunity does the AWB course address in the African market?",
      options: [
        "Teaching coding languages",
        "Building mobile apps",
        "The 80% of African businesses without websites",
        "Social media marketing"
      ],
      correct: 2,
      explanation: "The course addresses the significant gap where 80% of African businesses lack an online presence, creating a massive opportunity for website builders."
    },
    {
      question: "How much recurring monthly income can you earn per active website built through AWB?",
      options: [
        "£5",
        "£6",
        "£7",
        "£8"
      ],
      correct: 2,
      explanation: "AWB offers £7 monthly recurring income for each active website you build and maintain."
    },
    {
      question: "What is the recommended target number of active websites to build for optimal income?",
      options: [
        "10 websites",
        "15 websites",
        "20 websites",
        "25 websites"
      ],
      correct: 2,
      explanation: "The course recommends building 20 active websites, which would generate £140 in monthly recurring income."
    },
    {
      question: "How long does the complete AWB training program last?",
      options: [
        "2 weeks",
        "3 weeks",
        "4 weeks",
        "6 weeks"
      ],
      correct: 2,
      explanation: "The AWB training is a comprehensive 4-week hands-on practice program designed to turn you into a professional website builder."
    },
    {
      question: "What additional income stream does the AWB course teach besides website building?",
      options: [
        "Social media management",
        "Content writing",
        "Affiliate marketing",
        "Email marketing"
      ],
      correct: 2,
      explanation: "The course includes training in affiliate marketing as an additional income stream alongside website building."
    },
    {
      question: "What is required to receive the AWB certification?",
      options: [
        "Build 5 websites",
        "Pass the online test",
        "Complete 6 months of work",
        "Pay a certification fee"
      ],
      correct: 1,
      explanation: "To receive certification, students must pass an online test after completing the training program."
    },
    {
      question: "What is the total potential monthly recurring income if you reach the target number of active websites?",
      options: [
        "£120",
        "£130",
        "£140",
        "£150"
      ],
      correct: 2,
      explanation: "With 20 active websites at £7 each, you can earn £140 in monthly recurring income."
    },
    {
      question: "What type of practical experience does the AWB course provide?",
      options: [
        "Theoretical learning only",
        "Video tutorials only",
        "Hands-on website building practice",
        "Written assignments"
      ],
      correct: 2,
      explanation: "The course provides hands-on practice in website building, allowing you to learn by doing real projects."
    },
    {
      question: "How often are payments made for active websites maintained through AWB?",
      options: [
        "Weekly",
        "Monthly",
        "Quarterly",
        "Annually"
      ],
      correct: 1,
      explanation: "AWB provides recurring monthly payments for each active website you maintain."
    }
  ]
    },
    {
      id: 2,
      title: "Create an Account (Sign Up)",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Creating Your Zylosite Account</h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Sign Up Process</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Visit www.zylosite.com</li>
            <li>Click the "Sign Up" button</li>
            <li>Fill in required information</li>
            <li>Verify your email</li>
            <li>Complete your profile</li>
          </ol>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Important Tips</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Use a strong password</li>
            <li>Keep your credentials secure</li>
            <li>Use a professional email address</li>
          </ul>
        </div>
      </div>`,
      quiz: [
        {
          question: "What is the first step in creating a Zylosite account?",
          options: ["Fill in profile", "Visit zylosite.com", "Verify email", "Choose template"],
          correct: 1
        },
        {
          question: "Which of these is recommended for account security?",
          options: ["Simple password", "Using birthday as password", "Strong password", "Sharing credentials"],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "Login",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Logging into Zylosite</h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Login Process</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Navigate to the login page</li>
            <li>Enter your email</li>
            <li>Enter your password</li>
            <li>Click "Login"</li>
          </ol>
        </div>

        <div class="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Troubleshooting</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Forgot password recovery</li>
            <li>Account lockout procedures</li>
            <li>Contact support if needed</li>
          </ul>
        </div>
      </div>`,
      quiz: [
        {
          question: "What should you do if you forget your password?",
          options: ["Create new account", "Use password recovery", "Contact friend", "Wait 24 hours"],
          correct: 1
        },
        {
          question: "What information is required to log in?",
          options: ["Name and phone", "Email and password", "Username only", "Phone number only"],
          correct: 1
        }
      ]
    },
    {
      id: 4,
      title: "Website Navigation",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Navigating Your Website Dashboard</h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Dashboard Elements</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Main menu overview</li>
            <li>Quick access tools</li>
            <li>Recent projects section</li>
            <li>Settings and preferences</li>
          </ul>
        </div>

        <div class="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Key Features</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Projects Panel</h4>
              <p>Access and manage all your website projects.</p>
            </div>
            
            <div>
              <h4 class="font-semibold">Tools Section</h4>
              <p>Quick access to commonly used website building tools.</p>
            </div>
          </div>
        </div>
      </div>`,
      quiz: [
        {
          question: "Where can you find your website projects?",
          options: ["Settings menu", "Projects panel", "Help section", "Login page"],
          correct: 1
        },
        {
          question: "What is the purpose of the dashboard?",
          options: ["Only for logout", "Email management", "Central control hub", "Password reset"],
          correct: 2
        }
      ]
    },
    {
      id: 5,
      title: "Logout",
      content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Logging Out Securely</h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Logout Process</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Save all current work</li>
            <li>Click profile icon</li>
            <li>Select "Logout"</li>
            <li>Confirm logout if prompted</li>
          </ol>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
          <h3 class="text-xl font-semibold mb-4">Security Tips</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Always logout when finished</li>
            <li>Clear browser cache if on public computer</li>
            <li>Never leave account logged in on shared devices</li>
          </ul>
        </div>
      </div>`,
      quiz: [
        {
          question: "What should you do before logging out?",
          options: ["Delete cookies", "Save your work", "Clear history", "Change password"],
          correct: 1
        },
        {
          question: "What is recommended when using a public computer?",
          options: ["Stay logged in", "Clear browser cache", "Share credentials", "Save password"],
          correct: 1
        }
      ]
    }
  ]
},
  {
    id: 2,
    title: "Advanced Website Building Techniques",
    units: [
      {
        id: 1,
        title: "Customizing Templates",
        content: `This unit focuses on advanced customization techniques, including modifying themes, changing color schemes, and adding unique features to templates.`,
        quiz: [
          {
            question: "What is the purpose of customizing a template?",
            options: ["To make it visually appealing", "To align with branding", "To add unique features", "All of the above"],
            correct: 3
          },
          {
            question: "Which tool is best for editing templates in Zylosite?",
            options: ["Theme Editor", "Dashboard", "Content Manager", "Quiz Creator"],
            correct: 0
          }
        ]
      },
      {
        id: 2,
        title: "SEO & Performance Optimization",
        content: `Students will learn how to optimize their websites for search engines and improve loading speed and overall performance.`,
        quiz: [
          {
            question: "What does SEO stand for?",
            options: ["Search Engine Optimization", "Site Evaluation Order", "System Efficiency Online", "Search Enhanced Options"],
            correct: 0
          },
          {
            question: "Which tool helps improve website performance on Zylosite?",
            options: ["Performance Dashboard", "Analytics", "Speed Optimizer", "All of the above"],
            correct: 3
          }
        ]
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
  const isModuleLocked = module.id !== 1 && !completedUnits.some(unit => 
    unit.moduleId === module.id - 1 && 
    unit.unitId === defaultCourseModules.find(m => m.id === module.id - 1)?.units?.length
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
        isModuleLocked ? 'border-gray-300 dark:border-gray-600 opacity-75' : 'border-gray-200 dark:border-gray-600'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isModuleLocked ? (
              <Lock className="w-5 h-5 text-gray-500" />
            ) : (
              <Unlock className="w-5 h-5 text-green-500" />
            )}
            <h3 className="text-lg font-semibold">Module {module.id}: {module.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">
              {completedUnits.filter(unit => unit.moduleId === module.id).length}/{module.units.length} units
            </span>
          </div>
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
                onClick={() => !isModuleLocked && !isUnitLocked && onClick(module.id, unit.id)}
                disabled={isModuleLocked || isUnitLocked}
                className={`w-full text-left p-3 rounded-md flex items-center justify-between ${
                  isModuleLocked || isUnitLocked
                    ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isUnitCompleted ? (
                    <Medal className="w-5 h-5 text-green-500" />
                  ) : isModuleLocked || isUnitLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Brain className="w-5 h-5 text-blue-500" />
                  )}
                  Unit {unit.id}: {unit.title}
                </span>
                {isUnitCompleted && (
                  <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                    Completed
                  </span>
                )}
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

  // Helper function to scroll to top of modal
  const scrollModalToTop = useCallback(() => {
    const modalContent = document.querySelector('.bg-white.dark\\:bg-gray-800.w-full.h-full');
    if (modalContent) {
      modalContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

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

  // Update handleModuleUnitSelect to include scroll behavior
  const handleModuleUnitSelect = useCallback((moduleId, unitId) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const unit = module.units.find(u => u.id === unitId);
    if (!unit) return;
    
    setSelectedModule(module);
    setSelectedUnit(unit);
    setQuizState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    });

    // Scroll to top after state updates
    setTimeout(scrollModalToTop, 100);
  }, [modules, scrollModalToTop]);

  // Update handleQuizComplete to use modules prop
  const handleQuizComplete = useCallback((passed) => {
    if (passed) {
      setCompletedUnits(prev => {
        const newCompletedUnits = [
          ...prev,
          { moduleId: selectedModule.id, unitId: selectedUnit.id }
        ];
        
        // Check if current module is complete
        const isModuleComplete = selectedModule.units.every(unit =>
          newCompletedUnits.some(completed => 
            completed.moduleId === selectedModule.id && 
            completed.unitId === unit.id
          )
        );
  
        // Check if this is the last unit of the last module
        const isLastModule = selectedModule.id === modules.length;
        const isLastUnit = selectedUnit.id === selectedModule.units.length;
        const isLastBadge = isLastModule && isLastUnit;
  
        if (isModuleComplete) {
          setTimeout(() => {
            // Trigger badge award with additional info about course completion
            setShowBadgeAward({
              ...badges[selectedModule.id],
              isLastBadge
            });
            // Trigger confetti for module completion
            triggerConfetti();
          }, 1000);
        }
  
        return newCompletedUnits;
      });
  
      const currentUnitIndex = selectedModule.units.findIndex(u => u.id === selectedUnit.id);
      const nextUnit = selectedModule.units[currentUnitIndex + 1];
      
      if (nextUnit) {
        // Move to next unit in current module
        setTimeout(() => {
          setSelectedUnit(nextUnit);
          setQuizState({
            currentQuestionIndex: 0,
            correctAnswers: 0,
            submitted: false,
            selectedAnswer: null,
            showFeedback: false
          });
          scrollModalToTop();
        }, 2000);
      } else {
        // Current module is complete, check for next module
        const nextModule = modules.find(m => m.id === selectedModule.id + 1);
        if (nextModule) {
          setTimeout(() => {
            setSelectedModule(nextModule);
            setSelectedUnit(nextModule.units[0]);
            setQuizState({
              currentQuestionIndex: 0,
              correctAnswers: 0,
              submitted: false,
              selectedAnswer: null,
              showFeedback: false
            });
          }, 2000);
        } else {
          // Course is complete
          setTimeout(() => {
            setSelectedModule(null);
            setSelectedUnit(null);
            // Show course completion celebration
            triggerConfetti();
          }, 2000);
        }
      }
    }
    
    // Set quiz to submitted state regardless of pass/fail
    setQuizState(prev => ({ ...prev, submitted: true }));
  }, [selectedModule, selectedUnit, modules, badges, setShowBadgeAward, triggerConfetti, scrollModalToTop]);

  const { playSound, soundEnabled, setSoundEnabled, audioContext } = useAudio();

  const handleModuleClick = useCallback(async (moduleId) => {
    const selectedMod = modules.find(m => m.id === moduleId);
    
    if (!selectedMod || !selectedMod.units || !selectedMod.units.length) {
      setSelectedModule({ isComplete: true });
      return;
    }
  
    const previousModuleCompleted = moduleId === 1 || completedUnits.some(unit => 
      unit.moduleId === moduleId - 1
    );
    
    if (!previousModuleCompleted) {
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }
      playSound('wrong');
      return;
    }
    
    setSelectedModule(selectedMod);
    setSelectedUnit(selectedMod.units[0]);
    setQuizState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    });
  }, [completedUnits, audioContext, playSound, modules]);

  const CourseComplete = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <GraduationCap className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-3xl font-bold">Course Completed! 🎓</h2>
        <p className="text-gray-600 dark:text-gray-300">Congratulations! You've completed all available modules.</p>
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );

  const handleAnswerSelect = useCallback(async (optionIndex) => {
    if (quizState.showFeedback || !selectedUnit || !selectedUnit.quiz) return;
    
    if (audioContext?.state === 'suspended') {
      await audioContext.resume();
    }
    
    setQuizState(prev => ({ ...prev, selectedAnswer: optionIndex, showFeedback: true }));
  
    const currentQuestion = selectedUnit.quiz[quizState.currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correct;
    
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
  
    if (quizState.currentQuestionIndex < selectedUnit.quiz.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showFeedback: false
      }));
    } else {
      const finalScore = isCorrect ? quizState.correctAnswers + 1 : quizState.correctAnswers;
      const passed = finalScore >= Math.ceil(selectedUnit.quiz.length * 0.7);
      
      const scorePercentage = (finalScore / selectedUnit.quiz.length) * 100;
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

        // Update completed units
        const newCompletedUnit = { moduleId: selectedModule.id, unitId: selectedUnit.id };
        setCompletedUnits(prev => {
          if (prev.some(unit => unit.moduleId === newCompletedUnit.moduleId && unit.unitId === newCompletedUnit.unitId)) {
            return prev;
          }
          return [...prev, newCompletedUnit];
        });

        // Check if this completes the module
        const allModuleUnits = selectedModule.units;
        const completedModuleUnits = completedUnits.filter(unit => unit.moduleId === selectedModule.id);
        const isModuleComplete = completedModuleUnits.length === allModuleUnits.length - 1; // -1 because current unit isn't in completedUnits yet

        if (isModuleComplete) {
          // Award badge for completing the module
          setEarnedBadges(prev => {
            if (!prev.includes(selectedModule.id)) {
              return [...prev, selectedModule.id];
            }
            return prev;
          });
          
          // Show badge award modal
          setShowBadgeAward({
            ...badges[selectedModule.id],
            isLastBadge: selectedModule.id === modules.length
          });
        }

        // Find next unit in current module
        const currentUnitIndex = selectedModule.units.findIndex(u => u.id === selectedUnit.id);
        const nextUnit = selectedModule.units[currentUnitIndex + 1];

        // If there's a next unit in the current module, move to it
        if (nextUnit) {
          setTimeout(() => {
            setSelectedUnit(nextUnit);
            setQuizState({
              currentQuestionIndex: 0,
              correctAnswers: 0,
              submitted: false,
              selectedAnswer: null,
              showFeedback: false
            });
            scrollModalToTop();
          }, 2000);
        } else {
          // Module is complete, prepare to move to next module
          const nextModule = modules.find(m => m.id === selectedModule.id + 1);
          if (nextModule) {
            setTimeout(() => {
              setSelectedModule(nextModule);
              setSelectedUnit(nextModule.units[0]);
              setQuizState({
                currentQuestionIndex: 0,
                correctAnswers: 0,
                submitted: false,
                selectedAnswer: null,
                showFeedback: false
              });
              scrollModalToTop();
            }, 2000);
          }
        }
      }
      
      setQuizState(prev => ({ ...prev, submitted: true }));
    }
  }, [quizState, selectedModule, selectedUnit, audioContext, playSound, completedUnits, modules, scrollModalToTop, badges]);


  // Memoize the current quiz
  const currentQuiz = useMemo(() => {
    if (!selectedModule || !selectedUnit) return null;
    return selectedUnit.quiz?.[quizState.currentQuestionIndex];
  }, [selectedModule, selectedUnit, quizState.currentQuestionIndex]);
  
  const renderQuiz = useCallback(() => {
    if (!selectedUnit?.quiz) return null;
    
    const currentQuestion = selectedUnit.quiz[quizState.currentQuestionIndex];
    
    if (quizState.submitted) {
      const finalScore = quizState.correctAnswers;
      const totalQuestions = selectedUnit.quiz.length;
      const passed = finalScore >= Math.ceil(totalQuestions * 0.7);
      const isPerfectScore = finalScore === totalQuestions;
  
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
            <p className="text-xl mb-2">You've scored {finalScore} out of {totalQuestions} marks!</p>
            <div className="flex justify-center gap-2 my-4">
              {Array.from({ length: finalScore }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
              {Array.from({ length: totalQuestions - finalScore }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-gray-300" />
              ))}
            </div>
            {!passed && (
              <p className="mt-4 text-lg">Keep going! You're getting better with each try! 🚀</p>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            {passed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleModuleClick(selectedModule.id + 1);
                  scrollModalToTop();
                }}
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
                  scrollModalToTop();
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
  
    if (!currentQuestion) return null;
    
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Question {quizState.currentQuestionIndex + 1} of {selectedUnit.quiz.length}</h3>
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
              {Array.from({ length: selectedUnit.quiz.length - quizState.currentQuestionIndex }).map((_, i) => (
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
          <p className="text-xl font-medium mb-6">{currentQuestion.question}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                isCorrect={currentQuestion.correct}
                selected={quizState.selectedAnswer}
                showFeedback={quizState.showFeedback}
                onClick={handleAnswerSelect}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }, [quizState, selectedUnit, soundEnabled, handleAnswerSelect, handleModuleClick, setQuizState, scrollModalToTop]);

  return (
    <div className="space-y-8">
      <BadgeDisplay earnedBadges={earnedBadges} />
      
      {selectedModule?.isComplete ? (
        <CourseComplete onClose={() => setSelectedModule(null)} />
      ) : (
        <div className="grid gap-6">
          {modules.map(module => (
            <ModuleListItem
              key={module.id}
              module={module}
              completedUnits={completedUnits}
              onClick={handleModuleUnitSelect}
            />
          ))}
        </div>
      )}

      {showBadgeAward && (
        <EnhancedBadgeAward 
          badge={showBadgeAward} 
          onClose={() => setShowBadgeAward(null)}
          isLastBadge={showBadgeAward.isLastBadge} 
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
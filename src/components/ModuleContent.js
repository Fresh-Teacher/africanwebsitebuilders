import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, Unlock, X, Brain, ArrowRight, ArrowLeft, Star, Volume2, VolumeX, Medal, Trophy } from 'lucide-react';
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
    name: "Layout Whiz",
    description: "Cogs, Grids, Components, Pages & Pop-Ups",
    icon: <Layout className="w-8 h-8 md:w-12 md:h-12 text-green-500" />,
    color: "bg-green-100 dark:bg-green-900/30"
  },
  4: {
    name: "Design Guru",
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
    name: "AI Master",
    description: "Chat GPT and Speed Test",
    icon: <Brain className="w-8 h-8 md:w-12 md:h-12 text-indigo-500" />,
    color: "bg-indigo-100 dark:bg-indigo-900/30"
  },
  7: {
    name: "Computer Wizard",
    description: "Recap Test and Practicals",
    icon: <Lightbulb className="w-8 h-8 md:w-12 md:h-12 text-pink-500" />,
    color: "bg-pink-100 dark:bg-pink-900/30"
  },
  8: {
    name: "Time Tamer",
    description: "Creating Countdowns with Zylo Modules",
    icon: <Clock className="w-8 h-8 md:w-12 md:h-12 text-orange-500" />,
    color: "bg-orange-100 dark:bg-orange-900/30"
  },
  9: {
    name: "Meta Master",
    description: "Website SEO, Favicons & Social Media",
    icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-teal-500" />,
    color: "bg-teal-100 dark:bg-teal-900/30"
  },
  10: {
    name: "Website Professor",
    description: "AWB Tutor Course Training",
    icon: <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-cyan-500" />,
    color: "bg-cyan-100 dark:bg-cyan-900/30"
  },
  11: {
    name: "Enterprise Explorer",
    description: "Become Freelance Ready",
    icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-emerald-500" />,
    color: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  12: {
    name: "Trade Tycoon",
    description: "Sales Online and Local",
    icon: <ShoppingCart className="w-8 h-8 md:w-12 md:h-12 text-violet-500" />,
    color: "bg-violet-100 dark:bg-violet-900/30"
  }
};


const BadgeDisplay = ({ earnedBadges }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleBadges = 4;
  const totalBadges = Object.keys(badges).length;
  const maxIndex = Math.max(0, totalBadges - visibleBadges);

  const scroll = (direction) => {
    setActiveIndex(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      }
      return Math.min(maxIndex, prev + 1);
    });
  };

  const visibleSlots = Array.from({ length: totalBadges }, (_, index) => {
    const moduleId = index + 1;
    const isEarned = earnedBadges.includes(moduleId);
    return isEarned ? { ...badges[moduleId], id: moduleId } : null;
  });

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Achievement Badges
        </h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 p-2 bg-white/10 hover:bg-white/20 rounded-full shadow-lg z-10 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{ transform: `translateX(-${activeIndex * (100 / visibleBadges)}%)` }}
              >
                {visibleSlots.map((badge, index) => (
                  <div
                    key={index}
                    className="flex-none w-1/2 md:w-1/4"
                  >
                    {badge ? (
                      <div className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
                        <div className="p-6 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 animate-pulse opacity-50"></div>
                              {badge.icon}
                            </div>
                            <h4 className="font-bold text-sm text-white">{badge.name}</h4>
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-400/20 text-green-300 backdrop-blur-sm border border-green-400/30">
                              EARNED ✪
                            </span>
                          </div>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-900/90 to-purple-900/90 flex items-center justify-center p-4 backdrop-blur-sm">
                            <p className="text-white text-xs text-center">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl overflow-hidden transition-all duration-300">
                        <div className="p-6 h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/5">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gray-700/50">
                              <Lock className="w-8 h-8 text-gray-400" />
                            </div>
                            <h4 className="font-bold text-sm text-gray-400">Locked Badge</h4>
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-700/30 text-gray-500">
                              LOCKED 🔐
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {activeIndex < maxIndex && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 p-2 bg-white/10 hover:bg-white/20 rounded-full shadow-lg z-10 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </>
        )}

        {showAll && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSlots.map((badge, index) => (
              <div key={index} className="w-full">
                {badge ? (
                  <div className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
                    <div className="p-6 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 animate-pulse opacity-50"></div>
                          {badge.icon}
                        </div>
                        <h4 className="font-bold text-sm text-white">{badge.name}</h4>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-400/20 text-green-300 backdrop-blur-sm border border-green-400/30">
                          EARNED
                        </span>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-900/90 to-purple-900/90 flex items-center justify-center p-4 backdrop-blur-sm">
                        <p className="text-white text-xs text-center">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden transition-all duration-300">
                    <div className="p-6 h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/5">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gray-700/50">
                          <Lock className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="font-bold text-sm text-gray-400">Locked Badge</h4>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-700/30 text-gray-500">
                          LOCKED
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {earnedBadges.length === 0 && (
        <div className="mt-6 p-4 rounded-lg bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
          <p className="text-center text-blue-300">
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
        <div class="flex justify-center mb-6">
  <a 
  href="https://awb-silk.vercel.app/DOC-20241216-WA0234..pdf" 
  download
    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors animate-heartbeat"
  >
    <svg 
      class="w-5 h-5 mr-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
    Download PDF Guide
  </a>
</div>
        <h2 class="text-2xl font-bold">Welcome to Your Website Building Course! 🚀</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/African Web-Builders Course English (1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio className="w-full mt-4" controls>
  <source src="https://awb-silk.vercel.app/Module 1, Unit 1.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">🖥️The Future is Digital!💻</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "If your business is not on the internet, then you are not in business."
          <footer class="text-sm mt-2">- Bill Gates, Microsoft Founder</footer>
        </blockquote>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🤔 Let's Start With a Story...</h4>
            <p class="mb-4">Meet Sarah, a small business owner in Kampala. She makes beautiful traditional clothing but only sells to people who walk past her shop. One day, a customer from London found her shop online (through a website her nephew quickly made) and ordered 50 pieces! Sarah's business transformed overnight. This is the power of having an online presence!</p>
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
                <p>Week 4 features a sales course created by Mr. Brown, an American entrepreneur with a proven track record of generating millions in revenue through sales and business-to-business transactions. These lessons provide valuable insights on how to earn  £500 per month by attracting local and international clients to purchase your websites.</p>
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
                <li>Each active website: £7/month (UGX 32,100)</li>
                <li>Target: 20 websites</li>
                <li>Potential monthly income: £140 (UGX 641,850)</li>
                <li>Annual recurring revenue: £1,680 (UGX 7,702,300)</li>
              </ul>
            </div>
          </div><br>
          
              
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
          },
          {
            question: "What unique opportunity does the AWB course address in the African market?",
            options: [
              "Teaching coding languages",
              "Building mobile apps",
              "To cater for the 80% of African businesses without websites",
              "Social media marketing"
            ],
            correct: 2,
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
          },
          {
            "question": "How much money will you pay for the course?",
            "options": [
              "£2 (UGX 9,600)",
              "£4 (UGX 19,200)",
              "£6 (UGX 28,800)",
              "£8 (UGX 38,400)"
            ],
            "correct": 3
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
          }
        ]
      },
      {
        "id": 2,
        "title": "Introduction to African Website Builders",
        "content": `<div class="space-y-6">
      <h2 class="text-2xl font-bold">Hey Future Digital Entrepreneur! 👋 Ready for Something Amazing? 🚀</h2>
      <video className="w-full rounded-lg" controls>
      <source src="https://awb-silk.vercel.app/VID-20241216-WA0157.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <audio className="w-full mt-4" controls>
    <source src="https://awb-silk.vercel.app/Module 1, Unit 2.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Transforming Lives Through Digital Opportunities!</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Every African deserves the opportunity to build a sustainable future in the digital age."
            <footer class="text-sm mt-2">- Mr. Angel & Mr. Zion, AWB Co-founders</footer>
          </blockquote>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
          <h4 class="font-semibold text-xl mb-4">👉 Quick Question For You...</h4>
          <p class="mb-4">Ever dreamt of earning real money while you sleep? Or maybe you've thought, "I wish I could build websites and make some money, but I don't know how to code..." Well, guess what? You're in exactly the right place! 😎</p>
          
          <p class="mb-4">Let me tell you a quick story that'll blow your mind... 🤯</p>
          
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
          <p class="mb-2">Two amazing gentlemen from the UK, <b>Mr. Angel and Mr. Zion</b> (they're super cool and you'll meet them soon!), were sitting in London thinking: "Hey, what if we could help talented people in Africa earn some good money from creating websites without needing any degrees or coding skills?"</p>
          <p>And BOOM! 💥 <strong>African Website Builders</strong> was born!</p>
        </div>
      
          <p class="mb-4">Today, their vision has become reality! Hundreds of Africans from various backgrounds are building sustainable livelihoods through AWB. They're not just earning extra income - they're transforming their lives and communities! 🌍</p>

        </div>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
          <h4 class="font-semibold text-xl mb-4">🎮 The Coolest Part? It's Like Playing a Game!</h4>
          <p class="mb-4">Remember how easy it is to post on social media? Well, building websites with our tool (we call it Zylosite) is JUST AS EASY! No kidding! 😉<p>Forget everything you've heard about website building being complicated! With Zylosite, our revolutionary web tool, you'll be creating stunning websites in minutes - yes, MINUTES! ⏰</p><br>
            
          <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Why Zylosite is Different:</h5>
          <ul class="list-disc pl-6 space-y-2">
            <li>Zero programming knowledge needed! (seriously, not even a single line of code!) 🚫</li>
            <li>Simple drag-and-drop interface (If you can create a social media post, you can build a website! 🤳)</li>
            <li>Professional templates ready to customize</li>
            <li>Works like WordPress and Wix - but pays you monthly! 💰</li>
          </ul>
        </div>
      
          </div>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">Now, Let's Talk About The Money, Bro! 🤑</h4>
            <p class="mb-4">This is where it gets SUPER exciting (I'm actually bouncing in my chair as I write this!) 🤗</p>            
            <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg mb-4">
    <h5 class="font-semibold">The AWB Income Formula:</h5>
    <ul class="list-disc pl-6 space-y-2">
      <li>Each active website = £7 monthly recurring income</li>
      <li>Your goal: Build 20 active websites</li>
      <li>Monthly potential: £140 in passive income!</li>
      <li>Yearly earnings: £1,680 for work done once!</li>
      <li>Income source: Monthly hosting fees from clients</li>
    </ul>
  </div>
        

            <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4"> Let's Talk Real Money - In Your Own Currency! 💷</h4>
            <p class="mb-4">We know you're thinking: "Okay, pounds sound great, but what does this mean for me in Uganda?" Let's break it down! 📊</p>
              
            <div class="bg-green-50 p-4 rounded-lg mb-4">
              <div class="space-y-4">
              <div class="p-3 bg-white/70 dark:bg-gray-800 rounded">
              <p class="font-semibold">Per Website: 💰</p>
              <ul class="list-disc pl-6">
                <li>£7 per month</li>
                <li>That's approximately UGX 34,300 per website, per month!</li>
              </ul>
            </div>
      
            <div class="p-3 bg-white/70 dark:bg-gray-800 rounded">
            <p class="font-semibold">Target Goal - 20 Websites: 🎯</p>
            <ul class="list-disc pl-6">
              <li>£140 monthly = UGX 686,000</li>
              <li>That's more than many entry-level jobs in Kampala!</li>
            </ul>
          </div>
      
          <div class="p-3 bg-white/70 dark:bg-gray-800 rounded">
          <p class="font-semibold">Yearly Potential: 🤯</p>
          <ul class="list-disc pl-6">
            <li>With 20 websites: £1,680 annually</li>
            <li>That's approximately UGX 8,232,000 per year!</li>
            <li>Now we are talking! 😜</li>
          </ul>
        </div>
      </div>
            </div>
    
            <div class="p-4 border-2 border-yellow-400 rounded-lg">
              <h5 class="font-semibold text-lg mb-2">💡 Quick Math:</h5>
              <p>Build just 2 websites per month, and in 10 months you'll hit your target of 20 websites and £140 monthly recurring income!</p>
            </div>
          </div>
    
          <div class="bg-blue/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🎓 Your Complete Success Package</h4>
            <p class="mb-4">We don't just train you - we launch your career! Here's what you get:</p>
            
            <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg">
              <h5 class="font-semibold">Expert Training</h5>
              <p>Learn from experienced AWB tutors who know Zylosite inside and out!</p>
            </div>
            
            <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg">
              <h5 class="font-semibold">Official Certification</h5>
              <p>Earn your AWB certification - your passport to the digital economy!</p>
            </div>
            
            <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
              <h5 class="font-semibold">Zylo Job Market Access</h5>
              <p>Get listed on our exclusive job marketplace where clients are actively seeking website builders!</p>
            </div>
          
            <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg">
              <h5 class="font-semibold">Business Team Support</h5>
              <p>Our dedicated business team will help market your services and connect you with potential clients!</p>
              <p>You'll get listed on our Zylo Job Market - where clients are literally waiting to throw money at you!</p>
            </div>
          </div>
          </div>
    
          <div class="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-800 dark:to-orange-800 p-6 rounded-lg">
          <h4 class="font-semibold text-xl mb-4">But Wait... It Gets Even Better! 😁</h4>
          <p class="text-lg font-bold text-blue-600 dark:text-blue-300 mb-4">BUILD ONCE, EARN FOREVER! 💸</p>
          <p class="text-lg mb-4">Picture this: You're chilling on your couch, maybe watching Netflix, and BING! 📱 Another payment just dropped into your account! How? Because your websites keep making money EVEN WHILE YOU SLEEP! 😴</p>
          <p class="text-lg mb-4">Once you build a website and your client loves it (and they will!), you'll keep earning month after month as long as it stays active! Imagine earning money while you...</p>
          <ol class="list-decimal pl-6 space-y-2 mb-4">
              <li>Sleep peacefully at night 🛌</li>
              <li>Enjoy time with family and friends 👨‍👩‍👧‍👦</li>
              <li>Work on building even more websites 💻</li>
              <li>Travel and explore the world ✈️</li>
          </ol>
          <p class="text-lg font-semibold">That's right - PASSIVE MONTHLY INCOME for work you do just once! 🎉</p>
      </div>
    
      <div class="bg-white/50 dark:bg-gray-800 p-6 rounded-lg mt-6">
      <h4 class="font-semibold text-xl mb-4">🚀 Ready to Join the Crew?</h4>
      <p class="text-lg mb-4">Remember: Every successful AWB graduate started from here - reading this introduction and dreaming of a better future. The only difference between them and you? They took that first step! They started exactly where you are now - some started with zero tech knowledge (seriously, some couldn't even create an account! 🤓)</p>
      <p class="text-xl font-bold text-center text-blue-600 dark:text-blue-300">The only question is... are you ready to be our next success story? Let's make it happen! <br><strong>The digital revolution is here - and YOU are part of it! </strong>🌟</p>
  </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "What is the primary mission of African Website Builders?",
            "options": [
              "To teach advanced programming",
              "To provide opportunities for low-income Africans to earn sustainable income",
              "To build websites for free",
              "To sell web hosting services"
            ],
            "correct": 1
          },
          {
            "question": "Who are the co-founders of African Website Builders?",
            "options": [
              "Fresh Teacher",
              "Mr. Angel & Mr. Zion",
              "Ms. Grace & Mr. Angel",
              "Mr. Zion & Dr. Smith"
            ],
            "correct": 1
          },
          {
            "question": "How much monthly income can you earn per active website?",
            "options": [
              "£5 (UGX 24,000)",
              "£7 (UGX 33,600)",
              "£10 (UGX 48,000)",
              "£15 (UGX 72,000)"
            ],
            "correct": 1
          }
          ,
          {
            "question": "What is the target number of websites recommended to build?",
            "options": [
              "10 websites",
              "15 websites",
              "20 websites",
              "25 websites"
            ],
            "correct": 2
          },
          {
            "question": "What is the potential yearly earnings from 20 active websites?",
            "options": [
              "£1,200 (UGX 5,760,000)",
              "£1,480 (UGX 7,104,000)",
              "£1,680 (UGX 8,064,000)",
              "£2,000 (UGX 9,600,000)"
            ],
            "correct": 2
          },
          {
            "question": "What makes Zylosite accessible to beginners?",
            "options": [
              "It requires coding knowledge",
              "It needs programming experience",
              "It has a drag-and-drop interface",
              "It requires web design certification"
            ],
            "correct": 2
          },
          {
            "question": "What comprehensive support package does AWB provide?",
            "options": [
              "Only technical support",
              "Just website templates",
              "Expert training, certification, job market access, and business team support",
              "Only client connections"
            ],
            "correct": 2
          },
          {
            "question": "How does the AWB website builder earn you recurring income?",
            "options": [
              "Through one-time website sales",
              "From monthly hosting fees",
              "By selling domains",
              "Through advertising revenue"
            ],
            "correct": 1
          },
          {
            "question": "Which tool will you use to create and manage your website?",
            "options": [
              "WordPress",
              "GoDaddy",
              "Wix",
              "Zylosite"
            ],
            "correct": 3
          },
          {
            "question": "What ongoing work is required to maintain the passive income?",
            "options": [
              "Complete website rebuilds",
              "Daily content updates",
              "Simple maintenance and updates",
              "Weekly client meetings"
            ],
            "correct": 2
          }
        ]
      },
      {
        id: 3,
        title: "Create an Account (Sign Up) and Logging In (Sign In)",
        content: `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Welcome to Your Website Building Course! 🚀</h2>
        <div class="flex justify-center mb-6">
  <a 
  href="https://awb-silk.vercel.app/CREATING%20A%20ZYLOSITE%20ACCOUNT_compressed.pdf" 
  download
    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors animate-heartbeat"
  >
    <svg 
      class="w-5 h-5 mr-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
    Download PDF Guide
  </a>
</div>
        <h2 class="text-2xl font-bold">Sign Up vs Sign In: What's the Difference? 🤔</h2>
        
        <video className="w-full rounded-lg" controls>
          <source src="https://awb-silk.vercel.app/VID-20241224-WA0089.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <audio className="w-full mt-4" controls>
        <source src="https://awb-silk.vercel.app/Module 1, Unit 3.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">🔑 Your Gateway to African Website Builders!</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "The journey of a thousand websites begins with a single login!"
            <footer class="text-sm mt-2">- Fresh Teacher</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">Sign Up vs Sign In</h4>
            <p class="mb-4">Just like starting at a new school, your journey here begins with two important steps:</p>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg">
                <h4 class="font-semibold">📝 Sign Up (First Day)</h4>
                <p>Like your first day at school:</p>
                <ul class="list-disc pl-6 mt-2">
                  <li>Fill out admission forms (your details)</li>
                  <li>Get your student ID (email verification)</li>
                  <li>Choose your locker combination (password)</li>
                </ul>
              </div>
              
              <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
                <h4 class="font-semibold">🎒 Sign In (Daily Return)</h4>
                <p>Like each school day after:</p>
                <ul class="list-disc pl-6 mt-2">
                  <li>Show your ID (enter email)</li>
                  <li>Use your locker combination (password)</li>
                  <li>Head to class (Login!)</li>
                </ul>
              </div>
            </div>
      
            <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-6">
              <h4 class="font-semibold text-xl mb-4">🌟 Your Learning Journey</h4>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white/50 p-3 rounded-lg">
                  <h5 class="font-semibold mb-1">Grade 1: Explorer</h5>
                  <p>Start your web building basics! 📚</p>
                </div>
                <div class="bg-white/50 p-3 rounded-lg">
                  <h5 class="font-semibold mb-1">Grade 2: Creator</h5>
                  <p>Design amazing websites! 🎨</p>
                </div>
                <div class="bg-white/50 p-3 rounded-lg">
                  <h5 class="font-semibold mb-1">Grade 3: Expert</h5>
                  <p>Become a web pro! 🎓</p>
                </div>
              </div>
            </div>
      
            <div class="space-y-8">
              <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg">
                <h3 class="text-xl font-semibold mb-4">📝 Enrolment Process (How to Sign Up)</h3>
              <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                    <div>
                      <p><span class="font-semibold">Visit the AWB Website:</span> Type www.africanwebsitebuilders.com in your browser</p>
                      <p class="text-sm text-gray-600">Just like finding your way to a new school! 🏫</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                    <div>
                      <p>Click <span class="bg-red-500 text-white px-2 py-1 rounded">GET STARTED</span> in the top right (or humburger menu on mobile 📱)</p>
                      <p class="text-sm text-gray-600">It's like walking into the admission office!</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                    <div>
                      <p>Click <span class="bg-green-500 text-white px-2 py-1 rounded">ENTER 'ZYLOSITE' WEBSITE BUILDER</span></p>
                      <p class="text-sm text-gray-600">Just like entering your classroom</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                    <div>
                      <p>Fill in your admission form (first name, last name, email, password)</p>
                      <p class="text-sm text-gray-600">Just like your school registration! 📋</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">5</div>
                    <div>
                      <p>Check the Cloudflare security box</p>
                      <p class="text-sm text-gray-600">(Help beat the robots by proving that you're human! 🤖)</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">6</div>
                    <div>
                      <p>Click <span class="bg-blue-500 text-white px-2 py-1 rounded">Create account</span></p>
                      <p class="text-sm text-gray-600">You're officially enroled! 🎉</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">7</div>
                    <div>
                      <p>Check your email for the verification link</p>
                      <p class="text-sm text-gray-600">Like getting your official acceptance letter! ✉️</p>
                    </div>
                  </div>
                </div>
              </div>
      
              <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg">
              <h3 class="text-xl font-semibold mb-4">🔄 How to Sign In (Return to Your Account)</h3>
            <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <div class="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                    <div>
                      <p>Click <span class="bg-gray-500 text-white px-2 py-1 rounded">MEMBER AREA in the top right (or menu on mobile) </span></p>
                      <p class="text-sm text-gray-600">Like walking through the school gate 🚶‍♂️</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                    <div>
                      <p>Enter your email and password</p>
                      <p class="text-sm text-gray-600">Enter your email and password (Pro tip: Check "Remember me" to save time and login automatically next time! ⚡)</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                    <div>
                      <p>Check the Cloudflare security box</p>
                      <p class="text-sm text-gray-600">Quick security check! ✋</p>
                    </div>
                  </div>
      
                  <div class="flex items-start gap-3">
                    <div class="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                    <div>
                      <p>Click <span class="bg-green-500 text-white px-2 py-1 rounded">Login</span></p>
                      <p class="text-sm text-gray-600"> ...and BOOM! You're in, ready to learn!📚</p>
                    </div>
                  </div>
                </div>
              </div>
      <br>
              <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">💡 Safety Tips</h4>
              <ul class="space-y-2">
                <li>• Use a strong password (mix of letters, numbers, and symbols)</li>
                <li>• Always verify your email (it's like your official school ID!)</li>
                <li>• Keep your login details secret (like your diary! 🤫)</li>
                <li>• Need help? Your digital teachers are just a message away! 🙋‍♂️</li>
              </ul>
            </div>
    <br>
            <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
              <h3 class="text-xl font-semibold mb-4">🎓 Digital School Fun Facts!</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white/50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Did You Know? 🤓</h4>
                  <p>The most common password is still "123456"! That's like leaving your school locker wide open! Don't be that person!</p>
                </div>
                <div class="bg-white/50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Security Challenge! 🏆</h4>
                  <p>Try to create a password that would take over 100 years to crack! Hint: Mix uppercase, lowercase, numbers, and symbols! Create a password that will give headache to hackers. 🤕</p>
                </div>
              </div>
            </div>
    <br>
            <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg">
              <h3 class="text-xl font-semibold mb-4">📚 Your Amazing Journey Begins!</h3>
              <div class="space-y-4">
                <p>Remember that butterfly feeling on your first day of school? That's exactly what awaits you here!</p>
                <div class="bg-white/50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Remember... ⭐</h4>
                  <p>Every web development expert started as a beginner student.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
        "quiz": [
          {
            "question": "What is the first step to create a new account on African Website Builders?",
            "options": [
              "Click 'Member Area'",
              "Visit africanwebsitebuilders.com",
              "Check your email",
              "Fill out your password"
            ],
            "correct": 1
          },
          {
            "question": "Which button do you click to begin the sign-up process?",
            "options": [
              "LOGIN",
              "MEMBER AREA",
              "GET STARTED",
              "CREATE ACCOUNT"
            ],
            "correct": 2
          },
          {
            "question": "What security feature must you complete during both sign-up and sign-in?",
            "options": [
              "Enter your phone number",
              "Upload a profile picture",
              "Check the Cloudflare security box",
              "Answer security questions"
            ],
            "correct": 2
          },
          {
            "question": "What appears after clicking the 'ENTER ZYLOSITE WEBSITE BUILDER' button?",
            "options": [
              "A confirmation page",
              "A login form",
              "A form to fill in your details",
              "The account dashboard"
            ],
            "correct": 2
          },
          {
            "question": "What does the email from AWB support include?",
            "options": [
              "A discount code",
              "A verification link",
              "An account creation tutorial",
              "Your login credentials"
            ],
            "correct": 1
          },
          {
            "question": "What should you do after submitting your sign-up form?",
            "options": [
              "Start building immediately",
              "Call support",
              "Check your email for verification",
              "Create a password"
            ],
            "correct": 2
          },
          {
            "question": "What helpful feature can save time during future sign-ins?",
            "options": [
              "Remember me checkbox",
              "Face recognition",
              "Fingerprint scanning",
              "Auto-login"
            ],
            "correct": 0
          },
          {
            "question": "What is the purpose of the Cloudflare security checkbox?",
            "options": [
              "To save your login details",
              "To verify you are not a robot",
              "To activate two-factor authentication",
              "To encrypt your password"
            ],
            "correct": 1
          },
          {
            "question": "Which button do returning users click to access their account?",
            "options": [
              "GET STARTED",
              "MEMBER AREA",
              "SIGN UP",
              "CREATE ACCOUNT"
            ],
            "correct": 1
          },
          {
            "question": "What is the name of the website builder you access after a successful sign in?",
            "options": [
              "SiteCraft",
              "ZyloSite",
              "WebMaker",
              "BuildFast"
            ],
            "correct": 1
          }
        ]
      },
      {
        id: 4,
        title: "Website Navigation",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey Future Website Wizard! 🧙‍♂️ Ready to Create Some Internet Magic? ✨
        </h2>
        <video className="w-full rounded-lg" controls>
          <source src="https://awb-silk.vercel.app/VID-20241226-WA0076.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <audio className="w-full mt-4" controls>
        <source src="https://awb-silk.vercel.app/Module 1, Unit 4.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Let's Start Your Amazing Website Journey! 🚀</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "Imagine stepping into a MASSIVE digital city - bigger than Kampala, Mpigi, and Masaka combined! That's the internet, and you're about to become its next master builder! 🏗️"
                  <footer class="text-sm mt-2">- AWB Training Team</footer>
          </blockquote>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
          <h4 class="font-semibold text-xl mb-4">🌐 Your Journey to Website Mastery</h4>
          <p class="mb-4"> Imagine you're building a digital house - that's exactly what creating a website is like! And guess what? You're about to learn how to build not just one, but MANY awesome websites that can earn you money while you sleep! How cool is that? 😎</p>
          
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <p class="mb-2">Here's the fun part: Every website you create needs a home on the internet - we call this hosting. Think of it like renting a space in a massive digital shopping mall! 🏪</p>
            <p>And here's the BEST news: You'll earn £7 (UGX 34,300) every month for each website you host. Build 20 websites, and that's £140 (UGX 686,000) landing in your pocket every month! 💰</p>
          </div>
        </div>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🎨 Building Websites: It's Like Playing TETRIS!</h4>
            <p class="mb-4">Remember how fun it is to build blocks with the TETRIS Game? Well, creating websites with Zylosite is even more exciting! You get to play with cool building blocks called templates, and the best part? No complicated coding needed! 🎮</p>
            
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Here's What Makes Website Building Super Fun:</h5>
              <ul class="list-disc pl-6 space-y-2">
                <li>Just drag and drop - it's as easy as moving apps on your phone! 📱</li>
                <li>Mix and match beautiful colors - be a digital artist! 🎨</li>
                <li>Add cool pictures and videos - make your site pop! 🎥</li>
                <li>Create something that's totally YOURS! 🌟</li>
              </ul>
            </div>
          </div>
    
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🏗️ The Building Blocks of Your Website</h4>
            <p class="mb-4">Every awesome website has four super important parts (think of them as rooms in your digital house):</p>
            
            <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
              <ul class="list-disc pl-6 space-y-3">
                <li>
                  <strong>Navigation Bar</strong> 🧭
                  <p>This is like your website's menu - it helps visitors find their way around. Just like how a restaurant menu shows you all the delicious food options, your navigation bar shows visitors all the cool pages they can visit!</p>
                </li>
                <li>
                  <strong>Header</strong> 👑
                  <p>This is your website's crown! It's the first thing people see, so make it amazing! Add eye-catching headlines, cool pictures, or even videos that make visitors go "WOW!" 😮</p>
                </li>
                <li>
                  <strong>Body</strong> ⭐
                  <p>This is where all your awesome content lives! Think of it as your website's living room - make it comfortable and interesting for your visitors!</p>
                </li>
                <li>
                  <strong>Footer</strong> 📍
                  <p>Like the foundation of a house, the footer holds important stuff like contact info, social media links, and other useful details at the bottom of the website.</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
          <h4 class="font-semibold text-xl mb-4">🎮 Zylosite: Your Website Building Superpower</h4>
          <p class="mb-4">Forget everything you've heard about website building being hard! If you can use a smartphone, you can build a website!</p>
            
          <div class="bg-purple-50 p-4 rounded-lg mb-4">
            <div class="space-y-4">
              <div class="p-3 bg-white/70 dark:bg-gray-800 rounded">
                <p class="font-semibold">Your Magical Tools: 🧰</p>
                <ul class="list-disc pl-6">
                  <li>Drag-and-drop builder (no coding needed!)</li>
                  <li>Pre-made professional templates</li>
                  <li>Beautiful color schemes</li>
                  <li>Free image library</li>
                </ul>
              </div>
    
              <div class="p-3 bg-white/70 dark:bg-gray-800 rounded">
                <p class="font-semibold">What You Can Create: 🎨</p>
                <ul class="list-disc pl-6">
                  <li>Business websites that wow clients</li>
                  <li>Online stores that sell 24/7</li>
                  <li>Beautiful portfolios</li>
                  <li>Professional landing pages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
    
        <div class="bg-white/50 p-6 rounded-lg">
            <h4 class="font-semibold text-xl mb-4">🎯 Your Path to Success</h4>
            <p class="mb-4">Ready to start your awesome journey? Here's your roadmap to earning £140 (UGX 686,000) monthly:</p>
    
            <div class="space-y-4">
              <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg">
                <h5 class="font-semibold">Month 1-2: Your First Steps 🐣</h5>
                <ul class="list-disc pl-6">
                  <li>Learn the basics - it's easier than you think!</li>
                  <li>Build your first 5 websites (that's £35 (UGX 171,500) monthly already!)</li>
                  <li>Start showing off your cool new skills!</li>
                </ul>
              </div>
    
              <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg">
                <h5 class="font-semibold">Month 3-4: Getting Better and Better 🚀</h5>
                <ul class="list-disc pl-6">
                  <li>Create 5 more amazing websites</li>
                  <li>Now you're earning £70 (UGX 343,000) every month!</li>
                  <li>Learn cool design tricks and tips</li>
                </ul>
              </div>
    
              <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
                <h5 class="font-semibold">Month 5-6: Almost There! 🎯</h5>
                <ul class="list-disc pl-6">
                  <li>Add another 5 websites to your collection</li>
                  <li>Your monthly earnings jump to £105 (UGX 514,500)!</li>
                  <li>Become a real website pro</li>
                </ul>
              </div>
    
              <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg">
                <h5 class="font-semibold">Month 7-8: Victory! 🏆</h5>
                <ul class="list-disc pl-6">
                  <li>Complete your final 5 websites</li>
                  <li>Reach your goal of £140 (UGX 686,000) monthly income!</li>
                  <li>Celebrate your amazing achievement! 🎉</li>
                </ul>
              </div>
            </div>
          </div>
    
          <div class="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-800 dark:to-orange-800 p-6 rounded-lg mt-6">
            <h4 class="font-semibold text-xl mb-4">✨ Cool Tips for Amazing Websites</h4>
            <div class="space-y-4">
              <div class="bg-white/50 p-4 rounded-lg">
                <h5 class="font-semibold">Make Your Websites Stand Out:</h5>
                <ul class="list-disc pl-6">
                  <li>Keep it neat and clean - less is more!</li>
                  <li>Make sure it looks great on phones</li>
                  <li>Use colors that work well together</li>
                  <li>Make buttons and links easy to find</li>
                </ul>
              </div>
              
              <div class="bg-white/50 p-4 rounded-lg">
                <h5 class="font-semibold">Growing Your Skills:</h5>
                <ul class="list-disc pl-6">
                  <li>Practice makes perfect</li>
                  <li>Try new things with each website</li>
                  <li>Look at other cool websites for ideas</li>
                  <li>Have fun while learning!</li>
                </ul>
              </div>
            </div>
          </div>
    
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Begin Your Amazing Journey? 🚀</p>
            <p class="text-lg mt-2">Your future as a website creator starts right here, right now! Let's make something awesome together! ✨</p>
          </div>
        </div>
      </div>`,
        quiz: [
          {
            question: "Can two websites have the same domain name?",
            options: [
              "Yes, if they pay extra",
              "Yes, if they're in different countries",
              "No, domain names must be unique",
              "Yes, if they're small websites"
            ],
            correct: 2
          },
          {
            question: "What is the relationship between websites and hosting?",
            options: [
              "Websites don't need hosting",
              "Websites need space on the internet called hosting",
              "Hosting is only for large websites",
              "Hosting is only for storing domain names"
            ],
            correct: 1
          },
          {
            question: "What does hosting store?",
            options: [
              "Only text files",
              "Only images",
              "Media files like photos, videos, audio and documents",
              "Only website addresses"
            ],
            correct: 2
          },
          {
            question: "How much can you earn monthly from hosting one website?",
            options: [
              "5 pounds",
              "7 pounds",
              "10 pounds",
              "20 pounds"
            ],
            correct: 1
          },
          {
            question: "What is your target number of websites to build?",
            options: [
              "10 websites",
              "15 websites",
              "20 websites",
              "25 websites"
            ],
            correct: 2
          },
          {
            question: "What makes Zylosite easy to use for creating websites?",
            options: [
              "It has pre-made templates to customize",
              "It's completely free",
              "It works offline",
              "It automatically builds websites"
            ],
            correct: 0
          },
          {
            question: "What method does Zylosite use for building websites?",
            options: [
              "Coding only",
              "Drag and drop blocks",
              "Voice commands",
              "Automatic generation"
            ],
            correct: 1
          },
          {
            question: "How do website owners contribute to your earnings?",
            options: [
              "They pay domain fees",
              "They pay hosting fees",
              "They pay template fees",
              "They pay design fees"
            ],
            correct: 1
          },
          {
            question: "What's the main benefit of using Zylosite's block system?",
            options: [
              "It's free",
              "It makes website creation easier",
              "It provides hosting",
              "It manages domain names"
            ],
            correct: 1
          },
          {
            question: "What is the official website of AWB?",
            options: ["www.africanwebsitebuilders.com", "www.awbplatform.com", "www.zylosite.com", "www.websitebuildersafrica.com"],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "Blocks",
    "units": [
      {
        "id": 1,
        "title": "Dashboard",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Building Awesome Websites with Blocks! 🧱 Let's Get Started! ✨</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Dashboard(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Create Something Amazing? 🎯</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Think of blocks as your website's building pieces - just like a puzzle, each piece has its perfect spot to create something awesome! 🧩"
            <footer class="text-sm mt-2">- AWB Training Team</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🎯 Getting Started with Zylosite</h4>
            <p class="mb-4">When you open Zylosite, you'll find your website building tools neatly organized on the left side of your screen. It's like having a well-organized toolbox where everything's easy to find!</p>
            <!-- Added screenshot image -->
            <div class="w-full flex justify-center mb-6">
              <img 
                src="https://awb-silk.vercel.app/Screenshot%20(861).png" 
                alt="Zylosite Website Builder Interface" 
                class="rounded-lg shadow-lg border border-gray-200"
              />
            </div>
            <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Your Building Tools: 🧰</h5>
              <ul class="list-disc pl-6 space-y-2">
                <li>🧱 Blocks - Pre-built sections ready to use (That's what we're learning today!)</li>
                <li>🔧 Components - Smaller elements to customize your blocks</li>
                <li>📄 Pages - Different sections of your website</li>
                <li>💫 Popups - Interactive elements that appear when needed</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🎨 Let's Build Something Together!</h4>
            <p class="mb-4">Want to see how easy it is? Let's create a business website step by step - no complicated stuff, just simple drag and drop! 🎯</p>
            
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Step 1: Understanding Your Blocks 📚</h5>
              <p class="mt-2">Click on 'Blocks' and you'll find everything you need to build a great website:</p>
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div class="bg-white/70 p-3 rounded">
                  <ul class="list-disc pl-4 space-y-1">
                    <li>🎯 Call to Action</li>
                    <li>📞 Contact Forms</li>
                    <li>📝 Content Sections</li>
                    <li>⏰ Countdown Timers</li>
                    <li>➗ Dividers</li>
                    <li>🔌 Embed Features</li>
                    <li>👣 Footers</li>
                    <li>🖼️ Gallery Displays</li>
                    <li>👑 Headers</li>
                  </ul>
                </div>
                <div class="bg-white/70 p-3 rounded">
                  <ul class="list-disc pl-4 space-y-1">
                    <li>🧭 Navigation Bars</li>
                    <li>💰 Pricing Tables</li>
                    <li>📈 Processes</li>
                    <li>✍️ Signup Forms</li>
                    <li>🎠 Slideshows</li>
                    <li>📫 Subscribe Forms</li>
                    <li>👥 Team Sections</li>
                    <li>⭐ Testimonials</li>
                    <li>📑 Titles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <h4 class="font-semibold text-xl mb-4">🎯 Building Your First Website</h4>
            
            <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Example: Creating a Professional Website 🏢</h5>
              <div class="space-y-4 mt-4">
                <div class="bg-white/70 p-4 rounded-lg">
                  <p class="font-semibold">Step 1: Adding Your Header 👑</p>
                  <ul class="list-disc pl-6">
                    <li>Find "Headers" in your blocks menu</li>
                    <li>Browse through the pre-designed options</li>
                    <li>Pick one that matches your style</li>
                    <li>Drag it to the top of your page - done!</li>
                  </ul>
                </div>
      
                <div class="bg-white/70 p-4 rounded-lg">
                  <p class="font-semibold">Step 2: Features Section 🌟</p>
                  <ul class="list-disc pl-6">
                    <li>Look for "Features" in your blocks</li>
                    <li>Choose a layout that shows your services best</li>
                    <li>Drag it below your header</li>
                    <li>Your website is taking shape!</li>
                  </ul>
                </div>
      
                <div class="bg-white/70 p-4 rounded-lg">
                  <p class="font-semibold">Step 3: Contact Information 📞</p>
                  <ul class="list-disc pl-6">
                    <li>Select "Contact" from your blocks</li>
                    <li>Find a style that fits your needs</li>
                    <li>Drag it where you want it</li>
                    <li>Perfect - visitors can now reach you!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-800 dark:to-teal-800 p-6 rounded-lg">
          <h4 class="font-semibold text-xl mb-4">📝 Pro Tips for Better Websites</h4>
          <div class="bg-white/50 p-4 rounded-lg space-y-4">
            <div class="space-y-2">
              <p class="font-semibold">10 Tricks & Hacks: 🎯</p>
              <ol class="list-decimal pl-6">
                <li>Start with a plan - know what sections you need</li>
                <li>Choose blocks that work well together</li>
                <li>Keep your layout clean and organized</li>
                <li>Make sure everything looks good on mobile phones</li>
                <li>Use consistent spacing between blocks for a professional look</li>
                <li>Stick to 2-3 main colors throughout your website</li>
                <li>Keep your most important content "above the fold" (visible without scrolling)</li>
                <li>Use white space effectively - don't crowd your content!</li>
                <li>Optimize your images before uploading them</li>
                <li>Don't use too many heavy elements like videos in one section</li>
              </ol>
            </div>
          </div>
        </div>
        
      
              <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mt-4">
                <p class="font-semibold">Remember: 💡</p>
                <ul class="list-disc pl-6">
                  <li>You can always preview how your site looks on mobile, tablet and desktop</li>
                  <li>Blocks are easy to rearrange - just drag them!</li>
                  <li>Keep your content clear and readable</li>
                  <li>You can use the Zylosite tool on both mobile and desktop but it looks different on each device. If you're using a mobile phone, go to your browser tools settings and change to Desktop.</li>
                </ul>
              </div>
            </div>
          </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Start Building? 🎯</p>
            <p class="text-lg mt-2">Let's create something awesome together! Your perfect website is just a few blocks away! 💪</p>
            <p class="text-lg mt-2">Remember: Every great website starts with a single block. Let's start building! 👷‍♂️</p>
            </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Which of these block types would you use to showcase client feedback?",
            "options": [
              "Process Blocks",
              "Testimonials",
              "Gallery Displays",
              "Subscribe Forms"
            ],
            "correct": 1
          },
          {
            "question": "Which feature allows you to see how your website will look before publishing?",
            "options": [
              "Preview",
              "Components",
              "Blocks menu",
              "Pages section"
            ],
            "correct": 0
          },
          {
            "question": "What type of block would you use to show the steps in a business process?",
            "options": [
              "Gallery Displays",
              "Testimonials",
              "Processes",
              "Dividers"
            ],
            "correct": 2
          },
          {
            "question": "Which block type would you use to create a newsletter signup?",
            "options": [
              "Gallery Displays",
              "Subscribe Forms",
              "Dividers",
              "Processes"
            ],
            "correct": 1
          },
          {
            "question": "What's the recommended way to access Zylosite on a mobile phone?",
            "options": [
              "Download a special app",
              "Use browser tools to change to Desktop mode",
              "Create a mobile-only account",
              "Use a different platform"
            ],
            "correct": 1
          },
          {
            "question": "Which block type would you use to showcase your team members?",
            "options": [
              "Process Blocks",
              "Pricing Tables",
              "Team Sections",
              "Subscribe Forms"
            ],
            "correct": 2
          },
          {
            "question": "When would you use a Call to Action block?",
            "options": [
              "Only in the footer",
              "For displaying team members",
              "To encourage user engagement or response",
              "To show pricing information"
            ],
            "correct": 2
          },
          {
            "question": "What is the primary purpose of Divider blocks?",
            "options": [
              "To create visual separation between sections",
              "To display pricing information",
              "To showcase team members",
              "To collect email addresses"
            ],
            "correct": 0
          },
          {
            "question": "Which block would you use to display a collection of images in an organized way?",
            "options": [
              "Subscribe Forms",
              "Gallery Displays",
              "Dividers",
              "Process Blocks"
            ],
            "correct": 1
          },
          {
            "question": "Which block type would you use for a limited-time offer?",
            "options": [
              "Countdown Timers",
              "Process Blocks",
              "Gallery Displays",
              "Dividers"
            ],
            "correct": 0
          }
        ]
      },
      {
        "id": 2,
        "title": "Buttons",
        "content": ` <div class="space-y-6">
      <h2 class="text-2xl font-bold">Mastering Buttons in Zylosite! 🔲 Time to Click Away! 🖱️      </h2> <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
      <video className="w-full rounded-lg" controls>
      <source src="https://awb-silk.vercel.app/Buttons(0).mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video><br>
      <h3 class="text-2xl font-semibold mb-4 text-center">Your Component Toolbox is Ready! 🎯</h3>
      
      <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
        "Buttons are like tiny doorways to action - they need to be inviting, clear, and impossible to miss! 🚪"
        <footer class="text-sm mt-2">- AWB Training Team</footer>
      </blockquote>
  
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <h4 class="font-semibold text-xl mb-4">🧰 Understanding Components</h4>
        <p class="mb-4">Components are the building blocks that add functionality to your website. Let's explore what each one does!</p>
        
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Component Types: 🎯</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Grids:</span> Create organized layouts for your content</li>
                <li><span class="font-semibold">Headings:</span> Add eye-catching titles and subtitles</li>
                <li><span class="font-semibold">Buttons:</span> Add clickable actions to your pages</li>
                <li><span class="font-semibold">Media:</span> Insert images and videos</li>
                <li><span class="font-semibold">Lists:</span> Organize information in bullet points or numbers</li>
              </ul>
            </div>
            <div class="bg-white/70 p-4 rounded">
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Text:</span> Add paragraphs and formatted text</li>
                <li><span class="font-semibold">Icons:</span> Include visual symbols and indicators</li>
                <li><span class="font-semibold">Embeds:</span> Add external content to your site</li>
                <li><span class="font-semibold">Map:</span> Show locations with interactive maps</li>
                <li><span class="font-semibold">Navigation:</span> Create menus and site navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <h4 class="font-semibold text-xl mb-4">🎯 Mastering Buttons<p></h4>
        <p class="mb-4">Buttons are your website's call-to-action heroes! They guide visitors, encourage clicks, and make your site interactive.</p>

        <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Available Button Types:</h5>
          <ul class="list-disc pl-6 space-y-2">
            <li>MEDIUM BUTTON - Perfect for main actions</li>
            <li>SMALL BUTTON - Great for secondary options</li>
            <li>EXTRA SMALL BUTTON - Ideal for compact spaces</li>
            <li>BLOCK BUTTON - Spans the full width of its container</li>
          </ul>
        </div>
  
        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Customizing Your Button ⚙️</h5>
          <div class="space-y-4 mt-4">
            <div class="bg-white/70 p-4 rounded-lg">
              <p class="font-semibold">Button Controls:</p>
              <div class="flex items-center space-x-4 mt-2">
                <div class="flex items-center">
                  <span>Settings (Cog Icon)</span>
                </div>
                <div class="flex items-center">
                  <span>Duplicate</span>
                </div>
                <div class="flex items-center">
                  <span>Delete</span>
                </div>
              </div>
            </div>
  
            <div class="bg-white/70 p-4 rounded-lg">
              <p class="font-semibold">Style Settings:</p>
              <ul class="list-disc pl-6">
                <li>Margin - Adjust spacing around the button</li>
                <li>Background color - Choose your perfect shade</li>
                <li>Text color - Make sure it's readable</li>
                <li>Button size - Pick the right dimensions</li>
                <li>Button block - Make it full-width</li>
              </ul>
            </div>
  
            <div class="bg-white/70 p-4 rounded-lg">
              <p class="font-semibold">Link Settings:</p>
              <ul class="list-disc pl-6">
                <li>Change button text</li>
                <li>Set link destination</li>
                <li>Choose to open in new tab</li>
                <li>Link to specific blocks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-800 dark:to-teal-800 p-6 rounded-lg">
        <h4 class="font-semibold text-xl mb-4">Quick Actions Guide 🚀</h4>
        <div class="space-y-4">
          <div class="bg-white/50 p-4 rounded-lg">
            <p class="font-semibold">How to Duplicate:</p>
            <p>Click the button → Select copy icon → BOOM! A perfect copy appears! 🎯</p>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <p class="font-semibold">How to Delete:</p>
            <p>Click the button → Select trash icon → Confirm deletion when prompted 🗑️</p>
          </div>
        </div>
      </div>
  
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mt-4">
  <p class="font-semibold">Top 10 Reminders: 💡</p>
  <ol class="list-decimal pl-6">
    <li>Use clear, action-oriented text (e.g., "Start Now" instead of "Click Here")</li>
    <li>Keep consistent styling across your site</li>
    <li>Make buttons big enough to tap on mobile</li>
    <li>Use contrasting colors that stand out</li>
    <li>Add hover effects for better interactivity</li>
    <li>Ensure text is readable against button color</li>
    <li>Keep adequate spacing between multiple buttons</li>
    <li>Test all buttons on different devices</li>
    <li>Use appropriate sizing for button importance</li>
    <li>Include loading states for form submissions</li>
  </ol>
</div>
    </div>
  
    <div class="mt-6 text-center">
      <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create? 🎯</p>
      <p class="text-lg mt-2">Start adding components to make your website come alive! Remember to save your changes! 💪</p>
    </div>
  </div>`,
        "quiz": [
          {
            "question": "How many component types are listed in Zylosite?",
            "options": [
              "5 components",
              "8 components",
              "10 components",
              "12 components"
            ],
            "correct": 2
          },
          {
            "question": "Which component would you use to integrate third-party widgets?",
            "options": [
              "Media",
              "Embeds",
              "Icons",
              "Navigation"
            ],
            "correct": 1
          },
          {
            "question": "What icon represents the settings in button options?",
            "options": [
              "Wheel icon",
              "COG icon",
              "Settings icon",
              "Wrench icon"
            ],
            "correct": 1
          },
          {
            "question": "After clicking on a button, which option allows you to duplicate it?",
            "options": [
              "COG icon",
              "Clone option",
              "Trash icon",
              "Link option"
            ],
            "correct": 1
          },
          {
            "question": "What is the Map component used for?",
            "options": [
              "Creating sitemaps",
              "Showing locations",
              "Drawing diagrams",
              "Making flowcharts"
            ],
            "correct": 1
          },
          {
            "question": "Which component is used for creating organized layouts?",
            "options": [
              "Lists",
              "Media",
              "Grids",
              "Icons"
            ],
            "correct": 2
          },
          {
            "question": "What MUST you do before leaving the Zylosite editor?",
            "options": [
              "Log out",
              "Save changes",
              "Clear cache",
              "Close browser"
            ],
            "correct": 1
          },
          {
            "question": "What option in Link settings allows content to open in a different window?",
            "options": [
              "New window",
              "Open link in new tab",
              "Different window",
              "External link"
            ],
            "correct": 1
          },
          {
            "question": "Which component type is used for adding images and videos?",
            "options": [
              "Icons",
              "Embeds",
              "Media",
              "Lists"
            ],
            "correct": 2
          },
          {
            "question": "What should you do after making any modifications to buttons?",
            "options": [
              "Refresh the page",
              "Log out",
              "Apply changes",
              "Clear cache"
            ],
            "correct": 2
          }
        ]
      },
      {
        "id": 3,
        "title": "Text",
        "content": `<div class="space-y-6">
      <h2 class="text-2xl font-bold">Let's Talk Text in Zylosite! ✨  Express Yourself!</h2><div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
      <video className="w-full rounded-lg" controls>
      <source src="https://awb-silk.vercel.app/Text(0).mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video><br>
      <h3 class="text-2xl font-semibold mb-4 text-center">Your Words, Yourself! 📝</h3>
      
      <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
      "Plain text is so 2010! Let's jazz up your content and make it impossible to ignore!"
      <footer class="text-sm mt-2">- AWB Training Team (The Word Police 👮‍♂️)</footer>
    </blockquote>
    
      <div class="bg-white/50 p-6 rounded-lg mb-6">
      <p class="mb-4">      <p class="mb-4">Hey there, text adventurer! 👋 Ready to transform your boring old text into something that'll make your readers go "Wow!"? 😮 
      We've got three super cool paragraph styles waiting for you:</p>    
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Text Types Available: 📝</h5>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Regular Paragraph:</span> Perfect for main body content, article text, and general information</li>
                <li><span class="font-semibold">Lead Paragraph:</span> Want to make a statement? This larger, eye-catching style is perfect for those "hey, look at this!" moments and important announcements</li>
                <li><span class="font-semibold"></span> <strong>Small Paragraph:</strong></span> Sometimes less is more! Great for those little details, image captions, or when you need to add a quick note</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Quick Start Guide 🚀</h5>
      <p class="mt-2">Just grab your favorite paragraph style and drop it right onto your canvas! You'll see some "Lorem Ipsum" placeholder text (you know, that fancy-looking Latin stuff that doesn't actually mean anything 😉). Here's how to make it your own:</p>

      <div class="bg-white/70 p-4 rounded mt-4">
        <p class="font-semibold mb-2">Your Text Controls ⚙️</p>
        <ul class="list-disc pl-4 space-y-2">
          <li>Hit that "T" icon to start typing your actual content</li>
          <li>Use the cog for any extra tweaks</li>
          <li>Need the same style again? Clone it!</li>
          <li>Made a mistake? The delete button's got your back</li>
        </ul>
      </div>
    </div>

      <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Your Magical Formatting Toolbox: 🎨</h5>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
          <div class="bg-white/70 p-4 rounded">
            <ul class="list-disc pl-4 space-y-2">
              <li><span class="font-semibold">Bold:</span> When you need to shout without actually shouting! Perfect for those "Hey, look at this!" moments 💪</li>
              <li><span class="font-semibold">Italics:</span> Add some fancy-pants sophistication or *emphasis* to your words. It's like giving your text a posh accent! 🎭</li>
              <li><span class="font-semibold">Underline:</span> Because sometimes you need to underline things... you know, for extra "Hey, this is important!" vibes 📏</li>
              <li><span class="font-semibold">Text Alignment:</span> Left, center, or right - it's like training a dance for your words! Make them march left, centerstage, or right off the page 💃</li>
              <li><span class="font-semibold">Font Family:</span> Give your text a whole new personality! From serious business to party mode - we've got fonts for every mood 👔</li>
              <li><span class="font-semibold">Font Color:</span> Paint your words in rainbow! No racism, black is great, but sometimes you need to go full unicorn 🌈</li>
              <li><span class="font-semibold">Links:</span> Turn your text into magical portals to other content! It's like creating secret passages 🚪</li>
              <li><span class="font-semibold">Clear Formatting:</span> The magic eraser when you've gone a bit too crazy with the formatting (we've all been there!) 🧹</li>
              <li><span class="font-semibold">Undo/Redo:</span> Time travel for your text! Made a mistake? No worries, just hit that undo button! ⏰</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Fun Ways to Mix & Match! 🎨</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <p class="font-semibold mb-2">Try These Cool Combos:</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><span class="font-bold text-blue-600">Bold + Color</span> - For when you really, REALLY need attention!</li>
          <li><span class="italic underline">Italics + Underline</span> - Double the emphasis, double the fun!</li>
          <li><span class="font-serif text-purple-600">Fancy Font + Color</span> - Get that royal vibe going!</li>
          <li>Center align + Bold - Perfect for those "Ta-da! 🎉" moments</li>
        </ul>
      </div>
    </div>

      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Did You Know? ⌨️</h5>
      <p class="mt-2">Hold onto your keyboard, because these shortcuts are about to make you feel like a text-formatting ninja! 🐱‍👤</p>

      <div class="bg-white/70 p-4 rounded mt-4">
        <p class="font-semibold mb-2">Keyboard Shortcuts That'll Make You Look Like a Computer Wizard! 👨‍💻 </p>
        <ul class="list-disc pl-4 space-y-2">
          <li><span class="font-mono">Ctrl/Cmd + B</span> - Bold text</li>
          <li><span class="font-mono">Ctrl/Cmd + I</span> -Italics</li>
          <li><span class="font-mono">Ctrl/Cmd + U</span> - Underline</li>
          <li><span class="font-mono">Ctrl/Cmd + A</span> - Select All</li>
          <li><span class="font-mono">Ctrl/Cmd + Z</span> - Undo  (Oopsie eraser)</li>
          <li><span class="font-mono">Ctrl/Cmd + Y</span> - Redo (For when you realize that mistake wasn't actually a mistake 🤓)</li>
          <li><span class="font-mono">Ctrl/Cmd + Shift + Z</span> - Alternative Redo (For Mac folks who like to be different 😎)</li>
        </ul>
      </div>
    </div>


      <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Text Formatting Horror Stories 😱</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <p class="mb-2">Things We've All Done (But Shouldn't have! 🤦🤦‍♂️):</p>
        <ul class="list-disc pl-4 space-y-2">
          <li>Using ALL CAPS everywhere (Unless you're trying to scare someone! 👻)</li>
          <li>Mixing five different fonts in one paragraph (That's not art, that's chaos! 🎨)</li>
          <li>Forgetting to save and losing all your perfect formatting (The pain! 😭)</li>
        </ul>
      </div>
    </div>
    
      <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
      <h5 class="font-semibold">Pro Tips from the Text Wizards 🧙‍♂️</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <ul class="list-disc pl-4 space-y-2">
          <li>Less is more! (Unless it's pizza 🍕, then more is more 😋)</li>
          <li>Save your work every 5 minutes (Or after every perfect formatting combination you feel proud of! 😌)</li>
          <li>When in doubt, preview your work (What looks good in the editor might look weird on the actual page! 🥴)</li>
          <li>Always use the clone option to duplicate text styles (Work smarter, not harder! 🧠)</li>
        </ul>
      </div>
    </div>

    <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mt-4">
    <h5 class="font-semibold">Emergency Formatting Kit! 🚨</h5>
    <p class="mt-2">Keep these handy when things go wrong (and they will, trust us!):</p>
    <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
        <li>The Clear Formatting button - Your "start over" bestie! 🤗</li>
        <li>Ctrl/Cmd + Z - Your time machine to better choices</li>
        <li>The preview button - Your reality check buddy</li>
        <li>The save button - Your guardian angel 👼</li>
      </ul>
    </div>
  </div>
</div>
<br>
    <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
    <h5 class="font-semibold">Quick Reminder</h5>
    <p class="mt-2">Don't forget to smash that save button after you've made your changes! Trust us, you don't want to lose your creative genius! 🧠</p>
  </div>
    
  <div class="mt-6 text-center">
  <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Rock Your Text World? 🎸</p>
  <p class="text-lg mt-2">Go forth and format your text! </p>
  <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">P.S. If anyone asks, tell them we taught you everything you know! 😉🙏</p>
</div>
</div>
    `,
        "quiz": [
          {
            "question": "What key combination makes your text bold?",
            "options": [
              "Ctrl/Cmd + P",
              "Ctrl/Cmd + B",
              "Ctrl/Cmd + V",
              "Ctrl/Cmd + X"
            ],
            "correct": 1
          },

          {
            "question": "Which feature turns plain words into clickable text?",
            "options": [
              "Bold text",
              "Hyperlinks",
              "Underlining",
              "Text color"
            ],
            "correct": 1
          },

          {
            "question": "Where can you find the text component options in Zylosite?",
            "options": [
              "In the Settings menu",
              "In the Components section",
              "In the Edit menu",
              "In the Format menu"
            ],
            "correct": 1
          },
          {
            "question": "When you want your text to lean, which shortcut will help you add italics?",
            "options": [
              "Ctrl/Cmd + I",
              "Ctrl/Cmd + L",
              "Ctrl/Cmd + K",
              "Ctrl/Cmd + T"
            ],
            "correct": 0
          },
          {
            "question": "Which option allows you to remove a text component?",
            "options": [
              "Delete option",
              "Remove button",
              "Clear text",
              "Hide component"
            ],
            "correct": 0
          },
          {
            "question": "What is the recommended way to modify text content?",
            "options": [
              "Right-click and edit",
              "Click the Capital T icon",
              "Double-click the text",
              "Use keyboard shortcuts"
            ],
            "correct": 1
          },

          {
            "question": "What happens if you don't save your text changes?",
            "options": [
              "Changes are auto-saved",
              "Changes are lost",
              "A warning appears",
              "Text reverts to Lorem Ipsum"
            ],
            "correct": 1
          },
          {
            "question": "Which feature allows you to duplicate text without copying?",
            "options": [
              "Duplicate button",
              "Clone option",
              "Copy feature",
              "Text template"
            ],
            "correct": 1
          },
          {
            "question": "Which action is required before leaving the text editor?",
            "options": [
              "Preview changes",
              "Save changes",
              "Clear cache",
              "Update settings"
            ],
            "correct": 1
          },
          {
            "question": "Which keyboard shortcut underlines your text?",
            "options": [
              "Ctrl/Cmd + Y",
              "Ctrl/Cmd + Z",
              "Ctrl/Cmd + U",
              "Ctrl/Cmd + W"
            ],
            "correct": 2
          },
        ]
      },
      {
        "id": 4,
        "title": "Media",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Let's Add Some Media Magic! ✨ Make Your Site Pop!</h2>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
        <video className="w-full rounded-lg" controls>
          <source src="https://awb-silk.vercel.app/Media(0).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video><br />
        
        <h3 class="text-2xl font-semibold mb-4 text-center">Your Media, Your Story! 🎬</h3>
        
        <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "A picture is worth a thousand words, but a video? That's worth a million! Let's make your content unforgettable!"
          <footer class="text-sm mt-2"></footer>
        </blockquote>
        <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Getting Started with Media 🎬</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <p class="mb-4">Super easy steps to add media to your site:</p>
            <ol class="list-decimal pl-4 space-y-2">
              <li>Head over to the components menu</li>
              <li>Look for the media section</li>
              <li>Choose from three awesome options:
                <ul class="list-disc pl-6 mt-2">
                  <li>YouTube Video 📺</li>
                  <li>Vimeo Player 🎥</li>
                  <li>Image Upload 🖼️</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Media Types You Can Add: 📸</h5>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Images:</span> JPG, PNG, GIF - make your content pop with eye-catching visuals!</li>
                <li><span class="font-semibold">Videos:</span>YouTube & Vimeo - bring your story to life! 🎥</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Adding YouTube & Vimeo Videos 🎥</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <p class="mb-4">Let's get those videos rolling! Here's how:</p>
          <ol class="list-decimal pl-4 space-y-2">
            <li>Drag that YouTube/Vimeo component right onto your canvas</li>
            <li>Click on it and find the mechanical cog icon ⚙️</li>
            <li>In the detail editor, you'll spot a box for the video ID</li>
          </ol>
        </div>
      </div>

      <div class="bg-purple-900 dark:bg-purple-700 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Video ID Hunting Guide! 🕵️‍♂️</h5>
      <div class="bg-blue-800 p-4 rounded mt-4">
        <div class="mb-4">
          <p class="font-semibold">Example For YouTube:</p>
          <p class="mb-2">From: <code class="bg-blue-700 text-blue-100 px-2 py-1 rounded">https://www.youtube.com/watch?v=JYvPnkp8500</code></p>
          <p>Grab: <code class="bg-green-700 text-green-100 px-2 py-1 rounded">JYvPnkp8500</code> (It's after the v=)</p>
        </div>
        
        <div class="mb-4">
          <p class="font-semibold">Example For Vimeo:</p>
          <p class="mb-2">From: <code class="bg-blue-700 text-blue-100 px-2 py-1 rounded">https://vimeo.com/922834495</code></p>
          <p>Grab: <code class="bg-green-700 text-green-100 px-2 py-1 rounded">922834495</code> (It's after the /)</p>
        </div>
      </div>
    </div>


    <div class="bg-green-900 dark:bg-green-700 p-4 rounded-lg mb-4">
    <h5 class="font-semibold">🧙‍♂️ WIZARD TIPS & TRICKS 🧙‍♂️</h5>
    <div class="bg-blue-800 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
        <li>YouTube ID always comes after <code class="bg-yellow-700 text-yellow-100 px-1 rounded">v=</code> 🎯</li>
        <li>Vimeo ID is the numbers after the backslash 🔍</li>
        <li>Got a super long YouTube URL? Don't panic! 😨 Look for <code class="bg-yellow-700 text-yellow-100 px-1 rounded">v=</code> and grab what's after it (before any & signs)</li>
        <li>Example of a tricky URL: <code class="bg-blue-700 text-sm text-blue-100 px-2 py-1 rounded">https://www.youtube.com/watch?app=desktop&v=JOfK95bzwCA&list=PLWPirh4EWFpEK1RbpruFXrwgzcGUjZ4nV</code></li>
        <li>The ID here is: <code class="bg-green-700 text-green-100 px-2 py-1 rounded">JOfK95bzwCA</code>  😜</li>
      </ul>
    </div>
  </div>


  
        <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Media Mistakes to Avoid! 🙅🏿</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li>Super huge photo file sizes. First compress them before uploading (Nobody likes waiting forever! ⏳)</li>
              <li>Forgetting alt text (Keep it accessible! 🎯)</li>
              <li>Unoptimized images (Speed is key! 🏃‍♂️)</li>
            </ul>
          </div>
        </div>
  
        <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">Pro Tips from Media Masters 🧙‍♂️</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li>Compress before upload (Your users' data plans will thank you! 📱)</li>
              <li>Use responsive sizes (Look good on all screens! 💻)</li>
              <li>Test your media (What works on your computer might not work everywhere! 🌍)</li>
            </ul>
          </div>
        </div>
  
  <br>
        <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">Quick Reminder</h5>
          <p class="mt-2">Always backup your media files before editing! You never know when you'll need the original! 💾</p>
        </div>
  
        <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Make Your Site Shine? ✨</p>
          <p class="text-lg mt-2">Go forth and create something amazing!</p>
          <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">P.S. Tag us in your awesome creations! We love seeing what you make! 📸</p>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Where can you find the media components in Zylosite?",
            "options": [
              "In the page settings",
              "Under the components menu",
              "In the footer section",
              "In the header menu"
            ],
            "correct": 1
          },
          {
            "question": "How many media options are available when you select the media component?",
            "options": [
              "Two",
              "Three",
              "Four",
              "Five"
            ],
            "correct": 1
          },
          {
            "question": "For YouTube videos, where in the URL can you find the video ID?",
            "options": [
              "After the youtube.com",
              "After the v=",
              "Before the https://",
              "At the beginning of the URL"
            ],
            "correct": 1
          },
          {
            "question": "For Vimeo videos, where can you find the video ID?",
            "options": [
              "After the backslash /",
              "Before the domain name",
              "In the middle of the URL",
              "After www"
            ],
            "correct": 0
          },
          {
            "question": "Which icon do you need to click to access video settings?",
            "options": [
              "Cog icon",
              "Plus icon",
              "Star icon",
              "Play icon"
            ],
            "correct": 0
          },

          {
            "question": "What's the recommended action before editing media files?",
            "options": [
              "Delete the original",
              "Backup your media files",
              "Convert to PDF",
              "Print them out"
            ],
            "correct": 1
          },
          {
            "question": "In a long YouTube URL with multiple equal signs, how do you identify the correct video ID?",
            "options": [
              "Take the first set of characters",
              "Look for the characters after v=",
              "Use the last set of characters",
              "Use anything after the first ="
            ],
            "correct": 1
          },
          {
            "question": "What should you consider about file sizes when adding media?",
            "options": [
              "Bigger is always better",
              "Size doesn't matter",
              "Compress before upload",
              "Only use small files"
            ],
            "correct": 2
          },
          {
            "question": "What's important to add to images for accessibility?",
            "options": [
              "Watermarks",
              "Alt text",
              "Borders",
              "Shadows"
            ],
            "correct": 1
          },

          {
            "question": "What's the first step to add a YouTube video?",
            "options": [
              "Upload the video to YouTube",
              "Copy the video URL",
              "Drag and drop the YouTube component",
              "Create a new page"
            ],
            "correct": 2
          },
        ]
      },
      {
        "id": 5,
        "title": "Grids",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Let's Build Amazing Grid Layouts! ✨</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Grids(0).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Make Your Design Shine? 📐</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "Life is like a grid - sometimes you need that perfect balance of elements to make everything perfect! And unlike life, our grids actually come with an undo button! 😉"
            <footer class="text-sm mt-2">- Every Web Designer's Philosophy</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Let's Get Started with Grids! 📏</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Don't worry - creating beautiful layouts is easier than you think! Here's how:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Head over to the components menu on your left - you'll find everything you need there</li>
                  <li>Look for the 'Grids' section - it's packed with layout options for you</li>
                  <li>Found a layout you like? Just drag it onto your canvas - it's that simple!</li>
                  <li>Watch your design come together as you add your content</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Choose Your Perfect Layout! 🎨</h5>
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                <div class="bg-white/70 p-4 rounded">
                  <p class="mb-4">We've got some fantastic options for you:</p>
                  <ul class="list-disc pl-4 space-y-2">
                    <li><span class="font-semibold">Full Width (100%):</span> Need to make a big impact? This layout is perfect for your hero sections!</li>
                    
                    <li><span class="font-semibold">Two Column Split (50/50):</span> Great for comparing features or creating balanced layouts. Your content will look perfectly organized!</li>
                    
                    <li><span class="font-semibold">Asymmetric Layouts (33/66 or 66/33):</span> Want to highlight something special? These layouts help you create the perfect focus point.</li>
                    
                    <li><span class="font-semibold">Three Column (33/33/33):</span> Perfect for showing off your pricing plans or key features. Everything gets equal attention!</li>
                    
                    <li><span class="font-semibold">Four Column (25/25/25/25):</span> Showcase your team or products in a clean, organized way. It's like giving everyone their own spotlight!</li>
                    
                    <li><span class="font-semibold">Mixed Layouts (25/25/50 or 50/25/25):</span> Want something unique? These layouts give you the best of both worlds!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Populating Your Grid - Make It Come Alive! 🎯</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Here's how to make your grid come to life:</p>
              <ol class="list-decimal pl-4 space-y-2">
                <li>Pick a grid that matches your vision - trust your instincts!</li>
                <li>Add your favorite components:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Text that tells your story</li>
                    <li>Beautiful images that capture attention</li>
                    <li>Engaging videos that bring your message to life</li>
                    <li>Eye-catching buttons that guide your visitors</li>
                    <li>Special components that make your site unique</li>
                  </ul>
                </li>
                <li>Play around until everything feels just right</li>
              </ol>
            </div>
          </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Secret Grid Wizardry: Pro Tips from the Layout Legends! 🧙‍♂️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Start simple! Rome wasn't built in a day, and neither should your grid layout be! (Though our drag-and-drop is WAY faster than building Rome!) 🏛️</li>
            <li>Think mobile-first! Your grid should look stunning on everything from a smartphone to a smart fridge! 📱</li>
            <li>White space is your friend! Give your content room to shine - think of it as social distancing for design elements! 🌟</li>
            <li>Test, test, and test again! What looks perfect at 3 AM might look different at noon! ⏰</li>
            <li>Keep an eye on load times - your users shouldn't have time to go for a nap while waiting for content to load! 😴</li>
          </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">One Last Thing! ☝️</h5>
          <p class="mt-2">Remember to save your work! Because explaining to your client why you lost that perfect layout is no fun! Trust us on this one! 😞</p>
          <p class="mt-2">And if all else fails, remember: the undo button is your bestie (Ctrl+Z for the win!) 🔄</p>
        </div>
    
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Time to Create Something Amazing! ✨</p>
            <p class="text-lg mt-2">You've got all the tools you need - now let's see what you can build!</p>
            </div>
        </div>
      </div>`,
        "quiz": [

          {
            "question": "Why is testing across devices important?",
            "options": [
              "To increase loading speed",
              "To ensure consistent experience",
              "To add more features",
              "To change colors"
            ],
            "correct": 1
          },

          {
            "question": "What helps maintain content clarity in grids?",
            "options": [
              "Using many animations",
              "Proper spacing",
              "Multiple fonts",
              "Bright colors"
            ],
            "correct": 1
          },
          {
            "question": "Where can you find the Grids option in the interface?",
            "options": [
              "In the top menu bar",
              "In the Components menu on the left",
              "In the right sidebar",
              "In the bottom toolbar"
            ],
            "correct": 1
          },
          {
            "question": "How should you handle spacing in grids?",
            "options": [
              "Vary it randomly",
              "Keep it consistent",
              "Minimize it always",
              "Ignore it completely"
            ],
            "correct": 1
          },

          {
            "question": "How should you manage media in grids?",
            "options": [
              "Use original sizes",
              "Add more files",
              "Optimize for performance",
              "Ignore file sizes"
            ],
            "correct": 2
          },
          {
            "question": "How do you ensure grid consistency?",
            "options": [
              "Random layouts",
              "Regular spacing",
              "Maximum content",
              "Constant animation"
            ],
            "correct": 1
          },

          {
            "question": "When should you save grid changes?",
            "options": [
              "Only at the end",
              "Regularly",
              "Once daily",
              "When finished"
            ],
            "correct": 1
          },
          {
            "question": "What should you do after choosing a grid layout?",
            "options": [
              "Change the colors",
              "Add components",
              "Add animations",
              "Change the font"
            ],
            "correct": 1
          },
          {
            "question": "What's important to check when designing your grid?",
            "options": [
              "Number of images used",
              "Text color",
              "Animation speed",
              "Mobile responsiveness"
            ],
            "correct": 3
          },
          {
            "question": "Which layout option is best suited for a hero section?",
            "options": [
              "25/25/25/25",
              "33/33/33",
              "50/50",
              "100%"
            ],
            "correct": 3
          },
        ]
      },
      {
        "id": 6,
        "title": "Headings",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey There! Let's Rock Those Headings! 🚀</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Heading(0).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br />
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Make Your Content Super Easy to Read? 📖</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Think of headings like road signs on a highway - they tell your readers exactly where they're going! No more getting lost in a sea of text! 🗺️"
            <footer class="text-sm mt-2">- Every Content Creator Who Gets It!</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Why Should You Care About Headings? 🤔</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Let me tell you why headings are totally awesome:</p>
                <ul class="list-disc pl-4 space-y-2">
                  <li>They make your content super easy to read (no more walls of text!) ✨</li>
                  <li>Readers can find exactly what they want </li>
                  <li>Supports screen reader accessibility</li>
                  <li>Search engines go crazy for them (hello, better SEO! 📈)</li>
                  <li>They make everything look neat and organized</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
      <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Understanding Heading Levels</h5>
        <div class="bg-white/70 p-4 rounded">
          <p class="mb-4">Let's explore each heading level and its use cases:</p>
          
          <div class="space-y-6">
            <div class="border-l-4 border-blue-300 pl-4">
              <h6 class="font-semibold text-xl mb-2">Heading 1 (H1) - Primary Page Title</h6>
              <p class="mb-2">The main identifier for your page content, setting the primary topic or purpose.</p>
              <p class="mb-2">Appropriate uses:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Main website landing pages</li>
                <li>Article or blog post titles</li>
                <li>Product page main titles</li>
              </ul>
              <p class="text-sm italic">Note: Limit to one H1 per page to maintain clear content hierarchy.</p>
            </div>

            <div class="border-l-4 border-green-300 pl-4">
              <h6 class="font-semibold text-xl mb-2">Heading 2 (H2) - Major Section Headers</h6>
              <p class="mb-2">Define the main sections of your content, breaking down the primary topic into key areas.</p>
              <p class="mb-2">Ideal applications:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Primary feature descriptions</li>
                <li>Main content sections</li>
                <li>Service categories</li>
                <li>Key topic divisions</li>
              </ul>
              <p class="text-sm italic">Best Practice: H2s should provide a complete content overview when read in sequence.</p>
            </div>

            <div class="border-l-4 border-yellow-300 pl-4">
              <h6 class="font-semibold text-xl mb-2">Heading 3 (H3) - Subsection Headers</h6>
              <p class="mb-2">Further divide main sections into more specific topics.</p>
              <p class="mb-2">Effective uses:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Feature-specific details</li>
                <li>Process step descriptions</li>
                <li>Detailed service breakdowns</li>
                <li>Category subdivisions</li>
              </ul>
              <p class="text-sm italic">Purpose: Organize content into easily digestible segments.</p>
            </div>

            <div class="border-l-4 border-red-300 pl-4">
              <h6 class="font-semibold text-xl mb-2">Heading 4 (H4) - Detailed Points</h6>
              <p class="mb-2">Address specific aspects within subsections.</p>
              <p class="mb-2">Suitable for:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Technical specifications</li>
                <li>Detailed examples</li>
                <li>Step-by-step instructions</li>
                <li>Specific feature explanations</li>
              </ul>
              <p class="text-sm italic">Focus: Provide detailed information while maintaining clear structure.</p>
            </div>

            <div class="border-l-4 border-purple-300 pl-4">
              <h6 class="font-semibold text-xl mb-2">Heading 5 (H5) - Specific Details</h6>
              <p class="mb-2">Used for granular content organization.</p>
              <p class="mb-2">Appropriate for:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Product specifications</li>
                <li>Detailed subsections</li>
                <li>Specific component descriptions</li>
              </ul>
              <p class="text-sm italic">Application: Reserved for detailed breakdowns of complex topics.</p>
            </div>

            <div class="border-l-4 border-pink-300 pl-4">
              <h6 class="font-semibold text-xl mb-2">Heading 6 (H6) - Fine Details</h6>
              <p class="mb-2">The most specific level of content organization.</p>
              <p class="mb-2">Best used for:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Specific examples within detailed sections</li>
                <li>Individual component details</li>
                <li>Supplementary information</li>
              </ul>
              <p class="text-sm italic">Note: Use sparingly to maintain clear content hierarchy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Quick Tips to Nail Your Headings! 💡</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Keep them short and precise - no novels in your headings! 📚</li>
                <li>Make them fun but clear - we're not writing riddles here! 🎯</li>
                <li>Stay consistent - pick a style and stick to it! 🎨</li>
                <li>Check how they look on your phone - tiny screens matter too! 📱</li>
                <p>Not too long, not too short - make your headings juuust right! Aim for 4-10 words.</p>
              </ul>
            </div>
          </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Oops! Don't Do These Things! 🙈</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Using multiple H1s (that's like having too many cooks in the kitchen! And too many cooks...spoil the website! 👩‍🍳)</li>
                <li>Writing super long headings (save the storytelling for your content! 📖)</li>
                <li>Forgetting about phones (mobile-first is the way to go! 📱)</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
      <h5 class="font-semibold">SEO Optimization for Headings</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <ul class="list-disc pl-4 space-y-2">
          <li>Incorporate relevant keywords naturally</li>
          <li>Ensure heading content matches user intent</li>
          <li>Maintain clear topical focus</li>
          <li>Create descriptive, meaningful headers</li>
        </ul>
      </div>
    </div>
    <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
    <h5 class="font-semibold">Mind-Blowing Heading Facts! 🤯</h5>
    <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-3">
        <li>
          <span class="font-semibold">The Counter-Intuitive Numbering:</span> Many newcomers to HTML assume H6 is larger than H1 (I mean, 6 is bigger than 1, right?). But nope! H1 is actually the big boss! This convention comes from document outlining, where "1" represents the main title and subsequent numbers represent increasingly detailed subsections.
        </li>
        <li>
          <span class="font-semibold">Historical Origins:</span> HTML headings were inspired by traditional document processing systems from the 1960s, which used similar hierarchical numbering systems for document organization.
        </li>
        <li>
          <span class="font-semibold">Screen Reader Navigation:</span> Many screen reader users actually jump between headings using keyboard shortcuts to quickly scan content - making proper heading hierarchy even more crucial! How cool is that? 😎
          </li>
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
    <h5 class="font-semibold">Myth Busters: Heading Edition! 🔍</h5>
    <div class="bg-white/70 p-4 rounded mt-4">
      <div class="space-y-4">
        <div class="border-l-4 border-orange-300 pl-4">
          <p class="font-semibold">Myth: "More headings = better SEO"</p>
          <p>Reality: Nah fam! Google is way too smart for that now. Consider quality over quantity! Well-structured, relevant headings are more valuable than many unnecessary ones.</p>
        </div>
        
        <div class="border-l-4 border-orange-300 pl-4">
          <p class="font-semibold">Myth: "H1s don't matter anymore for SEO"</p>
          <p>Truth Bomb: As if! H1s remain crucial for both SEO and user experience, helping search engines and users understand your page's main topic.</p>
        </div>
        
        <div class="border-l-4 border-orange-300 pl-4">
          <p class="font-semibold">Myth: "Headings are just for styling"</p>
          <p>Truth Bomb: While headings can be styled, their primary purpose is structural organization and accessibility.</p>
        </div>
        
        <div class="border-l-4 border-orange-300 pl-4">
          <p class="font-semibold">Myth: "You can skip heading levels if they look wrong"</p>
          <p>Truth Bomb:             <p>Truth Bomb: Oh no no no! That's like skipping stairs on a staircase - someone's gonna trip! 😩 Skipping levels confuses screen readers and breaks the document outline.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
    <h5 class="font-semibold">Pro Tips & Tricks 🎯</h5>
    <div class="bg-white/70 p-4 rounded mt-4">
      <div class="space-y-4">
        <div class="border-l-4 border-indigo-300 pl-4">
          <p class="font-semibold">The 3-Second Rule</p>
          <p>A user should be able to understand what your page is about within 3 seconds of looking at your H1. If your bestie can't get what your page is about in 3 seconds, your H1 needs work!</p>
        </div>
        
        <div class="border-l-4 border-indigo-300 pl-4">
          <p class="font-semibold">The Question Technique</p>
          <p>Try writing your H2s as questions your users might ask - it often leads to more engaging and relevant section titles!</p>
        </div>
        
        <div class="border-l-4 border-indigo-300 pl-4">
          <p class="font-semibold">The Outline Test</p>
          <p>If someone only read your headings, would they get the gist? No? Time for a heading makeover!</p>
        </div>
        
        <div class="border-l-4 border-indigo-300 pl-4">
          <p class="font-semibold">The Mobile Check</p>
          <p>Preview your headings on mobile first - if they're too long, they'll wrap awkwardly on smaller screens.</p>
        </div>
        
        <div class="border-l-4 border-indigo-300 pl-4">
          <p class="font-semibold">The Clarity Challenge</p>
          <p>Ask someone to read just your headings and explain what they think the content is about. If they're confused, back to the drawing board!</p>
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Which sequence shows correct size progression?",
            "options": [
              "H6 > H5 > H4",
              "H4 > H5 > H6",
              "H4 = H5 = H6",
              "H6 > H4 > H5"
            ],
            "correct": 1
          },
          {
            "question": "What is the primary purpose of an H1 heading on a webpage?",
            "options": [
              "To make text look bigger",
              "To indicate the main title or topic of the page",
              "To improve website loading speed",
              "To add visual decoration"
            ],
            "correct": 1
          },
          {
            "question": "Which heading is the smallest by default?",
            "options": [
              "H6",
              "H5",
              "H4",
              "H3"
            ],
            "correct": 0
          },
          {
            "question": "Which heading level should be used for main sections of content?",
            "options": [
              "H1",
              "H2",
              "H5",
              "H6"
            ],
            "correct": 1
          },
          {
            "question": "What is a key SEO benefit of using proper heading structure?",
            "options": [
              "Faster page loading",
              "Better mobile responsiveness",
              "Improved search engine ranking",
              "Increased website security"
            ],
            "correct": 2
          },
          {
            "question": "What accessibility feature benefits from proper heading structure?",
            "options": [
              "Screen readers",
              "Mouse cursors",
              "Keyboard shortcuts",
              "Touch screens"
            ],
            "correct": 0
          },
          {
            "question": "What is considered a best practice for heading hierarchy?",
            "options": [
              "Skip levels to emphasize importance",
              "Use only even-numbered headings",
              "Maintain sequential order (H1 → H2 → H3)",
              "Use the same level throughout"
            ],
            "correct": 2
          },
          {
            "question": "Which heading is the largest in size?",
            "options": [
              "H4",
              "H2",
              "H3",
              "H1"
            ],
            "correct": 3
          },
          {
            "question": "What's the recommended maximum length for a heading?",
            "options": [
              "One word",
              "A full sentence",
              "A short, descriptive phrase",
              "A paragraph"
            ],
            "correct": 2
          },
          {
            "question": "Order these headings from largest to smallest:",
            "options": [
              "H1, H2, H3, H4",
              "H4, H3, H2, H1",
              "H2, H1, H4, H3",
              "H3, H2, H1, H4"
            ],
            "correct": 0
          }
        ]
      },
      {
        "id": 7,
        "title": "Icons",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey There! Let's Play with Some Icons! ✨</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Icons(0).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Want to Give Your Site Some Extra Sparkle? 🎨</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "You know what's fun about icons? They're like emojis for your website - but way cooler! And guess what? They're super easy to add! 😉"
            <footer class="text-sm mt-2">- That One Designer Friend We All Need</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Alright, Let's Get This Party Started! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Trust me, this is going to be super easy - here's what you do:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Pop over to the Components section</li>
                  <li>Look for the Icons option - it's got this cute little gift box icon 🎁</li>
                  <li>You'll see three sizes - like coffee cups, you know? Small, medium, and large!</li>
                  <li>Just grab one and drop it wherever you want - seriously, that's it! Easy peasy 😉</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Now for the Fun Part - Making It Your Own! 🍰</h5>
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                <div class="bg-white/70 p-4 rounded">
                  <p class="mb-4">Here's all the cool stuff you can do with your icons:</p>
                  <ul class="list-disc pl-4 space-y-2">
                    <li><span class="font-semibold">Style it up:</span> Want it bigger? Smaller? Different color? Go wild!</li>
                    
                    <li><span class="font-semibold">Make it clickable:</span> Yeah, you can make it take people places - how cool is that?</li>
                    
                    <li><span class="font-semibold">Switch it up:</span> Not feeling that icon anymore? No worries, just pick another one!</li>
                    
                    <li><span class="font-semibold">Size options:</span> Like I said - small, medium, or large. It's like ordering at a coffee shop, but way less pressure! ☕</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Here's How to Make Changes (It's a Piece of Cake!) ✨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Ready? This is super straightforward:</p>
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click your icon (you know, the one you just dropped in)</li>
                <li>See that little cog icon? ⚙️ Click it! (It's like the settings button on your phone)</li>
                <li>You'll get three options:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Style - make it look fabulous</li>
                    <li>Link - make it do something when clicked</li>
                    <li>Icons - pick a different icon if you've changed your mind</li>
                  </ul>
                </li>
                <li>Play around until you love it</li>
                <li>Hit "Apply changes" and boom - you're done!</li>
              </ol>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">🤓 Fun Facts About Icons! (Bet You Didn't Know These!)</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li>The word "icon" comes from the Greek word "eikōn" meaning "image" or "likeness" - fancy, right? 🎨</li>
          <li>The first computer icon was created in 1981 at Xerox - and look how far we've come! 💻</li>
          <li>Icons can increase your website's engagement by up to 50%! People love clicking on cute little pictures! 📈</li>
          <li>The human brain processes images 60,000 times faster than text - that's why icons work so well! 🧠</li>
          <li>Color-changing icons (like on hover) can increase click rates by up to 30%! ✨</li>
          <li>You should consider color-blind users when choosing icon colors - about 8% of males are color-blind! 🎨</li>

          </ul>
          </div>
        </div>

      <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">🎯 Icon Accessibility Tips</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li>Always add alt text to your icons - screen readers need love too! 🗣️</li>
          <li>Make sure your icon colors have enough contrast - visibility matters! 👀</li>
          <li>Consider color-blind users when choosing icon colors - about 8% of males are color-blind! 🎨</li>
          <li>Test your icons with keyboard navigation - not everyone uses a mouse! ⌨️</li>
        </ul>
          </div>
        </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Quick Tips from Your Icon-Loving Friend! 🧙‍♂️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Try out different sizes - sometimes what looks perfect in your head needs a little tweaking! 📏</li>
            <li>Made something clickable? Give it a test click - better safe than sorry! 🔗</li>
            <li>Keep it consistent - your website should look put together, not like it got dressed in the dark! ☾⋆</li>
            <li>Can't see your icon? Maybe try a different background color - we want people to actually see it! 👀</li>
            <li>Save your work! (I may have learnt this the hard way... 😅)</li>
          </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">Oh! One More Thing! ☝️</h5>
          <p class="mt-2">Don't forget to save before you go - trust me, you don't want to redo all your awesome work! 😅</p>
          <p class="mt-2">Hit that save button like it's your favorite emoji! 💾</p>
        </div>
    
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Design Those Icons? ✨</p>
            <p class="text-lg mt-2">Go ahead, make your site look amazing - you've totally got this!</p>
            </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Where can you find icons in the Zylosite website builder?",
            "options": [
              "In the Settings menu",
              "Under the Layout section",
              "Under the Components section",
              "In the Theme options"
            ],
            "correct": 2
          },
          {
            "question": "What happens when you click the cog icon on an icon element?",
            "options": [
              "The icon gets deleted",
              "The icon changes color",
              "Nothing happens",
              "The Detail editor appears",

            ],
            "correct": 3
          },
          {
            "question": "How many size options are available for icons in Zylosite?",
            "options": [
              "Two",
              "Three",
              "Four",
              "Five"
            ],
            "correct": 1
          },
          {
            "question": "Which word comes from the Greek word 'eikōn'?",
            "options": [
              "Icon",
              "Image",
              "Symbol",
              "Logo"
            ],
            "correct": 0
          },
          {
            "question": "When was the first computer icon created?",
            "options": [
              "1975",
              "1990",
              "1981",
              "1985"
            ],
            "correct": 2
          },
          {
            "question": "What are the three options available in the Detail editor for icons?",
            "options": [
              "Size, Color, and Shape",
              "Width, Height, and Color",
              "Font, Size, and Style",
              "Style, Link, and Icons",
            ],
            "correct": 3
          },

          {
            "question": "How do you add an icon to your canvas in Zylosite?",
            "options": [
              "Drag and drop",
              "Double click",
              "Right click and select 'Add'",
              "Copy and paste"
            ],
            "correct": 0
          },

          {
            "question": "What's the quickest way to duplicate an icon?",
            "options": [
              "Right-click the icon",
              "Press Ctrl+D",
              "Double-click the icon",
              "Click on the clone icon"
            ],
            "correct": 3
          },
          {
            "question": "Which icon is used to delete icons",
            "options": [
              "The power symbol",
              "The shopping cart",
              "The Trash icon",
              "The menu icon"
            ],
            "correct": 2
          },
          {
            "question": "What does the Icons icon look like in the components menu?",
            "options": [
              "The power symbol",
              "The gift emoji",
              "The Trash icon",
              "The menu icon"
            ],
            "correct": 1
          }
        ]
      },
      {
        "id": 8,
        "title": "Maps",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey! Let's Put Your Business on the Map! 🗺️</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Map(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Show Everyone Where to Find You? 📍</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "Getting lost is an adventure, but let's make sure your customers don't have to! A well-placed map is like a friendly guide saying 'You are welcome here!' 🎯"
            <footer class="text-sm mt-2">- Every Local Business Owner Ever</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Let's Get Your Map Up and Running! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Adding a map is easier than folding one (remember those days? 😅)</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Head over to Components </li>
                  <li>Find your perfect map template</li>
                  <li>Just drag and drop it where you want it (like moving furniture, but way easier)</li>
                  <li>Click that little cog icon to make it your own! ⚙️</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Making Your Map Look Amazing! 🎨</h5>
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                <div class="bg-white/70 p-4 rounded">
                  <p class="mb-4">Let's explore your style options (it's like dressing up your map!):</p>
                  <ul class="list-disc pl-4 space-y-2">
                    <li><span class="font-semibold">Height:</span> Tall, short, or just right - you decide how much space your map needs!</li>
                    
                    <li><span class="font-semibold">Margin Top:</span> Give it some breathing room up top - nobody likes feeling cramped!</li>
                    
                    <li><span class="font-semibold">Margin Bottom:</span> Same goes for the bottom - let's keep things balanced!</li>
                    
                    <li><span class="font-semibold">Black & White Toggle:</span> Feeling fancy? Switch to B&W for that classic look! </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Let's Make It Informative! 📝</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Time to tell your story on the map:</p>
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click the Map option </li>
                <li>You'll see two important text boxes:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Your Address: Paste in the link of where you live </li>
                    <li>Info Box Message: This is your chance to shine! Add opening hours, parking tips, or your famous welcome message 🌟</li>
                  </ul>
                </li>
                <li>Play with the zoom level - too close? Too far? Make it juuust right! 🔍</li>
                <li>Try the B&W toggle - sometimes Black and White nails it!</li>
                <li>Hit "Apply Changes" and voilà - you're on the map! 🎉</li>
              </ol>
            </div>
          </div>

        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🤓 Fun Map Facts!</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Did you know? The first digital map was created in 1967! We've come a long way from paper maps! 🗺️</li>
            <li>A good map can increase your website visits by helping people find you IRL (In Real Life)! 📈</li>
            <li>Black and white maps can reduce page load time - sneaky performance boost! ⚡</li>
            <li>People spend 40% more time on pages with maps - they're just that engaging! ⏰</li>
          </ul>
            </div>
          </div>

        <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🎯 Map Best Practices</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Keep your info box short and sweet - nobody's reading a novel on a map! 📝</li>
            <li>Update your address if you move - obvious, but easy to forget! 🏠</li>
            <li>Test your map on different devices - it should look great everywhere! 💻</li>
            <li>Consider your colour scheme - that's why we gave you the B&W (Black and White) option! 🎨</li>
          </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">One Last Thing! ☝️</h5>
          <p class="mt-2">Remember to save your work - because redoing your perfect map setup is no fun! 😅</p>
          <p class="mt-2">And hey, if you get lost in the settings, just hit refresh and start afresh! 🔄</p>
        </div>
    
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Get on the Map? ✨</p>
            <p class="text-lg mt-2">Go ahead - show the world exactly where to find your awesome business!</p>
            </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Where can you find maps in the Zylosite website builder?",
            "options": [
              "Under the Components section",
              "In the Settings menu",
              "Under the Layout section",
              "In the Theme options"
            ],
            "correct": 0
          },
          {
            "question": "How do you access the map editing options?",
            "options": [
              "Double click the map",
              "Click on the cog icon",
              "Right click the map",
              "Press the Edit button"
            ],
            "correct": 1
          },
          {
            "question": "How many main options are available in the detail editor for maps?",
            "options": [
              "Three (Style, Map, and Layout)",
              "Four (Style, Map, Size, and Position)",
              "Two (Style and Map)",
              "One (Map settings)"
            ],
            "correct": 2
          },
          {
            "question": "Which text box is used to input the location?",
            "options": [
              "Info box message",
              "Location details",
              "Map address",
              "Your address",
            ],
            "correct": 3
          },
          {
            "question": "What type of toggle is available in the map options?",
            "options": [
              "Satellite view",
              "Black and white",
              "3D view",
              "Traffic view"
            ],
            "correct": 1
          },

          {
            "question": "What should you do after making changes to your map?",
            "options": [
              "Click Apply Changes",
              "Refresh the page",
              "Save and exit",
              "Close the editor"
            ],
            "correct": 0
          },
          {
            "question": "What's recommended to include in the info box message?",
            "options": [
              "Full company history",
              "Employee biographies",
              "Opening hours and parking tips",
              "Product catalog"
            ],
            "correct": 2
          },
          {
            "question": "What benefit can black and white maps provide?",
            "options": [
              "Reduced page load time",
              "Better visibility",
              "Increased map size",
              "More accurate directions"
            ],
            "correct": 0
          },
          {
            "question": "How do you add a map to your canvas?",
            "options": [
              "Copy and paste",
              "Double click",
              "Right click and select Add",
              "Drag and drop"
            ],
            "correct": 3
          },
          {
            "question": "What should you consider when choosing a zoom level?",
            "options": [
              "Global view of the country",
              "Satellite imagery quality",
              "Visibility of nearby streets",
              "Traffic patterns"
            ],
            "correct": 2
          }
        ]
      },
      {
        "id": 9,
        "title": "Lists",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey There! Let's Master Your List Controls! 🎮</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Lists(0).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Your Complete Guide to List Magic ✨</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "The best lists are the ones you can customize just the way you want them - and we're here to show you how!" 
            <footer class="text-sm mt-2">- Your Friendly List Guide 📝</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">First Things First: Getting Your List Ready! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Let me walk you through getting started - it's easy peasy, I promise! 🤞</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Head over to the Components section</li>
                  <li>When you select Lists, you'll find two fantastic options: bulleted lists (perfect for when order doesn't matter) and unbulleted lists (great for a cleaner look)</li>
                  <li>See one you like? Just grab it with your mouse - yep, just click and hold!</li>
                  <li>Now for the fun part - drag it anywhere on your canvas. Don't worry about getting it perfect; you can always move it later! 🎯</li>
                </ol>
              </div>
            </div>
          </div>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Your Awesome Editing Toolkit - Let's Dive In! 🛠️</h5>
              <div class="bg-white/70 p-4 rounded">
                <p class="mb-4">Once you've got your list placed, click on it and - ta-da! - you'll see four helpful tools appear. Let me tell you all about them:</p>
                
                <div class="space-y-6">
                  <div class="bg-white/80 p-4 rounded-lg">
                    <h6 class="font-semibold text-blue-600">📝 The Text Editor (That's the T icon!)</h6>
                    <p class="mt-2">Oh boy, this is where you can really make your list shine! In here you can:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-2">
                      <li>Type out all your list items (go wild - add as many as you need!)</li>
                      <li>Edit existing items (because sometimes we change our minds, right?)</li>
                      <li>Rearrange things by cutting and pasting (organization is key!)</li>
                      <li>Format your text - make it bold, italic, or add links if you're feeling fancy!</li>
                      <li>Change colors to match your style (want purple bullets? Go for it!)</li>
                      </ul>
                  </div>
      
                  <div class="bg-white/80 p-4 rounded-lg">
                    <h6 class="font-semibold text-blue-600">⚙️ The Settings (The Cog Icon)</h6>
                    <p class="mt-2">This is where the magic happens! Click this little guy to:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-2">
                      <li>Adjust the margins on top and bottom of the items (because breathing room matters)</li>
                      <li>Tweak indentation for nested items (perfect for those complex lists)</li>
                    </ul>
                  </div>
      
                  <div class="bg-white/80 p-4 rounded-lg">
                    <h6 class="font-semibold text-blue-600">📋 The Clone Tool (Looking Like Two Pages)</h6>
                    <p class="mt-2">This is such a time-saver! When you click this:</p>
                    <ul class="list-disc pl-6 mt-2 space-y-2">
                      <li>You get an exact copy of your list - formatting and all!</li>
                      <li>The clone appears right next to the original (BOOM! like magic! ✨)</li>
                      <li>Perfect for when you need similar lists across your content</li>
                      <li>Great for creating templates you can reuse later</li>
                    </ul>
                  </div>
      
                  <div class="bg-white/80 p-4 rounded-lg">
                    <h6 class="font-semibold text-blue-600">🗑️ The Delete Option</h6>
                    <p class="mt-2">Sometimes we need a fresh start, and that's what this is for!</p>
                    <ul class="list-disc pl-6 mt-2 space-y-2">
                      <li>Removes the entire list in one click (but don't worry, it'll ask you if you're sure 🤔)</li>
                      <li>Can't be undone, so use it wisely! Maybe save a clone first? 😉</li>
                      <li>Perfect for when you're reorganizing your content</li>
                      <li>Helps keep your workspace clean and tidy</li>
                      <p class="mt-1">Remove lists you no longer need - but do it with care, there's no undo button!</p>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Super Helpful Tips! 💡</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Not sure which tool to use? Hover over each icon - a helpful tooltip will appear! 🎈</li>
                <li>Made a mistake? Don't panic! You can always clone your list before making big changes </li>
                <li>Want to experiment? Try creating a few different versions using the clone tool 🔬</li>
                <li>Remember: Your most-used settings will become second nature in no time! 🌟</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
            <h5 class="font-semibold">One Last Thing! ☝️</h5>
            <p class="mt-2">Remember, there's no "right" way to use these tools - it's all about what works best for you! Play around, experiment, and have fun creating amazing lists! 🎨</p>
            <p class="mt-2">And hey, if you ever get stuck or want to start over, that's totally okay too! That's what the delete button is for (just remember to clone first if you're unsure!) 😉</p>
          </div>
      
          <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Edit Like a Pro? ✨</p>
          <p class="text-lg mt-2">Go ahead - give these tools a try! And remember, we're here if you need any help! 🙌</p>
          </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Where can you find icons in the Zylosite website builder?",
            "options": [
              "In the Settings menu",
              "Under the Layout section",
              "Under the Components section",
              "In the Theme options"
            ],
            "correct": 2
          },
          {
            "question": "What happens when you click the cog icon on an icon element?",
            "options": [
              "The icon gets deleted",
              "The icon changes color",
              "Nothing happens",
              "The Detail editor appears",

            ],
            "correct": 3
          },
          {
            "question": "How many size options are available for icons in Zylosite?",
            "options": [
              "Two",
              "Three",
              "Four",
              "Five"
            ],
            "correct": 1
          },
          {
            "question": "Which word comes from the Greek word 'eikōn'?",
            "options": [
              "Icon",
              "Image",
              "Symbol",
              "Logo"
            ],
            "correct": 0
          },
          {
            "question": "When was the first computer icon created?",
            "options": [
              "1975",
              "1990",
              "1981",
              "1985"
            ],
            "correct": 2
          },
          {
            "question": "What are the three options available in the Detail editor for icons?",
            "options": [
              "Size, Color, and Shape",
              "Width, Height, and Color",
              "Font, Size, and Style",
              "Style, Link, and Icons",
            ],
            "correct": 3
          },

          {
            "question": "How do you add an icon to your canvas in Zylosite?",
            "options": [
              "Drag and drop",
              "Double click",
              "Right click and select 'Add'",
              "Copy and paste"
            ],
            "correct": 0
          },

          {
            "question": "What's the quickest way to duplicate an icon?",
            "options": [
              "Right-click the icon",
              "Press Ctrl+D",
              "Double-click the icon",
              "Click on the clone icon"
            ],
            "correct": 3
          },
          {
            "question": "Which icon is used to delete icons",
            "options": [
              "The power symbol",
              "The shopping cart",
              "The Trash icon",
              "The menu icon"
            ],
            "correct": 2
          },
          {
            "question": "What does the Icons icon look like in the components menu?",
            "options": [
              "The power symbol",
              "The gift emoji",
              "The Trash icon",
              "The menu icon"
            ],
            "correct": 1
          }
        ]
      },
      {
        "id": 10,
        "title": "Embeds",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey Code Enthusiasts! Let's Talk About Embeds! 🚀</h2>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Unleash Your Inner Developer? 👩‍💻👨‍💻</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Code is poetry written in logic, and embeds are your canvas!" 
            <footer class="text-sm mt-2">- Every Happy Developer Ever 💻</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Getting Started with Embeds! 🎯</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Hey there, future code wizard! Let's get you started with embeds - it's super easy:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Head over to the Components section (that's where the good stuff is!)</li>
                  <li>Find that shiny embed template waiting for you</li>
                  <li>Drag it onto your canvas (anywhere you like - you're the boss!)</li>
                  <li>Click on it and - boom! - you'll see two icons when you click on the template: the code symbol </> (your new best friend) and the delete icon (just in case!)</li>
                </ol>
              </div>
              <!-- Added screenshot image -->
              <div class="w-full flex justify-center mb-6">
                <img 
                  src="https://awb-silk.vercel.app/Screenshot%20(862).png" 
                  alt="Zylosite Website Builder Interface" 
                  class="rounded-lg shadow-lg border border-gray-200"
                />
              </div>
            </div>
          </div>
      
          <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-6">
          <h5 class="font-semibold">Quick Guide to add Media Elements 📱</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <div class="space-y-6">
              <!-- Image Section -->
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-700 mb-2">📸 Images: A picture's worth a thousand words!</p>
                <code class="text-sm block">
                  &lt;!-- Basic responsive image --&gt;<br/>
                  &lt;img 
                    src="cool-pic.jpg"
                    alt="A super cool picture"
                    width="800"
                    height="600"
                    loading="lazy"
                  &gt;
                  
                  &lt;!-- Modern picture element --&gt;<br/>
                  &lt;picture&gt;
                    &lt;source media="(min-width: 800px)" srcset="big.jpg"&gt;
                    &lt;source media="(min-width: 400px)" srcset="medium.jpg"&gt;
                    &lt;img src="small.jpg" alt="Responsive image"&gt;
                  &lt;/picture&gt;
                </code>
              </div>
         
              <!-- Video Section -->
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-700 mb-2">🎥 Videos: When still images just won't cut it!</p>
                <code class="text-sm block">
                  &lt;!-- Video with all the bells & whistles --&gt;<br/>
                  &lt;video 
                    controls
                    width="100%" 
                    autoplay 
                    muted
                    loop
                    poster="preview.jpg"
                  &gt;
                    &lt;source src="video.mp4" type="video/mp4"&gt;
                    &lt;source src="video.webm" type="video/webm"&gt;
                    &lt;track 
                      src="captions.vtt" 
                      kind="captions" 
                      srclang="en" 
                      label="English"
                    &gt;
                    Oops! Video not supported 😅
                  &lt;/video&gt;
                </code>
              </div>
         
              <!-- Audio Section -->
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-700 mb-2">🎵 Audio: Let's make some noise!</p>
                <code class="text-sm block">
                  &lt;!-- Audio player with fallbacks --&gt;<br/>
                  &lt;audio 
                    controls
                    preload="auto"
                    loop
                  &gt;
                    &lt;source src="tune.mp3" type="audio/mpeg"&gt;
                    &lt;source src="tune.ogg" type="audio/ogg"&gt;
                    &lt;p&gt;
                      No audio support? Time to upgrade! 🎧
                    &lt;/p&gt;
                  &lt;/audio&gt;
                </code>
              </div>
            </div>
          </div>
         </div>
      
          <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-6">
            <h5 class="font-semibold">CSS - Making Things Pretty! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Time to add some style to your life! With CSS you can:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li>Paint your elements with gorgeous colors</li>
                <li>Add animations that'll make your users go "Wow!" 😲</li>
                <li>Create responsive layouts that look great everywhere</li>
                <li>Style your content to match your brand perfectly</li>
              </ul>
              <div class="bg-gray-100 p-4 mt-4 rounded">
                <p class="text-sm text-gray-600">Example: Want a fancy button that glows on hover?</p>
                <code class="text-sm block mt-2">
                  .awesome-button {<br/>
                  &nbsp;&nbsp;background: linear-gradient(45deg, #ff6b6b, #ff8e53);<br/>
                  &nbsp;&nbsp;transition: all 0.3s ease;<br/>
                  }<br/>
                  <br/>
                  .awesome-button:hover {<br/>
                  &nbsp;&nbsp;box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);<br/>
                  }
                </code>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-6">
            <h5 class="font-semibold">JavaScript - Where the Magic Happens! ✨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Now we're talking! JavaScript brings your embeds to life:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li>Add interactivity that responds to user actions</li>
                <li>Create dynamic content that updates in real-time</li>
                <li>Handle data and make API calls like a ninja</li>
                <li>Build complex applications right in your embed!</li>
              </ul>
              <div class="bg-gray-100 p-4 mt-4 rounded">
                <p class="text-sm text-gray-600">Example: Want to create a fun counter?</p>
                <code class="text-sm block mt-2">
                  let count = 0;<br/>
                  <br/>
                  function updateCounter() {<br/>
                  &nbsp;&nbsp;count++;<br/>
                  &nbsp;&nbsp;document.getElementById('counter').textContent = count;<br/>
                  &nbsp;&nbsp;if (count === 100) alert('You're awesome! 🎉');<br/>
                  }
                </code>
              </div>
            </div>
          </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">🤓 Did You Know? Fun Code Facts!</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li>The first web embed was a simple hit counter in the 90s - now look how far we've come! 📊</li>
              <li>JavaScript was created in just 10 days! Talk about a speedrun! 🏃‍♂️</li>
              <li>HTML was inspired by tags used in book publishing - meta, right? 📚</li>
              <li>CSS almost had a competitor called DSSSL - try saying that five times fast! 😅</li>
              <li>The first animated GIF was of a rotating globe - and we've been embedding spinning things ever since! 🌍</li>
            </ul>
          </div>
        </div>

        
    
        <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">🔍 Myth Busters: Code Edition!</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <div class="space-y-4">
              <div class="border-b pb-4">
                <p class="font-semibold">Myth: "You need to be a math genius to code" 🔢</p>
                <p class="mt-2">Reality: While some coding involves math, most web development is about logic and creativity. If you can solve puzzles, you can code! 🧩</p>
              </div>
              
              <div class="border-b pb-4">
                <p class="font-semibold">Myth: "More code = better code" 📝</p>
                <p class="mt-2">Reality: Clean, efficient code often means writing less! It's about quality over quantity, folks! 🎯</p>
              </div>
              
              <div class="border-b pb-4">
                <p class="font-semibold">Myth: "Embeds slow down your site" 🐌</p>
                <p class="mt-2">Reality: Well-optimized embeds can actually improve user experience and functionality! It's all about how you implement them. ⚡</p>
              </div> 
              <div class="border-b pb-4">
              <p class="font-semibold">Myth: "HTML is a programming language" </p>
              <p class="mt-2">Reality: HTML is not considered a programming language because it does not contain any programming logic which is needed to write a program. </p>
            </div>
              
              <div>
                <p class="font-semibold">Myth: "You need to memorize every code syntax" 🧠</p>
                <p class="mt-2">Reality: Even senior developers Google basic syntax! It's about understanding concepts, not memorizing everything! 🔍</p>
              </div>
            </div>
          </div>
        </div>


        <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Web Dev Abbreviations 📚</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li><span class="font-bold">HTML</span> - HyperText Markup Language</li>
          <li><span class="font-bold">CSS</span> - Cascading Style Sheets</li>
          <li><span class="font-bold">JS</span> - JavaScript</li>
       </ul>
        </div>
      </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Code Something Amazing? 🚀</p>
            <p class="text-lg mt-2">Remember, every awesome website started with a single line of code! Go forth and create something incredible! 💫</p>
          </div>
        </div>
      </div>
      `,
      "quiz": [
        {
          "question": "What does HTML stand for?",
          "options": [
            "Hyper Transfer Markup Language",
            "HyperText Markup Language",
            "High Text Markup Language",
            "Hyper Technical Modern Language"
          ],
          "correct": 1
        },
        {
          "question": "Where can you find the embed template in the interface?",
          "options": [
            "In the Edit menu",
            "In the Components section",
            "In the Settings panel",
            "In the Format menu"
          ],
          "correct": 1
        },
        {
          "question": "Which icons appear when you click on an embed?",
          "options": [
            "Edit and delete icons",
            "Code symbol and delete icon",
            "Settings and code icons",
            "Copy and paste icons"
          ],
          "correct": 1
        },
        {
          "question": "What type of code can you include in an embed?",
          "options": [
            "Only HTML",
            "Only JavaScript",
            "Only CSS",
            "HTML, CSS, and JavaScript"
          ],
          "correct": 3
        },
        {
          "question": "How do you add custom code to an embed?",
          "options": [
            "Click the code symbol and paste code",
            "Right-click and select 'Add Code'",
            "Double-click the embed",
            "Use the settings panel"
          ],
          "correct": 0
        },
        {
          "question": "What is the primary purpose of HTML in an embed?",
          "options": [
            "Adding styling",
            "Creating animations",
            "Structuring content",
            "Handling events"
          ],
          "correct": 2
        },
        {
          "question": "Which language is used for styling in embeds?",
          "options": [
            "JavaScript",
            "HTML",
            "CSS",
            "Python"
          ],
          "correct": 2
        },
        {
          "question": "What is JavaScript primarily used for in embeds?",
          "options": [
            "Structuring content",
            "Styling elements",
            "Adding interactivity",
            "Creating layouts"
          ],
          "correct": 2
        },
        {
          "question": "What does CSS mean?",
          "options": [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Controlled Style System"
          ],
          "correct": 2
        },
        {
          "question": "How can you add external resources like photos and videos to an embed?",
          "options": [
            "Using link and script tags",
            "Importing directly in JavaScript",
            "Adding them to the settings",
            "Through the format menu"
          ],
          "correct": 0
        }
      ]
    },
      {
        "id": 11,
        "title": "Navigation Bar",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Navigate Like a Pro! 🧭</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Navigation_Bar(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Create an Amazing Navigation Bar! 🎯</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "A great navigation bar is like a roadmap to your website - make it clear, make it simple! 🗺️"
            <footer class="text-sm mt-2">- Every Web Designer Ever</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Getting Started with Your Nav Bar! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Let's build your perfect navigation bar:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Go to Blocks and find the Navigation section</li>
                  <li>Browse through different nav bar designs</li>
                  <li>Drag your favorite design onto the canvas</li>
                  <li>Click any element to see options: Change text, Clone, or Delete ⚙️</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Add Links to Your Nav Bar! 🔗</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Click the button you want to link</li>
                  <li>Click the cog icon in the menu</li>
                  <li>In the Detail Modal, choose 'Link'</li>
                  <li>Paste your URL or select a page</li>
                  <li>Optional: Toggle 'Open in new tab' 🔄</li>
                </ol>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Style Your Nav Bar Elements! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click any nav bar element</li>
                <li>Click the cog icon</li>
                <li>In Detail Modal, select 'Style'</li>
                <li>Customize the appearance:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Colors and backgrounds 🎨</li>
                    <li>Text size and font 📝</li>
                    <li>Padding and spacing 📏</li>
                    <li>Hover effects ✨</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🤓 Nav Bar Facts!</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Users spend 6.48 seconds on average looking at your navigation! Make it count! ⏱️</li>
            <li>Clear navigation can reduce bounce rates by up to 30%! 📈</li>
            <li>Most users prefer navigation with 7 or fewer main items! 🔢</li>
            <li>89% of visitors leave a website due to poor navigation! 🚪</li>
          </ul>
            </div>
          </div>

        <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🎯 Navigation Best Practices</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Keep menu items short and clear - no fancy words needed! 📝</li>
            <li>Test all your links before going live! 🔗</li>
            <li>Make your logo clickable - it should always lead home! 🏠</li>
            <li>Ensure high contrast for better readability! 👀</li>
          </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">Pro Tip! 💡</h5>
          <p class="mt-2">Save frequently while editing your nav bar - better safe than sorry! 💾</p>
          <p class="mt-2">Need to undo changes? Use the referesh button to start afresh! 🔄</p>
        </div>
    
      
          <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Guide Your Visitors? ✨</p>
          <p class="text-lg mt-2">You've got this! Let's create something amazing together! ✨</p>
          </div>
        </div>
      </div>`,
      "quiz": [
        {
          "question": "Where can you find navigation templates?",
          "options": [
            "In the Blocks section",
            "In the Edit menu",
            "In the Format menu",
            "In the Settings panel"
          ],
          "correct": 0
        },
        {
          "question": "How do you add a navigation bar to the canvas?",
          "options": [
            "Copy and paste",
            "Double click",
            "Right click and select 'Add'",
            "Drag and drop"
          ],
          "correct": 3
        },
        {
          "question": "What appears when you click on a navigation bar component?",
          "options": [
            "A color picker",
            "A text editor",
            "A delete button only",
            "A menu with editing options"
          ],
          "correct": 3
        },
        {
          "question": "Which icon do you click to access the Detail Modal?",
          "options": [
            "Star icon",
            "Plus icon",
            "Pencil icon",
            "Cog icon"
          ],
          "correct": 3
        },
     
        {
          "question": "How do you add a link to a navigation bar element?",
          "options": [
            "Double click and enter URL",
            "Drag a link from browser",
            "Click cog icon, select Link option, and paste URL",
            "Right-click and select 'Add Link'"
          ],
          "correct": 2
        },
        {
          "question": "What is an optional setting when adding a link?",
          "options": [
            "Add animation",
            "Set link color",
            "Add password protection",
            "Open in new tab"
          ],
          "correct": 3
        },
        {
          "question": "What is the first step to style a navigation element?",
          "options": [
            "Open Settings panel",
            "Open Style menu",
            "Right-click the element",
            "Click the element"
          ],
          "correct": 3
        },
 
        {
          "question": "What happens when you click the cog icon?",
          "options": [
            "Shows preview",
            "Shows Detail Modal",
            "Opens Style panel directly",
            "Deletes component"
          ],
          "correct": 1
        },
   
        {
          "question": "What feature allows you to duplicate a nav bar element?",
          "options": [
            "Duplicate option",
            "Copy button",
            "Repeat tool",
            "Clone feature"
          ],
          "correct": 3
        },
        {
          "question": "Where are the style settings located?",
          "options": [
            "Main menu",
            "Format bar",
            "Quick panel",
            "Detail Modal"
          ],
          "correct": 3
        }
      ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Components",
    "units": [
      {
        "id": 1,
        "title": "Call to action",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Create Irresistible Call-to-Actions! 🎯</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Call_To_Action(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Let's Make Your Visitors Click! ✨</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "A great Call-to-Action is like a friendly invitation to dance - make it hard to resist! 💃"
            <footer class="text-sm mt-2">- Your Marketing Buddy</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Let's Get Started! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Creating your perfect CTA is super fun! Here's how:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Skip over to the Blocks Section</li>
                  <li>Find the magical Call-to-Action button</li>
                  <li>Pick a template that makes you go "Wow!" 🤩</li>
                  <li>Just drag and drop it where you want the magic to happen!</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Make It Pretty! 🎨</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Time to style your CTA (the fun part!):</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Click the friendly cog icon</li>
                  <li>Play with these cool options:
                    <ul class="list-disc pl-6 mt-2">
                      <li>Pick your perfect background color 🎨</li>
                      <li>Add a fancy overlay effect ✨</li>
                      <li>Choose a stunning background image 🖼️</li>
                      <li>Adjust padding (top and bottom) for that perfect fit 📏</li>
                      <li>Position it just right (center, left, right) 🎯</li>
                      <li>Toggle Parallax for some extra wow! 🌟</li>
                    </ul>
                  </li>
                  <li>Don't forget to hit "Apply Changes" - super important! 💫</li>
                </ol>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Add Some Eye-Candy! 🖼️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Let's add a gorgeous image:</p>
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click "Background Image" (exciting!)</li>
                <li>Choose from:
                  <ul class="list-disc pl-6 mt-2">
                    <li>My Images (your personal collection) 📁</li>
                    <li>Other Images (pre-loaded goodies) 🎁</li>
                    <li>Free Stock Photos (endless possibilities!) 📸</li>
                  </ul>
                </li>
                <li>Pick your favorite and upload! 🚀</li>
              </ol>
            </div>
          </div>

        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Make Your Text Pop! 📝</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click that handy cog icon again</li>
                <li>Choose between:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Style: Make it look amazing! ✨
                      <ul class="list-disc pl-6 mt-2">
                        <li>Play with margins (top and bottom)</li>
                        <li>Pick perfect colors (background, border, text)</li>
                        <li>Choose your size (huge, default, small, extra small)</li>
                        <li>Make it block-style if you want!</li>
                      </ul>
                    </li>
                    <li>Link: Make it clickable! 🔗
                      <ul class="list-disc pl-6 mt-2">
                        <li>Add a URL (go anywhere!)</li>
                        <li>Use # to scroll to sections (smooth!)</li>
                        <li>Link to other pages (explore!)</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

        <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Pro Tips for Success! 💫</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Keep your message short and sweet - nobody likes to read an essay! 📝</li>
            <li>Use contrasting colors to make your button pop! 🎨</li>
            <li>Test your links before going live - always! 🔍</li>
            <li>Make sure your CTA looks great on phones too! 📱</li>
          </ul>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Pro Tips for Success! 💫</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li>Keep your button text between 2-5 words - short and punchy wins the race! 🎯</li>
          <li>Start with action verbs - they're like little motivational speakers! 🗣️</li>
          <li>Red buttons tend to catch more attention - give them a try! 🚀</li>
          <li>Place important CTAs above the fold - that's prime real estate! ⭐</li>
          <li>Avoid generic phrases like 'Click Here' - be creative and specific! ✍️</li>
          <li>Most visitors read CTA button text - make those words count! 👀</li>
          </ul>
          </div>
        </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Amazing CTA Facts! 🤓</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li>Personalized CTAs perform significantly better than generic ones! 📈</li>
          <li>Adding CTAs to your articles can seriously boost engagement! 🎉</li>
          <li>A/B testing is your secret weapon for optimizing CTAs - try it out! 🔍</li>
          <li>Contrasting colors make your CTAs pop - stand out from the crowd! 🎨</li>
        </ul>
          </div>
        </div>
    
        <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Quick Checklist for Perfect CTAs! ✅</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li>✓ Used an action verb to start your CTA text?</li>
          <li>✓ Kept the text between 2-5 words?</li>
          <li>✓ Placed it where everyone can see it?</li>
          <li>✓ Used contrasting colors that pop?</li>
          <li>✓ Made it personal and specific?</li>
          <li>✓ Tested different versions?</li>
        </ul>
          </div>
        </div>

        <br />
        <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
        <h5 class="font-semibold">One Last Thing! 💝</h5>
        <p class="mt-2">Remember: Your CTA is like a friendly invitation to take action - make it irresistible! ✨</p>
        <p class="mt-2">If something's not quite right, you can always start fresh! 🔄</p>
        </div>
  
    
        <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create Converting CTAs? 🎯</p>
          <p class="text-lg mt-2">Armed with these tips, you're all set to make CTAs that wow! ✨</p>
        </div>
      </div>
    </div>

          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create Eye-Catching CTAs? 🎯</p>
            <p class="text-lg mt-2">Go ahead - make something that'll wow your visitors! ✨</p>
          </div>
        </div>
      </div>`,      
      "quiz": [
        {
        "question": "Where can you find the Call to Action option in the interface?",
        "options": [
        "Components Section",
        "Blocks Section",
        "Elements Section",
        "Layout Section"
        ],
        "correct": 1
        },
    
        {
        "question": "What appears when you click the cog icon?",
        "options": [
        "Image library",
        "Color picker",
        "Detailed editor",
        "Template selector"
        ],
        "correct": 2
        },
    
        {
        "question": "What's an important setting to remember after making changes?",
        "options": [
        "Reset Changes",
        "Save Draft",
        "Apply Changes",
        "Preview Changes"
        ],
        "correct": 2
        },
        {
        "question": "What are the available button size options?",
        "options": [
        "Tiny, small, medium, large",
        "Mini, standard, mega, ultra",
        "Huge, default, small, extra small",
        "XS, S, M, L, XL"
        ],
        "correct": 2
        },
      
        {
        "question": "What happens when you click on 'Background Image'?",
        "options": [
        "Opens file explorer",
        "Opens image library panel",
        "Opens camera",
        "Opens web search"
        ],
        "correct": 1
        },
   
        {
        "question": "What are the two main options in the detailed editor?",
        "options": [
        "Color and Size",
        "Style and Link",
        "Text and Image",
        "Layout and Design"
        ],
        "correct": 1
        },
   
        {
        "question": "What's the process for adding a CTA template?",
        "options": [
        "Copy and paste",
        "Drag and drop",
        "Double click",
        "Right click and select"
        ],
        "correct": 1
        },
        {
        "question": "Where do you find the button customization options?",
        "options": [
        "In the main menu",
        "In the cog icon settings",
        "In the template gallery",
        "In the page settings"
        ],
        "correct": 1
        },
        {
        "question": "What can you do with the background overlay feature?",
        "options": [
        "Add video backgrounds",
        "Add color over background images",
        "Add animations",
        "Add patterns"
        ],
        "correct": 1
        },
        {
        "question": "How can you make a button full-width?",
        "options": [
        "Use huge size",
        "Enable Button block",
        "Increase padding",
        "Add margin"
        ],
        "correct": 1
        },
      
        ]
      },
      {
        "id": 2,
        "title": "Contact",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Make Your Contact Section Shine! 📞</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Contact(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Connect with Your Visitors? Connect With Style! 🤝</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "A well-designed contact section turns visitors into clients! Let's make it happen! 🤝"

          </blockquote>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
          <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">First Things First - The Essentials! 📝</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Here's what makes a contact form truly effective:</p>
              <ol class="list-decimal pl-4 space-y-2">
                <li>Keep it simple - nobody likes filling out long forms!</li>
                <li>Make sure it's mobile-friendly - people love using their phones</li>
                <li>Add clear labels - no one should have to guess what goes where</li>
                <li>Include helpful error messages - guide users when they make mistakes</li>
                <li>Add a friendly success message - people love knowing their message went through!</li>
                <li>Include a privacy notice - build trust with your visitors</li>
                <li>Show estimated response time - manage expectations nicely</li>
              </ol>
            </div>
          </div>
        </div>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
          <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Quick Setup Guide! 🚀</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li>Find Contact under Blocks</li>
                <li>Choose your preferred template</li>
                <li>Drag and drop onto your page</li>
                <li>Customize with the settings (cog) icon</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="bg-white/50 p-6 rounded-lg mb-6">
          <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Styling Options! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Background:</span> Colors, images, overlays</li>
                <li><span class="font-semibold">Spacing:</span> Custom padding options</li>
                <li><span class="font-semibold">Position:</span> Multiple background positions</li>
                <li><span class="font-semibold">Parallax:</span> Optional scrolling effects</li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Essential Tools! 🛠️</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li><span class="font-semibold">⚙️ Settings:</span> Customize design & functionality</li>
              <li><span class="font-semibold">🔄 Clone:</span> Copy your contact section</li>
              <li><span class="font-semibold">🗑️ Delete:</span> Remove unwanted elements</li>
            </ul>
          </div>
        </div>
  
        <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Pro Tips! 💫</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li>Test form submissions before going live 📧</li>
              <li>Keep mobile users in mind when spacing fields</li>
              <li>Add clear success messages</li>
              <li>Include a privacy notice near forms</li>
            </ul>
          </div>
        </div>
        
         
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Must-Have Form Fields! 🎯</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li><span class="font-semibold">Name field:</span> Make it personal!</li>
                  <li><span class="font-semibold">Email address:</span> Keep in touch!</li>
                  <li><span class="font-semibold">Message box:</span> Let them share their thoughts</li>
                  <li><span class="font-semibold">Submit button:</span> Make it stand out!</li>
                </ul>
              </div>
            </div>
          </div>
      
    
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
            <h5 class="font-semibold">Remember! 💫</h5>
            <p class="mt-2">A great contact form can be the beginning of wonderful relationships with your visitors!</p>
            <p class="mt-2">Make it friendly, make it easy, make it work! 🚀</p>
          </div>
    
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create Your Contact Form? ✨</p>
            <p class="text-lg mt-2">You've got all the tools - now go make something amazing!</p>
          </div>
        </div>
      </div>`,
      "quiz": [
        {
        "question": "What is one of the essential qualities of an effective contact form?",
        "options": [
        "Complex design",
        "Multiple pages",
        "Simple layout",
        "Maximum fields"
        ],
        "correct": 2
        },
        {
        "question": "Where do you find the Contact templates?",
        "options": [
        "Settings menu",
        "Blocks section",
        "Theme options",
        "Header menu"
        ],
        "correct": 1
        },
        {
        "question": "Which is a must-have form field mentioned?",
        "options": [
        "Age",
        "Phone number",
        "Email address",
        "Company size"
        ],
        "correct": 2
        },
     
        {
        "question": "What should be included to build trust with visitors?",
        "options": [
        "Company history",
        "Privacy notice",
        "Staff photos",
        "Office address"
        ],
        "correct": 1
        },
        {
        "question": "What's the purpose of the cog icon?",
        "options": [
        "Delete form",
        "Copy form",
        "Customize design",
        "Preview form"
        ],
        "correct": 2
        },
     
        {
        "question": "What should be shown to manage visitor expectations?",
        "options": [
        "Company size",
        "Office hours",
        "Response time",
        "Staff names"
        ],
        "correct": 2
        },
        {
        "question": "What's a key consideration for mobile users?",
        "options": [
        "Field spacing",
        "Background colors",
        "Font size only",
        "Button shapes"
        ],
        "correct": 0
        },
      
        {
        "question": "What scrolling effect is mentioned as optional?",
        "options": [
        "Fade",
        "Slide",
        "Parallax",
        "Zoom"
        ],
        "correct": 2
        },
        {
        "question": "What should be done before making the form live?",
        "options": [
        "Add more fields",
        "Change colors",
        "Test submissions",
        "Add animations"
        ],
        "correct": 2
        },
  
        {
        "question": "What type of notice should be near forms?",
        "options": [
        "Copyright",
        "Terms",
        "Privacy",
        "Cookie"
        ],
        "correct": 2
        },
      
        ]
      },
      {
        "id": 3,
        "title": "Content",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey There Content Creator! 🎨</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Content(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-4 text-center">Time to Make Your Website Pop! ✨</h3>
           
        <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
        "Think of content blocks as LEGO pieces for your website - mix, match, and build something awesome! And guess what? No coding needed! 🎮"
       <footer class="text-sm mt-2">- Your Website Buddy</footer>
     </blockquote>
 
     <div class="bg-white/50 p-6 rounded-lg mb-6">
       <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
         <h5 class="font-semibold">Let's Get This Party Started! 🎉</h5>
         <div class="bg-white/70 p-4 rounded mt-4">
           <p class="mb-4">Ready for some website magic? Here's your game plan:</p>
           <ol class="list-decimal pl-4 space-y-2">
             <li>Head over to 'Blocks' (it's like your digital toybox! 🧸)</li>
             <li>Look for 'Content' (psst... it's got all the cool stuff! ✨)</li>
             <li>See a template you like? Grab it! (Yes, just drag and drop! 🎯)</li>
             <li>Boom! You're already halfway there! High five! 🙌</li>
           </ol>
         </div>
       </div>
     </div>
     
     <div class="bg-white/50 p-6 rounded-lg mb-6">
       <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
         <h5 class="font-semibold">Time for the Fun Part - Making It Yours! 🎨</h5>
         <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
           <div class="bg-white/70 p-4 rounded">
             <p class="mb-4">Here's all the cool stuff you can do:</p>
             <ul class="list-disc pl-4 space-y-2">
               <li><span class="font-semibold">Text Magic:</span> See that 'T' icon? Click it and let your creativity flow! ✍️</li>
               
               <li><span class="font-semibold">Layout Fun:</span> Mix it up! Try different templates until you find your perfect match! 💘</li>
               
               <li><span class="font-semibold">Media Time:</span> Pictures, videos, GIFs - the more, the merrier! 🎭</li>
               
               <li><span class="font-semibold">Style It Up:</span> Colors, fonts, spacing - go wild! (But maybe not too wild! 😉)</li>
             </ul>
           </div>
         </div>
       </div>
     </div>
 
     <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
       <h5 class="font-semibold">Want to Add Some Videos? Easy Peasy! 🎬</h5>
       <div class="bg-white/70 p-4 rounded mt-4">
         <p class="mb-4">Here's how to be a video wizard:</p>
         <ol class="list-decimal pl-4 space-y-2">
           <li>Grab that YouTube/Vimeo box and drop it wherever you want!</li>
           <li>See that little cog? Give it a click! ⚙️</li>
           <li>Time for the secret sauce - your video ID! 🔑</li>
           <li>Paste it in and watch the magic happen! ✨</li>
         </ol>
       </div>
     </div>

     <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
     <h5 class="font-semibold">🕵️‍♂️ Video ID Treasure Hunt!</h5>
     <div class="bg-white/70 p-4 rounded mt-4">
     <ul class="list-disc pl-4 space-y-2">
     <li>For YouTube Videos:
       <br>You: "Help! My URL is https://www.youtube.com/watch?v=JYvPnkp8500"
       <br>Me: "Easy! Grab 'JYvPnkp8500' - it's right after the 'v='"</li>
     <li>For Vimeo Adventures:
       <br>You: "I've got https://vimeo.com/922834495"
       <br>Me: "Snag those numbers after the slash - '922834495'! 🎪"</li>
     <li>Got a super long YouTube link? No sweat! 😎
       <br>Even if it looks scary like this:
       <br>https://www.youtube.com/watch?app=desktop&v=JOfK95bzwCA&list=PLWPirh4EWFpEK1RbpruFXrwgzcGUjZ4nV
       <br>Just grab 'JOfK95bzwCA' - it's always after 'v=' and before any '&' signs! 🎮</li>
     </ul>
     </div>
   </div>

 <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
     <h5 class="font-semibold">🌟 Pro Tips from Your Website BFF!</h5>
     <div class="bg-white/70 p-4 rounded mt-4">
     <ul class="list-disc pl-4 space-y-2">
     <li>Keep things organized - your visitors will thank you! 🙏</li>
     <li>Headings are like signposts - use them to guide the way! 🗺️</li>
     <li>Add some pizzazz with pictures and videos! 🎨</li>
     <li>Keep your style consistent - we're going for 'put together', not 'puzzle pieces'! 🧩</li>
   </ul>
     </div>
   </div>
 
     <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
       <h5 class="font-semibold">Quick Tips for the Win! 🏆</h5>
       <div class="bg-white/70 p-4 rounded mt-4">
       <ul class="list-disc pl-4 space-y-2">
       <li>Check how it looks on your phone - because everyone's scrolling these days! 📱</li>
       <li>Make sure those videos play nice - nobody likes a frozen screen! 🎥</li>
       <li>Keep your text snappy - we're not writing a novel here! 📚</li>
       <li>Break up text with fun stuff - because walls of text are so 2005! 🖼️</li>
       <li>Save early, save often! (Trust me on this one! 😅)</li>
     </ul>
       </div>
     </div>
 
     <br />
     <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
     <h5 class="font-semibold">One Last Thing! 🌈</h5>
     <p class="mt-2">Always take a sneak peek before showing off your masterpiece! 👀</p>
     <p class="mt-2">And pretty please, with sugar on top - don't forget to save! 🍪</p>
   </div>

 
     <div class="mt-6 text-center">
       <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Rock Your Website? 🎸</p>
       <p class="text-lg mt-2">Go ahead, make something awesome - you've totally got this! 🌟</p>
       </div>
   </div>
 </div>`, 
 "quiz": [
  {
  "question": "Where can you find Content templates in the interface?",
  "options": [
  "In the Settings menu",
  "Under the Layout section",
  "Under the Blocks section",
  "In the Theme options"
  ],
  "correct": 2
  },
  {
  "question": "Which icon should you click to edit text in a content block?",
  "options": [
  "Gear icon",
  "T icon",
  "Plus icon",
  "Edit icon"
  ],
  "correct": 1
  },
  {
  "question": "In a YouTube URL, where is the video ID located?",
  "options": [
  "After the v=",
  "At the beginning",
  "After the youtube.com",
  "At the end"
  ],
  "correct": 0
  },
  {
  "question": "In a Vimeo URL, how do you identify the video ID?",
  "options": [
  "It's before the domain",
  "It's in the middle",
  "It's the numbers after the forward slash",
  "It's in the query parameters"
  ],
  "correct": 2
  },
 
  {
  "question": "What should you do before publishing your content?",
  "options": [
  "Preview it",
  "Delete old content",
  "Change all fonts",
  "Add more text"
  ],
  "correct": 0
  },
 
  {
  "question": "What should you check your content on?",
  "options": [
  "Only desktop",
  "Only mobile",
  "Different devices",
  "Only tablets"
  ],
  "correct": 2
  },
 
  {
  "question": "For complex YouTube URLs, where should you look for the video ID?",
  "options": [
  "At the end",
  "After v= but before &",
  "At the beginning",
  "In the middle"
  ],
  "correct": 1
  },
 
  {
  "question": "What should you do with video embeds before publishing?",
  "options": [
  "Ignore them",
  "Delete them",
  "Test them",
  "Hide them"
  ],
  "correct": 2
  },
  {
  "question": "How often should you save your changes?",
  "options": [
  "Never",
  "Only at the end",
  "Regularly",
  "Once a day"
  ],
  "correct": 2
  },
 
  {
  "question": "Where do you find the detail editor for videos?",
  "options": [
  "In settings menu",
  "After clicking the cog icon",
  "In theme options",
  "In layout settings"
  ],
  "correct": 1
  },
 
  ]
      },
      {
        "id": 4,
        "title": "Countdown timers",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Create Engaging Countdown Timers! ⏰</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Countdown_timer(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Build Countdowns That Create Urgency & Drive Action! ✨</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "A well-designed countdown doesn't just show time - it creates excitement and motivates action through urgency! ⚡"
            <footer class="text-sm mt-2">- Conversion Design Expert</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Getting Started with Countdowns! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Here's your guide to creating effective countdown timers:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Choose timer format</li>
                  <li>Set clear deadlines</li>
                  <li>Add visual elements</li>
                  <li>Include call-to-actions</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Essential Elements! 📋</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li><span class="font-semibold">Timer display:</span> Clear digits!</li>
                  <li><span class="font-semibold">Labels:</span> Time units</li>
                  <li><span class="font-semibold">Animation:</span> Smooth ticking</li>
                  <li><span class="font-semibold">Mobile:</span> Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Design Best Practices! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Use clear typography</li>
                <li>Add visual separators</li>
                <li>Include progress bars</li>
                <li>Implement flip animations</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🤓 Countdown Psychology!</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Urgency increases conversions by 70%! 👀</li>
                <li>Visual timers boost engagement by 45%! 📊</li>
                <li>Mobile countdowns improve CTR by 55%! 📱</li>
                <li>Animated timers increase attention by 38%! 🎯</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🎯 Performance Tips</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Optimize animations 🖼️</li>
                <li>Use requestAnimationFrame 🚀</li>
                <li>Implement server sync ♾️</li>
                <li>Cache time calculations 💨</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Common Mistakes to Avoid! ⚠️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Inaccurate timers</li>
                <li>Missing time zones</li>
                <li>Poor mobile display</li>
                <li>Unclear deadlines</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
            <h5 class="font-semibold">Pro Tips! 💫</h5>
            <p class="mt-2">Track engagement metrics near deadlines!</p>
            <p class="mt-2">Use dynamic CTAs based on time left! ⚡</p>
          </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create Urgency? ⏱️</p>
            <p class="text-lg mt-2">Build countdown timers that motivate action and drive conversions!</p>
          </div>
        </div>
      </div>`,      
      "quiz": [
        {
          "question": "How much do countdown timers increase conversion rates?",
          "options": [
            "45%",
            "50%",
            "55%",
            "60%"
          ],
          "correct": 2
        },
        {
          "question": "By how much do visual timers boost engagement?",
          "options": [
            "28%",
            "33%",
            "38%",
            "43%"
          ],
          "correct": 2
        },
        {
          "question": "How much do mobile countdowns improve CTR?",
          "options": [
            "32%",
            "37%",
            "42%",
            "47%"
          ],
          "correct": 2
        },
        {
          "question": "By what percentage do animated timers increase attention?",
          "options": [
            "22%",
            "27%",
            "32%",
            "37%"
          ],
          "correct": 2
        },
        {
          "question": "What's most important for countdown design?",
          "options": [
            "Animation",
            "Accuracy",
            "Decoration",
            "Colors"
          ],
          "correct": 1
        },
        {
          "question": "What's a common countdown mistake?",
          "options": [
            "Clear display",
            "Regular updates",
            "Time zone issues",
            "Visual feedback"
          ],
          "correct": 2
        },
        {
          "question": "What improves countdown accessibility?",
          "options": [
            "More animation",
            "Semantic HTML",
            "Bright colors",
            "Gradients"
          ],
          "correct": 1
        },
        {
          "question": "What should be used for consistent styling?",
          "options": [
            "Inline styles",
            "Hard-coded values",
            "CSS custom properties",
            "Random values"
          ],
          "correct": 2
        },
        {
          "question": "What's essential for mobile countdowns?",
          "options": [
            "Animations",
            "Responsive digits",
            "Decorations",
            "Gradients"
          ],
          "correct": 1
        },
        {
          "question": "What helps increase countdown effectiveness?",
          "options": [
            "Random timers",
            "No labels",
            "Hidden digits",
            "Clear deadlines"
          ],
          "correct": 3
        }
      ]
      },
      {
        "id": 5,
        "title": "Dividers",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Divide and Conquer 💪</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Dividers(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Mastering Dividers! 🎨</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Dividers aren't just lines - they're the visual rhythm that guides your visitors through your content!"
          </blockquote>
      
          <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Why Use Dividers? 🤔</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Create clear visual separation between sections 📏</li>
                <li>Guide visitors' attention through your content 👀</li>
                <li>Add style and personality to your layout ✨</li>
                <li>Break up long content into digestible chunks 📚</li>
                <li>Enhance your site's visual hierarchy 🏗️</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Finding Your Perfect Divider 🔍</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li>Navigate to the blocks section</li>
                <li>Click on the navigation option</li>
                <li>Browse our divider collection:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Simple lines</li>
                    <li>Text-enhanced dividers</li>
                    <li>Dotted designs</li>
                    <li>Gradient effects</li>
                  </ul>
                </li>
                <li>Drag & drop your chosen divider onto the canvas</li>
              </ol>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Customization Magic ✨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <div class="mb-6">
                <p class="font-semibold mb-2">Text Customization:</p>
                <ul class="list-disc pl-4 space-y-2">
                  <li>Click the text element</li>
                  <li>Select the capital T icon</li>
                  <li>Edit your message</li>
                  <li>Style your text for impact!</li>
                </ul>
              </div>
      
              <div class="mb-6">
                <p class="font-semibold mb-2">Divider Settings (via the cog ⚙️):</p>
                <ul class="list-disc pl-4 space-y-2">
                  <li>Spacing controls:
                    <ul class="list-circle pl-6 mt-2">
                      <li>Adjust top margin</li>
                      <li>Adjust bottom margin</li>
                      <li>Fine-tune spacing for perfect balance</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      
          <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Background Brilliance 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click the divider's outline</li>
                <li>Select the cog icon</li>
                <li>Customize your background:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Choose background images 🖼️</li>
                    <li>Set background colors 🎨</li>
                    <li>Add overlay effects ✨</li>
                    <li>Adjust padding (top/bottom) 📏</li>
                    <li>Position background images 🎯</li>
                    <li>Enable/disable parallax effects 🌟</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
      
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Pro Tips 🌟</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Design Tips:
                  <ul class="list-circle pl-6 mt-2">
                    <li>Match dividers to your site's style</li>
                    <li>Use consistent spacing throughout</li>
                    <li>Choose readable fonts for text dividers</li>
                    <li>Consider mobile appearance</li>
                  </ul>
                </li>
                <li>Usage Tips:
                  <ul class="list-circle pl-6 mt-2">
                    <li>Don't overuse - less is more!</li>
                    <li>Ensure sufficient contrast</li>
                    <li>Test parallax on different devices</li>
                    <li>Keep text concise and impactful</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
      
          <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg">
            <h5 class="font-semibold">IMPORTANT REMINDERS! ⚠️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Always apply changes to save your work! 💾</li>
                <li>Preview on multiple screen sizes! 📱</li>
                <li>Check text readability with your background! 👀</li>
                <li>Maintain consistent style across your site! 🎨</li>
              </ul>
            </div>
          </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Divide and Conquer? ⚔️</p>
            <p class="text-lg mt-2">Let's make your content flow beautifully!</p>
            <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Great dividers are like great punctuation - they help tell your story better! 📖</p>
          </div>
        </div>
      </div>`,
      "quiz": [
         {
      "question": "Which settings can you adjust for a divider's background?",
      "options": [
        "Only color",
        "Only image",
        "Color and image",
        "Color, image, overlay, padding, position, and parallax"
      ],
      "correct": 3
    },
        {
          "question": "Where can you find divider options in the interface?",
          "options": [
            "Components section",
            "Blocks section",
            "Design menu",
            "Layout panel"
          ],
          "correct": 1
        },
        {
          "question": "How do you add a divider to your canvas?",
          "options": [
            "Click and select",
            "Copy and paste",
            "Drag and drop",
            "Double click"
          ],
          "correct": 2
        },
        {
          "question": "Which icon allows you to edit text in a divider?",
          "options": [
            "Capital T icon",
            "Pencil icon",
            "Text bubble icon",
            "Edit icon"
          ],
          "correct": 0
        },
     
        {
          "question": "What must you do after making changes to a divider?",
          "options": [
            "Refresh the page",
            "Preview changes",
            "Apply changes",
            "Save draft"
          ],
          "correct": 2
        },
        {
          "question": "What margin settings can be adjusted for dividers?",
          "options": [
            "Only top margin",
            "Only bottom margin",
            "Both top and bottom margins",
            "All margins (top, bottom, left, right)"
          ],
          "correct": 2
        },
       
        {
          "question": "What type of background effect can be enabled for dividers?",
          "options": [
            "Animation",
            "Parallax",
            "Transition",
            "Fade"
          ],
          "correct": 1
        },
    
        {
          "question": "How can you duplicate a divider?",
          "options": [
            "Copy and paste",
            "Use clone option",
            "Drag again from blocks",
            "Duplicate button"
          ],
          "correct": 1
        },
        {
          "question": "What happens if you don't apply changes to a divider?",
          "options": [
            "Changes save automatically",
            "Changes are lost",
            "A warning appears",
            "Changes are temporary"
          ],
          "correct": 1
        },
       
        {
          "question": "How do you adjust the spacing between divider content and other elements?",
          "options": [
            "Using margin settings",
            "Using padding settings",
            "Using spacing tool",
            "Using gap adjustment"
          ],
          "correct": 0
        },
      
      ]
      },
      {
        "id": 6,
        "title": "Embeds",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey Code Enthusiasts! Let's Talk About Embeds! 🚀</h2>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Unleash Your Inner Developer? 👩‍💻👨‍💻</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Code is poetry written in logic, and embeds are your canvas!" 
            <footer class="text-sm mt-2">- Every Happy Developer Ever 💻</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Getting Started with Embeds! 🎯</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Hey there, future code wizard! Let's get you started with embeds - it's super easy:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Head over to the Components section (that's where the good stuff is!)</li>
                  <li>Find that shiny embed template waiting for you</li>
                  <li>Drag it onto your canvas (anywhere you like - you're the boss!)</li>
                  <li>Click on it and - boom! - you'll see two icons when you click on the template: the code symbol </> (your new best friend) and the delete icon (just in case!)</li>
                </ol>
              </div>
              <!-- Added screenshot image -->
              <div class="w-full flex justify-center mb-6">
                <img 
                  src="https://awb-silk.vercel.app/Screenshot%20(862).png" 
                  alt="Zylosite Website Builder Interface" 
                  class="rounded-lg shadow-lg border border-gray-200"
                />
              </div>
            </div>
          </div>
      
          <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-6">
          <h5 class="font-semibold">Quick Guide to add Media Elements 📱</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <div class="space-y-6">
              <!-- Image Section -->
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-700 mb-2">📸 Images: A picture's worth a thousand words!</p>
                <code class="text-sm block">
                  &lt;!-- Basic responsive image --&gt;<br/>
                  &lt;img 
                    src="cool-pic.jpg"
                    alt="A super cool picture"
                    width="800"
                    height="600"
                    loading="lazy"
                  &gt;
                  
                  &lt;!-- Modern picture element --&gt;<br/>
                  &lt;picture&gt;
                    &lt;source media="(min-width: 800px)" srcset="big.jpg"&gt;
                    &lt;source media="(min-width: 400px)" srcset="medium.jpg"&gt;
                    &lt;img src="small.jpg" alt="Responsive image"&gt;
                  &lt;/picture&gt;
                </code>
              </div>
         
              <!-- Video Section -->
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-700 mb-2">🎥 Videos: When still images just won't cut it!</p>
                <code class="text-sm block">
                  &lt;!-- Video with all the bells & whistles --&gt;<br/>
                  &lt;video 
                    controls
                    width="100%" 
                    autoplay 
                    muted
                    loop
                    poster="preview.jpg"
                  &gt;
                    &lt;source src="video.mp4" type="video/mp4"&gt;
                    &lt;source src="video.webm" type="video/webm"&gt;
                    &lt;track 
                      src="captions.vtt" 
                      kind="captions" 
                      srclang="en" 
                      label="English"
                    &gt;
                    Oops! Video not supported 😅
                  &lt;/video&gt;
                </code>
              </div>
         
              <!-- Audio Section -->
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-700 mb-2">🎵 Audio: Let's make some noise!</p>
                <code class="text-sm block">
                  &lt;!-- Audio player with fallbacks --&gt;<br/>
                  &lt;audio 
                    controls
                    preload="auto"
                    loop
                  &gt;
                    &lt;source src="tune.mp3" type="audio/mpeg"&gt;
                    &lt;source src="tune.ogg" type="audio/ogg"&gt;
                    &lt;p&gt;
                      No audio support? Time to upgrade! 🎧
                    &lt;/p&gt;
                  &lt;/audio&gt;
                </code>
              </div>
            </div>
          </div>
         </div>
      
          <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-6">
            <h5 class="font-semibold">CSS - Making Things Pretty! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Time to add some style to your life! With CSS you can:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li>Paint your elements with gorgeous colors</li>
                <li>Add animations that'll make your users go "Wow!" 😲</li>
                <li>Create responsive layouts that look great everywhere</li>
                <li>Style your content to match your brand perfectly</li>
              </ul>
              <div class="bg-gray-100 p-4 mt-4 rounded">
                <p class="text-sm text-gray-600">Example: Want a fancy button that glows on hover?</p>
                <code class="text-sm block mt-2">
                  .awesome-button {<br/>
                  &nbsp;&nbsp;background: linear-gradient(45deg, #ff6b6b, #ff8e53);<br/>
                  &nbsp;&nbsp;transition: all 0.3s ease;<br/>
                  }<br/>
                  <br/>
                  .awesome-button:hover {<br/>
                  &nbsp;&nbsp;box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);<br/>
                  }
                </code>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-6">
            <h5 class="font-semibold">JavaScript - Where the Magic Happens! ✨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Now we're talking! JavaScript brings your embeds to life:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li>Add interactivity that responds to user actions</li>
                <li>Create dynamic content that updates in real-time</li>
                <li>Handle data and make API calls like a ninja</li>
                <li>Build complex applications right in your embed!</li>
              </ul>
              <div class="bg-gray-100 p-4 mt-4 rounded">
                <p class="text-sm text-gray-600">Example: Want to create a fun counter?</p>
                <code class="text-sm block mt-2">
                  let count = 0;<br/>
                  <br/>
                  function updateCounter() {<br/>
                  &nbsp;&nbsp;count++;<br/>
                  &nbsp;&nbsp;document.getElementById('counter').textContent = count;<br/>
                  &nbsp;&nbsp;if (count === 100) alert('You're awesome! 🎉');<br/>
                  }
                </code>
              </div>
            </div>
          </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">🤓 Did You Know? Fun Code Facts!</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li>The first web embed was a simple hit counter in the 90s - now look how far we've come! 📊</li>
              <li>JavaScript was created in just 10 days! Talk about a speedrun! 🏃‍♂️</li>
              <li>HTML was inspired by tags used in book publishing - meta, right? 📚</li>
              <li>CSS almost had a competitor called DSSSL - try saying that five times fast! 😅</li>
              <li>The first animated GIF was of a rotating globe - and we've been embedding spinning things ever since! 🌍</li>
            </ul>
          </div>
        </div>

        
    
        <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">🔍 Myth Busters: Code Edition!</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <div class="space-y-4">
              <div class="border-b pb-4">
                <p class="font-semibold">Myth: "You need to be a math genius to code" 🔢</p>
                <p class="mt-2">Reality: While some coding involves math, most web development is about logic and creativity. If you can solve puzzles, you can code! 🧩</p>
              </div>
              
              <div class="border-b pb-4">
                <p class="font-semibold">Myth: "More code = better code" 📝</p>
                <p class="mt-2">Reality: Clean, efficient code often means writing less! It's about quality over quantity, folks! 🎯</p>
              </div>
              
              <div class="border-b pb-4">
                <p class="font-semibold">Myth: "Embeds slow down your site" 🐌</p>
                <p class="mt-2">Reality: Well-optimized embeds can actually improve user experience and functionality! It's all about how you implement them. ⚡</p>
              </div> 
              <div class="border-b pb-4">
              <p class="font-semibold">Myth: "HTML is a programming language" </p>
              <p class="mt-2">Reality: HTML is not considered a programming language because it does not contain any programming logic which is needed to write a program. </p>
            </div>
              
              <div>
                <p class="font-semibold">Myth: "You need to memorize every code syntax" 🧠</p>
                <p class="mt-2">Reality: Even senior developers Google basic syntax! It's about understanding concepts, not memorizing everything! 🔍</p>
              </div>
            </div>
          </div>
        </div>


        <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Web Dev Abbreviations 📚</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
          <li><span class="font-bold">HTML</span> - HyperText Markup Language</li>
          <li><span class="font-bold">CSS</span> - Cascading Style Sheets</li>
          <li><span class="font-bold">JS</span> - JavaScript</li>
       </ul>
        </div>
      </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Code Something Amazing? 🚀</p>
            <p class="text-lg mt-2">Remember, every awesome website started with a single line of code! Go forth and create something incredible! 💫</p>
          </div>
        </div>
      </div>
      `,
      "quiz": [
        {
          "question": "What does HTML stand for?",
          "options": [
            "Hyper Transfer Markup Language",
            "HyperText Markup Language",
            "High Text Markup Language",
            "Hyper Technical Modern Language"
          ],
          "correct": 1
        },
        {
          "question": "Where can you find the embed template in the interface?",
          "options": [
            "In the Edit menu",
            "In the Components section",
            "In the Settings panel",
            "In the Format menu"
          ],
          "correct": 1
        },
        {
          "question": "Which icons appear when you click on an embed?",
          "options": [
            "Edit and delete icons",
            "Code symbol and delete icon",
            "Settings and code icons",
            "Copy and paste icons"
          ],
          "correct": 1
        },
        {
          "question": "What type of code can you include in an embed?",
          "options": [
            "Only HTML",
            "Only JavaScript",
            "Only CSS",
            "HTML, CSS, and JavaScript"
          ],
          "correct": 3
        },
        {
          "question": "How do you add custom code to an embed?",
          "options": [
            "Click the code symbol and paste code",
            "Right-click and select 'Add Code'",
            "Double-click the embed",
            "Use the settings panel"
          ],
          "correct": 0
        },
        {
          "question": "What is the primary purpose of HTML in an embed?",
          "options": [
            "Adding styling",
            "Creating animations",
            "Structuring content",
            "Handling events"
          ],
          "correct": 2
        },
        {
          "question": "Which language is used for styling in embeds?",
          "options": [
            "JavaScript",
            "HTML",
            "CSS",
            "Python"
          ],
          "correct": 2
        },
        {
          "question": "What is JavaScript primarily used for in embeds?",
          "options": [
            "Structuring content",
            "Styling elements",
            "Adding interactivity",
            "Creating layouts"
          ],
          "correct": 2
        },
        {
          "question": "What does CSS mean?",
          "options": [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Controlled Style System"
          ],
          "correct": 2
        },
        {
          "question": "How can you add external resources like photos and videos to an embed?",
          "options": [
            "Using link and script tags",
            "Importing directly in JavaScript",
            "Adding them to the settings",
            "Through the format menu"
          ],
          "correct": 0
        }
      ]
    },
    {
      "id": 7,
      "title": "Features",
      "content": `<div class="space-y-6">
      <h2 class="text-2xl font-bold">Feature Templates - Let's Get Started! 📝</h2>
      <video className="w-full rounded-lg" controls>
      <source src="https://awb-silk.vercel.app/Features(720p).mp4" type="video/mp4" />
      Your browser does not support the video tag.
      </video><br>
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
      <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Add More Details? 📋</h3> 
      <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
      "Feature templates help you provide detailed information about someone or something in a clear, organized way!"
     <footer class="text-sm mt-2">- Your Design Assistant</footer>
   </blockquote>

   <div class="bg-white/50 p-6 rounded-lg mb-6">
     <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
       <h5 class="font-semibold">Let's Begin! 🚀</h5>
       <div class="bg-white/70 p-4 rounded mt-4">
         <p class="mb-4">Here's how to use feature templates:</p>
         <ol class="list-decimal pl-4 space-y-2">
           <li>Navigate to the Components section</li>
           <li>Find the Feature Templates option</li>
           <li>Choose from different layout options</li>
           <li>Add your content - it's that simple!</li>
         </ol>
       </div>
     </div>
   </div>
   
   <div class="bg-white/50 p-6 rounded-lg mb-6">
     <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
       <h5 class="font-semibold">Customizing Your Feature Template 🎨</h5>
       <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
         <div class="bg-white/70 p-4 rounded">
           <p class="mb-4">Here's what you can customize:</p>
           <ul class="list-disc pl-4 space-y-2">
             <li><span class="font-semibold">Icons:</span> Choose from our icon library to match your content</li>
             
             <li><span class="font-semibold">Text:</span> Replace the placeholder text with your information</li>
             
             <li><span class="font-semibold">Layout:</span> Adjust the layout to fit your needs</li>
             
             <li><span class="font-semibold">Design:</span> Customize colors and styles to match your brand</li>
           </ul>
         </div>
       </div>
     </div>
   </div>

   <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
     <h5 class="font-semibold">Making Changes to Your Template ⚙️</h5>
     <div class="bg-white/70 p-4 rounded mt-4">
       <p class="mb-4">Follow these steps to customize:</p>
       <ol class="list-decimal pl-4 space-y-2">
         <li>Select your feature template</li>
         <li>Click the settings icon to open customization options</li>
         <li>You'll see these options:
           <ul class="list-disc pl-6 mt-2">
             <li>Icon selection - choose your preferred icon</li>
             <li>Text editor - update your content</li>
             <li>Layout options - adjust the design</li>
           </ul>
         </li>
         <li>Make your desired changes</li>
         <li>Save your updates</li>
       </ol>
     </div>
   </div>

   <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
   <h5 class="font-semibold">📚 Tips for Great Feature Templates</h5>
   <div class="bg-white/70 p-4 rounded mt-4">
   <ul class="list-disc pl-4 space-y-2">
   <li>Keep your descriptions clear and concise 📝</li>
   <li>Use relevant icons that complement your content 🎯</li>
   <li>Maintain consistent spacing and alignment 📏</li>
   <li>Structure your information logically 🧩</li>
   <li>Use headings to organize content sections ✨</li>
   <li>Preview your changes before saving 👀</li>
   </ul>
   </div>
 </div>

<div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
   <h5 class="font-semibold">🎯 Best Practices</h5>
   <div class="bg-white/70 p-4 rounded mt-4">
   <ul class="list-disc pl-4 space-y-2">
   <li>Use clear and descriptive headings 📖</li>
   <li>Maintain consistent formatting throughout 📋</li>
   <li>Choose icons that enhance understanding 🎨</li>
   <li>Keep your content organized and scannable 📱</li>
 </ul>
   </div>
 </div>

   <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
     <h5 class="font-semibold">Quick Tips for Success! 💡</h5>
     <div class="bg-white/70 p-4 rounded mt-4">
     <ul class="list-disc pl-4 space-y-2">
     <li>Preview your template on different screen sizes 📱</li>
     <li>Test all interactive elements before saving 🔍</li>
     <li>Keep your content consistent across templates ✨</li>
     <li>Update content regularly to keep it relevant 🔄</li>
     <li>Remember to save your changes! 💾</li>
   </ul>
     </div>
   </div>

   <br />
   <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
   <h5 class="font-semibold">Important Reminder! ⭐</h5>
   <p class="mt-2">Always save your changes before leaving the editor!</p>
   <p class="mt-2">Your work is valuable - don't forget to preserve it! 💾</p>
 </div>


   <div class="mt-6 text-center">
     <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create Your Feature Templates? ✨</p>
     <p class="text-lg mt-2">Start designing and make your content shine!</p>
     </div>
 </div>
</div>`,
"quiz": [
  {
  "question": "Where can you find Feature Templates in the interface?",
  "options": [
  "In the Settings menu",
  "Under the Layout section",
  "Under the Components section",
  "In the Theme options"
  ],
  "correct": 2
  },
  
  {
  "question": "What should you do before leaving the editor?",
  "options": [
  "Close the browser",
  "Delete the template",
  "Preview the changes",
  "Save your changes"
  ],
  "correct": 3
  },
  
  {
  "question": "What is the primary purpose of Feature Templates?",
  "options": [
  "To add animations",
  "To provide detailed information",
  "To change colors",
  "To add videos"
  ],
  "correct": 1
  },
  {
  "question": "What's recommended for organizing content in Feature Templates?",
  "options": [
  "Random placement",
  "Using headings",
  "Adding more images",
  "Removing text"
  ],
  "correct": 1
  },
  {
  "question": "What should you check before finalizing your feature template?",
  "options": [
  "Website traffic",
  "User comments",
  "Different screen sizes",
  "Server status"
  ],
  "correct": 2
  },
  {
  "question": "What element helps complement the content in Feature Templates?",
  "options": [
  "Videos",
  "Animations",
  "Icons",
  "Audio"
  ],
  "correct": 2
  },
 
 
  {
  "question": "What type of spacing should be maintained in Feature Templates?",
  "options": [
  "Random spacing",
  "Minimal spacing",
  "Consistent spacing",
  "Maximum spacing"
  ],
  "correct": 2
  },
  {
  "question": "What should you do after making changes to your template?",
  "options": [
  "Close immediately",
  "Preview changes",
  "Delete backup",
  "Change password"
  ],
  "correct": 1
  },
  {
  "question": "What's included in the customization options?",
  "options": [
  "Icon selection only",
  "Text editor only",
  "Layout options only",
  "All of the above"
  ],
  "correct": 3
  },
  {
  "question": "How should headings be used in Feature Templates?",
  "options": [
  "Descriptively",
  "Randomly",
  "Sparingly",
  "Not at all"
  ],
  "correct": 0
  },
 
  ]
    },
      {
        "id": 8,
        "title": "Footers",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Let's Make Your Footer Fantastic! 👣 The Ultimate Guide</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Footer(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Your Footer, Your Style! 🎨</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "The footer isn't just the bottom of your page - it's the foundation of your site's navigation, branding, and user experience!"
          </blockquote>
  
          <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Why Footers Matter </h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>They're your site's navigation hub - like a mini map for visitors! 🗺️</li>
                <li>Perfect spot for contact info - make it easy for people to reach you! 📞</li>
                <li>Great for SEO - search engines love well-structured footers! 🔍</li>
                <li>Builds trust - shows you're a legit business with all the important info right there! 🤝</li>
                <li>Keeps visitors engaged - gives them more places to explore! 🌟</li>
              </ul>
            </div>
          </div>
  
          <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Finding Your Perfect Footer 👣</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li class="mb-4">Navigate to the blocks section </li>
                <li class="mb-4">Click on the navigation option</li>
                <li class="mb-4">Browse our footer collection:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Simple and clean designs</li>
                    <li>Multi-column layouts</li>
                    <li>Newsletter-focused footers</li>
                    <li>Social media-heavy options</li>
                    <li>Business-focused layouts</li>
                  </ul>
                </li>
                <li>Drag & drop your favorite onto the canvas</li>
              </ol>
            </div>
          </div>
  
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Customization Station 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <div class="mb-6">
                <p class="font-semibold mb-2">Basic Controls:</p>
                <ul class="list-disc pl-4 space-y-2">
                  <li>Click any element to reveal its menu! </li>
                  <li>Change text </li>
                  <li>Clone elements (because sometimes one isn't enough! 👯‍♂️)</li>
                  <li>Delete stuff (when less is more! 🗑️)</li>
                  <li>Drag to rearrange (find that perfect spot! 🎯)</li>
                </ul>
              </div>
  
              <div class="mb-6">
                <p class="font-semibold mb-2">Advanced Editing (via the mechanical cog ⚙️):</p>
                <ul class="list-disc pl-4 space-y-2">
                  <li>Typography options:
                    <ul class="list-circle pl-6 mt-2">
                      <li>Font styles (get fancy! 🎩)</li>
                      <li>Text sizes (big or small, we've got it all! 📏)</li>
                      <li>Colors (rainbow time! 🌈)</li>
                      <li>Spacing (give your text room to breathe! 💨)</li>
                    </ul>
                  </li>
                  <li>Layout tweaks:
                    <ul class="list-circle pl-6 mt-2">
                      <li>Column widths (perfect proportions! 📐)</li>
                      <li>Alignment (everything in its place! ⚖️)</li>
                      <li>Padding and margins (spacing is everything! 📏)</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Social Media Masterclass ✨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <div class="mb-6">
                <p class="font-semibold mb-2">Icon Customization:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Click any social icon (they don't bite! 😉)</li>
                  <li>Find the trusty cog icon ⚙️</li>
                  <li>Enter the magical detailed editor where you can:
                    <ul class="list-disc pl-6 mt-2">
                      <li>Style your icons:
                        <ul class="list-circle pl-6 mt-2">
                          <li>Pick your colors (go wild! 🎨)</li>
                          <li>Change sizes (tiny or mighty! 📏)</li>
                          <li>Add hover effects (ooh, fancy! ✨)</li>
                        </ul>
                      </li>
                      <li>Add your links:
                        <ul class="list-circle pl-6 mt-2">
                          <li>Paste your profile URLs 🔗</li>
                          <li>Set "Open link in new tab" for new tabs 📑</li>
                        </ul>
                      </li>
                      <li>Choose different icons:
                        <ul class="list-circle pl-6 mt-2">
                          <li>Scroll through our huge collection 📜</li>
                          <li>Preview before applying 👀</li>
                          <li>Mix and match styles 🎨</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          </div>
  
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Footer Content Ideas 💡</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Essential Links:
                  <ul class="list-circle pl-6 mt-2">
                    <li>About Us (tell your story! 📖)</li>
                    <li>Contact Info (be reachable! 📞)</li>
                    <li>Privacy Policy (keep it legal! ⚖️)</li>
                    <li>Terms of Service (set the rules! 📜)</li>
                  </ul>
                </li>
                <li>Cool Features:
                  <ul class="list-circle pl-6 mt-2">
                    <li>Newsletter signup (grow that list! 📧)</li>
                    <li>Social media feeds (stay connected! 🤳)</li>
                    <li>Recent blog posts (fresh content! 📚)</li>
                    <li>Awards & certifications (show off a little! 🏆)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Common Footer Mistakes to Avoid! 🚫</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Too much information (don't overwhelm! 😵)</li>
                <li>Broken links (test everything! 🔍)</li>
                <li>Outdated social media links (keep it fresh! 🌱)</li>
                <li>Inconsistent styling (match your brand! 🎨)</li>
                <li>No mobile optimization (small screens matter! 📱)</li>
              </ul>
            </div>
          </div>
  
          <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Pro Tips & Tricks 🧙‍♂️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Layout Tips:
                  <ul class="list-circle pl-6 mt-2">
                    <li>Keep important links above the fold</li>
                    <li>Group similar items together</li>
                    <li>Use clear headings for sections</li>
                    <li>Maintain breathing room between elements</li>
                  </ul>
                </li>
                <li>Style Tips:
                  <ul class="list-circle pl-6 mt-2">
                    <li>Match your website's color scheme</li>
                    <li>Use consistent icon styles</li>
                    <li>Keep fonts readable</li>
                    <li>Mind the contrast for accessibility</li>
                  </ul>
                </li>
                <li>Content Tips:
                  <ul class="list-circle pl-6 mt-2">
                    <li>Update contact info regularly</li>
                    <li>Check links often</li>
                    <li>Refresh content seasonally</li>
                    <li>Add new social platforms as needed</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg">
            <h5 class="font-semibold">SUPER IMPORTANT! ⚠️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Always click 'Apply Changes' to save your work! 💾</li>
                <li>Preview on mobile before publishing! 📱</li>
                <li>Test all links before going live! 🔍</li>
                <li>Keep your footer style consistent with your site's theme 🎨</li>
              </ul>
            </div>
          </div>
  
          <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Rock Your Footer? 🎸</p>
            <p class="text-lg mt-2">Let's make your site's foundation rock solid! </p>
            <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: A great footer is like a great friend - always there behind you when you need it! 🤝</p>
          </div>
        </div>
      </div>`,
      "quiz": [
        {
          "question": "Where can you find the footer options in Zylosite?",
          "options": [
            "In the pages section",
            "Under the blocks section in navigation",
            "In the media gallery",
            "In site settings"
          ],
          "correct": 1
        },
        {
          "question": "What icon do you need to click to access detailed footer element settings?",
          "options": [
            "Plus icon",
            "Cog/gear icon",
            "Star icon",
            "Menu icon"
          ],
          "correct": 1
        },
        {
          "question": "What happens when you click on a social media icon in the footer?",
          "options": [
            "It immediately opens the social media site",
            "Nothing happens",
            "A menu appears with options",
            "It gets deleted"
          ],
          "correct": 2
        },
        {
          "question": "How do you add a footer to your canvas?",
          "options": [
            "Type it manually",
            "Import from another site",
            "Drag and drop from the footer designs",
            "Copy and paste"
          ],
          "correct": 2
        },
       
        {
          "question": "How do you save changes made to footer elements?",
          "options": [
            "Changes save automatically",
            "Click 'Apply Changes'",
            "Press Enter",
            "Close the editor"
          ],
          "correct": 1
        },
        {
          "question": "What's the recommended way to organize footer content?",
          "options": [
            "Put everything in one column",
            "Group similar items together",
            "Randomly arrange items",
            "Leave it as default"
          ],
          "correct": 1
        },
        {
          "question": "What should you do before publishing your footer?",
          "options": [
            "Nothing special",
            "Print it out",
            "Test all links",
            "Delete old content"
          ],
          "correct": 2
        },
       
        {
          "question": "What type of content is recommended for footers?",
          "options": [
            "Only contact information",
            "Only social media links",
            "Essential links, contact info, and social media",
            "Decorative elements only"
          ],
          "correct": 2
        },
    
        {
          "question": "When changing social media icons, what should you check?",
          "options": [
            "Only the color",
            "Only the size",
            "That the URL is correct",
            "The icon name"
          ],
          "correct": 2
        },
        {
          "question": "What's the purpose of cloning footer elements?",
          "options": [
            "To create backups",
            "To duplicate identical elements",
            "To test different styles",
            "To fix broken links"
          ],
          "correct": 1
        }
      ]
      },
      {
        "id": 9,
        "title": "Gallery",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">🖼️ Picture Perfect! Let's Create Your Dream Gallery! 📸</h2>
        
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Show Off Your Amazing Images? 🌟</h3>
            <video className="w-full rounded-lg" controls>
            <source src="https://awb-silk.vercel.app/Gallery(720p).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video><br>
            <blockquote class="border-l-4 border-purple-500 pl-4 italic mb-4 text-lg">
                "A picture is worth a thousand words - let's make yours worth a million! 📸"
            </blockquote>
        
            <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Let's Get Those Photos Rolling! 🚀</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <p class="mb-4">Creating your stunning gallery is easier than you think! Here's your step-by-step guide:</p>
                    <ol class="list-decimal pl-4 space-y-2">
                        <li>Head to the blocks section (that's where all the gallery templates live! ✨)</li>
                        <li>Browse through our collection of gallery layouts (grid, masonry, carousel - we've got them all! 🎯)</li>
                        <li>Found the perfect one? Just drag and drop it onto your canvas (it's that simple! 🎨)</li>
                        <li>Time to make it yours - let's dive into customization! 🚀</li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Making Your Gallery Gorgeous! 🌈</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <div class="space-y-6">
                        <div class="bg-white/50 p-4 rounded">
                            <h6 class="font-semibold mb-2">1. Style Settings Spectacular! 🎨</h6>
                            <p class="mb-2">Let's make those images pop with amazing styles:</p>
                            
                            <div class="bg-purple-50/50 p-3 rounded mb-4">
                                <p class="font-semibold">Border Radius Magic 🔄</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Top-Left Radius: Perfect for creating that subtle curved corner - try values from 0-50px!</li>
                                    <li>Top-Right Radius: Match it with the left or go asymmetrical - your choice!</li>
                                    <li>Bottom-Left Radius: Keep the flow going with matching corners</li>
                                    <li>Bottom-Right Radius: Complete the look with your perfect curve</li>
                                    <li>Pro tip: Use matching values for a uniform look, or mix it up for creative flair! 🎯</li>
                                </ul>
                            </div>

                            <div class="bg-blue-50/50 p-3 rounded mb-4">
                                <p class="font-semibold">Border Brilliance ✨</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Border Color: Pick from our color picker or use hex codes for perfect matching!</li>
                                    <li>Border Style Options:
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Solid: Clean and professional</li>
                                            <li>Dashed: Fun and playful</li>
                                            <li>Dotted: Subtle and decorative</li>
                                            <li>Double: Bold and distinctive</li>
                                        </ul>
                                    </li>
                                    <li>Border Width: From hairline thin (1px) to bold and dramatic (10px+)</li>
                                </ul>
                            </div>

                            <div class="bg-green-50/50 p-3 rounded">
                                <p class="font-semibold">Spacing & Layout 📐</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Gap Control: Adjust spacing between images</li>
                                    <li>Padding Options: Give your images breathing room</li>
                                    <li>Alignment Tools: Perfect positioning every time</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-white/50 p-4 rounded">
                            <h6 class="font-semibold mb-2">2. Image Management Central! 📸</h6>
                            <p class="mb-2">Three fantastic ways to populate your gallery:</p>
                            
                            <div class="bg-yellow-50/50 p-3 rounded mb-4">
                                <p class="font-semibold">My Images (1000MB Storage) 🗂️</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Upload your own images directly</li>
                                    <li>Organize into folders for easy access</li>
                                    <li>Quick search and filter options</li>
                                    <li>Drag and drop upload support</li>
                                </ul>
                            </div>

                            <div class="bg-orange-50/50 p-3 rounded mb-4">
                                <p class="font-semibold">Other Images 🌅</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Import from external sources</li>
                                    <li>URL image support</li>
                                    <li>Bulk import capabilities</li>
                                    <li>Format conversion tools</li>
                                </ul>
                            </div>

                            <div class="bg-pink-50/50 p-3 rounded">
                                <p class="font-semibold">Free Stock Images 🎭</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Browse thousands of professional images</li>
                                    <li>Filter by category, color, or style</li>
                                    <li>One-click import to your gallery</li>
                                    <li>Always-free selection</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-white/50 p-4 rounded">
                            <h6 class="font-semibold mb-2">3. Image Dimension Mastery 📏</h6>
                            <div class="space-y-4">
                                <div class="bg-purple-50/50 p-3 rounded">
                                    <p class="font-semibold">Size Control 🎮</p>
                                    <ul class="list-disc pl-4">
                                        <li>Width adjustment: Pixel-perfect control</li>
                                        <li>Height adjustment: Keep everything proportional</li>
                                        <li>Aspect ratio lock: Maintain image integrity</li>
                                        <li>Responsive sizing options: Looks great on all devices!</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white/50 p-4 rounded">
                            <h6 class="font-semibold mb-2">4. Quick Access Toolbox 🛠️</h6>
                            <div class="space-y-4">
                                <div class="bg-purple-50/50 p-3 rounded">
                                    <p class="font-semibold">Essential Controls ⚙️</p>
                                    <ul class="list-disc pl-4">
                                        <li>Settings Gear Icon: Your gateway to all customization options</li>
                                        <li>Clone Button: Duplicate your perfectly styled galleries in one click</li>
                                        <li>Delete Option: Start fresh when you need to</li>
                                        <li>Quick Edit: Right-click shortcuts for faster workflows</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
            <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Pro Tips for Gallery Greatness! 💫</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li>Keep image sizes consistent (neat and tidy wins the race! 📏)</li>
                        <li>Choose high-quality images (no fuzzy photos here! 🔍)</li>
                        <li>Consider your layout flow (make it easy on the eyes! 👀)</li>
                        <li>Test on mobile (looking good everywhere! 📱)</li>
                        <li>Mix up your content (variety is the spice of life! 🌶️)</li>
                        <li>Loading Speed: Optimize your images for web performance 🚀</li>
                        <li>Alt Text: Don't forget accessibility for all images! ♿</li>
                    </ul>
                </div>
            </div>
    
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">⚠️ Don't Forget! Super Important! ⚠️</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <p class="text-lg font-semibold text-red-600 dark:text-red-400">👉 Hit that "Apply Changes" button before you go! 💾</p>
                    <li>Preview your gallery before publishing 👀</li>
                    <li>Check all image links are working 🔗</li>
                    <li>Back up your original images somewhere safe 🔒</li>
                    <p class="mt-2">Keep your gorgeous gallery safe and sound. Don't lose your hard work!</p>
                </div>
            </div>
    
            <div class="mt-6 text-center">
                <p class="text-xl font-bold text-purple-600 dark:text-purple-300">Ready to Create Your Stunning Gallery? 🌟</p>
                <p class="text-lg mt-2">Your images deserve the perfect showcase - let's make it happen! ✨</p>
                <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Every picture tells a story - make yours unforgettable! 📖</p>
            </div>
        </div>
    </div>`,
    "quiz": [
      {
        "question": "What's the first step to add a gallery to your canvas?",
        "options": [
          "Upload images first",
          "Go to blocks section and choose gallery template",
          "Configure settings",
          "Set dimensions"
        ],
        "correct": 1
      },
      {
        "question": "How much storage is available in 'My Images'?",
        "options": [
          "500MB",
          "750MB",
          "1000MB",
          "2000MB"
        ],
        "correct": 2
      },
    
      {
        "question": "Which image sources are available in the gallery?",
        "options": [
          "My Images only",
          "My Images and Free Stock Images",
          "My Images, Other Images, Free Stock Images",
          "Free Stock Images only"
        ],
        "correct": 2
      },
      {
        "question": "What can you adjust in border radius settings?",
        "options": [
          "Only top corners",
          "Only bottom corners",
          "All four corners individually",
          "Only left corners"
        ],
        "correct": 2
      },
      {
        "question": "What's recommended for mobile optimization?",
        "options": [
          "Only use small images",
          "Preview on different screen sizes",
          "Remove border styles",
          "Use basic layouts only"
        ],
        "correct": 1
      },
   
      {
        "question": "What's the recommended approach for image consistency?",
        "options": [
          "Use only square images",
          "Keep dimensions similar",
          "Use only vertical images",
          "Use only horizontal images"
        ],
        "correct": 1
      },
      {
        "question": "Which feature allows quick gallery duplication?",
        "options": [
          "Copy-paste",
          "Clone button",
          "Duplicate option",
          "Right-click menu"
        ],
        "correct": 1
      },
 
      {
        "question": "What's essential for saving your gallery changes?",
        "options": [
          "Close the editor",
          "Click Apply Changes",
          "Refresh the page",
          "Preview the gallery"
        ],
        "correct": 1
      },
    
      {
        "question": "What can you control in spacing settings?",
        "options": [
          "Gap between images only",
          "Padding only",
          "Gap control, padding, and alignment",
          "Image size only"
        ],
        "correct": 2
      },
   
      {
        "question": "What's recommended for image optimization?",
        "options": [
          "High resolution only",
          "Low resolution only",
          "Balance between quality and file size",
          "Maximum file size"
        ],
        "correct": 2
      },
    
    ]
      },
      {
        "id": 10,
        "title": "Headers",
        "content": `<div class="space-y-6">
          <h2 class="text-2xl font-bold">Let's Create Awesome Headers! 🎨</h2>
          <video className="w-full rounded-lg" controls>
          <source src="https://awb-silk.vercel.app/Header(720p).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video><br>
          <div class="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Make That First Impression Count! 🌟</h3>
            
            <blockquote class="border-l-4 border-indigo-500 pl-4 italic mb-4 text-lg">
              "Your header is your website's handshake - make it firm, friendly, and memorable!" 
            </blockquote>

            <div className="bg-white/70 p-4 rounded mt-4">
            <h4 class="text-xl font-semibold mb-4">Let's Create Your Header! ✨</h4>
            <p className="mb-4">Building the perfect header is just a few clicks away!</p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Navigate to the Blocks section</li>
              <li>Click on the Headers option</li>
              <li>Browse beautiful header designs</li>
              <li>Drag your favorite to the canvas ⭐</li>
            </ol>
          </div>

          <div className="bg-white/70 p-4 rounded mt-4">
          <h4 class="text-xl font-semibold mb-4">Customize Like a Pro! 🎨</h4>
          <p class="mb-2">Master these essential tools:</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Capital T: Edit any text element 📝</li>
            <li>Cog Icon: Access style settings for backgrounds, colors, spacing ⚙️</li>
            <li>Clone Icon: Duplicate your header design 📋</li>
            <li>Trash Icon: Remove unwanted elements 🗑️</li>
            <li>Apply Settings: Save your masterpiece! 💾</li>
          </ul>
        </div>
      </div>
      
            <div class="bg-white/50 p-6 rounded-lg mb-6">
              <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Header Must-Haves! 🎯</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                  <p class="mb-4">Here's your header checklist for success:</p>
                  <ol class="list-decimal pl-4 space-y-2">
                    <li>Clear, visible logo or brand name</li>
                    <li>Intuitive navigation menu</li>
                    <li>Call-to-action button</li>
                    <li>Responsive design that works on all devices</li>
                    <li>Quick-access links to key pages</li>
                  </ol>
                </div>
              </div>
            </div>
      
            <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Header Design Best Practices! 💡</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li>Keep it clean and uncluttered</li>
                  <li>Ensure text is readable against the background</li>
                  <li>Maintain consistent branding</li>
                  <li>Include search functionality if needed</li>
                  <li>Make CTAs stand out with contrasting colors</li>
                  <li>Consider mobile users first</li>
                </ul>
              </div>
            </div>
      
            <div class="bg-fuchsia-50 dark:bg-fuchsia-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Header Components & Features 🛠️</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <div class="space-y-4">
                  <div class="border-b pb-4">
                    <p class="font-semibold">Navigation Elements 🧭</p>
                    <p class="mt-2">Logo, menu items, search bar, language selector, and user account options.</p>
                  </div>
                  
                  <div class="border-b pb-4">
                    <p class="font-semibold">Interactive Features 🎮</p>
                    <p class="mt-2">Dropdown menus, search autocomplete, and hover effects.</p>
                  </div>
                  
                  <div class="border-b pb-4">
                    <p class="font-semibold">Responsive Behaviors 📱</p>
                    <p class="mt-2">Collapsible menus, adaptive layouts, and touch-friendly elements.</p>
                  </div>
                </div>
              </div>
            </div>
      
            <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Common Header Mistakes to Avoid! ⚠️</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li>Too many menu items causing confusion</li>
                  <li>Poor contrast making text hard to read</li>
                  <li>Oversized logos taking up too much space</li>
                  <li>Non-responsive designs breaking on mobile</li>
                  <li>Missing clear call-to-action buttons</li>
                </ul>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
            <h5 class="font-semibold">Pro Tips! 💫</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Preview on mobile before saving 📱</li>
                <li>Use consistent spacing throughout ⚡</li>
                <li>Keep important elements above the fold 🎯</li>
                <li>Always click Apply Settings after changes! ✅</li>
              </ul>
            </div>
          </div>
      
            <div class="mt-6 text-center">
              <p class="text-xl font-bold text-indigo-600 dark:text-indigo-300">Ready to Create Your Perfect Header? 🚀</p>
              <p class="text-lg mt-2">Design a header that makes your website unforgettable! 🧠</p>
            </div>
          </div>
        </div>`,
        "quiz": [
          {
            "question": "Where do you find header templates?",
            "options": [
              "Settings menu",
              "Blocks section",
              "Footer area",
              "Side panel"
            ],
            "correct": 1
          },
          {
            "question": "What's the correct way to add a header template?",
            "options": [
              "Copy paste",
              "Right click",
              "Drag and drop",
              "Double click"
            ],
            "correct": 2
          },
          {
            "question": "Which icon is used for text editing?",
            "options": [
              "Star icon",
              "Capital T",
              "Pencil icon",
              "Plus icon"
            ],
            "correct": 1
          },
        
          {
            "question": "How do you duplicate a header?",
            "options": [
              "Right click",
              "Copy/paste",
              "Clone icon",
              "New template"
            ],
            "correct": 2
          },
          {
            "question": "What's the purpose of the trash icon?",
            "options": [
              "Save changes",
              "Add elements",
              "Delete block",
              "Preview design"
            ],
            "correct": 2
          },
            {
            "question": "What happens if you don't click Apply Settings?",
            "options": [
              "Auto-saves",
              "Reminds later",
              "Changes lost",
              "Saves draft"
            ],
            "correct": 2
          },
   
          {
            "question": "How do you start editing header content?",
            "options": [
              "Click the element",
              "Right click",
              "Press Enter",
              "Double click"
            ],
            "correct": 0
          },
        
          {
            "question": "What's the first step in header creation?",
            "options": [
              "Add text",
              "Go to Blocks",
              "Choose colors",
              "Set margins"
            ],
            "correct": 1
          },
    {
            "question": "When should you preview mobile view?",
            "options": [
              "Never",
              "After publishing",
              "Before saving",
              "Next day"
            ],
            "correct": 2
          },
          {
            "question": "How do you ensure changes are saved?",
            "options": [
              "Close browser",
              "Click Apply Settings",
              "Refresh page",
              "Wait 5 minutes"
            ],
            "correct": 1
          },
      
        ]
      },
      {
        "id": 11,
        "title": "Maps",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Hey! Let's Put Your Business on the Map! 🗺️</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Map(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Show Everyone Where to Find You? 📍</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "Getting lost is an adventure, but let's make sure your customers don't have to! A well-placed map is like a friendly guide saying 'You are welcome here!' 🎯"
            <footer class="text-sm mt-2">- Every Local Business Owner Ever</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Let's Get Your Map Up and Running! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Adding a map is easier than folding one (remember those days? 😅)</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Head over to Components </li>
                  <li>Find your perfect map template</li>
                  <li>Just drag and drop it where you want it (like moving furniture, but way easier)</li>
                  <li>Click that little cog icon to make it your own! ⚙️</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Making Your Map Look Amazing! 🎨</h5>
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                <div class="bg-white/70 p-4 rounded">
                  <p class="mb-4">Let's explore your style options (it's like dressing up your map!):</p>
                  <ul class="list-disc pl-4 space-y-2">
                    <li><span class="font-semibold">Height:</span> Tall, short, or just right - you decide how much space your map needs!</li>
                    
                    <li><span class="font-semibold">Margin Top:</span> Give it some breathing room up top - nobody likes feeling cramped!</li>
                    
                    <li><span class="font-semibold">Margin Bottom:</span> Same goes for the bottom - let's keep things balanced!</li>
                    
                    <li><span class="font-semibold">Black & White Toggle:</span> Feeling fancy? Switch to B&W for that classic look! </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Let's Make It Informative! 📝</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <p class="mb-4">Time to tell your story on the map:</p>
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click the Map option </li>
                <li>You'll see two important text boxes:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Your Address: Paste in the link of where you live </li>
                    <li>Info Box Message: This is your chance to shine! Add opening hours, parking tips, or your famous welcome message 🌟</li>
                  </ul>
                </li>
                <li>Play with the zoom level - too close? Too far? Make it juuust right! 🔍</li>
                <li>Try the B&W toggle - sometimes Black and White nails it!</li>
                <li>Hit "Apply Changes" and voilà - you're on the map! 🎉</li>
              </ol>
            </div>
          </div>

        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🤓 Fun Map Facts!</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Did you know? The first digital map was created in 1967! We've come a long way from paper maps! 🗺️</li>
            <li>A good map can increase your website visits by helping people find you IRL (In Real Life)! 📈</li>
            <li>Black and white maps can reduce page load time - sneaky performance boost! ⚡</li>
            <li>People spend 40% more time on pages with maps - they're just that engaging! ⏰</li>
          </ul>
            </div>
          </div>

        <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🎯 Map Best Practices</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Keep your info box short and sweet - nobody's reading a novel on a map! 📝</li>
            <li>Update your address if you move - obvious, but easy to forget! 🏠</li>
            <li>Test your map on different devices - it should look great everywhere! 💻</li>
            <li>Consider your colour scheme - that's why we gave you the B&W (Black and White) option! 🎨</li>
          </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">One Last Thing! ☝️</h5>
          <p class="mt-2">Remember to save your work - because redoing your perfect map setup is no fun! 😅</p>
          <p class="mt-2">And hey, if you get lost in the settings, just hit refresh and start afresh! 🔄</p>
        </div>
    
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Get on the Map? ✨</p>
            <p class="text-lg mt-2">Go ahead - show the world exactly where to find your awesome business!</p>
            </div>
        </div>
      </div>`,
        "quiz": [
          {
            "question": "Where can you find maps in the Zylosite website builder?",
            "options": [
              "Under the Components section",
              "In the Settings menu",
              "Under the Layout section",
              "In the Theme options"
            ],
            "correct": 0
          },
          {
            "question": "How do you access the map editing options?",
            "options": [
              "Double click the map",
              "Click on the cog icon",
              "Right click the map",
              "Press the Edit button"
            ],
            "correct": 1
          },
          {
            "question": "How many main options are available in the detail editor for maps?",
            "options": [
              "Three (Style, Map, and Layout)",
              "Four (Style, Map, Size, and Position)",
              "Two (Style and Map)",
              "One (Map settings)"
            ],
            "correct": 2
          },
          {
            "question": "Which text box is used to input the location?",
            "options": [
              "Info box message",
              "Location details",
              "Map address",
              "Your address",
            ],
            "correct": 3
          },
          {
            "question": "What type of toggle is available in the map options?",
            "options": [
              "Satellite view",
              "Black and white",
              "3D view",
              "Traffic view"
            ],
            "correct": 1
          },

          {
            "question": "What should you do after making changes to your map?",
            "options": [
              "Click Apply Changes",
              "Refresh the page",
              "Save and exit",
              "Close the editor"
            ],
            "correct": 0
          },
          {
            "question": "What's recommended to include in the info box message?",
            "options": [
              "Full company history",
              "Employee biographies",
              "Opening hours and parking tips",
              "Product catalog"
            ],
            "correct": 2
          },
          {
            "question": "What benefit can black and white maps provide?",
            "options": [
              "Reduced page load time",
              "Better visibility",
              "Increased map size",
              "More accurate directions"
            ],
            "correct": 0
          },
          {
            "question": "How do you add a map to your canvas?",
            "options": [
              "Copy and paste",
              "Double click",
              "Right click and select Add",
              "Drag and drop"
            ],
            "correct": 3
          },
          {
            "question": "What should you consider when choosing a zoom level?",
            "options": [
              "Global view of the country",
              "Satellite imagery quality",
              "Visibility of nearby streets",
              "Traffic patterns"
            ],
            "correct": 2
          }
        ]
      },
      {
        "id": 12,
        "title": "Navigation",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Navigate Like a Pro! 🧭</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Navigation(0).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Create an Amazing Navigation Bar! 🎯</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
             "A great navigation bar is like a roadmap to your website - make it clear, make it simple! 🗺️"
            <footer class="text-sm mt-2">- Every Web Designer Ever</footer>
          </blockquote>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Getting Started with Your Nav Bar! 🚀</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Let's build your perfect navigation bar:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Go to the Components Section and find the Navigation section</li>
                  <li>Browse through different nav bar designs</li>
                  <li>Drag your favorite design onto the canvas</li>
                  <li>Click any element to see options: Change text, Clone, or Delete ⚙️</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Add Links to Your Nav Bar! 🔗</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ol class="list-decimal pl-4 space-y-2">
                  <li>Click the button you want to link</li>
                  <li>Click the cog icon in the menu</li>
                  <li>In the Detail Modal, choose 'Link'</li>
                  <li>Paste your URL or select a page</li>
                  <li>Optional: Toggle 'Open in new tab' 🔄</li>
                </ol>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Style Your Nav Bar Elements! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ol class="list-decimal pl-4 space-y-2">
                <li>Click any nav bar element</li>
                <li>Click the cog icon</li>
                <li>In Detail Modal, select 'Style'</li>
                <li>Customize the appearance:
                  <ul class="list-disc pl-6 mt-2">
                    <li>Colors and backgrounds 🎨</li>
                    <li>Text size and font 📝</li>
                    <li>Padding and spacing 📏</li>
                    <li>Hover effects ✨</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

        <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🤓 Nav Bar Facts!</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Users spend 6.48 seconds on average looking at your navigation! Make it count! ⏱️</li>
            <li>Clear navigation can reduce bounce rates by up to 30%! 📈</li>
            <li>Most users prefer navigation with 7 or fewer main items! 🔢</li>
            <li>89% of visitors leave a website due to poor navigation! 🚪</li>
          </ul>
            </div>
          </div>

        <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">🎯 Navigation Best Practices</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
            <li>Keep menu items short and clear - no fancy words needed! 📝</li>
            <li>Test all your links before going live! 🔗</li>
            <li>Make your logo clickable - it should always lead home! 🏠</li>
            <li>Ensure high contrast for better readability! 👀</li>
          </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
          <h5 class="font-semibold">Pro Tip! 💡</h5>
          <p class="mt-2">Save frequently while editing your nav bar - better safe than sorry! 💾</p>
          <p class="mt-2">Need to undo changes? Use the reset button to start fresh! 🔄</p>
        </div>
    
      
          <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Guide Your Visitors? ✨</p>
          <p class="text-lg mt-2">You've got this! Let's create something amazing together! ✨</p>
          </div>
        </div>
      </div>`,
      "quiz": [
        {
          "question": "Where can you find navigation bar templates?",
          "options": [
            "In the Components section",
            "In the Edit menu",
            "In the Format menu",
            "In the Settings panel"
          ],
          "correct": 0
        },
        {
          "question": "How do you add a navigation bar to the canvas?",
          "options": [
            "Copy and paste",
            "Double click",
            "Right click and select 'Add'",
            "Drag and drop"
          ],
          "correct": 3
        },
        {
          "question": "What appears when you click on a navigation bar component?",
          "options": [
            "A color picker",
            "A text editor",
            "A delete button only",
            "A menu with editing options"
          ],
          "correct": 3
        },
        {
          "question": "Which icon do you click to access the Detail Modal?",
          "options": [
            "Star icon",
            "Plus icon",
            "Pencil icon",
            "Cog icon"
          ],
          "correct": 3
        },
     
        {
          "question": "How do you add a link to a navigation bar element?",
          "options": [
            "Double click and enter URL",
            "Drag a link from browser",
            "Click cog icon, select Link option, and paste URL",
            "Right-click and select 'Add Link'"
          ],
          "correct": 2
        },
        {
          "question": "What is an optional setting when adding a link?",
          "options": [
            "Add animation",
            "Set link color",
            "Add password protection",
            "Open in new tab"
          ],
          "correct": 3
        },
        {
          "question": "What is the first step to style a navigation element?",
          "options": [
            "Open Settings panel",
            "Open Style menu",
            "Right-click the element",
            "Click the element"
          ],
          "correct": 3
        },
 
        {
          "question": "What happens when you click the cog icon?",
          "options": [
            "Shows preview",
            "Shows Detail Modal",
            "Opens Style panel directly",
            "Deletes component"
          ],
          "correct": 1
        },
   
        {
          "question": "What feature allows you to duplicate a nav bar element?",
          "options": [
            "Duplicate option",
            "Copy button",
            "Repeat tool",
            "Clone feature"
          ],
          "correct": 3
        },
        {
          "question": "Where are the style settings located?",
          "options": [
            "Main menu",
            "Format bar",
            "Quick panel",
            "Detail Modal"
          ],
          "correct": 3
        }
      ]
      },
      {
        "id": 13,
        "title": "Pricing",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Create a Converting Pricing Section! 💰</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Pricing(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Design Pricing That Sells! 🎯</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "Your pricing section isn't just about numbers - it's about showing value and building trust! 💫"
          </blockquote>
      
          <div className="bg-white/70 p-4 rounded mt-4">
          <h4 class="text-xl font-semibold mb-4">Let's Build Your Pricing Section! 🚀</h4>
          <p className="mb-4">Creating the perfect pricing section is easier than you think! 😊</p>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Head to the Blocks section</li>
            <li>Browse pricing templates and pick your favorite</li>
            <li>Drag and drop it onto your canvas</li>
            <li>Time to make it yours! ⭐</li>
          </ol>
        </div>

        <div className="bg-white/70 p-4 rounded mt-4">
          <h4 class="text-xl font-semibold mb-4">Customize Your Design! 🎨</h4>
          <p class="mb-2">Make it perfect with these steps:</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Click any text to reveal the editing menu </li>
            <li>Hit the T icon to update your pricing copy</li>
            <li>Use the ⚙️ icon to access advanced styling options</li>
            <li>Set custom colors, fonts, and spacing</li>
            <li>Add your own features and benefits ✨</li>
          </ul>
        </div>
      </div>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Pricing Best Practices! 💎</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li>Highlight your recommended plan 🌟</li>
                  <li>Use clear, benefit-focused language</li>
                </ul>
              </div>
            </div>
          </div>
      
        
      
          <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Style Your Success! 🎨</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Use contrasting colors for featured plans 🎨</li>
                <li>Ensure mobile-responsive design 📱</li>
                <li>Keep spacing consistent throughout 📏</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Common Mistakes to Avoid! ⚠️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Too many pricing tiers</li>
                <li>Unclear feature descriptions</li>
                <li>Hidden costs or fees</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
            <h5 class="font-semibold">Pro Tips! 💫</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Update prices regularly ⚡</li>
                <li>Add FAQ section below pricing 💭</li>
                <li>Include money-back guarantee badge 🛡️</li>
              </ul>
            </div>
          </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Price Like a Pro? ✨</p>
            <p class="text-lg mt-2">Create a pricing section that converts browsers into buyers!</p>
          </div>
        </div>
      </div>`,
      
        "quiz": [
          {
            "question": "Where do you find pricing templates?",
            "options": [
              "Settings menu",
              "Blocks section",
              "Help center",
              "Footer"
            ],
            "correct": 1
          },
          {
            "question": "How do you add a pricing template to your page?",
            "options": [
              "Copy and paste",
              "Use keyboard shortcuts",
              "Drag and drop",
              "Double click"
            ],
            "correct": 2
          },
          {
            "question": "Which icon do you click to modify text?",
            "options": [
              "Cog icon",
              "T icon",
              "Plus icon",
              "Star icon"
            ],
            "correct": 1
          },
          {
            "question": "How do you access styling options?",
            "options": [
              "Click the cog icon",
              "Right click",
              "Double click",
              "Press spacebar"
            ],
            "correct": 0
          },
          {
            "question": "What's crucial after making changes?",
            "options": [
              "Refresh page",
              "Log out",
              "Save changes",
              "Print page"
            ],
            "correct": 2
          },
          {
            "question": "What happens if you don't save changes?",
            "options": [
              "Auto-saved",
              "All changes lost",
              "Partial save",
              "Reminder sent"
            ],
            "correct": 1
          },
          {
            "question": "What's the first step in creating a pricing section?",
            "options": [
              "Add text",
              "Go to Blocks section",
              "Choose colors",
              "Set prices"
            ],
            "correct": 1
          },
       
          {
            "question": "Where should you drag the pricing templates?",
            "options": [
              "Sidebar",
              "Header",
              "Canvas",
              "Footer"
            ],
            "correct": 2
          },
        
          {
            "question": "What should you do before leaving the editor?",
            "options": [
              "Print page",
              "Save changes",
              "Clear cache",
              "Close tab"
            ],
            "correct": 1
          },
          {
            "question": "How do you duplicate a pricing tier?",
            "options": [
              "Copy/paste",
              "Clone option",
              "New template",
              "Rebuild"
            ],
            "correct": 1
          },
        
        ]
      
      },
      {
        "id": 14,
        "title": "Processes",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">📝 Process Power! Let's Make Your Text Amazing! ✨</h2>
        
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Create Process Magic? 🎨</h3>
            <video className="w-full rounded-lg" controls>
            <source src="https://awb-silk.vercel.app/Team(720p).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video><br>
            <blockquote class="border-l-4 border-purple-500 pl-4 italic mb-4 text-lg">
                "Time to turn your process into a masterpiece! 👌"
            </blockquote>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Let's Get Started with Process Magic! 🚀</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <p class="mb-4">Creating your process section is a breeze! Here's how:</p>
                        <ol class="list-decimal pl-4 space-y-2">
                            <li>Hop over to the blocks section (where process templates live! ✨)</li>
                            <li>Pick your perfect process layout (we've got tons of cool ones! 🎯)</li>
                            <li>Drag and drop it onto your canvas (easy peasy! 🎨)</li>
                            <li>Now let's make those words sparkle! ✨</li>
                        </ol>
                    </div>
                </div>
            </div>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Your Text Control Center! 🎮</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <div class="space-y-6">
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">1. Essential Controls ⚙️</h6>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Click the "T" icon to unleash your inner writer! ✍️</li>
                                    <li>Use the magical cog for special tweaks ⚙️</li>
                                    <li>Clone button - because good things deserve doubles! 🎭</li>
                                    <li>Delete button - for those "let's start fresh" moments! 🧹</li>
                                </ul>
                            </div>
    
                            <div class="bg-purple-50/50 p-3 rounded mb-4">
                                <h6 class="font-semibold mb-2">2. Text Formatting Superpowers! 💪</h6>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Bold: Make your words flex! 💪
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Perfect for headings</li>
                                            <li>Great for important points</li>
                                            <li>Keyboard ninja move: Ctrl/Cmd + B</li>
                                        </ul>
                                    </li>
                                    <li>Italics: Give your text some sass! 🎭
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Ideal for emphasis</li>
                                            <li>Perfect for quotes</li>
                                            <li>Quick trick: Ctrl/Cmd + I</li>
                                        </ul>
                                    </li>
                                    <li>Underline: Because some words need that extra line! 📏
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Great for highlighting key points</li>
                                            <li>Perfect for links</li>
                                            <li>Shortcut magic: Ctrl/Cmd + U</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
    
                            <div class="bg-blue-50/50 p-3 rounded mb-4">
                                <h6 class="font-semibold mb-2">3. Style Your Text Like a Pro! 🎨</h6>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Text Alignment: Make your words march! 👥
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Left: The classic choice</li>
                                            <li>Center: For dramatic effect</li>
                                            <li>Right: When you're feeling rebellious</li>
                                        </ul>
                                    </li>
                                    <li>Font Family: Give your text personality! 👔
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Professional fonts for serious stuff</li>
                                            <li>Fun fonts for creative vibes</li>
                                            <li>Mix and match (but not too much!)</li>
                                        </ul>
                                    </li>
                                    <li>Color Magic: Paint your words! 🌈
                                        <ul class="list-disc pl-4 mt-2">
                                            <li>Match your brand colors</li>
                                            <li>Create hierarchy with color</li>
                                            <li>Don't go rainbow crazy!</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
    
                            <div class="bg-green-50/50 p-3 rounded">
                                <h6 class="font-semibold mb-2">4. Keyboard Ninja Moves! ⌨️</h6>
                                <ul class="list-disc pl-4">
                                    <li>Select All: Ctrl/Cmd + A</li>
                                    <li>Undo: Ctrl/Cmd + Z</li>
                                    <li>Redo: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z</li>
                                    <li>Save yourself some clicks! 🎯</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Cool Formatting Combos & Pro Tips! 🌟</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <div class="mb-4">
                        <p class="font-semibold">Awesome Combinations! 🎨</p>
                        <ul class="list-disc pl-4 space-y-2">
                            <li>Bold + Color = Attention grabber!</li>
                            <li>Italics + Underline = Emphasis extraordinaire!</li>
                            <li>Fancy Font + Color = Royal vibes!</li>
                            <li>Center + Bold = Perfect headers!</li>
                        </ul>
                    </div>
                    <div>
                        <p class="font-semibold">Pro Tips! 🎓</p>
                        <ul class="list-disc pl-4 space-y-2">
                            <li>Save every 5 minutes (or after every brilliant edit! 💾)</li>
                            <li>Preview regularly - what you see isn't always what you get! 👀</li>
                            <li>Use clone for consistent formatting 🎭</li>
                            <li>Keep your font choices consistent (2-3 max!) 📏</li>
                            <li>Test readability - if you can't read it, neither can your visitors! 👓</li>
                        </ul>
                    </div>
                </div>
            </div>
    
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">⚠️ Formatting Emergency Kit! 🚨</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li class="text-lg font-semibold text-red-600 dark:text-red-400">👉 Clear Formatting: Your "start over" button!</li>
                        <li>Undo/Redo: Your time machine ⏰</li>
                        <li>Preview: Your reality check 👀</li>
                        <li>Save Button: Your best friend 💝</li>
                    </ul>
                    <p class="mt-4 font-semibold">Remember: Save early, save often! Don't lose your masterpiece! 🎨</p>
                </div>
            </div>
    
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">⚠️ Formatting Fails to Avoid! 😱</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li>ALL CAPS OVERLOAD! (Unless you're really excited! 🎉)</li>
                        <li>Rainbow text explosion! (Pick 2-3 colors max 🌈)</li>
                        <li>Font party chaos! (Stick to 2-3 fonts 📚)</li>
                        <li>Forgetting to save! (The horror! 😱)</li>
                    </ul>
                </div>
            </div>
    
            <div class="mt-6 text-center">
                <p class="text-xl font-bold text-purple-600 dark:text-purple-300">Ready to Make Your Process Section Shine? 🌟</p>
                <p class="text-lg mt-2">Let's turn those words into works of art! ✨</p>
                <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Great formatting makes your content pop! 🎨</p>
            </div>
        </div>
    </div>`,
    "quiz": [
      {
        "question": "What is the first step in creating a process section?",
        "options": [
          "Start writing content immediately",
          "Go to the blocks section",
          "Choose text formatting",
          "Set up keyboard shortcuts"
        ],
        "correct": 1
      },
      {
        "question": "Which keyboard shortcut is used for bold text?",
        "options": [
          "Ctrl/Cmd + I",
          "Ctrl/Cmd + U",
          "Ctrl/Cmd + B",
          "Ctrl/Cmd + A"
        ],
        "correct": 2
      },
   
      {
        "question": "Which is a recommended combination for headers?",
        "options": [
          "Italics + Underline",
          "Center + Bold",
          "Bold + Color",
          "Fancy Font + Color"
        ],
        "correct": 1
      },
 
      {
        "question": "Which text alignment is considered 'the classic choice'?",
        "options": [
          "Center",
          "Right",
          "Left",
          "Justified"
        ],
        "correct": 2
      },
 {
        "question": "Which feature helps maintain consistent formatting across elements?",
        "options": [
          "Delete button",
          "Clone button",
          "Save button",
          "Preview button"
        ],
        "correct": 1
      },
      {
        "question": "What is the keyboard shortcut for selecting all text?",
        "options": [
          "Ctrl/Cmd + A",
          "Ctrl/Cmd + S",
          "Ctrl/Cmd + Z",
          "Ctrl/Cmd + X"
        ],
        "correct": 0
      },
      {
        "question": "When should you use italics?",
        "options": [
          "For all headings",
          "For emphasis and quotes",
          "For all links",
          "For all body text"
        ],
        "correct": 1
      },
      {
        "question": "What is the primary purpose of the preview feature?",
        "options": [
          "To save progress",
          "To delete content",
          "To perform a reality check",
          "To clone elements"
        ],
        "correct": 2
      },
      {
        "question": "What should you do before making significant changes?",
        "options": [
          "Delete old content",
          "Change all fonts",
          "Save your work",
          "Add new colors"
        ],
        "correct": 2
      },
   
      {
        "question": "What is the purpose of the 'T' icon?",
        "options": [
          "To test layouts",
          "To create tables",
          "To unleash writing tools",
          "To change themes"
        ],
        "correct": 2
      },
 
    ]
      },
      {
        "id": 15,
        "title": "Signup",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Time to Make Your Forms Fantastic! 📝</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Sign_Up(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Connect With Your Visitors? 🤝</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "A well-designed form is like a friendly conversation - it makes people feel heard and valued! 💬"
          - Every Successful Website Owner
          </blockquote>
      
          <div className="bg-white/70 p-4 rounded mt-4">
          <h4 class="text-xl font-semibold mb-4">Let's Build Your Perfect Form! 🚀</h4>
          <p className="mb-4">Creating forms is easier than filling them out (and way more fun! 😉)</p>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Pop over to the Blocks section</li>
            <li>Find your dream form template</li>
            <li>Just drag and drop it where you need it (like arranging sticky notes, but digital!)</li>
            <li>Click to customize - it's your time to shine! ⭐</li>
          </ol>
        </div>

        <div className="bg-white/70 p-4 rounded mt-4">
          <h4 class="text-xl font-semibold mb-4">Make It Your Own! 🎨</h4>
          <p class="mb-2">Time to customize (it's like decorating, but for forms!):</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Click any text to see your magical menu appear 🪄</li>
            <li>Capital T: Edit your text - make it speak your language!</li>
            <li>Cog Icon: Style it up and add links - make it pop! ⚙️</li>
            <li>Copy Icon: Clone it - because good things are worth repeating! 📋</li>
            <li>Trash Icon: Remove what you don't need - keep it clean! 🗑️</li>
          </ul>
        </div>
      </div>

      <div className="bg-white/70 p-4 rounded mt-4">
          <h4 class="text-xl font-semibold mb-4">Perfect Your Email Form! 🎨</h4>
          <p class="mb-2">Focus on what matters:</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Clear value proposition - why should they sign up? 🪄</li>
            <li>Single email field - remove all friction!</li>
            <li>Compelling call-to-action button ⚙️</li>
            <li>Optional: newsletter frequency info ℹ️</li>
            <li>Simple privacy statement 🔒</li>
          </ul>
        </div>
      </div>
      
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Form Best Practices! 📋</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                <li>Just ask for the name email - nothing else! 🎯</li>
                  <li>Keep it simple - nobody likes a marathon form! 🏃‍♀️</li>
                  <li>Label fields clearly - confusion is not your friend!</li>
                  <li>Clear explanation of what they're signing up for ✨</li>
                  <li>Add a friendly success message - celebrate those submissions! 🎉</li>
                </ul>
              </div>
            </div>
          </div>
      
      
          <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Don't Forget! ☝️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Always save your changes - because redoing your perfect form is no fun! 💾</li>
                <li>Test your form before going live - be your own first submission! ✅</li>
              </ul>
            </div>
          </div>
      
          <div class="mt-6 text-center">
          <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Grow Your Email List? ✨</p>
          <p class="text-lg mt-2">Create a simple email sign-up form that actually converts!</p>
          </div>
        </div>
      </div>`,
      "quiz": [
        {
          "question": "What's most important for sign-up forms?",
          "options": [
            "Animation",
            "Simplicity",
            "Decoration",
            "Colors"
          ],
          "correct": 1
        },
        {
          "question": "What's a common sign-up form mistake?",
          "options": [
            "Clear labels",
            "Validation",
            "Too many fields",
            "Progress bars"
          ],
          "correct": 2
        },
        {
          "question": "What's the optimal number of fields for a basic sign-up form?",
          "options": [
            "10 fields",
            "5-6 fields",
            "1-2 fields",
            "1 field (email only)"
          ],
          "correct": 2
        },
    
        {
          "question": "What should you collect first from new users?",
          "options": [
            "Full name",
            "Phone number",
            "Email address",
            "Birthday"
          ],
          "correct": 2
        },
      
        {
          "question": "What improves mobile form completion rates?",
          "options": [
            "More fields",
            "Fewer fields",
            "Larger buttons",
            "More colors"
          ],
          "correct": 1
        },
     
        {
          "question": "What reduces form abandonment?",
          "options": [
            "More fields",
            "Complex validation",
            "Clear error messages",
            "No validation"
          ],
          "correct": 2
        },
        {
          "question": "When should you ask for additional user information?",
          "options": [
            "Never",
            "During signup",
            "After establishing value",
            "Before email"
          ],
          "correct": 2
        },
 
        {
          "question": "How can you increase sign-up form trust?",
          "options": [
            "More fields",
            "Social proof",
            "Animations",
            "Colors"
          ],
          "correct": 1
        },
        {
          "question": "What should you test before launching a sign-up form?",
          "options": [
            "Colors only",
            "Text only",
            "Mobile responsiveness",
            "Nothing"
          ],
          "correct": 2
        },
     
        {
          "question": "What's the primary goal of a sign-up form?",
          "options": [
            "Collect all data",
            "Look pretty",
            "Convert visitors",
            "Be complex"
          ],
          "correct": 2
        }
      ]
      },
      {
        "id": 16,
        "title": "Slideshows",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Create Stunning Slideshows! Let's Make Your Images Dance 💃🏻𓀤🕺🏽</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/SlideShow(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Your Images, Your Story! 🎭</h3>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
            "Why settle for static when you can slide into awesome? Let's make your content move and glide!"
          </blockquote>
          <footer class="text-sm mt-2">- The Slideshow Wizards 🧙‍♂️</footer>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Getting Started with Slideshows 🎬</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Creating your first slideshow is a breeze! Here's how:</p>
                <ol class="list-decimal pl-4 space-y-2">
                  <li>First things first! Head over to the blocks section - that's where the fun begins!</li>
                  <li> You'll find some amazing templates waiting to jazz up your page. Look for the 'Slideshow' option - you can't miss it</li>
                  <li>Browse through our beautiful templates (we've got something for everyone)</li>
                  <li>Found one you love? Just drag and drop it onto your canvas - it's as easy as pie! 🥧</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="bg-white/50 p-6 rounded-lg mb-6">
      <div class="pl-4 space-y-4">        
        <p>Each slideshow comes with space for three fantastic images - perfect for telling your visual story! 📸</p>
      </div>
    </div>
          
          <div class="bg-white/50 p-6 rounded-lg mb-6">
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
              <h5 class="font-semibold">Customizing Your Slideshow ✨</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Time to Make It Your Own! 🎨
                Click the slideshow and look for the magic cog icon. You'll find three  customization menus:</p>
                
                <div class="space-y-4">
                  <div class="bg-white/50 p-4 rounded">
                    <h6 class="font-semibold mb-2">1. Style Settings 🎨</h6>
                    <ul class="list-disc pl-4 space-y-2">
                      <li>Round those corners just right with radius controls for each corner</li>
                      <li>Add a perfect border:
                        <ul class="list-disc pl-6 mt-2">
                          <li>Pick your favorite color</li>
                          <li>Choose your style (none, dotted, dashed, or solid)</li>
                          <li>Set the perfect width</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
      
                  <div class="bg-white/50 p-4 rounded">
                    <h6 class="font-semibold mb-2">2. Link Options 🔗</h6>
                    <ul class="list-disc pl-4 space-y-2">
                      <li>Make your slides clickable with these options:
                        <ul class="list-disc pl-6 mt-2">
                          <li>Open in new tab (great for external content)</li>
                          <li>Link to another page on your site</li>
                          <li>Smooth scroll to a specific block (#pageid)</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
      
                  <div class="bg-white/50 p-4 rounded">
                    <h6 class="font-semibold mb-2">3. Image Management 🖼️</h6>
                    <ul class="list-disc pl-4 space-y-2">
                      <li>Upload up to three beautiful images</li>
                      <li>Arrange them in your preferred order</li>
                      <li>Preview how they'll look together</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Pro Tips for Picture-Perfect Slideshows 💫</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Keep your image sizes consistent for smooth transitions</li>
                <li>Use high-quality images that tell your story</li>
                <li>Test your links before publishing</li>
                <li>Consider your audience when setting transition speeds</li>
              </ul>
            </div>
          </div>
      
          <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Things to Keep in Mind 🤔</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
              <ul class="list-disc pl-4 space-y-2">
                <li>Optimize your images for faster loading</li>
                <li>Test how your slideshow looks on mobile devices</li>
                <li>Make sure your links work properly</li>
                <li>Save your work regularly as you customize</li>
              </ul>
            </div>
          </div>
      
          <br />
          <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
            <h5 class="font-semibold">Quick Reminder</h5>
            <p class="mt-2">Don't forget to preview your slideshow before publishing - your audience will thank you! 🌟</p>
          </div>
      
          <div class="mt-6 text-center">
            <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Create Some Slideshow Magic? ✨</p>
            <p class="text-lg mt-2">Your images are about to look amazing!</p>
            <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">We'd love to see your slideshows in action - share them with us! 📸</p>
          </div>
        </div>
      </div>`,
      "quiz": [
        {
          "question": "Where do you find slideshow templates?",
          "options": [
            "Settings panel",
            "Blocks section",
            "Media library",
            "Navigation menu"
          ],
          "correct": 1
        },
        {
          "question": "How many images can each slideshow accommodate by default?",
          "options": [
            "Two",
            "Five",
            "Three",
            "Four"
          ],
          "correct": 2
        },
        {
          "question": "Which icon do you click to access customization menus?",
          "options": [
            "Star icon",
            "Plus icon",
            "Pencil icon",
            "Cog icon"
          ],
          "correct": 3
        },
       
        {
          "question": "Which border styles are available?",
          "options": [
            "Only solid",
            "Solid and dotted",
            "None, dotted, dashed, and solid",
            "Only dashed"
          ],
          "correct": 2
        },
     
        {
          "question": "What's the first step in creating a slideshow?",
          "options": [
            "Upload images",
            "Go to blocks section",
            "Set transitions",
            "Choose colors"
          ],
          "correct": 1
        },
      
        {
          "question": "What's recommended for smooth transitions?",
          "options": [
            "Fast internet",
            "Optimised image sizes",
            "Small file sizes",
            "Dark backgrounds"
          ],
          "correct": 1
        },
     
        {
          "question": "How do you add a slideshow to your canvas?",
          "options": [
            "Copy and paste",
            "Double click",
            "Drag and drop",
            "Right click"
          ],
          "correct": 2
        },
     
        {
          "question": "What should you consider when setting transition speeds?",
          "options": [
            "Website theme",
            "Your audience",
            "Image size",
            "Page layout"
          ],
          "correct": 1
        },
        {
          "question": "When should you preview slideshow appearance?",
          "options": [
            "Only on desktop",
            "Only on mobile",
            "Before publishing",
            "Only after publishing"
          ],
          "correct": 2
        },
        {
          "question": "What's recommended during customization?",
          "options": [
            "Continuous previews",
            "Regular saving",
            "Fast editing",
            "Multiple versions"
          ],
          "correct": 1
        },
       
      ]
      },
      {
        "id": 17,
        "title": "Subscribe",
        "content": `<div class="space-y-6">
        <h2 className="text-2xl font-bold">✉️ Create Your Perfect Subscribe Form! </h2>
        <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Transform Visitors into Subscribers? 📧</h3>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Subscribe(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video><br>
        <blockquote class="border-l-4 border-green-500 pl-4 italic mb-4 text-lg">
        "The perfect subscribe form is your 24/7 list-building champion. Let's make it irresistible! ✨"
        </blockquote>
      
        <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-teal-50 dark:bg-teal-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Getting Started: Your Journey to Subscribe Form Success! 🚀</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
                <p class="mb-4">Let's create a form that converts! Here's how:</p>
                <ol class="list-decimal pl-4 space-y-2">
                    <li>Navigate to the blocks section (it's your form treasure chest! 💎)</li>
                    <li>Look for 'Forms' in the sidebar (we've got templates you'll love! 💌)</li>
                    <li>Browse our amazing collection:</li>
                    <ul class="list-disc pl-8 mt-2 space-y-1">
                        <li>Minimalist designs for clean, focused conversion</li>
                        <li>Feature-rich layouts for detailed sign-ups</li>
                        <li>Pop-up forms for attention-grabbing moments</li>
                        <li>Inline forms that flow with your content</li>
                        <li>Footer forms for that perfect closing touch</li>
                    </ul>
                    <li>Found your perfect match? Just drag and drop onto your canvas! 🎯</li>
                </ol>
            </div>
        </div>
    </div>

    <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-emerald-50 dark:bg-emerald-800 p-4 rounded-lg mb-4">
            <h5 class="font-semibold">Your Complete Form Editing Toolkit! 🛠️</h5>
            <div class="bg-white/70 p-4 rounded mt-4">
                <div class="space-y-6">
                    <div class="bg-white/50 p-4 rounded">
                        <h6 class="font-semibold mb-2">1. The Magic Icons - Your Creative Control Center! ⚡</h6>
                        <p class="mb-2">Each icon is your gateway to form perfection:</p>
                        <ul class="list-disc pl-4 space-y-2">
                            <li>⚙️ <span class="font-medium">Settings (Cog) Icon:</span>
                                <ul class="pl-6 mt-1">
                                    <li>Adjust form dimensions and spacing 📏</li>
                                    <li>Change colors and backgrounds 🎨</li>
                                    <li>Modify borders and corner roundness ⭕</li>
                                    <li>Set up form actions and integrations 🔄</li>
                                </ul>
                            </li>
                            <li>🔄 <span class="font-medium">Clone Icon:</span>
                                <ul class="pl-6 mt-1">
                                    <li>Create instant form copies ⚡</li>
                                    <li>Perfect for A/B testing 📊</li>
                                    <li>Use across multiple pages 🔄</li>
                                </ul>
                            </li>
                            <li>🗑️ <span class="font-medium">Delete Icon:</span>
                                <ul class="pl-6 mt-1">
                                    <li>Remove unwanted elements 🧹</li>
                                    <li>Start fresh when needed 🔄</li>
                                    <li>Don't worry - there's always undo! 💫</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white/50 p-4 rounded">
                        <h6 class="font-semibold mb-2">2. Text Editing Made Easy! ✏️</h6>
                        <p class="mb-2">Perfect your form's message:</p>
                        <ul class="list-disc pl-4 space-y-2">
                            <li>Find any text you want to change 👆</li>
                            <li>Click to reveal the editing toolbar 🔧</li>
                            <li>Look for the 'T' icon - your text editing bestie! ✨</li>
                            <li>Customize everything:
                                <ul class="pl-6 mt-1">
                                    <li>Headlines that grab attention 🎯</li>
                                    <li>Clear, compelling button text 👆</li>
                                    <li>Informative field labels 📝</li>
                                    <li>Engaging placeholder text 💭</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Pro Tips for Subscribe Form Excellence! 💫</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
                <li>Keep your form short and sweet (less fields = more signups! ✨)</li>
                <li>Use eye-catching button colors (make it pop! 🎨)</li>
                <li>Write clear value propositions (why should they subscribe? 🤔)</li>
                <li>Add social proof ("Join 10,000+ subscribers!" 🌟)</li>
                <li>Include a privacy note (build trust! 🛡️)</li>
                <li>Test on all devices (mobile-friendly is a must! 📱)</li>
                <li>Set up thank you messages (make them feel special! 💝)</li>
                <li>Enable email confirmations (welcome them right! 👋)</li>
            </ul>
        </div>
    </div>

    <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">⚠️ Essential Reminders! Don't Forget! ⚠️</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
            <p class="text-lg font-semibold text-red-600 dark:text-red-400">👉 Save Your Work - Click "Apply Changes"! 💾</p>
            <ul class="list-disc pl-4 mt-2 text-red-600 dark:text-red-400">
                <li>Save after each major edit ✅</li>
                <li>Preview before publishing 👀</li>
                <li>Test the form submission 🔒</li>
            </ul>
            <p class="mt-2">Your masterpiece deserves to be saved! 🙏</p>
        </div>
    </div>

    <div class="mt-6 text-center">
        <p class="text-xl font-bold text-green-600 dark:text-green-300">Ready to Grow Your Email List? 🌱</p>
        <p class="text-lg mt-2">Your perfect subscribe form is just a few clicks away! ✨</p>
        <p class="text-md mt-2">Need help? We're here for you! 🤝</p>
        <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Every great email list starts with an amazing subscribe form! 📮</p>
    </div>
</div>
</div>`,
"quiz": [
  {
  "question": "Where do you find form templates?",
  "options": [
  "Settings menu",
  "Blocks section",
  "Theme options",
  "Layout panel"
  ],
  "correct": 1
  },
  {
  "question": "How do you add a form to your page?",
  "options": [
  "Copy and paste",
  "Click to insert",
  "Drag and drop",
  "Double click"
  ],
  "correct": 2
  },

  {
  "question": "What icon should you click to modify text?",
  "options": [
  "Cog icon",
  "Clone icon",
  "T icon",
  "Delete icon"
  ],
  "correct": 2
  },
  {
  "question": "What's the first step in adding a form?",
  "options": [
  "Select Forms",
  "Go to blocks section",
  "Choose a template",
  "Click edit"
  ],
  "correct": 1
  },
  {
  "question": "What is the final important step after creating a form?",
  "options": [
  "Preview changes",
  "Add text",
  "Save changes",
  "Select template"
  ],
  "correct": 2
  },

  {
  "question": "What's the correct sequence for editing text?",
  "options": [
  "Click text → Click T icon",
  "Click T icon → Click text",
  "Click cog → Click text",
  "Click clone → Click text"
  ],
  "correct": 0
  },
 
  {
  "question": "What's the purpose of the cog icon?",
  "options": [
  "Delete form",
  "Edit settings",
  "Clone form",
  "Edit text"
  ],
  "correct": 1
  },
  {
  "question": "What's the purpose of the clone icon?",
  "options": [
  "Delete form",
  "Edit settings",
  "Copy form",
  "Edit text"
  ],
  "correct": 2
  },
  {
  "question": "What's the purpose of the delete icon?",
  "options": [
  "Remove form",
  "Edit settings",
  "Copy form",
  "Edit text"
  ],
  "correct": 0
  },
 
  {
  "question": "What's the correct order of steps?",
  "options": [
  "Select template → Drag → Edit",
  "Blocks → Forms → Template → Drag & drop",
  "Forms → Drag → Template → Edit",
  "Template → Forms → Drag → Edit"
  ],
  "correct": 1
  }
  ]
      },
      {
        "id": 18,
        "title": "Team",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">👥 Showcase Your Amazing Team! Let's Make Your Squad Shine! ✨</h2>
        
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Show Off Your Dream Team? 🌟</h3>
            <video className="w-full rounded-lg" controls>
            <source src="https://awb-silk.vercel.app/Team(720p).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video><br>
            <blockquote class="border-l-4 border-purple-500 pl-4 italic mb-4 text-lg">
                "Great teams deserve great spotlights! Let's create something awesome together!"
            </blockquote>
            <footer class="text-sm mt-2">- Your Team Section Buddy 🤝</footer>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Getting Started is Super Easy! 🚀</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <p class="mb-4">Let's get your team looking fantastic! Here's how:</p>
                        <ol class="list-decimal pl-4 space-y-2">
                            <li>Pop over to the blocks section (where all the magic happens! ✨)</li>
                            <li>Look for 'Team' in the options (we've got some gorgeous templates waiting for you!)</li>
                            <li>See one you love? Just drag and drop it onto your canvas (it's that easy! 🎯)</li>
                            <li>Now the fun part begins - let's make it yours! 🎨</li>
                        </ol>
                    </div>
                </div>
            </div>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Customizing Your Team's Spotlight! 🎭</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <div class="space-y-6">
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">1. Text Magic ✏️</h6>
                                <p class="mb-2">Time to showcase those awesome team members:</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Click on any text you want to change</li>
                                    <li>Look for the magical 'T' icon in the popup menu</li>
                                    <li>Update names, titles, bios - make it personal! 👤</li>
                                    <li>Pro tip: Keep it consistent with your brand voice! 🎯</li>
                                </ul>
                            </div>
    
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">2. Picture Perfect! 📸</h6>
                                <p class="mb-2">Let's make those team photos pop:</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Click on any team member's image</li>
                                    <li>Find the trusty cog icon in the menu</li>
                                    <li>Welcome to your super-powered image editor! 🦸‍♂️</li>
                                </ul>
                            </div>
    
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">3. The Magical Editor Options 🎮</h6>
                                <div class="space-y-4">
                                    <div class="bg-purple-50/50 p-3 rounded">
                                        <p class="font-semibold">Style Settings 🎨</p>
                                        <ul class="list-disc pl-4">
                                            <li>Perfect those corners with border radius</li>
                                            <li>Add fancy hover effects</li>
                                            <li>Play with shadows and borders</li>
                                            <li>Make it match your website's vibe!</li>
                                        </ul>
                                    </div>
    
                                    <div class="bg-blue-50/50 p-3 rounded">
                                        <p class="font-semibold">Link Powers 🔗</p>
                                        <ul class="list-disc pl-4">
                                            <li>Connect to team member profiles</li>
                                            <li>Add social media links</li>
                                            <li>Create clickable portfolios</li>
                                            <li>Choose to open in new tabs!</li>
                                        </ul>
                                    </div>
    
                                    <div class="bg-green-50/50 p-3 rounded">
                                        <p class="font-semibold">Image Magic 🖼️</p>
                                        <ul class="list-disc pl-4">
                                            <li>Upload those awesome team photos</li>
                                            <li>Adjust size and positioning</li>
                                            <li>Add alt text for accessibility (so important! 👍)</li>
                                            <li>Make sure everyone looks their best!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Pro Tips for Team Section Success! 💫</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li>Keep photos consistent in size and style (team unity looks great! 🤝)</li>
                        <li>Use high-quality images (your team deserves to look amazing! ✨)</li>
                        <li>Write engaging but concise bios (capture personalities! 🎭)</li>
                        <li>Double-check all those social media links (we don't want any 404s! 🚫)</li>
                        <li>Consider mobile view (looking good on all devices! 📱)</li>
                    </ul>
                </div>
            </div>
    
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">⚠️ Don't Forget! Super Important! ⚠️</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <p class="text-lg font-semibold text-red-600 dark:text-red-400">👉 Always click that "Apply Changes" button to save your work! 💾</p>
                    <p class="mt-2">We don't want to lose any of your awesome customizations!</p>
                </div>
            </div>
    
            <div class="mt-6 text-center">
                <p class="text-xl font-bold text-purple-600 dark:text-purple-300">Ready to Show Off Your Amazing Team? 🌟</p>
                <p class="text-lg mt-2">Your team deserves the spotlight - let's make it shine! ✨</p>
                <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Great teams deserve great presentations! 🏆</p>
            </div>
        </div>
    </div>`,
    "quiz": [
      {
        "question": "Where do you find team section templates?",
        "options": [
          "Components section",
          "Blocks section",
          "Media library",
          "Settings panel"
        ],
        "correct": 1
      },
      {
        "question": "Which icon do you click to modify text content?",
        "options": [
          "Cog icon",
          "Star icon",
          "'T' icon",
          "Plus icon"
        ],
        "correct": 2
      },
   
      {
        "question": "How do you add a team section to your canvas?",
        "options": [
          "Copy and paste",
          "Double click",
          "Drag and drop",
          "Right click"
        ],
        "correct": 2
      },
      {
        "question": "Which icon opens the image detailed editor?",
        "options": [
          "Plus icon",
          "T icon",
          "Star icon",
          "Cog icon"
        ],
        "correct": 3
      },
   
      {
        "question": "What's the final step to save your changes?",
        "options": [
          "Press Enter",
          "Close the editor",
          "Click Apply Changes",
          "Refresh page"
        ],
        "correct": 2
      },
   
      {
        "question": "What should you consider for team bios?",
        "options": [
          "Length only",
          "Format only",
          "Engaging but concise content",
          "Technical details only"
        ],
        "correct": 2
      },
 
      {
        "question": "How do you access link settings?",
        "options": [
          "Main menu",
          "Right click",
          "Through detailed editor",
          "Settings panel"
        ],
        "correct": 2
      },
      {
        "question": "What happens if you don't click Apply Changes?",
        "options": [
          "Auto-saves",
          "Prompts warning",
          "Changes are lost",
          "Saves draft"
        ],
        "correct": 2
      },
  
      {
        "question": "What's the recommended approach for team photos?",
        "options": [
          "Low resolution",
          "High-quality images",
          "Small size only",
          "Black and white only"
        ],
        "correct": 1
      }
    ]
      },
      {
        "id": 19,
        "title": "Testimonials",
        "content": `<div class="space-y-6">
        <h2 className="text-2xl font-bold">💬 Time to Show Off Your Raving Fans! </h2>        
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Ready to Show Off Your Amazing Reviews? 🌟</h3>
            <video className="w-full rounded-lg" controls>
      <source src="https://awb-silk.vercel.app/Testimonal(720p).mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video><br>
            <blockquote class="border-l-4 border-purple-500 pl-4 italic mb-4 text-lg">
            "Nothing sells better than happy customers telling your story!"
            </blockquote>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Getting Started is a Breeze! 🚀</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <p class="mb-4">Let's showcase those amazing reviews! Here's how:</p>
                        <ol class="list-decimal pl-4 space-y-2">
                            <li>Head to the blocks section (where the testimonial magic happens! ✨)</li>
                            <li>Find 'Testimonials' in the options (we've got some stunning layouts ready!)</li>
                            <li>Love what you see? Just drag and drop onto your canvas (easy peasy! 🎯)</li>
                            <li>Now let's make those reviews pop! 🎨</li>
                        </ol>
                    </div>
                </div>
            </div>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Making Those Reviews Look Amazing! 🌟</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <div class="space-y-6">
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">1. Review Magic ✏️</h6>
                                <p class="mb-2">Time to make those testimonials shine:</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Click on any testimonial text to edit</li>
                                    <li>Spot the text editor icon in the popup</li>
                                    <li>Add customer names, roles, and their amazing feedback! 👤</li>
                                    <li>Pro tip: Keep testimonials authentic and relatable! 🎯</li>
                                </ul>
                            </div>
    
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">2. Customer Photos Looking Sharp! 📸</h6>
                                <p class="mb-2">Let's make those customer photos stand out:</p>
                                <ul class="list-disc pl-4 space-y-2">
                                    <li>Select any customer's profile picture</li>
                                    <li>Click the settings icon to open editing options</li>
                                    <li>Time to make your happy customers look their best! 🦸‍♂️</li>
                                </ul>
                            </div>
    
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">3. Customization Central 🎮</h6>
                                <div class="space-y-4">
                                    <div class="bg-purple-50/50 p-3 rounded">
                                        <p class="font-semibold">Style Your Reviews 🎨</p>
                                        <ul class="list-disc pl-4">
                                            <li>Round those corners for a modern look</li>
                                            <li>Play with background colors</li>
                                            <li>Match your website's awesome style!</li>
                                        </ul>
                                    </div>
    
                                    <div class="bg-blue-50/50 p-3 rounded">
                                        <p class="font-semibold">Connect & Share 🔗</p>
                                        <ul class="list-disc pl-4">
                                            <li>Link to full case studies</li>
                                            <li>Add customer website links</li>
                                            <li>Connect social proof profiles</li>
                                            <li>Make everything clickable!</li>
                                        </ul>
                                    </div>
    
                                    <div class="bg-green-50/50 p-3 rounded">
                                        <p class="font-semibold">Photo Perfect 🖼️</p>
                                        <ul class="list-disc pl-4">
                                            <li>Upload those smiling customer photos</li>
                                            <li>Perfect the image dimensions</li>
                                             <li>Make every testimonial picture-perfect!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Pro Tips for Testimonial Excellence! 💫</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li>Keep testimonials short and sweet (punchy is perfect! 🎯)</li>
                        <li>Use high-quality customer photos (real people, real impact! ✨)</li>
                        <li>Include customer roles and companies (adds credibility! 🏢)</li>
                        <li>Mix up testimonial lengths (variety is the spice of life! 🌶️)</li>
                        <li>Test the mobile view (looking good everywhere! 📱)</li>
                    </ul>
                </div>
            </div>
    
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">⚠️ Quick Reminder! Don't Forget! ⚠️</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <p class="text-lg font-semibold text-red-600 dark:text-red-400">👉 Hit that "Apply Changes" button to save your masterpiece! 💾</p>
                    <p class="mt-2">Those amazing testimonials won't save themselves!</p>
                </div>
            </div>
    
            <div class="mt-6 text-center">
                <p class="text-xl font-bold text-purple-600 dark:text-purple-300">Ready to Showcase Your Happy Customers? 🌟</p>
                <p class="text-lg mt-2">Let their words of praise shine bright! ✨</p>
                <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Happy customers make the best storytellers! 📖</p>
            </div>
        </div>
    </div>`,
    
      "quiz": [
        {
          "question": "Where can you find testimonial section templates?",
          "options": [
            "Components library",
            "Blocks section",
            "Media gallery",
            "Settings menu"
          ],
          "correct": 1
        },
        {
          "question": "What's the first step to edit testimonial text?",
          "options": [
            "Right click",
            "Double click",
            "Click the text editor icon",
            "Press Enter"
          ],
          "correct": 2
        },
        {
          "question": "What's recommended for testimonial length?",
          "options": [
            "As long as possible",
            "Short and brief",
            "Minimum 500 words",
            "One sentence only"
          ],
          "correct": 1
        },
        {
          "question": "How do you add a testimonial section to your canvas?",
          "options": [
            "Copy and paste",
            "Right click to add",
            "Drag and drop",
            "Use keyboard shortcut"
          ],
          "correct": 2
        },
    
        {
          "question": "What adds credibility to testimonials?",
          "options": [
            "Fancy fonts",
            "Customer roles and companies",
            "Long paragraphs",
            "Multiple colors"
          ],
          "correct": 1
        },
        {
          "question": "How do you save your testimonial changes?",
          "options": [
            "Auto-saves",
            "Press Enter",
            "Click Apply Changes",
            "Close editor"
          ],
          "correct": 2
        },
   
        {
          "question": "What's important for mobile optimization?",
          "options": [
            "Testing the mobile view",
            "Removing images",
            "Shorter text only",
            "Different colors"
          ],
          "correct": 0
        },
      
        {
          "question": "How should testimonial photos be displayed?",
          "options": [
            "Random sizes",
            "Consistent dimensions",
            "No photos needed",
            "Text only"
          ],
          "correct": 1
        },
        {
          "question": "What happens if you don't save changes?",
          "options": [
            "Auto-saves",
            "Prompts warning",
            "Changes are lost",
            "Saves draft"
          ],
          "correct": 2
        },
     
        {
          "question": "What's important for testimonial photos?",
          "options": [
            "Artistic filters",
            "Professional headshots only",
            "Real customer photos",
            "No photos needed"
          ],
          "correct": 2
        },
      
      ]
    
      },
      {
        "id": 20,
        "title": "Titles",
        "content": `<div class="space-y-6">
          <h2 class="text-2xl font-bold">Craft Perfect Titles That Grab Attention! 📝</h2>
          <video className="w-full rounded-lg" controls>
          <source src="https://awb-silk.vercel.app/Titles(720p).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video><br>
          <div class="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/30 dark:to-orange-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Make Your Titles Stand Out! ✨</h3>
            
            <blockquote class="border-l-4 border-rose-500 pl-4 italic mb-4 text-lg">
              "A great title is like a key - it unlocks your reader's attention!" 
              <footer class="text-sm mt-2">- Content Creation 101 🔑</footer>
            </blockquote>


            <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Quick Start Guide! 🚀</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ol class="list-decimal pl-4 space-y-2">
              <li>Find Titles under the Blocks section</li>
              <li>Browse through different title designs</li>
              <li>Drag and drop your favorite style</li>
              <li>Click to customize - it's that easy!</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Customization Magic! 🎯</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <ul class="list-disc pl-4 space-y-2">
              <li><span class="font-semibold">Background:</span> Colors, overlays, and images!</li>
              <li><span class="font-semibold">Padding:</span> Perfect spacing above and below</li>
              <li><span class="font-semibold">Position:</span> 8 different background positions</li>
              <li><span class="font-semibold">Parallax:</span> Add that cool scrolling effect!</li>
            </ul>
          </div>
        </div>
      </div>
  
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Your Trusty Tools! 🛠️</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
            <li><span class="font-semibold">⚙️ Settings (Cog):</span> Customize everything about your title</li>
            <li><span class="font-semibold">🔄 Clone:</span> Duplicate your perfectly styled title</li>
            <li><span class="font-semibold">🗑️ Delete:</span> Remove elements you don't need</li>
          </ul>
        </div>
      </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Pro Tips! 💫</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <ul class="list-disc pl-4 space-y-2">
            <li>Test parallax in preview mode for the full effect! 🎬</li>
            <li>Try different background positions for unique looks</li>
            <li>Use overlays to make text pop against images</li>
            <li>Keep mobile users in mind when sizing text</li>
          </ul>
        </div>
      </div>

      <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Quick Style Guide! 🎨</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <ul class="list-disc pl-4 space-y-2">
          <li>Background Position Options:
            <ul class="list-disc pl-6 mt-2">
              <li>Top: left, center, right</li>
              <li>Bottom: left, center, right</li>
              <li>Center center</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
      
            <div class="bg-white/50 p-6 rounded-lg mb-6">
              <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Title Writing Essentials! 🎯</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                  <p class="mb-4">Your title checklist for success:</p>
                  <ol class="list-decimal pl-4 space-y-2">
                    <li>Clear and concise messaging</li>
                    <li>Compelling keywords that grab attention</li>
                    <li>Proper length for different platforms</li>
                    <li>Alignment with content purpose</li>
                    <li>SEO-friendly structure</li>
                  </ol>
                </div>
              </div>
            </div>
      
            <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Title Types & Their Uses 📚</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <div class="space-y-4">
                  <div class="border-b pb-4">
                    <p class="font-semibold">Question Titles ❓</p>
                    <p class="mt-2">Engage readers by addressing their curiosity. Perfect for blog posts and FAQs!</p>
                  </div>
                  
                  <div class="border-b pb-4">
                    <p class="font-semibold">How-To Titles 🛠️</p>
                    <p class="mt-2">Clear, action-oriented titles that promise solutions. Great for tutorials and guides!</p>
                  </div>
                  
                  <div class="border-b pb-4">
                    <p class="font-semibold">List Titles 📋</p>
                    <p class="mt-2">Numbers grab attention and set clear expectations. Ideal for tips and strategies!</p>
                  </div>
      
                  <div class="border-b pb-4">
                    <p class="font-semibold">Statement Titles 📢</p>
                    <p class="mt-2">Bold declarations that make readers think. Perfect for thought leadership!</p>
                  </div>
                </div>
              </div>
            </div>
      
            <div class="bg-amber-50 dark:bg-amber-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Title Writing Best Practices! 💡</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li>Use power words that evoke emotion</li>
                  <li>Keep it under 60 characters for SEO</li>
                  <li>Include relevant keywords naturally</li>
                  <li>Make it specific and meaningful</li>
                  <li>Test different variations</li>
                  <li>Ensure it matches the content</li>
                </ul>
              </div>
            </div>
      
            <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Title Formatting Tips 🎨</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <div class="space-y-4">
                  <div class="border-b pb-4">
                    <p class="font-semibold">Typography 🔤</p>
                    <p class="mt-2">Choose readable fonts, proper sizing, and clear hierarchy.</p>
                  </div>
                  
                  <div class="border-b pb-4">
                    <p class="font-semibold">Color & Contrast 🎨</p>
                    <p class="mt-2">Ensure readability with appropriate color choices and contrast ratios.</p>
                  </div>
                  
                  <div class="border-b pb-4">
                    <p class="font-semibold">Spacing & Alignment ↔️</p>
                    <p class="mt-2">Give titles room to breathe with proper margins and padding.</p>
                  </div>
                </div>
              </div>
            </div>
      
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Common Title Mistakes to Avoid! ⚠️</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li>Clickbait that doesn't deliver</li>
                  <li>Keyword stuffing</li>
                  <li>Being too vague or generic</li>
                  <li>Making it too long</li>
                  <li>Forgetting mobile optimization</li>
                  <li>Inconsistent capitalization</li>
                </ul>
              </div>
            </div>
      
            <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-6">
              <h5 class="font-semibold">Title SEO Tips 🔍</h5>
              <div class="bg-white/70 p-4 rounded mt-4">
                <ul class="list-disc pl-4 space-y-2">
                  <li>Include primary keyword near the beginning</li>
                  <li>Use numbers and power words</li>
                  <li>Keep it under 60 characters</li>
                  <li>Make it unique and descriptive</li>
                  <li>Use modifiers like "best," "guide," "how to"</li>
                </ul>
              </div>
            </div>
      
            <div class="mt-6 text-center">
              <p class="text-xl font-bold text-rose-600 dark:text-rose-300">Ready to Write Attention-Grabbing Titles? 🌟</p>
              <p class="text-lg mt-2">Remember, your title is like a handshake - it's the first thing people notice! Make it count!</p>
            </div>
          </div>
        </div>`,
        "quiz": [
          {
            "question": "Where can you find the Titles option?",
            "options": [
              "Components section",
              "Blocks section",
              "Elements section",
              "Design section"
            ],
            "correct": 1
          },
          {
            "question": "Which tool allows you to duplicate a title?",
            "options": [
              "Delete tool",
              "Settings tool",
              "Clone tool",
              "Copy tool"
            ],
            "correct": 2
          },
          {
            "question": "Where should you test parallax effects?",
            "options": [
              "In the builder",
              "In preview mode",
              "In settings",
              "In style editor"
            ],
            "correct": 1
          },
          {
            "question": "How many background position options are available?",
            "options": [
              "6 positions",
              "7 positions",
              "8 positions",
              "9 positions"
            ],
            "correct": 2
          },
          {
            "question": "Which icon opens the Detail Editor?",
            "options": [
              "Hammer icon",
              "Cog icon",
              "Pencil icon",
              "Brush icon"
            ],
            "correct": 1
          },
          {
            "question": "What appears when you click on title text?",
            "options": [
              "Two tools",
              "Three tools",
              "Four tools",
              "Five tools"
            ],
            "correct": 1
          },
          {
            "question": "What can you adjust in the padding settings?",
            "options": [
              "Left and right",
              "Top and bottom",
              "All sides",
              "Center only"
            ],
            "correct": 1
          },
          {
            "question": "What are the parallax options?",
            "options": [
              "On/Off",
              "High/Low",
              "Fast/Slow",
              "Smooth/Sharp"
            ],
            "correct": 0
          },
          {
            "question": "Where is the background overlay option found?",
            "options": [
              "Main menu",
              "Detail Editor",
              "Style panel",
              "Format menu"
            ],
            "correct": 1
          },
          {
            "question": "How do you access title customization options?",
            "options": [
              "Double click",
              "Right click",
              "Click outer block",
              "Drag and drop"
            ],
            "correct": 2
          }
        ]
      },
      {
        "id": 21,
        "title": "Popups",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Pop Into Action! 🎉</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Pop_Ups(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Let's Make Those Popups Pop! 💫</h3>
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "A well-timed popup is like a friendly tap on the shoulder - helpful, not annoying! 😡"
          <footer class="text-sm mt-2">- Your Pop-Up Pal</footer>
      </blockquote>
  
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Ready to Pop? Here's How! 🎈</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <p class="mb-4">It's as easy as pie! Check this out:</p>
            <ol class="list-decimal pl-4 space-y-2">
              <li>Hop over to 'Blocks' (that's where the magic happens! ✨)</li>
              <li>Find the 'Pop Up' option (it's like finding treasure! 💎)</li>
              <li>See a template you love? Grab it and drop it in! 🎯</li>
              <li>Ta-da! You're already looking like a pro! 🌟</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">The Anatomy of an Awesome Pop-Up! 🔍</h5>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <p class="mb-4">Every pop-up has these super cool parts:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Header:</span> Your attention-grabbing headline! Make it pop! 🎪</li>
                
                <li><span class="font-semibold">Text:</span> A friendly little message that makes people want to stay! 💌</li>
                
                <li><span class="font-semibold">Email Field:</span> Where the magic connection happens! ✉️</li>
                
                <li><span class="font-semibold">Subscribe Button:</span> Make it irresistible to click! 🎯</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Time to Make It Your Own! 🎨</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <p class="mb-4">Here's your super-quick editing toolkit:</p>
          <ol class="list-decimal pl-4 space-y-2">
            <li>Click any element you want to change 👆</li>
            <li>Look at those cool icons that pop up:
              <ul class="list-disc pl-6 mt-2">
                <li>T icon = Text magic! ✍️</li>
                <li>⚙️ icon = Settings!</li>
                <li>Clone icon = Duplicate the items!</li>
                <li>Delete icon = Oops, changed my mind!</li>
              </ul>
            </li>
            <li>Click the T icon to wave goodbye to that boring lorem ipsum! 👋</li>
            <li>Write something that makes people smile! 😊</li>
          </ol>
        </div>
      </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">🌟 Pop-Up Pro Tips!</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
      <li>Keep your header short and sweet - like a candy bar! 🍫</li>
      <li>Write text that makes people feel special! ✨</li>
      <li>Make your subscribe button fun - "Yes, I want awesome stuff!" 🎁</li>
      <li>Don't forget to test your pop-up - click all the things! 🔍</li>
      </ul>
      </div>
    </div>

  <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">🎯 Making Pop-Ups People Love!</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
      <li>Be friendly - think of it as saying hi to a friend! 👋</li>
      <li>Offer something awesome - who doesn't love presents? 🎁</li>
      <li>Keep it short - less is more (like a tweet, but cuter!) 🐦</li>
      <li>Make it pretty - because we all love pretty things! 🌈</li>
    </ul>
      </div>
    </div>
  
      <div class="bg-pink-50 dark:bg-pink-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Quick Reminders for Pop-Up Success! 🌟</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
        <ul class="list-disc pl-4 space-y-2">
        <li>Preview your pop-up - make sure it looks amazing! 👀</li>
        <li>Test that email field - does it work like a charm? ✉️</li>
        <li>Check your button - is it clickable and cute? 🎯</li>
        <li>Mobile check - because phones need love too! 📱</li>
        <li>And pleeeease don't forget to save! (We love your work too much to lose it! 💝)</li>
      </ul>
        </div>
      </div>

      
      <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">🎯 Popup Best Practices</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <ul class="list-disc pl-4 space-y-2">
          <li>Wait at least 5 seconds before showing a popup! ⏰</li>
          <li>Always provide a clear way to close it! ❌</li>
          <li>Keep mobile users in mind - size matters! 📱</li>
          <li>Don't show the same popup twice in one session! 🔄</li>
        </ul>
      </div>
    </div>

    <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Common Popup Mistakes to Avoid! ⚠️</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
        <ul class="list-disc pl-4 space-y-2">
          <li>Showing popups immediately (let visitors explore first!)</li>
          <li>Making close buttons tiny or hard to find</li>
          <li>Using aggressive or pushy language</li>
          <li>Showing too many popups at once</li>
        </ul>
      </div>
    </div>

  
      <br />
      <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
      <h5 class="font-semibold">Before You Go! 🌈</h5>
      <p class="mt-2">Did someone say "Save Changes"? Yes, yes they did! 💾</p>
      <p class="mt-2">Because nobody likes redoing their awesome work! 🎨</p>
    </div>

  
      <div class="mt-6 text-center">
        <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Make Pop-Up Magic? ✨</p>
        <p class="text-lg mt-2">Go for it! Your website visitors are gonna love this! 🚀</p>
        </div>
    </div>
  </div>`,
  "quiz": [
    {
    "question": "Where can you find Pop-Up templates in the interface?",
    "options": [
    "In the Settings menu",
    "Under the Layout section",
    "Under the Blocks section",
    "In the Theme options"
    ],
    "correct": 2
    },
   
    {
    "question": "Which icon should you click to edit text in a Pop-Up?",
    "options": [
    "Delete icon",
    "Clone icon",
    "T icon",
    "Settings icon"
    ],
    "correct": 2
    },
    {
    "question": "What icons appear in the quick menu when clicking a Pop-Up element?",
    "options": [
    "Only delete icon",
    "Only settings icon",
    "Text, settings, clone, and delete icons",
    "Only text icon"
    ],
    "correct": 2
    },
    {
    "question": "What should you do before finalizing your Pop-Up?",
    "options": [
    "Delete it",
    "Test all elements",
    "Remove all text",
    "Hide it"
    ],
    "correct": 1
    },
   
    {
    "question": "How should Pop-Up headers be written?",
    "options": [
      "At least 1000 words",
      "Short and engaging",
    "With no spaces",
    "All words in capital letters"
    ],
    "correct": 1
    },
 
    {
    "question": "What's important to check regarding mobile devices?",
    "options": [
    "Nothing",
    "Only the colors",
    "How the Pop-Up displays on mobile",
    "Only the text size"
    ],
    "correct": 2
    },
    {
    "question": "What happens when you click the clone icon?",
    "options": [
    "Deletes the element",
    "Duplicates the element",
    "Edits the text",
    "Changes settings"
    ],
    "correct": 1
    },
  
    {
    "question": "What should you do after making changes to your Pop-Up?",
    "options": [
    "Nothing",
    "Delete it",
    "Save changes",
    "Hide it"
    ],
    "correct": 2
    },
 
    {
    "question": "What's the purpose of previewing your Pop-Up?",
    "options": [
    "To delete it",
    "To check how it looks and functions",
    "To duplicate it",
    "To hide it"
    ],
    "correct": 1
    },
    {
    "question": "What should you consider when writing Pop-Up content?",
    "options": [
    "Use technical terms only",
    "Make it as long as possible",
    "Make it user-friendly and engaging",
    "Use no punctuation"
    ],
    "correct": 2
    },
  
    ]
      }
    ]
  },
  {
    "id": 4,
    "title": "Countdowns",
    "units": [
      {
        "id": 1,
        "title": "Creating Countdown Timers",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">⏱️ Let's Make Time Fun! Create Awesome Countdown Timers 🎉</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Countdown_timer(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 p-6 rounded-xl">
            <h3 class="text-2xl font-semibold mb-4 text-center">Hey Time Wizard! Ready to Create Some Magic? ✨</h3>
            
            <blockquote class="border-l-4 border-orange-500 pl-4 italic mb-4 text-lg">
            "Every second counts! Let's make them exciting with countdown timers."
                        </blockquote>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-orange-50 dark:bg-orange-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Let's Get This Party Started! 🎈</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <p class="mb-4">Creating your first countdown timer is super easy and fun! Here's how:</p>
                        <ol class="list-decimal pl-4 space-y-2">
                            <li>Head over to the components section (that's where all the cool stuff lives! 😎)</li>
                            <li>Look for 'Timers' - we've got some awesome templates waiting for you!</li>
                            <li>Found one that makes you go "Wow!"? Just drag and drop it onto your canvas</li>
                            <li>Click on your timer and look for the magical cog icon - that's where the real fun begins! ✨</li>
                        </ol>
                    </div>
                </div>
            </div>
    
            <div class="bg-white/50 p-6 rounded-lg mb-6">
                <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
                    <h5 class="font-semibold">Time to Make it Your Own! 🎨</h5>
                    <div class="bg-white/70 p-4 rounded mt-4">
                        <p class="mb-4">Once you click that cog icon, you'll find two amazing menus ready to help you create the perfect timer:</p>
                        
                        <div class="space-y-4">
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">1. Style Settings - Make it Pop! 💅</h6>
                                <p class="mb-2">This is where your timer gets its personality! Play around with:</p>
                                <ul class="list-disc pl-4">
                                    <li>Colors that match your vibe</li>
                                    <li>Fonts that speak your style</li>
                                    <li>Sizes that catch the eye</li>
                                    <li>Layouts that wow your visitors</li>
                                    <li>Animations that bring it to life!</li>
                                </ul>
                            </div>
    
                            <div class="bg-white/50 p-4 rounded">
                                <h6 class="font-semibold mb-2">2. Countdown Settings - The Heart of Your Timer! ⏰</h6>
                                <p class="mb-2">Here's where the magic happens! You've got so many cool options:</p>
                                
                                <div class="space-y-4">
                                    <div class="bg-white/50 p-4 rounded">
                                        <h6 class="font-semibold">Time Settings 📅</h6>
                                        <ul class="list-disc pl-4">
                                            <li>Pick your perfect date and time (big event coming up? 🎊)</li>
                                            <li>Choose between one-time or daily countdowns (perfect for daily specials!)</li>
                                            <li>Set up timezone handling (your global audience will thank you! 🌍)</li>
                                        </ul>
                                    </div>
    
                                    <div class="bg-white/50 p-4 rounded">
                                        <h6 class="font-semibold">Display Options 👀</h6>
                                        <ul class="list-disc pl-4">
                                            <li>Show days, hours, minutes - mix and match!</li>
                                            <li>Add custom labels (get creative! 🎨)</li>
                                            <li>Style your numbers and separators</li>
                                        </ul>
                                    </div>
    
                                    <div class="bg-white/50 p-4 rounded">
                                        <h6 class="font-semibold">Behavior Settings 🎯</h6>
                                        <ul class="list-disc pl-4">
                                            <li>Keep counting on next visit (for those return customers!)</li>
                                            <li>Reset with every visit (perfect for limited-time offers!)</li>
                                            <li>Daily resets (great for "Deal of the Day"!)</li>
                                            <li>Redirect when time's up (surprise your visitors! 🎁)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Psst! Some Super Secret Pro Tips! 🤫</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li>Want to see your timer in action? Use the preview mode - it's like a sneak peek into the future! 👀</li>
                        <li>Got global visitors? Remember to think about timezones (we've got you covered with options! 🌍)</li>
                        <li>Test your timer with different scenarios - it's like being a time detective! 🕵️‍♂️</li>
                        <li>Setting up redirects? Make sure those URLs are perfect - we don't want any time travellers getting lost! 🚀</li>
                    </ul>
                </div>
            </div>
    
            <div class="bg-red-50 dark:bg-red-800 p-4 rounded-lg mb-4">
                <h5 class="font-semibold">Quick Heads Up! 📢</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <p class="mb-2">Just so you know:</p>
                    <ul class="list-disc pl-4 space-y-2">
                        <li>Your timer won't tick in the page builder (maybe it's shy! 🙈)</li>
                        <li>But don't worry - hit that preview button to see it dance! 💃</li>
                        <li>Always test your countdown scenarios before going live (better safe than sorry! 🥺)</li>
                    </ul>
                </div>
            </div>
    
            <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
                <h5 class="font-semibold">Cool Ways to Use Your Timer! 💡</h5>
                <div class="bg-white/70 p-4 rounded mt-4">
                    <ul class="list-disc pl-4 space-y-2">
                        <li>Product launches (3... 2... 1... BLAST OFF! 🚀)</li>
                        <li>Special offers (Quick! Before time runs out! ⚡)</li>
                        <li>Event countdowns (The party's about to start! 🎉)</li>
                        <li>Daily deals (New day, new awesome deal! 🎁)</li>
                        <li>Holiday specials (Ho ho ho! 🎅)</li>
                    </ul>
                </div>
            </div>
    
            <div class="mt-6 text-center">
                <p class="text-xl font-bold text-orange-600 dark:text-orange-300">Ready to Make Time Exciting? Let's Go! 🚀</p>
                <p class="text-lg mt-2">Your countdown adventure awaits!</p>
                <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">Remember: Time waits for no one - let's make it tick! ⏰</p>
            </div>
        </div>
    </div>`,
    "quiz": [
      {
        "question": "Where do you find countdown timer templates?",
        "options": [
          "Settings panel",
          "Components section",
          "Media library",
          "Format menu"
        ],
        "correct": 1
      },
      {
        "question": "Which icon do you click to access the timer editor?",
        "options": [
          "Star icon",
          "Plus icon",
          "Pencil icon",
          "Cog icon"
        ],
        "correct": 3
      },
 
      {
        "question": "Where can you see the countdown timer functioning?",
        "options": [
          "Page builder",
          "Preview mode",
          "Edit mode",
          "Style panel"
        ],
        "correct": 1
      },
  
      {
        "question": "What's a feature of the timer display?",
        "options": [
          "Animation only",
          "Sound effects",
          "Days, hours, minutes",
          "Seconds only"
        ],
        "correct": 2
      },
      {
        "question": "What happens when the countdown reaches zero?",
        "options": [
          "Timer stops",
          "Timer restarts",
          "Can redirect to another page",
          "Shows error"
        ],
        "correct": 2
      },
     
      {
        "question": "How do you add a timer to your canvas?",
        "options": [
          "Double click",
          "Right click",
          "Drag and drop",
          "Copy paste"
        ],
        "correct": 2
      },
      {
        "question": "What can you modify in Style settings?",
        "options": [
          "Only colors",
          "Only fonts",
          "Visual appearance and layout",
          "Only size"
        ],
        "correct": 2
      },
      {
        "question": "What's a visit-based timer option?",
        "options": [
          "Save progress",
          "Reset at every visit",
          "Pause timer",
          "Skip countdown"
        ],
        "correct": 1
      },
   
      {
        "question": "When should you test redirect functionality?",
        "options": [
          "After publishing",
          "During editing",
          "Before publishing",
          "Never"
        ],
        "correct": 2
      },
      {
        "question": "What's possible with daily countdowns?",
        "options": [
          "Monthly events only",
          "One-time events only",
          "Regular daily events",
          "Yearly events only"
        ],
        "correct": 2
      },
   
    ]
      }
    ]
  },
  {
    "id": 5,
    "title": "Rebuild & Speed Test",
    "units": [
      {
        "id": 1,
        "title": "Speed Optimisation",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Show Us What You've Learnt! 🎓</h2>
        <video className="w-full rounded-lg" controls>
        <source src="https://awb-silk.vercel.app/Pop_Ups(720p).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><br>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Time for Your Knowledge Check! 💫</h3>
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "Learning is a journey, and you're crushing it!"
          <footer class="text-sm mt-2">- Your Learning Buddy</footer>
      </blockquote>
  
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">The Rebuild Challenge! 🏗️</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <p class="mb-4">Time to put your skills to the test:</p>
            <ol class="list-decimal pl-4 space-y-2">
              <li>Study the provided website design carefully 🔍</li>
              <li>Plan your block and component strategy 📝</li>
              <li>Start rebuilding from top to bottom 🎯</li>
              <li>Match the design as closely as possible ✨</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Speed Test Time! ⚡</h5>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <p class="mb-4">Ready, set, build! Show us how fast you can:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Create Headers:</span> Set up those eye-catching headlines! 🎪</li>
                
                <li><span class="font-semibold">Add Components:</span> Drop in those features like a pro! 🎯</li>
                
                <li><span class="font-semibold">Style Elements:</span> Make everything look pixel-perfect! 🎨</li>
                
                <li><span class="font-semibold">Test Functionality:</span> Make sure everything works smoothly! ⚙️</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Your Module Mastery! 📚</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <p class="mb-4">You've learned so much! Let's put it all together:</p>
          <ol class="list-decimal pl-4 space-y-2">
            <li>Module 2: Blocks
              <ul class="list-disc pl-6 mt-2">
                <li>From Dashboards to Navigation 🎯</li>
                <li>Text, Media, and Grids magic ✨</li>
                <li>Icons and Maps mastery 🗺️</li>
              </ul>
            </li>
            <li>Module 3: Components
              <ul class="list-disc pl-6 mt-2">
                <li>CTAs that convert! 🎯</li>
                <li>Headers that wow! 🌟</li>
                <li>Galleries that shine! ✨</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Pro Tips for Success! 💡</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
      <li>Take a deep breath - you've got this! 🧘‍♂️</li>
      <li>Plan before you build 📝</li>
      <li>Stay organized with your blocks 🎯</li>
      <li>Test as you go! 🔍</li>
      </ul>
      </div>
    </div>
      
      <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
      <h5 class="font-semibold">Ready to Begin? 🚀</h5>
      <p class="mt-2">Click 'Start Assessment' to begin your challenge!</p>
      <p class="mt-2">Remember: Every master was once a beginner! 💫</p>
    </div>
  
      <div class="mt-6 text-center">
        <p class="text-xl font-bold text-blue-600 dark:text-blue-300">You've Got What It Takes! ⭐</p>
        <p class="text-lg mt-2">Time to shine and show your skills! 🌟</p>
        </div>
    </div>
  </div>`,     
       "quiz": [
      
        {
          "question": "What component is best suited for displaying user testimonials with profile pictures and ratings?",
          "options": [
            "Team",
            "Gallery",
            "Testimonials",
            "Features"
          ],
          "correct": 2
        },
    
        {
          "question": "What block type would you use to create a structured arrangement of images in columns and rows?",
          "options": [
            "Media",
            "Grid",
            "Gallery",
            "Layout"
          ],
          "correct": 1
        },
        {
          "question": "Which component is specifically designed to showcase step-by-step instructions or timelines?",
          "options": [
            "Features",
            "Content",
            "Processes",
            "Lists"
          ],
          "correct": 2
        },
        {
          "question": "What's the purpose of the Dividers component?",
          "options": [
            "To split content sections",
            "To create navigation menus",
            "To display images",
            "To add buttons"
          ],
          "correct": 0
        },
      
        {
          "question": "Which component would you use to display your company's service packages and their prices?",
          "options": [
            "Features",
            "Content",
            "Pricing",
            "Lists"
          ],
          "correct": 2
        },
        {
          "question": "What's the primary purpose of the Call to Action (CTA) component?",
          "options": [
            "Display images",
            "Show pricing",
            "Prompt user engagement",
            "List features"
          ],
          "correct": 2
        },
        {
          "question": "Which block allows you to add external content like code for web developers?",
          "options": [
            "Media",
            "Embeds",
            "Content",
            "Features"
          ],
          "correct": 1
        },
     
        {
          "question": "What component would you use to create an email newsletter signup form?",
          "options": [
            "Contact",
            "Subscribe",
            "Signup",
            "Forms"
          ],
          "correct": 1
        },
     
        {
          "question": "What's the purpose of the Popups component?",
          "options": [
            "Display advertisements",
            "Show notifications",
            "Asking users to subscribe",
            "All of the above"
          ],
          "correct": 3
        },
      
        {
          "question": "Which component would you use to display a collection of images?",
          "options": [
            "Media",
            "Slideshow",
            "Gallery",
            "Images"
          ],
          "correct": 2
        }
      ]
      }
    ]
  },

  {
    "id": 6,
    "title": "Recap and Practice",
    "units": [
      {
        "id": 1,
        "title": "Review and Practical Exercises",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Your Learning Journey Review! 📚</h2>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Look How Far You've Come! 🌟</h3>
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "Every unit completed is a step toward mastery. And you've mastered them all!"
          <footer class="text-sm mt-2">- Your Course Guide</footer>
      </blockquote>
  
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Module 2: Building Blocks Mastery! 🏗️</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <p class="mb-4">You've mastered all 11 essential building blocks:</p>
            <ul class="list-disc pl-4 space-y-2">
              <li>Crafting Dynamic Dashboards for user engagement 📊</li>
              <li>Creating Interactive Buttons that convert 🎯</li>
              <li>Mastering Text layouts and typography ✍️</li>
              <li>Handling Media like a pro 🎥</li>
              <li>Building Responsive Grids that adapt 📱</li>
              <li>Designing Eye-catching Headings ✨</li>
              <li>Implementing Intuitive Icons 🎨</li>
              <li>Integrating Interactive Maps 🗺️</li>
              <li>Structuring Clear Lists 📝</li>
              <li>Working with Embedded Content 🔧</li>
              <li>Creating Smooth Navigation Bars 🚀</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Module 3: Component Champion! 🏆</h5>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <p class="mb-4">You've conquered all 21 powerful components:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Engagement Tools:</span> CTAs, Contact Forms, Subscribe Forms 💌</li>
                <li><span class="font-semibold">Visual Elements:</span> Galleries, Headers, Titles, Popups ✨</li>
                <li><span class="font-semibold">Interactive Features:</span> Countdown Timers, Slideshows, Maps 🎯</li>
                <li><span class="font-semibold">Content Blocks:</span> Features, Processes, Testimonials 📝</li>
                <li><span class="font-semibold">Structure Elements:</span> Navigation, Footers, Dividers 🏗️</li>
                <li><span class="font-semibold">Team & Pricing:</span> Team Showcases, Pricing Tables 👥</li>
                <li><span class="font-semibold">Special Features:</span> Embeds, Signup Forms, Content Blocks ⚡</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Bonus Module: Countdown Champion! ⏱️</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <p class="mb-4">You've mastered the art of time with:</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Creating engaging countdown timers 🎯</li>
            <li>Building anticipation for launches 🚀</li>
            <li>Designing time-sensitive promotions ⏰</li>
            <li>Implementing event countdowns ✨</li>
          </ul>
        </div>
      </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Your Achievement Highlights! 🌟</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
      <li>Completed all 33 units across 3 modules! 🎓</li>
      <li>Mastered both fundamental blocks and advanced components 💪</li>
      <li>Built real-world practical skills 🛠️</li>
      <li>Ready for professional web development! 🚀</li>
      </ul>
      </div>
    </div>
      
      <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
      <h5 class="font-semibold">What's Next? 🎯</h5>
      <p class="mt-2">Time to put these skills into practice!</p>
      <p class="mt-2">Your journey to web development mastery continues... 🚀</p>
    </div>
  
      <div class="mt-6 text-center">
        <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Build Something Amazing? ⭐</p>
        <p class="text-lg mt-2">Your toolkit is complete - time to create! 🎨</p>
        </div>
    </div>
  </div>`,     
  
    "quiz": [
    
      {
        "question": "What component would you use to create a form for visitors to get in touch?",
        "options": [
          "Subscribe",
          "Signup",
          "Contact",
          "Features"
        ],
        "correct": 2
      },
      {
        "question": "Which block is essential for creating responsive columns of content?",
        "options": [
          "Lists",
          "Text",
          "Media",
          "Grids"
        ],
        "correct": 3
      },
      {
        "question": "What component is best suited for displaying a limited-time offer?",
        "options": [
          "Countdown timers",
          "Features",
          "Process",
          "Titles"
        ],
        "correct": 0
      },
   
      {
        "question": "What block type helps you integrate location-based information?",
        "options": [
          "Maps",
          "Embeds",
          "Media",
          "Navigation"
        ],
        "correct": 0
      },
    
      {
        "question": "What component would you use for automatically rotating content or images?",
        "options": [
          "Gallery",
          "Slideshows",
          "Media",
          "Features"
        ],
        "correct": 1
      },
    
      {
        "question": "What block type is used for decorative visual elements?",
        "options": [
          "Media",
          "Icons",
          "Buttons",
          "Text"
        ],
        "correct": 1
      },
    
      {
        "question": "What component would you use to create a step-by-step guide?",
        "options": [
          "Lists",
          "Content",
          "Processes",
          "Features"
        ],
        "correct": 2
      },
      {
        "question": "Which block is used for creating website navigation menus?",
        "options": [
          "Lists",
          "Buttons",
          "Navigation Bar",
          "Headers"
        ],
        "correct": 2
      },
      {
        "question": "Which component creates a visual separation between content sections?",
        "options": [
          "Dividers",
          "Spacing",
          "Layout",
          "Grid"
        ],
        "correct": 0
      },
      {
        "question": "What component displays customer feedback and reviews?",
        "options": [
          "Content",
          "Features",
          "Testimonials",
          "Team"
        ],
        "correct": 2
      },
   
  
    ]
  
      }
    ]
  },
 
  {
    "id": 7,
    "title": "Optimisation and Branding",
    "units": [
      {
        "id": 1,
        "title": "Website SEO",
        "content": `<div class="space-y-6">
        <h2 class="text-2xl font-bold">Master Website SEO! 🎯</h2>
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 class="text-2xl font-semibold mb-4 text-center">Let's Make Your Website Shine! ✨</h3>
          <blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-lg">
          "SEO is like being a friendly lighthouse in the vast internet ocean - helping visitors find their way to you!"
          <footer class="text-sm mt-2">- Your SEO Guide</footer>
      </blockquote>

      <!-- New Introduction Section -->
      <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl mb-6">
        <h3 class="text-2xl font-semibold mb-4 text-center">What is SEO? 🤔</h3>
        <div class="bg-white/70 p-4 rounded">
          <p class="mb-4">SEO (Search Engine Optimization) is how we make websites more visible on search engines like Google. Think of it as:</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Making your website easy to find when people search online 🔍</li>
            <li>Following best practices to rank higher in search results 📈</li>
            <li>Attracting the right visitors to your website naturally 🎯</li>
          </ul>
        </div>
      </div>
  
      <!-- New Why SEO Matters Section -->
      <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 p-6 rounded-xl mb-6">
        <h3 class="text-xl font-semibold mb-4">Why Should You Care About SEO? 💡</h3>
        <div class="bg-white/70 p-4 rounded">
          <ul class="list-disc pl-4 space-y-2">
            <li>Get more website visitors without paying for ads 💰</li>
            <li>Build trust with your audience through better visibility 🤝</li>
            <li>Stay ahead of competitors in search results 🏆</li>
            <li>Attract visitors who are actually interested in what you offer 🎯</li>
          </ul>
        </div>
      </div>
  
      <!-- New SEO Fundamentals Section -->
    <div class="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 p-6 rounded-xl mb-6">
      <h3 class="text-xl font-semibold mb-4">SEO Fundamentals for Beginners 📚</h3>
      <div class="bg-white/70 p-4 rounded">
        <p class="mb-4">Before diving deep, understand these basic concepts:</p>
        <ul class="list-disc pl-4 space-y-2">
          <li><span class="font-semibold">Keywords:</span> Words people use to search for your content 🔤</li>
          <li><span class="font-semibold">Search Rankings:</span> How high your website appears in search results 📊</li>
          <li><span class="font-semibold">Organic Traffic:</span> Visitors who find you through unpaid search results 🌱</li>
          <li><span class="font-semibold">User Experience:</span> How easy and pleasant your website is to use 😊</li>
        </ul>
      </div>
    </div>
    
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-indigo-50 dark:bg-indigo-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">On-Page SEO Essentials! 📝</h5>
          <div class="bg-white/70 p-4 rounded mt-4">
            <p class="mb-4">Let's master these key elements:</p>
            <ul class="list-disc pl-4 space-y-2">
              <li>Title Tags: Your page's perfect first impression! 👋</li>
              <li>Meta Descriptions: Your website's elevator pitch ✨</li>
              <li>Header Tags: Organizing content like a pro (H1, H2, H3) 📚</li>
              <li>URL Structure: Keep it clean and meaningful 🎯</li>
              <li>Image Alt Text: Help search engines see your images 🖼️</li>
              <li>Internal Linking: Connect your content naturally 🔗</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="bg-white/50 p-6 rounded-lg mb-6">
        <div class="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg mb-4">
          <h5 class="font-semibold">Content is King! 👑</h5>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div class="bg-white/70 p-4 rounded">
              <p class="mb-4">Create content that visitors (and search engines) love:</p>
              <ul class="list-disc pl-4 space-y-2">
                <li><span class="font-semibold">Quality Content:</span> Valuable, original, and engaging! 💎</li>
                <li><span class="font-semibold">Keyword Research:</span> Find words your audience uses 🔍</li>
                <li><span class="font-semibold">Content Structure:</span> Easy to read, scan, and understand 📋</li>
                <li><span class="font-semibold">Regular Updates:</span> Keep your content fresh and relevant ⏰</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-yellow-50 dark:bg-yellow-800 p-4 rounded-lg mb-4">
        <h5 class="font-semibold">Technical SEO Magic! ⚡</h5>
        <div class="bg-white/70 p-4 rounded mt-4">
          <p class="mb-4">Behind-the-scenes optimization:</p>
          <ul class="list-disc pl-4 space-y-2">
            <li>Mobile-Friendly Design: Because phones matter! 📱</li>
            <li>Site Speed: Fast and smooth loading 🚀</li>
            <li>XML Sitemaps: Help search engines explore your site 🗺️</li>
            <li>Robots.txt: Guide search engine crawlers 🤖</li>
            <li>SSL Certificate: Keep it secure with HTTPS 🔒</li>
          </ul>
        </div>
      </div>

      <div class="bg-purple-50 dark:bg-purple-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Link Building & Authority! 🌟</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
      <li>Build quality backlinks from trusted sites 🔗</li>
      <li>Create shareable, link-worthy content 📢</li>
      <li>Engage with your industry community 👥</li>
      <li>Monitor your backlink profile 📊</li>
      </ul>
      </div>
    </div>

      <div class="bg-rose-50 dark:bg-rose-800 p-4 rounded-lg mb-4">
      <h5 class="font-semibold">Local SEO Tips! 🎯</h5>
      <div class="bg-white/70 p-4 rounded mt-4">
      <ul class="list-disc pl-4 space-y-2">
      <li>Google My Business optimization 🏪</li>
      <li>Local keywords and content 📍</li>
      <li>Customer reviews and ratings ⭐</li>
      <li>Local business citations 📑</li>
      </ul>
      </div>
    </div>
      
      <div class="bg-green-50 dark:bg-green-800 p-4 rounded-lg">
      <h5 class="font-semibold">SEO Best Practices! 🌈</h5>
      <p class="mt-2">Remember these golden rules:</p>
      <ul class="list-disc pl-4 mt-2 space-y-2">
        <li>Focus on user experience first 👥</li>
        <li>Create for humans, optimize for search engines 🎯</li>
        <li>Stay up-to-date with SEO trends 📈</li>
        <li>Track and measure your results 📊</li>
      </ul>
    </div>
  
      <div class="mt-6 text-center">
        <p class="text-xl font-bold text-blue-600 dark:text-blue-300">Ready to Optimize? 🚀</p>
        <p class="text-lg mt-2">Your journey to SEO success starts here! 💫</p>
        </div>
    </div>
  </div>`,     
  "quiz": [
    {
      "question": "What is the purpose of a title tag in SEO?",
      "options": [
        "To make text bold",
        "To appear in search engine results",
        "To style the website",
        "To organize images"
      ],
      "correct": 1
    },
    {
      "question": "Which element provides a brief summary of a page's content for search results?",
      "options": [
        "Header tag",
        "Title tag",
        "Meta description",
        "Alt text"
      ],
      "correct": 2
    },
    {
      "question": "What is the primary purpose of image alt text?",
      "options": [
        "Make images load faster",
        "Make images bigger",
        "Help search engines understand images",
        "Change image colors"
      ],
      "correct": 2
    },
    {
      "question": "Which is a best practice for URL structure?",
      "options": [
        "Use descriptive keywords",
        "Make it as long as possible",
        "Include random numbers",
        "Use spaces between words"
      ],
      "correct": 0
    },
 
    {
      "question": "What is the purpose of keywords in SEO?",
      "options": [
        "To make text bold",
        "To match search queries",
        "To add images",
        "To change colors"
      ],
      "correct": 1
    },
    {
      "question": "What does HTTPS do for a website?",
      "options": [
        "Makes it colorful",
        "Adds images",
        "Provides security",
        "Changes fonts"
      ],
      "correct": 2
    },
  
    {
      "question": "Why is Google My Business important for local SEO?",
      "options": [
        "It's not important",
        "Improves local visibility",
        "Changes website color",
        "Adds videos"
      ],
      "correct": 1
    },
 
    {
      "question": "Which heading tag should be used for the main title of a page?",
      "options": [
        "H1",
        "H2",
        "H3",
        "H4"
      ],
      "correct": 0
    },
    {
      "question": "What is the purpose of robots.txt?",
      "options": [
        "To add robots to the site",
        "To guide search engines",
        "To add animations",
        "To change colors"
      ],
      "correct": 1
    },
  
    {
      "question": "How often should you update your website content?",
      "options": [
        "Never",
        "Regularly",
        "Once a year",
        "Only when broken"
      ],
      "correct": 1
    },
  
  ]
      },
      {
        "id": 2,
        "title": "Adding Favicons and Social Media Links",
        "content": "Add branding elements like favicons and integrate social media for better user connectivity.",
        "quiz": []
      }
    ]
  },
  {
    "id": 8,
    "title": "AWB Tutor Course - Part 1",
    "units": [
      {
        "id": 1,
        "title": "Introduction to Teaching Skills",
        "content": "Develop teaching skills to share your knowledge with others effectively.",
        "quiz": []
      }
    ]
  },
  {
    "id": 9,
    "title": "AWB Tutor Course - Part 2",
    "units": [
      {
        "id": 1,
        "title": "Advanced Teaching Techniques",
        "content": "Learn advanced teaching strategies to deliver impactful lessons.",
        "quiz": []
      }
    ]
  },
  {
    "id": 10,
    "title": "Freelancing Readiness",
    "units": [
      {
        "id": 1,
        "title": "Becoming Freelance Ready",
        "content": "Learn how to set up a profile and attract clients for your website building services.",
        "quiz": []
      }
    ]
  },
  {
    "id": 11,
    "title": "Sales Strategies",
    "units": [
      {
        "id": 1,
        "title": "Sales Online and Locally",
        "content": "Understand strategies to market your services online and in your local area.",
        "quiz": []
      }
    ]
  }
];

const STORAGE_KEYS = {
  COMPLETED_UNITS: 'quiz_completed_units',
  EARNED_BADGES: 'quiz_earned_badges',
  CURRENT_PROGRESS: 'quiz_current_progress'
};

// Utility function to safely parse JSON from localStorage
const getStoredData = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue;
  }
};

// Utility function to safely store JSON in localStorage
const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage:`, error);
  }
};

const ModuleCompletionModal = ({ nextModule, onClose, onNextModule }) => {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    // Play applause sound
    const audio = new Audio('https://awb-silk.vercel.app/claps (1).mp3');
    audio.volume = 0.5; // Set volume to 50%
    const playPromise = audio.play().catch(error => {
      console.log("Audio playback failed:", error);
    });

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Burst confetti from random positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.4, 0.6) },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.4, 0.6) },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
    }, 250);

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }
    });

    setTimeout(() => setShowStars(true), 500);

    // Cleanup function
    return () => {
      clearInterval(interval);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          {showStars && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="absolute text-2xl"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                  }}
                >
                  ⭐
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex flex-col items-center"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mb-2" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Module Complete!
            </h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
          >
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Congratulations! You've completed this module and received a new badge! ✪
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 mt-8">
            {nextModule ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNextModule}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
              >
                Continue to {nextModule.title}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all"
              >
                Complete Course
                <Trophy className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
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

const ModuleTransition = ({ currentModule, nextModule, onContinue, onClose }) => {
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        <h2 className="text-3xl font-bold">Module Complete! 🎉</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Congratulations! You've completed
        </p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {currentModule.title}
        </p>

        <div className="py-4">
          <ArrowRight className="w-8 h-8 mx-auto text-gray-400" />
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300">
          Ready to begin
        </p>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {nextModule.title}
        </p>

        <div className="flex flex-col gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Next Module
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Return to Dashboard
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const ModuleListItem = React.memo(({ module, completedUnits, onClick }) => {
  const isModuleLocked = module.id !== 1 && !completedUnits.some(unit =>
    unit.moduleId === module.id - 1
  );

  // Darker color gradients based on module number
  const moduleColors = {
    1: 'from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-700',
    2: 'from-purple-600 to-violet-500 dark:from-purple-800 dark:to-violet-700',
    3: 'from-pink-600 to-rose-500 dark:from-pink-800 dark:to-rose-700',
    4: 'from-amber-600 to-yellow-500 dark:from-amber-800 dark:to-yellow-700',
    5: 'from-emerald-600 to-green-500 dark:from-emerald-800 dark:to-green-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className={`p-4 rounded-lg shadow-sm border ${isModuleLocked
          ? 'border-gray-300 dark:border-gray-700 bg-gray-800 dark:bg-gray-900 text-white opacity-80'
          : `border-transparent bg-gradient-to-r ${moduleColors[module.id] || moduleColors[1]} text-white`
        }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isModuleLocked ? (
              <Lock className="w-5 h-5 text-gray-400" />
            ) : (
              <Unlock className="w-5 h-5 text-white" />
            )}
            <h3 className={`text-lg font-semibold ${isModuleLocked ? 'text-gray-300' : 'text-white'}`}>
              Module {module.id}: {module.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className={`w-5 h-5 ${isModuleLocked ? 'text-gray-400' : 'text-yellow-300'}`} />
            <span className={`text-sm font-medium ${isModuleLocked ? 'text-gray-400' : 'text-white'}`}>
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
                className={`w-full text-left p-3 rounded-md flex items-center justify-between 
                  ${isModuleLocked || isUnitLocked
                    ? 'bg-gray-700/30 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 transition-colors'
                  }`}
              >
                <span className="flex items-center gap-2">
                  {isUnitCompleted ? (
                    <Medal className={`w-5 h-5 ${isModuleLocked ? 'text-gray-400' : 'text-yellow-300'}`} />
                  ) : isModuleLocked || isUnitLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Brain className="w-5 h-5 text-white" />
                  )}
                  <span className={isModuleLocked ? 'text-gray-400' : 'text-white'}>
                    Unit {unit.id}: {unit.title}
                  </span>
                </span>
                {isUnitCompleted && (
                  <span className={`text-sm px-2 py-1 ${isModuleLocked
                      ? 'bg-gray-600/30 text-gray-400'
                      : 'bg-white/20 text-white'
                    } rounded-full`}>
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

const ResetProgressButton = ({ onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    onReset();
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold mb-4">Reset Progress?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This will remove all your earned badges and completed units. This action cannot be undone.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
    >
      Reset Progress
    </button>
  );
};

const ModuleContent = ({ userData, modules = defaultCourseModules }) => {
  const [showModuleTransition, setShowModuleTransition] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [completedUnits, setCompletedUnits] = useState(() =>
    getStoredData(STORAGE_KEYS.COMPLETED_UNITS, [])
  );
  const [earnedBadges, setEarnedBadges] = useState(() =>
    getStoredData(STORAGE_KEYS.EARNED_BADGES, [])
  );
  const [showBadgeAward, setShowBadgeAward] = useState(null);
  const [quizState, setQuizState] = useState(() =>
    getStoredData(STORAGE_KEYS.CURRENT_PROGRESS, {
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    })
  );

  // Add these useEffect hooks to persist state changes
  useEffect(() => {
    setStoredData(STORAGE_KEYS.COMPLETED_UNITS, completedUnits);
  }, [completedUnits]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.EARNED_BADGES, earnedBadges);
  }, [earnedBadges]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.CURRENT_PROGRESS, quizState);
  }, [quizState]);

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

  const handleReset = useCallback(() => {
    setCompletedUnits([]);
    setEarnedBadges([]);
    setQuizState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      submitted: false,
      selectedAnswer: null,
      showFeedback: false
    });
    setSelectedModule(null);
    setSelectedUnit(null);
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

        // If module is complete and there's a next module, show transition
        if (isModuleComplete) {
          const nextModule = modules.find(m => m.id === selectedModule.id + 1);
          if (nextModule) {
            setTimeout(() => {
              setShowModuleTransition({
                currentModule: selectedModule,
                nextModule: nextModule
              });
            }, 1000);
          }
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
  }, [selectedModule, selectedUnit, modules]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 text-center space-y-6 relative">
        <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <GraduationCap className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-3xl font-bold">Course Completed! 🎓</h2>
        <p className="text-gray-600 dark:text-gray-300">Congratulations! You've completed all available modules.</p>
        <button
          onClick={() => {
            onClose();
            // Clear the selected module and unit states
            setSelectedModule(null);
            setSelectedUnit(null);
          }}
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
        const isModuleComplete = completedModuleUnits.length === allModuleUnits.length - 1;

        if (isModuleComplete) {
          setEarnedBadges(prev => {
            if (!prev.includes(selectedModule.id)) {
              return [...prev, selectedModule.id];
            }
            return prev;
          });

          setShowBadgeAward({
            ...badges[selectedModule.id],
            isLastBadge: selectedModule.id === modules.length
          });
        }
      }

      setQuizState(prev => ({ ...prev, submitted: true }));
    }
  }, [quizState, selectedModule, selectedUnit, audioContext, playSound, completedUnits, modules, badges]);


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

      // Check if this was the last unit in the module
      const isLastUnitInModule = selectedModule.units[selectedModule.units.length - 1].id === selectedUnit.id;
      const nextModule = modules.find(m => m.id === selectedModule.id + 1);
      const showModuleCompletion = passed && isLastUnitInModule;

      return (
        <>
          {showModuleCompletion && (
            <ModuleCompletionModal
              nextModule={nextModule}
              onClose={() => {
                setSelectedModule(null);
                setSelectedUnit(null);
              }}
              onNextModule={() => {
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
              }}
            />
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className={`p-8 rounded-xl shadow-lg ${isPerfectScore
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
                <Star className={`w-20 h-20 mx-auto mb-4 ${isPerfectScore ? "text-purple-400" : passed ? "text-yellow-400" : "text-gray-400"
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
              {passed && !isLastUnitInModule && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const nextUnit = selectedModule.units[selectedModule.units.findIndex(u => u.id === selectedUnit.id) + 1];
                    setSelectedUnit(nextUnit);
                    setQuizState({
                      currentQuestionIndex: 0,
                      correctAnswers: 0,
                      submitted: false,
                      selectedAnswer: null,
                      showFeedback: false
                    });
                    scrollModalToTop();
                  }}
                  className="flex items-center justify-center gap-3 px-8 py-4 mx-auto bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-xl font-bold shadow-lg"
                >
                  Go to Next Unit <ArrowRight className="w-6 h-6" />
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
        </>
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
  }, [quizState, selectedModule, selectedUnit, soundEnabled, handleAnswerSelect, scrollModalToTop]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Progress</h2>
        <strong><ResetProgressButton onReset={handleReset} /></strong>
      </div>

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

      {showModuleTransition && (
        <ModuleTransition
          currentModule={showModuleTransition.currentModule}
          nextModule={showModuleTransition.nextModule}
          onContinue={() => {
            setSelectedModule(showModuleTransition.nextModule);
            setSelectedUnit(showModuleTransition.nextModule.units[0]);
            setQuizState({
              currentQuestionIndex: 0,
              correctAnswers: 0,
              submitted: false,
              selectedAnswer: null,
              showFeedback: false
            });
            setShowModuleTransition(null);
            scrollModalToTop();
          }}
          onClose={() => {
            setSelectedModule(null);
            setSelectedUnit(null);
            setShowModuleTransition(null);
          }}
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

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, X, Brain, ArrowRight, Star, Music, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const defaultCourseModules = [
  {
    id: 1,
    title: "Introduction to Zylosite",
    content: `
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Introduction to Zylosite</h2>
        <p>Welcome to Zylosite! This platform empowers you to create stunning websites with ease. In this module, you'll learn the basics of the Zylosite platform and get familiar with its interface.</p>
        
        <h3 class="text-xl font-semibold">Core Concepts</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Platform overview and navigation</li>
          <li>Basic website building concepts</li>
          <li>Getting started with your first project</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-6">Key Features</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Dashboard orientation</li>
          <li>Project management tools</li>
          <li>Basic site settings</li>
        </ul>
      </div>
    `,
    quiz: [
      {
        question: "What is the primary purpose of Zylosite?",
        options: ["Email Marketing", "Website Building", "Social Media Management", "Content Writing"],
        correct: 1
      },
      {
        question: "Which feature is NOT part of the Zylosite dashboard?",
        options: ["Project Management", "Email Campaign Tools", "Site Settings", "Template Selection"],
        correct: 1
      }
    ]
  }
];

const ModuleContent = ({ userData, modules = defaultCourseModules }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([1]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Initialize AudioContext only if it's not already set
    if (!audioContext) {
      setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
    }
    
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const playSound = (type) => {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'correct':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case 'wrong':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(220, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case 'victory':
        playVictorySequence(audioContext);
        break;

      default:
        break;
    }
  };

  const playVictorySequence = (context) => {
    const playNote = (frequency, startTime, duration) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);
      
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = context.currentTime;
    const noteLength = 0.15;
    
    playNote(440, now, noteLength);
    playNote(554.37, now + noteLength, noteLength);
    playNote(659.25, now + noteLength * 2, noteLength);
    playNote(880, now + noteLength * 3, noteLength * 2);
  };

  const triggerConfetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    const defaults = {
      origin: { y: 0.7 },
      colors: colors,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(200 * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleModuleClick = (moduleId) => {
    const previousModuleCompleted = moduleId === 1 || completedModules.includes(moduleId - 1);
    
    if (!previousModuleCompleted) {
      if (audioContext?.state === 'suspended') {
        audioContext.resume().then(() => {
          playSound('wrong');
        });
      } else {
        playSound('wrong');
      }
      alert("Complete the previous level first! 🔒");
      return;
    }
    
    setSelectedModule(modules.find(m => m.id === moduleId));
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizSubmitted(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };
  
  const handleAnswerSelect = async (optionIndex) => {
    if (showFeedback) return;
    
    if (audioContext?.state === 'suspended') {
      await audioContext.resume();
    }
    
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
  
    const currentQuiz = selectedModule.quiz[currentQuestionIndex];
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
      setCorrectAnswers(prev => prev + 1);
    }
  
    if (currentQuestionIndex < selectedModule.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const finalScore = isCorrect ? correctAnswers + 1 : correctAnswers;
      const passed = finalScore === selectedModule.quiz.length;
      
      if (passed) {
        await new Promise(resolve => setTimeout(resolve, 200));
        playSound('victory');
        triggerConfetti();
        setCompletedModules(prev => [...prev, selectedModule.id + 1]);
      }
      
      setQuizSubmitted(true);
    }
  };

  const closeModal = () => {
    setSelectedModule(null);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizSubmitted(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const renderQuiz = () => {
    if (quizSubmitted) {
      const passed = correctAnswers === selectedModule.quiz.length;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className={`p-8 rounded-xl shadow-lg ${
            passed 
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
              : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
          }`}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: passed ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Star className={`w-20 h-20 mx-auto mb-4 ${passed ? "text-yellow-400" : "text-gray-400"}`} />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4">
              {passed ? "🎉 Super Star! 🌟" : "Almost There! 💫"}
            </h3>
            <p className="text-xl mb-2">You collected {correctAnswers} out of {selectedModule.quiz.length} stars!</p>
            <div className="flex justify-center gap-2 my-4">
              {Array.from({ length: correctAnswers }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
              {Array.from({ length: selectedModule.quiz.length - correctAnswers }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-gray-300" />
              ))}
            </div>
            {!passed && (
              <p className="mt-4 text-lg">Keep going! You're getting better with each try! 🚀</p>
            )}
          </div>
          
          {passed && selectedModule.id < modules.length ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModuleClick(selectedModule.id + 1)}
              className="flex items-center justify-center gap-3 px-8 py-4 mx-auto bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-xl font-bold shadow-lg"
            >
              Level Up! 🎮 <ArrowRight className="w-6 h-6" />
            </motion.button>
          ) : !passed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentQuestionIndex(0);
                setCorrectAnswers(0);
                setQuizSubmitted(false);
                setSelectedAnswer(null);
                setShowFeedback(false);
              }}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-xl font-bold shadow-lg"
            >
              Try Again! 🚀
            </motion.button>
          ) : null}
        </motion.div>
      );
    }

    const currentQuiz = selectedModule.quiz[currentQuestionIndex];
    
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {selectedModule.quiz.length}</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: currentQuestionIndex }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              {Array.from({ length: selectedModule.quiz.length - currentQuestionIndex }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <p className="text-xl font-medium mb-6">{currentQuiz.question}</p>
          <div className="space-y-4">
            {currentQuiz.options.map((option, oIndex) => (
              <motion.button
                key={oIndex}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(oIndex)}
                disabled={showFeedback}
                className={`w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all text-lg shadow-sm
                  ${showFeedback 
                    ? oIndex === currentQuiz.correct? "bg-green-100 dark:bg-green-900 border-green-500 shadow-green-200"
                    : oIndex === selectedAnswer
                      ? "bg-red-100 dark:bg-red-900 border-red-500 shadow-red-200"
                      : "border-gray-200 dark:border-gray-700"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md"
                } border-2`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${showFeedback && oIndex === currentQuiz.correct ? "border-green-500" : 
                  showFeedback && oIndex === selectedAnswer ? "border-red-500" : "border-gray-400"}`}
              >
                {showFeedback && oIndex === currentQuiz.correct && "✓"}
                {showFeedback && oIndex === selectedAnswer && oIndex !== currentQuiz.correct && "×"}
              </div>
              <span>{option}</span>
              {showFeedback && oIndex === currentQuiz.correct && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-green-600"
                >
                  🌟
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

return (
    <div>
      <div className="space-y-4">
        {Object.entries(userData.courseProgress).map(([module, status], index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleModuleClick(index + 1)}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600"
          >
            <p className="text-black dark:text-white flex-1 flex items-center font-medium">
              {status === "Completed" ? (
                <span className="mr-2 text-green-600 dark:text-green-400">
                  <Unlock className="w-5 h-5" />
                </span>
              ) : completedModules.includes(index + 1) ? (
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
              {status === "Completed" ? "Completed! 🌟" : "In Progress 🚀"}
            </span>
          </motion.div>
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
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="prose dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-900 dark:prose-p:text-gray-100">
                <div dangerouslySetInnerHTML={{ __html: selectedModule.content }} />
                
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

export default ModuleContent;
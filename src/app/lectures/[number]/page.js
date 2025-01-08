'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PlayCircle, Download, BookOpen, Calendar, Clock, ArrowUp } from 'lucide-react';
import { lectureData, getUserLectureStatus } from '@/utils/lectureData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';

export default function LecturePage({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const lectureNumber = parseInt(unwrappedParams.number);
  const [userProgress, setUserProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Auto scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const mockUserProgress = {
      1: { completed: true, started: true },
      2: { completed: false, started: true },
    };
    setUserProgress(mockUserProgress);
    setIsLoading(false);

    // Handle scroll button visibility
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ScrollToTopButton = () => (
    <AnimatePresence>
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 
            text-white rounded-full shadow-lg transition-colors duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );


  const lecture = lectureData[lectureNumber];
  const lectureStatus = getUserLectureStatus(lectureNumber, userProgress);

  const handleStartLecture = () => {
    markLectureStarted();
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  };

  const markLectureStarted = () => {
    setUserProgress(prev => ({
      ...prev,
      [lectureNumber]: { ...prev[lectureNumber], started: true }
    }));
  };

  const markLectureCompleted = () => {
    setUserProgress(prev => ({
      ...prev,
      [lectureNumber]: { started: true, completed: true }
    }));
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!lecture) {
    return <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Lecture not found</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-blue-600 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    </div>;
  }

  if (lectureStatus === "locked") {
    return <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Lecture Locked</h1>
        <p className="mb-4">Please complete the prerequisite lectures first.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-blue-600 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {isPlaying && (
          <VideoPlayer
            videoUrl={lecture.videoUrl}
            onClose={handleCloseVideo}
          />
        )}
        <ScrollToTopButton />
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </motion.button>

          {/* Lecture Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Lecture {lectureNumber}: {lecture.title}
              </h1>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <span className="text-gray-500 text-sm sm:text-base">{lecture.duration}</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
              {lecture.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={handleStartLecture}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Lecture
              </button>
              <button
                onClick={() => window.open(lecture.slides, '_blank')}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download Slides
              </button>
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-8"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Topics Covered
            </h2>
            <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base">
              {lecture.topics.map((topic, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Assignments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-8"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Assignments
            </h2>
            <div className="space-y-4">
              {lecture.assignments.map((assignment, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <h3 className="font-semibold text-sm sm:text-base">{assignment.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {assignment.description}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Due: {assignment.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">Additional Resources</h2>
            <ul className="space-y-2">
              {lecture.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline text-sm sm:text-base"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
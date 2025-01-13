"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { registrationData } from '@/utils/mockData';
import { Loader2 } from 'lucide-react';
import { 
  PersonCircle, 
  Building, 
  BarChartFill, 
  EnvelopeFill, 
  TelephoneFill, 
  GeoAltFill, 
  Calendar2Check,
  BoxArrowRight,
  CheckCircleFill,
  XCircleFill,
  XLg
} from 'react-bootstrap-icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ModuleContent from '@/components/ModuleContent';
import LecturesList from '@/components/LecturesList';
import { lectureData, getUserLectureStatus } from '@/utils/lectureData';
import AttendanceComponent from '@/components/AttendanceComponent';



// Course Progress Card Component
const CourseProgressCard = ({ courseProgress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const totalTopics = Object.keys(courseProgress).length;
  const completedTopics = Object.values(courseProgress).filter(status => status === "Completed").length;
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const getProgressColor = (percentage) => {
    if (percentage < 40) return { bg: 'bg-red-100', fill: 'bg-red-600' };
    if (percentage < 70) return { bg: 'bg-orange-100', fill: 'bg-orange-600' };
    if (percentage < 100) return { bg: 'bg-blue-100', fill: 'bg-blue-600' };
    return { bg: 'bg-green-100', fill: 'bg-green-600' };
  };

  const colors = getProgressColor(progressPercentage);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
      >
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <BarChartFill className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">Course Progress</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {completedTopics}/{totalTopics} Topics
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${colors.fill.replace('bg-', 'text-')} dark:text-${colors.fill.replace('bg-', '')}-400`}>
              {progressPercentage}% Complete
            </span>
          </div>
          <div 
            ref={ref}
            className={`w-full ${colors.bg} dark:bg-opacity-20 rounded-full h-2.5 overflow-hidden`}
          >
            <div
              className={`${colors.fill} dark:bg-opacity-90 h-full rounded-full transition-transform duration-1000 ease-out transform origin-left`}
              style={{
                transform: isVisible ? `scaleX(${progressPercentage / 100})` : 'scaleX(0)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Native Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Syllabus Coverage</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <XLg className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid gap-4">
                {Object.entries(courseProgress).map(([topic, status], index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      status === "Completed"
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {status === "Completed" ? (
                        <CheckCircleFill className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircleFill className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          status === "Completed"
                            ? "text-green-900 dark:text-green-100"
                            : "text-gray-900 dark:text-gray-100"
                        }`}>
                          {topic}
                        </h4>
                        <p className={`text-sm ${
                          status === "Completed"
                            ? "text-green-700 dark:text-green-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}>
                          {status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-gray-700 dark:text-gray-300 dark:text-gray-300">
                <p className="font-medium">Total Progress: {progressPercentage}%</p>
                <p>{completedTopics} out of {totalTopics} topics completed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Constants
const TUITION_FEE = 36696;
const PROGRESS_THRESHOLDS = {
  LOW: 40,
  MODERATE: 70,
  COMPLETE: 100
};

// Utility functions
const utils = {
  getTimeBasedGreeting: () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 22) return "Good evening";
    return "Happy late night";
  },

  getLastName: (fullName) => {
    const nameParts = fullName.split(' ');
    return nameParts[nameParts.length - 1];
  },

  getProgressColor: (percentage) => {
    if (percentage < PROGRESS_THRESHOLDS.LOW) return { bg: 'bg-red-100', fill: 'bg-red-600' };
    if (percentage < PROGRESS_THRESHOLDS.MODERATE) return { bg: 'bg-orange-100', fill: 'bg-orange-600' };
    if (percentage < PROGRESS_THRESHOLDS.COMPLETE) return { bg: 'bg-blue-100', fill: 'bg-blue-600' };
    return { bg: 'bg-green-100', fill: 'bg-green-600' };
  },

  getProgressStatus: (percentage) => {
    if (percentage < PROGRESS_THRESHOLDS.LOW) return 'Low';
    if (percentage < PROGRESS_THRESHOLDS.MODERATE) return 'Moderate';
    if (percentage < PROGRESS_THRESHOLDS.COMPLETE) return 'Progressing';
    return 'Completed!';
  }
};

// Reusable components
const MotionDiv = motion.div;

const AnimatedProgress = ({ percentage }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const colors = utils.getProgressColor(percentage);
  const status = utils.getProgressStatus(percentage);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${colors.fill.replace('bg-', 'text-')} dark:text-${colors.fill.replace('bg-', '')}-400`}>
          {status}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">{percentage}%</span>
      </div>
      <div ref={ref} className={`w-full ${colors.bg} dark:bg-opacity-20 rounded-full h-2.5`}>
        <MotionDiv
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${colors.fill} dark:bg-opacity-90 h-full rounded-full transition-colors duration-300`}
        />
      </div>
    </div>
  );
};

const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      {children}
    </MotionDiv>
  );
};

const FinancialProgress = ({ percentage }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const getProgressBarColor = (percentage) => {
    if (percentage === 0) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 100) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">Payments Made</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">{percentage}% paid</span>
      </div>
      <div ref={ref} className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <MotionDiv
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full ${getProgressBarColor(percentage)} dark:bg-opacity-90 rounded-full`}
        />
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
        <p className="text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
      </div>
    </div>
    <Footer />
  </div>
);

// Main Dashboard Component
export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  // Add these two new lines:
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  useEffect(() => {
    const userIndex = sessionStorage.getItem('userIndex');
    if (!userIndex) {
      router.push('/');
      return;
    }

    const user = registrationData["Form Responses 1"][parseInt(userIndex)];
    if (!user) {
      router.push('/');
      return;
    }

    setUserData(user);
    
    // Add this new section for coordinator data
    if (user["Role at School"]?.toLowerCase().includes('coordinator')) {
      const allStudentsData = registrationData["Form Responses 1"];
      setAllStudents(allStudentsData);
      setFilteredStudents(allStudentsData);
    }

    setPaymentProgress(Math.round((user.amountPaid / TUITION_FEE) * 100));
    setGreeting(utils.getTimeBasedGreeting());
    setIsLoading(false);

    const intervalId = setInterval(() => {
      setGreeting(utils.getTimeBasedGreeting());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('userIndex');
    router.push('/');
  };

  if (isLoading || !userData) {
    return <LoadingState />;
  }

  const contactInfo = [
    { icon: <EnvelopeFill className="mr-2 text-blue-600 dark:text-blue-400" />, label: "Email", value: userData["Email Address"] },
    { icon: <TelephoneFill className="mr-2 text-blue-600 dark:text-blue-400" />, label: "WhatsApp", value: userData["WhatsApp number"] },
    { icon: <GeoAltFill className="mr-2 text-blue-600 dark:text-blue-400" />, label: "District", value: userData["District of Residence"] },
    { icon: <Building className="mr-2 text-blue-600 dark:text-blue-400" />, label: "Physical Classes", value: userData["Can you attend physical classes if the training centre is around Kampala?"] }
  ];

  const totalCourses = Object.keys(userData.courseProgress).length;
  const completedCourses = Object.values(userData.courseProgress).filter(status => status === "Completed").length;
  const progressPercentage = Math.round((completedCourses / totalCourses) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6">
          {/* Welcome Section */}
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center">
              <PersonCircle className="text-blue-600 dark:text-blue-400 h-8 w-8 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {greeting}, Tr. {utils.getLastName(userData["Full Name"])}
                </h1>
                <p className="text-gray-700 dark:text-gray-300">Track your progress in the African Website Builders course</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200 group"
            >
              <BoxArrowRight className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
              <span className="group-hover:text-red-500 transition-colors">Logout</span>
            </button>
          </MotionDiv>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Course Progress Card */}
            <AnimatedCard delay={0}>
              <CourseProgressCard courseProgress={userData.courseProgress} />
            </AnimatedCard>

            {/* School Card */}
            <AnimatedCard delay={0.2}>
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">School</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{userData["School Name"]}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Role Card */}
            <AnimatedCard delay={0.4}>
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <PersonCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{userData["Role at School"]}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Financial Card */}
            <AnimatedCard delay={0.6}>
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                    <svg
                      className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tuition</p>
                    {userData["Role at School"]?.toLowerCase().includes('coordinator') ? (
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        Full Bursary
                      </p>
                    ) : (
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {userData.amountPaid.toLocaleString()} / {TUITION_FEE.toLocaleString()} UGX
                      </p>
                    )}
                  </div>
                </div>
                {userData["Role at School"]?.toLowerCase().includes('coordinator') ? (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    As a Group Coordinator, you've been awarded a full bursary to participate in the African Website Builders program!
                  </div>
                ) : (
                  <>
                    <FinancialProgress percentage={paymentProgress} />
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-right font-medium">
                      Balance: {(TUITION_FEE - userData.amountPaid).toLocaleString()} UGX
                    </div>
                  </>
                )}
              </div>
            </AnimatedCard>
          </div>

          {userData["Role at School"]?.toLowerCase().includes('coordinator') && (
            <>
              {/* Attendance Tracker */}
              <AnimatedCard>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar2Check className="mr-2 text-blue-600 dark:text-blue-400" />
                  Roll Call
                </h2>
                <AttendanceComponent students={filteredStudents} />
              </AnimatedCard>
              <br />
            </>
          )}

          {/* Lectures Progress */}
          <AnimatedCard>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar2Check className="mr-2 text-blue-600 dark:text-blue-400" />
              Recorded Lectures
            </h2>
            <LecturesList lectures={Object.entries(lectureData).map(([number, lecture]) => ({
              number: parseInt(number),
              title: lecture.title,
              status: getUserLectureStatus(number, userData.courseProgress || {}),
              isLocked: getUserLectureStatus(number, userData.courseProgress || {}) === "locked"
            }))} />
          </AnimatedCard><br></br>

          {/* Course Progress Details */}
          <AnimatedCard>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar2Check className="mr-2 text-blue-600 dark:text-blue-400" />
              Self-Study Materials
            </h2>
            <ModuleContent userData={userData} />
          </AnimatedCard><br></br>

          {/* Contact Information */}
          <AnimatedCard>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    {item.icon}
                    {item.label}
                  </p>
                  <p className="text-gray-800 dark:text-white">{item.value}</p>
                </MotionDiv>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
);
}
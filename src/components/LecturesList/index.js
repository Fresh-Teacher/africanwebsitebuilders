import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircleFill, PlayCircleFill, LockFill } from 'react-bootstrap-icons';
import { Loader2 } from 'lucide-react';

const LectureItem = ({ number, title, status, isLocked }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 animate-spin" />;
    if (isLocked) return <LockFill className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />;
    if (status === 'completed') return <CheckCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
    return <PlayCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
  };

  const getStatusStyles = () => {
    if (isLocked) {
      return 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-not-allowed';
    }
    if (status === 'completed') {
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-600 cursor-pointer';
    }
    return 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-600 cursor-pointer';
  };

  const handleClick = () => {
    if (!isLocked && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        router.push(`/lectures/${number}`);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className={`p-3 sm:p-4 rounded-lg border ${getStatusStyles()} transition-all`}
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            Lecture {number}
          </span>
          <h3 className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 mt-1 sm:mt-0">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-between sm:justify-end sm:space-x-3">
          <div className="flex items-center space-x-2">
            {status === 'in-progress' && !isLoading && (
              <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">In Progress</span>
            )}
            {isLoading && (
              <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">Loading...</span>
            )}
          </div>
          {getStatusIcon()}
        </div>
      </div>
    </motion.div>
  );
};

const LecturesList = ({ lectures }) => {
  return (
    <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {lectures.map((lecture) => (
        <LectureItem
          key={lecture.number}
          number={lecture.number}
          title={lecture.title}
          status={lecture.status}
          isLocked={lecture.isLocked}
        />
      ))}
    </div>
  );
};

export default LecturesList;
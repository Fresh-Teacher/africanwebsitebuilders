// components/LecturesList/index.js
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircleFill, PlayCircleFill, LockFill } from 'react-bootstrap-icons';

const LectureItem = ({ number, title, status, isLocked }) => {
  const router = useRouter();

  const getStatusIcon = () => {
    if (isLocked) return <LockFill className="w-5 h-5 text-gray-400" />;
    if (status === 'completed') return <CheckCircleFill className="w-5 h-5 text-green-500" />;
    return <PlayCircleFill className="w-5 h-5 text-blue-500" />;
  };

  const getStatusStyles = () => {
    if (isLocked) {
      return 'bg-gray-50 border-gray-200 cursor-not-allowed';
    }
    if (status === 'completed') {
      return 'bg-green-50 border-green-200 hover:border-green-500 cursor-pointer';
    }
    return 'bg-white border-gray-200 hover:border-blue-500 cursor-pointer';
  };

  const handleClick = () => {
    if (!isLocked) {
      router.push(`/lectures/${number}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className={`p-4 rounded-lg border ${getStatusStyles()} transition-all`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[80px]">
            Lecture {number}
          </span>
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        </div>
        <div className="flex items-center space-x-3">
          {status === 'in-progress' && (
            <span className="text-sm text-blue-600 dark:text-blue-400">In Progress</span>
          )}
          {getStatusIcon()}
        </div>
      </div>
    </motion.div>
  );
};

const LecturesList = ({ lectures }) => {
  return (
    <div className="space-y-4">
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
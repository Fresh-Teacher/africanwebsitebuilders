import React, { useState } from 'react';
import { BarChartFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CourseProgressCard = ({ courseProgress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const totalTopics = Object.keys(courseProgress).length;
  const completedTopics = Object.values(courseProgress).filter(status => status === "Completed").length;
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100);

  const getProgressColor = (percentage) => {
    if (percentage < 40) return { bg: 'bg-red-100', fill: 'bg-red-600' };
    if (percentage < 70) return { bg: 'bg-orange-100', fill: 'bg-orange-600' };
    if (percentage < 100) return { bg: 'bg-blue-100', fill: 'bg-blue-600' };
    return { bg: 'bg-green-100', fill: 'bg-green-600' };
  };

  const colors = getProgressColor(progressPercentage);

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
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Course Progress</p>
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
          <div className={`w-full ${colors.bg} dark:bg-opacity-20 rounded-full h-2.5`}>
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`${colors.fill} dark:bg-opacity-90 h-full rounded-full transition-all duration-300`}
            />
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Progress Details</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
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
            <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
              <p className="font-medium">Total Progress: {progressPercentage}%</p>
              <p>{completedTopics} out of {totalTopics} topics completed</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseProgressCard;
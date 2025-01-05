import React, { useState, useCallback, memo, useMemo } from 'react';
import { Calendar, Check, X } from 'lucide-react';

// Utility functions
const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Constants to avoid recreating objects
const DATE_FORMAT_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// Extracted styles for better reuse and performance
const BUTTON_STYLES = {
  present: {
    active: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    default: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
  },
  absent: {
    active: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
    default: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
  }
};

// Optimized button component
const AttendanceButton = memo(({ onClick, isActive, type }) => {
  const Icon = useMemo(() => type === 'present' ? Check : X, [type]);
  const styles = BUTTON_STYLES[type];
  
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full transition-colors ${isActive ? styles.active : styles.default}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
});

AttendanceButton.displayName = 'AttendanceButton';

// Optimized date input component
const DateSelector = memo(({ selectedDate, onDateChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={onDateChange}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
  );
});

DateSelector.displayName = 'DateSelector';

// Optimized student cell component
const StudentCell = memo(({ student, date, attendance, onAttendanceChange }) => {
  const dateKey = useMemo(() => date.toISOString().split('T')[0], [date]);
  const status = attendance[dateKey]?.[student["Email Address"]];

  const handlePresent = useCallback(() => {
    onAttendanceChange(student["Email Address"], date, 'present');
  }, [student, date, onAttendanceChange]);

  const handleAbsent = useCallback(() => {
    onAttendanceChange(student["Email Address"], date, 'absent');
  }, [student, date, onAttendanceChange]);

  return (
    <div className="flex justify-center space-x-1">
      <AttendanceButton
        type="present"
        isActive={status === 'present'}
        onClick={handlePresent}
      />
      <AttendanceButton
        type="absent"
        isActive={status === 'absent'}
        onClick={handleAbsent}
      />
    </div>
  );
});

StudentCell.displayName = 'StudentCell';

// Optimized student row component
const StudentRow = memo(({ student, date, attendance, onAttendanceChange }) => {
  const studentName = useMemo(() => 
    capitalizeWords(student["Full Name"]),
    [student["Full Name"]]  // More specific dependency
  );

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {studentName}
      </span>
      <StudentCell
        student={student}
        date={date}
        attendance={attendance}
        onAttendanceChange={onAttendanceChange}
      />
    </div>
  );
});

StudentRow.displayName = 'StudentRow';

// Main component with performance optimizations
const AttendanceComponent = ({ students }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Memoized date handling
  const handleDateChange = useCallback((e) => {
    const newDate = e.target.value ? new Date(e.target.value) : new Date();
    setSelectedDate(newDate);
  }, []);

  // Optimized attendance change handler with debouncing
  const handleAttendanceChange = useCallback((studentId, date, status) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    requestAnimationFrame(() => {
      setAttendance(prev => {
        const dateKey = date.toISOString().split('T')[0];
        return {
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            [studentId]: status
          }
        };
      });
      
      setIsUpdating(false);
    });
  }, [isUpdating]);

  // Memoized date display
  const dateDisplay = useMemo(() => 
    selectedDate.toLocaleDateString('default', DATE_FORMAT_OPTIONS),
    [selectedDate]
  );

  // Memoized students list
  const studentsList = useMemo(() => 
    students.map((student) => (
      <StudentRow
        key={student["Email Address"]}
        student={student}
        date={selectedDate}
        attendance={attendance}
        onAttendanceChange={handleAttendanceChange}
      />
    )),
    [students, selectedDate, attendance, handleAttendanceChange]
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Daily Attendance
          </h1>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {dateDisplay}
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {studentsList}
        </div>
      </div>
    </div>
  );
};

export default memo(AttendanceComponent);
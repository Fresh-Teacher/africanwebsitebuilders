'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { registrationData } from '@/utils/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Update your lucide-react imports at the top of the file
import { 
  Loader2, 
  Users, 
  DollarSign, 
  BarChart, 
  Search, 
  LogOut,
  Calendar,
  Printer,
  Check,
  X  // Add this
} from 'lucide-react';

import StudentTable from '@/components/StudentTable';

const MotionDiv = motion.div;

// Add this component right after your imports, before StatsCard
const AttendanceModal = ({ isOpen, onClose }) => {
  const [students, setStudents] = useState([]);
  const [period, setPeriod] = useState('morning');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  
  useEffect(() => {
    const studentsData = registrationData["Form Responses 1"];
    const studentsList = studentsData.map(student => ({
      id: student.id || Math.random().toString(36).substr(2, 9),
      name: student["Full Name"]
    }));
    setStudents(studentsList);
    
    // Load existing attendance data
    const savedData = localStorage.getItem(`attendance_${date}_${period}`);
    if (savedData) {
      setAttendanceData(JSON.parse(savedData).data);
    } else {
      // Initialize empty attendance data
      const newData = {};
      studentsList.forEach(student => {
        newData[student.id] = 'unmarked';
      });
      setAttendanceData(newData);
    }
  }, [date, period]);

  const markAttendance = (studentId, status) => {
    const newData = {
      ...attendanceData,
      [studentId]: status
    };
    setAttendanceData(newData);
    
    // Save to localStorage
    const timestamp = new Date().toISOString();
    const storageData = {
      date,
      period,
      timestamp,
      data: newData
    };
    localStorage.setItem(`attendance_${date}_${period}`, JSON.stringify(storageData));
  };

  const printAttendance = () => {
    const printWindow = window.open('', '_blank');
    const attendanceRecords = students.map(student => {
      return {
        name: student.name.toUpperCase(), // Convert to uppercase here
        status: attendanceData[student.id] || 'unmarked',
        date,
        period
      };
    });
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Attendance Record - ${date} ${period}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            .header { margin-bottom: 20px; }
            .present { color: green; font-weight: bold; }
            .absent { color: red; font-weight: bold; }
            .unmarked { color: gray; }
            .student-name { font-weight: 500; } /* Added for name styling */
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Attendance Record</h1>
            <p>Date: ${date}</p>
            <p>Period: ${period}</p>
            <p>Generated: ${new Date().toLocaleString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${attendanceRecords.map(record => `
                <tr>
                  <td class="student-name">${record.name}</td>
                  <td class="${record.status.toLowerCase()}">${record.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Take Attendance</h2>
          <div className="flex gap-4">
            <button
              onClick={printAttendance}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="grid gap-4">
        {students.map(student => (
  <div key={student.id} className="flex items-center justify-between p-4 border rounded">
    <span className="font-medium uppercase">{student.name}</span> {/* Added uppercase class */}
    <div className="flex gap-2">
      <button
        onClick={() => markAttendance(student.id, 'present')}
        className={`px-4 py-2 rounded ${
          attendanceData[student.id] === 'present'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 hover:bg-green-100'
        }`}
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={() => markAttendance(student.id, 'absent')}
        className={`px-4 py-2 rounded ${
          attendanceData[student.id] === 'absent'
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 hover:bg-red-100'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};



// Stats Card Component
const StatsCard = ({ icon, label, value, bgColor, onClick, buttonLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white p-6 rounded-lg shadow-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500">{label}</h3>
      <div className={`${bgColor} p-2 rounded-full`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold mb-4">{value}</p>
    {buttonLabel && (
      <button
        onClick={onClick}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {buttonLabel}
      </button>
    )}
  </motion.div>
);

export default function AdminPanel() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    completionRate: 0,
    totalRevenue: 0
  });

  // Add the new state variables HERE
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStats, setAttendanceStats] = useState({ present: 0, total: 0 });

  // Add the new useEffect HERE
  useEffect(() => {
    // Calculate attendance stats for today
    const today = new Date().toISOString().split('T')[0];
    const morningData = localStorage.getItem(`attendance_${today}_morning`);
    const eveningData = localStorage.getItem(`attendance_${today}_evening`);
    
    let presentCount = 0;
    let totalCount = 0;
    
    if (morningData) {
      const data = JSON.parse(morningData).data;
      presentCount += Object.values(data).filter(status => status === 'present').length;
      totalCount += Object.keys(data).length;
    }
    
    if (eveningData) {
      const data = JSON.parse(eveningData).data;
      presentCount += Object.values(data).filter(status => status === 'present').length;
      totalCount += Object.keys(data).length;
    }
    
    setAttendanceStats({
      present: presentCount,
      total: totalCount || registrationData["Form Responses 1"].length * 2 // Morning + Evening
    });
  }, [isAttendanceModalOpen]);

  // Your existing useEffect starts here
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'admin') {
      router.push('/');
      return;
    }

    const studentsData = registrationData["Form Responses 1"];
    setStudents(studentsData);

    // Calculate statistics
    const totalStudents = studentsData.length;
    const activeStudents = studentsData.filter(student => 
      Object.values(student.courseProgress).some(status => status === "In Progress")
    ).length;
    const completedStudents = studentsData.filter(student =>
      Object.values(student.courseProgress).every(status => status === "Completed")
    ).length;
    const totalRevenue = studentsData.reduce((sum, student) => {
      return sum + (student.amountPaid || 0);
    }, 0);

    setStats({
      totalStudents,
      activeStudents,
      completionRate: Math.round((completedStudents / totalStudents) * 100),
      totalRevenue
    });

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    router.push('/');
  };

  const filteredStudents = students.filter(student => 
    student["Full Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    student["Email Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    student["School Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Manage students and track progress</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          {/* Stats Grid - Only show when not searching */}
          <AnimatePresence>
            {!searchTerm && (
              <MotionDiv
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                <StatsCard
                  icon={<Users className="h-6 w-6 text-blue-600" />}
                  label="Total Students"
                  value={stats.totalStudents}
                  bgColor="bg-blue-100"
                />
                <StatsCard
                  icon={<Calendar className="h-6 w-6 text-green-600" />}
                  label="Today's Attendance"
                  value={`${Math.round((attendanceStats.present / attendanceStats.total) * 100)}%`}
                  bgColor="bg-green-100"
                  buttonLabel="Take Attendance"
                  onClick={() => setIsAttendanceModalOpen(true)}
                />
                <StatsCard
                  icon={<BarChart className="h-6 w-6 text-orange-600" />}
                  label="Completion Rate"
                  value={`${stats.completionRate}%`}
                  bgColor="bg-orange-100"
                />
                <StatsCard
                  icon={<DollarSign className="h-6 w-6 text-purple-600" />}
                  label="Total Revenue"
                  value={`${stats.totalRevenue.toLocaleString()} UGX`}
                  bgColor="bg-purple-100"
                />
              </MotionDiv>
            )}
          </AnimatePresence>

          {/* Student Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">Student Management</h3>
            </div>
            <StudentTable students={filteredStudents} />
            
            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search terms or clear the search to see all students.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
<AttendanceModal
  isOpen={isAttendanceModalOpen}
  onClose={() => setIsAttendanceModalOpen(false)}
/>
      <Footer />
    </div>
  );
}
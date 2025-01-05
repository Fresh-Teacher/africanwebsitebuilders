'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { registrationData } from '@/utils/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BarChart,
  Users,
  DollarSign,
  Search,
  LogOut,
} from 'lucide-react';
import StudentTable from '@/components/StudentTable';

const MotionDiv = motion.div;

// Stats Card Component
const StatsCard = ({ icon, label, value, bgColor }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-6 rounded-lg shadow-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500">{label}</h3>
      <div className={`${bgColor} p-2 rounded-full`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </MotionDiv>
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
                  icon={<Users className="h-6 w-6 text-green-600" />}
                  label="Active Students"
                  value={stats.activeStudents}
                  bgColor="bg-green-100"
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
      
      <Footer />
    </div>
  );
}
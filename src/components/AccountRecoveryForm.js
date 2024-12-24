'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { registrationData } from '@/utils/mockData';

// Header Component
const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-900 to-blue-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              </div>
              <div className="text-2xl font-bold text-white">AWB</div>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-800 to-blue-900 dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center space-y-2">
          <p>
            &copy; {new Date().getFullYear()} AWB<br /> All rights reserved
          </p>
          <p className="flex items-center justify-center gap-1">
            Coded with{' '}
            <span className="inline-block animate-pulse">❤️</span> by{' '}
            <a
              href="https://fresh-teacher.github.io"
              className="text-[#F4C2C2] font-bold hover:underline transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fresh Teacher
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Account Recovery Component
const AccountRecoveryPage = () => {
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [verificationData, setVerificationData] = useState({
    school: '',
    level: '',
    district: ''
  });
  const [showCredentials, setShowCredentials] = useState(false);

  // Capitalize display values while keeping original data intact
  const capitalizedSchools = registrationData["Form Responses 1"].map(entry => ({
    ...entry,
    "School Name Display": entry["School Name"].toUpperCase(),
    "District of Residence Display": entry["District of Residence"].toUpperCase()
  }));

  const handleNameSearch = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userIndex = registrationData["Form Responses 1"].findIndex(
        entry => entry["Full Name"].toLowerCase() === fullName.toLowerCase()
      );

      if (userIndex === -1) {
        setError('No account found with this name');
        setIsLoading(false);
        return;
      }

      setUserData(registrationData["Form Responses 1"][userIndex]);
      setStep(2);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Case-insensitive comparison
      const isValid = 
        verificationData.school.toLowerCase() === userData["School Name"].toLowerCase() &&
        verificationData.level === userData["Level of Institution"] &&
        verificationData.district.toLowerCase() === userData["District of Residence"].toLowerCase();

      if (!isValid) {
        setError('Verification failed! Please double check your responses and try again.');
        setIsLoading(false);
        return;
      }

      setShowCredentials(true);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md transition-colors relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Verifying...</p>
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-2">Account Recovery</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {step === 1 ? 'Enter your full name to start recovery process' : 
               showCredentials ? 'Your Account Information' : 'Verify your identity'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNameSearch}>
              <div className="mb-6">
                <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transform hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Search Account
              </button>
            </form>
          ) : showCredentials ? (
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-400 mb-4">Your Account Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">Email Address</label>
                    <p className="text-gray-900 dark:text-white font-medium">{userData["Email Address"]}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">Password</label>
                    <p className="text-gray-900 dark:text-white font-medium">{userData["Telephone contact"]}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transform hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                Back to Login Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerification}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    School Name
                  </label>
                  <select
          value={verificationData.school}
          onChange={(e) => setVerificationData({...verificationData, school: e.target.value})}
          className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
          disabled={isLoading}
        >
          <option value="">SELECT YOUR SCHOOL</option>
          {capitalizedSchools.map((entry, index) => (
            <option key={index} value={entry["School Name"]}>
              {entry["School Name Display"]}
            </option>
          ))}
        </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Institution Level
                  </label>
                  <select
                    value={verificationData.level}
                    onChange={(e) => setVerificationData({...verificationData, level: e.target.value})}
                    className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                    disabled={isLoading}
                  >
                    <option value="">SELECT INSTITUTION LEVEL</option>
                    <option value="Primary">PRIMARY</option>
                    <option value="Secondary">SECONDARY</option>
                    <option value="College">COLLEGE</option>
                    <option value="University">UNIVERSITY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    District of Residence
                  </label>
                  <select
          value={verificationData.district}
          onChange={(e) => setVerificationData({...verificationData, district: e.target.value})}
          className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
          disabled={isLoading}
        >
          <option value="">SELECT YOUR DISTRICT</option>
          {capitalizedSchools.map((entry, index) => (
            <option key={index} value={entry["District of Residence"]}>
              {entry["District of Residence Display"]}
            </option>
          ))}
        </select>
                </div>
              </div>

              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-4">{error}</p>
              )}

              <div className="mt-6 space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transform hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Verify Identity
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError('');
                    setUserData(null);
                    setVerificationData({school: '', level: '', district: ''});
                    setShowCredentials(false);
                    setFullName('');
                  }}
                  className="w-full py-3 border border-blue-200 dark:border-gray-600 text-blue-600 dark:text-blue-400 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transform hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Try Different Name
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountRecoveryPage;
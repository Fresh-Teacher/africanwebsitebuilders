import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { lectureData } from '@/utils/lectureData'; // Import the existing lecture data

const LecturePage = () => {
  const router = useRouter();
  const lectureNumber = router.query?.number;
  
  const lectureContent = lectureData[lectureNumber];

  if (!lectureContent) {
    return <div>Lecture not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold mb-6">
            Lecture {lectureNumber}: {lectureContent.title}
          </h1>
          
          {/* Video Section */}
          <div className="aspect-w-16 aspect-h-9 mb-8 bg-black rounded-lg">
            {/* Add your video player component here */}
          </div>
          
          {/* Content Section */}
          <div className="prose dark:prose-invert max-w-none">
            {lectureContent.description}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LecturePage;
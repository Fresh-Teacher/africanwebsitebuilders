// utils/lectureData.js
export const lectureData = {
    1: {
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of web development, including how the internet works, client-server architecture, and the role of different web technologies.",
      videoUrl: "https://awb-silk.vercel.app/African Web-Builders Course English (1).mp4",
      slides: "/lectures/1/slides.pdf",
      duration: "45 minutes",
      topics: [
        "How the Internet Works",
        "Client-Server Architecture",
        "Web Development Overview",
        "Development Tools Setup"
      ],
      assignments: [
        {
          title: "Environment Setup",
          description: "Set up your development environment with VS Code and essential extensions",
          dueDate: "Within 2 days of starting"
        }
      ],
      resources: [
        {
          title: "MDN Web Docs - Getting started with the web",
          url: "https://developer.mozilla.org/docs/Learn/Getting_started_with_the_web"
        }
      ],
      requirements: [],
      status: "available"
    },
    2: {
      title: "HTML Fundamentals",
      description: "Master the building blocks of web pages with HTML5, semantic elements, and best practices for structuring web content.",
      videoUrl: "https://your-video-platform.com/lecture-2",
      slides: "/lectures/2/slides.pdf",
      duration: "60 minutes",
      topics: [
        "HTML Document Structure",
        "Semantic Elements",
        "Forms and Input Elements",
        "HTML Best Practices"
      ],
      assignments: [
        {
          title: "Personal Portfolio Structure",
          description: "Create the HTML structure for your personal portfolio website",
          dueDate: "Within 3 days of lecture"
        }
      ],
      resources: [
        {
          title: "HTML5 Reference Guide",
          url: "https://developer.mozilla.org/docs/Web/HTML/Reference"
        }
      ],
      requirements: [1],
      status: "locked"
    },
    // Add more lectures following the same structure
  };
  
  export const getUserLectureStatus = (lectureNumber, userProgress) => {
    const lecture = lectureData[lectureNumber];
    if (!lecture) return null;
  
    // Check if all required lectures are completed
    const requirementsMet = lecture.requirements.every(
      reqLecture => userProgress[reqLecture]?.completed
    );
  
    if (!requirementsMet) return "locked";
    if (userProgress[lectureNumber]?.completed) return "completed";
    if (userProgress[lectureNumber]?.started) return "in-progress";
    return "available";
  };
  
  export const getNextAvailableLecture = (userProgress) => {
    return Object.keys(lectureData).find(lectureNumber => 
      getUserLectureStatus(lectureNumber, userProgress) === "available"
    );
  };
  
 
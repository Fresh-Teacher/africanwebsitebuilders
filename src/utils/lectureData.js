// utils/lectureData.js
export const lectureData = {
    1: {
        title: "Working with Blocks",
        description: "Master the essentials of blocks in web design, including understanding block types, basic implementation, and how to effectively use blocks to structure your content.",
        videoUrl: "https://youtu.be/pyMWz9wLOCI",
        slides: "/lectures/1/slides.pdf",
        duration: "60 minutes",
        topics: [
          "Introduction to Block Types",
          "Basic Block Implementation",
          "Block Structure Overview",
          "Block Selection and Placement"
        ],
        assignments: [
          {
            title: "Block Basics Practice",
            description: "Create a simple page layout using different types of blocks and proper naming conventions",
            dueDate: "Within 2 days of starting"
          }
        ],
        resources: [
          {
            title: "Go to Zylosite Website Builder",
            url: "https://africanwebsitebuilders.com/sites"
          }
        ],
        requirements: [],
        status: "available"
      },
      2: {
        title: "Customising Blocks",
        description: "Learn how to customize block titles effectively, including best practices for naming conventions, formatting options, and creating clear hierarchical structures.",
        videoUrl: "https://youtu.be/TGM6RnIImIw",
        slides: "/lectures/1/slides.pdf",
        duration: "15 minutes",
        topics: [
          "Block Title Naming Conventions",
          "Title Formatting Options",
          "Hierarchical Title Structure",
          "Title Consistency Best Practices"
        ],
        assignments: [
          {
            title: "Title Customization Exercise",
            description: "Apply different title styles and formatting to a set of blocks following best practices",
            dueDate: "Within 2 days of starting"
          }
        ],
        resources: [
          {
            title: "Go to Zylosite Website Builder",
            url: "https://africanwebsitebuilders.com/sites"
          }
        ],
        requirements: [],
        status: "available"
      },
       3: {
        title: "Advanced Blocks Settings",
        description: "Explore advanced techniques for block title management, including dynamic titles, conditional formatting, and integration with site navigation.",
        videoUrl: "https://youtu.be/m2VHlrBs0rs",
        slides: "/lectures/1/slides.pdf",
        duration: "15 minutes",
        topics: [
          "Dynamic Title Generation",
          "Advanced Title Formatting",
          "Navigation Integration",
          "Title Management Systems"
        ],
        assignments: [
          {
            title: "Advanced Title Implementation",
            description: "Implement advanced title features including dynamic generation and navigation integration",
            dueDate: "Within 2 days of starting"
          }
        ],
        resources: [
          {
            title: "Go to Zylosite Website Builder",
            url: "https://africanwebsitebuilders.com/sites"
          }
        ],
        requirements: [],
        status: "available"
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
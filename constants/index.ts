import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "CINAF TV",
    category: "Streaming Platform",
    year: "2019-2023",
    image: "/projects/capture-cinaf.png", 
    description: "The 'Netflix of Cameroon'. A massive VOD platform for African cinema.",
    longDescription: "CINAF TV is a pioneering video-on-demand platform dedicated to promoting Cameroonian and African cinema. As the lead architect, I built the initial web application and scaled it to serve thousands of users. The system includes a complex load-balancing architecture to handle high traffic during premieres, a custom video player with adaptive bitrate streaming, and a robust API ecosystem serving mobile and TV apps.",
    technologies: ["React", "Node.js", "AWS", "FFmpeg", "Redis", "Load Balancing"]
  },
  {
    title: "Wiishop App",
    category: "Ecommerce SaaS",
    year: "2023-2024",
    image: "/projects/wiishop.jpg",
    description: "Digital library management system optimized for performance.",
    longDescription: "Quickdo represents a leap forward in digital access to books. I led the optimization of their library management system, improving both the React web dashboard and the React Native mobile app. Key contributions involved refactoring legacy code for 40% faster load times, implementing offline reading capabilities, and ensuring seamless synchronization between devices.",
    technologies: ["React Native", "Node.js", "MongoDB", "Offline First", "Performance"]
  },
  {
    title: "Laclass.dev",
    category: "Portfolio",
    year: "2024",
    image: "https://picsum.photos/1600/900?random=3",
    description: "A cinematic developer portfolio featuring AI integration and GSAP motion.",
    longDescription: "My personal portfolio, designed to push the boundaries of web interaction. It features a custom AI chatbot powered by Gemini, WebGL noise effects, and a horizontal scroll experience. It serves as a playground for my experiments with motion design and high-end frontend architecture.",
    technologies: ["React", "GSAP", "Gemini AI", "Tailwind", "TypeScript"]
  },{
    title: "CINAF TV",
    category: "Streaming Platform",
    year: "2019-2023",
    image: "/projects/capture-cinaf.png", 
    description: "The 'Netflix of Cameroon'. A massive VOD platform for African cinema.",
    longDescription: "CINAF TV is a pioneering video-on-demand platform dedicated to promoting Cameroonian and African cinema. As the lead architect, I built the initial web application and scaled it to serve thousands of users. The system includes a complex load-balancing architecture to handle high traffic during premieres, a custom video player with adaptive bitrate streaming, and a robust API ecosystem serving mobile and TV apps.",
    technologies: ["React", "Node.js", "AWS", "FFmpeg", "Redis", "Load Balancing"]
  },
  {
    title: "Wiishop App",
    category: "Ecommerce SaaS",
    year: "2023-2024",
    image: "/projects/wiishop.jpg",
    description: "Digital library management system optimized for performance.",
    longDescription: "Quickdo represents a leap forward in digital access to books. I led the optimization of their library management system, improving both the React web dashboard and the React Native mobile app. Key contributions involved refactoring legacy code for 40% faster load times, implementing offline reading capabilities, and ensuring seamless synchronization between devices.",
    technologies: ["React Native", "Node.js", "MongoDB", "Offline First", "Performance"]
  },
];


import { Job, Project } from "@/types";

export const projects: Project[] = [
  {
    title: "CINAF TV",
    category: "Streaming Platform",
    year: "2019-2023",
    image: "/projects/capture-cinaf.png",
    description: "The 'Netflix of Cameroon'. A massive VOD platform for African cinema.",
    longDescription:
      "CINAF TV is a pioneering video-on-demand platform dedicated to promoting Cameroonian and African cinema. As the lead architect, I built the initial web application and scaled it to serve thousands of users. The system includes a complex load-balancing architecture to handle high traffic during premieres, a custom video player with adaptive bitrate streaming, and a robust API ecosystem serving mobile and TV apps.",
    technologies: ["React", "Node.js", "AWS", "FFmpeg", "Redis", "Load Balancing"]
  },
  {
    title: "Wiishop",
    category: "Ecommerce SaaS",
    year: "2023-2024",
    image: "/projects/wiishop.jpg",
    description:
      "A no-code ecommerce SaaS that lets merchants launch professional online stores in minutes.",
    longDescription:
      "Wiishop is an ecommerce SaaS I created to help merchants build professional online stores without any technical or design knowledge. The platform provides ready-to-use storefronts, product management, and order tracking. A key feature is WhatsApp integration, allowing merchants to receive and manage customer orders directly through WhatsApp, making online selling accessible even for non-technical users.",
    technologies: [
      "React",
      "Node.js",
      "SaaS Architecture",
      "Ecommerce",
      "WhatsApp Integration",
      "No-Code"
    ]
  },
  {
    title: "Wii-Unit",
    category: "Crowdfunding SaaS",
    year: "2024",
    image: "/projects/wii-unit.png",
    description:
      "A crowdfunding platform for individuals and businesses to create and manage fundraising campaigns.",
    longDescription:
      "Wii-Unit is a SaaS crowdfunding platform that allows individuals, startups, and companies to create fundraising campaigns and collect contributions securely. Users can launch public or private campaigns, track contributions in real time, and manage payouts. The project focuses on trust, simplicity, and scalability, offering a modern alternative to traditional fundraising tools.",
    technologies: [
      "React",
      "Next.js",
      "Payment Systems",
      "SaaS",
      "Crowdfunding",
      "Scalable Architecture"
    ]
  },
  {
    title: "Format Flow",
    category: "Web Utility Platform",
    year: "2024",
    image: "/projects/format-flow.webp",
    description:
      "A fast, browser-based platform for converting audio, video, and images.",
    longDescription:
      "Format Flow is a web-based file conversion platform that allows users to convert audio, video, and image files into high-quality formats directly from the browser. Built with speed and usability in mind, it removes the need for heavy desktop software. The platform focuses on a clean user experience, fast processing, and reliable output quality for everyday conversion needs.",
    technologies: [
      "ffmpeg",
      "Next.js",
      "File Processing",
      "Frontend Performance",
      "UX Design",
      "Modern Web Architecture"
    ]
  }
];


export const jobs: Job[] = [
  {
    company: "Redacok",
    role: "Senior Fullstack Engineer",
    period: "2024 - 2025",
    description:
      "Full ownership of the core banking application for a microfinance institution. Designed and developed the entire system to manage clients, bank accounts, transactions, credit requests, KYC workflows, and cash operations. Implemented mobile money integrations to handle deposits and withdrawals, ensuring data consistency, security, and real-time balance updates across the platform.",
    tags: [
      "Fullstack Development",
      "Banking Systems",
      "Microfinance",
      "Transactions",
      "KYC",
      "Mobile Money",
      "Security",
      "Scalable Architecture"
    ]
  },
  {
    company: "Quickdo Canada",
    role: "Senior Software Engineer",
    period: "2023 - 2024",
    description:
      "Worked on a digital library platform serving web and mobile users. Improved application performance and maintainability by refactoring critical features across the React web dashboard and React Native mobile app. Collaborated with backend teams to ensure efficient API consumption and smooth synchronization between platforms.",
    tags: [
      "React",
      "React Native",
      "Node.js",
      "Laravel",
      "Performance Optimization",
      "Web & Mobile"
    ]
  },
  {
    company: "CINAF TV",
    role: "Tech Lead",
    period: "2021 - 2023",
    description:
      "Led the technical direction of a large-scale VOD platform for African cinema. Managed a team of developers, designed scalable architectures, handled high-traffic releases, and implemented DevOps pipelines for reliable deployments. Played a key role in system scalability and platform stability during major premieres.",
    tags: [
      "Vuejs",
      "Nodejs",
      "Tech Leadership",
      "Scalability",
      "Load Balancing",
      "DevOps",
      "System Architecture",
      "Streaming Platforms"
    ]
  },
  {
    company: "CINAF TV",
    role: "Founding Developer",
    period: "2019 - 2021",
    description:
      "First technical hire of the startup. Built the initial web application and backend APIs from scratch, laying the foundation for future mobile and TV applications. Established core architectural decisions that supported the platform’s growth in its early stages.",
    tags: [
      "PHP",
      "Symfony",
      "blade",
      "API Design",
      "Product Foundations"
    ]
  }
];


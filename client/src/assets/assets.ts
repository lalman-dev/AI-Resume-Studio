import dummy_profile from "./dummy_profile.png";
import type { Resume } from "../utils/types";

export const dummyResumeData: Resume[] = [
  {
    // ----------------------------------------------------- Resume 1 ------------------------------------------------------
    personal_info: {
      full_name: "Amit Sharma",
      email: "amit.sharma@example.com",
      phone: "+91 9876543210",
      location: "Bengaluru, India",
      linkedin: "https://www.linkedin.com/in/amitsharma",
      website: "https://www.amitsharma.dev",
      profession: "Full Stack Developer",
      image: dummy_profile,
    },
    _id: "68d2a31a1c4dd38875bb037e",
    userId: "68c180acdf1775dfd02c6d87",
    title: "Amit's Resume",
    public: true,
    professional_summary:
      "Analytical Full Stack Developer with 6 years of experience building scalable applications using React, Node.js, and TypeScript. Passionate about solving complex problems and delivering impactful digital solutions.",
    skills: [
      "JavaScript",
      "React JS",
      "NodeJS",
      "TypeScript",
      "Express",
      "MongoDB",
      "Git",
      "NextJS",
    ],
    experience: [
      {
        company: "Infosys Technologies",
        position: "Senior Full Stack Developer",
        start_date: "2023-06",
        end_date: "Present",
        description:
          "Architected and deployed enterprise-grade applications, ensuring performance and scalability for global clients.",
        is_current: true,
        _id: "68d2a31a1c4dd38875bb037f",
      },
      {
        company: "Wipro Digital",
        position: "Full Stack Developer",
        start_date: "2019-08",
        end_date: "2023-05",
        description:
          "Developed and maintained full-stack web applications, collaborating with cross-functional teams to deliver client solutions.",
        is_current: false,
        _id: "68d4f7abc8f0d46dc8a8b114",
      },
    ],
    education: [
      {
        institution: "Indian Institute of Technology Delhi",
        degree: "B.Tech",
        field: "Computer Science",
        graduation_date: "2019-05",
        gpa: "8.7",
        _id: "68d2a31a1c4dd38875bb0380",
      },
      {
        institution: "Delhi Public School",
        degree: "Higher Secondary",
        field: "PCM",
        graduation_date: "2015-03",
        gpa: "",
        _id: "68d2a31a1c4dd38875bb0381",
      },
    ],
    template: "minimal-image",
    accent_color: "#14B8A6",
    project: [
      {
        name: "TaskTrackr",
        type: "Web Application (Productivity Tool)",
        description:
          "A collaborative task management system designed for Indian startups to manage projects efficiently.",
        _id: "68d4f882c8f0d46dc8a8b139",
      },
      {
        name: "EduHub",
        type: "Web Application (EdTech Platform)",
        description:
          "An online learning platform tailored for Indian students, offering video lessons and quizzes.",
        _id: "68d4f89dc8f0d46dc8a8b147",
      },
    ],
    updatedAt: "2025-09-23T13:39:38.395Z",
    createdAt: "2025-09-23T13:39:38.395Z",
  },

  // ----------------------------------------------------- Resume 2 ------------------------------------------------------
  {
    personal_info: {
      full_name: "Priya Nair",
      email: "priya.nair@example.com",
      phone: "+91 9123456789",
      location: "Mumbai, India",
      linkedin: "https://www.linkedin.com/in/priyanair",
      website: "https://www.priyanair.dev",
      profession: "Frontend Engineer",
      image: dummy_profile,
    },
    _id: "78e3b42c2d5ff49286cc148f",
    userId: "78d2e0bdcf2886efg03e7e98",
    title: "Priya's Resume",
    public: true,
    professional_summary:
      "Creative Frontend Engineer with 5+ years of experience building responsive, user-centric applications using React, Vue, and modern CSS frameworks.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Vue.js",
      "Tailwind CSS",
      "Figma",
      "Accessibility",
    ],
    experience: [
      {
        company: "TCS Digital",
        position: "Lead Frontend Engineer",
        start_date: "2022-02",
        end_date: "Present",
        description:
          "Leading a team of frontend developers to build scalable interfaces for enterprise clients.",
        is_current: true,
        _id: "78e3b42c2d5ff49286cc1490",
      },
      {
        company: "Zoho Corp",
        position: "Frontend Developer",
        start_date: "2018-09",
        end_date: "2022-01",
        description:
          "Developed reusable UI components and optimized SPA performance for SaaS products.",
        is_current: false,
        _id: "78e3b42c2d5ff49286cc1491",
      },
    ],
    education: [
      {
        institution: "University of Mumbai",
        degree: "B.Sc.",
        field: "Computer Science",
        graduation_date: "2018-06",
        gpa: "3.8",
        _id: "78e3b42c2d5ff49286cc1492",
      },
      {
        institution: "St. Xavier's High School",
        degree: "High School Diploma",
        field: "Science",
        graduation_date: "2014-05",
        gpa: "",
        _id: "78e3b42c2d5ff49286cc1493",
      },
    ],
    template: "minimal-image",
    accent_color: "#6366F1",
    project: [
      {
        name: "FitTrack India",
        type: "Web Application (Health & Fitness)",
        description:
          "A fitness dashboard for Indian users to log workouts and track progress with charts.",
        _id: "78e3b42c2d5ff49286cc1494",
      },
      {
        name: "ShopEase UI Kit",
        type: "Frontend UI Kit",
        description:
          "A modular e-commerce UI kit tailored for Indian online stores.",
        _id: "78e3b42c2d5ff49286cc1495",
      },
    ],
    updatedAt: "2025-09-25T15:10:21.184Z",
    createdAt: "2025-09-25T15:10:21.184Z",
  },

  // ----------------------------------------------------- Resume 3 ------------------------------------------------------
  {
    personal_info: {
      full_name: "Rohan Verma",
      email: "rohan.verma@example.com",
      phone: "+91 9988776655",
      location: "Hyderabad, India",
      linkedin: "https://www.linkedin.com/in/rohanverma",
      website: "https://www.rohanverma.dev",
      profession: "Backend Developer",
      image: dummy_profile,
    },
    _id: "89f4c53d3e6gg59397dd259g",
    userId: "89e3f1cedg3997fgh14f8f09",
    title: "Rohan's Resume",
    public: true,
    professional_summary:
      "Backend Developer with 7+ years of experience building secure, high‑performance APIs and microservices using Node.js, Python, and PostgreSQL. Focused on scalability, automation, and clean architecture.",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Redis",
      "GraphQL",
      "AWS",
    ],
    experience: [
      {
        company: "HCL Technologies",
        position: "Senior Backend Engineer",
        start_date: "2021-03",
        end_date: "Present",
        description:
          "Designed and maintained distributed microservices, implemented authentication/authorization, and optimized background jobs using Redis and Bull for enterprise clients.",
        is_current: true,
        _id: "89f4c53d3e6gg59397dd259h",
      },
      {
        company: "Tech Mahindra",
        position: "Backend Developer",
        start_date: "2016-07",
        end_date: "2021-02",
        description:
          "Scaled Python/PostgreSQL services, automated deployments with GitLab CI/CD, and improved API response times by 35% through query optimization and caching.",
        is_current: false,
        _id: "89f4c53d3e6gg59397dd259i",
      },
    ],
    education: [
      {
        institution: "Indian Institute of Information Technology, Hyderabad",
        degree: "B.E.",
        field: "Information Technology",
        graduation_date: "2016-05",
        gpa: "3.9",
        _id: "89f4c53d3e6gg59397dd259j",
      },
      {
        institution: "Central High School",
        degree: "Higher Secondary",
        field: "Science",
        graduation_date: "2012-04",
        gpa: "",
        _id: "89f4c53d3e6gg59397dd259k",
      },
    ],
    template: "minimal-image",
    accent_color: "#F59E0B",
    project: [
      {
        name: "Invoicr — Invoice Management System",
        type: "Web Application (FinTech)",
        description:
          "Secure invoicing platform for freelancers and SMBs in India. Built with Node.js, MongoDB, and Stripe/Razorpay integrations; supports GST‑friendly invoice formats.",
        _id: "89f4c53d3e6gg59397dd259l",
      },
      {
        name: "API Monitor Dashboard",
        type: "DevOps Tool",
        description:
          "Real‑time monitoring for microservices with latency, uptime, and error tracking. Prometheus exporters and Grafana dashboards tailored for Kubernetes clusters.",
        _id: "89f4c53d3e6gg59397dd259m",
      },
    ],
    updatedAt: "2025-09-25T15:26:49.652Z",
    createdAt: "2025-09-25T15:26:49.652Z",
  },
];

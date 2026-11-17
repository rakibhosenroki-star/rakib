/**
 * MD RAKIB HASAN - PERSONAL PORTFOLIO
 * Initial Seed Data & Configurations
 */

const defaultPortfolioData = {
  profile: {
    name: "Md Rakib Hasan",
    brandLogo: "RAKIB.",
    tagline: "Welcome to My Personal Portfolio",
    headline: "Web Developer & Creative Digital Creator",
    summary: "A passionate and results-driven Web Developer and Creative Digital Creator dedicated to crafting high-performance, elegant, and user-centric digital experiences with modern web technologies.",
    avatar: "assets/images/profile.jpg",
    avatarType: "local",
    statusBadge: "Available for Projects & Full-time Opportunities",
    location: "Bangladesh (Available Worldwide)",
    email: "contact@rakibhasan.dev",
    phone: "+880 1XXXXXXXXX",
    experienceYears: "3+",
    completedProjects: "15+",
    happyClients: "100%",
    cvUrl: "#"
  },
  
  about: {
    introduction: "Hello! I am Md Rakib Hasan, a dedicated Web Developer and Creative Digital Creator with a deep enthusiasm for building cutting-edge, responsive, and aesthetically refined web applications. I focus on bridging the gap between innovative visual design and solid, clean engineering.",
    interests: "Passionate about modern web technologies, glassmorphism UI/UX design, interactive frontend architectures, API development, database optimization, and exploring the latest developments in modern JavaScript frameworks and creative web animation.",
    goals: "My primary goal is to continuously hone my craft as a full-stack engineer, deliver top-tier digital products that solve real-world problems for clients and businesses, and contribute meaningful open-source software to the developer community.",
    journey: "My professional journey started with a fascination for how the internet works, which evolved into hands-on web development with HTML, CSS, and JavaScript. Over time, I progressed into modern frontend development with React, backend architecture with Node.js and Express, and structured data persistence with PostgreSQL.",
    ambitions: "My future ambitions are centered around architecting scalable, enterprise-grade cloud systems, leading innovative web design projects, mastering cutting-edge fullstack ecosystems, and mentoring aspiring developers in the tech ecosystem."
  },

  skills: [],

  projects: [
    {
      id: "proj-1",
      title: "Md Rakib Hasan Portfolio Platform",
      category: "Full Stack",
      description: "A premium glassmorphic personal portfolio website featuring a dark navy and purple gradient theme, dynamic dark/light mode toggle, animated skill cards, contact message saving, and a secure functional Admin Dashboard for live portfolio management.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Glassmorphism"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star/rakib",
      featured: true
    },
    {
      id: "proj-2",
      title: "NovaStore - Modern E-Commerce Storefront",
      category: "Full Stack",
      description: "An elegant e-commerce web application featuring high-performance product listings, dynamic category filtering, shopping cart state management, checkout simulation, and a PostgreSQL-backed product inventory API.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
      technologies: ["JavaScript (ES6+)", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star",
      featured: true
    },
    {
      id: "proj-3",
      title: "FlowTask - Interactive Workflow & Task Manager",
      category: "Frontend",
      description: "A streamlined productivity web app designed for agile task tracking, featuring drag-and-drop kanban boards, priority tagging, deadline notifications, and persistent local & database sync.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Responsive UI"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star",
      featured: true
    },
    {
      id: "proj-4",
      title: "Lumina Studio - Creative Digital Agency Website",
      category: "Creative",
      description: "A showcase digital agency landing experience emphasizing glassmorphism UI, smooth scroll animations, interactive 3D card tilt effects, and an optimized responsive customer inquiry pipeline.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML5", "CSS3 Animations", "JavaScript", "Glassmorphism UI"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star",
      featured: false
    }
  ],

  services: [
    {
      id: "serv-1",
      title: "Web Development",
      icon: "code",
      description: "Building fast, reliable, and secure web applications from scratch using modern best practices, clean modular architecture, and robust coding standards.",
      features: [
        "Custom web application development",
        "Clean, maintainable code architecture",
        "Full-lifecycle development & testing",
        "API integration & backend connections"
      ]
    },
    {
      id: "serv-2",
      title: "Website Design",
      icon: "layout",
      description: "Crafting visually striking, modern glassmorphic website interfaces that elevate personal brands and capture user attention with refined elegance.",
      features: [
        "Premium glassmorphism UI design",
        "Custom color palettes & typography",
        "User-centered UX workflows",
        "Interactive prototypes & wireframes"
      ]
    },
    {
      id: "serv-3",
      title: "Frontend Development",
      icon: "layers",
      description: "Translating concepts and UI designs into pixel-perfect, responsive, and dynamic web interfaces powered by React and modern JavaScript.",
      features: [
        "100% Mobile & cross-device responsiveness",
        "Smooth micro-animations & transitions",
        "React component architecture",
        "Optimized asset loading & fast speeds"
      ]
    },
    {
      id: "serv-4",
      title: "Creative Digital Projects",
      icon: "sparkles",
      description: "Designing bespoke digital solutions, creative promotional assets, interactive web experiences, and tailored digital deliverables.",
      features: [
        "Interactive landing pages",
        "Modern digital portfolio solutions",
        "Creative UI component libraries",
        "Custom technical solutions"
      ]
    }
  ],

  socialLinks: [
    {
      id: "soc-1",
      platform: "GitHub",
      url: "https://github.com/rakibhosenroki-star",
      icon: "github",
      label: "rakibhosenroki-star"
    },
    {
      id: "soc-2",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/mdrakibhasan",
      icon: "linkedin",
      label: "mdrakibhasan"
    },
    {
      id: "soc-3",
      platform: "Twitter / X",
      url: "https://twitter.com/mdrakibhasan",
      icon: "twitter",
      label: "@mdrakibhasan"
    },
    {
      id: "soc-4",
      platform: "Email",
      url: "mailto:contact@rakibhasan.dev",
      icon: "mail",
      label: "contact@rakibhasan.dev"
    }
  ],

  messages: [
    {
      id: "msg-1",
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      subject: "Web Development Collaboration Inquiry",
      message: "Hi Md Rakib Hasan! I really love your glassmorphism portfolio design and would like to discuss collaborating on a modern web development project. Looking forward to hearing from you!",
      date: "2026-11-15T10:30:00.000Z",
      read: false
    }
  ],

  settings: {
    theme: "dark", // 'dark' or 'light'
    adminUsername: "admin",
    adminPasswordHash: "rakib2026", // In production hashed with bcrypt; default demo credential
    enableSoundEffects: false
  }
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.defaultPortfolioData = defaultPortfolioData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = defaultPortfolioData;
}

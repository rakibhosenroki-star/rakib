import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { api } from './services/api';

const initialPortfolioState = {
  profile: {
    name: "Md Rakib Hasan",
    brandLogo: "RAKIB.",
    tagline: "Welcome to My Personal Portfolio",
    headline: "Web Developer & Creative Digital Creator",
    summary: "A passionate and results-driven Web Developer and Creative Digital Creator dedicated to crafting high-performance, elegant, and user-centric digital experiences with modern web technologies.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    statusBadge: "Available for Projects & Full-time Opportunities",
    location: "Bangladesh (Available Worldwide)",
    email: "contact@rakibhasan.dev",
    phone: "+880 1XXXXXXXXX",
    experienceYears: "3+",
    completedProjects: "15+",
    happyClients: "100%"
  },
  about: {
    introduction: "Hello! I am Md Rakib Hasan, a dedicated Web Developer and Creative Digital Creator with a deep enthusiasm for building cutting-edge, responsive, and aesthetically refined web applications. I focus on bridging the gap between innovative visual design and solid, clean engineering.",
    interests: "Passionate about modern web technologies, glassmorphism UI/UX design, interactive frontend architectures, API development, database optimization, and exploring the latest developments in modern JavaScript frameworks and creative web animation.",
    goals: "My primary goal is to continuously hone my craft as a full-stack engineer, deliver top-tier digital products that solve real-world problems for clients and businesses, and contribute meaningful open-source software to the developer community.",
    journey: "My professional journey started with a fascination for how the internet works, which evolved into hands-on web development with HTML, CSS, and JavaScript. Over time, I progressed into modern frontend development with React, backend architecture with Node.js and Express, and structured data persistence with PostgreSQL.",
    ambitions: "My future ambitions are centered around architecting scalable, enterprise-grade cloud systems, leading innovative web design projects, mastering cutting-edge fullstack ecosystems, and mentoring aspiring developers in the tech ecosystem."
  },
  skills: [
    { id: 1, name: "HTML", category: "Frontend", level: 95, icon: "code", description: "Semantic structure & accessibility standards" },
    { id: 2, name: "CSS", category: "Frontend", level: 92, icon: "layout", description: "Modern CSS3, responsive layouts, and Tailwind CSS" },
    { id: 3, name: "JavaScript", category: "Frontend / Logic", level: 88, icon: "fileCode", description: "ES6+, Async/Await, DOM manipulation" },
    { id: 4, name: "Web Development", category: "Core Discipline", level: 90, icon: "globe", description: "End-to-end web engineering & performance" },
    { id: 5, name: "Node.js", category: "Backend", level: 82, icon: "server", description: "Server-side runtime, Express.js REST APIs" },
    { id: 6, name: "Database Management", category: "Database", level: 80, icon: "database", description: "PostgreSQL schema design & SQL modeling" },
    { id: 7, name: "Creative Design", category: "Design", level: 85, icon: "penTool", description: "Modern UI/UX, glassmorphism, wireframes" }
  ],
  projects: [
    {
      id: 1,
      title: "Md Rakib Hasan Portfolio Platform",
      category: "Full Stack",
      description: "A premium glassmorphic personal portfolio website featuring dark navy and purple gradient theme, dynamic dark/light mode toggle, contact message saving, and a secure functional Admin Dashboard.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star/rakib"
    },
    {
      id: 2,
      title: "NovaStore - Modern E-Commerce Storefront",
      category: "Full Stack",
      description: "An elegant e-commerce web application featuring high-performance product listings, dynamic category filtering, shopping cart state management, and a PostgreSQL-backed product API.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
      technologies: ["JavaScript (ES6+)", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star/rakib"
    },
    {
      id: 3,
      title: "FlowTask - Interactive Workflow & Task Manager",
      category: "Frontend",
      description: "A streamlined productivity web app designed for agile task tracking, featuring drag-and-drop kanban boards, priority tagging, and persistent local sync.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Responsive UI"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star/rakib"
    },
    {
      id: 4,
      title: "Lumina Studio - Creative Digital Agency Website",
      category: "Creative",
      description: "A showcase digital agency landing experience emphasizing glassmorphism UI, smooth scroll animations, interactive 3D card tilt effects, and an inquiry pipeline.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML5", "CSS3 Animations", "JavaScript", "Glassmorphism UI"],
      liveDemo: "#",
      sourceCode: "https://github.com/rakibhosenroki-star/rakib"
    }
  ],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/rakibhosenroki-star", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/mdrakibhasan", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/mdrakibhasan", icon: "twitter" },
    { platform: "Email", url: "mailto:contact@rakibhasan.dev", icon: "mail" }
  ]
};

export default function App() {
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('rakib_react_portfolio_state');
    return saved ? JSON.parse(saved) : initialPortfolioState;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('rakib_react_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        subject: "Web Development Collaboration",
        message: "Hi Md Rakib Hasan! I love your glassmorphism portfolio and would like to collaborate on an upcoming project."
      }
    ];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Secret Hotkey & URL Hash triggers for Admin access
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    const handleHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash.toLowerCase() === '#admin') {
      setIsAdminOpen(true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('rakib_react_portfolio_state', JSON.stringify(portfolioData));
  }, [portfolioData]);

  useEffect(() => {
    localStorage.setItem('rakib_react_messages', JSON.stringify(messages));
  }, [messages]);

  // Admin mutation callbacks
  const handleUpdateProfile = (newProfile) => {
    setPortfolioData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...newProfile }
    }));
  };

  const handleUpdateAbout = (newAbout) => {
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, ...newAbout }
    }));
  };

  const handleAddProject = (newProj) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [{ id: Date.now(), ...newProj }, ...prev.projects]
    }));
  };

  const handleUpdateProject = (id, updated) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updated } : p)
    }));
  };

  const handleDeleteProject = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleAddSkill = (newSkill) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), ...newSkill }]
    }));
  };

  const handleUpdateSkill = (id, updated) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updated } : s)
    }));
  };

  const handleDeleteSkill = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const handleDeleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 selection:bg-purple-600 selection:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background Tech Grid & Dynamic Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="tech-grid-overlay" />
      </div>

      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
      
      <main>
        <Hero profile={portfolioData.profile} socialLinks={portfolioData.socialLinks} />
        <About about={portfolioData.about} profile={portfolioData.profile} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Services />
        <Contact profile={portfolioData.profile} />
      </main>

      <Footer profile={portfolioData.profile} socialLinks={portfolioData.socialLinks} />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={portfolioData}
        onUpdateProfile={handleUpdateProfile}
        onUpdateAbout={handleUpdateAbout}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onAddSkill={handleAddSkill}
        onUpdateSkill={handleUpdateSkill}
        onDeleteSkill={handleDeleteSkill}
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
}

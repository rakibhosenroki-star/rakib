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
    summary: "",
    avatar: "assets/images/profile.jpg",
    statusBadge: "Available for Projects",
    location: "Bangladesh",
    email: "contact@rakibhasan.dev",
    phone: "",
    experienceYears: "",
    completedProjects: "",
    happyClients: ""
  },
  about: {
    introduction: "",
    interests: "",
    goals: "",
    journey: "",
    ambitions: ""
  },
  skills: [],
  projects: [],
  services: [],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/rakibhosenroki-star", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/", icon: "twitter" },
    { platform: "Email", url: "mailto:contact@rakibhasan.dev", icon: "mail" }
  ]
};

export default function App() {
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('rakib_react_portfolio_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Purge dummy demo projects and demo texts if present
        if (parsed.projects && parsed.projects.some(p => p.title && (p.title.includes('NovaStore') || p.title.includes('FlowTask') || p.title.includes('Lumina Studio')))) {
          parsed.projects = [];
        }
        if (parsed.about && parsed.about.introduction && parsed.about.introduction.includes("dedicated Web Developer and Creative Digital Creator with a deep enthusiasm")) {
          parsed.about = { introduction: "", interests: "", goals: "", journey: "", ambitions: "" };
        }
        if (parsed.profile && parsed.profile.summary && parsed.profile.summary.includes("passionate and results-driven Web Developer")) {
          parsed.profile.summary = "";
        }
        return parsed;
      } catch (e) {
        return initialPortfolioState;
      }
    }
    return initialPortfolioState;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('rakib_react_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(m => m.name !== "Alex Morgan");
      } catch (e) {
        return [];
      }
    }
    return [];
  });
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
        <Services services={portfolioData.services} />
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

import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All');

  const defaultProjects = [
    {
      id: 1,
      title: "Md Rakib Hasan Portfolio Platform",
      category: "Full Stack",
      description: "A premium glassmorphic personal portfolio website featuring dark navy and purple gradient theme, dynamic dark/light mode toggle, contact message saving, and a secure functional Admin Dashboard.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL"],
      liveDemo: "#",
      sourceCode: "https://github.com/mdrakibhasan"
    },
    {
      id: 2,
      title: "NovaStore - Modern E-Commerce Storefront",
      category: "Full Stack",
      description: "An elegant e-commerce web application featuring high-performance product listings, dynamic category filtering, shopping cart state management, and a PostgreSQL-backed product API.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
      technologies: ["JavaScript (ES6+)", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
      liveDemo: "#",
      sourceCode: "https://github.com/mdrakibhasan"
    },
    {
      id: 3,
      title: "FlowTask - Interactive Workflow & Task Manager",
      category: "Frontend",
      description: "A streamlined productivity web app designed for agile task tracking, featuring drag-and-drop kanban boards, priority tagging, and persistent local sync.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Responsive UI"],
      liveDemo: "#",
      sourceCode: "https://github.com/mdrakibhasan"
    },
    {
      id: 4,
      title: "Lumina Studio - Creative Digital Agency Website",
      category: "Creative",
      description: "A showcase digital agency landing experience emphasizing glassmorphism UI, smooth scroll animations, interactive 3D card tilt effects, and an inquiry pipeline.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML5", "CSS3 Animations", "JavaScript", "Glassmorphism UI"],
      liveDemo: "#",
      sourceCode: "https://github.com/mdrakibhasan"
    }
  ];

  const projectList = projects && projects.length > 0 ? projects : defaultProjects;
  const categories = ['All', ...new Set(projectList.map(p => p.category))];

  const filtered = filter === 'All'
    ? projectList
    : projectList.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Featured <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            A selection of modern web applications showcasing fullstack architecture and refined interfaces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id || idx}
              className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:-translate-y-1.5 transition-all shadow-xl overflow-hidden flex flex-col group relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />
              {/* Thumbnail */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/15">
                  {project.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.technologies || []).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href={project.liveDemo || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 hover:brightness-110 transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={project.sourceCode || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

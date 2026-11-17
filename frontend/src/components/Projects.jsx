import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All');

  const projectList = projects || [];
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

        {projectList.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-2xl bg-slate-900/40 border border-dashed border-white/10 backdrop-blur-sm max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <Github size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Projects Coming Soon</h3>
            <p className="text-slate-400 text-sm">
              Custom projects showcase will appear here. Add and publish your featured projects from the Admin Dashboard!
            </p>
          </div>
        ) : (
          <>
            {/* Filter Pills */}
            {categories.length > 1 && (
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
            )}

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
          </>
        )}

      </div>
    </section>
  );
}

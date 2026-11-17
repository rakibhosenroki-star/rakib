import React from 'react';
import { Code, Layout, FileCode, Globe, Server, Database, PenTool } from 'lucide-react';

const iconMap = {
  code: <Code size={20} className="text-indigo-400" />,
  layout: <Layout size={20} className="text-purple-400" />,
  fileCode: <FileCode size={20} className="text-pink-400" />,
  globe: <Globe size={20} className="text-cyan-400" />,
  server: <Server size={20} className="text-emerald-400" />,
  database: <Database size={20} className="text-blue-400" />,
  penTool: <PenTool size={20} className="text-amber-400" />
};

export default function Skills({ skills }) {
  const skillList = skills || [];

  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
            My Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Technical Skills &amp; <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Transparent breakdown of core technologies I work with. Fully customizable via the Admin Dashboard.
          </p>
        </div>

        {/* Skills Cards Grid */}
        {skillList.length === 0 ? (
          <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-400">
              <Code size={24} />
            </div>
            <h3 className="text-base font-bold text-white mb-2">No Skills Listed Yet</h3>
            <p className="text-xs text-slate-400">
              Skills have been cleared. Add and customize your own technical skills anytime from the Admin Dashboard!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillList.map((skill, idx) => (
              <div
                key={skill.id || idx}
                className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all shadow-xl flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {iconMap[skill.icon] || <Code size={20} className="text-purple-400" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{skill.name}</h3>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400">{skill.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

import React from 'react';
import { User, Heart, Target, Navigation, Compass } from 'lucide-react';

export default function About({ about, profile }) {
  const a = about || {};

  const pillars = [
    {
      title: 'Personal Introduction',
      icon: <User className="text-indigo-400" size={24} />,
      content: a.introduction || "No personal introduction written yet. Update this from the Admin Dashboard."
    },
    {
      title: 'My Interests',
      icon: <Heart className="text-pink-400" size={24} />,
      content: a.interests || "No interests specified yet. Update your interests in the Admin Dashboard."
    },
    {
      title: 'My Goals',
      icon: <Target className="text-purple-400" size={24} />,
      content: a.goals || "No personal goals specified yet. Add your career goals in the Admin Dashboard."
    },
    {
      title: 'My Professional Journey',
      icon: <Navigation className="text-cyan-400" size={24} />,
      content: a.journey || "No journey details written yet. Share your experience in the Admin Dashboard."
    },
    {
      title: 'My Future Ambitions',
      icon: <Compass className="text-emerald-400" size={24} />,
      content: a.ambitions || "No future ambitions added yet. Detail your future outlook in the Admin Dashboard.",
      colSpan: 'md:col-span-2'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Introducing <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Md Rakib Hasan</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Discover the principles, passion, and future outlook driving my software engineering journey.
          </p>
        </div>

        {/* 5 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all shadow-xl relative overflow-hidden ${pillar.colSpan || ''}`}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{pillar.content}</p>
            </div>
          ))}
        </div>

        {/* Quick Highlights / Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-3xl font-extrabold text-purple-400 mb-1">3+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Years Continuous Practice</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-3xl font-extrabold text-indigo-400 mb-1">15+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Projects & Digital Works</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
            <div className="text-3xl font-extrabold text-pink-400 mb-1">100%</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Commitment to Code Quality</div>
          </div>
        </div>

      </div>
    </section>
  );
}

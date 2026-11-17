import React from 'react';
import { ArrowRight, Mail, Github, Linkedin, Twitter, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ profile, socialLinks }) {
  const p = profile || {
    name: "Md Rakib Hasan",
    tagline: "Welcome to My Personal Portfolio",
    headline: "Web Developer & Creative Digital Creator",
    summary: "A passionate and results-driven Web Developer and Creative Digital Creator dedicated to crafting high-performance, elegant, and user-centric digital experiences with modern web technologies.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-xs font-semibold text-slate-200 mb-6 backdrop-blur-md shadow-lg shadow-black/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{p.tagline}</span>
            </div>

            {/* Main Name */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                {p.name}
              </span>
            </h1>

            {/* Headline */}
            <h2 className="text-xl sm:text-2xl font-bold text-purple-300/90 mb-5">
              {p.headline}
            </h2>

            {/* Professional Introduction */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {p.summary}
            </p>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm backdrop-blur-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Mail size={16} className="text-purple-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
                Connect With Me
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {(socialLinks || [
                  { platform: 'GitHub', url: 'https://github.com/mdrakibhasan', icon: 'github' },
                  { platform: 'LinkedIn', url: 'https://linkedin.com/in/mdrakibhasan', icon: 'linkedin' },
                  { platform: 'Twitter', url: 'https://twitter.com/mdrakibhasan', icon: 'twitter' },
                ]).map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-purple-400 hover:border-purple-500/40 hover:-translate-y-1 transition-all"
                    title={s.platform}
                  >
                    {s.platform === 'GitHub' && <Github size={18} />}
                    {s.platform === 'LinkedIn' && <Linkedin size={18} />}
                    {s.platform === 'Twitter' && <Twitter size={18} />}
                    {s.platform === 'Email' && <Mail size={18} />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Avatar Showcase Right */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative">
              {/* Glowing Aura Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse" />

              {/* Avatar Glass Box */}
              <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-[2rem] p-2.5 bg-gradient-to-br from-white/20 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-[1.6rem]"
                />
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <Sparkles size={14} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Design</div>
                  <div className="text-xs font-bold text-white">Glassmorphism UI</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Architecture</div>
                  <div className="text-xs font-bold text-white">Clean Full-Stack</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

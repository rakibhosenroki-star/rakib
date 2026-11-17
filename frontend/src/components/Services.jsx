import React from 'react';
import { Code, Layout, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      icon: <Code className="text-indigo-400" size={26} />,
      description: "Building fast, reliable, and secure web applications from scratch using modern best practices, clean modular architecture, and robust coding standards.",
      features: [
        "Custom web application development",
        "Clean, maintainable code architecture",
        "Full-lifecycle development & testing",
        "API integration & backend connections"
      ]
    },
    {
      title: "Website Design",
      icon: <Layout className="text-purple-400" size={26} />,
      description: "Crafting visually striking, modern glassmorphic website interfaces that elevate personal brands and capture user attention with refined elegance.",
      features: [
        "Premium glassmorphism UI design",
        "Custom color palettes & typography",
        "User-centered UX workflows",
        "Interactive prototypes & wireframes"
      ]
    },
    {
      title: "Frontend Development",
      icon: <Layers className="text-pink-400" size={26} />,
      description: "Translating concepts and UI designs into pixel-perfect, responsive, and dynamic web interfaces powered by React and modern JavaScript.",
      features: [
        "100% Mobile & cross-device responsiveness",
        "Smooth micro-animations & transitions",
        "React component architecture",
        "Optimized asset loading & fast speeds"
      ]
    },
    {
      title: "Creative Digital Projects",
      icon: <Sparkles className="text-cyan-400" size={26} />,
      description: "Designing bespoke digital solutions, creative promotional assets, interactive web experiences, and tailored digital deliverables.",
      features: [
        "Interactive landing pages",
        "Modern digital portfolio solutions",
        "Creative UI component libraries",
        "Custom technical solutions"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
            Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            What I Bring To <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Your Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional development and creative services tailored to help your products stand out with excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((serv, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:-translate-y-1.5 transition-all shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {serv.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{serv.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {serv.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {serv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check size={14} className="text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Get in Touch</span>
                <ArrowRight size={13} className="text-purple-400" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

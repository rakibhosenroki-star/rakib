import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer({ profile, socialLinks }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-14 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <a href="#home" className="text-xl font-black tracking-tight text-white flex items-center">
              RAKIB<span className="text-purple-500">.</span>
            </a>
            <p className="text-xs text-slate-400 mt-1">
              Personal portfolio of <strong className="text-slate-200">Md Rakib Hasan</strong>. Web Developer &amp; Creative Digital Creator.
            </p>
          </div>

          <div className="flex items-center gap-3">
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
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                title={s.platform}
              >
                {s.platform === 'GitHub' && <Github size={16} />}
                {s.platform === 'LinkedIn' && <Linkedin size={16} />}
                {s.platform === 'Twitter' && <Twitter size={16} />}
                {s.platform === 'Email' && <Mail size={16} />}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} <strong className="text-slate-200">Md Rakib Hasan</strong>. All rights reserved.
          </div>
          <div>
            React.js • Tailwind CSS • Node.js • PostgreSQL
          </div>
        </div>
      </div>
    </footer>
  );
}

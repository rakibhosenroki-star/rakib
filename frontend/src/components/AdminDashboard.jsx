import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { X, Lock, LayoutDashboard, User, Image, BookOpen, Wrench, FolderGit2, Share2, Inbox, Settings, LogOut, Check, Trash2, Edit } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose, data, onUpdateProfile, onUpdateAbout, onAddProject, onUpdateProject, onDeleteProject, onAddSkill, onUpdateSkill, onDeleteSkill, messages, onDeleteMessage }) {
  const { isAuthenticated, login, logout, token } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('overview');
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Editable Profile State
  const [profileForm, setProfileForm] = useState(() => ({
    name: data?.profile?.name || 'Md Rakib Hasan',
    headline: data?.profile?.headline || 'Web Developer & Creative Digital Creator',
    tagline: data?.profile?.tagline || 'Welcome to My Personal Portfolio',
    statusBadge: data?.profile?.statusBadge || 'Available for Projects & Freelance',
    email: data?.profile?.email || 'contact@rakibhasan.dev',
    location: data?.profile?.location || 'Bangladesh (Available Worldwide)',
    phone: data?.profile?.phone || '+880 1XXXXXXXXX'
  }));

  // Editable About State
  const [aboutForm, setAboutForm] = useState(() => ({
    introduction: data?.about?.introduction || '',
    interests: data?.about?.interests || '',
    goals: data?.about?.goals || '',
    journey: data?.about?.journey || '',
    ambitions: data?.about?.ambitions || ''
  }));

  // New Skill Form State
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', level: 85, description: '' });
  const [editingSkillId, setEditingSkillId] = useState(null);

  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    description: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    technologies: '',
    liveDemo: '#',
    sourceCode: '#'
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginCreds.username === 'admin' && loginCreds.password === 'rakib2026') {
      login('admin-session-active');
      setLoginError('');
      showFeedback('Login successful!');
    } else {
      setLoginError('Invalid admin credentials.');
    }
  };

  const showFeedback = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    showFeedback('Profile updated successfully!');
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    onUpdateAbout(aboutForm);
    showFeedback('About pillars updated successfully!');
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (editingSkillId) {
      onUpdateSkill(editingSkillId, skillForm);
      setEditingSkillId(null);
      showFeedback('Skill updated!');
    } else {
      onAddSkill(skillForm);
      showFeedback('New skill added!');
    }
    setSkillForm({ name: '', category: 'Frontend', level: 85, description: '' });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const techArray = typeof projectForm.technologies === 'string'
      ? projectForm.technologies.split(',').map(t => t.trim())
      : projectForm.technologies;

    const payload = { ...projectForm, technologies: techArray };

    if (editingProjectId) {
      onUpdateProject(editingProjectId, payload);
      setEditingProjectId(null);
      showFeedback('Project updated!');
    } else {
      onAddProject(payload);
      showFeedback('New project added!');
    }
    setProjectForm({
      title: '',
      category: 'Full Stack',
      description: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      technologies: '',
      liveDemo: '#',
      sourceCode: '#'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Portfolio Admin Dashboard</h3>
              <p className="text-xs text-slate-400">Manage Md Rakib Hasan portfolio details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {statusMsg && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <Check size={14} />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Auth Gate if not logged in */}
        {!isAuthenticated ? (
          <div className="p-10 text-center max-w-md mx-auto my-auto w-full">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto mb-4">
              <Lock size={26} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Admin Authentication</h4>
            <p className="text-xs text-slate-400 mb-6">
              Enter admin credentials to unlock portfolio management features.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  value={loginCreds.username}
                  onChange={(e) => setLoginCreds(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={loginCreds.password}
                  onChange={(e) => setLoginCreds(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20"
              >
                Log In
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Body */
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-56 border-r border-white/10 p-4 flex flex-col gap-1.5 shrink-0 bg-slate-950/40">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'profile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <User size={16} />
                <span>Profile &amp; Bio</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'about' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen size={16} />
                <span>About Details</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'skills' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Wrench size={16} />
                <span>Manage Skills</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'projects' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderGit2 size={16} />
                <span>Manage Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'messages' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Inbox size={16} />
                <span>Messages ({messages?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('theme')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'theme' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings size={16} />
                <span>Website Theme</span>
              </button>

              <div className="mt-auto pt-4 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
              </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-6 overflow-y-auto">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div>
                  <h4 className="text-base font-bold text-white mb-4">Dashboard Overview</h4>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold text-purple-400">{data?.skills?.length || 7}</div>
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">Active Skills</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold text-indigo-400">{data?.projects?.length || 4}</div>
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">Showcase Projects</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold text-pink-400">{messages?.length || 0}</div>
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">Contact Inquiries</div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h5 className="font-bold text-white text-sm mb-2">Welcome, Md Rakib Hasan!</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      All adjustments made in this dashboard update your live portfolio instantly and persist directly in your PostgreSQL database and local storage.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB: PROFILE & BIO */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-xl">
                  <h4 className="text-base font-bold text-white mb-2">Edit Name &amp; Identity</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Headline</label>
                      <input
                        type="text"
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm(p => ({ ...p, headline: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Welcome Tagline</label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm(p => ({ ...p, tagline: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
                  >
                    Save Changes
                  </button>
                </form>
              )}

              {/* TAB: ABOUT DETAILS */}
              {activeTab === 'about' && (
                <form onSubmit={handleAboutSubmit} className="space-y-4 max-w-xl">
                  <h4 className="text-base font-bold text-white mb-2">Edit 5 About Pillars</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">1. Personal Introduction</label>
                    <textarea
                      rows="2"
                      value={aboutForm.introduction}
                      onChange={(e) => setAboutForm(a => ({ ...a, introduction: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">2. My Interests</label>
                    <textarea
                      rows="2"
                      value={aboutForm.interests}
                      onChange={(e) => setAboutForm(a => ({ ...a, interests: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">3. My Goals</label>
                    <textarea
                      rows="2"
                      value={aboutForm.goals}
                      onChange={(e) => setAboutForm(a => ({ ...a, goals: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">4. My Professional Journey</label>
                    <textarea
                      rows="2"
                      value={aboutForm.journey}
                      onChange={(e) => setAboutForm(a => ({ ...a, journey: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">5. My Future Ambitions</label>
                    <textarea
                      rows="2"
                      value={aboutForm.ambitions}
                      onChange={(e) => setAboutForm(a => ({ ...a, ambitions: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
                  >
                    Save About Details
                  </button>
                </form>
              )}

              {/* TAB: SKILLS */}
              {activeTab === 'skills' && (
                <div>
                  <h4 className="text-base font-bold text-white mb-4">Manage Skills</h4>
                  
                  {/* Skill Form */}
                  <form onSubmit={handleSkillSubmit} className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Skill Name</label>
                        <input
                          type="text"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm(s => ({ ...s, name: e.target.value }))}
                          placeholder="e.g. HTML"
                          required
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Category</label>
                        <input
                          type="text"
                          value={skillForm.category}
                          onChange={(e) => setSkillForm(s => ({ ...s, category: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Level (%)</label>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          value={skillForm.level}
                          onChange={(e) => setSkillForm(s => ({ ...s, level: Number(e.target.value) }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Description</label>
                      <input
                        type="text"
                        value={skillForm.description}
                        onChange={(e) => setSkillForm(s => ({ ...s, description: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-purple-600 text-white font-bold text-xs">
                      {editingSkillId ? 'Update Skill' : '+ Add Skill'}
                    </button>
                  </form>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {(data?.skills || []).map((sk) => (
                      <div key={sk.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white text-xs">{sk.name}</span>
                          <span className="text-[11px] text-slate-400 ml-2">({sk.category} - {sk.level}%)</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingSkillId(sk.id);
                              setSkillForm({ name: sk.name, category: sk.category, level: sk.level, description: sk.description || '' });
                            }}
                            className="p-1 text-slate-300 hover:text-purple-400"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => onDeleteSkill(sk.id)}
                            className="p-1 text-slate-300 hover:text-rose-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div>
                  <h4 className="text-base font-bold text-white mb-4">Manage Projects</h4>
                  
                  <form onSubmit={handleProjectSubmit} className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                          required
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Category</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                        >
                          <option value="Full Stack">Full Stack</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Creative">Creative</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Description</label>
                      <textarea
                        rows="2"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                        required
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm(p => ({ ...p, technologies: e.target.value }))}
                        placeholder="React.js, Tailwind, Node.js, PostgreSQL"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <button type="submit" className="px-4 py-2 rounded-lg bg-purple-600 text-white font-bold text-xs">
                      {editingProjectId ? 'Update Project' : '+ Add Project'}
                    </button>
                  </form>

                  {/* Projects List */}
                  <div className="space-y-2">
                    {(data?.projects || []).map((pr) => (
                      <div key={pr.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white text-xs">{pr.title}</span>
                          <span className="text-[11px] text-slate-400 ml-2">({pr.category})</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProjectId(pr.id);
                              setProjectForm({
                                title: pr.title,
                                category: pr.category,
                                description: pr.description,
                                image: pr.image,
                                technologies: Array.isArray(pr.technologies) ? pr.technologies.join(', ') : pr.technologies,
                                liveDemo: pr.liveDemo,
                                sourceCode: pr.sourceCode
                              });
                            }}
                            className="p-1 text-slate-300 hover:text-purple-400"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => onDeleteProject(pr.id)}
                            className="p-1 text-slate-300 hover:text-rose-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: MESSAGES */}
              {activeTab === 'messages' && (
                <div>
                  <h4 className="text-base font-bold text-white mb-4">Contact Messages</h4>
                  {(!messages || messages.length === 0) ? (
                    <div className="text-center py-10 text-xs text-slate-500">No contact inquiries yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div key={m.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-bold text-white text-xs">{m.subject || 'Inquiry'}</div>
                              <div className="text-[11px] text-slate-400">From: {m.name} ({m.email})</div>
                            </div>
                            <button
                              onClick={() => onDeleteMessage(m.id)}
                              className="text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg">{m.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: THEME SETTINGS */}
              {activeTab === 'theme' && (
                <div>
                  <h4 className="text-base font-bold text-white mb-4">Website Theme Options</h4>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-md">
                    <p className="text-xs text-slate-300 mb-4">
                      Current Active Theme: <strong className="text-purple-400 uppercase">{theme}</strong>
                    </p>
                    <button
                      onClick={toggleTheme}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
                    >
                      Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Navy Mode'}
                    </button>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  );
}

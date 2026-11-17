/**
 * MD RAKIB HASAN - PORTFOLIO STORAGE ENGINE
 * Manages persistent client-side data, state management, and optional backend synchronization.
 */

const STORAGE_KEY = "rakib_hasan_portfolio_data_v1";
const AUTH_KEY = "rakib_hasan_admin_auth_v1";

class PortfolioStore {
  constructor() {
    this.listeners = [];
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const mergedProfile = { ...window.defaultPortfolioData.profile, ...(parsed.profile || {}) };
        if (!mergedProfile.avatar || mergedProfile.avatar.trim() === "" || mergedProfile.avatar.includes("images.unsplash.com/photo-1534528741775-53994a69daeb")) {
          mergedProfile.avatar = window.defaultPortfolioData.profile.avatar || "assets/images/profile.jpg";
        }
        return {
          ...window.defaultPortfolioData,
          ...parsed,
          profile: mergedProfile,
          about: { ...window.defaultPortfolioData.about, ...(parsed.about || {}) },
          settings: { ...window.defaultPortfolioData.settings, ...(parsed.settings || {}) }
        };
      }
    } catch (e) {
      console.warn("Could not load from localStorage, falling back to default:", e);
    }
    return JSON.parse(JSON.stringify(window.defaultPortfolioData));
  }

  saveData() {
    let success = false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      success = true;
    } catch (e) {
      console.error("Failed to save data to localStorage:", e);
      if (e.name === "QuotaExceededError" || e.code === 22) {
        console.warn("localStorage quota exceeded! Attempting memory state preservation.");
      }
    }
    // ALWAYS notify listeners so UI updates immediately in real-time
    this.notifyListeners();
    return success;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try {
        fn(this.data);
      } catch (err) {
        console.error("Error in store subscriber:", err);
      }
    });
  }

  getData() {
    return this.data;
  }

  // --- Profile & About Operations ---
  updateProfile(profileData) {
    this.data.profile = { ...this.data.profile, ...profileData };
    this.saveData();
    return this.data.profile;
  }

  updateAbout(aboutData) {
    this.data.about = { ...this.data.about, ...aboutData };
    this.saveData();
    return this.data.about;
  }

  // --- Skills Operations ---
  getSkills() {
    return this.data.skills || [];
  }

  addSkill(skill) {
    const newSkill = {
      id: "skill-" + Date.now(),
      level: 80,
      category: "Technical",
      icon: "code",
      ...skill
    };
    this.data.skills.push(newSkill);
    this.saveData();
    return newSkill;
  }

  updateSkill(id, updatedFields) {
    const index = this.data.skills.findIndex(s => s.id === id);
    if (index !== -1) {
      this.data.skills[index] = { ...this.data.skills[index], ...updatedFields };
      this.saveData();
      return this.data.skills[index];
    }
    return null;
  }

  deleteSkill(id) {
    this.data.skills = this.data.skills.filter(s => s.id !== id);
    this.saveData();
    return true;
  }

  // --- Projects Operations ---
  getProjects() {
    return this.data.projects || [];
  }

  addProject(project) {
    const newProject = {
      id: "proj-" + Date.now(),
      technologies: [],
      liveDemo: "#",
      sourceCode: "#",
      featured: false,
      ...project
    };
    this.data.projects.unshift(newProject);
    this.saveData();
    return newProject;
  }

  updateProject(id, updatedFields) {
    const index = this.data.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.projects[index] = { ...this.data.projects[index], ...updatedFields };
      this.saveData();
      return this.data.projects[index];
    }
    return null;
  }

  deleteProject(id) {
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    this.saveData();
    return true;
  }

  // --- Services Operations ---
  getServices() {
    return this.data.services || [];
  }

  updateService(id, updatedFields) {
    const index = this.data.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.data.services[index] = { ...this.data.services[index], ...updatedFields };
      this.saveData();
      return this.data.services[index];
    }
    return null;
  }

  // --- Social Links Operations ---
  getSocialLinks() {
    return this.data.socialLinks || [];
  }

  updateSocialLinks(newLinks) {
    this.data.socialLinks = newLinks;
    this.saveData();
    return this.data.socialLinks;
  }

  // --- Contact Messages Operations ---
  getMessages() {
    return this.data.messages || [];
  }

  addMessage(msg) {
    const newMessage = {
      id: "msg-" + Date.now(),
      name: msg.name || "Anonymous",
      email: msg.email || "",
      subject: msg.subject || "No Subject",
      message: msg.message || "",
      date: new Date().toISOString(),
      read: false
    };
    if (!this.data.messages) this.data.messages = [];
    this.data.messages.unshift(newMessage);
    this.saveData();
    return newMessage;
  }

  markMessageRead(id, status = true) {
    const msg = this.data.messages.find(m => m.id === id);
    if (msg) {
      msg.read = status;
      this.saveData();
      return true;
    }
    return false;
  }

  deleteMessage(id) {
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    this.saveData();
    return true;
  }

  // --- Settings & Themes ---
  getSettings() {
    return this.data.settings || { theme: "dark" };
  }

  setTheme(theme) {
    this.data.settings.theme = theme;
    this.saveData();
  }

  // --- Authentication ---
  isAdminAuthenticated() {
    try {
      const auth = sessionStorage.getItem(AUTH_KEY);
      return auth === "authenticated";
    } catch (e) {
      return false;
    }
  }

  loginAdmin(username, password) {
    const settings = this.data.settings || {};
    const validUsername = settings.adminUsername || "admin";
    const validPassword = settings.adminPasswordHash || "rakib2026";

    if (username.trim() === validUsername && password === validPassword) {
      sessionStorage.setItem(AUTH_KEY, "authenticated");
      return { success: true };
    }
    return { success: false, message: "Invalid username or password" };
  }

  logoutAdmin() {
    sessionStorage.removeItem(AUTH_KEY);
    this.notifyListeners();
  }

  changeAdminPassword(currentPassword, newPassword) {
    const settings = this.data.settings || {};
    const validPassword = settings.adminPasswordHash || "rakib2026";

    if (currentPassword !== validPassword) {
      return { success: false, message: "Current password does not match" };
    }
    if (!newPassword || newPassword.length < 5) {
      return { success: false, message: "New password must be at least 5 characters" };
    }

    this.data.settings.adminPasswordHash = newPassword;
    this.saveData();
    return { success: true, message: "Admin password successfully updated" };
  }

  // --- Data Backup & Restore ---
  exportBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rakib_hasan_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && parsed.skills) {
        this.data = parsed;
        this.saveData();
        return { success: true, message: "Backup successfully restored!" };
      }
      return { success: false, message: "Invalid backup file structure." };
    } catch (e) {
      return { success: false, message: "Error parsing JSON backup file: " + e.message };
    }
  }

  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(window.defaultPortfolioData));
    this.saveData();
    return true;
  }
}

// Global Store Instance
window.portfolioStore = new PortfolioStore();

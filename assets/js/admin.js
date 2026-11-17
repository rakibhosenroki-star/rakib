/**
 * MD RAKIB HASAN - ADMIN DASHBOARD CONTROLLER
 * Full management features: Profile, Bio, Avatar, Skills, Projects, Services, Socials, Messages, Settings.
 */

class AdminController {
  constructor() {
    this.store = window.portfolioStore;
    this.modal = null;
    this.activeTab = "overview";
    this.editingProjectId = null;
    this.editingSkillId = null;
  }

  init() {
    this.modal = document.getElementById("adminModal");
    this.setupEventListeners();
  }

  // Compress and resize image to prevent localStorage quota overflows
  compressImage(file, maxWidth = 500, maxHeight = 500, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Unable to read image file"));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error("Invalid image format"));
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  setupEventListeners() {
    // Secret Keyboard Shortcut: Ctrl+Shift+A or Alt+A
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") || (e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        this.openDashboard();
      }
    });

    // Secret URL Hash Trigger (#admin)
    if (window.location.hash.toLowerCase() === "#admin") {
      setTimeout(() => this.openDashboard(), 300);
    }
    window.addEventListener("hashchange", () => {
      if (window.location.hash.toLowerCase() === "#admin") {
        this.openDashboard();
      }
    });

    // Secret Brand Logo Dot Trigger (Double-click on the '.' in RAKIB.)
    let dotClicks = 0;
    document.addEventListener("click", (e) => {
      if (e.target && (e.target.id === "brandLogoDot" || e.target.closest("#brandLogoDot") || e.target.id === "secretFooterAdmin")) {
        e.preventDefault();
        dotClicks++;
        if (dotClicks >= 2) {
          dotClicks = 0;
          this.openDashboard();
        }
        setTimeout(() => { dotClicks = 0; }, 800);
      }
    });

    // Optional legacy button support if present
    const openBtn = document.getElementById("openAdminBtn");
    const openBtnMobile = document.getElementById("openAdminBtnMobile");
    if (openBtn) openBtn.addEventListener("click", () => this.openDashboard());
    if (openBtnMobile) openBtnMobile.addEventListener("click", () => this.openDashboard());

    // Close admin modal
    const closeBtn = document.getElementById("closeAdminBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeDashboard());

    // Tab buttons
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Login form submission
    const loginForm = document.getElementById("adminLoginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("adminUsernameInput").value;
        const pass = document.getElementById("adminPasswordInput").value;
        const res = this.store.loginAdmin(user, pass);
        if (res.success) {
          this.showToast("Welcome back, Md Rakib Hasan!", "success");
          this.renderAuthenticatedView();
        } else {
          this.showToast(res.message, "error");
        }
      });
    }

    // Logout button
    const logoutBtn = document.getElementById("adminLogoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        this.store.logoutAdmin();
        this.showToast("Admin logged out", "success");
        this.renderLoginView();
      });
    }

    // Profile form submit
    const profileForm = document.getElementById("adminProfileForm");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const updated = {
          name: document.getElementById("adminProfileName").value.trim(),
          headline: document.getElementById("adminProfileHeadline").value.trim(),
          tagline: document.getElementById("adminProfileTagline").value.trim(),
          statusBadge: document.getElementById("adminProfileStatus").value.trim(),
          email: document.getElementById("adminProfileEmail").value.trim(),
          location: document.getElementById("adminProfileLocation").value.trim(),
          phone: document.getElementById("adminProfilePhone").value.trim()
        };
        const logoInp = document.getElementById("adminProfileBrandLogo");
        if (logoInp && logoInp.value.trim()) updated.brandLogo = logoInp.value.trim();
        const summaryInp = document.getElementById("adminProfileSummary");
        if (summaryInp) updated.summary = summaryInp.value.trim();

        this.store.updateProfile(updated);
        if (window.portfolioApp) {
          window.portfolioApp.render();
        }
        this.showToast("Profile details updated successfully!", "success");
      });
    }

    // About form submit
    const aboutForm = document.getElementById("adminAboutForm");
    if (aboutForm) {
      aboutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const updated = {
          introduction: document.getElementById("adminAboutIntro").value,
          interests: document.getElementById("adminAboutInterests").value,
          goals: document.getElementById("adminAboutGoals").value,
          journey: document.getElementById("adminAboutJourney").value,
          ambitions: document.getElementById("adminAboutAmbitions").value
        };
        this.store.updateAbout(updated);
        if (window.portfolioApp) {
          window.portfolioApp.render();
        }
        this.showToast("About Me sections updated successfully!", "success");
      });
    }

    // Circular Avatar & Photo change handlers
    const avatarUrlInput = document.getElementById("adminAvatarUrl");
    const avatarFileInput = document.getElementById("adminAvatarFile");
    const avatarPreview = document.getElementById("adminAvatarPreview");
    const avatarForm = document.getElementById("adminAvatarForm");
    const resetAvatarBtn = document.getElementById("resetAvatarBtn");

    if (avatarFileInput) {
      avatarFileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            this.showToast("Optimizing & resizing circular photo...", "info");
            const compressed = await this.compressImage(file);
            if (avatarPreview) avatarPreview.src = compressed;
            const heroImg = document.getElementById("heroAvatarImg");
            if (heroImg) heroImg.src = compressed;
            this.store.updateProfile({ avatar: compressed, avatarType: "base64" });
            if (window.portfolioApp) window.portfolioApp.render();
            this.showToast("Profile photo uploaded & saved successfully!", "success");
          } catch (err) {
            console.error("Avatar upload failed:", err);
            this.showToast("Photo processing error: " + err.message, "error");
          }
        }
      });
    }

    if (avatarUrlInput) {
      avatarUrlInput.addEventListener("input", (e) => {
        const url = e.target.value.trim();
        if (url) {
          if (avatarPreview) avatarPreview.src = url;
          const heroImg = document.getElementById("heroAvatarImg");
          if (heroImg) heroImg.src = url;
        }
      });
    }

    if (avatarForm) {
      avatarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = avatarUrlInput ? avatarUrlInput.value.trim() : "";
        if (url) {
          this.store.updateProfile({ avatar: url, avatarType: "url" });
          if (avatarPreview) avatarPreview.src = url;
          const heroImg = document.getElementById("heroAvatarImg");
          if (heroImg) heroImg.src = url;
          if (window.portfolioApp) window.portfolioApp.render();
          this.showToast("Profile picture link saved successfully!", "success");
        } else {
          this.showToast("Please choose an image file or enter an image URL.", "warning");
        }
      });
    }

    if (resetAvatarBtn) {
      resetAvatarBtn.addEventListener("click", () => {
        const defAvatar = "assets/images/profile.jpg";
        this.store.updateProfile({ avatar: defAvatar, avatarType: "local" });
        if (avatarPreview) avatarPreview.src = defAvatar;
        if (avatarUrlInput) avatarUrlInput.value = "";
        const heroImg = document.getElementById("heroAvatarImg");
        if (heroImg) heroImg.src = defAvatar;
        if (window.portfolioApp) window.portfolioApp.render();
        this.showToast("Profile picture reset to default.", "info");
      });
    }

    // Skill Form Modal & Submit
    const skillForm = document.getElementById("adminSkillForm");
    if (skillForm) {
      skillForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("skillNameInput").value;
        const category = document.getElementById("skillCategoryInput").value;
        const level = parseInt(document.getElementById("skillLevelInput").value, 10);
        const description = document.getElementById("skillDescInput").value;

        if (this.editingSkillId) {
          this.store.updateSkill(this.editingSkillId, { name, category, level, description });
          this.showToast("Skill updated successfully!", "success");
          this.editingSkillId = null;
        } else {
          this.store.addSkill({ name, category, level, description });
          this.showToast("New skill added successfully!", "success");
        }
        skillForm.reset();
        this.renderSkillsPanel();
      });
    }

    // Add new skill button reset
    const newSkillBtn = document.getElementById("addNewSkillBtn");
    if (newSkillBtn) {
      newSkillBtn.addEventListener("click", () => {
        this.editingSkillId = null;
        document.getElementById("adminSkillForm").reset();
        document.getElementById("skillFormTitle").textContent = "Add New Skill";
      });
    }

    // Project Form Modal & Submit
    const projectForm = document.getElementById("adminProjectForm");
    if (projectForm) {
      projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("projTitleInput").value;
        const category = document.getElementById("projCategoryInput").value;
        const description = document.getElementById("projDescInput").value;
        const image = document.getElementById("projImageInput").value || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
        const techStr = document.getElementById("projTechInput").value;
        const technologies = techStr.split(",").map(t => t.trim()).filter(Boolean);
        const liveDemo = document.getElementById("projDemoInput").value || "#";
        const sourceCode = document.getElementById("projCodeInput").value || "#";

        if (this.editingProjectId) {
          this.store.updateProject(this.editingProjectId, {
            title, category, description, image, technologies, liveDemo, sourceCode
          });
          this.showToast("Project updated successfully!", "success");
          this.editingProjectId = null;
        } else {
          this.store.addProject({
            title, category, description, image, technologies, liveDemo, sourceCode
          });
          this.showToast("New project added successfully!", "success");
        }
        projectForm.reset();
        this.renderProjectsPanel();
      });
    }

    // Project image file input
    const projFileInput = document.getElementById("projImageFileInput");
    if (projFileInput) {
      projFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            document.getElementById("projImageInput").value = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Add new project button reset
    const newProjBtn = document.getElementById("addNewProjectBtn");
    if (newProjBtn) {
      newProjBtn.addEventListener("click", () => {
        this.editingProjectId = null;
        document.getElementById("adminProjectForm").reset();
        document.getElementById("projectFormTitle").textContent = "Add New Project";
      });
    }

    // Social Links Form
    const socialsForm = document.getElementById("adminSocialsForm");
    if (socialsForm) {
      socialsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const links = [
          {
            id: "soc-1",
            platform: "GitHub",
            url: document.getElementById("socGithub").value,
            icon: "github",
            label: "GitHub"
          },
          {
            id: "soc-2",
            platform: "LinkedIn",
            url: document.getElementById("socLinkedin").value,
            icon: "linkedin",
            label: "LinkedIn"
          },
          {
            id: "soc-3",
            platform: "Twitter / X",
            url: document.getElementById("socTwitter").value,
            icon: "twitter",
            label: "Twitter"
          },
          {
            id: "soc-4",
            platform: "Email",
            url: document.getElementById("socEmail").value,
            icon: "mail",
            label: "Email"
          }
        ];
        this.store.updateSocialLinks(links);
        this.showToast("Social links updated!", "success");
      });
    }

    // Change Password Form
    const changePassForm = document.getElementById("adminChangePassForm");
    if (changePassForm) {
      changePassForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentPass = document.getElementById("currentAdminPassword").value;
        const newPass = document.getElementById("newAdminPassword").value;
        const res = this.store.changeAdminPassword(currentPass, newPass);
        if (res.success) {
          this.showToast(res.message, "success");
          changePassForm.reset();
        } else {
          this.showToast(res.message, "error");
        }
      });
    }

    // Backup & Restore
    const exportBtn = document.getElementById("adminExportBackupBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        this.store.exportBackup();
        this.showToast("Backup file downloaded successfully!", "success");
      });
    }

    const importInput = document.getElementById("adminImportBackupInput");
    if (importInput) {
      importInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = this.store.importBackup(event.target.result);
            if (res.success) {
              this.showToast(res.message, "success");
              this.populateAllForms();
            } else {
              this.showToast(res.message, "error");
            }
          };
          reader.readAsText(file);
        }
      });
    }

    const resetBtn = document.getElementById("adminResetDefaultsBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset all portfolio data to default settings?")) {
          this.store.resetToDefaults();
          this.showToast("Reset to default data complete", "success");
          this.populateAllForms();
        }
      });
    }
  }

  openDashboard() {
    this.modal.classList.add("active");
    if (this.store.isAdminAuthenticated()) {
      this.renderAuthenticatedView();
    } else {
      this.renderLoginView();
    }
  }

  closeDashboard() {
    this.modal.classList.remove("active");
  }

  renderLoginView() {
    document.getElementById("adminAuthGate").style.display = "block";
    document.getElementById("adminDashboardContent").style.display = "none";
    if (document.getElementById("adminUsernameInput")) document.getElementById("adminUsernameInput").value = "";
    if (document.getElementById("adminPasswordInput")) document.getElementById("adminPasswordInput").value = "";
  }

  renderAuthenticatedView() {
    document.getElementById("adminAuthGate").style.display = "none";
    document.getElementById("adminDashboardContent").style.display = "flex";
    this.populateAllForms();
    this.switchTab(this.activeTab);
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    document.querySelectorAll(".admin-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === `adminPanel_${tabId}`);
    });

    if (tabId === "skills") this.renderSkillsPanel();
    if (tabId === "projects") this.renderProjectsPanel();
    if (tabId === "messages") this.renderMessagesPanel();
    if (tabId === "overview") this.renderOverviewPanel();
  }

  populateAllForms() {
    const data = this.store.getData();
    const p = data.profile || {};
    const a = data.about || {};

    // Profile form
    if (document.getElementById("adminProfileName")) document.getElementById("adminProfileName").value = p.name || "";
    if (document.getElementById("adminProfileBrandLogo")) document.getElementById("adminProfileBrandLogo").value = p.brandLogo || "RAKIB.";
    if (document.getElementById("adminProfileHeadline")) document.getElementById("adminProfileHeadline").value = p.headline || "";
    if (document.getElementById("adminProfileTagline")) document.getElementById("adminProfileTagline").value = p.tagline || "";
    if (document.getElementById("adminProfileSummary")) document.getElementById("adminProfileSummary").value = p.summary || "";
    if (document.getElementById("adminProfileStatus")) document.getElementById("adminProfileStatus").value = p.statusBadge || "";
    if (document.getElementById("adminProfileEmail")) document.getElementById("adminProfileEmail").value = p.email || "";
    if (document.getElementById("adminProfileLocation")) document.getElementById("adminProfileLocation").value = p.location || "";
    if (document.getElementById("adminProfilePhone")) document.getElementById("adminProfilePhone").value = p.phone || "";

    // Avatar preview
    if (document.getElementById("adminAvatarPreview") && p.avatar) {
      document.getElementById("adminAvatarPreview").src = p.avatar;
    }
    if (document.getElementById("adminAvatarUrl")) {
      document.getElementById("adminAvatarUrl").value = p.avatarType === "url" ? p.avatar : "";
    }

    // About form
    if (document.getElementById("adminAboutIntro")) document.getElementById("adminAboutIntro").value = a.introduction || "";
    if (document.getElementById("adminAboutInterests")) document.getElementById("adminAboutInterests").value = a.interests || "";
    if (document.getElementById("adminAboutGoals")) document.getElementById("adminAboutGoals").value = a.goals || "";
    if (document.getElementById("adminAboutJourney")) document.getElementById("adminAboutJourney").value = a.journey || "";
    if (document.getElementById("adminAboutAmbitions")) document.getElementById("adminAboutAmbitions").value = a.ambitions || "";

    // Socials
    const socials = data.socialLinks || [];
    socials.forEach(s => {
      if (s.platform.toLowerCase().includes("github") && document.getElementById("socGithub")) {
        document.getElementById("socGithub").value = s.url;
      }
      if (s.platform.toLowerCase().includes("linkedin") && document.getElementById("socLinkedin")) {
        document.getElementById("socLinkedin").value = s.url;
      }
      if (s.platform.toLowerCase().includes("twitter") && document.getElementById("socTwitter")) {
        document.getElementById("socTwitter").value = s.url;
      }
      if (s.platform.toLowerCase().includes("email") && document.getElementById("socEmail")) {
        document.getElementById("socEmail").value = s.url;
      }
    });

    this.renderOverviewPanel();
  }

  renderOverviewPanel() {
    const data = this.store.getData();
    const skills = data.skills || [];
    const projects = data.projects || [];
    const messages = data.messages || [];
    const unread = messages.filter(m => !m.read).length;

    if (document.getElementById("statCountSkills")) document.getElementById("statCountSkills").textContent = skills.length;
    if (document.getElementById("statCountProjects")) document.getElementById("statCountProjects").textContent = projects.length;
    if (document.getElementById("statCountMessages")) document.getElementById("statCountMessages").textContent = messages.length;
    if (document.getElementById("statCountUnread")) document.getElementById("statCountUnread").textContent = unread;
  }

  renderSkillsPanel() {
    const skillsList = document.getElementById("adminSkillsList");
    if (!skillsList) return;

    const skills = this.store.getSkills();
    skillsList.innerHTML = skills.map(s => `
      <div class="glass-card" style="padding: 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <strong style="color: var(--text-primary); font-size: 1rem;">${s.name}</strong>
            <span class="glass-pill" style="padding: 2px 8px; font-size: 0.75rem;">${s.category}</span>
            <span style="color: var(--accent-purple); font-weight: 700; font-size: 0.85rem;">${s.level}%</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">${s.description || ""}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-glass btn-sm" onclick="window.adminCtrl.editSkill('${s.id}')">Edit</button>
          <button class="btn btn-glass btn-sm" style="color: #ef4444;" onclick="window.adminCtrl.deleteSkill('${s.id}')">Delete</button>
        </div>
      </div>
    `).join("");
  }

  editSkill(id) {
    const skill = this.store.getSkills().find(s => s.id === id);
    if (!skill) return;

    this.editingSkillId = id;
    document.getElementById("skillNameInput").value = skill.name;
    document.getElementById("skillCategoryInput").value = skill.category;
    document.getElementById("skillLevelInput").value = skill.level;
    document.getElementById("skillDescInput").value = skill.description || "";
    document.getElementById("skillFormTitle").textContent = `Edit Skill: ${skill.name}`;
    document.getElementById("skillNameInput").focus();
  }

  deleteSkill(id) {
    if (confirm("Are you sure you want to delete this skill?")) {
      this.store.deleteSkill(id);
      this.showToast("Skill deleted", "success");
      this.renderSkillsPanel();
    }
  }

  renderProjectsPanel() {
    const projList = document.getElementById("adminProjectsList");
    if (!projList) return;

    const projects = this.store.getProjects();
    projList.innerHTML = projects.map(p => `
      <div class="glass-card" style="padding: 18px; display: flex; align-items: center; gap: 16px; margin-bottom: 14px;">
        <img src="${p.image}" alt="${p.title}" style="width: 70px; height: 70px; border-radius: 12px; object-fit: cover;" />
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <strong style="color: var(--text-primary); font-size: 1.05rem;">${p.title}</strong>
            <span class="glass-pill" style="padding: 2px 8px; font-size: 0.75rem;">${p.category}</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4; margin-bottom: 6px;">
            ${p.description.slice(0, 100)}...
          </p>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${(p.technologies || []).map(t => `<span class="tech-tag" style="font-size: 0.72rem; padding: 2px 6px;">${t}</span>`).join("")}
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button class="btn btn-glass btn-sm" onclick="window.adminCtrl.editProject('${p.id}')">Edit</button>
          <button class="btn btn-glass btn-sm" style="color: #ef4444;" onclick="window.adminCtrl.deleteProject('${p.id}')">Delete</button>
        </div>
      </div>
    `).join("");
  }

  editProject(id) {
    const proj = this.store.getProjects().find(p => p.id === id);
    if (!proj) return;

    this.editingProjectId = id;
    document.getElementById("projTitleInput").value = proj.title;
    document.getElementById("projCategoryInput").value = proj.category;
    document.getElementById("projDescInput").value = proj.description;
    document.getElementById("projImageInput").value = proj.image;
    document.getElementById("projTechInput").value = (proj.technologies || []).join(", ");
    document.getElementById("projDemoInput").value = proj.liveDemo || "";
    document.getElementById("projCodeInput").value = proj.sourceCode || "";
    document.getElementById("projectFormTitle").textContent = `Edit Project: ${proj.title}`;
    document.getElementById("projTitleInput").focus();
  }

  deleteProject(id) {
    if (confirm("Are you sure you want to delete this project?")) {
      this.store.deleteProject(id);
      this.showToast("Project deleted", "success");
      this.renderProjectsPanel();
    }
  }

  renderMessagesPanel() {
    const container = document.getElementById("adminMessagesList");
    if (!container) return;

    const messages = this.store.getMessages();
    if (messages.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);">No contact messages yet.</div>`;
      return;
    }

    container.innerHTML = messages.map(m => `
      <div class="glass-card" style="padding: 22px; margin-bottom: 16px; border-left: 4px solid ${m.read ? 'var(--border-glass)' : 'var(--accent-purple)'};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h4 style="color: var(--text-primary); font-size: 1.1rem; margin-bottom: 2px;">${m.subject}</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              From: <strong style="color: var(--text-secondary);">${m.name}</strong> (${m.email}) • ${new Date(m.date).toLocaleString()}
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}" class="btn btn-primary btn-sm" style="text-decoration: none;">Reply</a>
            <button class="btn btn-glass btn-sm" onclick="window.adminCtrl.toggleMessageRead('${m.id}', ${!m.read})">
              ${m.read ? "Mark Unread" : "Mark Read"}
            </button>
            <button class="btn btn-glass btn-sm" style="color: #ef4444;" onclick="window.adminCtrl.deleteMessage('${m.id}')">Delete</button>
          </div>
        </div>
        <p style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.6; background: rgba(0,0,0,0.2); padding: 14px; border-radius: 10px;">
          ${m.message}
        </p>
      </div>
    `).join("");
  }

  toggleMessageRead(id, status) {
    this.store.markMessageRead(id, status);
    this.renderMessagesPanel();
    this.renderOverviewPanel();
  }

  deleteMessage(id) {
    if (confirm("Delete this message?")) {
      this.store.deleteMessage(id);
      this.showToast("Message deleted", "success");
      this.renderMessagesPanel();
      this.renderOverviewPanel();
    }
  }

  showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${type === "success" ? "✓" : "⚠"}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

window.adminCtrl = new AdminController();
document.addEventListener("DOMContentLoaded", () => {
  window.adminCtrl.init();
});

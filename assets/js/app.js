/**
 * MD RAKIB HASAN - PERSONAL PORTFOLIO
 * Main Frontend Application Controller
 */

// Embedded SVG Icons for 100% offline zero-dependency rendering
const ICONS = {
  code: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  layout: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
  fileCode: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="10 13 8 15 10 17"></polyline><polyline points="14 13 16 15 14 17"></polyline></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  server: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  penTool: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  externalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

class PortfolioApp {
  constructor() {
    this.store = window.portfolioStore;
    this.activeFilter = "All";
    this.init();
  }

  init() {
    this.applyTheme(this.store.getSettings().theme || "dark");
    this.render();
    this.setupListeners();
    this.store.subscribe(() => this.render());
  }

  setupListeners() {
    // Theme toggle
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        this.applyTheme(newTheme);
        this.store.setTheme(newTheme);
      });
    }

    // Mobile nav toggle
    const hamburger = document.getElementById("hamburgerBtn");
    const mobileNav = document.getElementById("mobileNav");
    const mobileBackdrop = document.getElementById("mobileNavBackdrop");
    const closeMobileNav = document.getElementById("closeMobileNav");

    const toggleNav = (open) => {
      mobileNav.classList.toggle("open", open);
      mobileBackdrop.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    if (hamburger) hamburger.addEventListener("click", () => toggleNav(true));
    if (closeMobileNav) closeMobileNav.addEventListener("click", () => toggleNav(false));
    if (mobileBackdrop) mobileBackdrop.addEventListener("click", () => toggleNav(false));

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => toggleNav(false));
    });

    // Contact form submit
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleContactSubmit(contactForm);
      });
    }

    // Smooth Scroll Spy for active nav
    window.addEventListener("scroll", () => {
      this.updateActiveNavLink();
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
      themeBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`);
    }
  }

  render() {
    const data = this.store.getData();
    this.renderHero(data.profile, data.socialLinks);
    this.renderAbout(data.about, data.profile);
    this.renderSkills(data.skills);
    this.renderProjects(data.projects);
    this.renderServices(data.services);
    this.renderContactInfo(data.profile);
    this.renderFooter(data.profile, data.socialLinks);
  }

  renderHero(profile, socialLinks) {
    // Brand Logo & Names
    document.querySelectorAll(".brand-name-text").forEach(el => el.textContent = profile.name || "Md Rakib Hasan");
    const logoEl = document.getElementById("brandLogo");
    if (logoEl) logoEl.innerHTML = `${profile.brandLogo ? profile.brandLogo.replace('.', '') : 'RAKIB'}<span>.</span>`;

    // Welcome Badge & Headings
    const welcomeBadge = document.getElementById("heroWelcomeBadge");
    if (welcomeBadge) welcomeBadge.innerHTML = `<span class="pulse-dot"></span> ${profile.tagline || 'Welcome to My Personal Portfolio'}`;

    const heroName = document.getElementById("heroName");
    if (heroName) heroName.innerHTML = `<span class="gradient-text">${profile.name || 'MD RAKIB HASAN'}</span>`;

    const heroHeadline = document.getElementById("heroHeadline");
    if (heroHeadline) heroHeadline.textContent = profile.headline || "Web Developer & Creative Digital Creator";

    const heroIntro = document.getElementById("heroIntro");
    if (heroIntro) heroIntro.textContent = profile.summary || "";

    // Avatar & Floating Badges
    const avatarImg = document.getElementById("heroAvatarImg");
    if (avatarImg && profile.avatar) {
      avatarImg.src = profile.avatar;
      avatarImg.alt = profile.name;
    }

    // Social Links in Hero
    const heroSocials = document.getElementById("heroSocials");
    if (heroSocials && socialLinks) {
      heroSocials.innerHTML = socialLinks.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-pill" title="${s.platform}" aria-label="${s.platform}">
          ${ICONS[s.icon] || ICONS.globe}
        </a>
      `).join("");
    }
  }

  renderAbout(about, profile) {
    const aboutIntro = document.getElementById("aboutIntroduction");
    if (aboutIntro) aboutIntro.textContent = about.introduction || "";

    const aboutInterests = document.getElementById("aboutInterests");
    if (aboutInterests) aboutInterests.textContent = about.interests || "";

    const aboutGoals = document.getElementById("aboutGoals");
    if (aboutGoals) aboutGoals.textContent = about.goals || "";

    const aboutJourney = document.getElementById("aboutJourney");
    if (aboutJourney) aboutJourney.textContent = about.journey || "";

    const aboutAmbitions = document.getElementById("aboutAmbitions");
    if (aboutAmbitions) aboutAmbitions.textContent = about.ambitions || "";

    // Stats
    const expYears = document.getElementById("statExpYears");
    if (expYears) expYears.textContent = profile.experienceYears || "3+";

    const compProjects = document.getElementById("statCompletedProjects");
    if (compProjects) compProjects.textContent = profile.completedProjects || "15+";

    const happyClients = document.getElementById("statHappyClients");
    if (happyClients) happyClients.textContent = profile.happyClients || "100%";
  }

  renderSkills(skills) {
    const container = document.getElementById("skillsGridContainer");
    if (!container) return;

    container.innerHTML = skills.map(skill => {
      const iconSvg = ICONS[skill.icon] || ICONS.code;
      return `
        <div class="glass-card skill-card">
          <div>
            <div class="skill-header">
              <div class="skill-icon-name">
                <div class="skill-icon-box">${iconSvg}</div>
                <div>
                  <h4 class="skill-name">${skill.name}</h4>
                  <span class="skill-category">${skill.category}</span>
                </div>
              </div>
              <span class="skill-percent-badge">${skill.level}%</span>
            </div>
            <p class="skill-description">${skill.description || ""}</p>
          </div>
          <div>
            <div class="skill-progress-track">
              <div class="skill-progress-fill" style="width: ${skill.level}%"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderProjects(projects) {
    const filterContainer = document.getElementById("projectsFilterContainer");
    const gridContainer = document.getElementById("projectsGridContainer");
    if (!gridContainer) return;

    // Build unique categories
    const categories = ["All", ...new Set(projects.map(p => p.category))];

    if (filterContainer) {
      filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === this.activeFilter ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join("");

      filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          this.activeFilter = e.target.dataset.category;
          this.renderProjects(this.store.getProjects());
        });
      });
    }

    const filtered = this.activeFilter === "All"
      ? projects
      : projects.filter(p => p.category === this.activeFilter);

    gridContainer.innerHTML = filtered.map(p => `
      <div class="glass-card project-card">
        <div class="project-thumb-wrapper">
          <img src="${p.image}" alt="${p.title}" class="project-thumb" loading="lazy" />
          <span class="project-category-tag">${p.category}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">
            ${(p.technologies || []).map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <div class="project-actions">
            ${p.liveDemo && p.liveDemo !== "#" ? `
              <a href="${p.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                Live Demo ${ICONS.externalLink}
              </a>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="window.portfolioApp.showToast('Live Demo available on request / deployment', 'info')">
                Live Demo ${ICONS.externalLink}
              </button>
            `}
            <a href="${p.sourceCode || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">
              ${ICONS.github} Source Code
            </a>
          </div>
        </div>
      </div>
    `).join("");
  }

  renderServices(services) {
    const container = document.getElementById("servicesGridContainer");
    if (!container) return;

    container.innerHTML = services.map(s => {
      const iconSvg = ICONS[s.icon] || ICONS.sparkles;
      return `
        <div class="glass-card service-card">
          <div class="service-icon-box">${iconSvg}</div>
          <h3 class="service-title">${s.title}</h3>
          <p class="service-desc">${s.description}</p>
          <ul class="service-features">
            ${(s.features || []).map(f => `
              <li class="service-feature-item">
                ${ICONS.check}
                <span>${f}</span>
              </li>
            `).join("")}
          </ul>
          <a href="#contact" class="btn btn-glass btn-sm" onclick="window.portfolioApp.prefillSubject('${s.title}')">
            Inquire About ${s.title} ${ICONS.arrowRight}
          </a>
        </div>
      `;
    }).join("");
  }

  prefillSubject(serviceName) {
    const subjectInput = document.getElementById("contactSubject");
    if (subjectInput) {
      subjectInput.value = `Inquiry regarding ${serviceName}`;
      subjectInput.focus();
    }
  }

  renderContactInfo(profile) {
    const emailEl = document.getElementById("contactInfoEmail");
    if (emailEl) {
      emailEl.textContent = profile.email || "contact@rakibhasan.dev";
      emailEl.href = `mailto:${profile.email || 'contact@rakibhasan.dev'}`;
    }

    const locEl = document.getElementById("contactInfoLocation");
    if (locEl) locEl.textContent = profile.location || "Bangladesh (Available Worldwide)";

    const statusEl = document.getElementById("contactInfoStatus");
    if (statusEl) statusEl.textContent = profile.statusBadge || "Available for Projects";
  }

  renderFooter(profile, socialLinks) {
    const footerName = document.getElementById("footerName");
    if (footerName) footerName.textContent = profile.name || "Md Rakib Hasan";

    const footerSocials = document.getElementById("footerSocials");
    if (footerSocials && socialLinks) {
      footerSocials.innerHTML = socialLinks.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-pill" title="${s.platform}">
          ${ICONS[s.icon] || ICONS.globe}
        </a>
      `).join("");
    }

    const footerYear = document.getElementById("footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  handleContactSubmit(form) {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      this.showToast("Please fill in all required fields.", "error");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      this.store.addMessage({ name, email, subject, message });
      this.showToast("Thank you, " + name + "! Your message has been sent and saved.", "success");
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 600);
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
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
      <span style="font-size: 1.2rem;">${type === "success" ? "✓" : "ℹ"}</span>
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

document.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new PortfolioApp();
});

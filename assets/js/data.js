/**
 * MD RAKIB HASAN - PERSONAL PORTFOLIO
 * Production Data & Configurations
 */

const defaultPortfolioData = {
  profile: {
    name: "Md Rakib Hasan",
    brandLogo: "RAKIB.",
    tagline: "Welcome to My Personal Portfolio",
    headline: "Web Developer & Creative Digital Creator",
    summary: "",
    avatar: "assets/images/profile.jpg",
    avatarType: "local",
    statusBadge: "Available for Projects",
    location: "Bangladesh",
    email: "contact@rakibhasan.dev",
    phone: "",
    experienceYears: "",
    completedProjects: "",
    happyClients: "",
    cvUrl: "#"
  },
  
  about: {
    introduction: "",
    interests: "",
    goals: "",
    journey: "",
    ambitions: ""
  },

  skills: [],
  projects: [],
  services: [],

  socialLinks: [
    {
      id: "soc-1",
      platform: "GitHub",
      url: "https://github.com/rakibhosenroki-star",
      icon: "github",
      label: "rakibhosenroki-star"
    },
    {
      id: "soc-2",
      platform: "LinkedIn",
      url: "https://linkedin.com/",
      icon: "linkedin",
      label: "LinkedIn"
    },
    {
      id: "soc-3",
      platform: "Twitter / X",
      url: "https://twitter.com/",
      icon: "twitter",
      label: "Twitter"
    },
    {
      id: "soc-4",
      platform: "Email",
      url: "mailto:contact@rakibhasan.dev",
      icon: "mail",
      label: "contact@rakibhasan.dev"
    }
  ],

  messages: [],

  settings: {
    theme: "dark",
    adminUsername: "admin",
    adminPasswordHash: "rakib2026",
    githubRepo: "rakibhosenroki-star/rakib",
    githubToken: "",
    enableSoundEffects: false
  }
};

if (typeof window !== "undefined") {
  window.defaultPortfolioData = defaultPortfolioData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = defaultPortfolioData;
}

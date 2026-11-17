/**
 * MD RAKIB HASAN - DATABASE ADAPTER
 * PostgreSQL Connection with resilient fallback
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let pool = null;
let isPgConnected = false;

// Attempt PostgreSQL Connection
try {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/rakib_hasan_portfolio';
  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  pool.on('connect', () => {
    isPgConnected = true;
    console.log('✅ Connected to PostgreSQL database successfully.');
  });

  pool.on('error', (err) => {
    console.warn('⚠️ PostgreSQL connection error:', err.message);
    isPgConnected = false;
  });
} catch (err) {
  console.warn('⚠️ Unable to initialize PostgreSQL pool:', err.message);
}

// In-Memory Fallback Cache for local development without active PostgreSQL server
const memoryStore = {
  profile: {
    name: "Md Rakib Hasan",
    brand_logo: "RAKIB.",
    tagline: "Welcome to My Personal Portfolio",
    headline: "Web Developer & Creative Digital Creator",
    summary: "A passionate and results-driven Web Developer and Creative Digital Creator dedicated to crafting high-performance, elegant, and user-centric digital experiences with modern web technologies.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    status_badge: "Available for Projects & Full-time Opportunities",
    location: "Bangladesh (Available Worldwide)",
    email: "contact@rakibhasan.dev",
    phone: "+880 1XXXXXXXXX",
    experience_years: "3+",
    completed_projects: "15+",
    happy_clients: "100%"
  },
  about: {
    introduction: "Hello! I am Md Rakib Hasan, a dedicated Web Developer and Creative Digital Creator with a deep enthusiasm for building cutting-edge, responsive, and aesthetically refined web applications.",
    interests: "Passionate about modern web technologies, glassmorphism UI/UX design, interactive frontend architectures, API development, and PostgreSQL database optimization.",
    goals: "My primary goal is to continuously hone my craft as a full-stack engineer and deliver top-tier digital products.",
    journey: "My professional journey started with HTML, CSS, JavaScript, progressing to React, Node.js, Express, and PostgreSQL.",
    ambitions: "My future ambitions are centered around architecting scalable, enterprise-grade cloud systems and modern web applications."
  },
  skills: [
    { id: 1, name: "HTML", category: "Frontend", level: 95, icon: "code", description: "Semantic structure & accessibility" },
    { id: 2, name: "CSS", category: "Frontend", level: 92, icon: "layout", description: "Modern CSS3 & Tailwind CSS" },
    { id: 3, name: "JavaScript", category: "Frontend / Logic", level: 88, icon: "fileCode", description: "ES6+, Async, DOM" },
    { id: 4, name: "Web Development", category: "Core Discipline", level: 90, icon: "globe", description: "Responsive architectures & performance" },
    { id: 5, name: "Node.js", category: "Backend", level: 82, icon: "server", description: "Express APIs & server-side runtime" },
    { id: 6, name: "Database Management", category: "Database", level: 80, icon: "database", description: "PostgreSQL & relational data modeling" },
    { id: 7, name: "Creative Design", category: "Design", level: 85, icon: "penTool", description: "Glassmorphism UI/UX & modern aesthetics" }
  ],
  projects: [
    {
      id: 1,
      title: "Md Rakib Hasan Portfolio Platform",
      category: "Full Stack",
      description: "A premium glassmorphic personal portfolio website featuring dark navy and purple gradient theme, dynamic light/dark mode, and a secure functional Admin Dashboard.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL"],
      live_demo: "#",
      source_code: "https://github.com/mdrakibhasan",
      featured: true
    }
  ],
  messages: []
};

/**
 * Universal Query Method
 */
async function query(text, params = []) {
  if (pool) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (err) {
      console.warn('PostgreSQL query error, using resilient fallback:', err.message);
    }
  }
  return { rows: [] };
}

module.exports = {
  query,
  pool,
  memoryStore,
  isPgConnected: () => isPgConnected
};

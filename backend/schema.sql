-- =============================================================================
-- MD RAKIB HASAN - PERSONAL PORTFOLIO DATABASE SCHEMA (PostgreSQL)
-- =============================================================================

-- Drop tables if needed
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS about_details CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users Table (Admin Authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profile Details Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL DEFAULT 'Md Rakib Hasan',
    brand_logo VARCHAR(50) NOT NULL DEFAULT 'RAKIB.',
    tagline VARCHAR(255) DEFAULT 'Welcome to My Personal Portfolio',
    headline VARCHAR(255) DEFAULT 'Web Developer & Creative Digital Creator',
    summary TEXT,
    avatar TEXT,
    avatar_type VARCHAR(20) DEFAULT 'url',
    status_badge VARCHAR(150) DEFAULT 'Available for Projects & Freelance',
    location VARCHAR(150) DEFAULT 'Bangladesh (Available Worldwide)',
    email VARCHAR(150) DEFAULT 'contact@rakibhasan.dev',
    phone VARCHAR(50) DEFAULT '+880 1XXXXXXXXX',
    experience_years VARCHAR(50) DEFAULT '3+',
    completed_projects VARCHAR(50) DEFAULT '15+',
    happy_clients VARCHAR(50) DEFAULT '100%',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. About Details Table (5 Pillars)
CREATE TABLE about_details (
    id SERIAL PRIMARY KEY,
    introduction TEXT NOT NULL,
    interests TEXT NOT NULL,
    goals TEXT NOT NULL,
    journey TEXT NOT NULL,
    ambitions TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Skills Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Frontend',
    level INT NOT NULL CHECK (level >= 0 AND level <= 100),
    icon VARCHAR(50) DEFAULT 'code',
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Full Stack',
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    live_demo TEXT DEFAULT '#',
    source_code TEXT DEFAULT '#',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Services Table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    icon VARCHAR(50) DEFAULT 'sparkles',
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    sort_order INT DEFAULT 0
);

-- 7. Social Links Table
CREATE TABLE social_links (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(50) DEFAULT 'globe',
    label VARCHAR(100)
);

-- 8. Contact Messages Table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- SEED INITIAL DATA FOR MD RAKIB HASAN
-- =============================================================================

-- Seed Profile
INSERT INTO profiles (name, brand_logo, tagline, headline, summary, avatar, status_badge, location, email, phone)
VALUES (
    'Md Rakib Hasan',
    'RAKIB.',
    'Welcome to My Personal Portfolio',
    'Web Developer & Creative Digital Creator',
    'A passionate and results-driven Web Developer and Creative Digital Creator dedicated to crafting high-performance, elegant, and user-centric digital experiences with modern web technologies.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'Available for Projects & Full-time Opportunities',
    'Bangladesh (Available Worldwide)',
    'contact@rakibhasan.dev',
    '+880 1XXXXXXXXX'
);

-- Seed About Details
INSERT INTO about_details (introduction, interests, goals, journey, ambitions)
VALUES (
    'Hello! I am Md Rakib Hasan, a dedicated Web Developer and Creative Digital Creator with a deep enthusiasm for building cutting-edge, responsive, and aesthetically refined web applications. I focus on bridging the gap between innovative visual design and solid, clean engineering.',
    'Passionate about modern web technologies, glassmorphism UI/UX design, interactive frontend architectures, API development, database optimization, and exploring the latest developments in modern JavaScript frameworks and creative web animation.',
    'My primary goal is to continuously hone my craft as a full-stack engineer, deliver top-tier digital products that solve real-world problems for clients and businesses, and contribute meaningful open-source software to the developer community.',
    'My professional journey started with a fascination for how the internet works, which evolved into hands-on web development with HTML, CSS, and JavaScript. Over time, I progressed into modern frontend development with React, backend architecture with Node.js and Express, and structured data persistence with PostgreSQL.',
    'My future ambitions are centered around architecting scalable, enterprise-grade cloud systems, leading innovative web design projects, mastering cutting-edge fullstack ecosystems, and mentoring aspiring developers in the tech ecosystem.'
);

-- Seed Skills (The 7 specific skills requested by the user)
INSERT INTO skills (name, category, level, icon, description, sort_order) VALUES
('HTML', 'Frontend', 95, 'code', 'Semantic HTML5 structure, web accessibility (a11y), SEO-friendly markup, and clean document outlines.', 1),
('CSS', 'Frontend', 92, 'layout', 'Modern CSS3, responsive layouts with Flexbox and CSS Grid, glassmorphism effects, keyframe animations, and Tailwind CSS.', 2),
('JavaScript', 'Frontend / Logic', 88, 'fileCode', 'ES6+ standards, DOM manipulation, asynchronous programming (Promises, Async/Await), modern fetch APIs, and state management.', 3),
('Web Development', 'Core Discipline', 90, 'globe', 'End-to-end web engineering, responsive cross-browser compatibility, web performance optimization, and modular component design.', 4),
('Node.js', 'Backend', 82, 'server', 'Server-side JavaScript runtime, Express.js RESTful API design, middleware integration, authentication handling, and npm packaging.', 5),
('Database Management', 'Database', 80, 'database', 'PostgreSQL relational database design, SQL querying, schema normalization, data relationships, and secure storage.', 6),
('Creative Design', 'Design', 85, 'penTool', 'Modern UI/UX design, glassmorphism visual aesthetics, typography, color harmony, wireframing, and interactive prototyping.', 7);

-- Seed Projects
INSERT INTO projects (title, category, description, image, technologies, live_demo, source_code, featured) VALUES
(
    'Md Rakib Hasan Portfolio Platform',
    'Full Stack',
    'A premium glassmorphic personal portfolio website featuring a dark navy and purple gradient theme, dynamic dark/light mode toggle, animated skill cards, contact message saving, and a secure functional Admin Dashboard for live portfolio management.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    ARRAY['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Glassmorphism'],
    '#',
    'https://github.com/rakibhosenroki-star/rakib',
    true
),
(
    'NovaStore - Modern E-Commerce Storefront',
    'Full Stack',
    'An elegant e-commerce web application featuring high-performance product listings, dynamic category filtering, shopping cart state management, checkout simulation, and a PostgreSQL-backed product inventory API.',
    'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    ARRAY['JavaScript (ES6+)', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    '#',
    'https://github.com/rakibhosenroki-star/rakib',
    true
),
(
    'FlowTask - Interactive Workflow & Task Manager',
    'Frontend',
    'A streamlined productivity web app designed for agile task tracking, featuring drag-and-drop kanban boards, priority tagging, deadline notifications, and persistent local & database sync.',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'Local Storage', 'Responsive UI'],
    '#',
    'https://github.com/rakibhosenroki-star/rakib',
    true
),
(
    'Lumina Studio - Creative Digital Agency Website',
    'Creative',
    'A showcase digital agency landing experience emphasizing glassmorphism UI, smooth scroll animations, interactive 3D card tilt effects, and an optimized responsive customer inquiry pipeline.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    ARRAY['HTML5', 'CSS3 Animations', 'JavaScript', 'Glassmorphism UI'],
    '#',
    'https://github.com/mdrakibhasan',
    false
);

-- Seed Services (The 4 services requested by user)
INSERT INTO services (title, icon, description, features, sort_order) VALUES
(
    'Web Development',
    'code',
    'Building fast, reliable, and secure web applications from scratch using modern best practices, clean modular architecture, and robust coding standards.',
    ARRAY['Custom web application development', 'Clean, maintainable code architecture', 'Full-lifecycle development & testing', 'API integration & backend connections'],
    1
),
(
    'Website Design',
    'layout',
    'Crafting visually striking, modern glassmorphic website interfaces that elevate personal brands and capture user attention with refined elegance.',
    ARRAY['Premium glassmorphism UI design', 'Custom color palettes & typography', 'User-centered UX workflows', 'Interactive prototypes & wireframes'],
    2
),
(
    'Frontend Development',
    'layers',
    'Translating concepts and UI designs into pixel-perfect, responsive, and dynamic web interfaces powered by React and modern JavaScript.',
    ARRAY['100% Mobile & cross-device responsiveness', 'Smooth micro-animations & transitions', 'React component architecture', 'Optimized asset loading & fast speeds'],
    3
),
(
    'Creative Digital Projects',
    'sparkles',
    'Designing bespoke digital solutions, creative promotional assets, interactive web experiences, and tailored digital deliverables.',
    ARRAY['Interactive landing pages', 'Modern digital portfolio solutions', 'Creative UI component libraries', 'Custom technical solutions'],
    4
);

-- Seed Social Links
INSERT INTO social_links (platform, url, icon, label) VALUES
('GitHub', 'https://github.com/rakibhosenroki-star', 'github', 'rakibhosenroki-star'),
('LinkedIn', 'https://linkedin.com/in/mdrakibhasan', 'linkedin', 'mdrakibhasan'),
('Twitter / X', 'https://twitter.com/mdrakibhasan', 'twitter', '@mdrakibhasan'),
('Email', 'mailto:contact@rakibhasan.dev', 'mail', 'contact@rakibhasan.dev');

-- Seed Contact Message
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES
('Alex Morgan', 'alex.morgan@example.com', 'Web Development Collaboration Inquiry', 'Hi Md Rakib Hasan! I really love your glassmorphism portfolio design and would like to discuss collaborating on a modern web development project.', false);

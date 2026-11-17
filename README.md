# Md Rakib Hasan – Personal Portfolio Website

![Md Rakib Hasan Portfolio](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80)

A premium, modern, fully responsive personal portfolio website designed and developed for **Md Rakib Hasan**.

Featuring an ultra-sleek **Glassmorphism UI** with a **Dark Navy + Purple Gradient** primary theme, a crisp **Light Mode** toggle, animated skill cards, interactive project showcase, a functional contact system with database storage, and a secure **Admin Dashboard** for live portfolio management.

---

## 🌟 Key Features

### 1. Website Identity & Branding
- **Name:** Md Rakib Hasan
- **Brand Logo:** `RAKIB.` with glowing gradient accent
- **Website Type:** Premium Personal Portfolio
- **Design System:** Ultra-modern Glassmorphism (`backdrop-filter: blur(16px)`, translucent glass panels, subtle borders)
- **Primary Theme:** Dark Navy (`#060913` / `#0b1120`) + Purple/Indigo/Pink Gradient Mesh
- **Secondary Theme:** Clean Light Mode with high-contrast slate typography and purple glows
- **Responsiveness:** 100% fluid responsive across ultra-wide monitors, desktops, laptops, tablets, and smartphones.

### 2. Homepage / Hero Section
- **Heading:** MD RAKIB HASAN (Bold gradient typography)
- **Tagline:** *"Welcome to My Personal Portfolio"* (pulsing live status badge)
- **Headline:** *Web Developer & Creative Digital Creator*
- **Introduction:** Professional overview emphasizing clean code and refined digital experiences.
- **Interactive CTAs:**
  - *"Explore My Work"* (Gradient glowing button, smooth scrolls to Projects)
  - *"Contact Me"* (Frosted glass button, smooth scrolls to Contact)
- **Social Media Hub:** Direct links to GitHub, LinkedIn, Twitter/X, and Email.
- **Profile Avatar Showcase:** Glowing gradient frame with floating glass badges (*"⚡ 100% Mobile Ready"*, *"🚀 Clean Code & DB"*).

### 3. About Me (5 Core Pillars)
1. **Personal Introduction:** Professional background and engineering philosophy.
2. **My Interests:** Modern web technologies, glassmorphism design, full-stack architecture.
3. **My Goals:** Developing impactful solutions and continuous engineering growth.
4. **My Professional Journey:** Evolution from HTML/CSS/JS fundamentals to modern React, Node.js, and PostgreSQL.
5. **My Future Ambitions:** Enterprise cloud systems, open-source innovation, and mentorship.
- **Live Counters:** 3+ Years Experience, 15+ Completed Solutions, 100% Dedication.

### 4. My Skills (7 Core Animated Capabilities)
Animated glassmorphic skill cards with proficiency meters:
1. **HTML** (95% - Semantic structure, accessibility, SEO optimization)
2. **CSS** (92% - CSS3, Flexbox, CSS Grid, Glassmorphism, Tailwind CSS)
3. **JavaScript** (88% - ES6+, Async/Await, DOM manipulation, clean logic)
4. **Web Development** (90% - Responsive engineering, cross-browser compatibility)
5. **Node.js** (82% - Express.js REST APIs, server architecture, npm)
6. **Database Management** (80% - PostgreSQL, SQL queries, relational schema modeling)
7. **Creative Design** (85% - UI/UX principles, glassmorphism aesthetics, wireframing)

*(All skills and percentages are fully editable via the Admin Dashboard)*

### 5. My Projects Showcase
- Filterable project grid (**All**, **Full Stack**, **Frontend**, **Creative**).
- Project cards featuring preview images, category badges, descriptions, technology stack pills, **Live Demo** buttons, and **Source Code** (GitHub) links.
- Initial projects:
  - *Md Rakib Hasan Portfolio Platform*
  - *NovaStore - Modern E-Commerce Storefront*
  - *FlowTask - Interactive Workflow & Task Manager*
  - *Lumina Studio - Creative Digital Agency Website*
- Easily add, edit, or delete projects through the Admin Dashboard.

### 6. My Services
- **Web Development:** Custom high-speed applications with clean architecture.
- **Website Design:** Premium glassmorphism UI with custom color palettes.
- **Frontend Development:** Pixel-perfect, reactive React frontends.
- **Creative Digital Projects:** Bespoke interactive landing pages and digital solutions.

### 7. Contact Me & Database Storage
- Form fields: Full Name, Email Address, Subject, and Message.
- Real-time client-side validation and instant toast feedback.
- **All inquiries are saved directly into the database** and can be viewed, managed, or replied to in the Admin Dashboard.

### 8. Secure Admin Dashboard
- **Default Credentials:**
  - **Username:** `admin`
  - **Password:** `rakib2026`
- **Features:**
  - Update personal name, headline, tagline, and contact info.
  - Upload a local image file for profile picture (converts to data URL with live preview) or provide an image URL.
  - Edit the 5 About Me pillars.
  - Full CRUD for skills (add, edit percentage/description, delete).
  - Full CRUD for projects (add, edit title/description/tech/demo/image, delete).
  - Social media link manager.
  - Contact Messages Inbox: View received inquiries, mark read/unread, delete, reply via email.
  - Change admin password.
  - Export and Import JSON database backups.
  - Toggle and preview website theme.

---

## 📁 Repository Structure

```
c:\Rakib hasan\
├── index.html               # Instant Standalone Glassmorphic Portfolio & Admin Dashboard (0 install required!)
├── start-preview.bat        # 1-Click Windows Desktop Launcher
├── README.md                # Project Documentation & Architecture
│
├── assets/
│   ├── css/
│   │   └── style.css        # Glassmorphism design system, dark/light CSS variables, animations
│   └── js/
│       ├── data.js          # Default seed data tailored for Md Rakib Hasan
│       ├── store.js         # Reactive persistence engine (LocalStorage, IndexedDB & API sync)
│       ├── app.js           # Main frontend controller, dynamic rendering, contact handler
│       └── admin.js         # Admin dashboard controller, photo uploader, CRUD modals
│
├── backend/                 # Node.js + Express.js + PostgreSQL Backend
│   ├── package.json         # Backend dependencies (express, pg, bcryptjs, jsonwebtoken, etc.)
│   ├── server.js            # Express application entry point
│   ├── schema.sql           # PostgreSQL database schema & seed scripts
│   ├── .env.example         # Environment variables template
│   ├── config/
│   │   └── db.js            # PostgreSQL connection pool with resilient fallback
│   ├── controllers/         # Auth, Profile, Skills, Projects, Messages
│   ├── middleware/          # JWT admin verification middleware
│   └── routes/              # RESTful API endpoints
│
└── frontend/                # React.js + Tailwind CSS Vite Project
    ├── package.json         # React 18, Vite, Lucide icons, Tailwind dependencies
    ├── vite.config.js       # Vite build & proxy config
    ├── tailwind.config.js   # Tailwind custom glassmorphism theme config
    ├── src/
    │   ├── App.jsx          # Root React application component
    │   ├── main.jsx         # Entry point with Theme and Auth providers
    │   ├── index.css        # Tailwind and glass utility layers
    │   ├── components/      # Navbar, Hero, About, Skills, Projects, Services, Contact, Admin
    │   ├── context/         # ThemeContext, AuthContext
    │   └── services/        # API client for Express backend
```

---

## 🚀 Quick Start Guide

### Option 1: Instant Launch (Zero Setup Required)
You can view and use your portfolio right now on any computer without needing Node.js or PostgreSQL installed:
1. Double-click `start-preview.bat` in this folder, **OR**
2. Double-click `index.html` to open it in Chrome, Edge, or Brave.
3. Everything works immediately:
   - Click the **Admin** button in the top right.
   - Enter `admin` / `rakib2026`.
   - Update your profile photo, skills, or projects.
   - Test sending a contact message from the contact form—it will appear in your Admin Inbox!

---

### Option 2: Running the Full-Stack Backend (Node.js + PostgreSQL)
When Node.js is installed on your environment:

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your PostgreSQL database credentials:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/rakib_hasan_portfolio
   JWT_SECRET=your_jwt_secret_key_2026
   ```

3. **Initialize the PostgreSQL Database:**
   ```bash
   psql -U postgres -d rakib_hasan_portfolio -f schema.sql
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   # Server will start on http://localhost:5000
   ```

---

### Option 3: Running the React + Tailwind Frontend
To develop with the React source code:

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Vite development server:**
   ```bash
   npm run dev
   # App will open at http://localhost:5173
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔒 Admin Dashboard Guide

- **How to Open:** Click the **Admin** button with the lock icon in the top navigation bar (or mobile menu).
- **Default Username:** `admin`
- **Default Password:** `rakib2026`
- **Changing Profile Picture:**
  - Go to the **Profile Photo** tab.
  - Choose a local JPG/PNG file from your computer (it is immediately converted to a data URL and updated), or paste any image URL.
- **Exporting Data Backup:**
  - Go to the **Settings & Backup** tab.
  - Click **Export JSON Backup** to save a snapshot of all your portfolio content.

---

## 🎨 Design System & Customization

- **Primary Colors:**
  - Dark Navy Base: `#060913`
  - Indigo Glow: `#6366f1`
  - Purple Glow: `#8b5cf6`
  - Pink Accent: `#ec4899`
- **Glassmorphism CSS:** Located in `assets/css/style.css` and `frontend/src/index.css`.
- **Fonts:** Plus Jakarta Sans & Inter with fallback system fonts.

---

## 👤 Author
**Md Rakib Hasan**
- Website: Md Rakib Hasan Personal Portfolio
- GitHub: [github.com/mdrakibhasan](https://github.com/mdrakibhasan)
- LinkedIn: [linkedin.com/in/mdrakibhasan](https://linkedin.com/in/mdrakibhasan)
- Email: [contact@rakibhasan.dev](mailto:contact@rakibhasan.dev)

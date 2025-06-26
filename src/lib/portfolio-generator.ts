import { DatabaseUser, Project } from '@/types';
import { validateAndFormatUrl } from './url-helper';

export function generatePortfolioHTML(user: DatabaseUser, projects: Project[]): string {
  // Validate and format URLs
  const validatedUser = {
    ...user,
    github_url: validateAndFormatUrl(user.github_url),
    linkedin: validateAndFormatUrl(user.linkedin),
    twitter: validateAndFormatUrl(user.twitter),
    website: validateAndFormatUrl(user.website),
    cv_url: validateAndFormatUrl(user.cv_url),
  };

  // Log for debugging
  console.log('CV URL (original):', user.cv_url);
  console.log('CV URL (validated):', validatedUser.cv_url);

  const socialLinks = [
    { platform: 'GitHub', url: validatedUser.github_url || `https://github.com/${user.github_username}`, icon: '🐙' },
    { platform: 'LinkedIn', url: validatedUser.linkedin, icon: '💼' },
    { platform: 'Twitter', url: validatedUser.twitter, icon: '🐦' },
    { platform: 'Website', url: validatedUser.website, icon: '🌐' }
  ].filter(link => link.url && link.url.trim() !== '');

  const skillsList = user.skills && user.skills.length > 0 
    ? user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('\n            ')
    : '<p class="text-muted">No skills listed</p>';

  const projectsList = projects.length > 0 
    ? projects.map(project => `
      <div class="project-card">
        ${project.image_url ? `<img src="${project.image_url}" alt="${project.title}" class="project-image">` : ''}
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${project.technologies && project.technologies.length > 0 ? `
            <div class="tech-tags">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join(' ')}
            </div>
          ` : ''}
          <div class="project-links">
            ${project.url ? `<a href="${project.url}" target="_blank" class="btn btn-outline">View Project</a>` : ''}
            ${project.demo_link ? `<a href="${project.demo_link}" target="_blank" class="btn btn-primary">Live Demo</a>` : ''}
          </div>
        </div>
      </div>
    `).join('\n        ')
    : '<p class="text-muted">No projects available</p>';

  const socialLinksList = socialLinks.length > 0 
    ? socialLinks.map(social => `
      <a href="${social.url}" target="_blank" class="social-link" title="${social.platform}">
        <span class="social-icon">${social.icon}</span>
        <span class="social-text">${social.platform}</span>
      </a>
    `).join('\n            ')
    : '';

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - Portfolio</title>
    <meta name="description" content="${user.bio || `Portfolio of ${user.name}`}">
    <meta name="author" content="${user.name}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${user.github_username}.github.io/">
    <meta property="og:title" content="${user.name} - Portfolio">
    <meta property="og:description" content="${user.bio || `Portfolio of ${user.name}`}">
    ${user.avatar_url ? `<meta property="og:image" content="${user.avatar_url}">` : ''}
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://${user.github_username}.github.io/">
    <meta property="twitter:title" content="${user.name} - Portfolio">
    <meta property="twitter:description" content="${user.bio || `Portfolio of ${user.name}`}">
    ${user.avatar_url ? `<meta property="twitter:image" content="${user.avatar_url}">` : ''}
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html {
            color-scheme: light !important;
        }
        
        :root {
            /* Force Light theme colors */
            --primary-color: #4299e1;
            --primary-dark: #3182ce;
            --text-primary: #2d3748;       /* Dark text for light theme */
            --text-secondary: #4a5568;     /* Secondary text color */
            --text-muted: #718096;         /* Muted text for light theme */
            --bg-primary: #ffffff;         /* White background */
            --bg-secondary: #f7fafc;       /* Light background for sections */
            --bg-card: #ffffff;            /* Card backgrounds - white */
            --border-color: #e2e8f0;       /* Light border color */
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
            --border-radius: 0.5rem;
            --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Dark mode class */
        .dark-mode {
            --primary-color: #4299e1;
            --primary-dark: #3182ce;
            --text-primary: #ffffff;
            --text-secondary: #e2e8f0;
            --text-muted: #a0aec0;
            --bg-primary: #2d3748;
            --bg-secondary: #4a5568;
            --bg-card: #4a5568;
            --border-color: #718096;
        }
        
        /* Override system preferences */
        @media (prefers-color-scheme: dark) {
            html:not(.dark-mode) {
                color-scheme: light !important;
            }
        }
        
        body {
            font-family: var(--font-family);
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            min-height: 100vh;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Header */
        .header {
            background: var(--bg-primary);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
            font-size: 1.125rem;
            text-decoration: none;
            color: var(--primary-color);
            transition: all 0.2s ease;
        }
        
        .logo:hover {
            transform: translateY(-1px);
            text-shadow: 0 1px 2px rgba(66, 153, 225, 0.3);
        }
        
        .logo img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--primary-color);
            box-shadow: 0 0 10px rgba(66, 153, 225, 0.3);
        }
        
        .nav {
            display: flex;
            gap: 2rem;
        }
        
        .theme-toggle {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: 1rem;
            transition: all 0.2s;
        }
        
        .theme-toggle:hover {
            background-color: rgba(66, 153, 225, 0.1);
            color: var(--primary-color);
            transform: rotate(30deg);
        }
        
        .nav a {
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 500;
            transition: all 0.2s;
            position: relative;
            padding: 0.25rem 0;
        }
        
        .nav a:hover {
            color: var(--primary-color);
        }
        
        .nav a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--primary-color);
            transition: width 0.3s;
        }
        
        .nav a:hover::after {
            width: 100%;
        }
        
        /* Hero Section */
        .hero {
            padding: 4rem 0;
            background: var(--bg-secondary);
            position: relative;
            overflow: hidden;
        }
        
        .hero-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .hero-text h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.2;
            color: var(--text-primary);
            position: relative;
            display: inline-block;
        }
        
        .hero-text h1::after {
            content: '';
            position: absolute;
            bottom: -0.25rem;
            left: 0;
            width: 2.5rem;
            height: 0.25rem;
            background-color: var(--primary-color);
            border-radius: 4px;
        }
        
        .hero-text .subtitle {
            font-size: 1.125rem;
            color: var(--primary-color);
            font-weight: 500;
            margin-bottom: 0.5rem;
            text-transform: uppercase; /* Change to uppercase for "TECHNOLOGY" */
            letter-spacing: 0.5px;
        }
        
        .hero-text .bio {
            font-size: 1.125rem;
            color: var(--text-secondary);
            margin-bottom: 2rem;
            line-height: 1.7;
            max-width: 600px;
        }
        
        .hero-image {
            text-align: center;
        }
        
        .hero-image img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--primary-color);
            box-shadow: var(--shadow-lg);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .hero-image img:hover {
            transform: scale(1.03);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-size: 0.875rem;
            letter-spacing: 0.025em;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            color: white;
            box-shadow: 0 4px 6px rgba(66, 153, 225, 0.25);
        }
        
        .btn-primary:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 10px rgba(66, 153, 225, 0.3);
        }
        
        .btn-outline {
            background-color: transparent;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
            box-shadow: 0 2px 4px rgba(66, 153, 225, 0.15);
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .btn-outline:hover {
            background-color: rgba(66, 153, 225, 0.1);
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(66, 153, 225, 0.2);
        }
        
        .hero-buttons {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Social Links */
        .social-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 1rem;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .social-link {
            display: flex !important;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.2rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            text-decoration: none;
            color: var(--text-secondary);
            transition: all 0.3s;
            box-shadow: var(--shadow);
            font-weight: 500;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .social-link:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        }
        
        .social-icon {
            font-size: 1.5rem;
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Main Content */
        .main {
            padding: 4rem 0;
            background: var(--bg-primary);
        }
        
        .section {
            margin-bottom: 4rem;
        }
        
        .section-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 2rem;
            text-align: center;
            color: var(--text-primary);
            position: relative;
            padding-bottom: 0.75rem;
        }
        
        .section-title::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background-color: var(--primary-color);
            border-radius: 3px;
        }
        
        /* About Section */
        .about-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .info-card {
            background: var(--bg-card);
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow);
            text-align: center;
            border: 1px solid var(--border-color);
            transition: all 0.3s;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            border-color: var(--primary-color);
        }
        
        .info-card h3 {
            margin-bottom: 1rem;
            color: var(--primary-color);
            font-weight: 600;
            font-size: 1.25rem;
        }
        
        .info-card .icon {
            font-size: 2rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4rem;
            height: 4rem;
            background: rgba(66, 153, 225, 0.1);
            border-radius: 50%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 2px solid rgba(66, 153, 225, 0.3);
            transition: all 0.3s;
        }
        
        .info-card:hover .icon {
            transform: scale(1.1);
            background: rgba(66, 153, 225, 0.2);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        /* Skills Section */
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
            padding: 1rem;
        }
        
        .skill-tag {
            padding: 0.5rem 1.25rem;
            background: var(--primary-color);
            color: white;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            box-shadow: 0 2px 5px rgba(66, 153, 225, 0.2);
            margin: 0.25rem;
            transition: all 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .skill-tag:hover {
            background: var(--primary-dark);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 4px 10px rgba(66, 153, 225, 0.4);
        }
        
        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .project-card {
            background: var(--bg-card);
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: var(--shadow);
            border: 1px solid var(--border-color);
            transition: all 0.3s;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
            border-color: var(--primary-color);
        }
        
        .project-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .project-content {
            padding: 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        
        .project-content h3 {
            margin-bottom: 0.75rem;
            color: var(--text-primary);
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .project-content p {
            color: var(--text-secondary);
            margin-bottom: 1.25rem;
            line-height: 1.6;
            flex-grow: 1;
        }
        
        /* Tech tags */
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
        }
        
        .tech-tag {
            padding: 0.25rem 0.75rem;
            background: rgba(66, 153, 225, 0.1);
            color: var(--primary-color);
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            border: 1px solid rgba(66, 153, 225, 0.2);
            transition: all 0.2s;
            white-space: nowrap;
        }
        
        .tech-tag:hover {
            background: rgba(66, 153, 225, 0.25);
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .project-links {
            display: flex;
            gap: 0.75rem;
        }
        
        /* Contact Section */
        .contact-card {
            background: var(--bg-card);
            padding: 3rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            text-align: center;
            border: 1px solid var(--border-color);
            max-width: 600px;
            margin: 0 auto;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .contact-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .contact-info {
            margin: 2rem 0;
        }
        
        .contact-info p {
            margin-bottom: 0.75rem;
            color: var(--text-secondary);
        }
        
        .contact-info a {
            color: var(--primary-color);
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .contact-info a:hover {
            text-decoration: underline;
        }
        
        /* Footer */
        .footer {
            background: var(--bg-secondary);
            padding: 2rem 0;
            border-top: 1px solid var(--border-color);
            text-align: center;
            color: var(--text-muted);
            box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.03);
        }
        
        .footer p {
            margin-bottom: 0.5rem;
        }
        
        .footer a {
            color: var(--primary-color);
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 0 1rem;
            }
            
            .header-content {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
            
            .nav {
                justify-content: center;
            }
            
            .hero-content {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 2rem;
            }
            
            .hero-text h1 {
                font-size: 2rem;
            }
            
            .hero-buttons {
                justify-content: center;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
            
            .about-grid {
                grid-template-columns: 1fr;
            }
        }
        
        /* Utility Classes */
        .text-center { text-align: center; }
        .text-muted { color: var(--text-muted); }
        .mb-4 { margin-bottom: 2rem; }
        .mt-4 { margin-top: 2rem; }
        .tech-text { 
            color: var(--primary-color); 
            text-transform: uppercase; 
            font-size: 0.95rem;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        
        /* Dark Mode Class */
        .dark-mode {
            --primary-color: #4299e1;
            --primary-dark: #3182ce;
            --text-primary: #ffffff;
            --text-secondary: #e2e8f0;
            --text-muted: #a0aec0;
            --bg-primary: #2d3748;
            --bg-secondary: #4a5568;
            --bg-card: #4a5568;
            --border-color: #718096;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo">
                    ${user.avatar_url ? `<img src="${user.avatar_url}" alt="${user.name}">` : ''}
                    <span>${user.name}</span>
                </a>
                <nav class="nav">
                    <a href="#about">About</a>
                    ${projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
                    ${user.skills && user.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
                    <a href="#contact">Contact</a>
                </nav>
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                    </svg>
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                   
                    <h1>${user.name}</h1>
                    ${user.bio ? `<p class="bio">${user.bio}</p>` : ''}
                    <div class="hero-buttons">
                        <a href="#contact" class="btn btn-primary">Get In Touch</a>
                        ${validatedUser.cv_url ? `<a href="${validatedUser.cv_url}" target="_blank" class="btn btn-outline" rel="noopener noreferrer">Download CV</a>` : ''}
                    </div>
                    ${socialLinksList ? `
                    <div class="social-links">
                        ${socialLinksList}
                    </div>
                    ` : ''}
                </div>
                ${user.avatar_url ? `
                <div class="hero-image">
                    <img src="${user.avatar_url}" alt="${user.name}">
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- About Section -->
            <section id="about" class="section">
                <h2 class="section-title">About Me</h2>
                <div class="about-grid">
                    ${user.experience ? `
                    <div class="info-card">
                        <div class="icon">💼</div>
                        <h3>Experience</h3>
                        <p>${user.experience}</p>
                    </div>
                    ` : ''}
                    ${user.education ? `
                    <div class="info-card">
                        <div class="icon">🎓</div>
                        <h3>Education</h3>
                        <p>${user.education}</p>
                    </div>
                    ` : ''}
                    <div class="info-card">
                        <div class="icon">⚡</div>
                        <h3>Specialization</h3>
                        <p class="tech-text">${user.field_of_work || 'Web Development'}</p>
                    </div>
                    ${user.location ? `
                    <div class="info-card">
                        <div class="icon">📍</div>
                        <h3>Location</h3>
                        <p>${user.location}</p>
                    </div>
                    ` : ''}
                </div>
            </section>

            ${user.skills && user.skills.length > 0 ? `
            <!-- Skills Section -->
            <section id="skills" class="section">
                <h2 class="section-title">Skills & Technologies</h2>
                <div class="skills-container">
                    ${skillsList}
                </div>
            </section>
            ` : ''}

            ${projects.length > 0 ? `
            <!-- Projects Section -->
            <section id="projects" class="section">
                <h2 class="section-title">Featured Projects</h2>
                <div class="projects-grid">
                    ${projectsList}
                </div>
            </section>
            ` : ''}

            <!-- Contact Section -->
            <section id="contact" class="section">
                <h2 class="section-title">Get In Touch</h2>
                <div class="contact-card">
                    <h3>Let's work together!</h3>
                    <p>I'm always open to discussing new opportunities and interesting projects.</p>
                    <div class="contact-info">
                        ${user.email ? `<p>Email: <a href="mailto:${user.email}">${user.email}</a></p>` : ''}
                        ${user.phone ? `<p>Phone: <a href="tel:${user.phone}">${user.phone}</a></p>` : ''}
                        ${user.location ? `<p>Location: ${user.location}</p>` : ''}
                        ${validatedUser.cv_url ? `<p>CV: <a href="${validatedUser.cv_url}" target="_blank" rel="noopener noreferrer">Download CV</a></p>` : ''}
                    </div>
                    ${user.email ? `<a href="mailto:${user.email}" class="btn btn-primary">Send Message</a>` : ''}
                </div>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${user.name}. All rights reserved.</p>
            <p>Built with <span style="color: var(--primary-color);">❤️</span> using <a href="https://portfoliomaker.dev" target="_blank">Portfolio Maker</a></p>
        </div>
    </footer>

    <!-- Smooth scrolling script -->
    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Hero section should be visible immediately
        document.querySelector('.hero').style.opacity = '1';
        document.querySelector('.hero').style.transform = 'translateY(0)';
        
        <!-- Theme toggle script -->
    <script>
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        if (themeToggle) {
            // Force light theme initially
            html.classList.remove('dark-mode');
            
            themeToggle.addEventListener('click', function() {
                html.classList.toggle('dark-mode');
                localStorage.setItem('dark-mode', html.classList.contains('dark-mode'));
            });
            
            // Check for saved theme preference
            if (localStorage.getItem('dark-mode') === 'true') {
                html.classList.add('dark-mode');
            } else {
                html.classList.remove('dark-mode');
            }
        }
    </script>
</body>
</html>`;
}

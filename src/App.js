import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      console.warn('localStorage unavailable or corrupted, defaulting to light mode:', e);
      // Clear corrupted data if possible
      try {
        localStorage.removeItem('darkMode');
      } catch (clearError) {
        // Silently fail if we can't clear
      }
      return false;
    }
  });

  const roles = [
    'Senior Software Engineer',
    'Java Expert',
    'Microservices Specialist',
    'Backend Developer',
    'Problem Solver'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (e) {
      console.warn('localStorage unavailable, theme will not persist:', e);
    }
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-brand">SS</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#certifications">Certifications</a>
          <a href="#services">Services</a>
          <a href="#tutoring">Tutoring</a>
          <a href="#mobile-apps">Mobile Apps</a>
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <header className="App-header" role="banner">
        <img 
          src={process.env.PUBLIC_URL + '/profile.png'} 
          alt="Sanghapal Salave - Senior Software Engineer specializing in Java, Spring Boot, and Microservices" 
          className="profile-photo"
          width="200"
          height="200"
          loading="eager"
        />
        <h1>Hi, I'm Sanghapal Salave</h1>
        <p className="title">
          <span className="typing-text">{displayText}</span>
          <span className="cursor">|</span>
        </p>
        <p className="subtitle">7+ Years of Experience | Java | Spring Boot | Microservices | GCP</p>
        <div className="links">
          <a 
            href="https://github.com/sanghapalsalave" 
            target="_blank" 
            rel="noopener noreferrer"
            className="App-link"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/sanghapal-salave-26241593" 
            target="_blank" 
            rel="noopener noreferrer"
            className="App-link"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:salave.sanghapal@gmail.com"
            className="App-link"
          >
            Contact
          </a>
          <a 
            href={process.env.PUBLIC_URL + '/resume.pdf'}
            download="Sanghapal_Salave_Resume.pdf"
            className="App-link resume-btn"
          >
            📄 Download Resume
          </a>
        </div>
      </header>
      
      <main role="main">
        <section className="about animate-section" id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About Me</h2>
        <p>
          I'm a Senior Software Engineer based in Pune, Maharashtra, India with over 7 years 
          of experience in backend and enterprise-grade technologies. Currently working at 
          Globant, I specialize in building scalable microservices and cloud-native applications.
        </p>
        <p>
          I'm a Google Cloud Certified Professional Cloud Architect and Associate Cloud Engineer, 
          passionate about designing robust solutions using Java, Spring Boot, Docker, and Kubernetes. 
          I thrive on solving complex problems and delivering high-performance systems.
        </p>
      </section>

      <section className="experience animate-section" id="experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Work Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Senior Software Engineer</h3>
              <h4>Globant</h4>
              <span className="timeline-date">Sep 2021 - Present · 4 yrs 5 mos</span>
              <p>Pune, Maharashtra, India</p>
              <div className="timeline-skills">
                <span>Spring Boot</span>
                <span>Core Java</span>
                <span>Docker</span>
                <span>Kubernetes</span>
                <span>Microservices</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Technology Analyst</h3>
              <h4>Infosys</h4>
              <span className="timeline-date">May 2021 - Sep 2021 · 5 mos</span>
              <p>Pune, Maharashtra, India</p>
              <div className="timeline-skills">
                <span>Apache Kafka</span>
                <span>Spring Boot</span>
                <span>Microservices</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Senior System Engineer</h3>
              <h4>Infosys</h4>
              <span className="timeline-date">Feb 2019 - May 2021 · 2 yrs 4 mos</span>
              <p>Pune, Maharashtra, India</p>
              <p className="timeline-desc">Developed applications and APIs using microservices, Spring Boot, Kafka, Jenkins, and Postman.</p>
              <div className="timeline-skills">
                <span>Apache Kafka</span>
                <span>Spring Boot</span>
                <span>Jenkins</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Software Engineer</h3>
              <h4>SmartLeaven Technologies</h4>
              <span className="timeline-date">Sep 2017 - Feb 2019 · 1 yr 6 mos</span>
              <p>Pune, Maharashtra, India</p>
              <div className="timeline-skills">
                <span>JavaScript</span>
                <span>MySQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills animate-section" id="skills" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        
        <div className="skills-container">
          <div className="skills-category">
            <h3>Backend & Languages</h3>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Java</span>
                <span>95%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '95%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Spring Boot</span>
                <span>90%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Microservices</span>
                <span>85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>REST APIs</span>
                <span>90%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>

          <div className="skills-category">
            <h3>DevOps & Cloud</h3>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Docker</span>
                <span>80%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Kubernetes</span>
                <span>75%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Jenkins</span>
                <span>80%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Apache Kafka</span>
                <span>75%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>

          <div className="skills-category">
            <h3>Frontend & Database</h3>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>React.js</span>
                <span>70%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '70%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>JavaScript</span>
                <span>75%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>MySQL</span>
                <span>85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Git</span>
                <span>85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects animate-section" id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <span className="project-badge">Globant</span>
            <h3>Oceana & Analytics</h3>
            <span className="project-date">Jun 2023 - Sep 2024</span>
            <p>
              Worked on the Oceana platform, integrating omnichannel customer engagement 
              features and developing back-end services using Java, Spring Boot, Docker, 
              and Kubernetes. Enhanced Analytics capabilities to track customer interactions 
              and provide actionable insights.
            </p>
            <div className="project-tech">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>Docker</span>
              <span>Kubernetes</span>
            </div>
          </div>
          
          <div className="project-card">
            <span className="project-badge">Globant</span>
            <h3>SEMOSS</h3>
            <span className="project-date">Oct 2021 - May 2023</span>
            <p>
              Worked on SEMOSS, an open-source analytics tool for a Deloitte client. 
              Designed and implemented back-end solutions using Java and Spring Boot. 
              Developed data visualization, analytics, and reporting capabilities enabling 
              clients to integrate and analyze data from multiple sources.
            </p>
            <div className="project-tech">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>Data Analytics</span>
            </div>
          </div>
        </div>
      </section>

      <section className="education animate-section" id="education" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <div className="education-grid">
          <div className="education-card">
            <h3>CDAC Pune</h3>
            <p className="degree">PG-DASDM, Computer Science</p>
            <span className="education-year">2015 - 2016</span>
          </div>
          <div className="education-card">
            <h3>Sinhgad Institute of Technology</h3>
            <p className="degree">Bachelor of Engineering (BE), Computer Engineering</p>
            <span className="education-year">2012 - 2015</span>
          </div>
        </div>
      </section>

      <section className="certifications animate-section" id="certifications" aria-labelledby="certifications-heading">
        <h2 id="certifications-heading">Certifications</h2>
        <div className="cert-grid">
          <div className="cert-card">
            <div className="cert-icon">☁️</div>
            <h3>Google Cloud Certified Professional Cloud Architect</h3>
            <p>Google</p>
            <span className="cert-date">Issued Jan 2023</span>
          </div>
          <div className="cert-card">
            <div className="cert-icon">☁️</div>
            <h3>Associate Cloud Engineer</h3>
            <p>Google</p>
            <span className="cert-date">Issued Dec 2022</span>
          </div>
        </div>
      </section>

      <section className="services animate-section" id="services" aria-labelledby="services-heading">
        <h2 id="services-heading">Freelance Services</h2>
        <div className="services-content">
          <div className="availability-badge">
            <span className="status-indicator">🟢</span>
            <span className="status-text">Open to Work</span>
          </div>
          <p className="services-description">
            I'm available for freelance projects and consulting opportunities. With over 7 years 
            of experience in enterprise software development, I can help you build scalable, 
            high-performance applications tailored to your business needs.
          </p>
          <div className="services-technologies">
            <h3>Technologies I Work With</h3>
            <div className="tech-tags">
              <span>Java</span>
              <span>Python</span>
              <span>Spring Boot</span>
              <span>Microservices</span>
              <span>AWS</span>
              <span>GCP</span>
              <span>React</span>
              <span>JavaScript</span>
              <span>Docker</span>
              <span>Kubernetes</span>
              <span>REST APIs</span>
              <span>MySQL</span>
            </div>
          </div>
          <div className="services-cta">
            <a 
              href="mailto:salave.sanghapal@gmail.com?subject=Project Inquiry" 
              className="cta-button"
            >
              💼 Let's Work Together
            </a>
            <p className="contact-info">
              Email: <a href="mailto:salave.sanghapal@gmail.com">salave.sanghapal@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <section className="tutoring animate-section" id="tutoring" aria-labelledby="tutoring-heading">
        <h2 id="tutoring-heading">Java Tutoring</h2>
        <div className="tutoring-content">
          <div className="tutoring-badge">
            <span className="tutoring-icon">👨‍🏫</span>
            <span className="tutoring-format">One-on-One Learning</span>
          </div>
          <p className="tutoring-description">
            Master Java programming with personalized, one-on-one tutoring sessions. With over 7 years 
            of professional experience in Java and Spring Boot, I offer tailored learning experiences 
            for beginners to advanced developers looking to level up their skills.
          </p>
          <div className="tutoring-expertise">
            <h3>What You'll Learn</h3>
            <div className="expertise-grid">
              <div className="expertise-item">
                <span className="expertise-icon">☕</span>
                <h4>Core Java</h4>
                <p>OOP, Collections, Streams, Multithreading</p>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">🚀</span>
                <h4>Spring Boot</h4>
                <p>REST APIs, Microservices, Security</p>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">🏗️</span>
                <h4>Best Practices</h4>
                <p>Design Patterns, Clean Code, Testing</p>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">💼</span>
                <h4>Real-World Projects</h4>
                <p>Enterprise-grade application development</p>
              </div>
            </div>
          </div>
          <div className="tutoring-details">
            <div className="pricing-info">
              <span className="paid-badge">💰 Paid Service</span>
              <p className="pricing-note">Contact for pricing and availability</p>
            </div>
          </div>
          <div className="tutoring-cta">
            <a 
              href="mailto:salave.sanghapal@gmail.com?subject=Java Tutoring Inquiry" 
              className="cta-button"
            >
              📅 Schedule a Session
            </a>
            <p className="contact-info">
              Email: <a href="mailto:salave.sanghapal@gmail.com">salave.sanghapal@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <section className="mobile-apps animate-section" id="mobile-apps" aria-labelledby="mobile-apps-heading">
        <h2 id="mobile-apps-heading">Mobile Applications</h2>
        <div className="mobile-apps-content">
          <p className="mobile-apps-intro">
            Explore my mobile application projects showcasing cross-platform development 
            expertise and modern mobile technologies.
          </p>
          <div className="apps-grid">
            <div className="app-card">
              <div className="app-header">
                <div className="app-icon">📱</div>
                <div className="app-title-section">
                  <h3>Task Manager Pro</h3>
                  <div className="platform-badges">
                    <span className="platform-badge ios">🍎 iOS</span>
                    <span className="platform-badge android">🤖 Android</span>
                  </div>
                </div>
              </div>
              <p className="app-description">
                A comprehensive task management application with real-time synchronization, 
                collaborative features, and intelligent task prioritization. Built with 
                React Native for seamless cross-platform experience.
              </p>
              <div className="app-screenshots">
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 1</p>
                </div>
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 2</p>
                </div>
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 3</p>
                </div>
              </div>
              <div className="app-tech-stack">
                <h4>Technology Stack</h4>
                <div className="app-tech-tags">
                  <span>React Native</span>
                  <span>TypeScript</span>
                  <span>Redux</span>
                  <span>Firebase</span>
                  <span>REST API</span>
                </div>
              </div>
              <div className="app-links">
                <a href="#mobile-apps" className="app-store-link">
                  <span className="store-icon">🍎</span>
                  <span>App Store</span>
                </a>
                <a href="#mobile-apps" className="app-store-link">
                  <span className="store-icon">🤖</span>
                  <span>Google Play</span>
                </a>
              </div>
            </div>

            <div className="app-card">
              <div className="app-header">
                <div className="app-icon">🏋️</div>
                <div className="app-title-section">
                  <h3>Fitness Tracker</h3>
                  <div className="platform-badges">
                    <span className="platform-badge ios">🍎 iOS</span>
                    <span className="platform-badge android">🤖 Android</span>
                    <span className="platform-badge web">🌐 Web</span>
                  </div>
                </div>
              </div>
              <p className="app-description">
                Track your fitness journey with personalized workout plans, nutrition tracking, 
                and progress analytics. Features integration with wearable devices and social 
                sharing capabilities.
              </p>
              <div className="app-screenshots">
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 1</p>
                </div>
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 2</p>
                </div>
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 3</p>
                </div>
              </div>
              <div className="app-tech-stack">
                <h4>Technology Stack</h4>
                <div className="app-tech-tags">
                  <span>Flutter</span>
                  <span>Dart</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>GraphQL</span>
                </div>
              </div>
              <div className="app-links">
                <a href="#mobile-apps" className="app-store-link">
                  <span className="store-icon">🍎</span>
                  <span>App Store</span>
                </a>
                <a href="#mobile-apps" className="app-store-link">
                  <span className="store-icon">🤖</span>
                  <span>Google Play</span>
                </a>
                <a href="#mobile-apps" className="app-store-link demo">
                  <span className="store-icon">🎬</span>
                  <span>View Demo</span>
                </a>
              </div>
            </div>

            <div className="app-card">
              <div className="app-header">
                <div className="app-icon">💰</div>
                <div className="app-title-section">
                  <h3>Budget Planner</h3>
                  <div className="platform-badges">
                    <span className="platform-badge android">🤖 Android</span>
                  </div>
                </div>
              </div>
              <p className="app-description">
                Smart budget management app with expense tracking, bill reminders, and 
                financial insights. Uses machine learning to provide personalized savings 
                recommendations and spending patterns analysis.
              </p>
              <div className="app-screenshots">
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 1</p>
                </div>
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 2</p>
                </div>
                <div className="screenshot-placeholder">
                  <span>📸</span>
                  <p>Screenshot 3</p>
                </div>
              </div>
              <div className="app-tech-stack">
                <h4>Technology Stack</h4>
                <div className="app-tech-tags">
                  <span>Kotlin</span>
                  <span>Android SDK</span>
                  <span>Room DB</span>
                  <span>Retrofit</span>
                  <span>MVVM</span>
                </div>
              </div>
              <div className="app-links">
                <a href="#mobile-apps" className="app-store-link">
                  <span className="store-icon">🤖</span>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <footer className="App-footer" role="contentinfo">
        <p>&copy; 2026 Sanghapal Salave. All rights reserved.</p>
      </footer>

      {showScrollTop && (
        <button 
          className="scroll-top-btn" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ⬆️
        </button>
      )}
    </div>
  );
}

export default App;

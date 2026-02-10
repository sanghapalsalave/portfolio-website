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
          <a href="#tutoring">Mentorship</a>
          <a href="#testimonials">Contact</a>
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
        <p className="subtitle">8+ Years of Experience | Java | Spring Boot | Microservices | GCP</p>
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
            href="https://wa.me/918087502702" 
            target="_blank" 
            rel="noopener noreferrer"
            className="App-link whatsapp-link"
          >
            📱 WhatsApp
          </a>
          <a 
            href="mailto:salave.sanghapal@gmail.com"
            className="App-link"
          >
            Email
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
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Python</span>
                <span>80%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>FastAPI</span>
                <span>75%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '75%'}}></div>
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
                <span>Supabase</span>
                <span>70%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '70%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>React Native</span>
                <span>65%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '65%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Expo Go</span>
                <span>65%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '65%'}}></div>
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

          <div className="skills-category">
            <h3>Development Practices</h3>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>AI-Assisted Development</span>
                <span>90%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Vibe Coding</span>
                <span>85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-info">
                <span>Bug Fixing & Debugging</span>
                <span>90%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{width: '90%'}}></div>
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
            <span className="status-text">Available for New Projects</span>
          </div>
          <p className="services-description">
            Senior Software Engineer with 8+ years of enterprise experience, now offering freelance services. 
            I bring proven expertise from working with global companies like Globant and Infosys, delivering 
            scalable microservices and cloud-native solutions. Let's build something great together!
          </p>
          
          <div className="services-value-props">
            <div className="value-prop">
              <span className="value-icon">⚡</span>
              <h4>Fast Delivery</h4>
              <p>Efficient development with clean, maintainable code</p>
            </div>
            <div className="value-prop">
              <span className="value-icon">🎯</span>
              <h4>Quality Focused</h4>
              <p>Enterprise-grade solutions with best practices</p>
            </div>
            <div className="value-prop">
              <span className="value-icon">💬</span>
              <h4>Clear Communication</h4>
              <p>Regular updates and transparent collaboration</p>
            </div>
            <div className="value-prop">
              <span className="value-icon">🔒</span>
              <h4>Reliable & Professional</h4>
              <p>8+ years of proven track record</p>
            </div>
          </div>

          <div className="services-technologies">
            <h3>Technologies I Work With</h3>
            <div className="tech-tags">
              <span>Java</span>
              <span>Python</span>
              <span>Spring Boot</span>
              <span>FastAPI</span>
              <span>Microservices</span>
              <span>AWS</span>
              <span>GCP</span>
              <span>React</span>
              <span>React Native</span>
              <span>Expo Go</span>
              <span>JavaScript</span>
              <span>Docker</span>
              <span>Kubernetes</span>
              <span>Supabase</span>
              <span>REST APIs</span>
              <span>MySQL</span>
            </div>
          </div>
          <div className="services-pricing">
            <h3>Investment</h3>
            <div className="pricing-tiers">
              <div className="pricing-tier">
                <span className="tier-label">🇮🇳 For Indian Clients</span>
                <p className="hourly-rate">
                  <span className="rate-amount">₹599/hour</span>
                </p>
              </div>
              <div className="pricing-tier">
                <span className="tier-label">🌍 For International Clients</span>
                <p className="hourly-rate">
                  <span className="rate-amount">$60/hour</span>
                </p>
              </div>
            </div>
            <p className="pricing-note">Competitive rates for senior-level expertise • Flexible packages available</p>
            <p className="pricing-details">
              💡 <strong>First consultation free</strong> - Let's discuss your project needs<br />
              📦 <strong>Project-based pricing available</strong> - Fixed quotes for defined scope<br />
              🎁 <strong>Package discounts</strong> - Save up to 20% on bulk hours
            </p>
          </div>
          <div className="services-cta">
            <a 
              href="https://wa.me/918087502702?text=Hi%20Sanghapal%2C%20I'm%20interested%20in%20discussing%20a%20project" 
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button whatsapp-cta"
            >
              📱 Quick Chat on WhatsApp
            </a>
            <a 
              href="mailto:salave.sanghapal@gmail.com?subject=Project Inquiry" 
              className="cta-button"
            >
              💼 Email for Detailed Discussion
            </a>
            <p className="contact-info">
              WhatsApp: <a href="https://wa.me/918087502702" target="_blank" rel="noopener noreferrer">+91 8087502702</a><br />
              Email: <a href="mailto:salave.sanghapal@gmail.com">salave.sanghapal@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <section className="tutoring animate-section" id="tutoring" aria-labelledby="tutoring-heading">
        <h2 id="tutoring-heading">Java Programming Mentorship</h2>
        <div className="tutoring-content">
          <div className="tutoring-badge">
            <span className="tutoring-icon">👨‍🏫</span>
            <span className="tutoring-format">Personalized 1-on-1 Sessions</span>
          </div>
          <p className="tutoring-description">
            Learn Java from a senior engineer with 8+ years of production experience. Whether you're 
            starting your programming journey or advancing your skills, I offer personalized mentorship 
            tailored to your goals. Real-world insights from enterprise projects at Globant and Infosys.
          </p>
          <div className="tutoring-expertise">
            <h3>What You'll Master</h3>
            <div className="expertise-grid">
              <div className="expertise-item">
                <span className="expertise-icon">☕</span>
                <h4>Core Java Fundamentals</h4>
                <p>OOP, Collections, Streams, Exception Handling, Multithreading</p>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">🚀</span>
                <h4>Spring Boot & Microservices</h4>
                <p>REST APIs, Spring Security, JPA, Microservices Architecture</p>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">🏗️</span>
                <h4>Industry Best Practices</h4>
                <p>Design Patterns, Clean Code, Testing, Code Reviews</p>
              </div>
              <div className="expertise-item">
                <span className="expertise-icon">💼</span>
                <h4>Career Guidance</h4>
                <p>Interview prep, Resume tips, Real-world project guidance</p>
              </div>
            </div>
          </div>
          
          <div className="tutoring-benefits">
            <h3>Why Learn With Me?</h3>
            <ul>
              <li>✅ <strong>Real Production Experience:</strong> Learn from actual enterprise projects</li>
              <li>✅ <strong>Flexible Scheduling:</strong> Sessions that fit your timezone and schedule</li>
              <li>✅ <strong>Practical Approach:</strong> Hands-on coding, not just theory</li>
              <li>✅ <strong>Career Support:</strong> Interview preparation and job search guidance</li>
              <li>✅ <strong>Ongoing Support:</strong> Questions answered between sessions</li>
            </ul>
          </div>

          <div className="tutoring-details">
            <div className="pricing-info">
              <span className="paid-badge">💰 Professional Mentorship</span>
              <div className="pricing-tiers">
                <div className="pricing-tier">
                  <span className="tier-label">🇮🇳 For Indian Students</span>
                  <p className="pricing-rate">
                    <span className="rate-amount">₹99/hour</span>
                  </p>
                </div>
                <div className="pricing-tier">
                  <span className="tier-label">🌍 For International Students</span>
                  <p className="pricing-rate">
                    <span className="rate-amount">$45/hour</span>
                  </p>
                </div>
              </div>
              <p className="pricing-note">
                <strong>🎁 First session FREE (30 min)</strong> - Let's discuss your learning goals<br />
                📦 Package discounts available - Save up to 25% on multiple sessions<br />
                💬 Email support between sessions included
              </p>
            </div>
          </div>
          <div className="tutoring-cta">
            <a 
              href="https://wa.me/918087502702?text=Hi%20Sanghapal%2C%20I'm%20interested%20in%20Java%20mentorship.%20Can%20we%20schedule%20a%20free%20intro%20session%3F" 
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button whatsapp-cta"
            >
              📱 Book Free Intro Session
            </a>
            <a 
              href="mailto:salave.sanghapal@gmail.com?subject=Java Mentorship Inquiry" 
              className="cta-button"
            >
              📅 Email to Schedule
            </a>
            <p className="contact-info">
              WhatsApp: <a href="https://wa.me/918087502702" target="_blank" rel="noopener noreferrer">+91 8087502702</a><br />
              Email: <a href="mailto:salave.sanghapal@gmail.com">salave.sanghapal@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials animate-section" id="testimonials" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading">Let's Build Your Next Project</h2>
        <div className="testimonials-content">
          <p className="testimonials-intro">
            Ready to start your project? I'm here to help bring your ideas to life with clean, 
            scalable code and professional service. Let's discuss how we can work together.
          </p>
          
          <div className="work-process">
            <h3>How We'll Work Together</h3>
            <div className="process-steps">
              <div className="process-step">
                <span className="step-number">1</span>
                <h4>Free Consultation</h4>
                <p>We'll discuss your project requirements, timeline, and goals</p>
              </div>
              <div className="process-step">
                <span className="step-number">2</span>
                <h4>Proposal & Quote</h4>
                <p>I'll provide a detailed proposal with timeline and fixed/hourly pricing</p>
              </div>
              <div className="process-step">
                <span className="step-number">3</span>
                <h4>Development</h4>
                <p>Regular updates, clean code, and transparent communication throughout</p>
              </div>
              <div className="process-step">
                <span className="step-number">4</span>
                <h4>Delivery & Support</h4>
                <p>Thorough testing, documentation, and post-launch support</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to Get Started?</h3>
            <p>Let's turn your vision into reality. Contact me today for a free consultation.</p>
            <div className="cta-buttons">
              <a 
                href="https://wa.me/918087502702?text=Hi%20Sanghapal%2C%20I'd%20like%20to%20discuss%20a%20project" 
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button whatsapp-cta primary"
              >
                📱 WhatsApp Me Now
              </a>
              <a 
                href="mailto:salave.sanghapal@gmail.com?subject=Project Discussion" 
                className="cta-button secondary"
              >
                📧 Send Email
              </a>
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

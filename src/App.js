import { useEffect, useState } from 'react';
import './App.css';

const roles = [
  'AI website solutions',
  'Google Business growth',
  'Local SEO support',
  'Automation for small teams',
  'Creative side projects'
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });
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
      } else if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (e) {
      // Theme persistence is optional.
    }
  }, [darkMode]);

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section');

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('animate-in'));
      return undefined;
    }

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

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-brand">Sanghapal Salave</div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#projects">AI Work</a>
          <a href="#creator">Wonder Toons</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>

      <header
        className="App-header"
        role="banner"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.82), rgba(13, 27, 42, 0.72)), url(${process.env.PUBLIC_URL + '/profile.png'})`
        }}
      >
        <div className="hero-content">
          <p className="eyebrow">Websites, AI tools, and local growth systems</p>
          <h1>I help small businesses look professional online and get more customer actions.</h1>
          <p className="title">
            <span className="typing-text">{displayText}</span>
            <span className="cursor">|</span>
          </p>
          <p className="subtitle">
            I combine software engineering experience with practical AI workflows to build business websites,
            improve Google presence, and create useful automation for small teams.
          </p>
          <div className="links">
            <a href="#contact" className="App-link primary-link">
              Start a Project
            </a>
            <a href="#services" className="App-link">
              View Services
            </a>
          </div>
        </div>
      </header>

      <main role="main">
        <section className="services animate-section" id="services" aria-labelledby="services-heading">
          <h2 id="services-heading">What I Can Build For Clients</h2>
          <div className="service-grid">
            <div className="service-card">
              <span className="service-number">01</span>
              <h3>Business Websites</h3>
              <p>
                Fast, mobile-friendly websites for local businesses that need a clean online presence,
                clear services, contact options, and trust-building content.
              </p>
            </div>
            <div className="service-card">
              <span className="service-number">02</span>
              <h3>Google Business Support</h3>
              <p>
                Google profile cleanup, review request workflows, review response templates, service
                descriptions, local SEO content, and map visibility improvements.
              </p>
            </div>
            <div className="service-card">
              <span className="service-number">03</span>
              <h3>AI Automation</h3>
              <p>
                Simple AI-powered tools for replying to reviews, drafting social posts, writing service
                pages, handling FAQs, and reducing repetitive business tasks.
              </p>
            </div>
          </div>
        </section>

        <section className="projects animate-section" id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading">AI Side Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <span className="project-badge">For local businesses</span>
              <h3>Review Reply Assistant</h3>
              <p>
                A planned tool that helps business owners respond to real customer reviews with a
                professional tone while saving time.
              </p>
              <div className="project-tech">
                <span>AI Writing</span>
                <span>Local SEO</span>
                <span>Customer Trust</span>
              </div>
            </div>
            <div className="project-card">
              <span className="project-badge">For websites</span>
              <h3>Website Audit Checklist</h3>
              <p>
                A practical audit flow for checking mobile layout, page speed basics, contact clarity,
                Google visibility, and content gaps for small business websites.
              </p>
              <div className="project-tech">
                <span>Web Design</span>
                <span>SEO Basics</span>
                <span>Conversion</span>
              </div>
            </div>
            <div className="project-card">
              <span className="project-badge">For creators</span>
              <h3>Content Idea Generator</h3>
              <p>
                AI-assisted idea generation for video topics, titles, descriptions, scripts, and simple
                creative assets for YouTube channels.
              </p>
              <div className="project-tech">
                <span>YouTube</span>
                <span>Prompting</span>
                <span>Content Planning</span>
              </div>
            </div>
          </div>
        </section>

        <section className="creator animate-section" id="creator" aria-labelledby="creator-heading">
          <h2 id="creator-heading">Wonder Toons Kids</h2>
          <div className="creator-panel">
            <div>
              <p className="section-lead">
                I also run Wonder Toons Kids, a creative YouTube channel for children. This site can
                become the central place for the channel, printable activities, story ideas, and future
                kid-friendly content.
              </p>
            </div>
            <div className="creator-list">
              <span>Kids stories</span>
              <span>Video ideas</span>
              <span>Printable activities</span>
              <span>Character pages</span>
            </div>
          </div>
        </section>

        <section className="about animate-section" id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About Me</h2>
          <div className="about-grid">
            <img
              src={process.env.PUBLIC_URL + '/profile.png'}
              alt="Sanghapal Salave"
              className="about-photo"
            />
            <div className="about-copy">
              <p>
                I am Sanghapal Salave, a Senior Software Engineer based in Pune, Maharashtra, India.
                I have 7+ years of experience building backend systems, APIs, microservices, and
                cloud-native applications for enterprise teams.
              </p>
              <p>
                My technical background includes Java, Spring Boot, REST APIs, Docker, Kubernetes,
                Apache Kafka, MySQL, React, and Google Cloud. I am also Google Cloud certified as a
                Professional Cloud Architect and Associate Cloud Engineer.
              </p>
              <p>
                I now want to use that engineering experience, AI tools, and practical web design to
                help small businesses, creators, and side-project founders grow online.
              </p>
              <div className="about-actions">
                <a
                  href={process.env.PUBLIC_URL + '/resume.pdf'}
                  download="Sanghapal_Salave_Resume.pdf"
                  className="App-link"
                >
                  Download Resume
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
                  href="https://github.com/sanghapalsalave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="App-link"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="credentials-grid">
            <div className="credential-card">
              <h3>Professional Experience</h3>
              <p>Globant, Infosys, and SmartLeaven Technologies across Java, Spring Boot, Kafka, and microservices work.</p>
            </div>
            <div className="credential-card">
              <h3>Cloud Certifications</h3>
              <p>Google Cloud Certified Professional Cloud Architect and Google Associate Cloud Engineer.</p>
            </div>
            <div className="credential-card">
              <h3>Education</h3>
              <p>PG-DASDM from CDAC Pune and Bachelor of Engineering in Computer Engineering.</p>
            </div>
          </div>
        </section>

        <section className="contact animate-section" id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Let Us Build Something Useful</h2>
          <p className="section-lead">
            If you need a website, Google Business improvement, AI workflow, or a technical partner for
            a small business idea, contact me directly.
          </p>
          <div className="links">
            <a href="mailto:salave.sanghapal@gmail.com" className="App-link primary-link">
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/sanghapal-salave-26241593"
              target="_blank"
              rel="noopener noreferrer"
              className="App-link"
            >
              Connect on LinkedIn
            </a>
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
          Top
        </button>
      )}
    </div>
  );
}

export default App;

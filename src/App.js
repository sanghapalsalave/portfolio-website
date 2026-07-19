import { useEffect, useState } from 'react';
import './App.css';

const serviceHighlights = [
  'Website launch systems',
  'Google profile improvement',
  'AI review workflows',
  'Local SEO content'
];

const services = [
  {
    label: 'Website Design',
    title: 'Fast business websites',
    text: 'Clean, mobile-ready websites with clear service pages, contact actions, trust signals, and a structure that helps visitors understand the business quickly.'
  },
  {
    label: 'Google Growth',
    title: 'Local visibility setup',
    text: 'Google Business Profile cleanup, service descriptions, review request flows, review reply templates, and location-focused content for better local discovery.'
  },
  {
    label: 'AI Workflows',
    title: 'Practical automation',
    text: 'Small AI tools for review replies, FAQ drafts, social posts, service-page content, lead intake, and repetitive admin work that slows business owners down.'
  }
];

const packages = [
  {
    name: 'Launch Website',
    audience: 'For businesses starting from zero',
    items: ['One-page or starter website', 'Mobile-first layout', 'Contact and lead CTA setup', 'Basic SEO structure']
  },
  {
    name: 'Local Growth Setup',
    audience: 'For businesses already online',
    items: ['Website clarity audit', 'Google profile improvements', 'Review request workflow', 'Service and location content']
  },
  {
    name: 'AI Workflow Setup',
    audience: 'For teams wasting time on repeat tasks',
    items: ['Review response assistant', 'Content prompt library', 'FAQ and message templates', 'Simple automation playbook']
  }
];

const useCases = [
  'Restaurants and cafes',
  'Salons and wellness studios',
  'Clinics and consultants',
  'Contractors and home services',
  'Coaches and local experts',
  'Small ecommerce brands'
];

const processSteps = [
  {
    title: 'Audit',
    text: 'Review the current website, Google profile, customer journey, and biggest gaps.'
  },
  {
    title: 'Build',
    text: 'Create the site, content structure, local trust signals, and AI-assisted workflows.'
  },
  {
    title: 'Launch',
    text: 'Publish the site, connect key links, test mobile experience, and prepare review flows.'
  },
  {
    title: 'Improve',
    text: 'Use feedback, customer questions, and search intent to improve content over time.'
  }
];

const credibility = [
  '7+ years building enterprise software systems',
  'Google Cloud certified architect and engineer',
  'Experience with Java, Spring Boot, React, APIs, Docker, Kubernetes, and GCP'
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
    const currentRole = serviceHighlights[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % serviceHighlights.length);
      }
    }, isDeleting ? 45 : 85);

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
        <a className="nav-brand" href="#top" aria-label="Salave Digital Studio home">
          <span className="brand-mark">SD</span>
          <span>Salave Digital Studio</span>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#process">Process</a>
          <a href="#founder">Founder</a>
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

      <header className="hero" id="top" role="banner">
        <div className="hero-copy">
          <p className="eyebrow">AI websites and local growth systems</p>
          <h1>Websites, Google presence, and AI workflows for small businesses.</h1>
          <p className="hero-subtitle">
            Salave Digital Studio helps local businesses launch a sharper online presence, earn more
            customer actions, and save time with simple AI-assisted workflows.
          </p>
          <p className="typing-line">
            <span>{displayText}</span>
            <span className="cursor">|</span>
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              Request a Website Audit
            </a>
            <a href="#packages" className="button button-secondary">
              View Packages
            </a>
          </div>
          <div className="trust-row" aria-label="Service highlights">
            <span>Web design</span>
            <span>Local SEO</span>
            <span>Google Business</span>
            <span>AI automation</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Business growth dashboard preview">
          <div className="visual-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="visual-heading">
            <p>Local Growth Snapshot</p>
            <strong>Ready to improve</strong>
          </div>
          <div className="metric-grid">
            <div>
              <span>Website</span>
              <strong>Clear CTA</strong>
            </div>
            <div>
              <span>Google</span>
              <strong>Profile tuned</strong>
            </div>
            <div>
              <span>Reviews</span>
              <strong>Reply flow</strong>
            </div>
            <div>
              <span>AI</span>
              <strong>Templates ready</strong>
            </div>
          </div>
          <div className="signal-list">
            <span>Service pages mapped</span>
            <span>Lead path simplified</span>
            <span>Customer questions converted to content</span>
          </div>
        </div>
      </header>

      <main role="main">
        <section className="section services animate-section" id="services" aria-labelledby="services-heading">
          <div className="section-header">
            <p className="eyebrow">Core services</p>
            <h2 id="services-heading">Make the business easier to find, trust, and contact.</h2>
          </div>
          <div className="card-grid three">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <span className="card-label">{service.label}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section packages animate-section" id="packages" aria-labelledby="packages-heading">
          <div className="section-header">
            <p className="eyebrow">Service packages</p>
            <h2 id="packages-heading">Simple starting points for different business stages.</h2>
          </div>
          <div className="card-grid three">
            {packages.map((pack) => (
              <article className="package-card" key={pack.name}>
                <h3>{pack.name}</h3>
                <p>{pack.audience}</p>
                <ul>
                  {pack.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section use-cases animate-section" id="use-cases" aria-labelledby="use-cases-heading">
          <div className="split-layout">
            <div>
              <p className="eyebrow">Best fit</p>
              <h2 id="use-cases-heading">Built for practical local businesses, not vanity portfolios.</h2>
              <p className="section-lead">
                The goal is to make the business look credible, answer customer questions, and guide
                people toward calling, booking, messaging, or requesting a quote.
              </p>
            </div>
            <div className="use-case-list">
              {useCases.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section tools animate-section" id="tools" aria-labelledby="tools-heading">
          <div className="section-header">
            <p className="eyebrow">AI tools I can build</p>
            <h2 id="tools-heading">Small tools that solve repeatable business problems.</h2>
          </div>
          <div className="tool-row">
            <article>
              <h3>Review Reply Assistant</h3>
              <p>Drafts professional replies to real customer reviews with consistent tone and local context.</p>
            </article>
            <article>
              <h3>Website Audit Checklist</h3>
              <p>Scores mobile clarity, contact paths, trust content, Google profile alignment, and SEO basics.</p>
            </article>
            <article>
              <h3>Content Idea Generator</h3>
              <p>Turns customer questions into website sections, Google posts, social content, and FAQs.</p>
            </article>
          </div>
        </section>

        <section className="section process animate-section" id="process" aria-labelledby="process-heading">
          <div className="section-header">
            <p className="eyebrow">Process</p>
            <h2 id="process-heading">A focused path from messy online presence to usable system.</h2>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section creator animate-section" id="creator" aria-labelledby="creator-heading">
          <div className="split-layout creator-panel">
            <div>
              <p className="eyebrow">Creator brand</p>
              <h2 id="creator-heading">Wonder Toons Kids stays as a side brand.</h2>
              <p className="section-lead">
                Wonder Toons Kids can grow into a separate content hub for videos, printable activities,
                story ideas, and future kid-friendly digital products.
              </p>
            </div>
            <div className="creator-tags">
              <span>YouTube content</span>
              <span>Printable activities</span>
              <span>Story ideas</span>
              <span>Creative experiments</span>
            </div>
          </div>
        </section>

        <section className="section founder animate-section" id="founder" aria-labelledby="founder-heading">
          <div className="founder-card">
            <img
              src={process.env.PUBLIC_URL + '/profile.png'}
              alt="Sanghapal Salave"
              className="founder-photo"
            />
            <div>
              <p className="eyebrow">Founder credibility</p>
              <h2 id="founder-heading">Built by Sanghapal Salave.</h2>
              <p>
                I am a senior software engineer based in Pune with a background in backend systems,
                cloud architecture, APIs, and production-grade software delivery.
              </p>
              <div className="cred-list">
                {credibility.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="founder-links">
                <a href={process.env.PUBLIC_URL + '/resume.pdf'} download="Sanghapal_Salave_Resume.pdf">
                  Resume
                </a>
                <a href="https://www.linkedin.com/in/sanghapal-salave-26241593" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://github.com/sanghapalsalave" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact animate-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-panel">
            <p className="eyebrow">Start here</p>
            <h2 id="contact-heading">Need a better website or local growth setup?</h2>
            <p>
              Send the business name, current website if any, city, service category, and what you want
              more of: calls, bookings, quote requests, reviews, or content consistency.
            </p>
            <div className="hero-actions">
              <a href="mailto:salave.sanghapal@gmail.com?subject=Website%20or%20Local%20Growth%20Project" className="button button-primary">
                Email Project Details
              </a>
              <a
                href="https://www.linkedin.com/in/sanghapal-salave-26241593"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer" role="contentinfo">
        <span>Salave Digital Studio</span>
        <span>&copy; 2026 Sanghapal Salave. All rights reserved.</span>
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

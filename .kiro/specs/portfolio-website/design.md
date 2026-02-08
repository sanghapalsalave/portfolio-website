# Design Document: Portfolio Website

## Overview

The portfolio website is a single-page React application (SPA) that presents professional information in an engaging, interactive format. The application follows a component-based architecture with React hooks for state management and side effects. The design emphasizes performance, accessibility, and user experience through smooth animations, responsive layouts, and theme customization.

### Key Design Principles

1. **Single Responsibility**: Each component handles a specific aspect of the portfolio
2. **Progressive Enhancement**: Core content is accessible even if JavaScript fails
3. **Performance First**: Efficient rendering with React 18, cleanup of observers and listeners
4. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
5. **Responsive Design**: Mobile-first approach with breakpoints for larger screens
6. **User Preference Persistence**: Theme choices saved to localStorage

## Architecture

### Application Structure

```
Portfolio Website (SPA)
├── App Component (Root)
│   ├── Navigation Bar (Fixed Header)
│   ├── Hero Section (Profile & Introduction)
│   ├── About Section
│   ├── Experience Section (Timeline)
│   ├── Skills Section (Categorized Bars)
│   ├── Projects Section (Card Grid)
│   ├── Education Section (Card Grid)
│   ├── Certifications Section (Card Grid)
│   ├── Services Section (Freelance Availability)
│   ├── Tutoring Section (Java Learning)
│   ├── Mobile Apps Section (App Showcase)
│   ├── Footer
│   └── Scroll-to-Top Button (Conditional)
```

### State Management

The application uses React hooks for local state management:

- **Theme State**: `useState` with localStorage initialization
- **Typing Animation State**: Multiple `useState` hooks for role cycling
- **Scroll State**: `useState` for scroll-to-top button visibility
- **Side Effects**: `useEffect` hooks for:
  - Theme persistence
  - Scroll event listeners
  - Typing animation timing
  - Intersection Observer setup

### Data Flow

1. **Initial Load**: 
   - Read theme preference from localStorage
   - Apply theme to document body
   - Initialize Intersection Observer for animations
   - Start typing animation cycle

2. **User Interactions**:
   - Theme toggle → Update state → Persist to localStorage → Apply CSS class
   - Navigation click → Smooth scroll to section
   - Scroll event → Update scroll button visibility
   - Section visibility → Trigger entrance animation

## Components and Interfaces

### App Component

The root component that orchestrates all functionality.

**State:**
```typescript
interface AppState {
  darkMode: boolean;           // Current theme preference
  roleIndex: number;           // Current role in typing animation
  displayText: string;         // Currently displayed text
  isDeleting: boolean;         // Typing animation direction
  showScrollTop: boolean;      // Scroll button visibility
}
```

**Props:** None (root component)

**Key Methods:**
- `toggleTheme()`: Switches between light and dark mode
- `scrollToTop()`: Smoothly scrolls to page top
- Typing animation logic (character-by-character display)

### Navigation Bar

Fixed header with navigation links and theme toggle.

**Structure:**
```typescript
interface NavigationBar {
  brand: string;                    // "SS" brand identifier
  links: NavigationLink[];          // Section navigation links
  themeToggle: ThemeToggleButton;   // Dark/light mode toggle
}

interface NavigationLink {
  text: string;      // Display text
  href: string;      // Section anchor (e.g., "#about")
}
```

**Behavior:**
- Fixed positioning at top of viewport
- Smooth scroll on link click (CSS scroll-behavior)
- Theme toggle updates global state

### Hero Section

Introductory section with profile and animated content.

**Structure:**
```typescript
interface HeroSection {
  profileImage: {
    src: string;           // Path to profile photo
    alt: string;           // Accessibility text
  };
  name: string;            // Developer name
  typingEffect: {
    roles: string[];       // Array of role titles
    displayText: string;   // Current displayed text
    cursor: boolean;       // Blinking cursor state
  };
  subtitle: string;        // Experience summary
  links: SocialLink[];     // GitHub, LinkedIn, Email
  resumeButton: {
    href: string;          // Path to PDF
    downloadName: string;  // Downloaded filename
  };
}

interface SocialLink {
  text: string;
  href: string;
  external: boolean;       // Opens in new tab if true
  rel?: string;           // Security attributes for external links
}
```

**Typing Animation Algorithm:**
```
1. Start with first role in array
2. Type characters one by one (100ms delay)
3. When complete, pause 1500ms
4. Delete characters one by one (50ms delay)
5. When empty, move to next role (circular)
6. Repeat indefinitely
```

### Timeline Component (Experience)

Vertical timeline displaying work history.

**Structure:**
```typescript
interface Timeline {
  items: TimelineItem[];
}

interface TimelineItem {
  title: string;              // Job title
  company: string;            // Company name
  dateRange: string;          // Duration (e.g., "Sep 2021 - Present")
  location: string;           // Work location
  description?: string;       // Optional job description
  skills: string[];          // Technology tags
}
```

**Visual Elements:**
- Vertical line connecting all items
- Circular dot marker for each position
- Card-style content boxes
- Technology tags as pills

### Skills Section

Categorized skill display with proficiency bars.

**Structure:**
```typescript
interface SkillsSection {
  categories: SkillCategory[];
}

interface SkillCategory {
  name: string;              // Category title
  skills: Skill[];
}

interface Skill {
  name: string;              // Technology name
  proficiency: number;       // Percentage (0-100)
}
```

**Rendering:**
- Grid layout with responsive columns
- Each skill shows name, percentage, and visual bar
- Bar width matches proficiency percentage
- Gradient fill for visual appeal

### Project Cards

Grid of project showcases.

**Structure:**
```typescript
interface ProjectsSection {
  projects: Project[];
}

interface Project {
  badge: string;             // Company/context badge
  name: string;              // Project name
  dateRange: string;         // Project duration
  description: string;       // Project details
  technologies: string[];    // Tech stack tags
}
```

**Interactions:**
- Hover effect: lift card with shadow
- Responsive grid: adapts to screen width

### Education and Certifications

Similar card-based layouts for credentials.

**Structure:**
```typescript
interface Education {
  institution: string;
  degree: string;
  field: string;
  years: string;
}

interface Certification {
  icon: string;              // Emoji or icon
  name: string;
  issuer: string;
  issueDate: string;
}
```

### Services Section

Highlights freelance availability and services offered.

**Structure:**
```typescript
interface ServicesSection {
  title: string;                    // Section heading
  availability: {
    status: string;                 // "Open to Work" or similar
    badge: boolean;                 // Show availability badge
  };
  technologies: string[];           // Python, Java, AWS, React, JS, etc.
  description: string;              // Service description
  callToAction: {
    text: string;                   // CTA button text
    link: string;                   // Contact link or form
  };
}
```

**Visual Elements:**
- Prominent "Open to Work" badge or indicator
- Technology tags displayed as pills or badges
- Clear call-to-action button
- Professional service description

### Tutoring Section

Offers Java tutoring and one-on-one learning sessions.

**Structure:**
```typescript
interface TutoringSection {
  title: string;                    // Section heading
  subject: string;                  // "Java" or specific topics
  format: string;                   // "One-on-One Calls"
  pricing: {
    isPaid: boolean;                // Indicates paid service
    details?: string;               // Pricing info or "Contact for pricing"
  };
  description: string;              // Teaching approach and expertise
  booking: {
    text: string;                   // "Schedule a Session" or similar
    link: string;                   // Calendar link, contact form, or email
  };
}
```

**Visual Elements:**
- Clear indication of paid service
- Scheduling/booking call-to-action
- Expertise highlights
- Professional teaching credentials

### Mobile Apps Section

Showcases mobile applications developed.

**Structure:**
```typescript
interface MobileAppsSection {
  apps: MobileApp[];
}

interface MobileApp {
  name: string;                     // App name
  description: string;              // App description
  screenshots: string[];            // Array of image URLs
  technologies: string[];           // Tech stack (React Native, Flutter, etc.)
  platforms: Platform[];            // iOS, Android, Web
  links: AppLink[];                 // Store links, demo links
  featured?: boolean;               // Highlight featured apps
}

interface Platform {
  name: string;                     // "iOS", "Android", "Web"
  icon: string;                     // Platform icon
}

interface AppLink {
  type: string;                     // "App Store", "Google Play", "Demo", "GitHub"
  url: string;                      // Link URL
  icon: string;                     // Link icon
}
```

**Visual Elements:**
- Card-based or gallery layout
- Screenshot carousel or grid
- Platform badges (iOS, Android)
- Store links with icons
- Technology tags
- Responsive image display

**Interactions:**
- Hover effects on app cards
- Screenshot lightbox or modal
- Video playback for demos
- Smooth transitions between screenshots

### Scroll-to-Top Button

Conditional floating action button.

**Behavior:**
```typescript
interface ScrollButton {
  visible: boolean;          // Show when scrollY > 500
  onClick: () => void;       // Smooth scroll to top
}
```

**Visibility Logic:**
- Hidden by default
- Appears when user scrolls down 500px
- Disappears when scrolling back up
- Fixed position in bottom-right corner

## Data Models

### Theme Preference

**Storage:** localStorage
**Key:** `"darkMode"`
**Value:** JSON boolean (`"true"` or `"false"`)

**Operations:**
```typescript
// Read on mount
const saved = localStorage.getItem('darkMode');
const darkMode = saved ? JSON.parse(saved) : false;

// Write on change
localStorage.setItem('darkMode', JSON.stringify(darkMode));

// Apply to DOM
document.body.classList.toggle('dark-mode', darkMode);
```

### Content Data

All content (experience, skills, projects, education, certifications) is currently hardcoded in the component. This design choice prioritizes:
- Simplicity (no backend required)
- Performance (no API calls)
- Reliability (no network dependencies)

**Future Enhancement:** Content could be externalized to JSON files for easier updates.

### Animation State

**Intersection Observer Configuration:**
```typescript
const observerOptions = {
  threshold: 0.1  // Trigger when 10% of element is visible
};
```

**Observed Elements:** All sections with class `"animate-section"`

**Animation Trigger:** Add class `"animate-in"` when element intersects viewport

## Styling Architecture

### CSS Organization

1. **Global Styles**: Reset, smooth scrolling, transitions
2. **Component Styles**: Scoped to specific UI elements
3. **Theme Styles**: Light and dark mode variants
4. **Responsive Styles**: Media queries for mobile devices
5. **Animation Styles**: Keyframes and transitions

### Theme Implementation

**Light Mode (Default):**
- Light backgrounds (#f8f9fa, white)
- Dark text (#282c34, #555, #666)
- Accent colors (gradient: #667eea to #764ba2)

**Dark Mode:**
- Dark backgrounds (#1a1a2e, #16213e)
- Light text (#eaeaea, #b0b0b0)
- Same accent gradient
- Applied via `body.dark-mode` class

### Responsive Breakpoints

**Mobile:** `max-width: 768px`
- Single column layouts
- Stacked navigation
- Reduced font sizes
- Adjusted spacing

**Desktop:** `> 768px`
- Multi-column grids
- Horizontal navigation
- Larger typography
- Expanded spacing

## Event Handling

### Scroll Events

**Listener Setup:**
```typescript
useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Cleanup:** Event listener removed on component unmount

### Intersection Observer

**Setup:**
```typescript
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
```

**Cleanup:** Observer disconnected on component unmount

### Typing Animation

**Timing Logic:**
```typescript
useEffect(() => {
  const currentRole = roles[roleIndex];
  const timeout = setTimeout(() => {
    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        // Type next character
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else {
        // Pause then start deleting
        setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (displayText.length > 0) {
        // Delete last character
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, isDeleting ? 50 : 100);

  return () => clearTimeout(timeout);
}, [displayText, isDeleting, roleIndex, roles]);
```

**Cleanup:** Timeout cleared on dependency change or unmount



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme Persistence Round-Trip

*For any* theme preference (light or dark), when a user sets the theme, the preference should be persisted to localStorage, and when the page reloads, the same theme should be applied.

**Validates: Requirements 2.5, 2.6**

### Property 2: Theme Application Consistency

*For any* theme mode (light or dark), when the theme is activated, all content sections should have consistent styling with appropriate background and text colors matching that theme.

**Validates: Requirements 2.3, 2.4**

### Property 3: Navigation Link Scrolling

*For any* navigation link in the navigation bar, when clicked, the page should smoothly scroll to the corresponding section identified by the link's href anchor.

**Validates: Requirements 1.2**

### Property 4: External Links Security

*For any* external link (GitHub, LinkedIn), the link should open in a new tab and include rel="noopener noreferrer" attributes for security.

**Validates: Requirements 4.2, 4.3, 4.5**

### Property 5: Typing Animation Cycles Through All Roles

*For any* role in the roles array, the typing animation should eventually display that role, and after displaying all roles, should cycle back to the first role.

**Validates: Requirements 3.3, 3.6**

### Property 6: Typing Animation Character Progression

*For any* role being typed, characters should appear one at a time in sequence (not all at once), and after completion, should be deleted one at a time in reverse sequence.

**Validates: Requirements 3.4, 3.5**

### Property 7: Timeline Items Display Required Fields

*For any* work experience item in the timeline, the rendered output should include company name, job title, duration, location, and technology tags.

**Validates: Requirements 7.2, 7.5**

### Property 8: Timeline Chronological Ordering

*For any* set of work experience items, when displayed in the timeline, they should appear in reverse chronological order (most recent first).

**Validates: Requirements 7.3**

### Property 9: Optional Description Display

*For any* timeline item, if a description field is present, it should be rendered in the output; if absent, the item should still render correctly without it.

**Validates: Requirements 7.6**

### Property 10: Skill Bars Display Name and Proficiency

*For any* skill in the skills section, the rendered skill bar should display both the skill name and the percentage proficiency level.

**Validates: Requirements 8.2, 8.3**

### Property 11: Skill Bar Width Matches Proficiency

*For any* skill with a proficiency percentage, the visual progress bar width should match that percentage value.

**Validates: Requirements 8.4**

### Property 12: Project Cards Display Required Fields

*For any* project in the projects section, the rendered card should include project name, company badge, date range, description, and technology tags.

**Validates: Requirements 9.2, 9.3**

### Property 13: Education Cards Display Required Fields

*For any* education entry, the rendered card should include institution name, degree type, field of study, and year range.

**Validates: Requirements 10.2**

### Property 14: Certification Cards Display Required Fields

*For any* certification, the rendered card should include an icon, certification name, issuing organization, and issue date.

**Validates: Requirements 11.2, 11.3**

### Property 15: Hover Effects on Interactive Cards

*For any* interactive card (project or certification), when hovered, a visual lift effect should be applied through CSS transform.

**Validates: Requirements 9.4, 11.4**

### Property 16: Scroll Button Visibility Toggle

*For any* scroll position, the scroll-to-top button should be visible when scrollY > 500 pixels and hidden when scrollY ≤ 500 pixels.

**Validates: Requirements 12.1, 12.2**

### Property 17: Section Entrance Animations

*For any* content section with the animate-section class, when it enters the viewport (10% visible), an entrance animation should be triggered by adding the animate-in class.

**Validates: Requirements 13.1, 13.2**

### Property 18: Animation Idempotence

*For any* animated section, once the animate-in class is added, subsequent viewport intersections should not remove or re-add the class (animation happens only once).

**Validates: Requirements 13.4**

### Property 19: Keyboard Navigation Support

*For any* interactive element (links, buttons), the element should be reachable and activatable via keyboard navigation (tab and enter keys).

**Validates: Requirements 15.5**

### Property 20: Event Listener Cleanup

*For any* component that adds event listeners or observers (scroll, intersection observer), when the component unmounts, all listeners and observers should be properly cleaned up.

**Validates: Requirements 17.5**

### Property 21: Services Section Display

*For any* services section, the rendered output should include availability status, list of technologies, service description, and a call-to-action for inquiries.

**Validates: Requirements 19.1, 19.2, 19.3, 19.4**

### Property 22: Tutoring Section Display

*For any* tutoring section, the rendered output should include subject (Java), format (one-on-one), pricing indication, and booking/scheduling information.

**Validates: Requirements 20.1, 20.2, 20.3, 20.4**

### Property 23: Mobile App Cards Display Required Fields

*For any* mobile app in the mobile apps section, the rendered card should include app name, description, screenshots, technology stack, and platform links.

**Validates: Requirements 21.2, 21.3, 21.4**

## Error Handling

### SEO and Metadata Management

**Comprehensive SEO Strategy:**

The portfolio implements a multi-layered SEO approach to maximize search engine visibility and social media engagement.

#### Meta Tags Structure

**Basic Meta Tags:**
```html
<head>
  <!-- Primary Meta Tags -->
  <title>Sanghapal Salave - Senior Software Engineer | Java Expert | Freelance Developer</title>
  <meta name="title" content="Sanghapal Salave - Senior Software Engineer | Java Expert | Freelance Developer">
  <meta name="description" content="Senior Software Engineer with 7+ years experience in Java, Spring Boot, Microservices, AWS, and React. Available for freelance projects. Offering Java tutoring and mobile app development.">
  <meta name="keywords" content="Java developer, Spring Boot expert, Microservices architect, AWS developer, React developer, freelance software engineer, Java tutor, mobile app developer, Pune software engineer">
  <meta name="author" content="Sanghapal Salave">
  <meta name="robots" content="index, follow">
  <meta name="language" content="English">
  <meta name="revisit-after" content="7 days">
  <link rel="canonical" href="https://sanghapalsalave.github.io/portfolio-website/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sanghapalsalave.github.io/portfolio-website/">
  <meta property="og:title" content="Sanghapal Salave - Senior Software Engineer | Java Expert">
  <meta property="og:description" content="Senior Software Engineer with 7+ years experience. Available for freelance projects in Java, Python, AWS, React. Offering Java tutoring.">
  <meta property="og:image" content="https://sanghapalsalave.github.io/portfolio-website/profile.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="Sanghapal Salave Portfolio">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://sanghapalsalave.github.io/portfolio-website/">
  <meta property="twitter:title" content="Sanghapal Salave - Senior Software Engineer | Java Expert">
  <meta property="twitter:description" content="Senior Software Engineer with 7+ years experience. Available for freelance projects in Java, Python, AWS, React.">
  <meta property="twitter:image" content="https://sanghapalsalave.github.io/portfolio-website/profile.png">
</head>
```

#### Structured Data (JSON-LD)

**Person Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sanghapal Salave",
  "url": "https://sanghapalsalave.github.io/portfolio-website/",
  "image": "https://sanghapalsalave.github.io/portfolio-website/profile.png",
  "jobTitle": "Senior Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Globant"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "addressCountry": "India"
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "CDAC Pune"
    },
    {
      "@type": "EducationalOrganization",
      "name": "Sinhgad Institute of Technology"
    }
  ],
  "knowsAbout": ["Java", "Spring Boot", "Microservices", "AWS", "React", "Docker", "Kubernetes"],
  "sameAs": [
    "https://github.com/sanghapalsalave",
    "https://www.linkedin.com/in/sanghapal-salave-26241593"
  ]
}
```

**ProfessionalService Schema (Freelance):**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Freelance Software Development Services",
  "provider": {
    "@type": "Person",
    "name": "Sanghapal Salave"
  },
  "serviceType": "Software Development",
  "areaServed": "Worldwide",
  "availableLanguage": "English",
  "description": "Freelance software development services specializing in Java, Python, AWS, React, and JavaScript. Available for project-based work.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock"
  }
}
```

**EducationalOrganization Schema (Tutoring):**
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Java Programming Tutoring",
  "provider": {
    "@type": "Person",
    "name": "Sanghapal Salave"
  },
  "description": "One-on-one Java programming tutoring sessions. Personalized learning for beginners to advanced developers.",
  "educationalCredentialAwarded": "Java Programming Skills",
  "teaches": "Java Programming"
}
```

**SoftwareApplication Schema (Mobile Apps):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[App Name]",
  "applicationCategory": "MobileApplication",
  "operatingSystem": ["iOS", "Android"],
  "author": {
    "@type": "Person",
    "name": "Sanghapal Salave"
  },
  "description": "[App Description]",
  "screenshot": "[Screenshot URL]"
}
```

**WorkExperience Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sanghapal Salave",
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Senior Software Engineer",
      "occupationLocation": {
        "@type": "City",
        "name": "Pune"
      },
      "estimatedSalary": {
        "@type": "MonetaryAmountDistribution",
        "name": "7+ years experience"
      },
      "skills": "Java, Spring Boot, Microservices, Docker, Kubernetes"
    }
  ]
}
```

**BreadcrumbList Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://sanghapalsalave.github.io/portfolio-website/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://sanghapalsalave.github.io/portfolio-website/#about"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Services",
      "item": "https://sanghapalsalave.github.io/portfolio-website/#services"
    }
  ]
}
```

#### Semantic HTML Structure

**Proper HTML5 Semantics:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <!-- Navigation links -->
    </nav>
  </header>
  
  <main>
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">About Me</h2>
      <!-- Content -->
    </section>
    
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Work Experience</h2>
      <article>
        <h3>Senior Software Engineer</h3>
        <!-- Experience details -->
      </article>
    </section>
    
    <section id="services" aria-labelledby="services-heading">
      <h2 id="services-heading">Freelance Services</h2>
      <!-- Services content -->
    </section>
  </main>
  
  <footer>
    <!-- Footer content -->
  </footer>
</body>
</html>
```

#### Image Optimization

**Image Best Practices:**
```html
<!-- Profile image with WebP and fallback -->
<picture>
  <source srcset="profile.webp" type="image/webp">
  <img 
    src="profile.png" 
    alt="Sanghapal Salave - Senior Software Engineer specializing in Java and Spring Boot"
    width="300"
    height="300"
    loading="eager"
  >
</picture>

<!-- Lazy-loaded images below fold -->
<img 
  src="project-screenshot.jpg" 
  alt="Oceana Analytics Platform - Java Spring Boot Microservices Architecture"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>
```

#### Performance Optimization

**Core Web Vitals Strategy:**

1. **Largest Contentful Paint (LCP) < 2.5s:**
   - Optimize hero section images
   - Use resource hints: `<link rel="preload" href="profile.png" as="image">`
   - Minimize render-blocking resources

2. **First Input Delay (FID) < 100ms:**
   - Minimize JavaScript execution time
   - Use code splitting with React.lazy()
   - Defer non-critical JavaScript

3. **Cumulative Layout Shift (CLS) < 0.1:**
   - Set explicit width/height on images
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

**Implementation:**
```javascript
// Code splitting for better performance
const MobileApps = React.lazy(() => import('./components/MobileApps'));

// Resource hints in HTML
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

#### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://sanghapalsalave.github.io/portfolio-website/sitemap.xml
```

#### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sanghapalsalave.github.io/portfolio-website/</loc>
    <lastmod>2026-02-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sanghapalsalave.github.io/portfolio-website/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sanghapalsalave.github.io/portfolio-website/#services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sanghapalsalave.github.io/portfolio-website/#tutoring</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

### SEO Content Strategy

**Keyword Optimization:**
- Primary keywords: "Java developer", "Spring Boot expert", "freelance software engineer"
- Secondary keywords: "microservices architect", "AWS developer", "React developer"
- Long-tail keywords: "Java tutor Pune", "freelance Java developer India", "mobile app developer"

**Content Guidelines:**
- Use keywords naturally in headings (h1, h2, h3)
- Include keywords in first 100 words of content
- Use descriptive anchor text for links
- Add alt text with relevant keywords to all images
- Maintain keyword density of 1-2%

## Error Handling

### Theme Persistence Errors

**Scenario:** localStorage is unavailable or disabled
**Handling:** 
- Catch exceptions when accessing localStorage
- Fall back to in-memory state only
- Theme toggle still functions, just doesn't persist

**Implementation:**
```typescript
try {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
} catch (e) {
  console.warn('localStorage unavailable, theme will not persist');
}
```

### Asset Loading Errors

**Scenario:** Profile image or resume PDF fails to load
**Handling:**
- Use PUBLIC_URL environment variable for correct paths
- Provide alt text for images
- Graceful degradation if assets missing

### Intersection Observer Unavailability

**Scenario:** Browser doesn't support Intersection Observer
**Handling:**
- Feature detection before creating observer
- Fall back to showing all sections without animation
- Core content remains accessible

**Implementation:**
```typescript
if ('IntersectionObserver' in window) {
  // Set up observer
} else {
  // Add animate-in class to all sections immediately
}
```

### Scroll Event Performance

**Scenario:** Excessive scroll events causing performance issues
**Handling:**
- Use passive event listeners where possible
- Keep scroll handler logic minimal
- Clean up listeners on unmount

### Invalid Theme Data

**Scenario:** Corrupted data in localStorage
**Handling:**
- Wrap JSON.parse in try-catch
- Default to light mode if parsing fails
- Clear invalid data

**Implementation:**
```typescript
try {
  const saved = localStorage.getItem('darkMode');
  return saved ? JSON.parse(saved) : false;
} catch (e) {
  localStorage.removeItem('darkMode');
  return false;
}
```

## Testing Strategy

### Dual Testing Approach

The portfolio website requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, component rendering, and user interactions
- **Property tests**: Verify universal properties across all data inputs and state transitions

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across many inputs.

### Unit Testing

**Framework:** Jest and React Testing Library (already configured)

**Test Categories:**

1. **Component Rendering Tests**
   - Navigation bar renders with correct links
   - Hero section displays profile image and name
   - All content sections render without errors
   - Footer displays copyright information

2. **User Interaction Tests**
   - Theme toggle switches between light and dark mode
   - Navigation links trigger scroll behavior
   - Scroll-to-top button appears and functions correctly
   - Resume download link has correct attributes

3. **State Management Tests**
   - Theme state initializes from localStorage
   - Typing animation state transitions correctly
   - Scroll button visibility updates on scroll

4. **Edge Cases**
   - Empty localStorage (default theme)
   - Missing optional fields (timeline descriptions)
   - Rapid theme toggling
   - Scroll events at boundary (exactly 500px)

5. **Accessibility Tests**
   - ARIA labels present on interactive elements
   - Alt text present on images
   - Semantic HTML structure
   - Keyboard navigation works

6. **SEO and Metadata Tests**
   - Page title exists and is descriptive
   - Meta tags present (description, OG, Twitter)
   - JSON-LD structured data is valid
   - Canonical URL is set

**Example Unit Test:**
```javascript
describe('Theme Toggle', () => {
  it('should switch to dark mode when clicked', () => {
    render(<App />);
    const toggle = screen.getByLabelText('Toggle dark mode');
    
    fireEvent.click(toggle);
    
    expect(document.body).toHaveClass('dark-mode');
  });
  
  it('should persist theme to localStorage', () => {
    render(<App />);
    const toggle = screen.getByLabelText('Toggle dark mode');
    
    fireEvent.click(toggle);
    
    expect(localStorage.getItem('darkMode')).toBe('true');
  });
});
```

### Property-Based Testing

**Framework:** fast-check (for JavaScript/TypeScript)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: portfolio-website, Property N: [property description]`

**Property Test Categories:**

1. **Theme Persistence Properties**
   - Property 1: Round-trip (set → persist → reload → verify)
   - Property 2: Consistent styling across all sections

2. **Navigation Properties**
   - Property 3: All navigation links scroll to correct sections

3. **Link Security Properties**
   - Property 4: All external links have security attributes

4. **Animation Properties**
   - Property 5: Typing animation cycles through all roles
   - Property 6: Character-by-character progression
   - Property 17: Entrance animations trigger on visibility
   - Property 18: Animations are idempotent

5. **Data Display Properties**
   - Property 7: Timeline items show all required fields
   - Property 8: Timeline chronological ordering
   - Property 9: Optional fields handled correctly
   - Property 10-14: All card types display required fields

6. **Visual Properties**
   - Property 11: Skill bar widths match percentages
   - Property 15: Hover effects apply to interactive cards
   - Property 16: Scroll button visibility based on position

7. **Interaction Properties**
   - Property 19: Keyboard navigation for all interactive elements

8. **Cleanup Properties**
   - Property 20: Event listeners cleaned up on unmount

9. **Services and Engagement Properties**
   - Property 21: Services section displays all required information
   - Property 22: Tutoring section displays all required information
   - Property 23: Mobile app cards display all required fields

**Example Property Test:**
```javascript
import fc from 'fast-check';

describe('Property 1: Theme Persistence Round-Trip', () => {
  // Feature: portfolio-website, Property 1: Theme persistence round-trip
  it('should persist and restore theme preference', () => {
    fc.assert(
      fc.property(fc.boolean(), (themePreference) => {
        // Set theme
        localStorage.setItem('darkMode', JSON.stringify(themePreference));
        
        // Render component (simulates page reload)
        const { rerender } = render(<App />);
        
        // Verify theme applied
        const hasClass = document.body.classList.contains('dark-mode');
        expect(hasClass).toBe(themePreference);
        
        // Cleanup
        localStorage.clear();
      }),
      { numRuns: 100 }
    );
  });
});

describe('Property 8: Timeline Chronological Ordering', () => {
  // Feature: portfolio-website, Property 8: Timeline chronological ordering
  it('should display timeline items in reverse chronological order', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          title: fc.string(),
          company: fc.string(),
          startDate: fc.date(),
          endDate: fc.date()
        }), { minLength: 2 }),
        (timelineItems) => {
          // Sort items by date (most recent first)
          const sorted = [...timelineItems].sort((a, b) => 
            b.startDate.getTime() - a.startDate.getTime()
          );
          
          // Render timeline with items
          render(<Timeline items={timelineItems} />);
          
          // Verify order in DOM matches sorted order
          const renderedItems = screen.getAllByTestId('timeline-item');
          renderedItems.forEach((item, index) => {
            expect(item).toHaveTextContent(sorted[index].company);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Scope:** End-to-end user flows

**Test Scenarios:**
1. Complete page load and navigation flow
2. Theme toggle persistence across page reloads
3. Scroll behavior and scroll-to-top functionality
4. Animation triggers during scroll
5. Responsive behavior at different viewport sizes

**Tools:** React Testing Library with user-event for realistic interactions

### Visual Regression Testing

**Scope:** Ensure UI consistency

**Approach:**
- Snapshot tests for component rendering
- Visual comparison for theme switching
- Responsive layout verification

### Performance Testing

**Metrics:**
- Initial page load time
- Time to interactive
- Animation frame rates
- Scroll performance

**Tools:** 
- Lighthouse for performance audits
- React DevTools Profiler for component performance
- Chrome DevTools for frame rate analysis

### Accessibility Testing

**Approach:**
- Automated: jest-axe for accessibility violations
- Manual: Keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)

**Standards:** WCAG 2.1 Level AA compliance

### Test Coverage Goals

- **Unit Test Coverage:** > 80% of component code
- **Property Test Coverage:** All 23 correctness properties
- **Integration Test Coverage:** All major user flows
- **Accessibility:** Zero critical violations

### Continuous Testing

**Pre-commit:** Run unit tests and linting
**CI/CD:** Run full test suite on pull requests
**Deployment:** Run build and smoke tests before deploying to GitHub Pages


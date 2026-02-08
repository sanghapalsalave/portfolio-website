# Implementation Plan: Portfolio Website

## Overview

This implementation plan provides a structured approach to building and testing the portfolio website. The plan focuses on incremental development with testing integrated throughout. Since this is documentation for an existing codebase, tasks are organized to guide future enhancements, refactoring, and comprehensive test coverage.

The implementation uses React 18 with hooks for state management, CSS for styling and animations, and follows accessibility best practices.

## Tasks

- [x] 1. Set up testing infrastructure and configuration
  - Install fast-check for property-based testing
  - Configure Jest for both unit and property tests
  - Set up test utilities and custom matchers
  - Create test data generators for property tests
  - _Requirements: 17.1_

- [ ] 2. Implement and test theme management system
  - [x] 2.1 Create theme state management with localStorage integration
    - Implement useState hook with localStorage initialization
    - Add theme toggle handler
    - Apply theme class to document body
    - Handle localStorage errors gracefully
    - _Requirements: 2.1, 2.2, 2.5, 2.6, 2.7_
  
  - [ ]* 2.2 Write property test for theme persistence round-trip
    - **Property 1: Theme Persistence Round-Trip**
    - **Validates: Requirements 2.5, 2.6**
  
  - [ ]* 2.3 Write property test for theme application consistency
    - **Property 2: Theme Application Consistency**
    - **Validates: Requirements 2.3, 2.4**
  
  - [ ]* 2.4 Write unit tests for theme edge cases
    - Test empty localStorage (default to light mode)
    - Test corrupted localStorage data
    - Test rapid theme toggling
    - _Requirements: 2.7_

- [ ] 3. Implement and test navigation system
  - [x] 3.1 Create fixed navigation bar component
    - Implement navigation structure with brand and links
    - Add smooth scroll behavior for anchor links
    - Style with fixed positioning and backdrop blur
    - Integrate theme toggle button
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.6_
  
  - [ ]* 3.2 Write property test for navigation link scrolling
    - **Property 3: Navigation Link Scrolling**
    - **Validates: Requirements 1.2**
  
  - [ ]* 3.3 Write unit tests for navigation rendering
    - Test all required links are present
    - Test brand identifier displays correctly
    - Test fixed positioning maintained during scroll
    - _Requirements: 1.3, 1.4, 1.5_

- [ ] 4. Implement and test hero section with typing animation
  - [x] 4.1 Create hero section layout and profile display
    - Implement profile photo with circular styling
    - Add developer name and subtitle
    - Create social links (GitHub, LinkedIn, Email)
    - Add resume download button
    - _Requirements: 3.1, 3.2, 3.7, 4.1, 5.1_
  
  - [x] 4.2 Implement typing animation effect
    - Create state for role cycling (roleIndex, displayText, isDeleting)
    - Implement character-by-character typing logic
    - Add deletion logic with timing
    - Implement role cycling with wrap-around
    - Add blinking cursor animation
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.8_
  
  - [ ]* 4.3 Write property test for typing animation cycles
    - **Property 5: Typing Animation Cycles Through All Roles**
    - **Validates: Requirements 3.3, 3.6**
  
  - [ ]* 4.4 Write property test for character progression
    - **Property 6: Typing Animation Character Progression**
    - **Validates: Requirements 3.4, 3.5**
  
  - [ ]* 4.5 Write property test for external links security
    - **Property 4: External Links Security**
    - **Validates: Requirements 4.2, 4.3, 4.5**
  
  - [ ]* 4.6 Write unit tests for hero section elements
    - Test profile image renders with alt text
    - Test social links have correct hrefs
    - Test resume button has download attribute
    - Test external links open in new tab
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 5.2, 5.3_

- [~] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement and test content sections
  - [x] 6.1 Create About section component
    - Implement section structure with biographical content
    - Add appropriate text formatting and spacing
    - Apply entrance animation class
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 6.2 Write unit tests for About section
    - Test section renders with correct content
    - Test biographical information is present
    - _Requirements: 6.1, 6.2, 6.3_

- [ ] 7. Implement and test work experience timeline
  - [~] 7.1 Create timeline component structure
    - Implement vertical timeline with connecting line
    - Create timeline item cards with dot markers
    - Add company, title, duration, location fields
    - Add optional description field
    - Display technology tags as pills
    - _Requirements: 7.1, 7.4_
  
  - [ ]* 7.2 Write property test for timeline required fields
    - **Property 7: Timeline Items Display Required Fields**
    - **Validates: Requirements 7.2, 7.5**
  
  - [ ]* 7.3 Write property test for chronological ordering
    - **Property 8: Timeline Chronological Ordering**
    - **Validates: Requirements 7.3**
  
  - [ ]* 7.4 Write property test for optional description display
    - **Property 9: Optional Description Display**
    - **Validates: Requirements 7.6**
  
  - [ ]* 7.5 Write unit tests for timeline structure
    - Test timeline line renders
    - Test dot markers present for each item
    - Test technology tags display correctly
    - _Requirements: 7.1, 7.4_

- [ ] 8. Implement and test skills section
  - [~] 8.1 Create skills section with categorized display
    - Implement grid layout for skill categories
    - Create skill bar component with name and percentage
    - Add visual progress bar with gradient fill
    - Set bar width based on proficiency percentage
    - _Requirements: 8.1, 8.5_
  
  - [ ]* 8.2 Write property test for skill bar display
    - **Property 10: Skill Bars Display Name and Proficiency**
    - **Validates: Requirements 8.2, 8.3**
  
  - [ ]* 8.3 Write property test for skill bar width
    - **Property 11: Skill Bar Width Matches Proficiency**
    - **Validates: Requirements 8.4**
  
  - [ ]* 8.4 Write unit tests for skills structure
    - Test categories render correctly
    - Test grid layout structure
    - _Requirements: 8.1, 8.5_

- [ ] 9. Implement and test projects section
  - [~] 9.1 Create project cards with grid layout
    - Implement responsive grid for project cards
    - Add company badge, name, date range
    - Add description and technology tags
    - Implement hover lift effect
    - _Requirements: 9.1, 9.5_
  
  - [ ]* 9.2 Write property test for project card fields
    - **Property 12: Project Cards Display Required Fields**
    - **Validates: Requirements 9.2, 9.3**
  
  - [ ]* 9.3 Write property test for hover effects
    - **Property 15: Hover Effects on Interactive Cards**
    - **Validates: Requirements 9.4, 11.4**
  
  - [ ]* 9.4 Write unit tests for project layout
    - Test grid structure renders
    - Test responsive behavior
    - _Requirements: 9.1, 9.5_

- [ ] 10. Implement and test education and certifications sections
  - [~] 10.1 Create education cards component
    - Implement grid layout for education entries
    - Add institution, degree, field, year range fields
    - Apply card styling
    - _Requirements: 10.1, 10.3_
  
  - [~] 10.2 Create certifications cards component
    - Implement grid layout for certifications
    - Add icon, name, issuer, issue date fields
    - Implement hover lift effect
    - _Requirements: 11.1_
  
  - [ ]* 10.3 Write property test for education card fields
    - **Property 13: Education Cards Display Required Fields**
    - **Validates: Requirements 10.2**
  
  - [ ]* 10.4 Write property test for certification card fields
    - **Property 14: Certification Cards Display Required Fields**
    - **Validates: Requirements 11.2, 11.3**
  
  - [ ]* 10.5 Write unit tests for education and certification layouts
    - Test grid structures render
    - Test responsive behavior
    - Test hover effects on certifications
    - _Requirements: 10.1, 10.3, 11.1_

- [~] 11. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement and test scroll functionality
  - [~] 12.1 Create scroll-to-top button with conditional rendering
    - Add scroll event listener with state update
    - Implement conditional rendering based on scroll position (>500px)
    - Add smooth scroll to top on click
    - Style with fixed positioning in bottom-right
    - Clean up event listener on unmount
    - _Requirements: 12.3, 12.4, 12.5_
  
  - [ ]* 12.2 Write property test for scroll button visibility
    - **Property 16: Scroll Button Visibility Toggle**
    - **Validates: Requirements 12.1, 12.2**
  
  - [ ]* 12.3 Write unit tests for scroll button
    - Test button appears at correct scroll position
    - Test button click scrolls to top
    - Test button positioning
    - _Requirements: 12.3, 12.4, 12.5_

- [ ] 13. Implement and test entrance animations
  - [~] 13.1 Create Intersection Observer for section animations
    - Set up Intersection Observer with 10% threshold
    - Observe all sections with animate-section class
    - Add animate-in class when section enters viewport
    - Ensure animation only triggers once per section
    - Disconnect observer on unmount
    - Add fallback for browsers without Intersection Observer
    - _Requirements: 13.3, 13.5_
  
  - [ ]* 13.2 Write property test for entrance animations
    - **Property 17: Section Entrance Animations**
    - **Validates: Requirements 13.1, 13.2**
  
  - [ ]* 13.3 Write property test for animation idempotence
    - **Property 18: Animation Idempotence**
    - **Validates: Requirements 13.4**
  
  - [ ]* 13.4 Write unit tests for animation setup
    - Test Intersection Observer configuration
    - Test animate-section classes present
    - Test observer cleanup on unmount
    - _Requirements: 13.3, 13.5_

- [ ] 14. Implement and test responsive design
  - [~] 14.1 Add responsive CSS media queries
    - Add mobile breakpoint at 768px
    - Adjust navigation to vertical layout on mobile
    - Reduce font sizes for mobile
    - Convert grids to single column on mobile
    - Adjust timeline spacing for mobile
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [ ]* 14.2 Write unit tests for responsive behavior
    - Test mobile navigation layout
    - Test font size adjustments
    - Test grid column changes
    - Test timeline spacing adjustments
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 15. Implement and test accessibility features
  - [~] 15.1 Add accessibility attributes and semantic HTML
    - Add aria-label to theme toggle button
    - Add aria-label to scroll-to-top button
    - Ensure semantic HTML elements (nav, section, header, footer)
    - Add alt text to profile image
    - Ensure all interactive elements are keyboard accessible
    - _Requirements: 15.1, 15.2, 15.3, 15.4_
  
  - [ ]* 15.2 Write property test for keyboard navigation
    - **Property 19: Keyboard Navigation Support**
    - **Validates: Requirements 15.5**
  
  - [ ]* 15.3 Write unit tests for accessibility
    - Test aria-labels present
    - Test alt text present
    - Test semantic HTML structure
    - Run jest-axe for automated accessibility checks
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [ ] 16. Implement and test SEO and metadata
  - [x] 16.1 Add comprehensive metadata to HTML head
    - Add optimized page title (60-70 characters with primary keywords)
    - Add meta description tag (150-160 characters)
    - Add meta keywords with relevant terms
    - Add meta robots tags (index, follow)
    - Add language and locale meta tags
    - Add author and copyright meta tags
    - Add canonical URL link tag
    - Add Open Graph metadata (og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name)
    - Add Twitter Card metadata (twitter:card, twitter:title, twitter:description, twitter:image)
    - Ensure all URLs are absolute for social sharing
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.9, 16.10, 16.11, 16.12, 16.25_
  
  - [x] 16.2 Implement structured data (JSON-LD schemas)
    - Add Person schema with complete profile information
    - Add ProfessionalService schema for freelance services
    - Add EducationalOrganization schema for tutoring services
    - Add SoftwareApplication schema for each mobile app
    - Add WorkExperience schema for employment history
    - Add BreadcrumbList schema for navigation
    - Add FAQ schema if FAQ section exists
    - Validate all JSON-LD with Google's Structured Data Testing Tool
    - _Requirements: 16.5, 16.6, 16.7, 16.8, 16.22, 16.23, 16.24_
  
  - [x] 16.3 Optimize semantic HTML structure
    - Use proper HTML5 semantic elements (header, nav, main, section, article, footer)
    - Implement proper heading hierarchy (single h1, logical h2-h6 structure)
    - Add ARIA labels for sections (aria-labelledby)
    - Use semantic markup for lists, navigation, and content
    - Ensure proper document outline
    - _Requirements: 16.13, 16.14_
  
  - [x] 16.4 Optimize images for SEO
    - Add descriptive alt text with keywords to all images
    - Include width and height attributes on all images
    - Use descriptive file names (e.g., sanghapal-salave-java-developer.jpg)
    - Implement WebP format with fallbacks
    - Add lazy loading for below-fold images
    - Optimize image file sizes (compress without quality loss)
    - _Requirements: 16.15, 17.11, 17.12_
  
  - [x] 16.5 Optimize links and navigation
    - Use descriptive anchor text with keywords
    - Ensure all internal links work correctly
    - Add rel="noopener noreferrer" to external links
    - Implement proper link structure for crawlability
    - _Requirements: 16.16_
  
  - [x] 16.6 Create sitemap.xml and robots.txt
    - Generate sitemap.xml with all important URLs
    - Include lastmod, changefreq, and priority in sitemap
    - Create robots.txt with proper directives
    - Add sitemap reference to robots.txt
    - Place files in public directory
    - _Requirements: 16.17, 16.18_
  
  - [x] 16.7 Implement performance optimizations for SEO
    - Optimize for Core Web Vitals (LCP, FID, CLS)
    - Add resource hints (preconnect, dns-prefetch, preload)
    - Implement code splitting with React.lazy()
    - Minify CSS and JavaScript in production
    - Enable compression (gzip/brotli)
    - Set explicit dimensions on images to prevent CLS
    - Optimize font loading
    - _Requirements: 17.6, 17.7, 17.8, 17.9, 17.10, 17.13, 17.14, 17.15, 17.16, 17.17_
  
  - [ ]* 16.8 Write unit tests for SEO metadata
    - Test page title exists and contains keywords
    - Test meta description present and within character limit
    - Test Open Graph tags present and valid
    - Test Twitter Card tags present and valid
    - Test all JSON-LD scripts are valid JSON
    - Test canonical URL present and correct
    - Test robots meta tag present
    - Test language meta tags present
    - Test all images have alt text
    - Test proper heading hierarchy (single h1, logical structure)
    - Test semantic HTML elements used correctly
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.9, 16.11, 16.12, 16.13, 16.14, 16.15_
  
  - [ ]* 16.9 Perform SEO audits and validation
    - Run Google Lighthouse SEO audit (target score: 100)
    - Validate structured data with Google's Rich Results Test
    - Test with Google's Mobile-Friendly Test
    - Validate sitemap.xml format
    - Check robots.txt accessibility
    - Verify canonical URLs resolve correctly
    - Test social media preview cards (Facebook, Twitter, LinkedIn)
    - _Requirements: 16.1-16.25, 16.21_

- [ ] 17. Implement and test performance optimizations
  - [~] 17.1 Add performance best practices
    - Verify React 18 usage in package.json
    - Ensure static assets use PUBLIC_URL
    - Add CSS transitions for smooth effects
    - Implement smooth scroll-behavior in CSS
    - Verify event listener cleanup in useEffect
    - Implement lazy loading for images
    - Add resource hints (preconnect, prefetch, preload)
    - Optimize bundle size with code splitting
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.12, 17.14, 17.15_
  
  - [ ]* 17.2 Write property test for event listener cleanup
    - **Property 20: Event Listener Cleanup**
    - **Validates: Requirements 17.5**
  
  - [ ]* 17.3 Write unit tests for performance features
    - Test React version in package.json
    - Test asset paths use PUBLIC_URL
    - Test CSS transitions defined
    - Test smooth scroll-behavior set
    - Test lazy loading attributes on images
    - Test resource hints present in HTML
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.12, 17.15_
  
  - [ ]* 17.4 Run performance audits
    - Run Lighthouse Performance audit (target: 90+ desktop, 80+ mobile)
    - Measure Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
    - Analyze bundle size and identify optimization opportunities
    - Test page load speed on 3G/4G networks
    - Verify image optimization and compression
    - _Requirements: 17.6, 17.7, 17.8, 17.9, 17.10, 17.11_

- [ ] 18. Configure deployment to GitHub Pages
  - [~] 18.1 Set up GitHub Pages deployment configuration
    - Verify homepage URL in package.json
    - Verify gh-pages package installed
    - Verify predeploy and deploy scripts in package.json
    - Test build process produces optimized output
    - _Requirements: 18.1, 18.2, 18.3, 18.4_
  
  - [ ]* 18.2 Write unit tests for deployment configuration
    - Test homepage URL is set
    - Test gh-pages package in devDependencies
    - Test deployment scripts exist
    - Test build script exists
    - _Requirements: 18.1, 18.4_

- [~] 19. Final checkpoint - Run full test suite
  - Ensure all tests pass, ask the user if questions arise.
  - Run unit tests and property tests
  - Verify test coverage meets goals (>80%)
  - Run accessibility audit with jest-axe
  - Run Lighthouse performance audit
  - Verify all 23 correctness properties are tested

- [ ] 20. Implement and test Services section (Freelance availability)
  - [x] 20.1 Create Services section component
    - Implement section structure with "Open to Work" indicator
    - Add availability badge or status display
    - List technologies (Python, Java, AWS, React, JavaScript, etc.)
    - Add service description highlighting freelance capabilities
    - Create call-to-action button for project inquiries
    - Add contact information or link to contact form
    - Apply entrance animation class
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_
  
  - [ ]* 20.2 Write property test for services section display
    - **Property 21: Services Section Display**
    - **Validates: Requirements 19.1, 19.2, 19.3, 19.4**
  
  - [ ]* 20.3 Write unit tests for Services section
    - Test section renders with all required elements
    - Test availability badge displays correctly
    - Test technology tags render
    - Test call-to-action button has correct link
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [ ] 21. Implement and test Tutoring section (Java learning)
  - [x] 21.1 Create Tutoring section component
    - Implement section structure for Java tutoring services
    - Add heading and service description
    - Indicate paid service and one-on-one call format
    - Add pricing information or "Contact for pricing" note
    - Highlight Java expertise and teaching approach
    - Create scheduling/booking call-to-action (calendar link, contact form, or email)
    - Apply entrance animation class
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_
  
  - [ ]* 21.2 Write property test for tutoring section display
    - **Property 22: Tutoring Section Display**
    - **Validates: Requirements 20.1, 20.2, 20.3, 20.4**
  
  - [ ]* 21.3 Write unit tests for Tutoring section
    - Test section renders with all required elements
    - Test paid service indication is clear
    - Test scheduling call-to-action has correct link
    - Test Java expertise highlights display
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [ ] 22. Implement and test Mobile Apps section (App showcase)
  - [x] 22.1 Create Mobile Apps section component
    - Implement card-based or gallery layout for apps
    - Add app name, description, and screenshots for each app
    - Display technology stack tags for each app
    - Add platform badges (iOS, Android, Web)
    - Include app store links (Google Play, App Store) where applicable
    - Add demo video or interactive preview support
    - Implement responsive image display
    - Apply entrance animation class
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7_
  
  - [~] 22.2 Add screenshot carousel or lightbox functionality
    - Implement image carousel for multiple screenshots
    - Add lightbox/modal for full-size image viewing
    - Include navigation controls (prev/next)
    - Add smooth transitions between images
    - _Requirements: 21.2, 21.5_
  
  - [ ]* 22.3 Write property test for mobile app card fields
    - **Property 23: Mobile App Cards Display Required Fields**
    - **Validates: Requirements 21.2, 21.3, 21.4**
  
  - [ ]* 22.4 Write unit tests for Mobile Apps section
    - Test app cards render with all required fields
    - Test screenshot display and carousel functionality
    - Test platform badges display correctly
    - Test app store links have correct URLs
    - Test responsive layout behavior
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.6, 21.7_

- [ ] 23. Update navigation to include new sections
  - [~] 23.1 Add navigation links for new sections
    - Add "Services" link to navigation bar
    - Add "Tutoring" link to navigation bar
    - Add "Mobile Apps" link to navigation bar
    - Ensure smooth scroll behavior works for new sections
    - Update navigation styling if needed for additional links
    - Test responsive navigation with new links
    - _Requirements: 1.2, 1.3, 19.1, 20.1, 21.1_
  
  - [ ]* 23.2 Write unit tests for updated navigation
    - Test all new navigation links are present
    - Test navigation links scroll to correct sections
    - Test responsive behavior with additional links
    - _Requirements: 1.2, 1.3_

- [~] 24. Final integration and testing
  - Ensure all tests pass, ask the user if questions arise.
  - Run full test suite including new sections
  - Verify all 23 correctness properties are tested
  - Test complete user flow including new sections
  - Verify responsive behavior across all sections
  - Run accessibility audit on new sections
  - Test entrance animations for new sections
  - Run comprehensive SEO audit (Lighthouse SEO score: 100)
  - Validate all structured data with Google Rich Results Test
  - Test Core Web Vitals meet targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
  - Verify mobile-friendliness with Google Mobile-Friendly Test
  - Test social media preview cards on Facebook, Twitter, LinkedIn
  - Validate sitemap.xml and robots.txt
  - Check page load performance on slow networks

- [ ] 25. Integration and documentation
  - [~] 25.1 Create integration tests for user flows
    - Test complete page load and navigation flow
    - Test theme toggle persistence across reloads
    - Test scroll behavior and scroll-to-top
    - Test animation triggers during scroll
    - Test responsive behavior at different viewports
  
  - [~] 25.2 Update project documentation
    - Document testing approach and coverage
    - Document component architecture
    - Document deployment process
    - Add contributing guidelines for future enhancements
    - Document SEO strategy and implementation
    - Document performance optimization techniques
    - Add guide for updating structured data
    - Add guide for maintaining SEO best practices

## Notes

- Tasks marked with `*` are optional and can be skipped for faster iteration
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout development
- Property tests validate universal correctness properties with 100+ iterations each
- Unit tests validate specific examples, edge cases, and component behavior
- The dual testing approach (unit + property tests) provides comprehensive coverage
- All property tests must be tagged with: `Feature: portfolio-website, Property N: [description]`
- Event listener cleanup is critical for preventing memory leaks
- Accessibility testing includes both automated (jest-axe) and manual verification
- Performance testing should be done with Lighthouse and React DevTools Profiler
- New sections (Services, Tutoring, Mobile Apps) follow the same patterns as existing sections
- Screenshot carousel/lightbox can use existing libraries (react-image-lightbox, react-slick, etc.)
- Mobile app showcase should support various media types (images, videos, interactive demos)
- SEO is critical: Target Lighthouse SEO score of 100
- All structured data must be validated with Google's Rich Results Test
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Images should be optimized (WebP with fallbacks, lazy loading, proper dimensions)
- Use descriptive keywords naturally in content, headings, and alt text
- Sitemap.xml and robots.txt must be properly configured
- Test social media preview cards before deployment
- Performance optimization is ongoing - monitor with Lighthouse and Core Web Vitals

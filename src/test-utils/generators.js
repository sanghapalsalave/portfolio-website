/**
 * Property-Based Test Generators
 * 
 * This module provides fast-check generators for creating test data
 * for property-based testing of the portfolio website.
 */

import fc from 'fast-check';

/**
 * Generator for theme preferences (boolean)
 */
export const themeArbitrary = fc.boolean();

/**
 * Generator for scroll positions (0 to 10000 pixels)
 */
export const scrollPositionArbitrary = fc.integer({ min: 0, max: 10000 });

/**
 * Generator for role titles (non-empty strings)
 */
export const roleTitleArbitrary = fc.string({ minLength: 1, maxLength: 50 });

/**
 * Generator for arrays of role titles
 */
export const roleArrayArbitrary = fc.array(roleTitleArbitrary, { minLength: 1, maxLength: 10 });

/**
 * Generator for timeline items
 */
export const timelineItemArbitrary = fc.record({
  title: fc.string({ minLength: 1, maxLength: 100 }),
  company: fc.string({ minLength: 1, maxLength: 100 }),
  dateRange: fc.string({ minLength: 1, maxLength: 50 }),
  location: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.option(fc.string({ minLength: 0, maxLength: 500 })),
  skills: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 0, maxLength: 10 }),
});

/**
 * Generator for arrays of timeline items
 */
export const timelineArrayArbitrary = fc.array(timelineItemArbitrary, { minLength: 1, maxLength: 10 });

/**
 * Generator for skill objects
 */
export const skillArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 50 }),
  proficiency: fc.integer({ min: 0, max: 100 }),
});

/**
 * Generator for skill categories
 */
export const skillCategoryArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 50 }),
  skills: fc.array(skillArbitrary, { minLength: 1, maxLength: 10 }),
});

/**
 * Generator for arrays of skill categories
 */
export const skillCategoriesArbitrary = fc.array(skillCategoryArbitrary, { minLength: 1, maxLength: 5 });

/**
 * Generator for project objects
 */
export const projectArbitrary = fc.record({
  badge: fc.string({ minLength: 1, maxLength: 50 }),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  dateRange: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
});

/**
 * Generator for arrays of projects
 */
export const projectArrayArbitrary = fc.array(projectArbitrary, { minLength: 1, maxLength: 10 });

/**
 * Generator for education objects
 */
export const educationArbitrary = fc.record({
  institution: fc.string({ minLength: 1, maxLength: 100 }),
  degree: fc.string({ minLength: 1, maxLength: 100 }),
  field: fc.string({ minLength: 1, maxLength: 100 }),
  years: fc.string({ minLength: 1, maxLength: 50 }),
});

/**
 * Generator for arrays of education entries
 */
export const educationArrayArbitrary = fc.array(educationArbitrary, { minLength: 1, maxLength: 5 });

/**
 * Generator for certification objects
 */
export const certificationArbitrary = fc.record({
  icon: fc.string({ minLength: 1, maxLength: 10 }),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  issuer: fc.string({ minLength: 1, maxLength: 100 }),
  issueDate: fc.string({ minLength: 1, maxLength: 50 }),
});

/**
 * Generator for arrays of certifications
 */
export const certificationArrayArbitrary = fc.array(certificationArbitrary, { minLength: 1, maxLength: 10 });

/**
 * Generator for navigation links
 */
export const navigationLinkArbitrary = fc.record({
  text: fc.string({ minLength: 1, maxLength: 50 }),
  href: fc.string({ minLength: 1, maxLength: 100 }).map(s => `#${s}`),
});

/**
 * Generator for arrays of navigation links
 */
export const navigationLinksArbitrary = fc.array(navigationLinkArbitrary, { minLength: 1, maxLength: 10 });

/**
 * Generator for social links
 */
export const socialLinkArbitrary = fc.record({
  text: fc.string({ minLength: 1, maxLength: 50 }),
  href: fc.webUrl(),
  external: fc.boolean(),
  rel: fc.option(fc.constant('noopener noreferrer')),
});

/**
 * Generator for arrays of social links
 */
export const socialLinksArbitrary = fc.array(socialLinkArbitrary, { minLength: 1, maxLength: 5 });

/**
 * Generator for services section data
 */
export const servicesDataArbitrary = fc.record({
  title: fc.string({ minLength: 1, maxLength: 100 }),
  availability: fc.record({
    status: fc.string({ minLength: 1, maxLength: 50 }),
    badge: fc.boolean(),
  }),
  technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 15 }),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  callToAction: fc.record({
    text: fc.string({ minLength: 1, maxLength: 50 }),
    link: fc.webUrl(),
  }),
});

/**
 * Generator for tutoring section data
 */
export const tutoringDataArbitrary = fc.record({
  title: fc.string({ minLength: 1, maxLength: 100 }),
  subject: fc.string({ minLength: 1, maxLength: 50 }),
  format: fc.string({ minLength: 1, maxLength: 100 }),
  pricing: fc.record({
    isPaid: fc.boolean(),
    details: fc.option(fc.string({ minLength: 1, maxLength: 100 })),
  }),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  booking: fc.record({
    text: fc.string({ minLength: 1, maxLength: 50 }),
    link: fc.webUrl(),
  }),
});

/**
 * Generator for mobile app platform
 */
export const platformArbitrary = fc.record({
  name: fc.constantFrom('iOS', 'Android', 'Web'),
  icon: fc.string({ minLength: 1, maxLength: 10 }),
});

/**
 * Generator for mobile app link
 */
export const appLinkArbitrary = fc.record({
  type: fc.constantFrom('App Store', 'Google Play', 'Demo', 'GitHub'),
  url: fc.webUrl(),
  icon: fc.string({ minLength: 1, maxLength: 10 }),
});

/**
 * Generator for mobile app objects
 */
export const mobileAppArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  screenshots: fc.array(fc.webUrl(), { minLength: 1, maxLength: 5 }),
  technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
  platforms: fc.array(platformArbitrary, { minLength: 1, maxLength: 3 }),
  links: fc.array(appLinkArbitrary, { minLength: 1, maxLength: 4 }),
  featured: fc.option(fc.boolean()),
});

/**
 * Generator for arrays of mobile apps
 */
export const mobileAppArrayArbitrary = fc.array(mobileAppArbitrary, { minLength: 1, maxLength: 10 });

/**
 * Generator for localStorage data (can be valid JSON or corrupted)
 */
export const localStorageDataArbitrary = fc.oneof(
  fc.constant(null),
  fc.constant(''),
  fc.constant('invalid json'),
  fc.constant('true'),
  fc.constant('false'),
  fc.boolean().map(b => JSON.stringify(b)),
);

/**
 * Generator for viewport dimensions
 */
export const viewportArbitrary = fc.record({
  width: fc.integer({ min: 320, max: 2560 }),
  height: fc.integer({ min: 568, max: 1440 }),
});

/**
 * Generator for animation timing (in milliseconds)
 */
export const animationTimingArbitrary = fc.integer({ min: 0, max: 5000 });

/**
 * Generator for proficiency percentages (0-100)
 */
export const proficiencyArbitrary = fc.integer({ min: 0, max: 100 });

/**
 * Generator for dates (as strings)
 */
export const dateStringArbitrary = fc.date().map(d => d.toISOString().split('T')[0]);

/**
 * Generator for date ranges
 */
export const dateRangeArbitrary = fc.tuple(dateStringArbitrary, dateStringArbitrary)
  .map(([start, end]) => `${start} - ${end}`);

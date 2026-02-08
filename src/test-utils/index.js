/**
 * Test Utils Index
 * 
 * Central export point for all test utilities, generators, and custom matchers.
 */

// Export test helpers
export {
  renderWithProviders,
  LocalStorageMock,
  setupLocalStorageMock,
  IntersectionObserverMock,
  setupIntersectionObserverMock,
  waitForCondition,
  simulateScroll,
  cleanupAfterTest,
} from './testHelpers';

// Export generators
export {
  themeArbitrary,
  scrollPositionArbitrary,
  roleTitleArbitrary,
  roleArrayArbitrary,
  timelineItemArbitrary,
  timelineArrayArbitrary,
  skillArbitrary,
  skillCategoryArbitrary,
  skillCategoriesArbitrary,
  projectArbitrary,
  projectArrayArbitrary,
  educationArbitrary,
  educationArrayArbitrary,
  certificationArbitrary,
  certificationArrayArbitrary,
  navigationLinkArbitrary,
  navigationLinksArbitrary,
  socialLinkArbitrary,
  socialLinksArbitrary,
  servicesDataArbitrary,
  tutoringDataArbitrary,
  platformArbitrary,
  appLinkArbitrary,
  mobileAppArbitrary,
  mobileAppArrayArbitrary,
  localStorageDataArbitrary,
  viewportArbitrary,
  animationTimingArbitrary,
  proficiencyArbitrary,
  dateStringArbitrary,
  dateRangeArbitrary,
} from './generators';

// Export custom matchers
export { customMatchers } from './customMatchers';

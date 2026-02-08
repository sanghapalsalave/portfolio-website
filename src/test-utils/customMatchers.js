/**
 * Custom Jest Matchers for Portfolio Website Testing
 * 
 * This module provides custom matchers for common assertions
 * specific to the portfolio website.
 */

/**
 * Check if an element has a specific CSS class
 */
export const toHaveClass = {
  toHaveClass(received, className) {
    const pass = received.classList.contains(className);
    
    if (pass) {
      return {
        message: () => `expected element not to have class "${className}"`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to have class "${className}", but it has classes: ${Array.from(received.classList).join(', ')}`,
        pass: false,
      };
    }
  },
};

/**
 * Check if an element has external link security attributes
 */
export const toHaveSecureExternalLink = {
  toHaveSecureExternalLink(received) {
    const hasTarget = received.getAttribute('target') === '_blank';
    const hasRel = received.getAttribute('rel') === 'noopener noreferrer';
    const pass = hasTarget && hasRel;
    
    if (pass) {
      return {
        message: () => `expected element not to have secure external link attributes`,
        pass: true,
      };
    } else {
      const missing = [];
      if (!hasTarget) missing.push('target="_blank"');
      if (!hasRel) missing.push('rel="noopener noreferrer"');
      
      return {
        message: () => `expected element to have secure external link attributes, missing: ${missing.join(', ')}`,
        pass: false,
      };
    }
  },
};

/**
 * Check if a skill bar has the correct width based on proficiency
 */
export const toHaveCorrectSkillBarWidth = {
  toHaveCorrectSkillBarWidth(received, proficiency) {
    const style = window.getComputedStyle(received);
    const width = style.width;
    const expectedWidth = `${proficiency}%`;
    
    // Check if width is set as percentage or if the element has a width style
    const widthStyle = received.style.width;
    const pass = widthStyle === expectedWidth || width.includes(String(proficiency));
    
    if (pass) {
      return {
        message: () => `expected skill bar not to have width ${expectedWidth}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected skill bar to have width ${expectedWidth}, but got ${widthStyle || width}`,
        pass: false,
      };
    }
  },
};

/**
 * Check if an element is visible in the viewport
 */
export const toBeInViewport = {
  toBeInViewport(received) {
    const rect = received.getBoundingClientRect();
    const pass = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (pass) {
      return {
        message: () => `expected element not to be in viewport`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to be in viewport, but it's at position (${rect.top}, ${rect.left})`,
        pass: false,
      };
    }
  },
};

/**
 * Check if an element has an aria-label attribute
 */
export const toHaveAriaLabel = {
  toHaveAriaLabel(received, expectedLabel) {
    const ariaLabel = received.getAttribute('aria-label');
    const pass = expectedLabel ? ariaLabel === expectedLabel : ariaLabel !== null;
    
    if (pass) {
      return {
        message: () => expectedLabel 
          ? `expected element not to have aria-label "${expectedLabel}"`
          : `expected element not to have aria-label`,
        pass: true,
      };
    } else {
      return {
        message: () => expectedLabel
          ? `expected element to have aria-label "${expectedLabel}", but got "${ariaLabel}"`
          : `expected element to have aria-label, but it doesn't`,
        pass: false,
      };
    }
  },
};

/**
 * Check if timeline items are in reverse chronological order
 */
export const toBeInReverseChronologicalOrder = {
  toBeInReverseChronologicalOrder(received) {
    // Received should be an array of items with date information
    if (!Array.isArray(received) || received.length < 2) {
      return {
        message: () => `expected an array with at least 2 items`,
        pass: false,
      };
    }
    
    // Check if each item's date is greater than or equal to the next
    let pass = true;
    for (let i = 0; i < received.length - 1; i++) {
      const currentDate = new Date(received[i].startDate || received[i].dateRange);
      const nextDate = new Date(received[i + 1].startDate || received[i + 1].dateRange);
      
      if (currentDate < nextDate) {
        pass = false;
        break;
      }
    }
    
    if (pass) {
      return {
        message: () => `expected items not to be in reverse chronological order`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected items to be in reverse chronological order (most recent first)`,
        pass: false,
      };
    }
  },
};

/**
 * Check if an element has a hover effect (transform or box-shadow)
 */
export const toHaveHoverEffect = {
  toHaveHoverEffect(received) {
    const style = window.getComputedStyle(received);
    const hasTransform = style.transform && style.transform !== 'none';
    const hasBoxShadow = style.boxShadow && style.boxShadow !== 'none';
    const hasTransition = style.transition && style.transition !== 'none';
    
    const pass = (hasTransform || hasBoxShadow) && hasTransition;
    
    if (pass) {
      return {
        message: () => `expected element not to have hover effect`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to have hover effect (transform or box-shadow with transition)`,
        pass: false,
      };
    }
  },
};

/**
 * Check if an element is keyboard accessible (has tabindex or is naturally focusable)
 */
export const toBeKeyboardAccessible = {
  toBeKeyboardAccessible(received) {
    const tagName = received.tagName.toLowerCase();
    const naturallyFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
    const hasTabIndex = received.hasAttribute('tabindex') && received.getAttribute('tabindex') !== '-1';
    
    const pass = naturallyFocusable || hasTabIndex;
    
    if (pass) {
      return {
        message: () => `expected element not to be keyboard accessible`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to be keyboard accessible (naturally focusable or has tabindex)`,
        pass: false,
      };
    }
  },
};

/**
 * Export all custom matchers
 */
export const customMatchers = {
  ...toHaveClass,
  ...toHaveSecureExternalLink,
  ...toHaveCorrectSkillBarWidth,
  ...toBeInViewport,
  ...toHaveAriaLabel,
  ...toBeInReverseChronologicalOrder,
  ...toHaveHoverEffect,
  ...toBeKeyboardAccessible,
};

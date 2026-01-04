/**
 * Shared utilities and constants for the Design Library
 */

// Common inline styles used across components
export const SANS = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;';
export const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;';

// Category icon mapping
export const CATEGORY_ICONS = {
  'All': '<svg width="16" height="16" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  'Developer': '<svg width="16" height="16" fill="none" stroke="currentColor"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  'UI Elements': '<svg width="16" height="16" fill="none" stroke="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  'Documentation': '<svg width="16" height="16" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  'Marketing': '<svg width="16" height="16" fill="none" stroke="currentColor"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>',
  'Data Viz': '<svg width="16" height="16" fill="none" stroke="currentColor"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  'Social': '<svg width="16" height="16" fill="none" stroke="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
  'Navigation': '<svg width="16" height="16" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>',
  'GitHub Profile': '<svg width="16" height="16" fill="none" stroke="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
  'Skill Visualization': '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M8 2 L8 8 L12 8"/></svg>',
  'Advanced Animations': '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8 Q8 2 13 8 T23 8" stroke-linecap="round"/><path d="M3 12 Q8 6 13 12 T23 12" stroke-linecap="round" opacity="0.5"/></svg>',
  'Project Showcases': '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M6 13 L6 16"/><path d="M10 13 L10 16"/><path d="M4 16 L12 16"/></svg>',
  'Contact & Social': '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5 L4 3 C4 2 5 1 6 1 L10 1 C11 1 12 2 12 3 L12 5"/><rect x="2" y="5" width="12" height="9" rx="2"/><path d="M8 9 L8 11"/></svg>',
  'Creative & Fun': '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M5 6 L5 6"/><path d="M11 6 L11 6"/><path d="M5 10 Q8 12 11 10" stroke-linecap="round"/></svg>',
  'Analytics & Metrics': '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,12 5,9 8,11 11,6 14,8"/><circle cx="5" cy="9" r="1" fill="currentColor"/><circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="11" cy="6" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/></svg>'
};

/**
 * Get icon SVG for a category
 * @param {string} category - Category name
 * @returns {string} SVG markup
 */
export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || '';
}

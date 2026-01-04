/**
 * Component Library Index
 * 
 * This file aggregates all component categories into a single library array.
 * To add a new category:
 * 1. Create a new file in this directory (e.g., my-category.js)
 * 2. Export an array of components from that file
 * 3. Import and spread it into the library array below
 */

import { developerComponents } from './developer.js';
import { uiElementsComponents } from './ui-elements.js';
import { documentationComponents } from './documentation.js';
import { marketingComponents } from './marketing.js';
import { dataVizComponents } from './data-viz.js';
import { socialComponents } from './social.js';
import { navigationComponents } from './navigation.js';
import { githubProfileComponents } from './github-profile.js';
import { skillVisualizationComponents } from './skill-visualization.js';
import { advancedAnimationsComponents } from './advanced-animations.js';
import { projectShowcasesComponents } from './project-showcases.js';
import { contactSocialComponents } from './contact-social.js';
import { creativeFunComponents } from './creative-fun.js';
import { analyticsMetricsComponents } from './analytics-metrics.js';

// Combine all component categories into a single library
export const library = [
  ...developerComponents,
  ...uiElementsComponents,
  ...documentationComponents,
  ...marketingComponents,
  ...dataVizComponents,
  ...socialComponents,
  ...navigationComponents,
  ...githubProfileComponents,
  ...skillVisualizationComponents,
  ...advancedAnimationsComponents,
  ...projectShowcasesComponents,
  ...contactSocialComponents,
  ...creativeFunComponents,
  ...analyticsMetricsComponents
];

// Get unique categories from the library
export function getCategories() {
  const categories = [...new Set(library.map(item => item.category))];
  return ['All', ...categories];
}

// Get component count by category
export function getComponentCount(category) {
  if (category === 'All') return library.length;
  return library.filter(item => item.category === category).length;
}

// Find component by ID
export function findComponent(id) {
  return library.find(item => item.id === id);
}

// Filter components
export function filterComponents({ category = 'All', searchQuery = '', favorites = [], showFavoritesOnly = false }) {
  return library.filter(item => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFav = !showFavoritesOnly || favorites.includes(item.id);
    return matchCat && matchSearch && matchFav;
  });
}

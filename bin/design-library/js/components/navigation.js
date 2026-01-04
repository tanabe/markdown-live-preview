/**
 * Navigation Components
 */
import { SANS, MONO } from '../utils.js';

export const navigationComponents = [
  {
    id: 'nav-breadcrumbs',
    category: 'Navigation',
    title: 'Breadcrumbs',
    description: 'Path navigation helper.',
    code: `<nav style="${SANS} font-size: 14px; color: #6b7280;">
  <span style="color: #3b82f6; cursor: pointer;">Home</span> 
  <span style="margin: 0 8px;">/</span> 
  <span style="color: #3b82f6; cursor: pointer;">Products</span> 
  <span style="margin: 0 8px;">/</span> 
  <span style="color: #111827;">Electronics</span>
</nav>`
  },
  {
    id: 'nav-pagination',
    category: 'Navigation',
    title: 'Pagination',
    description: 'Page number selectors.',
    code: `<div style="display: flex; gap: 4px; ${SANS}">
  <button style="padding: 6px 12px; border: 1px solid #e5e7eb; background: white; border-radius: 4px; color: #374151; cursor: pointer;">Prev</button>
  <button style="padding: 6px 12px; border: 1px solid #e5e7eb; background: #f3f4f6; border-radius: 4px; color: #374151; font-weight: bold;">1</button>
  <button style="padding: 6px 12px; border: 1px solid #e5e7eb; background: white; border-radius: 4px; color: #374151; cursor: pointer;">2</button>
  <button style="padding: 6px 12px; border: 1px solid #e5e7eb; background: white; border-radius: 4px; color: #374151; cursor: pointer;">3</button>
  <span style="padding: 6px 10px; color: #6b7280;">...</span>
  <button style="padding: 6px 12px; border: 1px solid #e5e7eb; background: white; border-radius: 4px; color: #374151; cursor: pointer;">Next</button>
</div>`
  }
];

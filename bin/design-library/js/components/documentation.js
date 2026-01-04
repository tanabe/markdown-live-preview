/**
 * Documentation Components
 */
import { SANS, MONO } from '../utils.js';

export const documentationComponents = [
  {
    id: 'doc-note-box',
    category: 'Documentation',
    title: 'Modern Note Box',
    description: 'A clean, purple-accented box for side notes.',
    code: `<div style="background: #fdf2f8; border-left: 4px solid #db2777; padding: 16px; border-radius: 0 8px 8px 0; color: #831843; ${SANS}">
  <strong style="display: block; margin-bottom: 4px;">💡 Pro Tip</strong>
  You can customize this color by changing the hex codes in the style tag.
</div>`
  },
  {
    id: 'doc-warning',
    category: 'Documentation',
    title: 'Critical Warning',
    description: 'Red alert box for dangerous actions.',
    code: `<div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 16px; border-radius: 8px; display: flex; gap: 12px; align-items: flex-start; ${SANS}">
  <span style="font-size: 20px;">⚠️</span>
  <div>
    <strong style="display: block; margin-bottom: 4px;">Caution Needed</strong>
    Deleting this database is irreversible. Please create a backup first.
  </div>
</div>`
  },
  {
    id: 'doc-timeline',
    category: 'Documentation',
    title: 'Vertical Timeline',
    description: 'Great for changelogs or history.',
    code: `<div style="${SANS} padding-left: 20px;">
  <div style="border-left: 2px solid #e5e7eb; padding-left: 20px; padding-bottom: 30px; position: relative;">
    <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: #3b82f6; border-radius: 50%;"></div>
    <div style="font-weight: bold; color: #374151;">v2.0.0 - Released</div>
    <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">Major overhaul of the UI system.</div>
  </div>
  <div style="border-left: 2px solid #e5e7eb; padding-left: 20px; position: relative;">
    <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: #d1d5db; border-radius: 50%;"></div>
    <div style="font-weight: bold; color: #374151;">v1.5.0 - Beta</div>
    <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">Added support for dark mode.</div>
  </div>
</div>`
  },
  {
    id: 'doc-quote',
    category: 'Documentation',
    title: 'Elegant Quote',
    description: 'Serif font quote with decoration.',
    code: `<blockquote style="font-family: Georgia, serif; font-size: 18px; font-style: italic; color: #555; border-left: 4px solid #3b82f6; margin: 20px 0; padding: 10px 20px; background: #f9fafb;">
  "Simplicity is the ultimate sophistication."
  <footer style="margin-top: 10px; font-size: 14px; color: #999; font-family: sans-serif; font-style: normal;">— Leonardo da Vinci</footer>
</blockquote>`
  },
  {
    id: 'doc-highlight',
    category: 'Documentation',
    title: 'Gradient Highlight',
    description: 'Text highlighting effect.',
    code: `<span style="background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); padding: 2px 6px; border-radius: 4px; color: #004d40; font-weight: 600; ${SANS}">Important Concept</span>`
  }
];

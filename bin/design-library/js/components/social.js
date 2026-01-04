/**
 * Social Components
 */
import { SANS, MONO } from '../utils.js';

export const socialComponents = [
  {
    id: 'soc-tweet',
    category: 'Social',
    title: 'Mock Tweet',
    description: 'Static representation of a social media post.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; max-width: 500px; ${SANS}">
  <div style="display: flex; gap: 10px; margin-bottom: 12px;">
    <div style="width: 48px; height: 48px; background: #3b82f6; border-radius: 50%;"></div>
    <div>
      <div style="font-weight: 700; color: #111827;">Markdown Fan</div>
      <div style="color: #6b7280; font-size: 14px;">@markdown_fan</div>
    </div>
  </div>
  <p style="color: #374151; margin-bottom: 12px; line-height: 1.5;">Just discovered this amazing markdown preview tool. The live rendering is buttery smooth! 🧈✨ #webdev #markdown</p>
  <div style="color: #6b7280; font-size: 13px;">10:24 AM · Jan 1, 2026</div>
</div>`
  }
];

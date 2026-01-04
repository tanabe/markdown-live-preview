/**
 * UI Elements Components
 */
import { SANS, MONO } from '../utils.js';

export const uiElementsComponents = [
  {
    id: 'ui-glass-card',
    category: 'UI Elements',
    title: 'Glassmorphism Card',
    description: 'Trendy frosted glass effect. Best on colorful backgrounds.',
    code: `<div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; padding: 24px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); color: #333; ${SANS} max-width: 320px;">
  <h3 style="margin: 0 0 8px 0;">🧊 Frosty Effect</h3>
  <p style="margin: 0; font-size: 14px; opacity: 0.8;">This card uses backdrop-filter to create a beautiful glass-like appearance.</p>
</div>`
  },
  {
    id: 'ui-neon-btn',
    category: 'UI Elements',
    title: 'Neon Gradient Button',
    description: 'High energy button for CTAs.',
    code: `<button style="background: linear-gradient(90deg, #ff00cc, #333399); color: white; border: none; padding: 12px 28px; border-radius: 25px; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 5px 15px rgba(244, 0, 204, 0.4); text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s; ${SANS}">
  Launch Now 🚀
</button>`
  },
  {
    id: 'ui-profile-card',
    category: 'UI Elements',
    title: 'User Profile Card',
    description: 'Avatar with bio and stats.',
    code: `<div style="background: white; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); max-width: 280px; ${SANS}">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid #f0f0f0; margin-bottom: 12px;">
  <h3 style="margin: 0; color: #333;">Alex Developer</h3>
  <p style="margin: 5px 0 15px; color: #666; font-size: 14px;">Frontend Engineer</p>
  <div style="display: flex; justify-content: center; gap: 15px; padding-top: 15px; border-top: 1px solid #eee;">
    <div><strong style="display: block; font-size: 18px; color: #333;">12</strong><span style="font-size: 12px; color: #888;">Projects</span></div>
    <div><strong style="display: block; font-size: 18px; color: #333;">5.2k</strong><span style="font-size: 12px; color: #888;">Followers</span></div>
  </div>
</div>`
  },
  {
    id: 'ui-step-progress',
    category: 'UI Elements',
    title: 'Step Progress',
    description: 'Horizontal progress tracker.',
    code: `<div style="display: flex; align-items: center; ${SANS} max-width: 400px;">
  <div style="background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">1</div>
  <div style="flex: 1; height: 3px; background: #3b82f6; margin: 0 10px;"></div>
  <div style="background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">2</div>
  <div style="flex: 1; height: 3px; background: #e5e7eb; margin: 0 10px;"></div>
  <div style="background: #fff; border: 2px solid #e5e7eb; color: #9ca3af; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">3</div>
</div>`
  },
  {
    id: 'ui-accordion',
    category: 'UI Elements',
    title: 'Simple Accordion',
    description: 'Interactive-looking details/summary element.',
    code: `<details style="${SANS} background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
  <summary style="padding: 15px; cursor: pointer; font-weight: 600; color: #374151; background: #f9fafb;">What is the refund policy?</summary>
  <div style="padding: 15px; color: #4b5563; line-height: 1.6; border-top: 1px solid #e5e7eb;">
    We offer a full refund within 30 days of purchase. No questions asked.
  </div>
</details>`
  }
];

/**
 * Contact & Social Components
 */
import { SANS, MONO } from '../utils.js';

export const contactSocialComponents = [
  {
    id: 'contact-social-row',
    category: 'Contact & Social',
    title: 'Social Media Row',
    description: 'Horizontal social media links.',
    code: `<div align="center" style="padding: 20px;">
  <a href="https://github.com/" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://linkedin.com/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://twitter.com/" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" />
  </a>
  <a href="https://discord.com/" target="_blank">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
  </a>
</div>`
  },
  {
    id: 'contact-email-card',
    category: 'Contact & Social',
    title: 'Email Contact Card',
    description: 'Professional email contact box.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px; text-align: center; color: white; max-width: 400px; margin: 20px auto;">
  <div style="font-size: 48px; margin-bottom: 15px;">📧</div>
  <h3 style="margin: 0 0 10px 0;">Let's Connect!</h3>
  <p style="margin: 0 0 20px 0; opacity: 0.9; font-size: 14px;">Have a project in mind? Drop me an email!</p>
  <a href="mailto:hello@example.com" style="display: inline-block; background: white; color: #667eea; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 700;">Email Me</a>
</div>`
  },
  {
    id: 'contact-availability',
    category: 'Contact & Social',
    title: 'Availability Status',
    description: 'Show your current availability for freelance or job opportunities.',
    code: `<div style="${SANS} background: #ecfdf5; border: 2px solid #10b981; padding: 16px 24px; border-radius: 12px; display: inline-flex; align-items: center; gap: 12px;">
  <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2); animation: pulse 2s infinite;"></div>
  <div>
    <div style="font-weight: 700; color: #065f46;">Available for Freelance</div>
    <div style="font-size: 13px; color: #047857;">Open to exciting projects!</div>
  </div>
</div>
<style>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>`
  }
];

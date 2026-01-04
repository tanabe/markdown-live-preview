/**
 * Skill Visualization Components
 */
import { SANS, MONO } from '../utils.js';

export const skillVisualizationComponents = [
  {
    id: 'skill-progress-bars',
    category: 'Skill Visualization',
    title: 'Skill Progress Bars',
    description: 'Animated progress bars for skill levels.',
    code: `<div style="${SANS}">
  <div style="margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
      <span style="font-weight: 600; color: #333;">JavaScript</span>
      <span style="color: #666;">90%</span>
    </div>
    <div style="background: #e0e0e0; border-radius: 10px; height: 8px; overflow: hidden;">
      <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; width: 90%; transition: width 1s;"></div>
    </div>
  </div>
  <div style="margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
      <span style="font-weight: 600; color: #333;">React</span>
      <span style="color: #666;">85%</span>
    </div>
    <div style="background: #e0e0e0; border-radius: 10px; height: 8px; overflow: hidden;">
      <div style="background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); height: 100%; width: 85%; transition: width 1s;"></div>
    </div>
  </div>
  <div style="margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
      <span style="font-weight: 600; color: #333;">Node.js</span>
      <span style="color: #666;">80%</span>
    </div>
    <div style="background: #e0e0e0; border-radius: 10px; height: 8px; overflow: hidden;">
      <div style="background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); height: 100%; width: 80%; transition: width 1s;"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'skill-circular',
    category: 'Skill Visualization',
    title: 'Circular Skill Rings',
    description: 'Modern circular progress indicators.',
    code: `<div style="${SANS} display: flex; gap: 30px; justify-content: center; padding: 20px;">
  <div style="text-align: center;">
    <svg width="100" height="100" style="transform: rotate(-90deg);">
      <circle cx="50" cy="50" r="40" stroke="#e0e0e0" stroke-width="8" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="#667eea" stroke-width="8" fill="none" stroke-dasharray="251" stroke-dashoffset="50" stroke-linecap="round" />
    </svg>
    <div style="margin-top: 10px; font-weight: 600; color: #333;">Python</div>
    <div style="color: #666; font-size: 14px;">80%</div>
  </div>
  <div style="text-align: center;">
    <svg width="100" height="100" style="transform: rotate(-90deg);">
      <circle cx="50" cy="50" r="40" stroke="#e0e0e0" stroke-width="8" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="#f5576c" stroke-width="8" fill="none" stroke-dasharray="251" stroke-dashoffset="75" stroke-linecap="round" />
    </svg>
    <div style="margin-top: 10px; font-weight: 600; color: #333;">Design</div>
    <div style="color: #666; font-size: 14px;">70%</div>
  </div>
</div>`
  },
  {
    id: 'skill-hexagon',
    category: 'Skill Visualization',
    title: 'Hexagon Skill Grid',
    description: 'Honeycomb pattern for skills.',
    code: `<div style="${SANS} display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; justify-content: center; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%); height: 70px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">React</div>
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%); height: 70px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">Vue</div>
  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%); height: 70px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">Node</div>
  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%); height: 70px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">Python</div>
</div>`
  },
  {
    id: 'skill-badge-cloud',
    category: 'Skill Visualization',
    title: 'Skill Badge Cloud',
    description: 'Tag cloud style skill display.',
    code: `<div style="${SANS} display: flex; flex-wrap: wrap; gap: 8px; padding: 20px; justify-content: center;">
  <span style="background: #eff6ff; color: #1e40af; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">JavaScript</span>
  <span style="background: #fef2f2; color: #991b1b; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">TypeScript</span>
  <span style="background: #f0fdf4; color: #14532d; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">React</span>
  <span style="background: #fef3c7; color: #78350f; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">Python</span>
  <span style="background: #f5f3ff; color: #5b21b6; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">Node.js</span>
  <span style="background: #ecfdf5; color: #065f46; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">MongoDB</span>
  <span style="background: #fce7f3; color: #831843; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">GraphQL</span>
  <span style="background: #ede9fe; color: #4c1d95; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 600;">Docker</span>
</div>`
  },
  {
    id: 'skill-rating',
    category: 'Skill Visualization',
    title: 'Star Rating Skills',
    description: 'Skills with star ratings.',
    code: `<div style="${SANS} background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
    <span style="font-weight: 600; color: #333;">React Development</span>
    <span style="color: #fbbf24; font-size: 18px;">★★★★★</span>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
    <span style="font-weight: 600; color: #333;">UI/UX Design</span>
    <span style="color: #fbbf24; font-size: 18px;">★★★★☆</span>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
    <span style="font-weight: 600; color: #333;">Backend APIs</span>
    <span style="color: #fbbf24; font-size: 18px;">★★★★☆</span>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-weight: 600; color: #333;">DevOps</span>
    <span style="color: #fbbf24; font-size: 18px;">★★★☆☆</span>
  </div>
</div>`
  }
];

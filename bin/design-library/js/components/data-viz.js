/**
 * Data Viz Components
 */
import { SANS, MONO } from '../utils.js';

export const dataVizComponents = [
  {
    id: 'data-progress-striped',
    category: 'Data Viz',
    title: 'Striped Progress Bar',
    description: 'Animated-looking striped progress bar.',
    code: `<div style="width: 100%; background-color: #e5e7eb; border-radius: 9999px; height: 20px; overflow: hidden;">
  <div style="width: 75%; height: 100%; background: repeating-linear-gradient(45deg, #3b82f6, #3b82f6 10px, #2563eb 10px, #2563eb 20px); border-radius: 9999px; color: white; text-align: center; font-size: 12px; line-height: 20px; font-family: sans-serif; font-weight: bold;">75%</div>
</div>`
  },
  {
    id: 'data-stat-card',
    category: 'Data Viz',
    title: 'Statistic Counter',
    description: 'Big number with label and trend indicator.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; width: 200px; ${SANS}">
  <div style="color: #6b7280; font-size: 14px; font-weight: 500;">Total Revenue</div>
  <div style="font-size: 32px; font-weight: 800; color: #111827; margin: 5px 0;">$45,231</div>
  <div style="color: #059669; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 4px;">
    <span>▲ 20.1%</span>
    <span style="color: #9ca3af; font-weight: 400;">vs last month</span>
  </div>
</div>`
  },
  {
    id: 'data-simple-table',
    category: 'Data Viz',
    title: 'Minimalist Data Table',
    description: 'Clean table with bottom borders.',
    code: `<table style="width: 100%; border-collapse: collapse; ${SANS} text-align: left; font-size: 14px;">
  <thead>
    <tr style="border-bottom: 2px solid #e5e7eb;">
      <th style="padding: 12px; color: #374151;">User</th>
      <th style="padding: 12px; color: #374151;">Role</th>
      <th style="padding: 12px; color: #374151;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #f3f4f6;">
      <td style="padding: 12px; color: #6b7280;">Alice Smith</td>
      <td style="padding: 12px; color: #6b7280;">Admin</td>
      <td style="padding: 12px; color: #059669;">Active</td>
    </tr>
    <tr style="border-bottom: 1px solid #f3f4f6;">
      <td style="padding: 12px; color: #6b7280;">Bob Jones</td>
      <td style="padding: 12px; color: #6b7280;">Editor</td>
      <td style="padding: 12px; color: #d97706;">Pending</td>
    </tr>
  </tbody>
</table>`
  }
];

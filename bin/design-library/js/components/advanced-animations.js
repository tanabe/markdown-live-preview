/**
 * Advanced Animations Components
 */
import { SANS, MONO } from '../utils.js';

export const advancedAnimationsComponents = [
  {
    id: 'anim-gradient-text',
    category: 'Advanced Animations',
    title: 'Animated Gradient Text',
    description: 'Flowing gradient text effect.',
    code: `<h1 style="${SANS} font-size: 48px; font-weight: 800; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea); background-size: 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradient 3s ease infinite;">Amazing Text</h1>
<style>
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>`
  },
  {
    id: 'anim-pulse-button',
    category: 'Advanced Animations',
    title: 'Pulsing Glow Button',
    description: 'Button with continuous pulse animation.',
    code: `<button style="${SANS} background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer; animation: pulse-glow 2s infinite; box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);">Click Me</button>
<style>
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); transform: scale(1); }
  50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); transform: scale(1.05); }
}
</style>`
  },
  {
    id: 'anim-loading-dots',
    category: 'Advanced Animations',
    title: 'Loading Dots',
    description: 'Bouncing dots loader.',
    code: `<div style="display: flex; gap: 8px; justify-content: center; padding: 20px;">
  <div style="width: 12px; height: 12px; background: #667eea; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out;"></div>
  <div style="width: 12px; height: 12px; background: #667eea; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out 0.2s;"></div>
  <div style="width: 12px; height: 12px; background: #667eea; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out 0.4s;"></div>
</div>
<style>
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
}
</style>`
  },
  {
    id: 'anim-spinner',
    category: 'Advanced Animations',
    title: 'Modern Spinner',
    description: 'Circular loading spinner.',
    code: `<div style="width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>`
  },
  {
    id: 'anim-wave',
    category: 'Advanced Animations',
    title: 'Wave Animation',
    description: 'Smooth wave effect.',
    code: `<svg width="100%" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none">
  <path fill="#667eea" d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z">
    <animate attributeName="d" dur="5s" repeatCount="indefinite"
      values="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z;
              M0,50 Q300,100 600,50 T1200,50 L1200,100 L0,100 Z;
              M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" />
  </path>
</svg>`
  },
  {
    id: 'anim-typing',
    category: 'Advanced Animations',
    title: 'Typewriter Effect',
    description: 'CSS-only typewriter animation.',
    code: `<div style="${SANS} font-size: 24px; font-weight: 600; color: #333; overflow: hidden; border-right: 3px solid #667eea; white-space: nowrap; width: 0; animation: typing 3s steps(30) forwards, blink 0.75s step-end infinite;">I love coding...</div>
<style>
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes blink {
  50% { border-color: transparent; }
}
</style>`
  }
];

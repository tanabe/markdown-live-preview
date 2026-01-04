/**
 * Project Showcases Components
 */
import { SANS, MONO } from '../utils.js';

export const projectShowcasesComponents = [
  {
    id: 'proj-glass-card',
    category: 'Project Showcases',
    title: 'Glassmorphism Card',
    description: 'Trendy glass-effect project card.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 40px; border-radius: 20px;">
  <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.2);">
    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
      <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🚀</div>
      <div>
        <h3 style="margin: 0; color: white; font-size: 20px;">SkyLaunch Pro</h3>
        <p style="margin: 4px 0 0 0; color: rgba(255,255,255,0.7); font-size: 13px;">Next-gen deployment</p>
      </div>
    </div>
    <p style="color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.7; margin: 0 0 20px 0;">Deploy your applications instantly with zero configuration. Built for developers who value speed.</p>
    <div style="display: flex; gap: 10px;">
      <button style="background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer;">Get Started</button>
      <button style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer;">Learn More</button>
    </div>
  </div>
</div>`
  },
  {
    id: 'proj-stats-card',
    category: 'Project Showcases',
    title: 'Stats Dashboard Card',
    description: 'Animated statistics display.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%); border-radius: 20px; padding: 30px; max-width: 400px;">
  <h3 style="color: white; margin: 0 0 25px 0; font-size: 18px;">📊 Performance Overview</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: rgba(102,126,234,0.2); padding: 20px; border-radius: 12px; border-left: 4px solid #667eea;">
      <div style="color: #667eea; font-size: 32px; font-weight: 800;">2.4M</div>
      <div style="color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 5px;">Total Users</div>
      <div style="color: #4ade80; font-size: 12px; margin-top: 8px;">↑ 12.5%</div>
    </div>
    <div style="background: rgba(244,114,182,0.2); padding: 20px; border-radius: 12px; border-left: 4px solid #f472b6;">
      <div style="color: #f472b6; font-size: 32px; font-weight: 800;">98%</div>
      <div style="color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 5px;">Uptime</div>
      <div style="color: #4ade80; font-size: 12px; margin-top: 8px;">↑ 2.1%</div>
    </div>
    <div style="background: rgba(52,211,153,0.2); padding: 20px; border-radius: 12px; border-left: 4px solid #34d399;">
      <div style="color: #34d399; font-size: 32px; font-weight: 800;">$84K</div>
      <div style="color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 5px;">Revenue</div>
      <div style="color: #4ade80; font-size: 12px; margin-top: 8px;">↑ 28.4%</div>
    </div>
    <div style="background: rgba(251,191,36,0.2); padding: 20px; border-radius: 12px; border-left: 4px solid #fbbf24;">
      <div style="color: #fbbf24; font-size: 32px; font-weight: 800;">4.9★</div>
      <div style="color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 5px;">Rating</div>
      <div style="color: #4ade80; font-size: 12px; margin-top: 8px;">↑ 0.3</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'proj-testimonial',
    category: 'Project Showcases',
    title: 'Testimonial Card',
    description: 'Elegant customer testimonial.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 35px; max-width: 400px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); position: relative;">
  <div style="position: absolute; top: 25px; right: 30px; font-size: 60px; color: #f0f0f0; line-height: 1;">"</div>
  <div style="display: flex; gap: 4px; margin-bottom: 20px;">
    <span style="color: #fbbf24; font-size: 18px;">★</span>
    <span style="color: #fbbf24; font-size: 18px;">★</span>
    <span style="color: #fbbf24; font-size: 18px;">★</span>
    <span style="color: #fbbf24; font-size: 18px;">★</span>
    <span style="color: #fbbf24; font-size: 18px;">★</span>
  </div>
  <p style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; font-style: italic;">"This product completely transformed our workflow. The team is more productive than ever, and we've seen a 40% increase in output."</p>
  <div style="display: flex; align-items: center; gap: 15px;">
    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">SJ</div>
    <div>
      <div style="font-weight: 700; color: #1f2937;">Sarah Johnson</div>
      <div style="color: #6b7280; font-size: 13px;">CEO at TechCorp</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'proj-pricing',
    category: 'Project Showcases',
    title: 'Pricing Card Pro',
    description: 'Modern pricing table design.',
    code: `<div style="${SANS} display: flex; gap: 20px; padding: 20px;">
  <div style="background: white; border-radius: 20px; padding: 35px; flex: 1; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 2px solid #e5e7eb;">
    <div style="text-transform: uppercase; font-size: 12px; font-weight: 700; color: #6b7280; letter-spacing: 1px;">Starter</div>
    <div style="margin: 15px 0 20px 0;"><span style="font-size: 42px; font-weight: 800; color: #1f2937;">$9</span><span style="color: #6b7280;">/mo</span></div>
    <ul style="list-style: none; padding: 0; margin: 0 0 25px 0;">
      <li style="padding: 10px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6;">✓ 5 Projects</li>
      <li style="padding: 10px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6;">✓ 10GB Storage</li>
      <li style="padding: 10px 0; color: #4b5563;">✓ Email Support</li>
    </ul>
    <button style="width: 100%; padding: 14px; background: #f3f4f6; color: #374151; border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">Get Started</button>
  </div>
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 35px; flex: 1; position: relative; transform: scale(1.05);">
    <div style="position: absolute; top: -12px; right: 20px; background: #fbbf24; color: #78350f; padding: 5px 15px; border-radius: 20px; font-size: 11px; font-weight: 700;">POPULAR</div>
    <div style="text-transform: uppercase; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.7); letter-spacing: 1px;">Professional</div>
    <div style="margin: 15px 0 20px 0;"><span style="font-size: 42px; font-weight: 800; color: white;">$29</span><span style="color: rgba(255,255,255,0.7);">/mo</span></div>
    <ul style="list-style: none; padding: 0; margin: 0 0 25px 0;">
      <li style="padding: 10px 0; color: rgba(255,255,255,0.9); border-bottom: 1px solid rgba(255,255,255,0.1);">✓ Unlimited Projects</li>
      <li style="padding: 10px 0; color: rgba(255,255,255,0.9); border-bottom: 1px solid rgba(255,255,255,0.1);">✓ 100GB Storage</li>
      <li style="padding: 10px 0; color: rgba(255,255,255,0.9);">✓ Priority Support</li>
    </ul>
    <button style="width: 100%; padding: 14px; background: white; color: #667eea; border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">Get Started</button>
  </div>
</div>`
  },
  {
    id: 'proj-team-card',
    category: 'Project Showcases',
    title: 'Team Member Card',
    description: 'Stylish team profile card.',
    code: `<div style="${SANS} background: white; border-radius: 20px; overflow: hidden; max-width: 280px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
  <div style="height: 100px; background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);"></div>
  <div style="padding: 0 25px 25px 25px; text-align: center; margin-top: -50px;">
    <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto; border: 5px solid white; display: flex; align-items: center; justify-content: center; font-size: 36px;">👩‍💻</div>
    <h3 style="margin: 15px 0 5px 0; color: #1f2937;">Emily Chen</h3>
    <p style="margin: 0; color: #6366f1; font-weight: 600; font-size: 14px;">Lead Designer</p>
    <p style="margin: 15px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">Creating beautiful experiences that users love. 8+ years in product design.</p>
    <div style="display: flex; justify-content: center; gap: 12px; margin-top: 20px;">
      <a href="#" style="width: 36px; height: 36px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">🐦</a>
      <a href="#" style="width: 36px; height: 36px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">💼</a>
      <a href="#" style="width: 36px; height: 36px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">🔗</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'proj-newsletter',
    category: 'Project Showcases',
    title: 'Newsletter Signup',
    description: 'Eye-catching email capture.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 24px; padding: 50px; text-align: center; position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(99,102,241,0.3); border-radius: 50%;"></div>
  <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(236,72,153,0.2); border-radius: 50%;"></div>
  <div style="position: relative; z-index: 1;">
    <div style="font-size: 48px; margin-bottom: 15px;">✉️</div>
    <h2 style="color: white; margin: 0 0 10px 0; font-size: 28px;">Stay in the loop</h2>
    <p style="color: rgba(255,255,255,0.7); margin: 0 0 30px 0; font-size: 15px;">Get weekly updates on the latest features and tips.</p>
    <div style="display: flex; gap: 10px; max-width: 400px; margin: 0 auto;">
      <input type="email" placeholder="Enter your email" style="flex: 1; padding: 16px 20px; border: none; border-radius: 12px; font-size: 15px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
      <button style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; border: none; padding: 16px 28px; border-radius: 12px; font-weight: 700; cursor: pointer; white-space: nowrap;">Subscribe →</button>
    </div>
    <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 15px 0 0 0;">No spam. Unsubscribe anytime.</p>
  </div>
</div>`
  },
  {
    id: 'proj-app-card',
    category: 'Project Showcases',
    title: 'App Store Card',
    description: 'iOS-style app showcase.',
    code: `<div style="${SANS} background: #000; border-radius: 20px; padding: 25px; max-width: 380px;">
  <div style="display: flex; gap: 15px; align-items: flex-start;">
    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #ff6b6b, #feca57); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0;">📸</div>
    <div style="flex: 1;">
      <h3 style="color: white; margin: 0; font-size: 18px;">PhotoMagic Pro</h3>
      <p style="color: #6b7280; margin: 4px 0; font-size: 13px;">Photo & Video</p>
      <div style="display: flex; align-items: center; gap: 6px; margin-top: 8px;">
        <span style="color: #fbbf24; font-size: 12px;">★★★★★</span>
        <span style="color: #6b7280; font-size: 12px;">4.8 (12.4K)</span>
      </div>
    </div>
    <button style="background: #3b82f6; color: white; border: none; padding: 8px 18px; border-radius: 20px; font-weight: 700; font-size: 14px;">GET</button>
  </div>
  <div style="display: flex; gap: 10px; margin-top: 20px; overflow-x: auto;">
    <div style="width: 110px; height: 200px; background: linear-gradient(180deg, #ff6b6b 0%, #feca57 100%); border-radius: 12px; flex-shrink: 0;"></div>
    <div style="width: 110px; height: 200px; background: linear-gradient(180deg, #a855f7 0%, #ec4899 100%); border-radius: 12px; flex-shrink: 0;"></div>
    <div style="width: 110px; height: 200px; background: linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%); border-radius: 12px; flex-shrink: 0;"></div>
  </div>
</div>`
  },
  {
    id: 'proj-notification',
    category: 'Project Showcases',
    title: 'Notification Toast',
    description: 'Modern notification designs.',
    code: `<div style="${SANS} display: flex; flex-direction: column; gap: 15px; padding: 20px;">
  <div style="background: white; border-radius: 14px; padding: 16px 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 15px; border-left: 4px solid #22c55e;">
    <div style="width: 40px; height: 40px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">✓</div>
    <div style="flex: 1;">
      <div style="font-weight: 700; color: #166534; font-size: 14px;">Success!</div>
      <div style="color: #6b7280; font-size: 13px;">Your changes have been saved.</div>
    </div>
    <button style="background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 18px;">×</button>
  </div>
  <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); border-radius: 14px; padding: 16px 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 15px;">
    <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">🎉</div>
    <div style="flex: 1;">
      <div style="font-weight: 700; color: white; font-size: 14px;">New Achievement!</div>
      <div style="color: rgba(255,255,255,0.8); font-size: 13px;">You've reached 1000 followers!</div>
    </div>
    <button style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">View</button>
  </div>
</div>`
  },
  {
    id: 'proj-feature-bento',
    category: 'Project Showcases',
    title: 'Bento Grid Layout',
    description: 'Apple-style bento feature grid.',
    code: `<div style="${SANS} display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 180px); gap: 15px; padding: 20px;">
  <div style="grid-column: span 2; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px; display: flex; flex-direction: column; justify-content: flex-end;">
    <div style="font-size: 40px; margin-bottom: 10px;">🎨</div>
    <h3 style="color: white; margin: 0; font-size: 22px;">Beautiful Design</h3>
    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">Crafted with attention to every detail</p>
  </div>
  <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="font-size: 36px;">⚡</div>
    <div style="font-weight: 700; color: #78350f; margin-top: 10px;">Fast</div>
  </div>
  <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="font-size: 36px;">🔒</div>
    <div style="font-weight: 700; color: #1e40af; margin-top: 10px;">Secure</div>
  </div>
  <div style="background: linear-gradient(135deg, #fce7f3, #fbcfe8); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="font-size: 36px;">💎</div>
    <div style="font-weight: 700; color: #9d174d; margin-top: 10px;">Premium</div>
  </div>
  <div style="grid-column: span 2; background: linear-gradient(135deg, #10b981, #059669); border-radius: 20px; padding: 25px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <h3 style="color: white; margin: 0; font-size: 20px;">Ready to start?</h3>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Join 50,000+ happy users today</p>
    </div>
    <button style="background: white; color: #059669; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; cursor: pointer;">Get Started →</button>
  </div>
  <div style="background: linear-gradient(135deg, #fef2f2, #fecaca); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="font-size: 36px;">🌍</div>
    <div style="font-weight: 700; color: #991b1b; margin-top: 10px;">Global</div>
  </div>
</div>`
  },
  {
    id: 'proj-profile-header',
    category: 'Project Showcases',
    title: 'Profile Header',
    description: 'Social media style profile.',
    code: `<div style="${SANS} background: white; border-radius: 24px; overflow: hidden; max-width: 500px; box-shadow: 0 25px 50px rgba(0,0,0,0.1);">
  <div style="height: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);"></div>
  <div style="padding: 0 30px 30px 30px;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -50px;">
      <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #1e1b4b, #312e81); border-radius: 50%; border: 5px solid white; display: flex; align-items: center; justify-content: center; font-size: 40px;">😎</div>
      <button style="background: #1f2937; color: white; border: none; padding: 10px 24px; border-radius: 25px; font-weight: 600; cursor: pointer; margin-bottom: 10px;">Follow</button>
    </div>
    <h2 style="margin: 15px 0 5px 0; color: #1f2937;">Alex Developer</h2>
    <p style="margin: 0; color: #6b7280;">@alexdev • Full-Stack Engineer 🚀</p>
    <p style="margin: 15px 0; color: #374151; font-size: 15px; line-height: 1.6;">Building the future of web development. Open source enthusiast. Coffee addict ☕</p>
    <div style="display: flex; gap: 30px; padding-top: 15px; border-top: 1px solid #f3f4f6;">
      <div><span style="font-weight: 800; color: #1f2937;">2.4K</span> <span style="color: #6b7280; font-size: 14px;">followers</span></div>
      <div><span style="font-weight: 800; color: #1f2937;">892</span> <span style="color: #6b7280; font-size: 14px;">following</span></div>
      <div><span style="font-weight: 800; color: #1f2937;">156</span> <span style="color: #6b7280; font-size: 14px;">projects</span></div>
    </div>
  </div>
</div>`
  }
];

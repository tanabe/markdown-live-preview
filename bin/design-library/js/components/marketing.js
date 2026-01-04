/**
 * Marketing Components
 */
import { SANS, MONO } from '../utils.js';

export const marketingComponents = [
  {
    id: 'mkt-pricing',
    category: 'Marketing',
    title: 'Simple Pricing Tier',
    description: 'A highlighted pricing column.',
    code: `<div style="border: 2px solid #3b82f6; border-radius: 12px; padding: 30px; text-align: center; max-width: 300px; background: #fff; position: relative; ${SANS}">
  <div style="background: #3b82f6; color: white; position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Most Popular</div>
  <h3 style="color: #6b7280; font-size: 14px; text-transform: uppercase; margin: 0;">Pro Plan</h3>
  <div style="font-size: 40px; font-weight: 800; color: #111827; margin: 15px 0;">$29<span style="font-size: 16px; color: #6b7280; font-weight: normal;">/mo</span></div>
  <ul style="list-style: none; padding: 0; margin: 20px 0; text-align: left; color: #4b5563; line-height: 2;">
    <li>✅ Unlimited Projects</li>
    <li>✅ Priority Support</li>
    <li>✅ 10GB Storage</li>
  </ul>
  <button style="width: 100%; background: #3b82f6; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer;">Choose Plan</button>
</div>`
  },
  {
    id: 'mkt-feature-grid',
    category: 'Marketing',
    title: 'Feature Grid (2-Col)',
    description: 'Two columns of features with icons.',
    code: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; ${SANS} color: #333;">
  <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
    <div style="font-size: 24px; margin-bottom: 10px;">🚀</div>
    <h3 style="margin: 0 0 5px 0;">Fast Performance</h3>
    <p style="margin: 0; font-size: 14px; color: #666;">Optimized for speed and efficiency.</p>
  </div>
  <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
    <div style="font-size: 24px; margin-bottom: 10px;">🔒</div>
    <h3 style="margin: 0 0 5px 0;">Secure by Design</h3>
    <p style="margin: 0; font-size: 14px; color: #666;">Your data is protected with encryption.</p>
  </div>
</div>`
  },
  {
    id: 'mkt-testimonial',
    category: 'Marketing',
    title: 'Testimonial Card',
    description: 'Customer review with star rating.',
    code: `<div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); ${SANS} max-width: 400px;">
  <div style="color: #fbbf24; font-size: 18px; margin-bottom: 10px;">★★★★★</div>
  <p style="color: #4b5563; font-style: italic; margin-bottom: 16px;">"This product completely transformed how we handle our documentation. Absolutely essential tool."</p>
  <div style="display: flex; align-items: center; gap: 10px;">
    <div style="width: 36px; height: 36px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #6b7280;">JS</div>
    <div>
      <div style="font-weight: 700; color: #111827; font-size: 14px;">Jane Smith</div>
      <div style="color: #9ca3af; font-size: 12px;">CTO, TechCorp</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-newsletter',
    category: 'Marketing',
    title: 'Newsletter Form',
    description: 'A mock signup form for newsletters.',
    code: `<div style="background: #eff6ff; padding: 30px; border-radius: 12px; text-align: center; ${SANS} max-width: 450px; margin: 20px auto;">
  <h3 style="color: #1e3a8a; margin: 0 0 10px 0;">Subscribe to our newsletter</h3>
  <p style="color: #60a5fa; margin: 0 0 20px 0; font-size: 14px;">Get the latest updates directly in your inbox.</p>
  <div style="display: flex; gap: 10px;">
    <input type="email" placeholder="Enter your email" style="flex: 1; padding: 10px 15px; border: 1px solid #93c5fd; border-radius: 6px; outline: none;">
    <button style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">Subscribe</button>
  </div>
</div>`
  },
  // ================= NEW PREMIUM MARKETING COMPONENTS =================
  {
    id: 'mkt-hero-gradient',
    category: 'Marketing',
    title: 'Modern Gradient Hero',
    description: 'Eye-catching hero section with gradient background.',
    code: `<div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 16px; padding: 60px 40px; text-align: center; color: white; ${SANS}">
  <h1 style="font-size: 32px; font-weight: 800; margin: 0 0 15px 0; line-height: 1.2;">Build Faster, Launch Sooner.</h1>
  <p style="font-size: 18px; opacity: 0.9; margin: 0 auto 30px auto; max-width: 500px; line-height: 1.6;">The ultimate toolkit for developers who want to ship premium products without the hassle.</p>
  <div style="display: flex; gap: 15px; justify-content: center;">
    <button style="background: white; color: #4f46e5; border: none; padding: 12px 28px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: transform 0.2s;">Get Started</button>
    <button style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4); padding: 12px 28px; border-radius: 30px; font-weight: 600; cursor: pointer;">View Demo</button>
  </div>
</div>`
  },
  {
    id: 'mkt-trust-logos',
    category: 'Marketing',
    title: 'Trusted By Logos',
    description: 'Grayscale logo row for social proof.',
    code: `<div style="${SANS} padding: 20px; text-align: center; border-bottom: 1px solid #eee;">
  <p style="text-transform: uppercase; font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #9ca3af; margin-bottom: 20px;">Trusted by market leaders</p>
  <div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap; opacity: 0.6; filter: grayscale(100%);">
    <div style="font-weight: 800; font-size: 20px; color: #374151;">ACME</div>
    <div style="font-weight: 800; font-size: 20px; color: #374151;">Globex</div>
    <div style="font-weight: 800; font-size: 20px; color: #374151;">Soylent</div>
    <div style="font-weight: 800; font-size: 20px; color: #374151;">Initech</div>
    <div style="font-weight: 800; font-size: 20px; color: #374151;">Umbrella</div>
  </div>
</div>`
  },
  {
    id: 'mkt-stats-dark',
    category: 'Marketing',
    title: 'Dark Mode Stats',
    description: 'High-contrast statistics row.',
    code: `<div style="background: #111827; border-radius: 12px; padding: 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center; ${SANS} color: white;">
  <div style="border-right: 1px solid rgba(255,255,255,0.1);">
    <div style="font-size: 36px; font-weight: 800; background: linear-gradient(to right, #4ade80, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$10M+</div>
    <div style="color: #9ca3af; font-size: 14px; margin-top: 5px;">Processed</div>
  </div>
  <div style="border-right: 1px solid rgba(255,255,255,0.1);">
    <div style="font-size: 36px; font-weight: 800; background: linear-gradient(to right, #60a5fa, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">99.9%</div>
    <div style="color: #9ca3af; font-size: 14px; margin-top: 5px;">Uptime</div>
  </div>
  <div>
    <div style="font-size: 36px; font-weight: 800; background: linear-gradient(to right, #f472b6, #db2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">50k+</div>
    <div style="color: #9ca3af; font-size: 14px; margin-top: 5px;">Users</div>
  </div>
</div>`
  },
  {
    id: 'mkt-pricing-table',
    category: 'Marketing',
    title: 'Clean Pricing Table',
    description: 'Three-column pricing comparison.',
    code: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; ${SANS}">
  <!-- Basic -->
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; background: white;">
    <h3 style="margin: 0; color: #374151; font-size: 16px;">Basic</h3>
    <div style="margin: 15px 0;"><span style="font-size: 32px; font-weight: 800; color: #111827;">$0</span></div>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">Perfect for hobbyists.</p>
    <button style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; font-weight: 600; cursor: pointer; color: #374151;">Get Started</button>
  </div>
  <!-- Pro -->
  <div style="border: 2px solid #6366f1; border-radius: 12px; padding: 25px; background: #fff; position: relative; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
    <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #6366f1; color: white; font-size: 10px; font-weight: 700; padding: 2px 10px; border-radius: 10px; text-transform: uppercase;">Recommended</div>
    <h3 style="margin: 0; color: #6366f1; font-size: 16px;">Pro</h3>
    <div style="margin: 15px 0;"><span style="font-size: 32px; font-weight: 800; color: #111827;">$29</span></div>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">For growing teams.</p>
    <button style="width: 100%; padding: 10px; background: #6366f1; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; color: white;">Get Started</button>
  </div>
  <!-- Enterprise -->
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; background: white;">
    <h3 style="margin: 0; color: #374151; font-size: 16px;">Enterprise</h3>
    <div style="margin: 15px 0;"><span style="font-size: 32px; font-weight: 800; color: #111827;">$99</span></div>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">For large scale.</p>
    <button style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; font-weight: 600; cursor: pointer; color: #374151;">Contact Sales</button>
  </div>
</div>`
  },
  {
    id: 'mkt-cta-banner',
    category: 'Marketing',
    title: 'Wide CTA Banner',
    description: 'High-impact call to action section.',
    code: `<div style="background: #1e1b4b; background-image: radial-gradient(circle at top right, #4338ca 0%, transparent 40%); border-radius: 16px; padding: 50px; text-align: left; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; ${SANS}">
  <div style="flex: 1; min-width: 250px;">
    <h2 style="color: white; font-size: 24px; margin: 0 0 10px 0;">Ready to dive in?</h2>
    <p style="color: #cbd5e1; margin: 0; font-size: 16px; line-height: 1.5;">Join over 2,000 developers building the future of web today.</p>
  </div>
  <div>
    <button style="background: #ffffff; color: #1e1b4b; font-weight: 700; border: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);">Get Started Free</button>
  </div>
</div>`
  },
  {
    id: 'mkt-faq-item',
    category: 'Marketing',
    title: 'Styled FAQ Item',
    description: 'Questions and answers with style.',
    code: `<div style="${SANS} max-width: 600px;">
  <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 10px;">
    <div style="background: #f9fafb; padding: 15px 20px; font-weight: 600; color: #111827; display: flex; justify-content: space-between; cursor: pointer;">
      <span>What is the refund policy?</span>
      <span style="color: #6b7280;">+</span>
    </div>
    <div style="padding: 20px; color: #4b5563; font-size: 14px; line-height: 1.6; border-top: 1px solid #e5e7eb;">
      We offer a 30-day money-back guarantee. If you're not satisfied for any reason, simply contact our support team and we'll process your refund immediately.
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-testimonial-grid',
    category: 'Marketing',
    title: 'Testimonial Grid',
    description: 'Grid of 3 customer reviews.',
    code: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; ${SANS}">
  <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #f3f4f6;">
    <div style="color: #fbbf24; margin-bottom: 10px;">★★★★★</div>
    <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">"Absolutely love the new features. It has speeded up our workflow by 200%."</p>
    <div style="margin-top: 15px; font-weight: 700; font-size: 12px; color: #111827;">Sarah J.</div>
  </div>
  <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #f3f4f6;">
    <div style="color: #fbbf24; margin-bottom: 10px;">★★★★★</div>
    <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">"Support is incredible. They answered my ticket in under 5 minutes."</p>
    <div style="margin-top: 15px; font-weight: 700; font-size: 12px; color: #111827;">Mike T.</div>
  </div>
  <div style="background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #f3f4f6;">
    <div style="color: #fbbf24; margin-bottom: 10px;">★★★★★</div>
    <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">"Best investment I've made for my startup this year. Highly recommended."</p>
    <div style="margin-top: 15px; font-weight: 700; font-size: 12px; color: #111827;">Emily R.</div>
  </div>
</div>`
  },
  {
    id: 'mkt-feature-check',
    category: 'Marketing',
    title: 'Feature Checklist',
    description: 'List with green checkmark icons.',
    code: `<div style="${SANS} background: #f8fafc; padding: 30px; border-radius: 16px;">
  <h3 style="margin-top: 0; color: #0f172a;">Everything you need</h3>
  <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
    <li style="display: flex; gap: 10px; align-items: center; color: #475569; font-size: 14px;">
      <div style="width: 20px; height: 20px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #166534; font-size: 12px;">✓</div> Analytics Dashboard
    </li>
    <li style="display: flex; gap: 10px; align-items: center; color: #475569; font-size: 14px;">
      <div style="width: 20px; height: 20px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #166534; font-size: 12px;">✓</div> Email Reports
    </li>
    <li style="display: flex; gap: 10px; align-items: center; color: #475569; font-size: 14px;">
      <div style="width: 20px; height: 20px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #166534; font-size: 12px;">✓</div> API Access
    </li>
    <li style="display: flex; gap: 10px; align-items: center; color: #475569; font-size: 14px;">
      <div style="width: 20px; height: 20px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #166534; font-size: 12px;">✓</div> 24/7 Support
    </li>
  </ul>
</div>`
  },
  {
    id: 'mkt-team-card',
    category: 'Marketing',
    title: 'Minimal Team Card',
    description: 'Profile card with social links.',
    code: `<div style="text-align: center; ${SANS} max-width: 250px;">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 15px;">
  <h3 style="margin: 0; color: #111827; font-size: 18px;">Jessica Doe</h3>
  <p style="margin: 5px 0 15px 0; color: #6b7280; font-size: 14px;">Product Designer</p>
  <div style="display: flex; justify-content: center; gap: 10px;">
    <a href="#" style="color: #9ca3af; text-decoration: none;">🐦</a>
    <a href="#" style="color: #9ca3af; text-decoration: none;">💼</a>
    <a href="#" style="color: #9ca3af; text-decoration: none;">🌐</a>
  </div>
</div>`
  },
  {
    id: 'mkt-event-ticket',
    category: 'Marketing',
    title: 'Event Ticket',
    description: 'Digital ticket for webinars or events.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; display: flex; ${SANS} max-width: 500px;">
  <div style="background: #4f46e5; color: white; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-width: 100px;">
    <div style="font-size: 24px; font-weight: 800;">24</div>
    <div style="font-size: 14px; opacity: 0.8;">OCT</div>
  </div>
  <div style="padding: 20px; flex: 1;">
    <div style="color: #4f46e5; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 5px;">Webinar</div>
    <h3 style="margin: 0 0 5px 0; color: #111827; font-size: 18px;">Future of Design Systems</h3>
    <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">Join us for a deep dive into scalable UI.</p>
    <button style="background: #f3f4f6; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; color: #4b5563; cursor: pointer;">Register Now</button>
  </div>
</div>`
  },
  {
    id: 'mkt-comparison',
    category: 'Marketing',
    title: 'Competitor Comparison',
    description: 'Us vs Them comparison table.',
    code: `<div style="${SANS} border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
    <div style="padding: 15px; font-weight: 600; color: #6b7280;">Feature</div>
    <div style="padding: 15px; font-weight: 700; color: #4f46e5; text-align: center; background: rgba(79, 70, 229, 0.05);">Us</div>
    <div style="padding: 15px; font-weight: 600; color: #6b7280; text-align: center;">Them</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #f3f4f6; align-items: center;">
    <div style="padding: 15px; font-size: 14px; color: #374151;">Real-time sync</div>
    <div style="padding: 15px; text-align: center; color: #22c55e; background: rgba(79, 70, 229, 0.05); font-size: 18px;">●</div>
    <div style="padding: 15px; text-align: center; color: #ef4444; font-size: 14px;">✕</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #f3f4f6; align-items: center;">
    <div style="padding: 15px; font-size: 14px; color: #374151;">Unlimited History</div>
    <div style="padding: 15px; text-align: center; color: #22c55e; background: rgba(79, 70, 229, 0.05); font-size: 18px;">●</div>
    <div style="padding: 15px; text-align: center; color: #ef4444; font-size: 14px;">✕</div>
  </div>
</div>`
  },
  {
    id: 'mkt-process-steps',
    category: 'Marketing',
    title: 'Process Steps',
    description: 'Horizontal step-by-step guide.',
    code: `<div style="display: flex; gap: 20px; ${SANS}">
  <div style="flex: 1; position: relative;">
    <div style="font-size: 30px; font-weight: 800; color: #e5e7eb; margin-bottom: 10px;">01</div>
    <h3 style="margin: 0 0 5px 0; font-size: 16px;">Sign Up</h3>
    <p style="margin: 0; font-size: 13px; color: #6b7280;">Create your free account in seconds.</p>
  </div>
  <div style="flex: 1; position: relative;">
    <div style="font-size: 30px; font-weight: 800; color: #e5e7eb; margin-bottom: 10px;">02</div>
    <h3 style="margin: 0 0 5px 0; font-size: 16px;">Connect</h3>
    <p style="margin: 0; font-size: 13px; color: #6b7280;">Link your data sources easily.</p>
  </div>
  <div style="flex: 1; position: relative;">
    <div style="font-size: 30px; font-weight: 800; color: #e5e7eb; margin-bottom: 10px;">03</div>
    <h3 style="margin: 0 0 5px 0; font-size: 16px;">Analyze</h3>
    <p style="margin: 0; font-size: 13px; color: #6b7280;">Get insights instantly.</p>
  </div>
</div>`
  },
  {
    id: 'mkt-announcement',
    category: 'Marketing',
    title: 'Announcement Bar',
    description: 'Top banner for important news.',
    code: `<div style="background: linear-gradient(90deg, #ec4899, #8b5cf6); padding: 10px 20px; color: white; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; ${SANS} font-size: 14px;">
  <div><span style="background: rgba(255,255,255,0.2); font-weight: 700; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 10px;">NEW</span> We just launched our mobile app!</div>
  <a href="#" style="color: white; font-weight: 600; text-decoration: none;">Learn more →</a>
</div>`
  },
  {
    id: 'mkt-coupon',
    category: 'Marketing',
    title: 'Coupon Voucher',
    description: 'Discount code design.',
    code: `<div style="border: 2px dashed #f59e0b; background: #fffbeb; border-radius: 12px; padding: 20px; text-align: center; ${SANS}">
  <div style="color: #b45309; font-weight: 700; text-transform: uppercase; font-size: 14px;">Special Offer</div>
  <div style="font-size: 32px; font-weight: 800; color: #92400e; margin: 10px 0;">25% OFF</div>
  <p style="color: #92400e; font-size: 13px; margin: 0 0 15px 0;">Use this code at checkout for your first order.</p>
  <div style="background: white; border: 1px solid #fcd34d; padding: 10px; font-family: monospace; font-size: 18px; color: #333; border-radius: 6px; letter-spacing: 2px;">SAVE25NOW</div>
</div>`
  },
  {
    id: 'mkt-app-badges',
    category: 'Marketing',
    title: 'App Store Badges',
    description: 'Buttons for downloading mobile apps.',
    code: `<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <button style="background: #111; color: white; border: 1px solid #333; padding: 8px 16px; border-radius: 8px; display: flex; align-items: center; gap: 10px; cursor: pointer; ${SANS}">
    <span style="font-size: 24px;">🍎</span>
    <div style="text-align: left;">
      <div style="font-size: 10px;">Download on the</div>
      <div style="font-weight: 700; font-size: 14px;">App Store</div>
    </div>
  </button>
  <button style="background: #111; color: white; border: 1px solid #333; padding: 8px 16px; border-radius: 8px; display: flex; align-items: center; gap: 10px; cursor: pointer; ${SANS}">
    <span style="font-size: 24px;">▶️</span>
    <div style="text-align: left;">
      <div style="font-size: 10px;">GET IT ON</div>
      <div style="font-weight: 700; font-size: 14px;">Google Play</div>
    </div>
  </button>
</div>`
  },
  {
    id: 'mkt-feature-highlight',
    category: 'Marketing',
    title: 'Single Feature Highlight',
    description: 'Card highlighting a key benefit.',
    code: `<div style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #f3f4f6; ${SANS} max-width: 350px;">
  <div style="width: 50px; height: 50px; background: #e0e7ff; color: #4338ca; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px;">⚡</div>
  <h3 style="margin: 0 0 10px 0; color: #1f2937;">Lightning Fast</h3>
  <p style="margin: 0 0 20px 0; color: #6b7280; line-height: 1.6;">Our optimized engine renders pages in milliseconds, ensuring your users never have to wait.</p>
  <a href="#" style="color: #4f46e5; font-weight: 600; text-decoration: none;">Read documentation →</a>
</div>`
  },
  {
    id: 'mkt-benefit-row',
    category: 'Marketing',
    title: 'Benefit Row',
    description: 'Horizontal icon and text layout.',
    code: `<div style="display: flex; align-items: start; gap: 15px; ${SANS}">
  <div style="background: #ecfdf5; color: #059669; padding: 10px; border-radius: 8px;">🛡️</div>
  <div>
    <h4 style="margin: 0 0 5px 0; color: #111827;">Bank-level Security</h4>
    <p style="margin: 0; color: #6b7280; font-size: 14px;">Your data is encrypted at rest and in transit.</p>
  </div>
</div>`
  },
  {
    id: 'mkt-social-proof',
    category: 'Marketing',
    title: 'Social Proof Widget',
    description: 'Small widget showing user count.',
    code: `<div style="display: inline-flex; align-items: center; gap: 12px; background: white; padding: 8px 16px; border-radius: 30px; border: 1px solid #e5e7eb; box-shadow: 0 2px 5px rgba(0,0,0,0.05); ${SANS}">
  <div style="display: flex; margin-left: 10px;">
    <div style="width: 24px; height: 24px; background: #cbd5e1; border-radius: 50%; border: 2px solid white; margin-left: -10px;"></div>
    <div style="width: 24px; height: 24px; background: #94a3b8; border-radius: 50%; border: 2px solid white; margin-left: -10px;"></div>
    <div style="width: 24px; height: 24px; background: #64748b; border-radius: 50%; border: 2px solid white; margin-left: -10px;"></div>
  </div>
  <div style="font-size: 13px; font-weight: 600; color: #374151;">Join 10,000+ others</div>
</div>`
  },
  {
    id: 'mkt-product-card',
    category: 'Marketing',
    title: 'E-commerce Product',
    description: 'Simple product card with price.',
    code: `<div style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; ${SANS} max-width: 250px;">
  <div style="height: 150px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 40px;">👟</div>
  <div style="padding: 15px;">
    <div style="font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase;">Sportswear</div>
    <h3 style="margin: 5px 0; font-size: 16px; color: #1f2937;">Running Sneakers</h3>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
      <span style="font-weight: 800; font-size: 18px; color: #111827;">$129</span>
      <button style="background: #111827; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">Add to Cart</button>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-guarantee',
    category: 'Marketing',
    title: 'Guarantee Badge',
    description: 'Money-back guarantee seal.',
    code: `<div style="display: inline-flex; align-items: center; gap: 15px; border: 2px solid #e5e7eb; padding: 15px 25px; border-radius: 12px; background: #f9fafb; ${SANS}">
  <div style="font-size: 32px;">🤝</div>
  <div>
    <h4 style="margin: 0 0 2px 0; color: #1f2937;">30-Day Money Back</h4>
    <p style="margin: 0; font-size: 13px; color: #6b7280;">No questions asked refund policy.</p>
  </div>
</div>`
  },
  // ================= BATCH 2: 20 MORE PREMIUM COMPONENTS =================
  {
    id: 'mkt-webinar-countdown',
    category: 'Marketing',
    title: 'Webinar Countdown',
    description: 'Urgency driver for events.',
    code: `<div style="background: linear-gradient(to right, #111827, #1f2937); border-radius: 12px; padding: 30px; color: white; text-align: center; ${SANS} max-width: 500px;">
  <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #60a5fa; font-weight: 700; margin-bottom: 10px;">Live Masterclass</div>
  <h2 style="margin: 0 0 25px 0; font-size: 24px;">Scaling Your SaaS to $1M ARR</h2>
  <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 30px;">
    <div style="background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 8px;">
      <div style="font-size: 24px; font-weight: 800;">02</div>
      <div style="font-size: 10px; opacity: 0.6;">DAYS</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 8px;">
      <div style="font-size: 24px; font-weight: 800;">14</div>
      <div style="font-size: 10px; opacity: 0.6;">HOURS</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 8px;">
      <div style="font-size: 24px; font-weight: 800;">35</div>
      <div style="font-size: 10px; opacity: 0.6;">MINS</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 8px;">
      <div style="font-size: 24px; font-weight: 800;">48</div>
      <div style="font-size: 10px; opacity: 0.6;">SECS</div>
    </div>
  </div>
  <button style="background: #3b82f6; color: white; border: none; padding: 12px 30px; border-radius: 30px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);">Reserve Your Spot</button>
</div>`
  },
  {
    id: 'mkt-career-job',
    category: 'Marketing',
    title: 'Job Listing Row',
    description: 'Clean job opening display.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px; ${SANS} max-width: 600px;">
  <div>
    <h3 style="margin: 0 0 5px 0; font-size: 18px; color: #111827;">Senior Product Designer</h3>
    <div style="display: flex; gap: 12px; font-size: 13px; color: #6b7280;">
      <span style="display: flex; align-items: center; gap: 4px;">📍 Remote</span>
      <span style="display: flex; align-items: center; gap: 4px;">🕒 Full-time</span>
      <span style="display: flex; align-items: center; gap: 4px;">💰 $120k - $160k</span>
    </div>
  </div>
  <button style="background: white; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 6px; font-weight: 600; color: #374151; cursor: pointer; transition: all 0.2s;">Apply Now</button>
</div>`
  },
  {
    id: 'mkt-podcast-card',
    category: 'Marketing',
    title: 'Podcast Episode',
    description: 'Audio player styling.',
    code: `<div style="background: #1e1e1e; border-radius: 16px; padding: 20px; color: white; display: flex; gap: 20px; align-items: center; ${SANS} max-width: 450px;">
  <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f43f5e, #be123c); border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 32px;">🎙️</div>
  <div style="flex: 1;">
    <div style="font-size: 12px; color: #9ca3af; margin-bottom: 4px;">EPISODE 42 • 45 MIN</div>
    <h3 style="margin: 0 0 10px 0; font-size: 16px;">The Future of AI in Design</h3>
    <div style="display: flex; align-items: center; gap: 10px;">
      <button style="background: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">▶</button>
      <div style="height: 4px; background: #374151; flex: 1; border-radius: 2px; position: relative;">
        <div style="position: absolute; left: 0; top: 0; height: 100%; width: 35%; background: #f43f5e; border-radius: 2px;"></div>
      </div>
      <div style="font-size: 12px; color: #d1d5db;">12:45</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-cookie-consent',
    category: 'Marketing',
    title: 'Cookie Consent',
    description: 'GDPR compliance banner.',
    code: `<div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); max-width: 400px; ${SANS}">
  <div style="display: flex; gap: 15px;">
    <div style="font-size: 24px;">🍪</div>
    <div>
      <h4 style="margin: 0 0 5px 0; color: #1f2937;">We use cookies</h4>
      <p style="margin: 0 0 15px 0; font-size: 13px; color: #6b7280; line-height: 1.5;">We use cookies to improve your experience. By using our site, you agree to our cookie policy.</p>
      <div style="display: flex; gap: 10px;">
        <button style="background: #1f2937; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer;">Accept All</button>
        <button style="background: white; color: #374151; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer;">Preferences</button>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-step-timeline',
    category: 'Marketing',
    title: 'Vertical Step Timeline',
    description: 'Process flow with vertical lines.',
    code: `<div style="${SANS} max-width: 300px;">
  <div style="display: flex; gap: 15px; position: relative; padding-bottom: 30px;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="width: 32px; height: 32px; background: #dbeafe; color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; z-index: 1;">1</div>
      <div style="width: 2px; background: #e5e7eb; flex: 1; margin-top: 5px;"></div>
    </div>
    <div>
      <h4 style="margin: 0 0 5px 0; color: #1f2937;">Create Account</h4>
      <p style="margin: 0; font-size: 13px; color: #6b7280;">Sign up using your email.</p>
    </div>
  </div>
  <div style="display: flex; gap: 15px; position: relative; padding-bottom: 30px;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="width: 32px; height: 32px; background: #dbeafe; color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; z-index: 1;">2</div>
      <div style="width: 2px; background: #e5e7eb; flex: 1; margin-top: 5px;"></div>
    </div>
    <div>
      <h4 style="margin: 0 0 5px 0; color: #1f2937;">Install Snippet</h4>
      <p style="margin: 0; font-size: 13px; color: #6b7280;">Copy code to your head tag.</p>
    </div>
  </div>
  <div style="display: flex; gap: 15px; position: relative;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="width: 32px; height: 32px; background: #dcfce7; color: #166534; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; z-index: 1;">3</div>
    </div>
    <div>
      <h4 style="margin: 0 0 5px 0; color: #1f2937;">See Results</h4>
      <p style="margin: 0; font-size: 13px; color: #6b7280;">Watch analytics roll in.</p>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-user-persona',
    category: 'Marketing',
    title: 'User Persona Card',
    description: 'Target audience profile.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; max-width: 300px; ${SANS}">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style="width: 60px; height: 60px; border-radius: 50%; background: #f3f4f6;">
    <div>
      <h3 style="margin: 0; color: #111827; font-size: 16px;">The Freelancer</h3>
      <div style="color: #6b7280; font-size: 13px;">Felix, 28</div>
    </div>
  </div>
  <div style="margin-bottom: 15px;">
    <div style="font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 5px;">Goals</div>
    <div style="font-size: 14px; color: #374151;">• Save time on admin<br>• Professional invoices<br>• Get paid faster</div>
  </div>
  <div>
    <div style="font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 5px;">Pain Points</div>
    <div style="font-size: 14px; color: #374151;">• Chasing clients<br>• Tax complexity</div>
  </div>
</div>`
  },
  {
    id: 'mkt-video-thumbnail',
    category: 'Marketing',
    title: 'Video Thumbnail',
    description: 'Click-to-play video placeholder.',
    code: `<div style="position: relative; border-radius: 16px; overflow: hidden; max-width: 400px; aspect-ratio: 16/9; background: linear-gradient(135deg, #374151, #111827); display: flex; align-items: center; justify-content: center; cursor: pointer; group: 'video'; ${SANS}">
  <div style="position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80') center/cover; opacity: 0.6;"></div>
  <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; z-index: 10; transition: transform 0.2s;">
    <div style="width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 18px solid white; margin-left: 4px;"></div>
  </div>
  <div style="position: absolute; bottom: 15px; left: 15px; right: 15px; color: white;">
    <h3 style="margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Product Walkthrough</h3>
    <div style="font-size: 12px; opacity: 0.9;">2:45 • 4K Quality</div>
  </div>
</div>`
  },
  {
    id: 'mkt-plan-toggle',
    category: 'Marketing',
    title: 'Monthly/Yearly Toggle',
    description: 'Pricing duration switch.',
    code: `<div style="display: flex; align-items: center; gap: 15px; background: #f3f4f6; padding: 6px; border-radius: 30px; display: inline-flex; ${SANS}">
  <button style="background: white; color: #111827; border: none; padding: 8px 20px; border-radius: 20px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer;">Monthly</button>
  <button style="background: transparent; color: #6b7280; border: none; padding: 8px 20px; border-radius: 20px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 5px;">
    Yearly
    <span style="background: #dcfce7; color: #166534; font-size: 10px; padding: 2px 6px; border-radius: 10px;">-20%</span>
  </button>
</div>`
  },
  {
    id: 'mkt-download-app',
    category: 'Marketing',
    title: 'Mobile App Promotion',
    description: 'Phone mockup with download links.',
    code: `<div style="background: #eff6ff; border-radius: 24px; padding: 40px; display: flex; align-items: center; gap: 40px; overflow: hidden; max-width: 600px; ${SANS}">
  <div style="flex: 1;">
    <h2 style="margin: 0 0 10px 0; color: #1e3a8a;">Manage on the go</h2>
    <p style="margin: 0 0 25px 0; color: #60a5fa; line-height: 1.6;">Get the full power of our dashboard right in your pocket. Available for iOS and Android.</p>
    <div style="display: flex; gap: 10px;">
      <div style="background: #1e3a8a; width: 40px; height: 40px; border-radius: 8px;"></div>
      <div style="background: #1e3a8a; width: 40px; height: 40px; border-radius: 8px;"></div>
    </div>
  </div>
  <div style="width: 140px; height: 260px; background: white; border: 4px solid #1e3a8a; border-radius: 20px; box-shadow: 0 20px 40px -10px rgba(30, 58, 138, 0.3); transform: rotate(-5deg) translateY(20px);">
    <div style="height: 20px; background: #f3f4f6; margin-bottom: 10px; border-radius: 0 0 10px 10px;"></div>
    <div style="padding: 15px;">
      <div style="height: 8px; width: 40%; background: #e5e7eb; border-radius: 4px; margin-bottom: 10px;"></div>
      <div style="height: 60px; background: #eff6ff; border-radius: 8px;"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-category-pills',
    category: 'Marketing',
    title: 'Category Filter Pills',
    description: 'Horizontal scrollable filters.',
    code: `<div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; ${SANS} white-space: nowrap;">
  <button style="background: #111827; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">All Posts</button>
  <button style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">Design</button>
  <button style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">Engineering</button>
  <button style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">Product</button>
  <button style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">Company</button>
</div>`
  },
  {
    id: 'mkt-author-bio',
    category: 'Marketing',
    title: 'Article Author Bio',
    description: 'Footer bio for blog posts.',
    code: `<div style="display: flex; gap: 20px; border-top: 1px solid #e5e7eb; padding-top: 25px; align-items: start; ${SANS} max-width: 500px;">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Annie" style="width: 70px; height: 70px; border-radius: 50%; border: 4px solid #f9fafb;">
  <div>
    <div style="font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 4px;">Written by</div>
    <h3 style="margin: 0 0 8px 0; color: #111827;">Annie Walker</h3>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563; line-height: 1.6;">Technical writer and frontend enthusiast. She loves simplifying complex topics for everyone.</p>
    <a href="#" style="color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none;">View Profile →</a>
  </div>
</div>`
  },
  {
    id: 'mkt-stat-circle',
    category: 'Marketing',
    title: 'Circular Stat',
    description: 'Radial progress statistic.',
    code: `<div style="position: relative; width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; ${SANS}">
  <svg width="100%" height="100%" viewBox="0 0 100 100" style="transform: rotate(-90deg);">
    <circle cx="50" cy="50" r="45" stroke="#f3f4f6" stroke-width="8" fill="none"></circle>
    <circle cx="50" cy="50" r="45" stroke="#8b5cf6" stroke-width="8" fill="none" stroke-dasharray="283" stroke-dashoffset="70" stroke-linecap="round"></circle>
  </svg>
  <div style="position: absolute; text-align: center;">
    <div style="font-size: 32px; font-weight: 800; color: #111827;">75%</div>
    <div style="font-size: 12px; color: #6b7280; font-weight: 600;">GROWTH</div>
  </div>
</div>`
  },
  {
    id: 'mkt-maintenance',
    category: 'Marketing',
    title: 'Maintenance Mode',
    description: 'Friendly downtime message.',
    code: `<div style="text-align: center; padding: 40px; ${SANS} max-width: 400px; margin: 0 auto;">
  <div style="font-size: 64px; margin-bottom: 20px;">🛠️</div>
  <h2 style="margin: 0 0 10px 0; color: #1f2937;">Under Maintenance</h2>
  <p style="margin: 0 0 25px 0; color: #6b7280; line-height: 1.6;">We're making things better. The site will be back up in approximately 30 minutes. Thanks for your patience!</p>
  <button style="background: #f3f4f6; color: #374151; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">Refresh Status</button>
</div>`
  },
  {
    id: 'mkt-search-hero',
    category: 'Marketing',
    title: 'Hero Search Box',
    description: 'Main search for help centers.',
    code: `<div style="background: linear-gradient(180deg, #f9fafb 0%, white 100%); padding: 60px 20px; text-align: center; border-radius: 12px; ${SANS}">
  <h2 style="margin: 0 0 15px 0; color: #111827; font-size: 28px;">How can we help?</h2>
  <div style="position: relative; max-width: 500px; margin: 0 auto;">
    <div style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #9ca3af;">🔍</div>
    <input type="text" placeholder="Search for articles..." style="width: 100%; padding: 16px 20px 16px 48px; border: 1px solid #e5e7eb; border-radius: 50px; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); outline: none;">
  </div>
  <div style="margin-top: 15px; font-size: 13px; color: #6b7280;">
    Popular: <a href="#" style="color: #2563eb;">Billing</a>, <a href="#" style="color: #2563eb;">API Keys</a>, <a href="#" style="color: #2563eb;">SSO</a>
  </div>
</div>`
  },
  {
    id: 'mkt-gradient-text',
    category: 'Marketing',
    title: 'Gradient Headline',
    description: 'Text with background clip.',
    code: `<h1 style="${SANS} font-size: 48px; font-weight: 900; letter-spacing: -1px; margin: 0; background: linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">
  Ship Scale Success.
</h1>`
  },
  {
    id: 'mkt-card-stack',
    category: 'Marketing',
    title: 'Stacked Cards',
    description: 'Depth effect with layered cards.',
    code: `<div style="position: relative; padding-top: 20px; ${SANS} max-width: 300px; margin: 0 auto;">
  <div style="position: absolute; top: 0; left: 10px; right: 10px; height: 100px; background: #e0e7ff; border-radius: 16px; z-index: 0;"></div>
  <div style="position: absolute; top: 10px; left: 5px; right: 5px; height: 100px; background: #c7d2fe; border-radius: 16px; z-index: 1;"></div>
  <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); position: relative; z-index: 2; text-align: center;">
    <div style="font-size: 30px; margin-bottom: 10px;">🦄</div>
    <h3 style="margin: 0 0 5px 0;">Magic Inside</h3>
    <p style="margin: 0; font-size: 13px; color: #6b7280;">Unlock the stack to see what's hidden beneath the surface.</p>
  </div>
</div>`
  },
  {
    id: 'mkt-rating-breakdown',
    category: 'Marketing',
    title: 'Rating Breakdown',
    description: 'Detailed review score bars.',
    code: `<div style="${SANS} max-width: 300px;">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
    <div style="font-size: 48px; font-weight: 800; color: #111827; line-height: 1;">4.8</div>
    <div>
      <div style="color: #fbbf24; font-size: 18px;">★★★★★</div>
      <div style="font-size: 12px; color: #6b7280;">2,453 Ratings</div>
    </div>
  </div>
  <div style="display: flex; flex-direction: column; gap: 6px;">
    <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #4b5563;">
      <span style="width: 10px;">5</span>
      <div style="flex: 1; height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;"><div style="width: 85%; height: 100%; background: #fbbf24;"></div></div>
      <span style="width: 30px; text-align: right;">85%</span>
    </div>
    <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #4b5563;">
      <span style="width: 10px;">4</span>
      <div style="flex: 1; height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;"><div style="width: 10%; height: 100%; background: #fbbf24;"></div></div>
      <span style="width: 30px; text-align: right;">10%</span>
    </div>
    <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #4b5563;">
      <span style="width: 10px;">3</span>
      <div style="flex: 1; height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;"><div style="width: 3%; height: 100%; background: #fbbf24;"></div></div>
      <span style="width: 30px; text-align: right;">3%</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'mkt-ribbon-badge',
    category: 'Marketing',
    title: 'Corner Ribbon',
    description: 'CSS-only corner ribbon.',
    code: `<div style="position: relative; width: 200px; height: 200px; background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; ${SANS}">
  <div style="background: #ef4444; color: white; padding: 5px 30px; position: absolute; top: 20px; right: -30px; transform: rotate(45deg); font-size: 10px; font-weight: 700; text-transform: uppercase; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Sale</div>
  <p>Product Image</p>
</div>`
  },
  {
    id: 'mkt-floating-action',
    category: 'Marketing',
    title: 'Floating Action Button',
    description: 'Support or chat button.',
    code: `<div style="position: relative; height: 100px; border: 1px dashed #ccc; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb;">
  <div style="position: absolute; bottom: 20px; right: 20px; width: 50px; height: 50px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4); cursor: pointer; transition: transform 0.2s;">💬</div>
  <span style="color: #9ca3af; font-size: 12px;">(Demo of fixed position)</span>
</div>`
  },
  {
    id: 'mkt-color-swatches',
    category: 'Marketing',
    title: 'Product Color Swatches',
    description: 'Selection for e-commerce.',
    code: `<div style="${SANS}">
  <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 10px;">Select Color: <span style="font-weight: 400; color: #6b7280;">Midnight Blue</span></div>
  <div style="display: flex; gap: 10px;">
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #1e1b4b; cursor: pointer; box-shadow: 0 0 0 2px white, 0 0 0 4px #1e1b4b;"></div>
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #b91c1c; cursor: pointer; border: 2px solid white;"></div>
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #047857; cursor: pointer; border: 2px solid white;"></div>
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #111827; cursor: pointer; border: 2px solid white;"></div>
  </div>
</div>`
  }
];

/**
 * Developer Components
 */
import { SANS, MONO } from '../utils.js';

export const developerComponents = [
  {
    id: 'dev-terminal-mac',
    category: 'Developer',
    title: 'macOS Terminal',
    description: 'Classic dark terminal window with traffic light buttons.',
    code: `<div style="background: #1e1e1e; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); overflow: hidden; ${SANS} max-width: 600px; margin: 20px 0;">
  <div style="background: #2d2d2d; padding: 10px 15px; display: flex; align-items: center; gap: 8px;">
    <span style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></span>
    <span style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></span>
    <span style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></span>
    <span style="margin-left: 10px; color: #999; font-size: 12px;">bash — 80x24</span>
  </div>
  <div style="padding: 20px; color: #fff; ${MONO} font-size: 14px; line-height: 1.5;">
    <div style="color: #4af626;">➜  ~ <span style="color: #fff;">npm install markdown-live-preview</span></div>
    <div style="color: #ccc;">+ markdown-live-preview@1.0.0</div>
    <div style="color: #ccc;">added 1 package in 0.45s</div>
    <div style="color: #4af626; margin-top: 10px;">➜  ~ <span class="cursor" style="display:inline-block; width:8px; height:15px; background:#fff;"></span></div>
  </div>
</div>`
  },
  {
    id: 'dev-code-block',
    category: 'Developer',
    title: 'Clean Code Snippet',
    description: 'A light-themed code block with line numbers.',
    code: `<div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 15px; ${MONO} font-size: 13px; line-height: 1.6; color: #212529; overflow-x: auto;">
  <div style="display: table;">
    <div style="display: table-row;">
      <span style="display: table-cell; text-align: right; padding-right: 15px; color: #adb5bd; user-select: none;">1</span>
      <span style="display: table-cell;"><span style="color: #d73a49;">const</span> <span style="color: #6f42c1;">sum</span> = (<span style="color: #e36209;">a</span>, <span style="color: #e36209;">b</span>) => {</span>
    </div>
    <div style="display: table-row;">
      <span style="display: table-cell; text-align: right; padding-right: 15px; color: #adb5bd; user-select: none;">2</span>
      <span style="display: table-cell;">&nbsp;&nbsp;<span style="color: #d73a49;">return</span> a + b;</span>
    </div>
    <div style="display: table-row;">
      <span style="display: table-cell; text-align: right; padding-right: 15px; color: #adb5bd; user-select: none;">3</span>
      <span style="display: table-cell;">};</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-git-diff',
    category: 'Developer',
    title: 'Git Diff Viewer',
    description: 'Visual representation of code changes (added/removed lines).',
    code: `<div style="${MONO} background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; overflow: hidden; font-size: 12px; line-height: 1.5; color: #24292f;">
  <div style="background: #f6f8fa; border-bottom: 1px solid #d0d7de; padding: 8px 12px; color: #57606a;">src/utils/math.js</div>
  <div style="display: grid; grid-template-columns: 40px 1fr;">
    <div style="background: #ffebe9; color: #cf222e; text-align: right; padding: 0 10px; user-select: none;">-</div>
    <div style="background: #ffebe9; color: #24292f;">const result = a * b;</div>
    <div style="background: #e6ffec; color: #1a7f37; text-align: right; padding: 0 10px; user-select: none;">+</div>
    <div style="background: #e6ffec; color: #24292f;">const result = a + b;</div>
    <div style="text-align: right; padding: 0 10px; color: #57606a; user-select: none;"> </div>
    <div>return result;</div>
  </div>
</div>`
  },
  {
    id: 'dev-api-badge',
    category: 'Developer',
    title: 'API Method Badges',
    description: 'Badges to document API endpoints (GET, POST, etc).',
    code: `<div style="${SANS} display: flex; gap: 10px; flex-wrap: wrap;">
  <span style="background: #e3f2fd; color: #1976d2; border: 1px solid #1976d2; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px;">GET</span>
  <span style="background: #e8f5e9; color: #2e7d32; border: 1px solid #2e7d32; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px;">POST</span>
  <span style="background: #fff3e0; color: #ef6c00; border: 1px solid #ef6c00; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px;">PUT</span>
  <span style="background: #ffebee; color: #c62828; border: 1px solid #c62828; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px;">DELETE</span>
</div>`
  },
  {
    id: 'dev-keyboard',
    category: 'Developer',
    title: 'Keyboard Keys',
    description: 'Realistic keyboard shortcuts styling.',
    code: `<div style="${SANS} font-size: 14px; color: #444;">
  Press <kbd style="background: #fff; border: 1px solid #ccc; border-bottom: 3px solid #b5b5b5; border-radius: 4px; padding: 4px 8px; font-family: inherit; font-size: 12px; font-weight: 600;">Ctrl</kbd> + <kbd style="background: #fff; border: 1px solid #ccc; border-bottom: 3px solid #b5b5b5; border-radius: 4px; padding: 4px 8px; font-family: inherit; font-size: 12px; font-weight: 600;">C</kbd> to copy.
</div>`
  },
  {
    id: 'dev-folder-tree',
    category: 'Developer',
    title: 'File Tree Structure',
    description: 'Visual representation of a project directory.',
    code: `<div style="${MONO} background: #f8f9fa; padding: 15px; border-radius: 8px; color: #333; line-height: 1.8;">
  <div>📂 src/</div>
  <div style="padding-left: 20px;">├── 📄 index.js</div>
  <div style="padding-left: 20px;">├── 📂 components/</div>
  <div style="padding-left: 40px;">├── 📄 Button.js</div>
  <div style="padding-left: 40px;">└── 📄 Header.js</div>
  <div style="padding-left: 20px;">└── 📄 utils.js</div>
  <div>📄 package.json</div>
</div>`
  },
  {
    id: 'dev-server-status',
    category: 'Developer',
    title: 'Server Status Indicators',
    description: 'Pills to show system health or uptime.',
    code: `<div style="${SANS} display: flex; gap: 15px;">
  <div style="display: flex; align-items: center; gap: 6px; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 6px 12px; border-radius: 20px; color: #065f46; font-size: 13px; font-weight: 600;">
    <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 0 2px #d1fae5;"></span>
    All Systems Normal
  </div>
  <div style="display: flex; align-items: center; gap: 6px; background: #fef2f2; border: 1px solid #fecaca; padding: 6px 12px; border-radius: 20px; color: #991b1b; font-size: 13px; font-weight: 600;">
    <span style="width: 8px; height: 8px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 0 2px #fee2e2;"></span>
    Downtime Detected
  </div>
</div>`
  },

  // ================= NEW PREMIUM DEVELOPER COMPONENTS =================
  {
    id: 'dev-vscode-window',
    category: 'Developer',
    title: 'VS Code Window',
    description: 'Modern editor interface with file tabs and status bar.',
    code: `<div style="background: #1e1e1e; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4); ${SANS} max-width: 650px;">
  <div style="background: #252526; padding: 10px; display: flex; font-size: 13px; color: #ccccc7;">
    <div style="background: #1e1e1e; padding: 5px 15px; border-radius: 5px 5px 0 0; border-top: 1px solid #007acc; display: flex; align-items: center; gap: 8px;">
      <span style="color: #e37933;">JS</span> app.js <span style="font-size: 10px; margin-left: 5px;">✕</span>
    </div>
    <div style="padding: 5px 15px; opacity: 0.6;">styles.css</div>
    <div style="padding: 5px 15px; opacity: 0.6;">README.md</div>
  </div>
  <div style="display: flex; ${MONO}">
    <div style="background: #1e1e1e; color: #858585; padding: 15px 10px; text-align: right; font-size: 13px; line-height: 1.5; border-right: 1px solid #333; user-select: none;">
      1<br>2<br>3<br>4<br>5
    </div>
    <div style="padding: 15px; color: #d4d4d4; font-size: 13px; line-height: 1.5;">
      <span style="color: #c586c0;">import</span> React <span style="color: #c586c0;">from</span> <span style="color: #ce9178;">'react'</span>;<br><br>
      <span style="color: #569cd6;">const</span> <span style="color: #dcdcaa;">App</span> = () => {<br>
      &nbsp;&nbsp;<span style="color: #c586c0;">return</span> <span style="color: #808080;">&lt;div&gt;</span>Hello World<span style="color: #808080;">&lt;/div&gt;</span>;<br>
      };
    </div>
  </div>
  <div style="background: #007acc; color: white; padding: 4px 10px; font-size: 11px; display: flex; justify-content: space-between;">
    <div style="display: flex; gap: 15px;">
      <span>main*</span>
      <span>0 errors</span>
    </div>
    <div style="display: flex; gap: 15px;">
      <span>Ln 5, Col 2</span>
      <span>UTF-8</span>
      <span>JavaScript React</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-cicd-pipeline',
    category: 'Developer',
    title: 'CI/CD Pipeline',
    description: 'Visual representation of a build pipeline.',
    code: `<div style="display: flex; align-items: center; gap: 10px; ${SANS} overflow-x: auto; padding: 10px 0;">
  <!-- Stage 1 -->
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div style="background: #dcfce7; border: 2px solid #22c55e; color: #15803d; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">✓</div>
    <div style="font-size: 12px; font-weight: 600; color: #374151;">Build</div>
    <div style="font-size: 10px; color: #6b7280;">1m 24s</div>
  </div>
  <div style="height: 2px; width: 50px; background: #22c55e; margin-top: -24px;"></div>
  <!-- Stage 2 -->
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div style="background: #dcfce7; border: 2px solid #22c55e; color: #15803d; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">✓</div>
    <div style="font-size: 12px; font-weight: 600; color: #374151;">Test</div>
    <div style="font-size: 10px; color: #6b7280;">4m 02s</div>
  </div>
  <div style="height: 2px; width: 50px; background: #22c55e; margin-top: -24px;"></div>
  <!-- Stage 3 -->
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div style="background: #dbeafe; border: 2px solid #3b82f6; color: #1d4ed8; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
      <div style="width: 16px; height: 16px; border: 2px solid #1d4ed8; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    </div>
    <div style="font-size: 12px; font-weight: 600; color: #374151;">Deploy</div>
    <div style="font-size: 10px; color: #6b7280;">Running...</div>
  </div>
  <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
</div>`
  },
  {
    id: 'dev-db-schema',
    category: 'Developer',
    title: 'Database Schema Table',
    description: 'Representation of a SQL table structure.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 300px; background: white; ${MONO}">
  <div style="background: #f3f4f6; padding: 10px 15px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; display: flex; justify-content: space-between;">
    <span>users</span>
    <span style="font-size: 10px; background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">TABLE</span>
  </div>
  <div style="padding: 0;">
    <div style="padding: 8px 15px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; font-size: 12px;">
      <span style="color: #111827;">id</span>
      <span style="color: #d97706;">UUID PK</span>
    </div>
    <div style="padding: 8px 15px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; font-size: 12px;">
      <span style="color: #111827;">email</span>
      <span style="color: #2563eb;">VARCHAR(255)</span>
    </div>
    <div style="padding: 8px 15px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; font-size: 12px;">
      <span style="color: #111827;">password_hash</span>
      <span style="color: #2563eb;">VARCHAR</span>
    </div>
    <div style="padding: 8px 15px; display: flex; justify-content: space-between; font-size: 12px;">
      <span style="color: #111827;">created_at</span>
      <span style="color: #059669;">TIMESTAMP</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-json-viewer',
    category: 'Developer',
    title: 'JSON Viewer',
    description: 'Formatted JSON data block.',
    code: `<div style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.5; ${MONO}">
  <div>{</div>
  <div style="padding-left: 20px;">
    <span style="color: #e06c75;">"status"</span>: <span style="color: #98c379;">"success"</span>,
  </div>
  <div style="padding-left: 20px;">
    <span style="color: #e06c75;">"data"</span>: {
  </div>
  <div style="padding-left: 40px;">
    <span style="color: #e06c75;">"id"</span>: <span style="color: #d19a66;">1024</span>,
  </div>
  <div style="padding-left: 40px;">
    <span style="color: #e06c75;">"username"</span>: <span style="color: #98c379;">"admin_user"</span>,
  </div>
  <div style="padding-left: 40px;">
    <span style="color: #e06c75;">"roles"</span>: [<span style="color: #98c379;">"read"</span>, <span style="color: #98c379;">"write"</span>]
  </div>
  <div style="padding-left: 20px;">}</div>
  <div>}</div>
</div>`
  },
  {
    id: 'dev-env-vars',
    category: 'Developer',
    title: 'Environment Variables',
    description: 'Secure configuration list.',
    code: `<div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; ${MONO} font-size: 13px;">
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">
    <span style="color: #334155; font-weight: bold;">NODE_ENV</span>
    <span style="color: #059669;">production</span>
  </div>
  <div style="margin-bottom: 10px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">
    <span style="color: #334155; font-weight: bold;">DB_HOST</span>
    <span style="color: #475569;">10.0.4.21</span>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="color: #334155; font-weight: bold;">API_KEY</span>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="color: #94a3b8; letter-spacing: 2px;">••••••••••••</span>
      <span style="font-size: 14px; cursor: pointer; opacity: 0.5;">👁️</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-docker-status',
    category: 'Developer',
    title: 'Docker Container List',
    description: 'CLI-style container status.',
    code: `<div style="background: #0f172a; color: #94a3b8; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 12px; ${MONO}">
  <div style="border-bottom: 1px solid #334155; padding-bottom: 5px; margin-bottom: 10px; color: #f8fafc; font-weight: bold; white-space: nowrap;">
    <span style="display: inline-block; width: 100px;">CONTAINER ID</span>
    <span style="display: inline-block; width: 150px;">IMAGE</span>
    <span style="display: inline-block; width: 120px;">STATUS</span>
    <span style="display: inline-block; width: 100px;">PORTS</span>
  </div>
  <div style="white-space: nowrap;">
    <span style="display: inline-block; width: 100px; color: #f1f5f9;">a1b2c3d4e5</span>
    <span style="display: inline-block; width: 150px; color: #60a5fa;">postgres:14</span>
    <span style="display: inline-block; width: 120px; color: #22c55e;">Up 2 hours</span>
    <span style="display: inline-block; width: 100px;">5432->5432</span>
  </div>
  <div style="white-space: nowrap; margin-top: 5px;">
    <span style="display: inline-block; width: 100px; color: #f1f5f9;">f6g7h8i9j0</span>
    <span style="display: inline-block; width: 150px; color: #60a5fa;">redis:alpine</span>
    <span style="display: inline-block; width: 120px; color: #22c55e;">Up 2 hours</span>
    <span style="display: inline-block; width: 100px;">6379->6379</span>
  </div>
</div>`
  },
  {
    id: 'dev-api-doc',
    category: 'Developer',
    title: 'API Endpoint Card',
    description: 'Documentation for a single REST endpoint.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white; ${SANS}">
  <div style="background: #f0f9ff; border-bottom: 1px solid #bae6fd; padding: 12px 20px; display: flex; align-items: center; gap: 15px;">
    <span style="background: #0ea5e9; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px;">GET</span>
    <span style="${MONO} color: #0c4a6e; font-size: 14px;">/v1/projects/{id}</span>
  </div>
  <div style="padding: 20px;">
    <div style="font-size: 13px; color: #6b7280; margin-bottom: 10px;">Retrieves details of a specific project.</div>
    <div style="font-weight: 600; font-size: 12px; color: #374151; margin-bottom: 5px;">Path Parameters</div>
    <div style="background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 6px; padding: 10px;">
      <div style="display: flex; gap: 10px; font-size: 13px;">
        <span style="${MONO} color: #d97706;">id</span>
        <span style="color: #9ca3af;">string</span>
        <span style="color: #ef4444;">required</span>
        <span style="color: #4b5563;">The unique identifier of the project</span>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-log-stream',
    category: 'Developer',
    title: 'Log Stream',
    description: 'Console output with log levels.',
    code: `<div style="background: #111; color: #eee; padding: 15px; border-radius: 6px; ${MONO} font-size: 12px; line-height: 1.6;">
  <div><span style="color: #6b7280;">2024-01-04 10:22:01</span> <span style="color: #22c55e; font-weight: bold;">INFO</span> Server started on port 3000</div>
  <div><span style="color: #6b7280;">2024-01-04 10:22:05</span> <span style="color: #3b82f6; font-weight: bold;">DEBUG</span> Connected to database</div>
  <div><span style="color: #6b7280;">2024-01-04 10:24:12</span> <span style="color: #eab308; font-weight: bold;">WARN</span> Response time > 500ms</div>
  <div><span style="color: #6b7280;">2024-01-04 10:25:30</span> <span style="color: #ef4444; font-weight: bold;">ERROR</span> Failed to process payment: timeout</div>
  <div><span style="color: #6b7280;">2024-01-04 10:25:31</span> <span style="color: #22c55e; font-weight: bold;">INFO</span> Retrying job #4492</div>
</div>`
  },
  {
    id: 'dev-browser-bar',
    category: 'Developer',
    title: 'Browser Address Bar',
    description: 'Mockup for web previews.',
    code: `<div style="background: #f3f4f6; padding: 8px 12px; border-radius: 8px; display: flex; gap: 10px; align-items: center; border: 1px solid #e5e7eb; ${SANS}">
  <div style="display: flex; gap: 6px;">
    <div style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></div>
    <div style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></div>
    <div style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"></div>
  </div>
  <div style="display: flex; gap: 10px; color: #6b7280; font-size: 14px;">
    <span>←</span><span>→</span><span>↻</span>
  </div>
  <div style="flex: 1; background: white; border-radius: 4px; padding: 4px 12px; font-size: 12px; color: #374151; display: flex; align-items: center; gap: 5px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
    <span style="color: #22c55e;">🔒</span> https://localhost:3000/dashboard
  </div>
</div>`
  },
  {
    id: 'dev-tech-stack',
    category: 'Developer',
    title: 'Tech Stack Grid',
    description: 'Minimal icons for technology usage.',
    code: `<div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; padding: 10px;">
  <div style="background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="30">
  </div>
  <div style="background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="30">
  </div>
  <div style="background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original-wordmark.svg" width="30">
  </div>
  <div style="background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="30">
  </div>
</div>`
  },
  {
    id: 'dev-git-graph',
    category: 'Developer',
    title: 'Git Branch Graph',
    description: 'Visualizing commit history.',
    code: `<div style="${SANS} background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
  <div style="display: flex; gap: 15px; margin-bottom: 15px;">
    <div style="display: flex; flex-direction: column; align-items: center; width: 20px;">
      <div style="width: 10px; height: 10px; border-radius: 50%; background: #3b82f6;"></div>
      <div style="width: 2px; height: 30px; background: #3b82f6;"></div>
    </div>
    <div>
      <div style="font-weight: bold; font-size: 14px; color: #1f2937;">feat: add user auth</div>
      <div style="font-size: 12px; color: #6b7280;">a4f92c • 2 hours ago</div>
    </div>
  </div>
  <div style="display: flex; gap: 15px; margin-bottom: 15px;">
    <div style="display: flex; flex-direction: column; align-items: center; width: 20px;">
      <div style="width: 10px; height: 10px; border-radius: 50%; background: #3b82f6;"></div>
      <div style="width: 2px; height: 30px; background: #e5e7eb;"></div>
    </div>
    <div>
      <div style="font-weight: bold; font-size: 14px; color: #1f2937;">fix: layout bug</div>
      <div style="font-size: 12px; color: #6b7280;">b2c89d • 4 hours ago</div>
    </div>
  </div>
  <div style="display: flex; gap: 15px;">
    <div style="display: flex; flex-direction: column; align-items: center; width: 20px;">
      <div style="width: 10px; height: 10px; border-radius: 50%; background: #9ca3af;"></div>
    </div>
    <div>
      <div style="font-weight: bold; font-size: 14px; color: #1f2937;">chore: initial commit</div>
      <div style="font-size: 12px; color: #6b7280;">f1a23b • 1 day ago</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-cloud-resource',
    category: 'Developer',
    title: 'Cloud Resource Card',
    description: 'AWS/Azure style instance details.',
    code: `<div style="border: 1px solid #e5e7eb; border-top: 4px solid #f97316; border-radius: 8px; background: white; padding: 15px; ${SANS} max-width: 300px;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
    <div style="font-weight: 700; color: #374151;">i-0a1b2c3d4e</div>
    <div style="background: #dcfce7; color: #15803d; font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Running</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
    <div>
      <div style="color: #6b7280; margin-bottom: 2px;">Type</div>
      <div style="color: #111827; font-weight: 500;">t3.micro</div>
    </div>
    <div>
      <div style="color: #6b7280; margin-bottom: 2px;">Region</div>
      <div style="color: #111827; font-weight: 500;">us-east-1</div>
    </div>
    <div>
      <div style="color: #6b7280; margin-bottom: 2px;">Public IP</div>
      <div style="color: #111827; font-weight: 500;">54.21.12.98</div>
    </div>
    <div>
      <div style="color: #6b7280; margin-bottom: 2px;">VPC ID</div>
      <div style="color: #111827; font-weight: 500;">vpc-928374</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-pr-review',
    category: 'Developer',
    title: 'Pull Request Review',
    description: 'GitHub style review status.',
    code: `<div style="border: 1px solid #d0d7de; border-radius: 6px; padding: 15px; background: white; ${SANS} max-width: 400px;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
    <div>
      <span style="color: #6b7280; font-size: 14px;">Reviewers</span>
    </div>
    <a href="#" style="color: #0969da; font-size: 13px; text-decoration: none;">Edit</a>
  </div>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="width: 20px; height: 20px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">✓</div>
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" style="width: 20px; height: 20px; border-radius: 50%;">
      <span style="font-size: 13px; font-weight: 600; color: #1f2937;">johndoe</span>
      <span style="font-size: 12px; color: #6b7280;">approved these changes</span>
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="width: 20px; height: 20px; background: #eab308; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">●</div>
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" style="width: 20px; height: 20px; border-radius: 50%;">
      <span style="font-size: 13px; font-weight: 600; color: #1f2937;">sarahsmith</span>
      <span style="font-size: 12px; color: #6b7280;">requested changes</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-system-monitor',
    category: 'Developer',
    title: 'System Monitor',
    description: 'CPU and Memory usage graphs.',
    code: `<div style="background: #1e1e1e; color: white; padding: 15px; border-radius: 8px; ${SANS} max-width: 250px;">
  <div style="margin-bottom: 15px;">
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
      <span style="color: #9ca3af;">CPU Usage</span>
      <span style="color: #60a5fa; font-weight: bold;">42%</span>
    </div>
    <div style="height: 6px; background: #374151; border-radius: 3px; overflow: hidden;">
      <div style="width: 42%; height: 100%; background: #60a5fa;"></div>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
      <span style="color: #9ca3af;">Memory</span>
      <span style="color: #c084fc; font-weight: bold;">1.2GB / 4GB</span>
    </div>
    <div style="height: 6px; background: #374151; border-radius: 3px; overflow: hidden;">
      <div style="width: 30%; height: 100%; background: #c084fc;"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-feature-flags',
    category: 'Developer',
    title: 'Feature Flags',
    description: 'Toggles for enabling features.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; ${SANS}">
  <div style="padding: 12px 15px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: 600; color: #374151; font-size: 14px;">Dark Mode</div>
      <div style="font-size: 11px; color: #9ca3af;">ui.theme.dark</div>
    </div>
    <div style="width: 36px; height: 20px; background: #2563eb; border-radius: 10px; position: relative;">
      <div style="width: 16px; height: 16px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div>
    </div>
  </div>
  <div style="padding: 12px 15px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: 600; color: #374151; font-size: 14px;">Beta Dashboard</div>
      <div style="font-size: 11px; color: #9ca3af;">app.dashboard.v2</div>
    </div>
    <div style="width: 36px; height: 20px; background: #e5e7eb; border-radius: 10px; position: relative;">
      <div style="width: 16px; height: 16px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.2);"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-kanban-col',
    category: 'Developer',
    title: 'Kanban Column',
    description: 'Task management column.',
    code: `<div style="background: #f3f4f6; padding: 12px; border-radius: 8px; width: 250px; ${SANS}">
  <div style="font-weight: 700; color: #4b5563; font-size: 13px; margin-bottom: 12px; display: flex; justify-content: space-between;">
    IN PROGRESS
    <span style="background: #e5e7eb; padding: 1px 6px; border-radius: 4px; font-size: 11px;">2</span>
  </div>
  <div style="background: white; padding: 10px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 8px; border: 1px solid #e5e7eb;">
    <div style="font-size: 13px; color: #1f2937; margin-bottom: 8px;">Refactor auth middleware</div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="background: #fee2e2; color: #991b1b; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600;">High</span>
      <div style="width: 20px; height: 20px; background: #3b82f6; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px;">JD</div>
    </div>
  </div>
  <div style="background: white; padding: 10px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
    <div style="font-size: 13px; color: #1f2937; margin-bottom: 8px;">Update documentation</div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="background: #dcfce7; color: #166534; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Low</span>
      <div style="width: 20px; height: 20px; background: #8b5cf6; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px;">MK</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-markdown-preview',
    category: 'Developer',
    title: 'Markdown Preview',
    description: 'Split view of raw MD and rendered output.',
    code: `<div style="display: flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; ${SANS}">
  <div style="flex: 1; background: #f9fafb; padding: 15px; border-right: 1px solid #e5e7eb; font-family: monospace; font-size: 12px; color: #374151;">
    # Hello World<br><br>
    This is **bold** text.<br>
    - Item 1<br>
    - Item 2
  </div>
  <div style="flex: 1; background: white; padding: 15px; font-size: 13px;">
    <h1 style="font-size: 18px; margin: 0 0 10px 0;">Hello World</h1>
    <p style="margin: 0 0 10px 0;">This is <strong>bold</strong> text.</p>
    <ul style="padding-left: 15px; margin: 0;">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</div>`
  },
  {
    id: 'dev-webhook-viewer',
    category: 'Developer',
    title: 'Webhook Payload',
    description: 'Header and body details.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white; ${MONO}">
  <div style="background: #f3f4f6; padding: 8px 15px; font-size: 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #e5e7eb;">HEADERS</div>
  <div style="padding: 10px 15px; font-size: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
    <div><span style="color: #6b7280;">Content-Type:</span> application/json</div>
    <div><span style="color: #6b7280;">X-GitHub-Event:</span> push</div>
  </div>
  <div style="background: #f3f4f6; padding: 8px 15px; font-size: 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #e5e7eb;">BODY</div>
  <div style="padding: 15px; font-size: 12px; color: #2563eb;">
    {<br>
    &nbsp;&nbsp;"ref": "refs/heads/main",<br>
    &nbsp;&nbsp;"repository": { "id": 12938 }<br>
    }
  </div>
</div>`
  },
  {
    id: 'dev-dependency-graph',
    category: 'Developer',
    title: 'Dependency Graph',
    description: 'Node based visualization.',
    code: `<div style="position: relative; height: 150px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; ${SANS} overflow: hidden;">
  <div style="position: absolute; top: 20px; left: 45%; background: #3b82f6; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; z-index: 2;">app</div>
  <div style="position: absolute; bottom: 20px; left: 20%; background: #64748b; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; z-index: 2;">utils</div>
  <div style="position: absolute; bottom: 20px; right: 20%; background: #64748b; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; z-index: 2;">ui-kit</div>
  <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
    <line x1="50%" y1="35" x2="25%" y2="120" stroke="#cbd5e1" stroke-width="2" />
    <line x1="50%" y1="35" x2="75%" y2="120" stroke="#cbd5e1" stroke-width="2" />
  </svg>
</div>`
  },
  {
    id: 'dev-version-badge',
    category: 'Developer',
    title: 'Semantic Version',
    description: 'Major.Minor.Patch breakdown.',
    code: `<div style="display: inline-flex; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; ${SANS}">
  <div style="background: #f3f4f6; padding: 6px 10px; font-size: 12px; font-weight: 600; color: #4b5563;">v</div>
  <div style="padding: 6px 10px; font-size: 12px; font-weight: 700; color: #111827;">
    <span style="color: #2563eb;">2</span>.<span style="color: #059669;">4</span>.<span style="color: #d97706;">1</span>
  </div>
</div>`
  },
  {
    id: 'dev-regex-tester',
    category: 'Developer',
    title: 'Regex Tester',
    description: 'Pattern matching highlight.',
    code: `<div style="${MONO} border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; font-size: 13px;">
  <div style="background: #f3f4f6; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">
    /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
  </div>
  <div style="padding: 12px; background: white; color: #374151;">
    <span style="background: #bbf7d0; color: #166534;">john@example.com</span><br>
    <span style="color: #ef4444; text-decoration: line-through;">invalid-email</span><br>
    <span style="background: #bbf7d0; color: #166534;">test@site.org</span>
  </div>
</div>`
  },
  {
    id: 'dev-upload-zone',
    category: 'Developer',
    title: 'File Upload Zone',
    description: 'Drag and drop area.',
    code: `<div style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 30px; text-align: center; background: #f8fafc; cursor: pointer; ${SANS}">
  <div style="font-size: 24px; color: #94a3b8; margin-bottom: 10px;">☁️</div>
  <div style="font-weight: 600; color: #475569; font-size: 14px;">Drag & Drop files here</div>
  <div style="font-size: 12px; color: #94a3b8; margin-top: 5px;">or click to browse</div>
</div>`
  },
  {
    id: 'dev-sql-block',
    category: 'Developer',
    title: 'SQL Query Block',
    description: 'Syntax highlighted SQL.',
    code: `<div style="background: #fdf6e3; color: #657b83; padding: 15px; border-radius: 6px; border: 1px solid #eee8d5; ${MONO} font-size: 13px;">
  <span style="color: #859900; font-weight: bold;">SELECT</span> id, username, email<br>
  <span style="color: #859900; font-weight: bold;">FROM</span> users<br>
  <span style="color: #859900; font-weight: bold;">WHERE</span> active = <span style="color: #2aa198;">true</span><br>
  <span style="color: #859900; font-weight: bold;">ORDER BY</span> created_at <span style="color: #859900; font-weight: bold;">DESC</span>;<br>
</div>`
  },
  {
    id: 'dev-hex-palette',
    category: 'Developer',
    title: 'Hex Palette',
    description: 'Color codes for design systems.',
    code: `<div style="display: flex; gap: 10px; ${MONO} font-size: 12px;">
  <div style="text-align: center;">
    <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 8px; margin-bottom: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
    <div style="color: #4b5563;">#3b82f6</div>
  </div>
  <div style="text-align: center;">
    <div style="width: 40px; height: 40px; background: #ef4444; border-radius: 8px; margin-bottom: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
    <div style="color: #4b5563;">#ef4444</div>
  </div>
  <div style="text-align: center;">
    <div style="width: 40px; height: 40px; background: #10b981; border-radius: 8px; margin-bottom: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
    <div style="color: #4b5563;">#10b981</div>
  </div>
</div>`
  },
  {
    id: 'dev-error-trace',
    category: 'Developer',
    title: 'Error Stack Trace',
    description: 'Simulated runtime error.',
    code: `<div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: 6px; padding: 15px; color: #c53030; font-size: 12px; line-height: 1.6; ${MONO} overflow-x: auto;">
  <div style="font-weight: bold; margin-bottom: 5px;">ReferenceError: process is not defined</div>
  <div style="padding-left: 20px; color: #742a2a;">
    at calculateTotal (app.js:42:15)<br>
    at HTMLButtonElement.handleClick (ui.js:12:4)<br>
    at invokeGuardedCallbackImpl (react-dom.js:150:20)
  </div>
</div>`
  },
  {
    id: 'dev-mobile-frame',
    category: 'Developer',
    title: 'Mobile Device Frame',
    description: 'Simple phone mockup for web previews.',
    code: `<div style="border: 8px solid #1f2937; border-radius: 20px; width: 200px; height: 350px; overflow: hidden; position: relative; background: white; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
  <div style="background: #f3f4f6; height: 40px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e5e7eb;">
    <div style="width: 80px; height: 8px; background: #d1d5db; border-radius: 4px;"></div>
  </div>
  <div style="padding: 20px; text-align: center; ${SANS}">
    <h3 style="color: #111827;">Mobile Web</h3>
    <p style="font-size: 14px; color: #6b7280;">Responsive testing is crucial for modern apps.</p>
    <button style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-size: 12px; margin-top: 10px;">Action</button>
  </div>
  <div style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 60px; height: 4px; background: #1f2937; border-radius: 2px;"></div>
</div>`
  },
  {
    id: 'dev-graphql-split',
    category: 'Developer',
    title: 'GraphQL Query',
    description: 'Query and variables view.',
    code: `<div style="display: flex; background: #2f3640; border-radius: 8px; overflow: hidden; ${MONO} font-size: 12px; color: white;">
  <div style="flex: 1; padding: 15px; border-right: 1px solid #485460;">
    <div style="color: #00d2d3; margin-bottom: 10px;"># Query</div>
    <span style="color: #ff9ff3;">query</span> GetUser {<br>
    &nbsp;&nbsp;user(id: <span style="color: #54a0ff;">1</span>) {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;name<br>
    &nbsp;&nbsp;&nbsp;&nbsp;email<br>
    &nbsp;&nbsp;}<br>
    }
  </div>
  <div style="flex: 1; padding: 15px; background: #353b48;">
    <div style="color: #00d2d3; margin-bottom: 10px;"># Variables</div>
    {<br>
    &nbsp;&nbsp;<span style="color: #54a0ff;">"includeProfile"</span>: <span style="color: #feca57;">true</span><br>
    }
  </div>
</div>`
  },
  {
    id: 'dev-font-pair',
    category: 'Developer',
    title: 'Font Pairing',
    description: 'Typography documentation.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: white;">
  <div style="margin-bottom: 20px;">
    <div style="font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 5px;">Heading Font</div>
    <div style="font-family: monospace; color: #6b7280; font-size: 12px;">font-family: 'Inter', sans-serif;</div>
  </div>
  <div>
    <div style="font-family: 'Merriweather', serif; font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 5px;">
      Body text should be legible and comfortable to read. This uses a serif font for better readability in long-form content.
    </div>
    <div style="font-family: monospace; color: #6b7280; font-size: 12px;">font-family: 'Merriweather', serif;</div>
  </div>
</div>`
  },
  {
    id: 'dev-status-timeline',
    category: 'Developer',
    title: 'Status Timeline',
    description: 'Incident history log.',
    code: `<div style="${SANS} max-width: 300px;">
  <div style="padding-left: 20px; border-left: 2px solid #e5e7eb; position: relative; padding-bottom: 20px;">
    <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></div>
    <div style="font-size: 13px; color: #6b7280;">Today, 10:00 AM</div>
    <div style="font-weight: 600; color: #111827;">All systems operational</div>
  </div>
  <div style="padding-left: 20px; border-left: 2px solid #e5e7eb; position: relative; padding-bottom: 20px;">
    <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: #eab308; border-radius: 50%;"></div>
    <div style="font-size: 13px; color: #6b7280;">Yesterday, 4:30 PM</div>
    <div style="font-weight: 600; color: #111827;">Increased latency detected</div>
    <div style="font-size: 12px; color: #4b5563; margin-top: 4px;">Resolved in 15 mins</div>
  </div>
  <div style="padding-left: 20px; border-left: 2px solid #e5e7eb; position: relative;">
    <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></div>
    <div style="font-size: 13px; color: #6b7280;">Jan 2, 9:00 AM</div>
    <div style="font-weight: 600; color: #111827;">Maintenance completed</div>
  </div>
</div>`
  },
  {
    id: 'dev-command-palette',
    category: 'Developer',
    title: 'Command Palette',
    description: 'Ctrl+K style search interface.',
    code: `<div style="background: #1e1e1e; border-radius: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden; width: 400px; ${SANS}">
  <div style="padding: 15px; border-bottom: 1px solid #333;">
    <input type="text" placeholder="Type a command..." style="background: transparent; border: none; color: white; font-size: 16px; width: 100%; outline: none;">
  </div>
  <div style="padding: 5px 0;">
    <div style="padding: 8px 15px; color: #e5e7eb; font-size: 13px; cursor: pointer; background: #2563eb;">> Create New Project</div>
    <div style="padding: 8px 15px; color: #9ca3af; font-size: 13px; cursor: pointer;">> Open Settings</div>
    <div style="padding: 8px 15px; color: #9ca3af; font-size: 13px; cursor: pointer;">> Go to Documentation</div>
  </div>
  <div style="padding: 8px 15px; background: #252526; color: #6b7280; font-size: 11px; text-align: right; border-top: 1px solid #333;">
    <span style="background: #333; padding: 2px 4px; border-radius: 3px;">ESC</span> to close
  </div>
</div>`
  },
  // ================= BATCH 2: 12 MORE DEV COMPONENTS =================
  {
    id: 'dev-k8s-pod',
    category: 'Developer',
    title: 'K8s Pod View',
    description: 'Kubernetes pod status card.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; background: white; ${SANS} width: 250px;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
    <div style="font-weight: 700; color: #3b82f6;">frontend-7b8c9d</div>
    <div style="font-size: 20px;">📦</div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 10px;">
    <div style="height: 6px; background: #22c55e; border-radius: 3px;"></div>
    <div style="height: 6px; background: #22c55e; border-radius: 3px;"></div>
    <div style="height: 6px; background: #22c55e; border-radius: 3px;"></div>
    <div style="height: 6px; background: #e5e7eb; border-radius: 3px;"></div>
  </div>
  <div style="font-size: 12px; color: #6b7280; display: flex; justify-content: space-between;">
    <span>3/4 Ready</span>
    <span>Restarts: 0</span>
  </div>
</div>`
  },
  {
    id: 'dev-network-topology',
    category: 'Developer',
    title: 'Network Topology',
    description: 'Simple service mesh visualization.',
    code: `<div style="position: relative; height: 160px; width: 280px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; ${SANS}">
  <!-- Central Hub -->
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: white; border: 2px solid #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 2; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">API</div>
  
  <!-- Nodes -->
  <div style="position: absolute; top: 20px; left: 20px; width: 40px; height: 40px; background: white; border: 2px solid #64748b; border-radius: 8px; z-index: 2;"></div>
  <div style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; background: white; border: 2px solid #64748b; border-radius: 8px; z-index: 2;"></div>
  <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: white; border: 2px solid #10b981; border-radius: 50%; z-index: 2; display: flex; align-items: center; justify-content: center; font-size: 10px;">DB</div>
  
  <!-- Lines -->
  <svg style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1;">
    <line x1="14%" y1="25%" x2="50%" y2="50%" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4" />
    <line x1="86%" y1="25%" x2="50%" y2="50%" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4" />
    <line x1="50%" y1="88%" x2="50%" y2="50%" stroke="#cbd5e1" stroke-width="2" />
  </svg>
</div>`
  },
  {
    id: 'dev-analytics-graph',
    category: 'Developer',
    title: 'Request Analytics',
    description: 'Bar chart for API requests.',
    code: `<div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; width: 300px; ${SANS}">
  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px;">
    <div>
      <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Requests / Sec</div>
      <div style="font-size: 24px; font-weight: 800; color: #111827;">1,248</div>
    </div>
    <div style="color: #10b981; font-size: 12px; font-weight: 600;">+12%</div>
  </div>
  <div style="display: flex; gap: 4px; align-items: flex-end; height: 60px;">
    <div style="flex: 1; background: #e5e7eb; height: 40%; border-radius: 2px;"></div>
    <div style="flex: 1; background: #e5e7eb; height: 60%; border-radius: 2px;"></div>
    <div style="flex: 1; background: #e5e7eb; height: 45%; border-radius: 2px;"></div>
    <div style="flex: 1; background: #3b82f6; height: 85%; border-radius: 2px;"></div>
    <div style="flex: 1; background: #e5e7eb; height: 70%; border-radius: 2px;"></div>
    <div style="flex: 1; background: #e5e7eb; height: 50%; border-radius: 2px;"></div>
    <div style="flex: 1; background: #e5e7eb; height: 65%; border-radius: 2px;"></div>
  </div>
</div>`
  },
  {
    id: 'dev-session-replay',
    category: 'Developer',
    title: 'Session Replay',
    description: 'Player controls for user sessions.',
    code: `<div style="background: #111827; border-radius: 8px; padding: 15px; color: white; width: 400px; ${SANS}">
  <div style="background: #374151; height: 200px; border-radius: 4px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
    Session Recording #8421
  </div>
  <div style="display: flex; align-items: center; gap: 15px;">
    <button style="background: none; border: none; color: white; cursor: pointer;">⏮</button>
    <button style="background: white; border: none; color: #111827; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">▶</button>
    <button style="background: none; border: none; color: white; cursor: pointer;">⏭</button>
    <div style="flex: 1; height: 4px; background: #374151; border-radius: 2px; position: relative;">
      <div style="position: absolute; left: 0; top: 0; height: 100%; width: 45%; background: #60a5fa; border-radius: 2px;"></div>
      <div style="position: absolute; left: 45%; top: -3px; width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
    </div>
    <div style="font-size: 12px; font-family: monospace;">04:12</div>
  </div>
</div>`
  },
  {
    id: 'dev-token-input',
    category: 'Developer',
    title: 'Token Input',
    description: 'Secure API token field.',
    code: `<div style="${SANS} max-width: 350px;">
  <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 5px;">Personal Access Token</label>
  <div style="display: flex; gap: 10px;">
    <div style="flex: 1; position: relative;">
      <input type="text" value="ghp_7A9..." readonly style="width: 100%; padding: 10px 35px 10px 10px; border: 1px solid #e5e7eb; border-radius: 6px; background: #f9fafb; color: #6b7280; outline: none;">
      <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; opacity: 0.5;">📋</span>
    </div>
    <button style="background: white; border: 1px solid #d1d5db; padding: 0 15px; border-radius: 6px; font-size: 13px; font-weight: 600; color: #374151; cursor: pointer;">Regenerate</button>
  </div>
  <div style="font-size: 11px; color: #ef4444; margin-top: 5px;">⚠️ Expires in 2 days</div>
</div>`
  },
  {
    id: 'dev-lighthouse-score',
    category: 'Developer',
    title: 'Lighthouse Score',
    description: 'Web vitals performance circles.',
    code: `<div style="display: flex; gap: 20px; ${SANS}">
  <div style="text-align: center;">
    <div style="width: 60px; height: 60px; border-radius: 50%; border: 4px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #065f46; margin-bottom: 5px;">98</div>
    <div style="font-size: 12px; color: #4b5563;">Performance</div>
  </div>
  <div style="text-align: center;">
    <div style="width: 60px; height: 60px; border-radius: 50%; border: 4px solid #10b981; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #065f46; margin-bottom: 5px;">100</div>
    <div style="font-size: 12px; color: #4b5563;">Accessibility</div>
  </div>
  <div style="text-align: center;">
    <div style="width: 60px; height: 60px; border-radius: 50%; border: 4px solid #eab308; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #854d0e; margin-bottom: 5px;">85</div>
    <div style="font-size: 12px; color: #4b5563;">Best Practices</div>
  </div>
</div>`
  },
  {
    id: 'dev-branch-protection',
    category: 'Developer',
    title: 'Branch Rules',
    description: 'Settings for git branches.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; ${SANS} max-width: 400px;">
  <div style="background: #f9fafb; padding: 12px 15px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; font-size: 14px;">Branch protection rules</div>
  <div style="padding: 15px; background: white;">
    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
      <input type="checkbox" checked style="margin-top: 4px;">
      <div>
        <div style="font-size: 14px; font-weight: 500; color: #111827;">Require pull request reviews</div>
        <div style="font-size: 12px; color: #6b7280;">Approvals required: 1</div>
      </div>
    </div>
    <div style="display: flex; gap: 10px;">
      <input type="checkbox" checked style="margin-top: 4px;">
      <div>
        <div style="font-size: 14px; font-weight: 500; color: #111827;">Require status checks to pass</div>
        <div style="font-size: 12px; color: #6b7280;">ci/build, ci/test</div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'dev-user-role',
    category: 'Developer',
    title: 'Role Manager',
    description: 'User permission selector.',
    code: `<div style="${SANS} border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; width: 300px;">
  <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 10px;">Member Role</div>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <label style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border: 1px solid #2563eb; background: #eff6ff; border-radius: 6px; cursor: pointer;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="radio" name="role" checked>
        <span style="font-size: 14px; font-weight: 500; color: #1e3a8a;">Admin</span>
      </div>
      <span style="font-size: 11px; color: #60a5fa;">Full access</span>
    </label>
    <label style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="radio" name="role">
        <span style="font-size: 14px; color: #374151;">Developer</span>
      </div>
      <span style="font-size: 11px; color: #9ca3af;">Can deploy</span>
    </label>
  </div>
</div>`
  },
  {
    id: 'dev-changelog-item',
    category: 'Developer',
    title: 'Changelog Item',
    description: 'Formatted release note.',
    code: `<div style="${SANS}">
  <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px;">
    <h3 style="margin: 0; font-size: 18px;">v2.1.0</h3>
    <span style="background: #dcfce7; color: #166534; font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Latest</span>
    <span style="color: #6b7280; font-size: 13px;">October 24, 2025</span>
  </div>
  <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.6;">
    <li><span style="background: #dbeafe; color: #1e40af; padding: 0 4px; border-radius: 3px; font-size: 11px; font-weight: 700;">NEW</span> Added support for dark mode in dashboard</li>
    <li><span style="background: #fce7f3; color: #9d174d; padding: 0 4px; border-radius: 3px; font-size: 11px; font-weight: 700;">FIX</span> Resolved memory leak in worker process</li>
    <li>Improved API response time by 20%</li>
  </ul>
</div>`
  },
  {
    id: 'dev-webhook-status',
    category: 'Developer',
    title: 'Webhook Status',
    description: 'List of recent hook deliveries.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; ${MONO} font-size: 12px; max-width: 400px;">
  <div style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 10px;">
    <span style="color: #16a34a;">● 200 OK</span>
    <span style="color: #6b7280; flex: 1; text-align: right;">2m ago</span>
  </div>
  <div style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 10px;">
    <span style="color: #dc2626;">● 500 Error</span>
    <span style="color: #6b7280; flex: 1; text-align: right;">15m ago</span>
    <button style="border: 1px solid #d1d5db; background: white; border-radius: 3px; cursor: pointer; padding: 2px 6px;">Retry</button>
  </div>
  <div style="padding: 10px 15px; display: flex; align-items: center; gap: 10px;">
    <span style="color: #16a34a;">● 200 OK</span>
    <span style="color: #6b7280; flex: 1; text-align: right;">1h ago</span>
  </div>
</div>`
  },
  {
    id: 'dev-sso-login',
    category: 'Developer',
    title: 'SSO Login Buttons',
    description: 'Developer login options.',
    code: `<div style="display: flex; flex-direction: column; gap: 10px; width: 250px; ${SANS}">
  <button style="background: #24292f; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
    <img src="https://simpleicons.org/icons/github.svg" width="16" style="filter: invert(1);"> Continue with GitHub
  </button>
  <button style="background: white; color: #374151; border: 1px solid #d1d5db; padding: 10px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
    <img src="https://simpleicons.org/icons/google.svg" width="16"> Continue with Google
  </button>
</div>`
  },
  {
    id: 'dev-repo-card',
    category: 'Developer',
    title: 'Repo Card',
    description: 'GitHub repository preview.',
    code: `<div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; max-width: 350px; ${SANS} background: white;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
    <svg height="16" viewBox="0 0 16 16" width="16" fill="#6b7280"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
    <a href="#" style="color: #0969da; font-weight: 600; text-decoration: none;">facebook/react</a>
  </div>
  <p style="color: #4b5563; font-size: 13px; margin: 0 0 15px 0;">The library for web and native user interfaces</p>
  <div style="display: flex; gap: 15px; font-size: 12px; color: #6b7280;">
    <div style="display: flex; align-items: center; gap: 3px;">
      <div style="width: 10px; height: 10px; background: #f1e05a; border-radius: 50%;"></div> JavaScript
    </div>
    <div style="display: flex; align-items: center; gap: 3px;">
      ★ 213k
    </div>
    <div style="display: flex; align-items: center; gap: 3px;">
      ⑂ 45.1k
    </div>
  </div>
</div>`
  }
];

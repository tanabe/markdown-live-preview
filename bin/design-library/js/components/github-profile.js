/**
 * GitHub Profile Components
 */
import { SANS, MONO } from '../utils.js';

export const githubProfileComponents = [
  {
    id: 'gh-header-typing',
    category: 'GitHub Profile',
    title: 'Typing Intro Header',
    description: 'Centered header with typing effect image.',
    code: `<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2196F3&center=true&vCenter=true&width=435&lines=Hi+There!+%F0%9F%91%8B;I'm+a+Full+Stack+Developer;I+Love+Open+Source" alt="Typing SVG" />
  <h2 style="border-bottom: none;">🚀 Welcome to my profile!</h2>
  <p>Building meaningful software to solve real-world problems.</p>
</div>`
  },
  {
    id: 'gh-stats-row',
    category: 'GitHub Profile',
    title: 'Stats & Languages Row',
    description: 'Side-by-side stats cards (Requires github-readme-stats).',
    code: `<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical&hide_border=true" height="180" alt="stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact&theme=radical&hide_border=true" height="180" alt="languages" />
</div>`
  },
  {
    id: 'gh-streak-graph',
    category: 'GitHub Profile',
    title: 'Contribution Streak',
    description: 'Displays your coding streak.',
    code: `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=radical&hide_border=true" alt="streak stats" />
</div>`
  },
  {
    id: 'gh-social-badges',
    category: 'GitHub Profile',
    title: 'Social Connect Badges',
    description: 'Clean row of social media badges.',
    code: `<p align="center">
  <a href="https://twitter.com/" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="twitter" />
  </a>
  <a href="https://linkedin.com/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" />
  </a>
  <a href="https://instagram.com/" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="instagram" />
  </a>
</p>`
  },
  {
    id: 'gh-tech-stack',
    category: 'GitHub Profile',
    title: 'Tech Stack Grid',
    description: 'Organized list of technology icons.',
    code: `<h3 align="left">🛠 Languages and Tools:</h3>
<p align="left">
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> 
  </a> 
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 
  </a> 
  <a href="https://www.python.org" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> 
  </a> 
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> 
    <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
  </a>
</p>`
  },
  {
    id: 'gh-snake-anim',
    category: 'GitHub Profile',
    title: 'Contribution Snake',
    description: 'The famous eating snake animation for your graph.',
    code: `<div align="center">
  <img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" alt="snake animation" />
</div>
<!-- Note: This requires a GitHub Action to generate the SVG in your repo -->`
  },
  {
    id: 'gh-about-table',
    category: 'GitHub Profile',
    title: 'About Me Table',
    description: 'Two-column layout for text and image/gif.',
    code: `<table>
  <tr>
    <td width="60%">
      <h2>Hi, I'm Alex! 👋</h2>
      <ul>
        <li>🔭 I’m currently working on <strong>Open Source</strong></li>
        <li>🌱 I’m currently learning <strong>Rust & Go</strong></li>
        <li>👯 I’m looking to collaborate on <strong>React Projects</strong></li>
        <li>📫 How to reach me: <strong>alex@example.com</strong></li>
      </ul>
    </td>
    <td width="40%">
      <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="100%" alt="Coding GIF" />
    </td>
  </tr>
</table>`
  },
  {
    id: 'gh-project-showcase',
    category: 'GitHub Profile',
    title: 'Project Showcase',
    description: 'Table layout to show off top repos.',
    code: `<table>
  <tr>
    <td width="50%">
      <h3 align="center">Project A</h3>
      <p align="center">An amazing tool for developers.</p>
      <p align="center">
        <a href="#">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=markdown-live-preview&theme=radical" alt="Project A" />
        </a>
      </p>
    </td>
    <td width="50%">
      <h3 align="center">Project B</h3>
      <p align="center">A library that does cool stuff.</p>
      <p align="center">
        <a href="#">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=another-repo&theme=radical" alt="Project B" />
        </a>
      </p>
    </td>
  </tr>
</table>`
  },
  {
    id: 'gh-footer-wave',
    category: 'GitHub Profile',
    title: 'Waving Footer',
    description: 'Animated colorful footer.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%" />
</div>`
  },
  {
    id: 'gh-visitors',
    category: 'GitHub Profile',
    title: 'Visitor Counter',
    description: 'Count how many people viewed your profile.',
    code: `<p align="left">
  <img src="https://komarev.com/ghpvc/?username=anuraghazra&label=Profile%20Views&color=0e75b6&style=flat" alt="anuraghazra" />
</p>`
  },
  {
    id: 'gh-accordion-connect',
    category: 'GitHub Profile',
    title: 'Dropdown Contact',
    description: 'Clean dropdown for contact details.',
    code: `<details>
  <summary><strong>📫 Connect with me</strong></summary>
  <br />
  <ul>
    <li><a href="https://twitter.com/">Twitter</a></li>
    <li><a href="https://linkedin.com/">LinkedIn</a></li>
    <li><a href="mailto:email@example.com">Email Me</a></li>
  </ul>
</details>`
  },
  {
    id: 'gh-trophy',
    category: 'GitHub Profile',
    title: 'GitHub Trophy',
    description: 'Display your GitHub achievements as trophies.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=radical&no-frame=true&no-bg=true&margin-w=4" alt="trophies" />
</div>`
  },
  {
    id: 'gh-activity-graph',
    category: 'GitHub Profile',
    title: 'Activity Graph',
    description: 'Contribution activity graph with custom theme.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=react-dark&hide_border=true&area=true" alt="activity graph" />
</div>`
  },
  {
    id: 'gh-wakatime',
    category: 'GitHub Profile',
    title: 'WakaTime Stats',
    description: 'Show your coding time stats.',
    code: `<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=anuraghazra&theme=radical&hide_border=true" alt="wakatime stats" />
</div>`
  },
  {
    id: 'gh-language-icons',
    category: 'GitHub Profile',
    title: 'Language Icon Badges',
    description: 'Colorful language proficiency badges.',
    code: `<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
</p>`
  },
  {
    id: 'gh-tools-badges',
    category: 'GitHub Profile',
    title: 'Tools & Platforms',
    description: 'Badges for tools and platforms you use.',
    code: `<p align="center">
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
</p>`
  },
  {
    id: 'gh-header-capsule',
    category: 'GitHub Profile',
    title: 'Capsule Render Header',
    description: 'Dynamic animated header with various types.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Welcome!&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=ffffff" width="100%" />
</div>`
  },
  {
    id: 'gh-spotify',
    category: 'GitHub Profile',
    title: 'Spotify Now Playing',
    description: 'Show what you are currently listening to on Spotify.',
    code: `<div align="center">
  <a href="https://open.spotify.com/user/YOUR_SPOTIFY_USER_ID">
    <img src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" height="40" />
  </a>
</div>
<!-- Setup: spotify-github-profile.kittinanx.com with your Spotify account -->`
  },
  {
    id: 'gh-profile-3d',
    category: 'GitHub Profile',
    title: '3D Contribution Profile',
    description: '3D visualization of your contributions.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=react-dark&hide_border=true&area=true" alt="Activity Graph" width="100%" />
</div>
<!-- Alternative: Activity graph visualization -->`
  },
  {
    id: 'gh-quotes',
    category: 'GitHub Profile',
    title: 'Random Dev Quote',
    description: 'Daily motivational quote for developers.',
    code: `<div align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" alt="quote" />
</div>`
  },
  {
    id: 'gh-jokes',
    category: 'GitHub Profile',
    title: 'Random Dev Joke',
    description: 'Programming jokes to lighten the mood.',
    code: `<div align="center">
      <img src="https://readme-jokes.vercel.app/api?theme=radical&hideBorder" alt="joke" />
  </div>`
  },
  // ================= NEW PREMIUM GITHUB PROFILE COMPONENTS =================
  {
    id: 'gh-header-wave-gradient',
    category: 'GitHub Profile',
    title: 'Waving Header (Gradient)',
    description: 'Beautiful gradient header with wave animation.',
    code: `<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&section=header&text=Hello%20World&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Welcome%20to%20my%20creative%20space&descAlignY=51&descAlign=62" width="100%" />
  </div>`
  },
  {
    id: 'gh-header-rect-soft',
    category: 'GitHub Profile',
    title: 'Soft Rect Header',
    description: 'Clean rectangular header with soft colors.',
    code: `<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=rect&color=0:b9ff73,100:0099ff&height=150&section=header&text=Hi%20there!&fontSize=70&fontColor=ffffff" width="100%" />
  </div>`
  },
  {
    id: 'gh-skill-icons-row',
    category: 'GitHub Profile',
    title: 'Modern Skill Icons',
    description: 'Clean, circular skill icons by skill-icons.',
    code: `<p align="center">
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=js,ts,react,nextjs,nodejs,express,mongodb,postgresql,docker,kubernetes,aws,gcp,linux,git&perline=14" />
    </a>
  </p>`
  },
  {
    id: 'gh-stats-solar',
    category: 'GitHub Profile',
    title: 'Solar System Stats',
    description: 'Visual stats representation (Solar theme).',
    code: `<div align="center">
    <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=anuraghazra&theme=solarized_dark" alt="profile details" />
  </div>`
  },
  {
    id: 'gh-metrics-isocalendar',
    category: 'GitHub Profile',
    title: 'Isometric Calendar',
    description: '3D calendar view of contributions.',
    code: `<div align="center">
    <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=anuraghazra&theme=github_dark" alt="isometric calendar" width="100%" />
  </div>
  <!-- Alternative: github-profile-summary-cards -->`
  },
  {
    id: 'gh-metrics-habits',
    category: 'GitHub Profile',
    title: 'Coding Habits',
    description: 'Day/Night coding distribution.',
    code: `<div align="center">
    <img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=anuraghazra&theme=github_dark&utcOffset=8" alt="coding habits" width="100%" />
  </div>
  <!-- Shows most productive hours -->`
  },
  {
    id: 'gh-star-history',
    category: 'GitHub Profile',
    title: 'Star History Chart',
    description: 'Chart showing star growth over time.',
    code: `<div align="center">
    <a href="https://star-history.com/#anuraghazra/github-readme-stats&Timeline">
      <img src="https://api.star-history.com/svg?repos=anuraghazra/github-readme-stats&type=Timeline" alt="Star History Chart" width="100%" />
    </a>
  </div>`
  },
  {
    id: 'gh-buymeacoffee',
    category: 'GitHub Profile',
    title: 'Buy Me A Coffee',
    description: 'Standard donation badge.',
    code: `<div align="center">
    <a href="https://www.buymeacoffee.com/anuraghazra" target="_blank">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217" />
    </a>
  </div>`
  },
  {
    id: 'gh-sponsors-heart',
    category: 'GitHub Profile',
    title: 'GitHub Sponsors Heart',
    description: 'Pink heart badge for sponsors.',
    code: `<div align="center">
    <iframe src="https://github.com/sponsors/anuraghazra/button" title="Sponsor anuraghazra" height="35" width="116" style="border: 0;"></iframe>
  </div>`
  },
  {
    id: 'gh-discord-status',
    category: 'GitHub Profile',
    title: 'Discord Presence',
    description: 'Live Discord status badge.',
    code: `<div align="center">
    <a href="https://discord.gg/your-invite-code">
      <img src="https://lanyard.cnrad.dev/api/USER_ID?theme=dark&bg=2f3136&hide_discrim=true&mode=iframe" alt="Discord Presence" />
    </a>
  </div>
  <!-- Replace USER_ID with your Discord ID -->`
  },
  {
    id: 'gh-views-komarev',
    category: 'GitHub Profile',
    title: 'Profile Views Badge',
    description: 'Counter with custom color.',
    code: `<div align="center">
    <img src="https://komarev.com/ghpvc/?username=anuraghazra&style=for-the-badge&color=blueviolet" alt="Profile Views" />
  </div>`
  },
  {
    id: 'gh-repo-card-pin',
    category: 'GitHub Profile',
    title: 'Pinned Repo Card',
    description: 'Showcase specific repositories.',
    code: `<div align="center">
    <a href="https://github.com/anuraghazra/markdown-live-preview">
      <img src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=markdown-live-preview&theme=tokyonight" alt="ReadMe Card" />
    </a>
  </div>`
  },
  {
    id: 'gh-top-langs-pie',
    category: 'GitHub Profile',
    title: 'Top Languages (Pie)',
    description: 'Pie chart of language usage.',
    code: `<div align="center">
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&theme=tokyonight&layout=pie&hide_border=true" alt="Top Langs" />
  </div>`
  },
  {
    id: 'gh-stats-gruvbox',
    category: 'GitHub Profile',
    title: 'Stats (Gruvbox)',
    description: 'Retro Gruvbox themed stats.',
    code: `<div align="center">
    <img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=gruvbox&hide_border=true" alt="Gruvbox Stats" />
  </div>`
  },
  {
    id: 'gh-streak-bluefire',
    category: 'GitHub Profile',
    title: 'Streak (Bluefire)',
    description: 'Blue fire themed streak stats.',
    code: `<div align="center">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=bluefire&hide_border=true" alt="Streak Stats" />
  </div>`
  },
  {
    id: 'gh-recent-activity',
    category: 'GitHub Profile',
    title: 'Recent Activity Log',
    description: 'List of recent GitHub actions.',
    code: `<div align="center">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=xcode" alt="Activity Graph" />
  </div>`
  },
  {
    id: 'gh-latest-blogs',
    category: 'GitHub Profile',
    title: 'Latest Blog Posts',
    description: 'Workflow to fetch RSS feed items.',
    code: `<!-- BLOG-POST-LIST:START -->
  * [How to Build a Design System](https://example.com/blog/1)
  * [Understanding React Hooks](https://example.com/blog/2)
  * [CSS Grid vs Flexbox](https://example.com/blog/3)
  <!-- BLOG-POST-LIST:END -->
  <!-- Requires 'blog-post-workflow' GitHub Action -->`
  },
  {
    id: 'gh-twitter-badge',
    category: 'GitHub Profile',
    title: 'Twitter Follow Badge',
    description: 'Direct follow button.',
    code: `<div align="center">
    <a href="https://twitter.com/intent/follow?screen_name=anuraghazra">
      <img src="https://img.shields.io/twitter/follow/anuraghazra?style=social&logo=twitter" alt="follow on Twitter" />
    </a>
  </div>`
  },
  {
    id: 'gh-youtube-badge',
    category: 'GitHub Profile',
    title: 'YouTube Subscriber',
    description: 'Subscriber count badge.',
    code: `<div align="center">
    <a href="https://youtube.com/c/anuraghazra">
      <img src="https://img.shields.io/youtube/channel/subscribers/UCxxxxxx?style=social" alt="YouTube" />
    </a>
  </div>`
  },
  {
    id: 'gh-workflow-status',
    category: 'GitHub Profile',
    title: 'Build Status',
    description: 'CI/CD pipeline status badge.',
    code: `<div align="center">
    <img src="https://github.com/anuraghazra/markdown-live-preview/actions/workflows/main.yml/badge.svg" alt="Build Status" />
  </div>`
  },
  {
    id: 'gh-license-badge',
    category: 'GitHub Profile',
    title: 'MIT License Badge',
    description: 'Standard license indicator.',
    code: `<div align="center">
    <img src="https://img.shields.io/github/license/anuraghazra/markdown-live-preview?style=flat-square&color=blue" alt="License" />
  </div>`
  },
  {
    id: 'gh-tech-stack-circles',
    category: 'GitHub Profile',
    title: 'Tech Stack (Circles)',
    description: 'Circular tech icons layout.',
    code: `<div align="center">
    <img src="https://skillicons.dev/icons?i=html,css,js,react,vue,angular&theme=light" alt="Tech Stack" />
  </div>`
  },
  {
    id: 'gh-typing-cyber',
    category: 'GitHub Profile',
    title: 'Cyber Typing Text',
    description: 'Neon styled typing effect.',
    code: `<div align="center">
    <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&pause=1000&color=00FF00&width=435&lines=System.init();Loading+Profile...;Access+Granted." alt="Cyber Typing" />
  </div>`
  },
  {
    id: 'gh-quote-anime',
    category: 'GitHub Profile',
    title: 'Anime Quote',
    description: 'Random anime quotes.',
    code: `<div align="center">
    <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight&quote=The%20world%20is%20not%20beautiful.%20Therefore%20it%20is.&author=Kino's%20Journey" alt="Anime Quote" />
  </div>`
  },
  {
    id: 'gh-meme-day',
    category: 'GitHub Profile',
    title: 'Meme of the Day',
    description: 'Daily random programming meme.',
    code: `<div align="center">
    <img src="https://readme-jokes.vercel.app/api?theme=tokyonight&hideBorder" alt="Jokes Card" />
  </div>`
  },
  {
    id: 'gh-chess-game',
    category: 'GitHub Profile',
    title: 'Interactive Chess',
    description: 'Playable chess game in README.',
    code: `<div align="center">
    <a href="https://github.com/marcizhu/marcizhu">
      <img src="https://raw.githubusercontent.com/marcizhu/marcizhu/master/images/chess/board.svg" alt="Chess Game" width="400" />
    </a>
  </div>
  <!-- Example from marcizhu's chess-readme project -->`
  },
  {
    id: 'gh-virtual-pet',
    category: 'GitHub Profile',
    title: 'Virtual Pet',
    description: 'A cute pixel pet for your profile.',
    code: `<div align="center">
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="150" alt="Cute Cat" />
  </div>
  <!-- Use any animated GIF as a virtual pet! -->`
  },
  {
    id: 'gh-contributors-grid',
    category: 'GitHub Profile',
    title: 'Contributors Grid',
    description: 'Circular grid of repo contributors.',
    code: `<div align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=anuraghazra/github-readme-stats" />
    </a>
  </div>`
  },
  {
    id: 'gh-made-with-love',
    category: 'GitHub Profile',
    title: 'Made with Love',
    description: 'Footer badge.',
    code: `<div align="center">
    <img src="https://img.shields.io/badge/Made%20with-Love-ff69b4?style=for-the-badge&logo=heart&logoColor=white" alt="Made with Love" />
  </div>`
  },
  {
    id: 'gh-connect-banner',
    category: 'GitHub Profile',
    title: 'Connect Banner',
    description: 'Wide banner with social links.',
    code: `<div align="center">
    <a href="https://twitter.com/anuraghazra"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>
    <a href="https://linkedin.com/in/anuraghazra"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
    <a href="mailto:anuraghazra@example.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
  </div>`
  },

  // ================= DARK/LIGHT MODE RESPONSIVE =================
  {
    id: 'gh-stats-darklight',
    category: 'GitHub Profile',
    title: 'Stats (Dark/Light Mode)',
    description: 'Auto-switches based on GitHub theme preference.',
    code: `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight&hide_border=true" />
  <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default&hide_border=true" />
  <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default&hide_border=true" />
</picture>`
  },
  {
    id: 'gh-streak-darklight',
    category: 'GitHub Profile',
    title: 'Streak (Dark/Light Mode)',
    description: 'Responsive streak stats for both themes.',
    code: `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=tokyonight&hide_border=true" />
  <source media="(prefers-color-scheme: light)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=default&hide_border=true" />
  <img alt="Streak Stats" src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=default&hide_border=true" />
</picture>`
  },
  {
    id: 'gh-snake-darklight',
    category: 'GitHub Profile',
    title: 'Snake (Dark/Light Mode)',
    description: 'Contribution snake with theme switching.',
    code: `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" />
  <img alt="Snake animation" src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" />
</picture>
<!-- Requires Platane/snk GitHub Action -->`
  },

  // ================= PROFILE SUMMARY CARDS (5 CARD SET) =================
  {
    id: 'gh-summary-details',
    category: 'GitHub Profile',
    title: 'Profile Summary Card',
    description: 'Detailed profile overview card.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=anuraghazra&theme=tokyonight" alt="Profile Details" />
</div>`
  },
  {
    id: 'gh-summary-repos-lang',
    category: 'GitHub Profile',
    title: 'Repos Per Language',
    description: 'Pie chart of repos by language.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=anuraghazra&theme=tokyonight" alt="Repos Per Language" />
</div>`
  },
  {
    id: 'gh-summary-commits-lang',
    category: 'GitHub Profile',
    title: 'Most Commit Language',
    description: 'Languages you commit most in.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=anuraghazra&theme=tokyonight" alt="Most Commit Language" />
</div>`
  },
  {
    id: 'gh-summary-stats',
    category: 'GitHub Profile',
    title: 'Summary Stats Card',
    description: 'Compact stats summary.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=anuraghazra&theme=tokyonight" alt="Stats Card" />
</div>`
  },
  {
    id: 'gh-summary-productive',
    category: 'GitHub Profile',
    title: 'Productive Time Card',
    description: 'Shows your most productive hours.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=anuraghazra&theme=tokyonight&utcOffset=0" alt="Productive Time" />
</div>`
  },
  {
    id: 'gh-summary-full-set',
    category: 'GitHub Profile',
    title: 'Full Summary Card Set',
    description: 'Complete 5-card profile summary layout.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=anuraghazra&theme=nord_dark" />
  <br/>
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=anuraghazra&theme=nord_dark" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=anuraghazra&theme=nord_dark" />
  <br/>
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=anuraghazra&theme=nord_dark" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=anuraghazra&theme=nord_dark&utcOffset=0" />
</div>`
  },

  // ================= CAPSULE RENDER VARIANTS =================
  {
    id: 'gh-capsule-venom',
    category: 'GitHub Profile',
    title: 'Capsule Venom Header',
    description: 'Dramatic venom-style animated header.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=venom&color=gradient&height=200&text=Welcome&fontSize=70&fontColor=ffffff&animation=fadeIn" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-shark',
    category: 'GitHub Profile',
    title: 'Capsule Shark Header',
    description: 'Sharp shark-fin style header.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=shark&color=0:ee7752,100:e73c7e&height=150&text=Hello%20World&fontSize=60&fontColor=ffffff" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-cylinder',
    category: 'GitHub Profile',
    title: 'Capsule Cylinder Header',
    description: '3D cylinder style header.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=auto&height=150&text=Developer&fontSize=70&animation=blinking" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-soft',
    category: 'GitHub Profile',
    title: 'Capsule Soft Header',
    description: 'Soft rounded header design.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=soft&color=timeGradient&height=120&text=Welcome!&fontSize=50&fontColor=ffffff" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-transparent',
    category: 'GitHub Profile',
    title: 'Capsule Transparent',
    description: 'Transparent background header.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=transparent&color=auto&height=100&text=Hi%20There!&fontSize=60&fontColor=58a6ff" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-speech',
    category: 'GitHub Profile',
    title: 'Capsule Speech Bubble',
    description: 'Comic speech bubble style.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=speech&color=gradient&height=150&text=Hello!&fontSize=40&fontColor=ffffff&animation=scaleIn" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-egg',
    category: 'GitHub Profile',
    title: 'Capsule Egg Header',
    description: 'Egg-shaped decorative header.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=egg&color=0:ffd89b,100:19547b&height=180&text=Profile&fontSize=60&fontColor=ffffff" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-slice',
    category: 'GitHub Profile',
    title: 'Capsule Slice Header',
    description: 'Diagonal slice design.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=slice&color=gradient&height=200&text=Developer&fontAlign=70&rotate=13&fontAlignY=25&fontSize=70&desc=Full%20Stack&descAlign=70&descAlignY=44" width="100%" />
</div>`
  },
  {
    id: 'gh-capsule-rounded',
    category: 'GitHub Profile',
    title: 'Capsule Rounded Header',
    description: 'Rounded bottom header.',
    code: `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rounded&color=timeAuto&height=150&text=Hello%20World&fontSize=50&fontColor=ffffff&stroke=000000&strokeWidth=2" width="100%" />
</div>`
  },

  // ================= ACTIVITY GRAPH VARIANTS =================
  {
    id: 'gh-activity-tokyo',
    category: 'GitHub Profile',
    title: 'Activity Graph (Tokyo Night)',
    description: 'Beautiful Tokyo Night themed graph.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=tokyo-night&hide_border=true&area=true" alt="Activity Graph" />
</div>`
  },
  {
    id: 'gh-activity-dracula',
    category: 'GitHub Profile',
    title: 'Activity Graph (Dracula)',
    description: 'Dark Dracula themed activity graph.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=dracula&hide_border=true&area=true&area_color=ff79c6" alt="Activity Graph" />
</div>`
  },
  {
    id: 'gh-activity-github-dark',
    category: 'GitHub Profile',
    title: 'Activity Graph (GitHub Dark)',
    description: 'Native GitHub dark themed graph.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=github-dark&hide_border=true&area=true" alt="Activity Graph" />
</div>`
  },
  {
    id: 'gh-activity-compact',
    category: 'GitHub Profile',
    title: 'Activity Graph (Compact)',
    description: 'Compact graph with custom height.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&theme=react-dark&hide_border=true&height=300&area=true&radius=8" alt="Activity Graph" />
</div>`
  },
  {
    id: 'gh-activity-custom',
    category: 'GitHub Profile',
    title: 'Activity Graph (Custom Colors)',
    description: 'Fully customized color scheme.',
    code: `<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&bg_color=0d1117&color=58a6ff&line=39d353&point=58a6ff&area=true&area_color=238636&hide_border=true" alt="Activity Graph" />
</div>`
  },

  // ================= SNAKE ANIMATION VARIANTS =================
  {
    id: 'gh-snake-ocean',
    category: 'GitHub Profile',
    title: 'Snake (Ocean Theme)',
    description: 'Blue ocean colored snake animation.',
    code: `<div align="center">
  <img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" alt="Ocean Snake" />
</div>
<!-- GitHub Action: Platane/snk with color_dots=#bfd6f6,#8dbdff,#64a1f4,#4b91f1,#3c7dd9 -->`
  },
  {
    id: 'gh-snake-github-dark',
    category: 'GitHub Profile',
    title: 'Snake (GitHub Dark)',
    description: 'Native GitHub dark palette.',
    code: `<div align="center">
  <img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg" alt="Snake Dark" />
</div>
<!-- GitHub Action: Platane/snk?palette=github-dark -->`
  },
  {
    id: 'gh-snake-gif',
    category: 'GitHub Profile',
    title: 'Snake (GIF Format)',
    description: 'Animated GIF version of snake.',
    code: `<div align="center">
  <img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg" alt="Snake GIF" />
</div>
<!-- GitHub Action: Platane/snk outputs gif format -->`
  },

  // ================= LEETCODE & CODING STATS =================
  {
    id: 'gh-leetcode-stats',
    category: 'GitHub Profile',
    title: 'LeetCode Stats Card',
    description: 'Display your LeetCode solving stats.',
    code: `<div align="center">
  <img src="https://leetcard.jacoblin.cool/kamyu104?theme=dark&font=Nunito&ext=heatmap" alt="LeetCode Stats" />
</div>
<!-- Replace 'kamyu104' with your LeetCode username -->`
  },
  {
    id: 'gh-leetcode-light',
    category: 'GitHub Profile',
    title: 'LeetCode Stats (Light)',
    description: 'Light themed LeetCode card.',
    code: `<div align="center">
  <img src="https://leetcard.jacoblin.cool/kamyu104?theme=light&font=Fira%20Code&ext=activity" alt="LeetCode Stats" />
</div>`
  },
  {
    id: 'gh-codeforces-stats',
    category: 'GitHub Profile',
    title: 'Codeforces Stats',
    description: 'Competitive programming stats from CF.',
    code: `<div align="center">
  <img src="https://codeforces-readme-stats.vercel.app/api/card?username=tourist&theme=github_dark" alt="Codeforces Stats" />
</div>
<!-- Replace 'tourist' with your Codeforces handle -->`
  },
  {
    id: 'gh-hackerrank-badge',
    category: 'GitHub Profile',
    title: 'HackerRank Badge',
    description: 'Show your HackerRank profile.',
    code: `<div align="center">
  <a href="https://www.hackerrank.com/YOUR_USERNAME">
    <img src="https://img.shields.io/badge/HackerRank-2EC866?style=for-the-badge&logo=hackerrank&logoColor=white" alt="HackerRank" />
  </a>
</div>`
  },
  {
    id: 'gh-codewars-badge',
    category: 'GitHub Profile',
    title: 'Codewars Badge',
    description: 'Codewars rank badge.',
    code: `<div align="center">
  <img src="https://www.codewars.com/users/g964/badges/large" alt="Codewars" />
</div>
<!-- Replace 'g964' with your Codewars username -->`
  },

  // ================= TOP LANGUAGES LAYOUTS =================
  {
    id: 'gh-langs-donut',
    category: 'GitHub Profile',
    title: 'Top Languages (Donut)',
    description: 'Donut chart layout for languages.',
    code: `<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&theme=tokyonight&layout=donut&hide_border=true" alt="Top Languages" />
</div>`
  },
  {
    id: 'gh-langs-donut-vertical',
    category: 'GitHub Profile',
    title: 'Top Languages (Donut Vertical)',
    description: 'Vertical donut chart layout.',
    code: `<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&theme=radical&layout=donut-vertical&hide_border=true" alt="Top Languages" />
</div>`
  },
  {
    id: 'gh-langs-hidden',
    category: 'GitHub Profile',
    title: 'Top Languages (Exclude)',
    description: 'Hide specific languages from stats.',
    code: `<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&theme=tokyonight&layout=compact&hide=html,css&hide_border=true" alt="Top Languages" />
</div>`
  },

  // ================= TROPHY VARIANTS =================
  {
    id: 'gh-trophy-flat',
    category: 'GitHub Profile',
    title: 'Trophy (Flat Theme)',
    description: 'Flat styled achievement trophies.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=flat&no-frame=false&no-bg=false&margin-w=4&column=7" alt="Trophies" />
</div>`
  },
  {
    id: 'gh-trophy-onedark',
    category: 'GitHub Profile',
    title: 'Trophy (One Dark)',
    description: 'One Dark Pro themed trophies.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=onedark&no-frame=true&no-bg=true&margin-w=4&column=7" alt="Trophies" />
</div>`
  },
  {
    id: 'gh-trophy-matrix',
    category: 'GitHub Profile',
    title: 'Trophy (Matrix Theme)',
    description: 'Matrix-style green trophies.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=matrix&no-frame=true&no-bg=true&margin-w=4" alt="Trophies" />
</div>`
  },
  {
    id: 'gh-trophy-dracula',
    category: 'GitHub Profile',
    title: 'Trophy (Dracula)',
    description: 'Dracula themed trophies.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=dracula&no-frame=true&no-bg=true&margin-w=4&row=1" alt="Trophies" />
</div>`
  },
  {
    id: 'gh-trophy-rank-filter',
    category: 'GitHub Profile',
    title: 'Trophy (Top Ranks Only)',
    description: 'Show only SSS, SS, S rank trophies.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=radical&no-frame=true&no-bg=true&rank=SSS,SS,S,AAA,AA,A" alt="Top Trophies" />
</div>`
  },

  // ================= STREAMING & MEDIA =================
  {
    id: 'gh-spotify-noplaying',
    category: 'GitHub Profile',
    title: 'Spotify (No Playing)',
    description: 'Shows last played when offline.',
    code: `<div align="center">
  <a href="https://open.spotify.com/user/YOUR_SPOTIFY_USER_ID">
    <img src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" />
  </a>
</div>
<!-- Get your Spotify profile from spotify-github-profile.kittinanx.com -->`
  },
  {
    id: 'gh-spotify-compact',
    category: 'GitHub Profile',
    title: 'Spotify (Compact)',
    description: 'Compact Spotify widget.',
    code: `<div align="center">
  <img src="https://img.shields.io/badge/🎵_Now_Playing-1DB954?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" />
  <br/>
  <em>Connect your Spotify at spotify-github-profile.kittinanx.com</em>
</div>`
  },
  {
    id: 'gh-lastfm',
    category: 'GitHub Profile',
    title: 'Last.fm Now Playing',
    description: 'Show your Last.fm listening history.',
    code: `<div align="center">
  <a href="https://www.last.fm/user/YOUR_LASTFM_USERNAME">
    <img src="https://img.shields.io/badge/Last.fm-D51007?style=for-the-badge&logo=lastdotfm&logoColor=white" alt="Last.fm" />
  </a>
</div>
<!-- Use lastfm-recently-played.vercel.app with your Last.fm username -->`
  },
  {
    id: 'gh-steam-profile',
    category: 'GitHub Profile',
    title: 'Steam Profile Card',
    description: 'Display your Steam gaming profile.',
    code: `<div align="center">
  <a href="https://steamcommunity.com/id/YOUR_STEAM_ID">
    <img src="https://img.shields.io/badge/Steam-000000?style=for-the-badge&logo=steam&logoColor=white" alt="Steam" />
  </a>
</div>
<!-- Get your Steam ID from steamid.io -->`
  },

  // ================= TYPING SVG VARIANTS =================
  {
    id: 'gh-typing-multiline',
    category: 'GitHub Profile',
    title: 'Typing (Multi-line)',
    description: 'Multiple lines typing effect.',
    code: `<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=4000&pause=1000&color=58A6FF&center=true&vCenter=true&multiline=true&repeat=false&width=600&height=100&lines=Hello%2C+I'm+a+Developer!;Welcome+to+my+GitHub+Profile" alt="Typing SVG" />
</div>`
  },
  {
    id: 'gh-typing-gradient',
    category: 'GitHub Profile',
    title: 'Typing (Rainbow)',
    description: 'Colorful rotating text.',
    code: `<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Righteous&size=35&duration=3000&pause=500&color=F75C7E&center=true&vCenter=true&width=500&lines=Full+Stack+Developer;Open+Source+Enthusiast;AI+%26+ML+Explorer;Always+Learning!" alt="Typing SVG" />
</div>`
  },
  {
    id: 'gh-typing-terminal',
    category: 'GitHub Profile',
    title: 'Typing (Terminal Style)',
    description: 'Terminal/console style typing.',
    code: `<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=24&duration=3000&pause=1000&color=39D353&background=0D1117&center=true&vCenter=true&width=600&lines=%24+npm+install+awesome-developer;%24+Loading+profile...;%24+Welcome+to+my+GitHub!" alt="Terminal Typing" />
</div>`
  },

  // ================= STREAK THEMES =================
  {
    id: 'gh-streak-dark-smoky',
    category: 'GitHub Profile',
    title: 'Streak (Dark Smoky)',
    description: 'Elegant dark smoky theme.',
    code: `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=dark-smoky&hide_border=true" alt="Streak Stats" />
</div>`
  },
  {
    id: 'gh-streak-highcontrast',
    category: 'GitHub Profile',
    title: 'Streak (High Contrast)',
    description: 'Accessibility-friendly high contrast.',
    code: `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=highcontrast&hide_border=true" alt="Streak Stats" />
</div>`
  },
  {
    id: 'gh-streak-github-dark',
    category: 'GitHub Profile',
    title: 'Streak (GitHub Dark)',
    description: 'Native GitHub dark theme.',
    code: `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=github-dark-blue&hide_border=true" alt="Streak Stats" />
</div>`
  },
  {
    id: 'gh-streak-weekly',
    category: 'GitHub Profile',
    title: 'Streak (Weekly Mode)',
    description: 'Weekly contribution mode.',
    code: `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=tokyonight&hide_border=true&mode=weekly" alt="Weekly Streak" />
</div>`
  },

  // ================= SKILL ICONS VARIANTS =================
  {
    id: 'gh-skills-frontend',
    category: 'GitHub Profile',
    title: 'Skills (Frontend Stack)',
    description: 'Complete frontend technology icons.',
    code: `<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,sass,tailwind,js,ts,react,nextjs,vue,nuxt,angular,svelte&theme=dark&perline=6" alt="Frontend Skills" />
</div>`
  },
  {
    id: 'gh-skills-backend',
    category: 'GitHub Profile',
    title: 'Skills (Backend Stack)',
    description: 'Complete backend technology icons.',
    code: `<div align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,nestjs,python,django,fastapi,go,rust,java,spring,php,laravel&theme=dark&perline=6" alt="Backend Skills" />
</div>`
  },
  {
    id: 'gh-skills-database',
    category: 'GitHub Profile',
    title: 'Skills (Database & Cloud)',
    description: 'Database and cloud service icons.',
    code: `<div align="center">
  <img src="https://skillicons.dev/icons?i=mongodb,mysql,postgres,redis,graphql,firebase,supabase,aws,gcp,azure,docker,kubernetes&theme=dark&perline=6" alt="Database & Cloud" />
</div>`
  },
  {
    id: 'gh-skills-tools',
    category: 'GitHub Profile',
    title: 'Skills (Dev Tools)',
    description: 'Developer tools and platforms.',
    code: `<div align="center">
  <img src="https://skillicons.dev/icons?i=vscode,vim,neovim,git,github,gitlab,linux,bash,powershell,figma,postman,vercel&theme=dark&perline=6" alt="Dev Tools" />
</div>`
  },
  {
    id: 'gh-skills-light',
    category: 'GitHub Profile',
    title: 'Skills (Light Theme)',
    description: 'Light themed skill icons.',
    code: `<div align="center">
  <img src="https://skillicons.dev/icons?i=react,vue,angular,nodejs,python,go,docker,kubernetes,aws,git&theme=light&perline=10" alt="Skills Light" />
</div>`
  },

  // ================= VISITOR COUNTERS =================
  {
    id: 'gh-visitor-hits',
    category: 'GitHub Profile',
    title: 'Visitor Counter (Hits)',
    description: 'Simple hit counter badge.',
    code: `<div align="center">
  <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fanuraghazra&count_bg=%2379C83D&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=Profile+Views&edge_flat=false" alt="Hits" />
</div>`
  },
  {
    id: 'gh-visitor-animated',
    category: 'GitHub Profile',
    title: 'Visitor Counter (Animated)',
    description: 'Animated counting visitor badge.',
    code: `<div align="center">
  <img src="https://profile-counter.glitch.me/anuraghazra/count.svg" alt="Visitor Count" />
</div>`
  },
  {
    id: 'gh-visitor-capsule',
    category: 'GitHub Profile',
    title: 'Visitor Counter (Capsule)',
    description: 'Capsule style visitor counter.',
    code: `<div align="center">
  <img src="https://komarev.com/ghpvc/?username=anuraghazra&label=Visitors&color=0e75b6&style=for-the-badge" alt="Visitor Count" />
</div>`
  },

  // ================= GITHUB METRICS (lowlighter) =================
  {
    id: 'gh-metrics-achievements',
    category: 'GitHub Profile',
    title: 'Metrics Achievements',
    description: 'Beautiful achievement cards.',
    code: `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=algolia&no-frame=true&no-bg=true&margin-w=4&row=2&column=3" alt="Achievements" width="100%" />
</div>
<!-- Alternative using github-profile-trophy -->`
  },
  {
    id: 'gh-metrics-languages',
    category: 'GitHub Profile',
    title: 'Metrics Languages',
    description: 'Detailed language analysis.',
    code: `<div align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=anuraghazra&theme=github_dark" alt="Languages" width="48%" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=anuraghazra&theme=github_dark" alt="Languages" width="48%" />
</div>
<!-- Using github-profile-summary-cards -->`
  },
  {
    id: 'gh-metrics-stargazers',
    category: 'GitHub Profile',
    title: 'Metrics Stargazers',
    description: 'Star history visualization.',
    code: `<div align="center">
  <a href="https://star-history.com/#anuraghazra/github-readme-stats&Date">
    <img src="https://api.star-history.com/svg?repos=anuraghazra/github-readme-stats&type=Date" alt="Stargazers" width="100%" />
  </a>
</div>
<!-- Using star-history.com -->`
  },
  {
    id: 'gh-metrics-calendar',
    category: 'GitHub Profile',
    title: 'Metrics Full Calendar',
    description: 'Full year contribution calendar.',
    code: `<div align="center">
  <img src="https://ghchart.rshah.org/anuraghazra" alt="GitHub Contributions" width="100%" />
</div>
<!-- Using ghchart.rshah.org for contribution graph -->`
  },

  // ================= QUOTE VARIANTS =================
  {
    id: 'gh-quote-vertical',
    category: 'GitHub Profile',
    title: 'Quote (Vertical)',
    description: 'Vertical format quote card.',
    code: `<div align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=vertical&theme=dark" alt="Quote" />
</div>`
  },
  {
    id: 'gh-quote-nord',
    category: 'GitHub Profile',
    title: 'Quote (Nord Theme)',
    description: 'Nord themed developer quote.',
    code: `<div align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=nord" alt="Quote" />
</div>`
  },
  {
    id: 'gh-quote-catppuccin',
    category: 'GitHub Profile',
    title: 'Quote (Catppuccin)',
    description: 'Catppuccin themed quote.',
    code: `<div align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=catppuccin_mocha" alt="Quote" />
</div>`
  },

  // ================= SOCIAL BADGES PREMIUM =================
  {
    id: 'gh-badge-dev-to',
    category: 'GitHub Profile',
    title: 'DEV.to Badge',
    description: 'DEV.to profile badge.',
    code: `<a href="https://dev.to/anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/DEV.TO-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="DEV.to" />
</a>`
  },
  {
    id: 'gh-badge-medium',
    category: 'GitHub Profile',
    title: 'Medium Badge',
    description: 'Medium profile badge.',
    code: `<a href="https://medium.com/@anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium" />
</a>`
  },
  {
    id: 'gh-badge-hashnode',
    category: 'GitHub Profile',
    title: 'Hashnode Badge',
    description: 'Hashnode blog badge.',
    code: `<a href="https://hashnode.com/@anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white" alt="Hashnode" />
</a>`
  },
  {
    id: 'gh-badge-stackoverflow',
    category: 'GitHub Profile',
    title: 'Stack Overflow Badge',
    description: 'Stack Overflow profile badge.',
    code: `<a href="https://stackoverflow.com/users/123456/anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white" alt="Stack Overflow" />
</a>`
  },
  {
    id: 'gh-badge-reddit',
    category: 'GitHub Profile',
    title: 'Reddit Badge',
    description: 'Reddit profile badge.',
    code: `<a href="https://reddit.com/user/anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" alt="Reddit" />
</a>`
  },
  {
    id: 'gh-badge-discord-invite',
    category: 'GitHub Profile',
    title: 'Discord Server Badge',
    description: 'Discord server invite badge.',
    code: `<a href="https://discord.gg/your-invite" target="_blank">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
</a>`
  },
  {
    id: 'gh-badge-telegram',
    category: 'GitHub Profile',
    title: 'Telegram Badge',
    description: 'Telegram contact badge.',
    code: `<a href="https://t.me/anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" />
</a>`
  },
  {
    id: 'gh-badge-twitch',
    category: 'GitHub Profile',
    title: 'Twitch Badge',
    description: 'Twitch channel badge.',
    code: `<a href="https://twitch.tv/anuraghazra" target="_blank">
  <img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" alt="Twitch" />
</a>`
  },
  {
    id: 'gh-badge-portfolio',
    category: 'GitHub Profile',
    title: 'Portfolio Badge',
    description: 'Personal website/portfolio badge.',
    code: `<a href="https://anuraghazra.dev" target="_blank">
  <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio" />
</a>`
  },
  {
    id: 'gh-badge-resume',
    category: 'GitHub Profile',
    title: 'Resume Badge',
    description: 'Download resume badge.',
    code: `<a href="https://example.com/resume.pdf" target="_blank">
  <img src="https://img.shields.io/badge/Resume-4285F4?style=for-the-badge&logo=google-drive&logoColor=white" alt="Resume" />
</a>`
  },

  // ================= COMPLETE PROFILE LAYOUTS =================
  {
    id: 'gh-layout-minimalist',
    category: 'GitHub Profile',
    title: 'Complete Minimalist Layout',
    description: 'Clean, minimal full profile layout.',
    code: `<div align="center">
  
<!-- Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=header" width="100%" />

<!-- Intro -->
# Hi, I'm Alex 👋

**Full Stack Developer | Open Source Enthusiast**

<!-- Social Links -->
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/anuraghazra)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/anuraghazra)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:email@example.com)

---

<!-- Stats -->
<img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent&hide_border=true" height="150" />
<img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=transparent&hide_border=true" height="150" />

<!-- Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%" />

</div>`
  },
  {
    id: 'gh-layout-cyberpunk',
    category: 'GitHub Profile',
    title: 'Complete Cyberpunk Layout',
    description: 'Neon cyberpunk themed profile.',
    code: `<div align="center">

<!-- Cyber Header -->
<img src="https://capsule-render.vercel.app/api?type=venom&color=0:00ff00,100:0a0a0a&height=200&text=SYSTEM.INIT&fontSize=60&fontColor=00ff00&animation=fadeIn" width="100%" />

<!-- Terminal Typing -->
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=28&duration=3000&pause=1000&color=00FF00&background=0D1117&center=true&vCenter=true&width=600&lines=%24+whoami;%24+Developer+%7C+Hacker+%7C+Creator;%24+echo+'Welcome+to+my+profile'" />

<!-- Matrix Skills -->
<img src="https://skillicons.dev/icons?i=js,ts,react,nodejs,python,go,rust,docker,kubernetes,linux&theme=dark&perline=10" />

<!-- Stats with Matrix Theme -->
<img src="https://github-profile-trophy.vercel.app/?username=anuraghazra&theme=matrix&no-frame=true&no-bg=true&margin-w=4" />

<img src="https://github-readme-activity-graph.vercel.app/graph?username=anuraghazra&bg_color=0d1117&color=00ff00&line=00ff00&point=ffffff&area=true&hide_border=true" width="100%" />

<!-- Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0a,100:00ff00&height=100&section=footer" width="100%" />

</div>`
  },
  {
    id: 'gh-layout-professional',
    category: 'GitHub Profile',
    title: 'Complete Professional Layout',
    description: 'Corporate professional profile.',
    code: `<div align="center">

<!-- Professional Header -->
<img src="https://capsule-render.vercel.app/api?type=rect&color=0077B5&height=120&text=John%20Doe&fontSize=50&fontColor=ffffff&desc=Senior%20Software%20Engineer&descAlignY=75&descSize=20" width="100%" />

</div>

### 👋 About Me

I'm a passionate software engineer with 8+ years of experience building scalable applications.

- 🔭 Currently working at **Tech Company**
- 🌱 Learning **Cloud Architecture & System Design**
- 💬 Ask me about **React, Node.js, AWS**
- 📫 Reach me at **john.doe@example.com**

### 🛠️ Tech Stack

<div align="center">
<img src="https://skillicons.dev/icons?i=react,nextjs,nodejs,typescript,aws,docker,postgresql,redis&theme=light&perline=8" />
</div>

### 📊 GitHub Statistics

<div align="center">
<img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default&hide_border=true" height="165" />
<img src="https://github-readme-streak-stats.herokuapp.com/?user=anuraghazra&theme=default&hide_border=true" height="165" />
</div>

### 📫 Connect With Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/johndoe)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:john.doe@example.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://johndoe.dev)

</div>`
  },
  {
    id: 'gh-layout-creative',
    category: 'GitHub Profile',
    title: 'Complete Creative Layout',
    description: 'Colorful creative profile design.',
    code: `<div align="center">

<!-- Animated Wave Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,27&height=200&section=header&text=Creative%20Developer&fontSize=50&fontAlignY=35&animation=twinkling&desc=✨%20Designer%20|%20Developer%20|%20Creator%20✨&descAlignY=55" width="100%" />

<!-- Animated Typing -->
<img src="https://readme-typing-svg.demolab.com?font=Pacifico&size=35&duration=3000&pause=1000&color=FF6B6B&center=true&vCenter=true&width=600&lines=Hello+World!+🌍;I+Create+Beautiful+Things+🎨;Let's+Build+Together!+🚀" />

</div>

<!-- About with Emoji Grid -->
<table>
<tr>
<td width="50%">

### 🎨 About Me

- 🌈 I love creating colorful experiences
- 🎭 UI/UX enthusiast
- ⚡ Always exploring new technologies
- 🌸 Anime & Gaming fan

</td>
<td width="50%">

### 📊 This Week

<!--START_SECTION:waka-->
\`\`\`text
JavaScript   █████████░░░░  45%
React        ████████░░░░░  40%  
CSS          ███░░░░░░░░░░  15%
\`\`\`
<!--END_SECTION:waka-->

</td>
</tr>
</table>

<div align="center">

<!-- Colorful Stats -->
<img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=anuraghazra&theme=dracula" />

<!-- Skill Icons -->
<img src="https://skillicons.dev/icons?i=figma,ps,ai,xd,html,css,sass,tailwind,js,react,vue,nextjs&perline=12" />

<!-- Fun Additions -->
<img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=catppuccin_mocha" />

<!-- Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12,19,27&height=100&section=footer" width="100%" />

</div>`
  }
];


/**
 * Creative & Fun Components
 */
import { SANS, MONO } from '../utils.js';

export const creativeFunComponents = [
  {
    id: 'fun-meme',
    category: 'Creative & Fun',
    title: 'Random Dev Meme',
    description: 'Daily refreshing programming meme.',
    code: `<div align="center">
  <img src="https://random-memer.herokuapp.com/" width="512px" alt="meme" />
</div>`
  },
  {
    id: 'fun-github-stats-3d',
    category: 'Creative & Fun',
    title: '3D GitHub Chart',
    description: 'Isometric contribution visualization.',
    code: `<div align="center">
  <img src="https://skyline.github.com/tanabe/2023" alt="github skyline" width="600" />
</div>
<!-- Visit github.com/skyline to generate your 3D chart -->`
  },
  {
    id: 'fun-joke-card',
    category: 'Creative & Fun',
    title: 'Dev Joke Card',
    description: 'Random programming jokes.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 30px; max-width: 450px; text-align: center;">
  <div style="font-size: 50px; margin-bottom: 15px;">😂</div>
  <img src="https://readme-jokes.vercel.app/api?theme=gradient&qColor=%23ffffff&aColor=%23ffffff&borderColor=%23ffffff00&bgColor=%2300000000" alt="Jokes Card" style="max-width: 100%;" />
  <div style="margin-top: 20px; color: rgba(255,255,255,0.7); font-size: 12px;">↻ Refresh for a new joke</div>
</div>`
  },
  {
    id: 'fun-quote-generator',
    category: 'Creative & Fun',
    title: 'Inspirational Quote',
    description: 'Random motivational quotes.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 24px; padding: 40px; max-width: 500px; position: relative; overflow: hidden;">
  <div style="position: absolute; top: 20px; left: 30px; font-size: 80px; color: rgba(102,126,234,0.2); line-height: 1;">"</div>
  <div style="position: relative; z-index: 1;">
    <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark" alt="Quote" style="max-width: 100%;" />
  </div>
  <div style="position: absolute; bottom: 20px; right: 30px; font-size: 80px; color: rgba(102,126,234,0.2); line-height: 1; transform: rotate(180deg);">"</div>
</div>`
  },
  {
    id: 'fun-spotify-now-playing',
    category: 'Creative & Fun',
    title: 'Spotify Now Playing',
    description: 'Show your current track.',
    code: `<div style="${SANS} background: #191414; border-radius: 16px; padding: 25px; max-width: 400px;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
    <span style="color: white; font-weight: 700;">Now Playing</span>
    <div style="margin-left: auto; display: flex; gap: 3px;">
      <div style="width: 3px; height: 15px; background: #1DB954; border-radius: 2px; animation: bounce 0.5s ease infinite alternate;"></div>
      <div style="width: 3px; height: 15px; background: #1DB954; border-radius: 2px; animation: bounce 0.5s ease infinite alternate 0.1s;"></div>
      <div style="width: 3px; height: 15px; background: #1DB954; border-radius: 2px; animation: bounce 0.5s ease infinite alternate 0.2s;"></div>
    </div>
  </div>
  <div style="display: flex; gap: 15px; align-items: center;">
    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1DB954, #191414); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 36px;">🎵</div>
    <div>
      <div style="color: white; font-weight: 700; font-size: 16px;">Awesome Track Name</div>
      <div style="color: #b3b3b3; font-size: 14px; margin-top: 4px;">Artist Name</div>
      <div style="color: #535353; font-size: 12px; margin-top: 8px;">Album • 3:42</div>
    </div>
  </div>
  <div style="margin-top: 20px;">
    <div style="height: 4px; background: #535353; border-radius: 2px; overflow: hidden;">
      <div style="width: 45%; height: 100%; background: #1DB954; border-radius: 2px;"></div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-top: 8px; color: #b3b3b3; font-size: 11px;">
      <span>1:32</span>
      <span>3:42</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'fun-typing-svg',
    category: 'Creative & Fun',
    title: 'Animated Typing Text',
    description: 'Dynamic typing animation.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 20px; padding: 40px; text-align: center;">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=667EEA&center=true&vCenter=true&multiline=true&width=500&height=80&lines=Hello+World!+%F0%9F%91%8B;Welcome+to+my+profile!;I+love+coding+%F0%9F%92%BB" alt="Typing SVG" />
</div>`
  },
  {
    id: 'fun-snake-game',
    category: 'Creative & Fun',
    title: 'GitHub Snake Game',
    description: 'Contribution snake animation.',
    code: `<div style="${SANS} background: #0d1117; border-radius: 16px; padding: 20px; text-align: center;">
  <h3 style="color: white; margin: 0 0 20px 0;">🐍 Watch the snake eat my contributions!</h3>
  <img src="https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake-dark.svg" alt="snake" style="max-width: 100%;" />
</div>`
  },
  {
    id: 'fun-visitor-counter',
    category: 'Creative & Fun',
    title: 'Fancy Visitor Counter',
    description: 'Animated visitor badge.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 30px; text-align: center; max-width: 350px;">
  <div style="font-size: 40px; margin-bottom: 15px;">👀</div>
  <h3 style="color: white; margin: 0 0 10px 0;">Profile Views</h3>
  <div style="background: rgba(255,255,255,0.2); border-radius: 30px; padding: 15px 30px; display: inline-block;">
    <img src="https://profile-counter.glitch.me/username/count.svg" alt="Visitor Count" />
  </div>
  <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 15px 0 0 0;">Thanks for visiting! 🎉</p>
</div>`
  },
  {
    id: 'fun-activity-graph',
    category: 'Creative & Fun',
    title: 'Activity Graph',
    description: 'GitHub activity visualization.',
    code: `<div style="${SANS} background: #0d1117; border-radius: 16px; padding: 20px;">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=username&theme=react-dark&hide_border=true&area=true" alt="Activity Graph" style="max-width: 100%; border-radius: 10px;" />
</div>`
  },
  {
    id: 'fun-coding-gif',
    category: 'Creative & Fun',
    title: 'Coding Animation',
    description: 'Fun coding GIF display.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 20px; padding: 30px; text-align: center; max-width: 500px;">
  <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="Coding" style="width: 100%; border-radius: 12px;" />
  <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center;">
    <span style="background: rgba(102,126,234,0.2); color: #667eea; padding: 8px 16px; border-radius: 20px; font-size: 13px;">💻 Coding</span>
    <span style="background: rgba(236,72,153,0.2); color: #ec4899; padding: 8px 16px; border-radius: 20px; font-size: 13px;">☕ Coffee</span>
    <span style="background: rgba(52,211,153,0.2); color: #34d399; padding: 8px 16px; border-radius: 20px; font-size: 13px;">🔁 Repeat</span>
  </div>
</div>`
  },
  {
    id: 'fun-achievements',
    category: 'Creative & Fun',
    title: 'Achievement Badges',
    description: 'Gaming-style achievements.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 20px; padding: 30px; max-width: 400px;">
  <h3 style="color: white; margin: 0 0 25px 0; display: flex; align-items: center; gap: 10px;">🏆 Achievements Unlocked</h3>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div style="background: linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.05)); border: 1px solid rgba(251,191,36,0.3); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 15px;">
      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #fbbf24, #f59e0b); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">⭐</div>
      <div>
        <div style="color: #fbbf24; font-weight: 700;">First Star</div>
        <div style="color: rgba(255,255,255,0.5); font-size: 12px;">Got your first GitHub star</div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05)); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 15px;">
      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #a855f7, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">🔥</div>
      <div>
        <div style="color: #a855f7; font-weight: 700;">On Fire</div>
        <div style="color: rgba(255,255,255,0.5); font-size: 12px;">30 day commit streak</div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05)); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 15px;">
      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">🚀</div>
      <div>
        <div style="color: #22c55e; font-weight: 700;">Rocket Launch</div>
        <div style="color: rgba(255,255,255,0.5); font-size: 12px;">100+ contributions</div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'fun-level-progress',
    category: 'Creative & Fun',
    title: 'Developer Level Card',
    description: 'RPG-style level progress.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 20px; padding: 30px; max-width: 400px;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <div style="display: flex; align-items: center; gap: 15px;">
      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #fbbf24, #f59e0b); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; border: 3px solid rgba(255,255,255,0.2);">🧙</div>
      <div>
        <div style="color: white; font-weight: 800; font-size: 18px;">Code Wizard</div>
        <div style="color: #fbbf24; font-size: 13px;">Level 42</div>
      </div>
    </div>
    <div style="text-align: right;">
      <div style="color: rgba(255,255,255,0.6); font-size: 12px;">RANK</div>
      <div style="color: #a855f7; font-weight: 800; font-size: 20px;">#128</div>
    </div>
  </div>
  <div style="margin-bottom: 20px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span style="color: rgba(255,255,255,0.7); font-size: 13px;">Experience</span>
      <span style="color: #fbbf24; font-size: 13px; font-weight: 700;">8,450 / 10,000 XP</span>
    </div>
    <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
      <div style="width: 84.5%; height: 100%; background: linear-gradient(90deg, #fbbf24, #f59e0b); border-radius: 6px;"></div>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
    <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; text-align: center;">
      <div style="color: #60a5fa; font-size: 20px; font-weight: 800;">156</div>
      <div style="color: rgba(255,255,255,0.5); font-size: 11px;">Commits</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; text-align: center;">
      <div style="color: #34d399; font-size: 20px; font-weight: 800;">42</div>
      <div style="color: rgba(255,255,255,0.5); font-size: 11px;">PRs</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; text-align: center;">
      <div style="color: #f472b6; font-size: 20px; font-weight: 800;">89</div>
      <div style="color: rgba(255,255,255,0.5); font-size: 11px;">Stars</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'fun-mood-tracker',
    category: 'Creative & Fun',
    title: 'Coding Mood Tracker',
    description: 'Weekly mood visualization.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 30px; max-width: 450px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
  <h3 style="margin: 0 0 25px 0; color: #1f2937; display: flex; align-items: center; gap: 10px;">😊 Coding Mood This Week</h3>
  <div style="display: flex; justify-content: space-between; gap: 10px;">
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">🔥</div>
      <div style="font-size: 11px; color: #6b7280;">Mon</div>
      <div style="height: 60px; background: linear-gradient(180deg, #22c55e, #16a34a); border-radius: 8px; margin-top: 8px;"></div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">😊</div>
      <div style="font-size: 11px; color: #6b7280;">Tue</div>
      <div style="height: 45px; background: linear-gradient(180deg, #84cc16, #65a30d); border-radius: 8px; margin-top: 8px;"></div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">😤</div>
      <div style="font-size: 11px; color: #6b7280;">Wed</div>
      <div style="height: 25px; background: linear-gradient(180deg, #f97316, #ea580c); border-radius: 8px; margin-top: 8px;"></div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">🤯</div>
      <div style="font-size: 11px; color: #6b7280;">Thu</div>
      <div style="height: 15px; background: linear-gradient(180deg, #ef4444, #dc2626); border-radius: 8px; margin-top: 8px;"></div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
      <div style="font-size: 11px; color: #6b7280;">Fri</div>
      <div style="height: 70px; background: linear-gradient(180deg, #a855f7, #7c3aed); border-radius: 8px; margin-top: 8px;"></div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">😴</div>
      <div style="font-size: 11px; color: #6b7280;">Sat</div>
      <div style="height: 20px; background: linear-gradient(180deg, #6b7280, #4b5563); border-radius: 8px; margin-top: 8px;"></div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">☕</div>
      <div style="font-size: 11px; color: #6b7280;">Sun</div>
      <div style="height: 35px; background: linear-gradient(180deg, #f59e0b, #d97706); border-radius: 8px; margin-top: 8px;"></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'fun-retro-terminal',
    category: 'Creative & Fun',
    title: 'Retro Terminal',
    description: 'Classic terminal aesthetic.',
    code: `<div style="${MONO} background: #0a0a0a; border-radius: 12px; overflow: hidden; max-width: 500px; box-shadow: 0 0 50px rgba(0,255,0,0.1);">
  <div style="background: #1a1a1a; padding: 12px 15px; display: flex; align-items: center; gap: 8px;">
    <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%;"></div>
    <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%;"></div>
    <div style="width: 12px; height: 12px; background: #27ca40; border-radius: 50%;"></div>
    <span style="color: #666; font-size: 12px; margin-left: 10px;">bash — 80x24</span>
  </div>
  <div style="padding: 20px; color: #00ff00; font-size: 14px; line-height: 1.8;">
    <div><span style="color: #00ff00;">visitor@portfolio</span>:<span style="color: #5c94ff;">~</span>$ whoami</div>
    <div style="color: #ccc;">Creative Developer & Designer</div>
    <div style="margin-top: 10px;"><span style="color: #00ff00;">visitor@portfolio</span>:<span style="color: #5c94ff;">~</span>$ cat skills.txt</div>
    <div style="color: #ccc;">JavaScript ████████████████████ 95%</div>
    <div style="color: #ccc;">React      ██████████████████░░ 90%</div>
    <div style="color: #ccc;">Node.js    ████████████████░░░░ 80%</div>
    <div style="color: #ccc;">Python     ██████████████░░░░░░ 70%</div>
    <div style="margin-top: 10px;"><span style="color: #00ff00;">visitor@portfolio</span>:<span style="color: #5c94ff;">~</span>$ <span style="animation: blink 1s infinite;">█</span></div>
  </div>
</div>`
  },
  {
    id: 'fun-coffee-counter',
    category: 'Creative & Fun',
    title: 'Coffee Counter',
    description: 'Track caffeine consumption.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #78350f 0%, #451a03 100%); border-radius: 20px; padding: 30px; max-width: 350px; text-align: center;">
  <div style="font-size: 60px; margin-bottom: 15px;">☕</div>
  <h3 style="color: white; margin: 0 0 5px 0;">Coffee Consumed Today</h3>
  <p style="color: rgba(255,255,255,0.6); margin: 0 0 25px 0; font-size: 13px;">Powering code since morning</p>
  <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;">
    <div style="font-size: 36px;">☕</div>
    <div style="font-size: 36px;">☕</div>
    <div style="font-size: 36px;">☕</div>
    <div style="font-size: 36px; opacity: 0.3;">☕</div>
    <div style="font-size: 36px; opacity: 0.3;">☕</div>
  </div>
  <div style="background: rgba(255,255,255,0.1); border-radius: 30px; padding: 15px 25px; display: inline-block;">
    <span style="color: #fbbf24; font-size: 36px; font-weight: 800;">3</span>
    <span style="color: rgba(255,255,255,0.7);"> / 5 cups</span>
  </div>
  <div style="margin-top: 20px; color: rgba(255,255,255,0.5); font-size: 12px;">☠️ Danger zone at 5 cups</div>
</div>`
  },
  {
    id: 'fun-currently-doing',
    category: 'Creative & Fun',
    title: 'Currently Doing Card',
    description: 'Live status display.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
    <div style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite;"></div>
    <span style="font-weight: 700; color: #1f2937;">Currently</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f0fdf4; border-radius: 12px; border-left: 4px solid #22c55e;">
      <div style="font-size: 28px;">💻</div>
      <div>
        <div style="font-weight: 600; color: #166534;">Working on</div>
        <div style="color: #4b5563; font-size: 14px;">Super Secret Project</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #eff6ff; border-radius: 12px; border-left: 4px solid #3b82f6;">
      <div style="font-size: 28px;">📚</div>
      <div>
        <div style="font-weight: 600; color: #1e40af;">Learning</div>
        <div style="color: #4b5563; font-size: 14px;">Rust & WebAssembly</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #fdf4ff; border-radius: 12px; border-left: 4px solid #a855f7;">
      <div style="font-size: 28px;">🎵</div>
      <div>
        <div style="font-weight: 600; color: #7c2d12;">Listening to</div>
        <div style="color: #4b5563; font-size: 14px;">Lo-fi Hip Hop</div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'fun-skill-tree',
    category: 'Creative & Fun',
    title: 'Skill Tree',
    description: 'RPG-style skill visualization.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); border-radius: 20px; padding: 30px; max-width: 450px;">
  <h3 style="color: white; margin: 0 0 25px 0; text-align: center;">⚔️ Skill Tree</h3>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 15px;">
      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #fbbf24, #f59e0b); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">⚛️</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: white; font-weight: 600;">React Master</span>
          <span style="color: #fbbf24; font-size: 12px;">MAX</span>
        </div>
        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #fbbf24, #f59e0b); border-radius: 4px;"></div>
        </div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 15px;">
      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🟢</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: white; font-weight: 600;">Node.js Ninja</span>
          <span style="color: #22c55e; font-size: 12px;">LVL 8</span>
        </div>
        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <div style="width: 80%; height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); border-radius: 4px;"></div>
        </div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 15px;">
      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🐍</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: white; font-weight: 600;">Python Wizard</span>
          <span style="color: #3b82f6; font-size: 12px;">LVL 6</span>
        </div>
        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
          <div style="width: 60%; height: 100%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); border-radius: 4px;"></div>
        </div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 15px; opacity: 0.5;">
      <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; border: 2px dashed rgba(255,255,255,0.3);">🔒</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: white; font-weight: 600;">Rust Champion</span>
          <span style="color: #6b7280; font-size: 12px;">LOCKED</span>
        </div>
        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;"></div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'fun-contribution-art',
    category: 'Creative & Fun',
    title: 'Pixel Art Grid',
    description: 'GitHub-style pixel art.',
    code: `<div style="${SANS} background: #0d1117; border-radius: 16px; padding: 25px; max-width: 400px;">
  <h4 style="color: white; margin: 0 0 20px 0;">🎨 Contribution Art</h4>
  <div style="display: grid; grid-template-columns: repeat(15, 1fr); gap: 3px;">
    <div style="width: 12px; height: 12px; background: #0e4429; border-radius: 2px;"></div>
    <div style="width: 12px; height: 12px; background: #39d353; border-radius: 2px;"></div>
    <div style="width: 12px; height: 12px; background: #161b22; border-radius: 2px;"></div>
    <div style="width: 12px; height: 12px; background: #26a641; border-radius: 2px;"></div>
    <div style="width: 12px; height: 12px; background: #006d32; border-radius: 2px;"></div>
  </div>
  <p style="color: #6b7280; font-size: 12px; margin: 15px 0 0 0; text-align: center;">Every square tells a story</p>
</div>`
  },
  {
    id: 'fun-pomodoro',
    category: 'Creative & Fun',
    title: 'Pomodoro Timer',
    description: 'Productivity timer display.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 24px; padding: 40px; max-width: 320px; text-align: center;">
  <div style="font-size: 48px; margin-bottom: 10px;">🍅</div>
  <h3 style="color: white; margin: 0 0 5px 0;">Focus Time</h3>
  <p style="color: rgba(255,255,255,0.7); margin: 0 0 30px 0; font-size: 14px;">Stay productive!</p>
  <div style="background: rgba(0,0,0,0.2); border-radius: 20px; padding: 25px; margin-bottom: 25px;">
    <div style="color: white; font-size: 56px; font-weight: 800; font-family: monospace;">24:37</div>
    <div style="color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 10px;">Session 3 of 4</div>
  </div>
  <div style="display: flex; gap: 15px; justify-content: center;">
    <button style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border: none; border-radius: 50%; color: white; font-size: 20px; cursor: pointer;">⏸</button>
    <button style="width: 50px; height: 50px; background: white; border: none; border-radius: 50%; color: #dc2626; font-size: 20px; cursor: pointer;">↻</button>
    <button style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border: none; border-radius: 50%; color: white; font-size: 20px; cursor: pointer;">⏭</button>
  </div>
</div > `
  },
  {
    id: 'fun-code-stats',
    category: 'Creative & Fun',
    title: 'Code Statistics',
    description: 'Fun coding statistics.',
    code: `< div style = "${SANS} background: white; border-radius: 20px; padding: 30px; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);" >
  <h3 style="color: #1f2937; margin: 0 0 25px 0;">📊 This Week in Code</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 16px; padding: 20px; text-align: center;">
      <div style="font-size: 32px;">⌨️</div>
      <div style="font-size: 28px; font-weight: 800; color: #1e40af; margin: 10px 0 5px 0;">42,069</div>
      <div style="color: #3b82f6; font-size: 12px;">Lines Written</div>
    </div>
    <div style="background: linear-gradient(135deg, #fce7f3, #fbcfe8); border-radius: 16px; padding: 20px; text-align: center;">
      <div style="font-size: 32px;">🐛</div>
      <div style="font-size: 28px; font-weight: 800; color: #9d174d; margin: 10px 0 5px 0;">128</div>
      <div style="color: #db2777; font-size: 12px;">Bugs Squashed</div>
    </div>
    <div style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); border-radius: 16px; padding: 20px; text-align: center;">
      <div style="font-size: 32px;">☕</div>
      <div style="font-size: 28px; font-weight: 800; color: #065f46; margin: 10px 0 5px 0;">23</div>
      <div style="color: #059669; font-size: 12px;">Cups of Coffee</div>
    </div>
    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 16px; padding: 20px; text-align: center;">
      <div style="font-size: 32px;">🎯</div>
      <div style="font-size: 28px; font-weight: 800; color: #78350f; margin: 10px 0 5px 0;">7</div>
      <div style="color: #d97706; font-size: 12px;">Goals Achieved</div>
    </div>
  </div>
</div > `
  },
  {
    id: 'fun-streak-fire',
    category: 'Creative & Fun',
    title: 'Streak Fire',
    description: 'Animated streak counter.',
    code: `< div style = "${SANS} background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%); border-radius: 24px; padding: 40px; text-align: center; max-width: 350px; position: relative; overflow: hidden;" >
  <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%); filter: blur(40px);"></div>
  <div style="position: relative; z-index: 1;">
    <div style="font-size: 80px; margin-bottom: 10px;">🔥</div>
    <div style="color: #fb923c; font-size: 64px; font-weight: 900;">156</div>
    <div style="color: white; font-size: 20px; font-weight: 700; margin: 10px 0;">Day Streak!</div>
    <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0 0 25px 0;">You're on fire! Keep it up!</p>
    <div style="display: flex; justify-content: center; gap: 8px;">
      <div style="background: rgba(251,146,60,0.2); padding: 8px 16px; border-radius: 20px; color: #fb923c; font-size: 12px; font-weight: 600;">🏆 Top 1%</div>
      <div style="background: rgba(251,146,60,0.2); padding: 8px 16px; border-radius: 20px; color: #fb923c; font-size: 12px; font-weight: 600;">⭐ Elite</div>
    </div>
  </div>
</div > `
  },
  {
    id: 'fun-matrix-rain',
    category: 'Creative & Fun',
    title: 'Matrix Code Rain',
    description: 'Iconic matrix effect.',
    code: `< div style = "${MONO} background: #000; border-radius: 16px; padding: 20px; max-width: 400px; overflow: hidden; position: relative; height: 200px;" >
  <div style="position: absolute; inset: 0; display: flex; justify-content: space-around; opacity: 0.8;">
    <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 3s linear infinite;">1<br>0<br>1<br>1<br>0<br>0<br>1<br>0</div>
      <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 2.5s linear infinite 0.3s;">0<br>1<br>0<br>1<br>1<br>0<br>0<br>1</div>
        <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 3.2s linear infinite 0.5s;">1<br>1<br>0<br>0<br>1<br>1<br>0<br>0</div>
          <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 2.8s linear infinite 0.1s;">0<br>0<br>1<br>1<br>0<br>1<br>1<br>0</div>
            <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 3.5s linear infinite 0.7s;">1<br>0<br>0<br>1<br>0<br>0<br>1<br>1</div>
              <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 2.3s linear infinite 0.2s;">0<br>1<br>1<br>0<br>1<br>0<br>1<br>0</div>
                <div style="color: #00ff00; font-size: 14px; line-height: 1.5; animation: fall 3.1s linear infinite 0.9s;">1<br>1<br>1<br>0<br>0<br>1<br>0<br>1</div>
                </div>
                  <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                    <div style="background: rgba(0,0,0,0.8); padding: 20px 30px; border-radius: 12px; border: 1px solid #00ff00;">
                      <div style="color: #00ff00; font-size: 24px; font-weight: bold;">Wake up, Neo...</div>
                    </div>
                  </div>
                </div>`
  },
  {
    id: 'fun-daily-challenge',
    category: 'Creative & Fun',
    title: 'Daily Challenge',
    description: 'Gamified daily task.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 24px; padding: 30px; max-width: 380px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 28px;">🎯</div>
                        <div style="color: white; font-weight: 700;">Daily Challenge</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; color: white; font-size: 12px; font-weight: 600;">+500 XP</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                      <h4 style="color: white; margin: 0 0 10px 0;">Build a REST API</h4>
                      <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0 0 15px 0;">Create a simple REST API with at least 3 endpoints using your favorite framework.</p>
                      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <span style="background: rgba(255,255,255,0.2); color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px;">Node.js</span>
                        <span style="background: rgba(255,255,255,0.2); color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px;">Express</span>
                        <span style="background: rgba(255,255,255,0.2); color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px;">REST</span>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="color: rgba(255,255,255,0.7); font-size: 13px;">⏰ 18h 24m remaining</div>
                      <button style="background: white; color: #4f46e5; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer;">Start Challenge →</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-emoji-reaction',
    category: 'Creative & Fun',
    title: 'Emoji Reactions',
    description: 'Social media style reactions.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 350px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                      <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">JD</div>
                      <div>
                        <div style="font-weight: 700; color: #1f2937;">John Developer</div>
                        <div style="color: #6b7280; font-size: 12px;">2 hours ago</div>
                      </div>
                    </div>
                    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Just deployed my first production app! 🚀 This journey has been incredible. Thanks everyone for the support!</p>
                    <div style="display: flex; gap: 10px; padding-top: 15px; border-top: 1px solid #f3f4f6;">
                      <div style="display: flex; align-items: center; gap: 6px; background: #fef2f2; padding: 8px 14px; border-radius: 25px; cursor: pointer;">
                        <span style="font-size: 18px;">❤️</span>
                        <span style="color: #dc2626; font-weight: 600; font-size: 13px;">243</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; background: #fefce8; padding: 8px 14px; border-radius: 25px; cursor: pointer;">
                        <span style="font-size: 18px;">🔥</span>
                        <span style="color: #ca8a04; font-weight: 600; font-size: 13px;">89</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; background: #f0fdf4; padding: 8px 14px; border-radius: 25px; cursor: pointer;">
                        <span style="font-size: 18px;">🎉</span>
                        <span style="color: #16a34a; font-weight: 600; font-size: 13px;">56</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; background: #eff6ff; padding: 8px 14px; border-radius: 25px; cursor: pointer;">
                        <span style="font-size: 18px;">🚀</span>
                        <span style="color: #2563eb; font-weight: 600; font-size: 13px;">34</span>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-github-unwrapped',
    category: 'Creative & Fun',
    title: 'GitHub Unwrapped',
    description: 'Spotify Wrapped style stats.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #0d1117 0%, #161b22 100%); border-radius: 24px; overflow: hidden; max-width: 350px;">
                    <div style="background: linear-gradient(135deg, #238636, #2ea043); padding: 30px; text-align: center;">
                      <div style="font-size: 48px; margin-bottom: 10px;">🎁</div>
                      <h2 style="color: white; margin: 0; font-size: 24px;">Your 2024</h2>
                      <h2 style="color: white; margin: 0; font-size: 24px;">GitHub Unwrapped</h2>
                    </div>
                    <div style="padding: 25px;">
                      <div style="text-align: center; margin-bottom: 25px;">
                        <div style="color: #58a6ff; font-size: 48px; font-weight: 900;">1,247</div>
                        <div style="color: #8b949e; font-size: 14px;">Total Contributions</div>
                      </div>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div style="background: rgba(35,134,54,0.2); border-radius: 12px; padding: 15px; text-align: center;">
                          <div style="color: #3fb950; font-size: 24px; font-weight: 700;">156</div>
                          <div style="color: #8b949e; font-size: 11px;">Pull Requests</div>
                        </div>
                        <div style="background: rgba(136,46,224,0.2); border-radius: 12px; padding: 15px; text-align: center;">
                          <div style="color: #8957e5; font-size: 24px; font-weight: 700;">89</div>
                          <div style="color: #8b949e; font-size: 11px;">Issues Opened</div>
                        </div>
                        <div style="background: rgba(88,166,255,0.2); border-radius: 12px; padding: 15px; text-align: center;">
                          <div style="color: #58a6ff; font-size: 24px; font-weight: 700;">42</div>
                          <div style="color: #8b949e; font-size: 11px;">Repos Created</div>
                        </div>
                        <div style="background: rgba(255,166,87,0.2); border-radius: 12px; padding: 15px; text-align: center;">
                          <div style="color: #d29922; font-size: 24px; font-weight: 700;">567</div>
                          <div style="color: #8b949e; font-size: 11px;">Stars Earned</div>
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px;">
                        <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">Most Used Language</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div style="width: 16px; height: 16px; background: #f1e05a; border-radius: 50%;"></div>
                          <span style="color: white; font-weight: 700;">JavaScript</span>
                          <span style="color: #8b949e; margin-left: auto;">68%</span>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-vaporwave',
    category: 'Creative & Fun',
    title: 'Vaporwave Card',
    description: 'Aesthetic retro design.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #ff6ad5 0%, #c774e8 25%, #ad8cff 50%, #8795e8 75%, #94d0ff 100%); border-radius: 20px; padding: 40px; max-width: 400px; text-align: center;">
                    <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 30px; backdrop-filter: blur(10px);">
                      <div style="font-size: 60px; margin-bottom: 15px;">🌴</div>
                      <h2 style="color: white; margin: 0; font-size: 28px; text-shadow: 3px 3px 0 #ff6ad5, 6px 6px 0 rgba(0,0,0,0.2);">A E S T H E T I C</h2>
                      <p style="color: rgba(255,255,255,0.8); margin: 15px 0 0 0; font-size: 14px; letter-spacing: 3px;">アウトラン</p>
                      <div style="display: flex; justify-content: center; gap: 20px; margin-top: 25px;">
                        <div style="font-size: 30px;">🌸</div>
                        <div style="font-size: 30px;">💿</div>
                        <div style="font-size: 30px;">🌺</div>
                        <div style="font-size: 30px;">📼</div>
                        <div style="font-size: 30px;">🎮</div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-loading-states',
    category: 'Creative & Fun',
    title: 'Fun Loading States',
    description: 'Creative loading animations.',
    code: `<div style="${SANS} background: #1a1a2e; border-radius: 20px; padding: 30px; max-width: 400px;">
                    <h4 style="color: white; margin: 0 0 25px 0;">🔄 Loading States</h4>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 28px; animation: spin 1s linear infinite;">⚙️</div>
                        <div>
                          <div style="color: white; font-weight: 600;">Processing...</div>
                          <div style="color: #6b7280; font-size: 12px;">Please wait</div>
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 28px; animation: bounce 0.6s ease infinite;">🚀</div>
                        <div>
                          <div style="color: white; font-weight: 600;">Deploying...</div>
                          <div style="color: #6b7280; font-size: 12px;">Almost there!</div>
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 28px; animation: pulse 1.5s ease infinite;">💾</div>
                        <div>
                          <div style="color: white; font-weight: 600;">Saving...</div>
                          <div style="color: #6b7280; font-size: 12px;">Don't close the page</div>
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px;">
                        <div style="display: flex; gap: 4px;">
                          <div style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; animation: bounce 0.6s ease infinite;"></div>
                          <div style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; animation: bounce 0.6s ease infinite 0.1s;"></div>
                          <div style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; animation: bounce 0.6s ease infinite 0.2s;"></div>
                        </div>
                        <div>
                          <div style="color: white; font-weight: 600;">Loading...</div>
                          <div style="color: #6b7280; font-size: 12px;">Fetching data</div>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-weather-widget',
    category: 'Creative & Fun',
    title: 'Weather Widget',
    description: 'Beautiful weather display.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 24px; padding: 30px; max-width: 320px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -30px; right: -30px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    <div style="position: relative; z-index: 1;">
                      <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                          <div style="color: rgba(255,255,255,0.8); font-size: 14px;">San Francisco</div>
                          <div style="color: white; font-size: 64px; font-weight: 300; line-height: 1;">72°</div>
                          <div style="color: rgba(255,255,255,0.8); font-size: 14px;">Partly Cloudy</div>
                        </div>
                        <div style="font-size: 64px;">⛅</div>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                        <div style="text-align: center;">
                          <div style="font-size: 20px;">🌅</div>
                          <div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 5px;">Mon</div>
                          <div style="color: white; font-weight: 600;">75°</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 20px;">☀️</div>
                          <div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 5px;">Tue</div>
                          <div style="color: white; font-weight: 600;">78°</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 20px;">🌧️</div>
                          <div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 5px;">Wed</div>
                          <div style="color: white; font-weight: 600;">68°</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 20px;">⛈️</div>
                          <div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 5px;">Thu</div>
                          <div style="color: white; font-weight: 600;">65°</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 20px;">☀️</div>
                          <div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 5px;">Fri</div>
                          <div style="color: white; font-weight: 600;">74°</div>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-music-player',
    category: 'Creative & Fun',
    title: 'Music Player Card',
    description: 'Full music player UI.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%); border-radius: 24px; padding: 30px; max-width: 350px;">
                    <div style="width: 200px; height: 200px; background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3); border-radius: 20px; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                      <div style="font-size: 80px;">🎵</div>
                    </div>
                    <div style="text-align: center; margin-bottom: 25px;">
                      <h3 style="color: white; margin: 0; font-size: 20px;">Midnight Dreams</h3>
                      <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Chill Vibes • Lo-fi Album</p>
                    </div>
                    <div style="margin-bottom: 20px;">
                      <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
                        <div style="width: 35%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-top: 8px; color: #6b7280; font-size: 12px;">
                        <span>1:24</span>
                        <span>3:45</span>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; gap: 25px;">
                      <button style="background: none; border: none; color: #6b7280; font-size: 24px; cursor: pointer;">🔀</button>
                      <button style="background: none; border: none; color: white; font-size: 28px; cursor: pointer;">⏮️</button>
                      <button style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 50%; color: white; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">▶️</button>
                      <button style="background: none; border: none; color: white; font-size: 28px; cursor: pointer;">⏭️</button>
                      <button style="background: none; border: none; color: #6b7280; font-size: 24px; cursor: pointer;">🔁</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-habit-tracker',
    category: 'Creative & Fun',
    title: 'Habit Tracker',
    description: 'Weekly habit tracking grid.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 420px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                      <h3 style="margin: 0; color: #1f2937;">📅 Weekly Habits</h3>
                      <span style="background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">5/7 days</span>
                    </div>
                    <div style="display: grid; grid-template-columns: auto repeat(7, 1fr); gap: 8px; font-size: 13px;">
                      <div></div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">M</div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">T</div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">W</div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">T</div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">F</div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">S</div>
                      <div style="text-align: center; color: #6b7280; font-size: 11px;">S</div>

                      <div style="color: #374151; font-weight: 500;">💻 Code</div>
                      <div style="width: 28px; height: 28px; background: #22c55e; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #22c55e; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #22c55e; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>
                      <div style="width: 28px; height: 28px; background: #22c55e; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #22c55e; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>

                      <div style="color: #374151; font-weight: 500;">📚 Read</div>
                      <div style="width: 28px; height: 28px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>
                      <div style="width: 28px; height: 28px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>
                      <div style="width: 28px; height: 28px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>

                      <div style="color: #374151; font-weight: 500;">🏃 Exercise</div>
                      <div style="width: 28px; height: 28px; background: #f97316; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>
                      <div style="width: 28px; height: 28px; background: #f97316; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>
                      <div style="width: 28px; height: 28px; background: #f97316; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                      <div style="width: 28px; height: 28px; background: #f3f4f6; border-radius: 6px;"></div>
                      <div style="width: 28px; height: 28px; background: #f97316; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">✓</div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-countdown-timer',
    category: 'Creative & Fun',
    title: 'Event Countdown',
    description: 'Animated countdown display.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 24px; padding: 40px; max-width: 450px; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 15px;">🎉</div>
                    <h2 style="color: white; margin: 0 0 5px 0;">Product Launch</h2>
                    <p style="color: #64748b; margin: 0 0 30px 0;">Get ready for something amazing!</p>
                    <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 30px;">
                      <div style="background: rgba(102,126,234,0.2); border-radius: 16px; padding: 20px 25px; min-width: 80px;">
                        <div style="color: #667eea; font-size: 36px; font-weight: 800;">07</div>
                        <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Days</div>
                      </div>
                      <div style="background: rgba(236,72,153,0.2); border-radius: 16px; padding: 20px 25px; min-width: 80px;">
                        <div style="color: #ec4899; font-size: 36px; font-weight: 800;">14</div>
                        <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Hours</div>
                      </div>
                      <div style="background: rgba(34,197,94,0.2); border-radius: 16px; padding: 20px 25px; min-width: 80px;">
                        <div style="color: #22c55e; font-size: 36px; font-weight: 800;">32</div>
                        <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mins</div>
                      </div>
                      <div style="background: rgba(251,191,36,0.2); border-radius: 16px; padding: 20px 25px; min-width: 80px;">
                        <div style="color: #fbbf24; font-size: 36px; font-weight: 800;">58</div>
                        <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Secs</div>
                      </div>
                    </div>
                    <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer;">Notify Me 🔔</button>
                  </div>`
  },
  {
    id: 'fun-social-proof',
    category: 'Creative & Fun',
    title: 'Social Proof Banner',
    description: 'Trust indicators display.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 30px; max-width: 500px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 25px;">
                      <h3 style="color: #1f2937; margin: 0 0 8px 0;">Trusted by developers worldwide</h3>
                      <p style="color: #6b7280; margin: 0; font-size: 14px;">Join thousands of happy users</p>
                    </div>
                    <div style="display: flex; justify-content: space-around; margin-bottom: 25px;">
                      <div style="text-align: center;">
                        <div style="color: #667eea; font-size: 32px; font-weight: 800;">50K+</div>
                        <div style="color: #6b7280; font-size: 13px;">Users</div>
                      </div>
                      <div style="text-align: center;">
                        <div style="color: #22c55e; font-size: 32px; font-weight: 800;">4.9★</div>
                        <div style="color: #6b7280; font-size: 13px;">Rating</div>
                      </div>
                      <div style="text-align: center;">
                        <div style="color: #f59e0b; font-size: 32px; font-weight: 800;">99%</div>
                        <div style="color: #6b7280; font-size: 13px;">Satisfaction</div>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; gap: -10px;">
                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 16px;">😊</div>
                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; border: 3px solid white; margin-left: -10px; display: flex; align-items: center; justify-content: center; font-size: 16px;">😄</div>
                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; border: 3px solid white; margin-left: -10px; display: flex; align-items: center; justify-content: center; font-size: 16px;">🤩</div>
                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #ec4899, #db2777); border-radius: 50%; border: 3px solid white; margin-left: -10px; display: flex; align-items: center; justify-content: center; font-size: 16px;">😍</div>
                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; border: 3px solid white; margin-left: -10px; display: flex; align-items: center; justify-content: center; font-size: 16px;">🥳</div>
                      <div style="margin-left: 10px; color: #6b7280; font-size: 14px;">+50K more</div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-nft-card',
    category: 'Creative & Fun',
    title: 'NFT Art Card',
    description: 'Digital collectible display.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%); border-radius: 24px; padding: 20px; max-width: 320px;">
                    <div style="background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #a55eea); border-radius: 16px; padding: 4px; margin-bottom: 20px;">
                      <div style="background: #1a1a2e; border-radius: 14px; height: 280px; display: flex; align-items: center; justify-content: center;">
                        <div style="font-size: 120px;">🎨</div>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                      <div>
                        <h3 style="color: white; margin: 0; font-size: 18px;">Cosmic Dreams #042</h3>
                        <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 13px;">by @digital_artist</p>
                      </div>
                      <div style="background: rgba(168,85,247,0.2); padding: 4px 10px; border-radius: 8px;">
                        <span style="color: #a855f7; font-size: 12px; font-weight: 600;">🔥 Trending</span>
                      </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                      <div style="display: flex; justify-content: space-between;">
                        <div>
                          <div style="color: #6b7280; font-size: 11px;">Current Bid</div>
                          <div style="color: white; font-weight: 700; font-size: 18px; display: flex; align-items: center; gap: 6px;">
                            <span style="color: #627eea;">Ξ</span> 2.45
                          </div>
                        </div>
                        <div style="text-align: right;">
                          <div style="color: #6b7280; font-size: 11px;">Ends in</div>
                          <div style="color: #f472b6; font-weight: 700; font-size: 18px;">5h 23m</div>
                        </div>
                      </div>
                    </div>
                    <button style="width: 100%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer;">Place Bid 🎯</button>
                  </div>`
  },
  {
    id: 'fun-game-score',
    category: 'Creative & Fun',
    title: 'Game Score Card',
    description: 'Gaming leaderboard style.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 24px; padding: 30px; max-width: 380px;">
                    <div style="text-align: center; margin-bottom: 25px;">
                      <div style="font-size: 50px; margin-bottom: 10px;">🏆</div>
                      <h2 style="color: white; margin: 0;">GAME OVER</h2>
                      <p style="color: #64748b; margin: 5px 0 0 0;">New High Score!</p>
                    </div>
                    <div style="background: linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.05)); border: 2px solid #fbbf24; border-radius: 16px; padding: 25px; text-align: center; margin-bottom: 25px;">
                      <div style="color: #fbbf24; font-size: 56px; font-weight: 900;">42,850</div>
                      <div style="color: rgba(255,255,255,0.6); font-size: 14px;">POINTS</div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; text-align: center;">
                        <div style="font-size: 24px;">⭐</div>
                        <div style="color: white; font-weight: 700; margin: 5px 0;">3</div>
                        <div style="color: #64748b; font-size: 11px;">Stars</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; text-align: center;">
                        <div style="font-size: 24px;">⏱️</div>
                        <div style="color: white; font-weight: 700; margin: 5px 0;">2:34</div>
                        <div style="color: #64748b; font-size: 11px;">Time</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; text-align: center;">
                        <div style="font-size: 24px;">🎯</div>
                        <div style="color: white; font-weight: 700; margin: 5px 0;">98%</div>
                        <div style="color: #64748b; font-size: 11px;">Accuracy</div>
                      </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                      <button style="flex: 1; background: rgba(255,255,255,0.1); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer;">🏠 Menu</button>
                      <button style="flex: 1; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer;">🔄 Retry</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-podcast-player',
    category: 'Creative & Fun',
    title: 'Podcast Player',
    description: 'Audio podcast interface.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                      <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <span style="font-size: 48px;">🎙️</span>
                      </div>
                      <div style="flex: 1;">
                        <div style="background: #eff6ff; color: #1e40af; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; display: inline-block; margin-bottom: 8px;">EPISODE 42</div>
                        <h3 style="margin: 0 0 5px 0; color: #1f2937; font-size: 16px; line-height: 1.3;">The Future of AI in Software Development</h3>
                        <p style="margin: 0; color: #6b7280; font-size: 13px;">Tech Talk Podcast</p>
                      </div>
                    </div>
                    <div style="margin-bottom: 20px;">
                      <div style="height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;">
                        <div style="width: 62%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 3px;"></div>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-top: 8px; color: #6b7280; font-size: 12px;">
                        <span>24:32</span>
                        <span>39:45</span>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <button style="background: none; border: none; color: #6b7280; font-size: 20px; cursor: pointer;">1.5x</button>
                      <div style="display: flex; align-items: center; gap: 20px;">
                        <button style="background: none; border: none; color: #374151; font-size: 24px; cursor: pointer;">⏪</button>
                        <button style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 50%; color: white; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center;">⏸️</button>
                        <button style="background: none; border: none; color: #374151; font-size: 24px; cursor: pointer;">⏩</button>
                      </div>
                      <button style="background: none; border: none; color: #6b7280; font-size: 20px; cursor: pointer;">📋</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-crypto-ticker',
    category: 'Creative & Fun',
    title: 'Crypto Ticker',
    description: 'Live cryptocurrency prices.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); border-radius: 20px; padding: 25px; max-width: 400px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                      <h3 style="color: white; margin: 0; font-size: 16px;">📈 Live Crypto</h3>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite;"></div>
                        <span style="color: #22c55e; font-size: 12px;">Live</span>
                      </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px;">🪙</div>
                        <div style="flex: 1;">
                          <div style="color: white; font-weight: 700;">Bitcoin</div>
                          <div style="color: #64748b; font-size: 12px;">BTC</div>
                        </div>
                        <div style="text-align: right;">
                          <div style="color: white; font-weight: 700;">$67,432.18</div>
                          <div style="color: #22c55e; font-size: 12px;">↑ +2.34%</div>
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px;">💎</div>
                        <div style="flex: 1;">
                          <div style="color: white; font-weight: 700;">Ethereum</div>
                          <div style="color: #64748b; font-size: 12px;">ETH</div>
                        </div>
                        <div style="text-align: right;">
                          <div style="color: white; font-weight: 700;">$3,521.67</div>
                          <div style="color: #22c55e; font-size: 12px;">↑ +1.87%</div>
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px;">🐕</div>
                        <div style="flex: 1;">
                          <div style="color: white; font-weight: 700;">Dogecoin</div>
                          <div style="color: #64748b; font-size: 12px;">DOGE</div>
                        </div>
                        <div style="text-align: right;">
                          <div style="color: white; font-weight: 700;">$0.1842</div>
                          <div style="color: #ef4444; font-size: 12px;">↓ -0.56%</div>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-recipe-card',
    category: 'Creative & Fun',
    title: 'Recipe Card',
    description: 'Food recipe showcase.',
    code: `<div style="${SANS} background: white; border-radius: 24px; overflow: hidden; max-width: 350px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="height: 180px; background: linear-gradient(135deg, #f97316, #ef4444); display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 80px;">🍝</span>
                    </div>
                    <div style="padding: 25px;">
                      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                          <h3 style="margin: 0 0 5px 0; color: #1f2937;">Spaghetti Carbonara</h3>
                          <p style="margin: 0; color: #6b7280; font-size: 13px;">Italian Classic</p>
                        </div>
                        <div style="background: #fef2f2; color: #dc2626; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">❤️ 234</div>
                      </div>
                      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <span style="font-size: 16px;">⏱️</span>
                          <span style="color: #6b7280; font-size: 13px;">25 min</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <span style="font-size: 16px;">👨‍🍳</span>
                          <span style="color: #6b7280; font-size: 13px;">Easy</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <span style="font-size: 16px;">🍽️</span>
                          <span style="color: #6b7280; font-size: 13px;">4 servings</span>
                        </div>
                      </div>
                      <div style="display: flex; gap: 8px; margin-bottom: 20px;">
                        <span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; font-size: 11px;">🥚 Eggs</span>
                        <span style="background: #fce7f3; color: #9d174d; padding: 4px 10px; border-radius: 20px; font-size: 11px;">🥓 Bacon</span>
                        <span style="background: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 20px; font-size: 11px;">🧀 Cheese</span>
                      </div>
                      <button style="width: 100%; background: linear-gradient(135deg, #f97316, #ef4444); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer;">View Recipe →</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-travel-card',
    category: 'Creative & Fun',
    title: 'Travel Destination',
    description: 'Beautiful travel showcase.',
    code: `<div style="${SANS} background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), linear-gradient(135deg, #06b6d4, #0891b2); border-radius: 24px; padding: 30px; max-width: 350px; min-height: 400px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 20px;">
                      <span style="color: white; font-weight: 600;">📍 Japan</span>
                    </div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 100px; opacity: 0.3;">🗾</div>
                    <div>
                      <h2 style="color: white; margin: 0 0 8px 0; font-size: 28px;">Tokyo Adventure</h2>
                      <p style="color: rgba(255,255,255,0.8); margin: 0 0 20px 0; font-size: 14px; line-height: 1.6;">Experience the perfect blend of ancient tradition and cutting-edge technology.</p>
                      <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <span style="font-size: 16px;">📅</span>
                          <span style="color: rgba(255,255,255,0.8); font-size: 13px;">7 Days</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <span style="font-size: 16px;">⭐</span>
                          <span style="color: rgba(255,255,255,0.8); font-size: 13px;">4.9 (2.4K)</span>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <span style="color: rgba(255,255,255,0.6); font-size: 12px;">From</span>
                          <div style="color: white; font-size: 24px; font-weight: 800;">$1,299</div>
                        </div>
                        <button style="background: white; color: #0891b2; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; cursor: pointer;">Book Now ✈️</button>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-fitness-ring',
    category: 'Creative & Fun',
    title: 'Fitness Activity Ring',
    description: 'Apple Watch style rings.',
    code: `<div style="${SANS} background: #000; border-radius: 24px; padding: 35px; max-width: 320px;">
                    <h3 style="color: white; margin: 0 0 30px 0; text-align: center;">Activity Today</h3>
                    <div style="position: relative; width: 200px; height: 200px; margin: 0 auto 30px;">
                      <!-- Move Ring -->
                      <svg width="200" height="200" style="position: absolute; transform: rotate(-90deg);">
                        <circle cx="100" cy="100" r="90" stroke="#3d0d0d" stroke-width="15" fill="none" />
                        <circle cx="100" cy="100" r="90" stroke="#ff2d55" stroke-width="15" fill="none" stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="113" />
                      </svg>
                      <!-- Exercise Ring -->
                      <svg width="200" height="200" style="position: absolute; transform: rotate(-90deg);">
                        <circle cx="100" cy="100" r="70" stroke="#0d3d0d" stroke-width="15" fill="none" />
                        <circle cx="100" cy="100" r="70" stroke="#30d158" stroke-width="15" fill="none" stroke-linecap="round" stroke-dasharray="440" stroke-dashoffset="110" />
                      </svg>
                      <!-- Stand Ring -->
                      <svg width="200" height="200" style="position: absolute; transform: rotate(-90deg);">
                        <circle cx="100" cy="100" r="50" stroke="#0d2d3d" stroke-width="15" fill="none" />
                        <circle cx="100" cy="100" r="50" stroke="#5ac8fa" stroke-width="15" fill="none" stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="47" />
                      </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 12px; height: 12px; background: #ff2d55; border-radius: 50%;"></div>
                        <span style="color: white; font-weight: 600; flex: 1;">Move</span>
                        <span style="color: #ff2d55; font-weight: 700;">420/500 CAL</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 12px; height: 12px; background: #30d158; border-radius: 50%;"></div>
                        <span style="color: white; font-weight: 600; flex: 1;">Exercise</span>
                        <span style="color: #30d158; font-weight: 700;">25/30 MIN</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 12px; height: 12px; background: #5ac8fa; border-radius: 50%;"></div>
                        <span style="color: white; font-weight: 600; flex: 1;">Stand</span>
                        <span style="color: #5ac8fa; font-weight: 700;">10/12 HR</span>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-code-review',
    category: 'Creative & Fun',
    title: 'Code Review Card',
    description: 'PR review notification.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 420px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-left: 4px solid #22c55e;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">✓</div>
                        <div>
                          <div style="font-weight: 700; color: #166534;">Approved</div>
                          <div style="color: #6b7280; font-size: 13px;">by @senior_dev • 2h ago</div>
                        </div>
                      </div>
                      <span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">+2 👍</span>
                    </div>
                    <div style="background: #f8fafc; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                      <div style="font-family: monospace; color: #64748b; font-size: 13px; margin-bottom: 8px;">#1234</div>
                      <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 15px;">feat: Add user authentication with OAuth2</h4>
                      <div style="display: flex; gap: 15px; font-size: 12px; color: #64748b;">
                        <span style="color: #22c55e;">+248 additions</span>
                        <span style="color: #ef4444;">-42 deletions</span>
                        <span>12 files</span>
                      </div>
                    </div>
                    <div style="background: #f0fdf4; border-radius: 10px; padding: 12px; margin-bottom: 15px;">
                      <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.5;">"Great implementation! Clean code and good test coverage. Ready to merge. 🚀"</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                      <button style="flex: 1; background: #22c55e; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer;">Merge PR 🎉</button>
                      <button style="background: #f3f4f6; color: #374151; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 600; cursor: pointer;">View</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-language-stats',
    category: 'Creative & Fun',
    title: 'Programming Languages',
    description: 'Language usage breakdown.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #0d1117 0%, #161b22 100%); border-radius: 20px; padding: 25px; max-width: 380px;">
                    <h3 style="color: white; margin: 0 0 20px 0;">💻 Most Used Languages</h3>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 12px; height: 12px; background: #f1e05a; border-radius: 50%;"></div>
                            <span style="color: white; font-weight: 600;">JavaScript</span>
                          </div>
                          <span style="color: #8b949e;">42.3%</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                          <div style="width: 42.3%; height: 100%; background: #f1e05a; border-radius: 4px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 12px; height: 12px; background: #3178c6; border-radius: 50%;"></div>
                            <span style="color: white; font-weight: 600;">TypeScript</span>
                          </div>
                          <span style="color: #8b949e;">28.7%</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                          <div style="width: 28.7%; height: 100%; background: #3178c6; border-radius: 4px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 12px; height: 12px; background: #3572A5; border-radius: 50%;"></div>
                            <span style="color: white; font-weight: 600;">Python</span>
                          </div>
                          <span style="color: #8b949e;">15.2%</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                          <div style="width: 15.2%; height: 100%; background: #3572A5; border-radius: 4px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 12px; height: 12px; background: #e34c26; border-radius: 50%;"></div>
                            <span style="color: white; font-weight: 600;">HTML</span>
                          </div>
                          <span style="color: #8b949e;">8.4%</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                          <div style="width: 8.4%; height: 100%; background: #e34c26; border-radius: 4px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 12px; height: 12px; background: #563d7c; border-radius: 50%;"></div>
                            <span style="color: white; font-weight: 600;">CSS</span>
                          </div>
                          <span style="color: #8b949e;">5.4%</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                          <div style="width: 5.4%; height: 100%; background: #563d7c; border-radius: 4px;"></div>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-commit-message',
    category: 'Creative & Fun',
    title: 'Commit Message Generator',
    description: 'Fun commit messages.',
    code: `<div style="${SANS} background: #0d1117; border-radius: 20px; padding: 25px; max-width: 420px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                      <span style="font-size: 24px;">💬</span>
                      <h3 style="color: white; margin: 0;">Commit Message of the Day</h3>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; font-family: monospace; margin-bottom: 20px;">
                      <div style="color: #8b949e; font-size: 12px; margin-bottom: 10px;">$ git commit -m</div>
                      <div style="color: #58a6ff; font-size: 16px; line-height: 1.6;">"Fixed bug that mass introduced yesterday by mass fixing bugs from the day before 🔄"</div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                      <span style="background: rgba(88,166,255,0.2); color: #58a6ff; padding: 6px 12px; border-radius: 20px; font-size: 12px;">🐛 Bug Fix</span>
                      <span style="background: rgba(63,185,80,0.2); color: #3fb950; padding: 6px 12px; border-radius: 20px; font-size: 12px;">✨ Feature</span>
                      <span style="background: rgba(210,153,34,0.2); color: #d29922; padding: 6px 12px; border-radius: 20px; font-size: 12px;">📝 Docs</span>
                      <span style="background: rgba(137,87,229,0.2); color: #8957e5; padding: 6px 12px; border-radius: 20px; font-size: 12px;">♻️ Refactor</span>
                    </div>
                    <button style="width: 100%; background: linear-gradient(135deg, #238636, #2ea043); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer;">Generate New Message 🎲</button>
                  </div>`
  },
  {
    id: 'fun-developer-card',
    category: 'Creative & Fun',
    title: 'Developer Business Card',
    description: 'Digital business card.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 20px; padding: 35px; max-width: 400px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; opacity: 0.3;"></div>
                    <div style="position: absolute; bottom: -30px; left: -30px; width: 100px; height: 100px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 50%; opacity: 0.3;"></div>
                    <div style="position: relative; z-index: 1;">
                      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; border: 3px solid rgba(255,255,255,0.2);">👨‍💻</div>
                        <div>
                          <h2 style="color: white; margin: 0 0 5px 0; font-size: 24px;">John Developer</h2>
                          <p style="color: #667eea; margin: 0; font-weight: 600;">Full Stack Engineer</p>
                        </div>
                      </div>
                      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px;">
                        <div style="display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8);">
                          <span style="font-size: 18px;">📧</span>
                          <span style="font-size: 14px;">john@developer.dev</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8);">
                          <span style="font-size: 18px;">🌐</span>
                          <span style="font-size: 14px;">johndeveloper.dev</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8);">
                          <span style="font-size: 18px;">📍</span>
                          <span style="font-size: 14px;">San Francisco, CA</span>
                        </div>
                      </div>
                      <div style="display: flex; gap: 10px;">
                        <a href="#" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 12px; border-radius: 10px; text-decoration: none; text-align: center; font-size: 18px;">🐙</a>
                        <a href="#" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 12px; border-radius: 10px; text-decoration: none; text-align: center; font-size: 18px;">💼</a>
                        <a href="#" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 12px; border-radius: 10px; text-decoration: none; text-align: center; font-size: 18px;">🐦</a>
                        <a href="#" style="flex: 1; background: rgba(255,255,255,0.1); color: white; padding: 12px; border-radius: 10px; text-decoration: none; text-align: center; font-size: 18px;">📸</a>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-cat-facts',
    category: 'Creative & Fun',
    title: 'Random Cat Facts',
    description: 'Fun animal facts card.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 24px; padding: 30px; max-width: 380px; position: relative;">
                    <div style="position: absolute; top: 15px; right: 15px; font-size: 40px;">🐱</div>
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <span style="font-size: 24px;">🐾</span>
                        <h3 style="margin: 0; color: #78350f;">Cat Fact of the Day</h3>
                      </div>
                      <p style="color: #92400e; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">"A cat's nose print is unique, much like a human's fingerprint. No two cats have the same nose print!"</p>
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; gap: 8px;">
                          <span style="background: #fef3c7; padding: 6px 12px; border-radius: 20px; font-size: 12px;">😺 Cute</span>
                          <span style="background: #fef3c7; padding: 6px 12px; border-radius: 20px; font-size: 12px;">🧠 Smart</span>
                        </div>
                        <button style="background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer;">New Fact 🎲</button>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-movie-ticket',
    category: 'Creative & Fun',
    title: 'Movie Ticket',
    description: 'Cinema ticket design.',
    code: `<div style="${SANS} display: flex; max-width: 500px;">
                    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 20px 0 0 20px; padding: 25px; flex: 1;">
                      <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                        <div style="width: 80px; height: 110px; background: linear-gradient(135deg, #f97316, #dc2626); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 40px;">🎬</div>
                        <div>
                          <h3 style="color: white; margin: 0 0 5px 0; font-size: 18px;">Interstellar</h3>
                          <p style="color: #a5b4fc; margin: 0; font-size: 13px;">Sci-Fi • 2h 49min</p>
                          <div style="display: flex; align-items: center; gap: 4px; margin-top: 8px;">
                            <span style="color: #fbbf24;">★★★★★</span>
                            <span style="color: #a5b4fc; font-size: 12px;">9.2</span>
                          </div>
                        </div>
                      </div>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                          <div style="color: #a5b4fc; font-size: 11px; text-transform: uppercase;">Date</div>
                          <div style="color: white; font-weight: 600;">Dec 15, 2024</div>
                        </div>
                        <div>
                          <div style="color: #a5b4fc; font-size: 11px; text-transform: uppercase;">Time</div>
                          <div style="color: white; font-weight: 600;">7:30 PM</div>
                        </div>
                        <div>
                          <div style="color: #a5b4fc; font-size: 11px; text-transform: uppercase;">Screen</div>
                          <div style="color: white; font-weight: 600;">IMAX 3</div>
                        </div>
                        <div>
                          <div style="color: #a5b4fc; font-size: 11px; text-transform: uppercase;">Seats</div>
                          <div style="color: white; font-weight: 600;">H7, H8</div>
                        </div>
                      </div>
                    </div>
                    <div style="background: #312e81; width: 100px; border-radius: 0 20px 20px 0; border-left: 2px dashed rgba(255,255,255,0.3); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                      <div style="writing-mode: vertical-rl; text-orientation: mixed; color: white; font-size: 12px; letter-spacing: 2px; margin-bottom: 15px;">ADMIT ONE</div>
                      <div style="font-size: 32px;">🎟️</div>
                      <div style="color: rgba(255,255,255,0.6); font-size: 10px; margin-top: 10px; text-align: center;">SCAN QR<br>AT ENTRY</div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-battery-status',
    category: 'Creative & Fun',
    title: 'Developer Battery',
    description: 'Fun energy level display.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 30px; max-width: 350px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <h3 style="margin: 0 0 25px 0; color: #1f2937; display: flex; align-items: center; gap: 10px;">🔋 Developer Energy Level</h3>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="color: #374151; font-weight: 500;">Monday Morning</span>
                          <span style="color: #ef4444; font-weight: 600;">15%</span>
                        </div>
                        <div style="height: 24px; background: #fee2e2; border-radius: 12px; overflow: hidden; position: relative;">
                          <div style="width: 15%; height: 100%; background: linear-gradient(90deg, #ef4444, #dc2626); border-radius: 12px;"></div>
                          <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 12px;">😴</span>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="color: #374151; font-weight: 500;">After Coffee</span>
                          <span style="color: #f59e0b; font-weight: 600;">65%</span>
                        </div>
                        <div style="height: 24px; background: #fef3c7; border-radius: 12px; overflow: hidden; position: relative;">
                          <div style="width: 65%; height: 100%; background: linear-gradient(90deg, #f59e0b, #d97706); border-radius: 12px;"></div>
                          <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 12px;">☕</span>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="color: #374151; font-weight: 500;">In The Zone</span>
                          <span style="color: #22c55e; font-weight: 600;">100%</span>
                        </div>
                        <div style="height: 24px; background: #dcfce7; border-radius: 12px; overflow: hidden; position: relative;">
                          <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); border-radius: 12px;"></div>
                          <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 12px;">🔥</span>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="color: #374151; font-weight: 500;">After Meetings</span>
                          <span style="color: #ef4444; font-weight: 600;">5%</span>
                        </div>
                        <div style="height: 24px; background: #fee2e2; border-radius: 12px; overflow: hidden; position: relative;">
                          <div style="width: 5%; height: 100%; background: linear-gradient(90deg, #ef4444, #dc2626); border-radius: 12px;"></div>
                          <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 12px;">💀</span>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-github-contrib-3d',
    category: 'Creative & Fun',
    title: '3D Contribution Blocks',
    description: 'Isometric contribution view.',
    code: `<div style="${SANS} background: #0d1117; border-radius: 20px; padding: 30px; max-width: 450px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                      <h3 style="color: white; margin: 0;">📊 Contribution Blocks</h3>
                      <span style="color: #3fb950; font-size: 14px; font-weight: 600;">1,247 this year</span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px;">
                      <div style="aspect-ratio: 1; background: #0e4429; border-radius: 4px; box-shadow: 2px 2px 0 #033a16;"></div>
                      <div style="aspect-ratio: 1; background: #006d32; border-radius: 4px; box-shadow: 2px 2px 0 #0e4429;"></div>
                      <div style="aspect-ratio: 1; background: #26a641; border-radius: 4px; box-shadow: 2px 2px 0 #006d32;"></div>
                      <div style="aspect-ratio: 1; background: #39d353; border-radius: 4px; box-shadow: 2px 2px 0 #26a641;"></div>
                      <div style="aspect-ratio: 1; background: #161b22; border-radius: 4px;"></div>
                      <div style="aspect-ratio: 1; background: #0e4429; border-radius: 4px; box-shadow: 2px 2px 0 #033a16;"></div>
                      <div style="aspect-ratio: 1; background: #39d353; border-radius: 4px; box-shadow: 2px 2px 0 #26a641;"></div>
                      <div style="aspect-ratio: 1; background: #006d32; border-radius: 4px; box-shadow: 2px 2px 0 #0e4429;"></div>
                      <div style="aspect-ratio: 1; background: #161b22; border-radius: 4px;"></div>
                      <div style="aspect-ratio: 1; background: #26a641; border-radius: 4px; box-shadow: 2px 2px 0 #006d32;"></div>
                      <div style="aspect-ratio: 1; background: #0e4429; border-radius: 4px; box-shadow: 2px 2px 0 #033a16;"></div>
                      <div style="aspect-ratio: 1; background: #39d353; border-radius: 4px; box-shadow: 2px 2px 0 #26a641;"></div>
                      <div style="aspect-ratio: 1; background: #26a641; border-radius: 4px; box-shadow: 2px 2px 0 #006d32;"></div>
                      <div style="aspect-ratio: 1; background: #161b22; border-radius: 4px;"></div>
                      <div style="aspect-ratio: 1; background: #006d32; border-radius: 4px; box-shadow: 2px 2px 0 #0e4429;"></div>
                      <div style="aspect-ratio: 1; background: #39d353; border-radius: 4px; box-shadow: 2px 2px 0 #26a641;"></div>
                      <div style="aspect-ratio: 1; background: #0e4429; border-radius: 4px; box-shadow: 2px 2px 0 #033a16;"></div>
                      <div style="aspect-ratio: 1; background: #26a641; border-radius: 4px; box-shadow: 2px 2px 0 #006d32;"></div>
                      <div style="aspect-ratio: 1; background: #161b22; border-radius: 4px;"></div>
                      <div style="aspect-ratio: 1; background: #39d353; border-radius: 4px; box-shadow: 2px 2px 0 #26a641;"></div>
                      <div style="aspect-ratio: 1; background: #006d32; border-radius: 4px; box-shadow: 2px 2px 0 #0e4429;"></div>
                      <div style="aspect-ratio: 1; background: #0e4429; border-radius: 4px; box-shadow: 2px 2px 0 #033a16;"></div>
                      <div style="aspect-ratio: 1; background: #26a641; border-radius: 4px; box-shadow: 2px 2px 0 #006d32;"></div>
                      <div style="aspect-ratio: 1; background: #39d353; border-radius: 4px; box-shadow: 2px 2px 0 #26a641;"></div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 20px;">
                      <span style="color: #8b949e; font-size: 11px;">Less</span>
                      <div style="width: 12px; height: 12px; background: #161b22; border-radius: 2px;"></div>
                      <div style="width: 12px; height: 12px; background: #0e4429; border-radius: 2px;"></div>
                      <div style="width: 12px; height: 12px; background: #006d32; border-radius: 2px;"></div>
                      <div style="width: 12px; height: 12px; background: #26a641; border-radius: 2px;"></div>
                      <div style="width: 12px; height: 12px; background: #39d353; border-radius: 2px;"></div>
                      <span style="color: #8b949e; font-size: 11px;">More</span>
                    </div>
                  </div>`
  },
  {
    id: 'fun-error-404',
    category: 'Creative & Fun',
    title: '404 Error Page',
    description: 'Fun error page design.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 24px; padding: 50px; max-width: 450px; text-align: center;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🚀</div>
                    <h1 style="color: white; font-size: 72px; margin: 0; font-weight: 900;">404</h1>
                    <h2 style="color: #a5b4fc; margin: 10px 0 20px 0; font-weight: 400;">Page Lost in Space</h2>
                    <p style="color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.7; margin: 0 0 30px 0;">Houston, we have a problem! The page you're looking for has drifted into a black hole.</p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                      <button style="background: white; color: #312e81; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; cursor: pointer;">🏠 Go Home</button>
                      <button style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 14px 28px; border-radius: 12px; font-weight: 700; cursor: pointer;">🔙 Go Back</button>
                    </div>
                  </div>`
  },
  {
    id: 'fun-notifications-panel',
    category: 'Creative & Fun',
    title: 'Notifications Panel',
    description: 'Social notifications list.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 380px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                      <h3 style="margin: 0; color: #1f2937;">🔔 Notifications</h3>
                      <span style="background: #ef4444; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">5 new</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <div style="display: flex; gap: 12px; padding: 12px; background: #eff6ff; border-radius: 12px; border-left: 4px solid #3b82f6;">
                        <div style="font-size: 24px;">⭐</div>
                        <div style="flex: 1;">
                          <div style="font-weight: 600; color: #1f2937; font-size: 14px;">New star on your repo!</div>
                          <div style="color: #6b7280; font-size: 12px;">awesome-project got a star</div>
                          <div style="color: #9ca3af; font-size: 11px; margin-top: 4px;">2 min ago</div>
                        </div>
                      </div>
                      <div style="display: flex; gap: 12px; padding: 12px; background: #f0fdf4; border-radius: 12px; border-left: 4px solid #22c55e;">
                        <div style="font-size: 24px;">🎉</div>
                        <div style="flex: 1;">
                          <div style="font-weight: 600; color: #1f2937; font-size: 14px;">PR merged successfully!</div>
                          <div style="color: #6b7280; font-size: 12px;">feat: Add new feature #42</div>
                          <div style="color: #9ca3af; font-size: 11px; margin-top: 4px;">15 min ago</div>
                        </div>
                      </div>
                      <div style="display: flex; gap: 12px; padding: 12px; background: #fdf4ff; border-radius: 12px; border-left: 4px solid #a855f7;">
                        <div style="font-size: 24px;">💬</div>
                        <div style="flex: 1;">
                          <div style="font-weight: 600; color: #1f2937; font-size: 14px;">New comment on issue</div>
                          <div style="color: #6b7280; font-size: 12px;">@user replied to your issue</div>
                          <div style="color: #9ca3af; font-size: 11px; margin-top: 4px;">1 hour ago</div>
                        </div>
                      </div>
                      <div style="display: flex; gap: 12px; padding: 12px; background: #fefce8; border-radius: 12px; border-left: 4px solid #eab308;">
                        <div style="font-size: 24px;">👥</div>
                        <div style="flex: 1;">
                          <div style="font-weight: 600; color: #1f2937; font-size: 14px;">New follower!</div>
                          <div style="color: #6b7280; font-size: 12px;">@tech_guru started following you</div>
                          <div style="color: #9ca3af; font-size: 11px; margin-top: 4px;">3 hours ago</div>
                        </div>
                      </div>
                    </div>
                    <button style="width: 100%; background: #f3f4f6; color: #374151; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; margin-top: 15px;">View All Notifications →</button>
                  </div>`
  },
  {
    id: 'fun-workspace-setup',
    category: 'Creative & Fun',
    title: 'Workspace Setup',
    description: 'Developer desk illustration.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; padding: 30px; max-width: 450px;">
                    <h3 style="color: white; margin: 0 0 25px 0; text-align: center;">🖥️ My Workspace Setup</h3>
                    <div style="background: linear-gradient(180deg, #334155 0%, #1e293b 100%); border-radius: 16px; padding: 30px; position: relative;">
                      <!-- Desk -->
                      <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                        <!-- Monitor -->
                        <div style="background: #0f172a; border: 4px solid #475569; border-radius: 8px; width: 120px; height: 80px; display: flex; align-items: center; justify-content: center; position: relative;">
                          <div style="color: #22c55e; font-family: monospace; font-size: 10px;">$ npm run dev</div>
                          <div style="position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); width: 20px; height: 15px; background: #475569; border-radius: 0 0 4px 4px;"></div>
                        </div>
                        <!-- Laptop -->
                        <div style="background: #0f172a; border: 3px solid #475569; border-radius: 6px; width: 80px; height: 55px; display: flex; align-items: center; justify-content: center;">
                          <div style="font-size: 20px;">💻</div>
                        </div>
                      </div>
                      <!-- Accessories -->
                      <div style="display: flex; justify-content: center; gap: 15px;">
                        <div style="text-align: center;">
                          <div style="font-size: 28px;">⌨️</div>
                          <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Keyboard</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 28px;">🖱️</div>
                          <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Mouse</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 28px;">☕</div>
                          <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Coffee</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 28px;">🎧</div>
                          <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Headphones</div>
                        </div>
                        <div style="text-align: center;">
                          <div style="font-size: 28px;">🪴</div>
                          <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Plant</div>
                        </div>
                      </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px;">
                      <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px; text-align: center;">
                        <div style="color: #22c55e; font-weight: 700; font-size: 18px;">16"</div>
                        <div style="color: #64748b; font-size: 10px;">MacBook</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px; text-align: center;">
                        <div style="color: #3b82f6; font-weight: 700; font-size: 18px;">27"</div>
                        <div style="color: #64748b; font-size: 10px;">Monitor</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px; text-align: center;">
                        <div style="color: #a855f7; font-weight: 700; font-size: 18px;">RGB</div>
                        <div style="color: #64748b; font-size: 10px;">Keyboard</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px; text-align: center;">
                        <div style="color: #f59e0b; font-weight: 700; font-size: 18px;">∞</div>
                        <div style="color: #64748b; font-size: 10px;">Coffee</div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-coding-playlist',
    category: 'Creative & Fun',
    title: 'Coding Playlist',
    description: 'Music playlist for coding.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #1db954 0%, #191414 100%); border-radius: 24px; padding: 30px; max-width: 380px;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                      <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 32px;">🎵</div>
                      <div>
                        <h3 style="color: white; margin: 0; font-size: 18px;">Coding Vibes</h3>
                        <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0 0; font-size: 13px;">50 songs • 3h 24min</p>
                      </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                        <span style="color: rgba(255,255,255,0.5); font-size: 12px; width: 20px;">1</span>
                        <div style="width: 40px; height: 40px; background: #ff6b6b; border-radius: 6px; display: flex; align-items: center; justify-content: center;">🎸</div>
                        <div style="flex: 1;">
                          <div style="color: white; font-weight: 600; font-size: 14px;">Lo-Fi Dreams</div>
                          <div style="color: rgba(255,255,255,0.5); font-size: 12px;">ChillHop Music</div>
                        </div>
                        <span style="color: rgba(255,255,255,0.5); font-size: 12px;">3:24</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                        <span style="color: rgba(255,255,255,0.5); font-size: 12px; width: 20px;">2</span>
                        <div style="width: 40px; height: 40px; background: #48dbfb; border-radius: 6px; display: flex; align-items: center; justify-content: center;">🎹</div>
                        <div style="flex: 1;">
                          <div style="color: white; font-weight: 600; font-size: 14px;">Midnight Code</div>
                          <div style="color: rgba(255,255,255,0.5); font-size: 12px;">Synth Wave</div>
                        </div>
                        <span style="color: rgba(255,255,255,0.5); font-size: 12px;">4:12</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                        <span style="color: rgba(255,255,255,0.5); font-size: 12px; width: 20px;">3</span>
                        <div style="width: 40px; height: 40px; background: #a55eea; border-radius: 6px; display: flex; align-items: center; justify-content: center;">🎷</div>
                        <div style="flex: 1;">
                          <div style="color: white; font-weight: 600; font-size: 14px;">Debug Mode</div>
                          <div style="color: rgba(255,255,255,0.5); font-size: 12px;">Jazz Beats</div>
                        </div>
                        <span style="color: rgba(255,255,255,0.5); font-size: 12px;">5:01</span>
                      </div>
                    </div>
                    <button style="width: 100%; background: #1db954; color: white; border: none; padding: 14px; border-radius: 30px; font-weight: 700; margin-top: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                      ▶️ Play All
                    </button>
                  </div>`
  },
  {
    id: 'fun-stack-overflow-stats',
    category: 'Creative & Fun',
    title: 'Stack Overflow Stats',
    description: 'SO reputation display.',
    code: `<div style="${SANS} background: #f48225; border-radius: 20px; padding: 25px; max-width: 380px;">
                    <div style="background: white; border-radius: 16px; padding: 25px;">
                      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="width: 60px; height: 60px; background: #f48225; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                          <svg width="32" height="38" viewBox="0 0 32 38" fill="white">
                            <path d="M26.6 29.7v-9.3h3.1V33H0V20.4h3.1v9.3h23.5z" />
                            <path d="M5.8 26.5h17.4v3.1H5.8v-3.1zm.4-6.1l17 3.6.7-3-17-3.6-.7 3zm2.3-7.3l15.7 7.3 1.3-2.8-15.7-7.4-1.3 2.9zm4.5-6.9l13.3 11.1 2-2.4-13.3-11.1-2 2.4zM21.7 0l-2.5 1.9 10.3 13.9 2.5-1.9L21.7 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 style="margin: 0; color: #242729; font-size: 18px;">Stack Overflow</h3>
                          <p style="margin: 4px 0 0 0; color: #6a737c; font-size: 13px;">@developer_pro</p>
                        </div>
                      </div>
                      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                        <div style="text-align: center; padding: 15px; background: #fff8e6; border-radius: 10px;">
                          <div style="color: #f48225; font-size: 28px; font-weight: 800;">12.4K</div>
                          <div style="color: #6a737c; font-size: 11px;">Reputation</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: #fdf2d0; border-radius: 10px;">
                          <div style="color: #ffcc00; font-size: 28px; font-weight: 800;">🥇 42</div>
                          <div style="color: #6a737c; font-size: 11px;">Gold</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: #e8e8e8; border-radius: 10px;">
                          <div style="color: #9a9a9a; font-size: 28px; font-weight: 800;">🥈 156</div>
                          <div style="color: #6a737c; font-size: 11px;">Silver</div>
                        </div>
                      </div>
                      <div style="display: flex; gap: 10px;">
                        <div style="flex: 1; background: #e1ecf4; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="color: #39739d; font-weight: 700;">324</div>
                          <div style="color: #6a737c; font-size: 11px;">Answers</div>
                        </div>
                        <div style="flex: 1; background: #d4edda; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="color: #155724; font-weight: 700;">89</div>
                          <div style="color: #6a737c; font-size: 11px;">Accepted</div>
                        </div>
                        <div style="flex: 1; background: #f0f0f0; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="color: #242729; font-weight: 700;">56</div>
                          <div style="color: #6a737c; font-size: 11px;">Questions</div>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-keyboard-shortcuts',
    category: 'Creative & Fun',
    title: 'Keyboard Shortcuts',
    description: 'Hotkey reference card.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #1f2937 0%, #111827 100%); border-radius: 20px; padding: 25px; max-width: 400px;">
                    <h3 style="color: white; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">⌨️ Keyboard Shortcuts</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <span style="color: #d1d5db;">Save file</span>
                        <div style="display: flex; gap: 6px;">
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">⌘</kbd>
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">S</kbd>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <span style="color: #d1d5db;">Find in file</span>
                        <div style="display: flex; gap: 6px;">
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">⌘</kbd>
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">F</kbd>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <span style="color: #d1d5db;">Command palette</span>
                        <div style="display: flex; gap: 6px;">
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">⌘</kbd>
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">⇧</kbd>
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">P</kbd>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <span style="color: #d1d5db;">Toggle terminal</span>
                        <div style="display: flex; gap: 6px;">
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">⌃</kbd>
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">\`</kbd>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <span style="color: #d1d5db;">Go to definition</span>
                        <div style="display: flex; gap: 6px;">
                          <kbd style="background: #374151; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; border-bottom: 2px solid #1f2937;">F12</kbd>
                        </div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-debug-console',
    category: 'Creative & Fun',
    title: 'Debug Console',
    description: 'Fun debug output display.',
    code: `<div style="${MONO} background: #1e1e1e; border-radius: 16px; overflow: hidden; max-width: 500px;">
                    <div style="background: #323232; padding: 10px 15px; display: flex; align-items: center; gap: 10px;">
                      <div style="display: flex; gap: 6px;">
                        <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%;"></div>
                        <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%;"></div>
                        <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%;"></div>
                      </div>
                      <span style="color: #8b8b8b; font-size: 12px; margin-left: 10px;">Debug Console</span>
                    </div>
                    <div style="padding: 15px; font-size: 13px; line-height: 1.8;">
                      <div style="color: #6a9955;">// Starting application...</div>
                      <div style="color: #4ec9b0;">[INFO]</div> <span style="color: #dcdcdc;">Server running on port 3000</span>
                      <div style="color: #4ec9b0;">[INFO]</div> <span style="color: #dcdcdc;">Database connected ✓</span>
                      <div style="color: #dcdcaa;">[WARN]</div> <span style="color: #ce9178;">Coffee levels critically low!</span>
                      <div style="color: #f44747;">[ERROR]</div> <span style="color: #ce9178;">Cannot read property 'coffee' of undefined</span>
                      <div style="color: #6a9955;">// Attempting to brew more coffee...</div>
                      <div style="color: #4ec9b0;">[INFO]</div> <span style="color: #dcdcdc;">Coffee replenished ☕</span>
                      <div style="color: #4ec9b0;">[INFO]</div> <span style="color: #dcdcdc;">Developer productivity restored!</span>
                      <div style="color: #569cd6;">[DEBUG]</div> <span style="color: #9cdcfe;">mood: "happy", energy: 100%</span>
                      <div style="margin-top: 10px; color: #dcdcdc;">
                        <span style="color: #c586c0;">&gt;</span> <span style="animation: blink 1s infinite;">_</span>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-year-progress',
    category: 'Creative & Fun',
    title: 'Year Progress Bar',
    description: 'Annual progress tracker.',
    code: `<div style="${SANS} background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 24px; padding: 35px; max-width: 400px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 15px;">📅</div>
                    <h2 style="color: white; margin: 0 0 5px 0;">Year Progress</h2>
                    <p style="color: #64748b; margin: 0 0 30px 0;">2024 is loading...</p>
                    <div style="background: rgba(255,255,255,0.1); border-radius: 15px; height: 30px; overflow: hidden; position: relative; margin-bottom: 15px;">
                      <div style="width: 87%; height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a, #15803d); border-radius: 15px; display: flex; align-items: center; justify-content: flex-end; padding-right: 15px;">
                        <span style="color: white; font-weight: 700; font-size: 14px;">87%</span>
                      </div>
                    </div>
                    <p style="color: #64748b; font-size: 14px; margin: 0 0 25px 0;">Only <span style="color: #22c55e; font-weight: 700;">47 days</span> remaining!</p>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                      <div style="background: rgba(34,197,94,0.2); border-radius: 10px; padding: 12px;">
                        <div style="color: #22c55e; font-size: 18px; font-weight: 700;">318</div>
                        <div style="color: #64748b; font-size: 10px;">Days Done</div>
                      </div>
                      <div style="background: rgba(59,130,246,0.2); border-radius: 10px; padding: 12px;">
                        <div style="color: #3b82f6; font-size: 18px; font-weight: 700;">45</div>
                        <div style="color: #64748b; font-size: 10px;">Weeks</div>
                      </div>
                      <div style="background: rgba(168,85,247,0.2); border-radius: 10px; padding: 12px;">
                        <div style="color: #a855f7; font-size: 18px; font-weight: 700;">10</div>
                        <div style="color: #64748b; font-size: 10px;">Months</div>
                      </div>
                      <div style="background: rgba(251,191,36,0.2); border-radius: 10px; padding: 12px;">
                        <div style="color: #fbbf24; font-size: 18px; font-weight: 700;">Q4</div>
                        <div style="color: #64748b; font-size: 10px;">Quarter</div>
                      </div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-dark-mode-toggle',
    category: 'Creative & Fun',
    title: 'Dark Mode Toggle',
    description: 'Theme switcher UI.',
    code: `<div style="${SANS} background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 24px; padding: 35px; max-width: 350px; text-align: center;">
                    <h3 style="color: #1e293b; margin: 0 0 25px 0;">🌗 Choose Your Side</h3>
                    <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 25px;">
                      <div style="background: white; border: 3px solid #3b82f6; border-radius: 16px; padding: 25px 30px; cursor: pointer; box-shadow: 0 10px 30px rgba(59,130,246,0.2);">
                        <div style="font-size: 40px; margin-bottom: 10px;">☀️</div>
                        <div style="color: #1e293b; font-weight: 700;">Light</div>
                        <div style="color: #64748b; font-size: 12px;">Easy on eyes</div>
                      </div>
                      <div style="background: #1e293b; border: 3px solid #1e293b; border-radius: 16px; padding: 25px 30px; cursor: pointer;">
                        <div style="font-size: 40px; margin-bottom: 10px;">🌙</div>
                        <div style="color: white; font-weight: 700;">Dark</div>
                        <div style="color: #94a3b8; font-size: 12px;">For night owls</div>
                      </div>
                    </div>
                    <div style="background: #e2e8f0; border-radius: 30px; padding: 6px; display: inline-flex;">
                      <div style="background: white; color: #1e293b; padding: 10px 25px; border-radius: 25px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">Light Mode</div>
                      <div style="color: #64748b; padding: 10px 25px; font-weight: 600; font-size: 14px;">Dark Mode</div>
                    </div>
                  </div>`
  },
  {
    id: 'fun-emoji-feedback',
    category: 'Creative & Fun',
    title: 'Emoji Feedback',
    description: 'Quick feedback collector.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 30px; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center;">
                    <h3 style="color: #1f2937; margin: 0 0 8px 0;">How was your experience?</h3>
                    <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 14px;">Your feedback helps us improve!</p>
                    <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px;">
                      <button style="background: #fef2f2; border: 2px solid transparent; border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.2s;">
                        <div style="font-size: 40px;">😢</div>
                        <div style="color: #991b1b; font-size: 12px; margin-top: 8px;">Terrible</div>
                      </button>
                      <button style="background: #fefce8; border: 2px solid transparent; border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.2s;">
                        <div style="font-size: 40px;">😐</div>
                        <div style="color: #854d0e; font-size: 12px; margin-top: 8px;">Okay</div>
                      </button>
                      <button style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 16px; padding: 20px; cursor: pointer; box-shadow: 0 0 0 4px rgba(34,197,94,0.1);">
                        <div style="font-size: 40px;">😊</div>
                        <div style="color: #166534; font-size: 12px; margin-top: 8px;">Good</div>
                      </button>
                      <button style="background: #eff6ff; border: 2px solid transparent; border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.2s;">
                        <div style="font-size: 40px;">🤩</div>
                        <div style="color: #1e40af; font-size: 12px; margin-top: 8px;">Amazing</div>
                      </button>
                    </div>
                    <textarea placeholder="Tell us more (optional)..." style="width: 100%; padding: 15px; border: 2px solid #e5e7eb; border-radius: 12px; resize: none; height: 80px; font-family: inherit; font-size: 14px; box-sizing: border-box;"></textarea>
                    <button style="width: 100%; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer; margin-top: 15px;">Submit Feedback 🚀</button>
                  </div>`
  },
  {
    id: 'fun-loading-skeleton',
    category: 'Creative & Fun',
    title: 'Skeleton Loading',
    description: 'Content placeholder.',
    code: `<div style="${SANS} background: white; border-radius: 20px; padding: 25px; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                      <div style="width: 60px; height: 60px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 50%; animation: shimmer 1.5s infinite;"></div>
                      <div style="flex: 1;">
                        <div style="height: 16px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 8px; margin-bottom: 10px; animation: shimmer 1.5s infinite;"></div>
                        <div style="height: 12px; width: 60%; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 6px; animation: shimmer 1.5s infinite;"></div>
                      </div>
                    </div>
                    <div style="height: 180px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 12px; margin-bottom: 20px; animation: shimmer 1.5s infinite;"></div>
                    <div style="height: 14px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 7px; margin-bottom: 10px; animation: shimmer 1.5s infinite;"></div>
                    <div style="height: 14px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 7px; margin-bottom: 10px; animation: shimmer 1.5s infinite;"></div>
                    <div style="height: 14px; width: 70%; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 7px; animation: shimmer 1.5s infinite;"></div>
                    <style>
                      @keyframes shimmer {
                        0 % { background- position: -200% 0; }
                      100% {background - position: 200% 0; }
    }
                    </style>
                  </div>`
  }
];

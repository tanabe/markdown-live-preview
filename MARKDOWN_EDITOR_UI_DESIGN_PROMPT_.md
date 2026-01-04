# 🎨 Premium Markdown Live Preview Editor - Complete UI Design System Prompt

## 📋 Project Overview

Create a **world-class, professional-grade Markdown Live Preview Editor** with a clean, premium aesthetic, buttery-smooth interactions, and exceptional accessibility. The interface should feel like a premium writing tool that rivals Notion, Typora, and Bear - delivering a distraction-free, fluid writing experience.

---

## 🎯 Design Philosophy & Core Principles

### 1. Premium Minimalism
- **Clean whitespace** - Generous padding and breathing room
- **Subtle shadows** - Soft, layered depth (no harsh drop shadows)
- **Refined typography** - Professional font hierarchy
- **Purposeful color** - Muted palette with strategic accent colors

### 2. Frictionless UX
- **One-click actions** - Every feature accessible in ≤2 clicks
- **Contextual tools** - Show tools when needed, hide when not
- **Smart defaults** - Works beautifully out of the box
- **Progressive disclosure** - Advanced features don't clutter basic use

### 3. Accessibility First (WCAG 2.1 AA)
- **Keyboard navigation** - Full app control via keyboard
- **Screen reader support** - Proper ARIA labels and live regions
- **High contrast modes** - For visual impairments
- **Focus indicators** - Clear, visible focus states

---

## 🖼️ Layout Architecture

### Overall Structure
```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER BAR (48px height)                                               │
│  ┌─────────┬───────────────────────────────────┬──────────────────────┐ │
│  │  Logo   │     Tab Bar / Document Tabs       │   Global Actions     │ │
│  └─────────┴───────────────────────────────────┴──────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│  TOOLBAR (40px height) - Contextual formatting tools                   │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ B I S │ H1 H2 H3 │ 🔗 📷 📊 │ <> ``` │ • 1.  ☐ │ 📄 💾 │ ⚙️        ││
│  └─────────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────┬───┬──────────────────────────────────────┐│
│  │                          │   │                                      ││
│  │     EDITOR PANE          │ ║ │       PREVIEW PANE                   ││
│  │     (Monaco Editor)      │ ║ │       (Rendered HTML)                ││
│  │                          │ ║ │                                      ││
│  │  - Line numbers          │ D │  - Live preview                      ││
│  │  - Syntax highlighting   │ I │  - Smooth scroll sync                ││
│  │  - Auto-complete         │ V │  - Table of Contents sidebar         ││
│  │  - Minimap (optional)    │ I │  - Search highlighting               ││
│  │                          │ D │                                      ││
│  │                          │ E │                                      ││
│  │                          │ R │                                      ││
│  │                          │   │                                      ││
│  └──────────────────────────┴───┴──────────────────────────────────────┘│
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  STATUS BAR (24px height)                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📝 1,234 words │ 5,678 chars │ 15 min read │ ✓ Saved │ Ln 42, Col 8 ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

### View Modes
1. **Split View** (Default) - Editor left, Preview right (50/50 or adjustable)
2. **Editor Only** - Full-width editor, preview hidden
3. **Preview Only** - Full-width rendered preview
4. **Focus Mode** - Distraction-free writing, minimal UI
5. **Typewriter Mode** - Current line stays centered

---

## 🎨 Color System & Theming

### Light Theme (Default)
```css
: root {
  /* Base Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;
  --bg-elevated: #FFFFFF;
  
  /* Text Colors */
  --text-primary: #1E293B;
  --text-secondary:  #64748B;
  --text-tertiary: #94A3B8;
  --text-inverse: #FFFFFF;
  
  /* Accent Colors */
  --accent-primary: #6366F1;      /* Indigo - Primary actions */
  --accent-primary-hover: #4F46E5;
  --accent-secondary: #8B5CF6;    /* Violet - Secondary elements */
  --accent-success: #10B981;      /* Emerald - Success states */
  --accent-warning: #F59E0B;      /* Amber - Warnings */
  --accent-error: #EF4444;        /* Red - Errors */
  
  /* Border & Dividers */
  --border-light: #E2E8F0;
  --border-medium: #CBD5E1;
  --divider:  #E2E8F0;
  
  /* Shadows */
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-elevated: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Dark Theme
```css
[data-theme="dark"] {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-tertiary:  #334155;
  --bg-elevated: #1E293B;
  
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
  
  --accent-primary: #818CF8;
  --accent-primary-hover: #A5B4FC;
  
  --border-light: #334155;
  --border-medium: #475569;
  --divider: #334155;
}
```

### Editor Themes (Monaco)
- **Default Light** - Clean, minimal
- **Dracula** - Popular dark theme
- **Solarized Light/Dark** - Easy on eyes
- **One Dark Pro** - VS Code favorite
- **GitHub Light/Dark** - Familiar to developers
- **Nord** - Cool, muted palette

---

## 🔤 Typography System

### Font Stack
```css
: root {
  /* UI Font */
  --font-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Editor Font (Monospace) */
  --font-editor: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace;
  
  /* Preview Font */
  --font-preview-heading: 'Cal Sans', 'Inter', sans-serif;
  --font-preview-body: 'Source Serif Pro', 'Georgia', serif;
  --font-preview-code: 'JetBrains Mono', monospace;
}
```

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px - Labels, hints */
--text-sm: 0.875rem;   /* 14px - Secondary text, status bar */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Large body */
--text-xl: 1.25rem;    /* 20px - H4 */
--text-2xl: 1.5rem;    /* 24px - H3 */
--text-3xl: 1.875rem;  /* 30px - H2 */
--text-4xl: 2.25rem;   /* 36px - H1 */
```

---

## 🧩 Component Specifications

### 1. Header Bar
```
Height: 48px
Background: var(--bg-elevated)
Border-bottom: 1px solid var(--border-light)
Box-shadow: var(--shadow-sm)

┌────────────────────────────────────────────────────────────────────────┐
│ [🔷 Logo]  │ [+ New] [Tab 1 ×] [Tab 2 ×] [Tab 3 ×]  │  [🔍] [☀️] [⚙️] │
└────────────────────────────────────────────────────────────────────────┘
```

**Logo Section:**
- App icon (24x24px) + "MD Preview" text
- Font:  600 weight, var(--text-base)
- Color: var(--accent-primary)

**Tab Bar:**
- Horizontal scrollable tabs
- Active tab:  Background var(--bg-secondary), bottom border 2px var(--accent-primary)
- Tab:  140px max-width, truncate with ellipsis
- Close button (×): Appears on hover, 16px
- New tab button (+): Always visible

**Global Actions:**
- Icon buttons, 32x32px hit area
- Search preview (magnifying glass)
- Theme toggle (sun/moon)
- Settings (gear)
- Export dropdown

### 2. Toolbar
```
Height: 40px
Background: var(--bg-secondary)
Border-bottom: 1px solid var(--border-light)
Padding: 0 16px
Gap between groups: 16px
Gap within groups: 4px

┌─────────────────────────────────────────────────────────────────────────┐
│ [B][I][S] │ [H1][H2][H3] │ [🔗][📷][📊] │ [<>][```] │ [•][1. ][☐] │ ...  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Button Groups:**
1. **Text Formatting:** Bold, Italic, Strikethrough
2. **Headings:** H1, H2, H3 (dropdown for H4-H6)
3. **Insert:** Link, Image, Table
4. **Code:** Inline code, Code block
5. **Lists:** Bullet, Numbered, Task list
6. **Extras:** Quote, Horizontal rule, Emoji picker
7. **View Controls:** Editor/Split/Preview toggle
8. **Document Actions:** Templates, Snippets, Export

**Button Styles:**
```css
.toolbar-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.15s ease;
}

.toolbar-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.toolbar-btn.active {
  background: var(--accent-primary);
  color: var(--text-inverse);
}
```

**Tooltips:**
- Appear on hover after 500ms delay
- Show keyboard shortcut (e.g., "Bold (Ctrl+B)")
- Position: Below button, centered
- Style: Dark background, white text, 6px radius

### 3. Editor Pane (Monaco)
```
Background: var(--bg-primary)
Font:  var(--font-editor)
Font-size: 14px (adjustable 12-20px)
Line-height: 1.6
Padding: 24px

Features:
- Line numbers (subtle, var(--text-tertiary))
- Active line highlight (subtle background)
- Matching bracket highlight
- Indent guides (dotted, very subtle)
- Minimap (optional, right side)
- Word wrap enabled
- Smooth cursor blinking
```

**Gutter (Left side):**
- Line numbers:  Right-aligned, 48px width
- Fold indicators: Appear on hover
- Linter warnings: Yellow dot
- Linter errors: Red dot

**Syntax Highlighting Colors (Light):**
```css
--syntax-keyword: #D946EF;      /* Magenta */
--syntax-string: #059669;       /* Green */
--syntax-number: #0EA5E9;       /* Blue */
--syntax-comment: #94A3B8;      /* Gray */
--syntax-heading: #6366F1;      /* Indigo */
--syntax-bold: #1E293B;         /* Bold text */
--syntax-italic: #64748B;       /* Italic text */
--syntax-link: #2563EB;         /* Blue links */
--syntax-code: #DC2626;         /* Red for inline code */
```

### 4. Divider (Resizable)
```
Width: 8px (6px visible + 2px hover expansion)
Cursor: col-resize
Background: var(--border-light)

Hover state:
- Width expands to 8px
- Background:  var(--accent-primary) at 50% opacity
- Transition: 0.15s ease
```

**Drag Handle:**
- Three horizontal dots centered vertically
- Color: var(--text-tertiary)
- Visible on hover

### 5. Preview Pane
```
Background: var(--bg-primary)
Font: var(--font-preview-body)
Font-size: 16px
Line-height: 1.75
Padding: 32px 48px
Max-width: 800px (centered content)
```

**Typography Styles:**
```css
/* Headings */
h1 { 
  font:  700 2.25rem var(--font-preview-heading);
  margin: 2rem 0 1rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

h2 {
  font: 600 1.875rem var(--font-preview-heading);
  margin: 1.75rem 0 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-light);
}

/* Body */
p {
  margin: 1rem 0;
  color: var(--text-primary);
}

/* Links */
a {
  color: var(--accent-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Code Blocks */
pre {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font:  14px var(--font-preview-code);
}

/* Inline Code */
code {
  background:  var(--bg-tertiary);
  padding: 2px 6px;
  border-radius: 4px;
  font: 0.875em var(--font-preview-code);
  color: var(--accent-error);
}

/* Blockquotes */
blockquote {
  border-left: 4px solid var(--accent-primary);
  padding-left: 16px;
  margin: 1rem 0;
  color: var(--text-secondary);
  font-style: italic;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th, td {
  border: 1px solid var(--border-light);
  padding: 12px;
  text-align: left;
}

th {
  background:  var(--bg-secondary);
  font-weight: 600;
}

/* Task Lists */
input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent-primary);
}
```

**Scroll Sync Indicator:**
- Subtle line connecting current editor position to preview
- Fades in/out smoothly
- Optional toggle in settings

### 6. Status Bar
```
Height: 24px
Background: var(--bg-secondary)
Border-top: 1px solid var(--border-light)
Font: var(--text-xs)
Color: var(--text-secondary)
Padding: 0 16px

┌─────────────────────────────────────────────────────────────────────────┐
│ 📝 1,234 words  •  5,678 chars  •  15 min read  │  ✓ Saved 2s ago  │ Ln 42 │
└─────────────────────────────────────────────────────────────────────────┘
```

**Sections:**
- Left: Document stats (words, characters, reading time)
- Center: Save status with indicator
- Right:  Cursor position (Line, Column)

**Autosave Indicator:**
- ✓ Green checkmark when saved
- 🔄 Spinning icon when saving
- ⚠️ Yellow warning if save failed

### 7. Toast Notifications
```
Position: Bottom-right, 24px from edges
Width: 320px max
Border-radius: 8px
Box-shadow: var(--shadow-lg)
Animation:  Slide up + fade in (0.2s ease-out)

Types:
- Success:  Left border 4px var(--accent-success)
- Error: Left border 4px var(--accent-error)
- Warning: Left border 4px var(--accent-warning)
- Info: Left border 4px var(--accent-primary)
```

### 8. Modal Dialogs
```
Overlay: Black at 50% opacity, blur(4px)
Modal: 
  - Background: var(--bg-elevated)
  - Border-radius: 12px
  - Box-shadow: var(--shadow-elevated)
  - Max-width: 480px (small), 640px (medium), 800px (large)
  - Animation: Scale up from 0.95 + fade in (0.2s ease-out)

Header:
  - Padding: 20px 24px
  - Border-bottom: 1px solid var(--border-light)
  - Title: var(--text-xl), font-weight 600

Body:
  - Padding: 24px
  - Max-height: 60vh
  - Overflow-y: auto

Footer:
  - Padding: 16px 24px
  - Border-top: 1px solid var(--border-light)
  - Buttons aligned right
```

### 9. Dropdown Menus
```
Background: var(--bg-elevated)
Border: 1px solid var(--border-light)
Border-radius: 8px
Box-shadow: var(--shadow-lg)
Min-width: 160px
Padding:  4px

Menu Item:
  - Padding: 8px 12px
  - Border-radius: 4px
  - Hover: Background var(--bg-tertiary)

Divider:
  - Height: 1px
  - Background: var(--border-light)
  - Margin: 4px 0
```

---

## ✨ Interaction & Animation Guidelines

### Micro-interactions
```css
/* Standard transition */
--transition-fast: 0.1s ease;
--transition-base: 0.15s ease;
--transition-slow: 0.3s ease;

/* Button press */
. btn: active {
  transform:  scale(0.98);
}

/* Focus ring */
: focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Smooth scroll */
scroll-behavior: smooth;
```

### Loading States
- **Skeleton loaders** for content loading
- **Spinner** for actions (24px, accent color)
- **Progress bar** for exports (top of modal)

### Hover Effects
- Buttons: Background color transition
- Cards:  Subtle lift (translateY -2px)
- Links: Underline animation
- Icons: Scale 1.1

---

## 📱 Responsive Design

### Breakpoints
```css
--mobile: 480px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
```

### Mobile Layout (< 768px)
```
┌────────────────────────┐
│ [☰] MD Preview [⋯]    │  <- Hamburger menu, overflow actions
├────────────────────────┤
│ [E] [S] [P]            │  <- View mode toggle (Editor/Split/Preview)
├────────────────────────┤
│                        │
│    SINGLE PANE VIEW    │
│    (Editor OR Preview) │
│                        │
├────────────────────────┤
│ [B][I][🔗][H][📷][⋯]  │  <- Compact toolbar (scrollable)
├────────────────────────┤
│ 1,234 words • Saved ✓  │  <- Minimal status bar
└────────────────────────┘
```

**Mobile Optimizations:**
- Collapsible toolbar
- Swipe between editor/preview
- Floating action button for quick insert
- Bottom sheet modals
- Larger touch targets (44px minimum)

### Tablet Layout (768px - 1024px)
- Vertical split option (editor top, preview bottom)
- Collapsible sidebar for TOC
- Compact toolbar

---

## 🎛️ Feature-Specific UI Components

### 1. Table of Contents (TOC) Sidebar
```
Position: Right side of preview (collapsible)
Width: 240px
Background: var(--bg-secondary)

┌─────────────────────────────┐
│ 📑 Table of Contents    [×] │
├─────────────────────────────┤
│ # Heading 1                 │
│   ## Heading 2              │  <- Indented, clickable
│   ## Heading 2              │
│     ### Heading 3           │
│ # Heading 1                 │
└─────────────────────────────┘

Active heading: Highlighted with accent color
Hover: Background var(--bg-tertiary)
Click:  Smooth scroll to heading in preview
```

### 2. Search in Preview
```
Position: Top of preview pane (appears on Ctrl+F)
Background: var(--bg-elevated)
Box-shadow: var(--shadow-md)

┌──────────────────────────────────────┐
│ 🔍 [Search input________] [×]       │
│     3 of 12 results  [↑] [↓]        │
└──────────────────────────────────────┘

Highlighted matches: Background yellow, current match orange
Navigation: Previous/Next buttons
```

### 3. Writing Goals Panel
```
Position: Modal or slide-over panel

┌──────────────────────────────────────┐
│ 🎯 Writing Goals                     │
├──────────────────────────────────────┤
│ Daily Word Goal                      │
│ [━━━━━━━━━━━░░░░] 750/1000          │
│                                      │
│ Session Time                         │
│ [━━━━━━░░░░░░░░░] 15:32 / 30:00     │
│                                      │
│ [Set New Goal]                       │
└──────────────────────────────────────┘

Progress bar:  Gradient from accent-primary to accent-success
Completed:  Confetti animation 🎉
```

### 4. Templates Panel
```
Layout: Grid of template cards

┌────────────┐ ┌────────────┐ ┌────────────┐
│ 📄         │ │ 📋         │ │ 📊         │
│  Blank     │ │  README    │ │  Report    │
│  Document  │ │  Template  │ │  Template  │
└────────────┘ └────────────┘ └────────────┘

Card: 
- 120px × 100px
- Hover: Scale 1.02, shadow increase
- Click: Apply template to new tab
```

### 5. Snippets Panel
```
Layout: Searchable list

┌──────────────────────────────────────┐
│ 🔍 [Search snippets...]              │
├──────────────────────────────────────┤
│ `code` - Inline code                 │
│ ```    - Code block                  │
│ [link] - Markdown link               │
│ ![img] - Image                       │
│ |table - Table structure             │
│ - [ ]  - Task list                   │
└──────────────────────────────────────┘

Click: Insert at cursor position
Keyboard:  Tab through, Enter to insert
```

### 6. Export Menu
```
Position: Dropdown from Export button

┌─────────────────────────────┐
│ Export As...                │
├─────────────────────────────┤
│ 📄 Markdown (. md)           │
│ 🌐 HTML                     │
│ 📕 PDF                      │
│ 📘 Word (. docx)             │
├─────────────────────────────┤
│ 📋 Copy to Clipboard        │
│ 🖨️ Print...                  │
└─────────────────────────────┘
```

### 7. Settings Panel
```
Layout: Tabbed interface in modal

┌──────────────────────────────────────────────────────────┐
│ ⚙️ Settings                                          [×] │
├─────────────┬────────────────────────────────────────────┤
│ General     │ EDITOR                                     │
│ Editor      │ ┌────────────────────────────────────────┐ │
│ Preview     │ │ Font Size        [14px     ▼]         │ │
│ Themes      │ │ Font Family      [JetBrains Mono ▼]   │ │
│ Keyboard    │ │ Line Height      [1.6      ▼]         │ │
│ Export      │ │ Tab Size         [2 spaces ▼]         │ │
│             │ │                                        │ │
│             │ │ [✓] Word Wrap                          │ │
│             │ │ [✓] Line Numbers                       │ │
│             │ │ [ ] Minimap                            │ │
│             │ │ [✓] Bracket Matching                   │ │
│             │ └────────────────────────────────────────┘ │
├─────────────┴────────────────────────────────────────────┤
│                              [Reset to Defaults] [Save]  │
└──────────────────────────────────────────────────────────┘
```

### 8. Focus Mode
```
Activation: Toolbar button or Ctrl+Shift+F

Changes: 
- Header: Hidden
- Toolbar:  Hidden (show on mouse near top)
- Status bar: Hidden (show on mouse near bottom)
- Sidebar:  Hidden
- Editor:  Centered, max-width 720px
- Preview:  Hidden (or minimal indicator)
- Background:  Slightly dimmed edges (vignette effect)

Exit:  Esc key or click edge to reveal UI
```

### 9. Typewriter Mode
```
Activation: Toolbar button or Ctrl+Shift+T

Effect:
- Current line always centered vertically
- Lines above/below dimmed (50% opacity)
- Smooth scrolling on each keystroke
- Combine with Focus Mode for ultimate distraction-free
```

### 10. Linter Panel
```
Position: Bottom panel (collapsible) or inline indicators

┌──────────────────────────────────────────────────────────┐
│ ⚠️ Linter Results (3 issues)                        [×]  │
├──────────────────────────────────────────────────────────┤
│ ⚠️ Line 15: Heading should have blank line before       │
│ 🔴 Line 23: Link text is empty                          │
│ ⚠️ Line 42: Consider using ATX-style headings          │
└──────────────────────────────────────────────────────────┘

Click issue: Jump to line in editor
```

---

## ⌨️ Keyboard Shortcuts Reference

```
FORMATTING
Ctrl + B          Bold
Ctrl + I          Italic
Ctrl + Shift + S  Strikethrough
Ctrl + `          Inline code
Ctrl + K          Insert link

HEADINGS
Ctrl + 1          Heading 1
Ctrl + 2          Heading 2
Ctrl + 3          Heading 3

LISTS
Ctrl + Shift + 8  Bullet list
Ctrl + Shift + 7  Numbered list
Ctrl + Shift + 9  Task list

VIEW
Ctrl + \          Toggle split view
Ctrl + Shift + E  Editor only
Ctrl + Shift + P  Preview only
Ctrl + Shift + F  Focus mode
Ctrl + Shift + T  Typewriter mode
F11               Fullscreen

FILE
Ctrl + N          New tab
Ctrl + W          Close tab
Ctrl + S          Force save
Ctrl + Shift + S  Export... 
Ctrl + O          Import file

NAVIGATION
Ctrl + Tab        Next tab
Ctrl + Shift + Tab Previous tab
Ctrl + G          Go to line
Ctrl + F          Find in editor
Ctrl + Shift + F  Find in preview
```

---

## 🔧 Implementation Notes

### CSS Architecture
```
styles/
├── base/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # CSS custom properties
│   └── typography.css     # Type system
├── components/
│   ├── header.css
│   ├── toolbar.css
│   ├── editor.css
│   ├── preview. css
│   ├── modal.css
│   ├── toast.css
│   └── ... 
├── themes/
│   ├── light.css
│   └── dark.css
├── utilities/
│   ├── spacing.css
│   ├── display.css
│   └── animations.css
└── main.css               # Import all
```

### Accessibility Checklist
- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all focusable elements
- [ ] ARIA labels on icon-only buttons
- [ ] Live regions for status updates
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Skip links for keyboard navigation
- [ ] Reduced motion option
- [ ] Screen reader testing (NVDA, VoiceOver)

### Performance Goals
- First Contentful Paint:  < 1.5s
- Time to Interactive: < 3s
- Smooth 60fps scrolling
- Lazy load heavy features (Mermaid, KaTeX)
- Virtual scrolling for long documents

---

## 📐 Design Tokens (JSON)

```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg":  "24px",
    "xl": "32px",
    "2xl": "48px"
  },
  "borderRadius": {
    "sm": "4px",
    "md":  "6px",
    "lg": "8px",
    "xl": "12px",
    "full": "9999px"
  },
  "zIndex": {
    "dropdown": 100,
    "sticky": 200,
    "modal": 300,
    "toast": 400,
    "tooltip": 500
  }
}
```

---

## 🎬 Animation Specifications

### Page Load
1. Header slides down (0 → 48px, 0. 3s ease-out)
2. Toolbar fades in (0.2s delay, 0.2s ease)
3. Editor content fades in (0.3s delay, 0.3s ease)
4. Preview fades in (0.4s delay, 0.3s ease)

### Theme Switch
- Cross-fade between themes (0.3s ease)
- No jarring color jumps

### Tab Switch
- Old tab content slides out
- New tab content slides in
- Duration: 0.2s ease-out

### Modal
- Overlay fades in (0.2s)
- Modal scales from 0.95 → 1 + fades in (0.2s)
- Close:  Reverse animation

---

## ✅ Final Design Checklist

- [ ] Clean, uncluttered layout
- [ ] Consistent spacing and alignment
- [ ] Readable typography
- [ ] Accessible color contrast
- [ ] Responsive on all devices
- [ ] Smooth animations (60fps)
- [ ] Intuitive navigation
- [ ] Clear visual hierarchy
- [ ] Professional, premium feel
- [ ] Fast and performant
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Dark mode support
- [ ] Customizable themes
- [ ] Print-friendly preview

---

*This design prompt provides a complete specification for building a world-class Markdown editor interface. Every component, color, spacing, and interaction has been carefully considered to create a premium, accessible, and delightful writing experience.*
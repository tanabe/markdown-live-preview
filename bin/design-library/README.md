# Design Library

A modular component library for design snippets and UI elements.

## 📁 Project Structure

```
design-library/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # CSS aggregator (imports all modules)
│   ├── variables.css      # CSS custom properties & theme
│   ├── base.css           # Reset & base styles
│   ├── sidebar.css        # Sidebar navigation styles
│   ├── header.css         # Header & search styles
│   ├── cards.css          # Component card styles
│   ├── buttons.css        # Button styles
│   └── toast.css          # Toast notification styles
├── js/
│   ├── app.js             # Main application logic
│   ├── utils.js           # Shared utilities & constants
│   └── components/
│       ├── index.js       # Component aggregator
│       ├── developer.js   # Developer tools components
│       ├── ui-elements.js # UI element components
│       ├── documentation.js
│       ├── marketing.js
│       ├── data-viz.js
│       ├── social.js
│       ├── navigation.js
│       ├── github-profile.js
│       ├── skill-visualization.js
│       ├── advanced-animations.js
│       ├── project-showcases.js
│       ├── contact-social.js
│       └── creative-fun.js
└── README.md
```

## 🚀 Getting Started

Simply open `index.html` in a browser. The library uses ES modules, so you need to serve it via HTTP (not `file://`).

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## 🌐 Online Usage & UI/UX Guide

For detailed instructions on how to use these components online and deep insights into modern UI/UX principles, please refer to the [DESIGN_LIBRARY_GUIDE.md](../DESIGN_LIBRARY_GUIDE.md).

### Quick Online Usage:
1. **GitHub README**: Copy the component code and paste it directly into your markdown file.
2. **Personal Website**: Paste the HTML/CSS into your project. Most components use inline styles for portability.
3. **Hosting**: You can host this library on GitHub Pages, Vercel, or Netlify by pointing to this directory.

## ➕ Adding New Components

1. **Choose a category file** in `js/components/` (or create a new one)

2. **Add your component** to the array:

```javascript
export const myComponents = [
  {
    id: 'unique-component-id',      // Unique identifier
    category: 'Category Name',       // Must match the file's category
    title: 'Component Title',        // Display name
    description: 'Short description', // What the component does
    code: `<div>Your HTML code</div>` // The component markup
  }
];
```

3. **If creating a new category**, update `js/components/index.js`:

```javascript
import { myComponents } from './my-category.js';

export const library = [
  ...myComponents,
  // ... other categories
];
```

## 🎨 Adding New Styles

1. Create a new CSS file in `css/` directory
2. Import it in `css/main.css`:

```css
@import url('./my-new-styles.css');
```

## ⚡ Features

- **Dark Mode** - Toggle with the moon icon
- **Search** - Ctrl+K to focus search
- **Favorites** - Save your favorite components
- **Copy** - One-click copy to clipboard
- **Download** - Download components as HTML files
- **Responsive Grid** - Auto-adjusting layout

## 🔧 Customization

### Theme Colors

Edit `css/variables.css` to change the color scheme:

```css
:root {
  --primary: #6366f1;
  --accent: #8b5cf6;
  /* ... */
}
```

### Category Icons

Add icons in `js/utils.js`:

```javascript
export const CATEGORY_ICONS = {
  'My Category': '<svg>...</svg>',
  // ...
};
```

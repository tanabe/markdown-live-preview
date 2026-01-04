/**
 * Code Snippets
 * Pre-defined markdown snippets for quick insertion
 * @module config/snippets
 */

export const SNIPPETS = {
    // Tables
    table: {
        id: 'table',
        title: 'Table',
        icon: '📊',
        category: 'structure',
        content: `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`
    },

    tableComplex: {
        id: 'tableComplex',
        title: 'Table (3 columns)',
        icon: '📊',
        category: 'structure',
        content: `
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
| L3   | C3     | R3    |
`
    },

    // Alerts
    alertNote: {
        id: 'alertNote',
        title: 'Alert: Note',
        icon: 'ℹ️',
        category: 'alerts',
        content: `> [!NOTE]
> This is a note alert.
`
    },

    alertTip: {
        id: 'alertTip',
        title: 'Alert: Tip',
        icon: '💡',
        category: 'alerts',
        content: `> [!TIP]
> This is a tip alert.
`
    },

    alertWarning: {
        id: 'alertWarning',
        title: 'Alert: Warning',
        icon: '⚠️',
        category: 'alerts',
        content: `> [!WARNING]
> This is a warning alert.
`
    },

    alertCaution: {
        id: 'alertCaution',
        title: 'Alert: Caution',
        icon: '🚨',
        category: 'alerts',
        content: `> [!CAUTION]
> This is a caution alert.
`
    },

    alertImportant: {
        id: 'alertImportant',
        title: 'Alert: Important',
        icon: '❗',
        category: 'alerts',
        content: `> [!IMPORTANT]
> This is an important alert.
`
    },

    // Mermaid diagrams
    mermaidGraph: {
        id: 'mermaidGraph',
        title: 'Mermaid: Flowchart',
        icon: '🔄',
        category: 'diagrams',
        content: `\`\`\`mermaid
graph TD
    A[Start] --> B{Condition}
    B -->|Yes| C[OK]
    B -->|No| D[Error]
\`\`\`
`
    },

    mermaidSeq: {
        id: 'mermaidSeq',
        title: 'Mermaid: Sequence',
        icon: '⏱️',
        category: 'diagrams',
        content: `\`\`\`mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: I am good thanks!
\`\`\`
`
    },

    mermaidPie: {
        id: 'mermaidPie',
        title: 'Mermaid: Pie Chart',
        icon: '🥧',
        category: 'diagrams',
        content: `\`\`\`mermaid
pie title Distribution
    "Category A" : 45
    "Category B" : 30
    "Category C" : 25
\`\`\`
`
    },

    mermaidGantt: {
        id: 'mermaidGantt',
        title: 'Mermaid: Gantt',
        icon: '📅',
        category: 'diagrams',
        content: `\`\`\`mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Task 1     :a1, 2026-01-01, 30d
    Task 2     :after a1, 20d
    section Phase 2
    Task 3     :2026-02-01, 25d
\`\`\`
`
    },

    mermaidClass: {
        id: 'mermaidClass',
        title: 'Mermaid: Class Diagram',
        icon: '📐',
        category: 'diagrams',
        content: `\`\`\`mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Duck: +String beakColor
    Duck: +swim()
    Fish: +int sizeInFeet
    Fish: +canEat()
\`\`\`
`
    },

    // Math
    math: {
        id: 'math',
        title: 'Math Block',
        icon: '∑',
        category: 'math',
        content: `$$
\\int_0^\\infty x^2 dx
$$
`
    },

    mathInline: {
        id: 'mathInline',
        title: 'Math Inline',
        icon: '𝑥',
        category: 'math',
        content: `$E = mc^2$`
    },

    mathFraction: {
        id: 'mathFraction',
        title: 'Math Fraction',
        icon: '½',
        category: 'math',
        content: `$$
\\frac{a}{b} = \\frac{c}{d}
$$
`
    },

    mathMatrix: {
        id: 'mathMatrix',
        title: 'Math Matrix',
        icon: '⬜',
        category: 'math',
        content: `$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
$$
`
    },

    // Lists
    checklist: {
        id: 'checklist',
        title: 'Checklist',
        icon: '☑️',
        category: 'lists',
        content: `- [ ] Task 1
- [x] Task 2 (completed)
- [ ] Task 3
`
    },

    definitionList: {
        id: 'definitionList',
        title: 'Definition List',
        icon: '📖',
        category: 'lists',
        content: `Term 1
: Definition for term 1

Term 2
: Definition for term 2
`
    },

    // Code
    codeBlock: {
        id: 'codeBlock',
        title: 'Code Block',
        icon: '💻',
        category: 'code',
        content: `\`\`\`javascript
function example() {
    console.log('Hello, World!');
}
\`\`\`
`
    },

    codeWithDiff: {
        id: 'codeWithDiff',
        title: 'Code Diff',
        icon: '📝',
        category: 'code',
        content: `\`\`\`diff
- old line
+ new line
  unchanged line
\`\`\`
`
    },

    // Other
    footnote: {
        id: 'footnote',
        title: 'Footnote',
        icon: '📌',
        category: 'other',
        content: `Here is some text with a footnote[^1].

[^1]: This is the footnote content.
`
    },

    collapsible: {
        id: 'collapsible',
        title: 'Collapsible Section',
        icon: '🔽',
        category: 'other',
        content: `<details>
<summary>Click to expand</summary>

Hidden content here.

</details>
`
    },

    badge: {
        id: 'badge',
        title: 'Badge',
        icon: '🏷️',
        category: 'other',
        content: `![Badge](https://img.shields.io/badge/status-active-success)`
    },

    horizontalRule: {
        id: 'horizontalRule',
        title: 'Horizontal Rule',
        icon: '➖',
        category: 'other',
        content: `
---
`
    },

    tocPlaceholder: {
        id: 'tocPlaceholder',
        title: 'TOC Placeholder',
        icon: '📑',
        category: 'other',
        content: `## Table of Contents

<!-- TOC will be auto-generated -->
`
    }
};

/**
 * Snippet categories
 */
export const SNIPPET_CATEGORIES = {
    structure: { name: 'Structure', icon: '📊' },
    alerts: { name: 'Alerts', icon: '⚠️' },
    diagrams: { name: 'Diagrams', icon: '📈' },
    math: { name: 'Math', icon: '∑' },
    lists: { name: 'Lists', icon: '📝' },
    code: { name: 'Code', icon: '💻' },
    other: { name: 'Other', icon: '📎' }
};

/**
 * Get snippets by category
 * @param {string} category - Category name
 * @returns {Object[]} Snippets in category
 */
export const getSnippetsByCategory = (category) => {
    return Object.values(SNIPPETS).filter(s => s.category === category);
};

/**
 * Get snippet by ID
 * @param {string} id - Snippet ID
 * @returns {Object|null} Snippet or null
 */
export const getSnippetById = (id) => {
    return SNIPPETS[id] || null;
};

export default SNIPPETS;

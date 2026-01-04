/**
 * Document Templates
 * Pre-defined markdown templates for common document types
 * @module config/templates
 */

export const TEMPLATES = {
    readme: {
        id: 'readme',
        title: 'Project README',
        icon: '📘',
        description: 'Standard README with installation, usage, and license sections.',
        category: 'development',
        content: `# Project Title

> A brief description of your project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
\`\`\`bash
npm install my-project
\`\`\`

## Usage
\`\`\`javascript
const myProject = require('my-project');
myProject.start();
\`\`\`

## License
MIT
`
    },

    cv: {
        id: 'cv',
        title: 'CV / Resume',
        icon: '📄',
        description: 'Professional resume layout with experience and skills.',
        category: 'professional',
        content: `# Your Name
*Software Engineer*
email@example.com | [LinkedIn](https://linkedin.com) | [GitHub](https://github.com)

## Summary
Experienced developer with a passion for building scalable web applications.

## Experience
**Senior Developer** | *Company Name*
*2020 - Present*
- Led a team of 5 developers
- Improved performance by 30%

## Skills
- JavaScript, React, Node.js
- Python, Django
- SQL, MongoDB

## Education
**BS Computer Science** | *University Name*
*2016 - 2020*
`
    },

    blog: {
        id: 'blog',
        title: 'Blog Post',
        icon: '✍️',
        description: 'Article structure with headers, lists, and code blocks.',
        category: 'writing',
        content: `# Blog Post Title
*By Author Name | January 1, 2026*

![Cover Image](https://via.placeholder.com/800x400)

## Introduction
Hook the reader with an interesting opening.

## Main Point
Explain your concept here.

### Key Takeaway
1. Point one
2. Point two
3. Point three

> "Quote to emphasize a point."

## Conclusion
Wrap up your thoughts.
`
    },

    meeting: {
        id: 'meeting',
        title: 'Meeting Notes',
        icon: '📅',
        description: 'Structure for agendas, attendees, and action items.',
        category: 'professional',
        content: `# Meeting: [Topic]
**Date:** January 1, 2026
**Attendees:** Person A, Person B, Person C

## Agenda
1. Review last week's progress
2. Discuss new features
3. Plan next sprint

## Notes
- Key discussion point
- Decision made

## Action Items
- [ ] Person A: Task 1
- [ ] Person B: Task 2
`
    },

    api: {
        id: 'api',
        title: 'API Documentation',
        icon: '🔌',
        description: 'REST API documentation with endpoints and examples.',
        category: 'development',
        content: `# API Documentation

## Base URL
\`\`\`
https://api.example.com/v1
\`\`\`

## Authentication
All requests require an API key in the header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /users
Returns a list of all users.

**Response:**
\`\`\`json
{
  "users": [
    { "id": 1, "name": "John Doe" }
  ]
}
\`\`\`

### POST /users
Creates a new user.

**Request Body:**
\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

## Error Codes
| Code | Description |
|------|-------------|
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Server Error |
`
    },

    changelog: {
        id: 'changelog',
        title: 'Changelog',
        icon: '📝',
        description: 'Version history and release notes.',
        category: 'development',
        content: `# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New feature description

### Changed
- Updated feature description

### Fixed
- Bug fix description

## [1.0.0] - 2026-01-01

### Added
- Initial release
- Core features implemented
- Documentation added

## [0.9.0] - 2025-12-01

### Added
- Beta release
- Basic functionality
`
    },

    tutorial: {
        id: 'tutorial',
        title: 'Tutorial',
        icon: '📚',
        description: 'Step-by-step tutorial with code examples.',
        category: 'writing',
        content: `# How to Build X

## Introduction
Brief overview of what we'll build.

## Prerequisites
- Requirement 1
- Requirement 2

## Step 1: Setup
First, let's set up our environment:

\`\`\`bash
npm init -y
npm install dependencies
\`\`\`

## Step 2: Implementation
Now let's write the code:

\`\`\`javascript
// Your code here
function main() {
  console.log('Hello!');
}
\`\`\`

## Step 3: Testing
Run the tests:

\`\`\`bash
npm test
\`\`\`

## Conclusion
You've successfully built X!

## Next Steps
- Explore advanced features
- Read the documentation
`
    },

    blank: {
        id: 'blank',
        title: 'Blank Document',
        icon: '📋',
        description: 'Start with a clean slate.',
        category: 'basic',
        content: `# Untitled Document

Start writing here...
`
    }
};

/**
 * Template categories for grouping
 */
export const TEMPLATE_CATEGORIES = {
    basic: { name: 'Basic', icon: '📋' },
    development: { name: 'Development', icon: '💻' },
    professional: { name: 'Professional', icon: '💼' },
    writing: { name: 'Writing', icon: '✍️' }
};

/**
 * Get templates by category
 * @param {string} category - Category name
 * @returns {Object[]} Templates in category
 */
export const getTemplatesByCategory = (category) => {
    return Object.values(TEMPLATES).filter(t => t.category === category);
};

/**
 * Get template by ID
 * @param {string} id - Template ID
 * @returns {Object|null} Template or null
 */
export const getTemplateById = (id) => {
    return TEMPLATES[id] || null;
};

export default TEMPLATES;

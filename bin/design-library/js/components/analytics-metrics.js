/**
 * Analytics & Metrics Components
 */
import { SANS, MONO } from '../utils.js';

export const analyticsMetricsComponents = [
  {
    id: 'metrics-downloads',
    category: 'Analytics & Metrics',
    title: 'NPM Downloads Badge',
    description: 'Show package download stats.',
    code: `<div align="center">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/npm/dt/package-name?style=for-the-badge&logo=npm&logoColor=white&label=Downloads&color=CB3837" alt="downloads" />
</div>`
  },
  {
    id: 'metrics-license',
    category: 'Analytics & Metrics',
    title: 'License Badge',
    description: 'Display project license.',
    code: `<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge" alt="license" />
</div>`
  },
  {
    id: 'metrics-build',
    category: 'Analytics & Metrics',
    title: 'Build Status Badges',
    description: 'CI/CD pipeline status.',
    code: `<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="build" />
  <img src="https://img.shields.io/badge/tests-100%25-success?style=flat-square" alt="tests" />
  <img src="https://img.shields.io/badge/coverage-95%25-green?style=flat-square" alt="coverage" />
  <img src="https://img.shields.io/badge/code%20quality-A+-blue?style=flat-square" alt="quality" />
</div>`
  },
  {
    id: 'metrics-version',
    category: 'Analytics & Metrics',
    title: 'Version Badges',
    description: 'Package version and compatibility.',
    code: `<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/version-2.1.0-blue?style=for-the-badge" alt="version" />
  <img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen?style=for-the-badge&logo=node.js" alt="node" />
  <img src="https://img.shields.io/badge/npm-%3E%3D6.0.0-red?style=for-the-badge&logo=npm" alt="npm" />
</div>`
  }
];

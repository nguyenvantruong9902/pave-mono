# 🧩 PAVE Monorepo

This is a **Turborepo** monorepo using **Yarn v4.9.2** and **Node.js 22+**, containing multiple frontend applications and shared packages. It’s designed for scalable and maintainable development using React, Svelte, and Web Components.

---

## 📁 Directory Structure

├── apps
│ ├── react-app # React application
│ └── svelte-app # Svelte application
│
├── packages
│ ├── tools # Shared configurations and utilities
│ └── web-components # Framework-agnostic Web Components
│
├── .gitignore
├── turbo.json # Turborepo pipeline config
├── yarn.lock
└── README.md

---

## 📦 Workspaces Overview

| Path                      | Type    | Description                 |
| ------------------------- | ------- | --------------------------- |
| `apps/react-app`          | App     | React frontend application  |
| `apps/svelte-app`         | App     | Svelte frontend application |
| `packages/web-components` | Package | Reusable web components     |
| `packages/tools`          | Package | Shared tooling & configs    |

---

## 🛠️ Tech Stack

- **Turborepo** – High-performance monorepo tool
- **Yarn 4.9.2 (Berry)** – Fast, modern dependency management
- **Node.js v22+**
- **React** – `apps/react-app`
- **Svelte** – `apps/svelte-app`
- **Web Components** – `packages/web-components` (e.g., Lit/Stencil)
- **Shared Tools** – Linters, configs in `packages/tools`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [Yarn 4.9.2+](https://yarnpkg.com/)

### Installation

```bash
yarn install
```

### Development

Run all apps

```bash
yarn dev
```

Run specific apps

```bash
yarn dev:react-app
yarn dev:svelte-app
```

### Build

Build all apps

```bash
yarn build
```

Build web components

```bash
yarn build:web-components
```

### Clean

```bash
yarn clean
```

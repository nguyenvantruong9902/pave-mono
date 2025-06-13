# 🛠 tools

> Centralized development tooling for all applications and packages in the monorepo. Includes shared configurations for ESLint, Prettier, and TypeScript.

This package allows consistent code quality, formatting, and TypeScript behavior across the entire monorepo by sharing config files.

---

## 📁 Location

`packages/tools`

---

## 🔨 Development

No build step required - configs are plain files

---

## 📦 What's Included?

| Tool       | File/Dir             | Description                       |
| ---------- | -------------------- | --------------------------------- |
| ESLint     | `eslint-config/`     | Shared base ESLint config         |
| TypeScript | `typescript-config/` | Base TSConfig for all TS projects |

---

## 🚀 Usage in Other Packages

### 1. Add as a dependency

```bash
yarn workspace [your-app-or-package] add @pave/tools
```

### 2. Import shared configs

```js
// eslint.config.js
import baseConfig from "@pave/tools/eslint-config/base";

// tsconfig.json
"extends": "@pave/tools/typescript-config/react.json"
```

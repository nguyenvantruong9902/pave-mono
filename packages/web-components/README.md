# 🌐 web-components

> A library of reusable, framework-agnostic Web Components shared across all applications in the monorepo.

This package is designed to provide custom elements (Web Components) that can be used in any frontend framework including React, Svelte, Vue, or plain HTML.

---

## 📁 Location

`packages/web-components`

---

## 🔨 Development

Build the package

```bash
cd packages/web-components
yarn build
```

---

## 🚀 Usage

### 1. Add to another workspace

To use these components in an app within the monorepo:

```bash
yarn workspace [your-app] add @pave/web-components
```

### 2. Import

```tsx
import { Input } from "@pave/web-components";
```

### 3. Use

React

```tsx
<Input {...props} />
```

Svelte

You can use the `sveltify` function from the `svelte-preprocess-react` package to convert React components to Svelte components.

```tsx
const react = sveltify({ Input });
<react.Input {...props} />;
```

---

## 📘 Storybook

This project uses [Storybook](https://storybook.js.org/) for building and testing UI components in isolation.

### 🔧 Running Storybook Locally

To start Storybook locally:

```bash
yarn storybook
```

Storybook will start at: http://localhost:6006

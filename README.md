<div align="center">
  <h1 style="border-bottom: none;">📦 GisUI</h1>
  <p><strong>The Premium Svelte 5 UI Kit powered by Tailwind CSS 4</strong></p>
  <p>
    <a href="https://svelte.dev/"><img src="https://img.shields.io/badge/Svelte-5.0-ff3e00?logo=svelte" alt="Svelte 5"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css" alt="Tailwind 4"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License MIT"></a>
  </p>
</div>

---

**GisUI** is a modern, high-performance UI library built from the ground up with **Svelte 5 Runes** and **Tailwind CSS 4**. It features a "Premium-Dark" aesthetic inspired by contemporary design trends: bold typography, generous rounded corners, glassmorphism, and smooth interactive feedback.

## ✨ Key Features

- 🚀 **Svelte 5 Ready**: Fully utilizes Runes (`$state`, `$derived`, `$effect`) for peak performance.
- 🎨 **Tailwind 4 Powered**: Leverages the latest CSS-native features and zero-config setup.
- 🌓 **Dark Mode Built-in**: Sophisticated dark/light mode management with persistent state.
- 💎 **Premium Aesthetic**: Ready-to-use components with professional styling and animations.
- 📚 **Full Documentation**: Integrated multi-page docs with live previews and snippets.
- 📦 **NPM Ready**: Pre-configured metadata and build scripts for distribution.

## 🚀 Getting Started

### 1. Requirements
- Svelte 5+
- Tailwind CSS 4+
- Vite

### 2. Configure Tailwind 4
Add the GisUI theme variables and dark mode strategy to your `app.css`:

```css
@import "tailwindcss";

/* GisUI Dark Mode Strategy */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-ui-primary: var(--color-indigo-600);
  --color-ui-primary-hover: var(--color-indigo-700);
  --color-ui-danger: var(--color-rose-500);
  --radius-ui: 1.5rem;
  --radius-ui-lg: 3rem;
  --shadow-ui-xl: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
  --shadow-ui-2xl: 0 32px 80px -20px rgba(0, 0, 0, 0.2);
}
```

### 3. Installation
For maximum flexibility, copy the `src/lib` folder into your project's `src/lib/gisui`:

```bash
# Example if using git
git clone https://github.com/guyssar-db/gisui-svelte.git
cp -r gisui-svelte/src/lib your-project/src/lib/gisui
```

## 🛠️ Usage Example

```svelte
<script>
  import { Button, Card, toasts, ThemeToggle } from '$lib/gisui';
</script>

<Card glass={true}>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-black uppercase tracking-tighter">Welcome</h2>
    <ThemeToggle />
  </div>

  <p class="text-slate-500 mb-6">Experience the premium feel of GisUI.</p>

  <Button onclick={() => toasts.success('Library integrated!')} variant="primary">
    Get Started
  </Button>
</Card>
```

## 📦 Components Library

| Category | Components |
| --- | --- |
| **Interactions** | Button, Toggle, Checkbox, Dropdown, ThemeToggle |
| **Layout** | Card, Modal, Navbar, Tabs, DotBackground |
| **Identity** | Avatar, Badge, Alert |
| **Feedback** | Toast, Loading, ProgressBar, Skeleton |

## 📖 Documentation
A full interactive documentation site is included in the project. Run the dev server to access it:

```bash
npm install
npm run dev
```
Then visit `/docs` to see live previews and copyable code snippets for all 18+ components.

---

<div align="center">
  <p>Built with ❤️ using Svelte 5 and Tailwind 4</p>
</div>

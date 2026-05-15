# GisUI - Premium Svelte 5 UI Library

A premium UI library built with **Svelte 5 (Runes)** and **Tailwind CSS 4**.

## 🚀 How to use in your project

### 1. Requirements
- Svelte 5+
- Tailwind CSS 4+
- Vite

### 2. Setup Tailwind CSS 4
Ensure your consumer project has Tailwind CSS 4 installed. In your global CSS file (e.g., `src/app.css`), add the following to support GisUI's design system:

```css
@import "tailwindcss";

/* GisUI Custom Variant for Dark Mode */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-brand-primary: var(--color-indigo-600);
  --color-brand-secondary: var(--color-slate-800);
  
  --radius-ui: 1.5rem;
  --radius-ui-lg: 3rem;

  --shadow-ui-xl: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
  --shadow-ui-2xl: 0 32px 80px -20px rgba(0, 0, 0, 0.2);
}
```

### 3. Usage

#### Option A: Copying the Source (Quickest)
Simply copy the `src/lib` folder from this project into your own project's `src/lib/gisui` (or any folder).

#### Option B: Local Link (For Development)
1. In this project: `npm link`
2. In your project: `npm link gisui`

### 4. Import and Use Components

```svelte
<script>
  import { Button, Input, Card, ThemeToggle } from '$lib/gisui';
  
  let name = $state('');
</script>

<Card>
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-black uppercase">My Project</h2>
    <ThemeToggle />
  </div>
  
  <Input label="Name" bind:value={name} placeholder="Enter your name" />
  
  <Button onclick={() => alert(`Hello ${name}`)} class="mt-4">
    Submit
  </Button>
</Card>
```

### 5. Managing Dark Mode
GisUI includes a built-in theme store. To use it in your application's root:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  import { theme } from '$lib/gisui';
  let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
  {@render children()}
</div>
```

## 📦 Components Included
- **Interactions**: Button, Toggle, Checkbox, Dropdown, ThemeToggle
- **Feedback**: Loading, ProgressBar, Alert, Badge, Skeleton
- **Layout**: Card, Modal, DotBackground, Tabs, Avatar

---
Built with Passion by Gemini CLI

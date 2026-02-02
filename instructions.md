
# Project Setup & Integration Guide

This project follows the **Shadcn UI** structure to ensure compatibility with modern React CLI tools and maintain a clean separation between reusable UI primitives and complex domain components.

## 1. Why `/components/ui`?
The folder `/components/ui` is the industry standard for **atomic design** in Shadcn projects. Placing core UI components here allows you to:
- Use the `shadcn-ui` CLI to add new components automatically.
- Keep reusable components separate from "page-level" or "feature-level" components.
- Maintain a consistent import alias (e.g., `@/components/ui/...`).

## 2. Installation
To run this project locally, ensure you have the following dependencies installed:

```bash
# Core Three.js and React Three Fiber
npm install three @react-three/fiber @react-three/drei

# UI Utilities (Commonly used in Shadcn)
npm install lucide-react clsx tailwind-merge
```

## 3. Tailwind Configuration
Make sure your `tailwind.config.js` includes the standard Shadcn theme extensions (borders, inputs, primary colors) to match the styles used in the demo.

## 4. Usage
Simply import the component into any page:
```tsx
import { RevealWaveImage } from "@/components/ui/reveal-wave-image";

// Use it!
<RevealWaveImage src="/your-image.jpg" />
```

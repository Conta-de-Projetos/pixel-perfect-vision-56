# AI Rules for MangaVerse Application

This document outlines the core technologies used in the MangaVerse application and provides guidelines for using specific libraries to ensure consistency, maintainability, and adherence to best practices.

## Tech Stack Overview

The MangaVerse application is built using a modern web development stack, focusing on performance, developer experience, and a robust user interface.

*   **React**: A declarative, component-based JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer productivity.
*   **Vite**: A fast and opinionated build tool that provides an instant development server and highly optimized builds.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in your markup.
*   **shadcn/ui**: A collection of reusable components built with Radix UI and styled with Tailwind CSS, providing accessible and customizable UI elements.
*   **React Router DOM**: A standard library for client-side routing in React applications.
*   **TanStack Query (React Query)**: A powerful library for managing, caching, and synchronizing server state in React applications.
*   **Lucide React**: A library providing a set of beautiful, pixel-perfect icons for React projects.
*   **Sonner**: A modern toast library for displaying notifications.
*   **date-fns**: A comprehensive utility library for working with dates in JavaScript.

## Library Usage Guidelines

To maintain a consistent and efficient codebase, please adhere to the following rules when developing new features or modifying existing ones:

*   **UI Components**:
    *   **Always** prioritize using components from `shadcn/ui` (imported from `@/components/ui/`).
    *   If a required component is not available in `shadcn/ui` or needs significant custom logic/styling, create a **new component** in `src/components/`.
    *   **Never** modify `shadcn/ui` component files directly. If a `shadcn/ui` component needs a slight visual tweak, wrap it in a new component and apply styling there.
*   **Styling**:
    *   **Exclusively** use **Tailwind CSS** for all styling. Avoid inline styles or custom CSS files unless absolutely necessary for global styles in `src/index.css`.
    *   Leverage existing custom Tailwind classes and animations defined in `tailwind.config.ts` and `src/index.css` (e.g., `gradient-text-blood`, `brutal-card`, `animate-fade-up`).
    *   Use the `cn` utility function from `src/lib/utils.ts` for conditionally applying and merging Tailwind classes.
*   **Routing**:
    *   Use `react-router-dom` for all client-side navigation.
    *   Define and manage all main application routes within `src/App.tsx`.
*   **Icons**:
    *   Use icons from the `lucide-react` library for all visual iconography.
*   **Toasts/Notifications**:
    *   For general-purpose, transient notifications (e.g., "Item added to cart", "Settings saved"), use `sonner`. Import `toast` from `sonner` and ensure the `<Sonner />` component is rendered in `src/App.tsx`.
    *   The `useToast` hook and `<Toaster />` from `@/components/ui/toast` (Radix UI) are available for more complex or persistent notifications if `sonner` does not meet specific requirements, but `sonner` is preferred for simple messages.
*   **Data Fetching & State Management**:
    *   For managing server state (data fetched from an API, caching, re-fetching), use `@tanstack/react-query`.
    *   For local component state, use React's built-in `useState` and `useReducer` hooks.
*   **Date Manipulation**:
    *   If you need to parse, format, or manipulate dates, use functions from the `date-fns` library.
*   **Animations**:
    *   Prefer using Tailwind CSS animations (defined in `tailwind.config.ts` and `src/index.css`) and `tailwindcss-animate` for simple transitions and effects.
    *   `framer-motion` is available for more complex, declarative animations, but use it judiciously to avoid over-engineering.
# AGENTS.md - Agent Coding Guidelines

This file provides guidelines for agents working in this repository.

## Project Overview

- **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Purpose**: Personal portfolio/developer website
- **Framework**: Next.js App Router (Turbopack)

## Build, Lint, and Test Commands

```bash
npm install     # Install dependencies
npm run dev     # Start dev server (Turbopack)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint (Next.js + TypeScript rules)
```

### Notes
- No test framework configured yet (can add Vitest/Jest if needed)
- No separate typecheck script - Next.js build includes type checking

## Code Style Guidelines

### General Principles
- Write clean, readable, maintainable code
- Keep functions small and focused (single responsibility)
- Use meaningful variable/function names

### Imports
- Use absolute imports (`@/`) over relative when possible
- Order: external libraries → internal modules → relative imports

```typescript
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
```

### TypeScript
- Always define return types for functions
- Use explicit types over `any`
- Prefer `interface` over `type` for object shapes

### Naming Conventions
- **Files**: kebab-case for utilities, PascalCase for components
- **Variables/functions**: camelCase
- **Classes/interfaces**: PascalCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Booleans**: Use `is`, `has`, `can`, `should` prefixes

### React/Components
- Use functional components with hooks
- Extract custom hooks for reusable logic
- Use `useMemo`/`useCallback` for expensive computations
- Add 'use client' directive only when needed (hooks, event handlers)

### Error Handling
- Handle async errors with try/catch
- Log errors appropriately (no secrets)

## Directory Structure

```
/src
  /app              # Next.js App Router pages
  /components       # Reusable UI components
  /hooks            # Custom React hooks
  /lib              # Utilities and helpers
/tests              # Test files (if added)
```

## Security

- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Validate and sanitize all user inputs

## Tailwind CSS 4 Guidelines

- Use utility classes for styling
- Follow mobile-first responsive design
- Use semantic HTML elements

## Next.js App Router Guidelines

- Use Server Components by default
- Define shared layouts in `layout.tsx` files
- Use async/await in Server Components for data fetching

## Git Conventions

### Deployment Rules
- **NEVER publish to production without user approval**
- **NEVER run `vercel --prod` without explicit user request**
- Always test changes locally first with `npm run dev`
- Run `npm run lint` and `npm run build` locally before deployment

### Commit Messages
- Use semantic commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Keep commits atomic and focused

## Workflow

### Before Making Changes
1. Ask user what they want to implement
2. Explain approach if needed
3. Get user confirmation before proceeding

### After Making Changes
1. Run `npm run lint` and `npm run build` to verify code
2. Show the user what was done
3. **Wait for user to request deployment** - do NOT deploy automatically
4. Only run `vercel --prod` when explicitly asked

## Common Patterns

### Client Component
```typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Theme Toggle
```typescript
const { theme, setTheme } = useTheme();
```

### Intersection Observer (Animations)
```typescript
const { ref, inView } = useInView({ triggerOnce: true });
```

## Additional Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)

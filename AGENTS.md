# AGENTS.md - Agent Coding Guidelines

This file provides guidelines for agents working in this repository.

## Project Overview

- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS
- **Purpose**: Personal portfolio/developer website
- **Framework**: Next.js App Router

## Build, Lint, and Test Commands

### Standard Commands
```bash
npm install           # Install dependencies
npm run dev           # Start dev server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run typecheck     # Run TypeScript type check
npm run format        # Run Prettier formatting
npm test              # Run all tests
```

### Running a Single Test
```bash
npm test -- filename.test.ts           # Run specific test file
npm test -- --testNamePattern="name"   # Run matching pattern
npm test -- filename.test.ts --verbose # Debug test
```

## Code Style Guidelines

### General Principles
- Write clean, readable, maintainable code
- Keep functions small and focused (single responsibility)
- Use meaningful variable/function names
- Avoid unnecessary comments - code should be self-documenting

### Imports
- Use absolute imports over relative when possible
- Order: external libraries → internal modules → relative imports
- Use named exports over default exports

```typescript
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
```

### Formatting
- Use Prettier (2-space indent, single quotes, trailing commas)
- Max line length: 100 characters

### TypeScript
- Always define return types for functions
- Use explicit types over `any`
- Prefer `interface` over `type` for object shapes
- Use generics when applicable

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User | null> { return null; }
```

### Naming
- **Files**: kebab-case (`user-profile.tsx`), PascalCase for components
- **Variables/functions**: camelCase
- **Classes/interfaces**: PascalCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Booleans**: Use `is`, `has`, `can`, `should` prefixes

### React/Components
- Use functional components with hooks
- Colocate related files (component + tests)
- Extract custom hooks for reusable logic
- Memoize expensive computations with `useMemo`/`useCallback`
- Prefer composition over context

### Error Handling
- Use custom error classes for domain errors
- Handle async errors with try/catch
- Log errors appropriately (no secrets)
- Provide user-friendly error messages

```typescript
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof ValidationError) {
    showUserMessage(error.message);
  } else {
    logger.error('Unexpected error', error);
    showGenericError();
  }
}
```

### State Management
- Use local `useState` for component state
- Use React Query/TanStack Query for server state
- Avoid prop drilling - use context or composition

### Testing
- Test behavior, not implementation
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies
- Test happy path + error cases + edge cases

## Directory Structure
```
/src
  /components     # Reusable UI components
  /hooks          # Custom React hooks
  /lib            # Utilities and helpers
  /app            # Next.js App Router pages
  /types          # TypeScript definitions
  /styles         # Global styles
/tests            # Test files
```

## Security
- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Validate and sanitize all user inputs

## Git Conventions
- Use semantic commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Keep commits atomic and focused
- Write meaningful PR descriptions

## Common Patterns

### API Calls
```typescript
// Use fetch or axios with interceptors
// Handle loading, error, and success states
// Return typed responses
```

### Form Handling
```typescript
// Use react-hook-form for complex forms
// Validate with Zod schema
// Show inline validation errors
```

### Data Fetching
```typescript
// Use React Query for server state
// Implement proper cache invalidation
// Handle loading and error states
```

## Additional Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
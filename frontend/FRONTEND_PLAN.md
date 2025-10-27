# Todo App Implementation Plan
React 19 + Vite + Shadcn + Tailwind v4

## Project Overview
Simple todo application with CRUD operations, filtering, and persistent storage.

## Technical Stack Analysis
- ✅ React 19.1.0 with modern hooks
- ✅ Vite 7.0.4 for fast development
- ✅ Shadcn UI components pre-configured
- ✅ Tailwind CSS v4 with @tailwindcss/vite
- ✅ React Hook Form + Zod validation
- ✅ Axios + React Query for API calls
- ✅ React Router DOM for navigation

## Core Features
1. Add new todos
2. Mark todos as complete/incomplete
3. Edit existing todos
4. Delete todos
5. Filter todos (all, active, completed)
6. Clear completed todos
7. Persist data via API/localStorage

## Page-by-Page Implementation Plan

### 1. Main Todo Page (`/`)
**File**: `src/pages/TodoPage.tsx`

**Components Required:**
- `TodoHeader` - App title and stats
- `TodoForm` - Input form for new todos
- `TodoList` - List of all todos
- `TodoItem` - Individual todo component
- `TodoFilters` - Filter buttons (All, Active, Completed)
- `TodoFooter` - Clear completed, item count

**Types Required:**
- `src/types/todo.ts`:
  ```typescript
  interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  type TodoFilter = 'all' | 'active' | 'completed';
  ```

**Hooks Required:**
- `src/hooks/useTodos.ts` - Todo CRUD operations with React Query
- `src/hooks/useTodoFilters.ts` - Filter state management

**Utils Required:**
- `src/utils/todoUtils.ts` - Helper functions for filtering, sorting

**API Endpoints:**
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `DELETE /api/todos/completed` - Clear completed

### 2. Layout Components

**App Layout:**
- `src/components/layout/AppLayout.tsx` - Main app wrapper
- `src/components/layout/AppHeader.tsx` - App header with theme toggle

### 3. Shared Components

**Form Components:**
- Use existing shadcn components: `Input`, `Button`, `Checkbox`
- `src/components/todo/TodoFormField.tsx` - Custom form field wrapper

**UI Components:**
- `src/components/ui/ConfirmDialog.tsx` - Delete confirmation
- `src/components/ui/EditDialog.tsx` - Edit todo modal
- Utilize existing: `Card`, `Badge`, `Dialog`, `Button`, `Input`, `Checkbox`

### 4. Services & API

**API Service:**
- `src/services/todoApi.ts` - API client using axios
- Extend existing `src/lib/api.ts` if needed

**Storage Service:**
- `src/services/localStorage.ts` - Local storage fallback

### 5. State Management

**React Query Setup:**
- `src/lib/queryClient.ts` - Query client configuration
- Queries for todos with caching, optimistic updates

**Form Management:**
- React Hook Form with Zod validation schemas
- `src/schemas/todoSchemas.ts` - Validation schemas

### 6. Styling & Theme

**Custom Styles:**
- `src/styles/todo.css` - Todo-specific styles if needed
- Leverage existing Tailwind classes and shadcn components

**Theme Integration:**
- Use existing theme system with next-themes
- Todo-specific color variants

## Implementation Phases

### Phase 1: Basic CRUD
1. Setup types and API structure
2. Create TodoItem and TodoList components
3. Implement add/delete functionality
4. Basic styling with shadcn components

### Phase 2: Enhanced Features
1. Edit functionality with dialog modal
2. Complete/incomplete toggle
3. Filter implementation
4. Form validation with Zod

### Phase 3: Polish & UX
1. Animations and transitions
2. Keyboard shortcuts
3. Empty states and loading states
4. Responsive design
5. Accessibility improvements

### Phase 4: Data Persistence
1. API integration with React Query
2. Optimistic updates
3. Error handling and retry logic
4. Local storage fallback

## File Structure
```
src/
├── components/
│   ├── todo/
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoFilters.tsx
│   │   └── TodoFooter.tsx
│   └── layout/
│       └── AppLayout.tsx
├── hooks/
│   ├── useTodos.ts
│   └── useTodoFilters.ts
├── pages/
│   └── TodoPage.tsx
├── services/
│   ├── todoApi.ts
│   └── localStorage.ts
├── types/
│   └── todo.ts
├── utils/
│   └── todoUtils.ts
└── schemas/
    └── todoSchemas.ts
```

## Development Commands
- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm eslint` - Lint code
- `pnpm prettier` - Format code
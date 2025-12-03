# Next.js 16 + React 19.2 Cookie Script Test Suite

A test application to investigate and demonstrate how third-party cookie consent scripts (like Osano) can interfere with React hydration and client-side navigation in Next.js 16 / React 19.2.

## The Problem

Certain cookie consent management scripts can break React's hydration process, which causes:

- `<Link>` components (client-side navigation) to stop working
- Client Components to fail to render or become unresponsive
- The app appearing to load but navigation doing nothing when clicked (RSC fetch succeeds, but hydration fails)

## Test Structure

This app has two layouts to compare behavior:

| Layout            | Path                | Script                          |
| ----------------- | ------------------- | ------------------------------- |
| **With Osano**    | `/with-script/*`    | Loads the cookie consent script |
| **Without Osano** | `/without-script/*` | No external scripts             |

### Navigation Types

Each layout includes two navigation sections:

- **⚡ Client Navigation** (`<Link>`) - Uses Next.js client-side navigation. Requires React hydration to function.
- **🔗 Full Page Navigation** (`<a>`) - Plain HTML links. Always works, regardless of JavaScript state.

### Test Pages

| Page           | Type   | Purpose                                                 |
| -------------- | ------ | ------------------------------------------------------- |
| Home           | Client | Detects if script loaded via `window.__SCRIPT_LAYOUT__` |
| use() Hook     | Client | React 19 `use()` hook for promises                      |
| useActionState | Client | Form state with Server Actions                          |
| useOptimistic  | Client | Optimistic UI updates                                   |
| Server Actions | Client | Server function calls with `useFormStatus`              |
| Suspense       | Server | Streaming with Suspense boundaries                      |
| Streaming SSR  | Server | Progressive page rendering                              |
| useFormStatus  | Client | Form submission pending state                           |
| Transitions    | Client | `useTransition` and `useDeferredValue`                  |

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Cookie Script URL

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_COOKIE_SCRIPT=https://cmp.osano.com/your-script-id/osano.js
```

Or set the environment variable in your deployment platform (Vercel, etc.):

| Variable                    | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_COOKIE_SCRIPT` | Full URL to the Osano (or other) cookie consent script |

**Note:** If this variable is not set, the "With Osano" layout will still work but won't load any external cookie script.

### 3. Run Development Server

```bash
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000) with Turbopack.

## Testing Procedure

### Test 1: Verify the Issue

1. Navigate to `/with-script/` (With Osano layout)
2. Click any link in the **"⚡ Client Navigation"** section
3. **Expected (broken):** Navigation hangs or does nothing
4. Click the same link in the **"🔗 Full Page Navigation"** section
5. **Expected (working):** Page loads via full refresh

### Test 2: Compare Without Script

1. Navigate to `/without-script/` (Without Osano layout)
2. Click links in both navigation sections
3. **Expected:** Both should work correctly

### Test 3: Verify Script Detection

On the Home page, the "Script Detection" card shows:

- ✅ **"Script Layout Active"** - if `window.__SCRIPT_LAYOUT__` is set
- ⚡ **"No Script Layout"** - if running without the script

## Architecture Notes

### Server vs Client Components

The Navigation component is a **Server Component** to minimize hydration surface:

```
RootLayout (Server)
└── WithScriptLayout (Server)
    ├── <Script /> - Loads Osano
    ├── Navigation (Server) - No hydration needed
    │   ├── <Link> - Client nav (requires hydration to intercept clicks)
    │   └── <a> - Full page nav (always works)
    └── Page Content (varies)
```

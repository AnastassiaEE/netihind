# AGENTS.md - AI Agent Guidelines for netihind

## Project Overview

**netihind** is a Next.js 15 multilingual web application for comparing internet packages in Estonia. It uses App Router, TypeScript, Tailwind CSS, Supabase for database operations, and WordPress as a headless CMS for blog content.

---

## Architecture

### Core Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + custom CSS
- **Database**: Supabase (PostgreSQL) with RPC functions
- **CMS**: WordPress (headless, GraphQL API)
- **Internationalization**: next-intl with localized pathnames
- **UI Library**: Material-UI (MUI) for specific components
- **Email**: Resend + React Email templates

### Key Dependencies

- `next-intl` - i18n routing and translations
- `@supabase/supabase-js` - database client
- `swiper` - carousels/sliders
- `swr` - data fetching and caching
- `react-scroll-parallax` - parallax effects
- `next-mdx-remote` - MDX content rendering

---

## Project Structure

### Directory Organization

**IMPORTANT**: Most directories are at **root level**, NOT inside `app/`. Only routes and API endpoints are in `app/`.

#### App Router (`app/`)

- **`[locale]/`** - Localized routing (et, ru) with route groups:
  - `(home)/` - Homepage routes
  - `(packages)/` - Package listing and details
  - `(rest)/` - About, blog, contacts, policy pages
  - `[...not-found]/` - Catch-all 404
- **`api/`** - API routes (e.g., `send/` for emails)
- **`globals.css`** - Global styles

#### Core Directories (Root Level)

- **`components/`** - React components organized by purpose
  - `ui/` - Atomic reusable UI components (buttons, forms, header, footer, etc.)
  - `sections/` - Large page sections (home, blog, address widgets)
  - `dataWrappers/` - Server components for data fetching
  - `seo/` - SEO components (JsonLd, metadata)
  - `tracking/` - Analytics (GoogleTagManager)

- **`lib/`** - External service integrations
  - `supabase/` - Database client, RPC functions, translations
  - `wordpress/` - GraphQL client, pages/posts queries

- **`hooks/`** - Custom React hooks (useForm, useAccordion, etc.)
- **`utils/`** - Pure utility functions (\*Formatter.ts, \*Helper.ts, \*Validator.ts)
- **`types/`** - TypeScript type definitions (\*.types.ts organized by domain)
- **`contexts/`** - React Context providers (Consent, Sidebar, Translations, Nonce)
- **`data/`** - Static data files (contacts, social links, provider logos)
- **`layouts/`** - Layout wrapper components (MdxLayout, SectionLayout)

#### Configuration & Assets

- **`i18n/`** - Internationalization config (routing, request)
- **`messages/`** - Translation files (et.json, ru.json)
- **`styles/`** - Custom CSS (addressForm.css)
- **`public/`** - Static assets (images, robots.txt, sitemap.xml)
- **`supabase/`** - Database migrations and seed data
- **`emails/`** - React Email templates
- **`db-backup/`** - Database schema backups

### Organization Rules

1. **Components** live in `components/` at root level, NOT in `app/`
2. **New files** follow existing patterns:
   - Utils: `*Formatter.ts`, `*Helper.ts`, `*Validator.ts`
   - Types: `*.types.ts` in `types/`
   - Hooks: `use*.ts` in `hooks/`
   - Components: PascalCase in appropriate `components/` subdirectory
3. **Imports** always use `@/` path aliases (never relative paths)
4. **Utilities** use named exports only (no default exports)

---

## Routing & Internationalization

### Locale Handling

- **Supported locales**: `et` (Estonian, default), `ru` (Russian)
- **Locale prefix**: `as-needed` - default locale (`et`) has no prefix in URL
- **Pathnames**: Localized paths defined in `i18n/routing.ts`

### Route Groups

- `(home)` - Homepage with layout (Header + Footer)
- `(packages)` - Package listing and details pages
- `(rest)` - About, blog, contacts, policy pages
- Each route group can have its own `layout.tsx`

### Middleware

- Removes trailing slashes from search parameters
- Handles i18n routing (locale detection, redirects)
- Prepares ISR/SSG pages for specific paths

**Rule**: Always use `setRequestLocale(locale)` in page and layout components for static rendering compatibility.

---

## Component Architecture

### Server vs Client Components

- **Default**: All components are Server Components (no directive)
- **Client Components**: Must have `'use client'` directive at the top

**Client component use cases**:

- Interactive UI (forms, modals, accordions, sliders)
- Hooks usage (useState, useEffect, useContext, custom hooks)
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (localStorage, window)
- Context providers and consumers
- Third-party client libraries (Swiper, MUI interactive components)

**Examples of client components**:

- All form components
- All interactive UI (modals, accordions, tabs, sliders)
- All context providers (`ConsentContext`, `SidebarMenuContext`, etc.)
- Navigation components (header, sidebar menu, language switcher)
- Tracking components (GoogleTagManager)

**Examples of server components**:

- Page components (unless they need interactivity)
- Section components (unless they need state/hooks)
- SEO components (JsonLd, metadata generators)
- Data wrapper components (fetch and pass to children)

### Component Organization

- **Naming**: PascalCase for component files (e.g., `ContactForm.tsx`)
- **Location**: Group by feature/type in `components/ui/` or `components/sections/`
- **Props**: Define inline or in `types/` for reusable types
- **Exports**:
  - **Components**: Use `export default` for React components
  - **Utilities**: Always use named exports (`export const`/`export function`)
  - **UI Library components** (shadcn/ui): Use named exports when exporting multiple items (e.g., `export { Button, buttonVariants }`)

### Component Patterns

1. **Data Wrappers**: Server components that fetch data and pass to client components
2. **Section Components**: Large page sections (e.g., `TopSection`, `StepsSection`)
3. **UI Components**: Reusable, atomic UI elements (buttons, inputs, cards)
4. **Layout Components**: Wrapping layouts for pages or content types

---

## Data Flow

### Supabase Integration

- **Client**: Initialized in `lib/supabase/client.ts`
- **Data Fetching**: Via RPC (Remote Procedure Call) functions
- **Main Functions** (in `lib/supabase/packages.ts`):
  - `getProviders(oid)` - Get ISPs for an address
  - `getTechnologies(oid)` - Get connection technologies for an address
  - `getPackages(oid, sort, providers, technologies)` - Get filtered packages
- **Translations** (in `lib/supabase/translations.ts`):
  - `getStringTranslations()` - Get dynamic translations from DB

**Rule**: Always use RPC functions for complex queries. Raw SQL queries should be avoided in frontend code.

### WordPress Integration

- **API**: GraphQL endpoint configured in env
- **Client**: `fetchAPI()` function in `lib/wordpress/client.ts`
- **Queries**: Organized by content type:
  - `lib/wordpress/pages.ts` - Static pages (about, policy)
  - `lib/wordpress/posts.ts` - Blog posts

**Rule**: All WordPress queries should be made from Server Components or API routes.

### State Management

- **Global State**: React Context (see `app/contexts/`)
  - `ConsentContext` - Cookie consent state
  - `SidebarMenuContext` - Mobile menu state
  - `TranslationsContext` - Dynamic translations
  - `NonceProvider` - CSP nonce for inline scripts
- **Server State**: SWR for client-side data fetching (when needed)
- **Form State**: Custom `useForm` hook

**Rule**: Prefer Server Component data fetching over client-side fetching when possible.

---

## Styling

### Tailwind CSS

- **Version**: 4 (using PostCSS)
- **Config**: `tailwind.config.ts` (currently empty, relies on defaults)
- **Utilities**: `tailwind-merge` for conditional class merging
- **Variants**: `tailwind-variants` for component variants

### CSS Conventions

- **Primary**: Use Tailwind utility classes
- **Custom CSS**: Only when necessary (e.g., `addressForm.css` for complex layouts)
- **Global Styles**: `app/globals.css`
- **Class Naming**: Use descriptive names, avoid abbreviations

### Component Styling Patterns

```tsx
// Preferred: Tailwind classes
<div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">

// With conditional classes (use classnames or cn utility)
<button className={classnames('btn', { 'btn-active': isActive })}>

// With tailwind-variants for complex variants
import { tv } from 'tailwind-variants';
const button = tv({ base: 'btn', variants: { color: { primary: 'btn-primary' }}});
```

---

## TypeScript Conventions

### Type Definitions

- **Location**: `app/types/*.types.ts` (organized by feature)
- **Naming**:
  - Types: PascalCase (e.g., `Package`, `FormFields`)
  - Enums: PascalCase
  - Type unions: PascalCase with descriptive suffix (e.g., `PackageAction`)

### Type Organization

- **Domain Types**: `packages.types.ts`, `blog.types.ts`, etc.
- **UI Types**: `ui.types.ts` (navigation, dialog, icon types)
- **Utility Types**: Inline or in relevant files

### Import Aliases

Use path aliases defined in `tsconfig.json`:

```typescript
// Components (default exports)
import ContactForm from '@/components/ui/form/ContactForm';
import BlogSlider from '@/components/ui/blog/BlogSlider';

// UI Library components (named exports)
import { Button, buttonVariants } from '@/components/ui/form/buttons/Button';

// Utilities (named exports)
import { formatMoney } from '@/utils/numberFormatter';
import { formatSlug } from '@/utils/slugFormatter';

// Types
import { Package } from '@/types/packages.types';

// Services
import { supabase } from '@/lib/supabase/client';
import { getPackages } from '@/lib/supabase/packages';
import { fetchAPI } from '@/lib/wordpress/client';
```

**Rule**: Always use path aliases (`@/`) instead of relative imports (`../../`).

---

## Code Style

### File Organization

1. Imports (React, third-party, internal)
2. Type definitions (if small and local)
3. Constants/config
4. Main component/function
5. Helper functions (if small and local)
6. Export (default for components, named for utilities)

### Function Style

- **Prefer**: Arrow functions for components and utilities
- **Async**: Use `async/await` over promises
- **Naming**: Descriptive, camelCase for functions

### JSDoc Comments

- **Required for**: Utility functions, complex logic, exported functions
- **Style**: Concise description + param/return types
- **Example**:

```typescript
/**
 * Fetches internet packages for a given address with filters.
 *
 * @param oid - The unique identifier of the address
 * @param sort - Sorting option (e.g., 'price_asc')
 * @returns An array of internet package objects
 */
export const getPackages = async (oid: string, sort: string) => {
  // ...
};
```

### Error Handling

- Throw errors with i18n keys: `throw new Error('errors.somethingWentWrong')`
- Handle errors in UI with translated messages
- Use try-catch in async functions where appropriate

### Utility Functions Organization

**Location**: `utils/` directory

**Naming Convention**: Use descriptive suffixes to indicate purpose:

- `*Formatter.ts` - Format data for display (dates, numbers, slugs, URLs)
- `*Helper.ts` - Domain-specific utilities (addresses, packages, routes, schemas)
- `*Validator.ts` - Validate data (fields, forms)

**Export Style**:

- **Always use named exports** - never use default exports
- Export functions with descriptive names (e.g., `formatDate`, `formatSlug`, `validateField`)

**Available Utilities**:

- `addressHelper.ts` - Parse and extract address data
- `dateFormatter.ts` - Format dates (`formatDate`)
- `fieldValidator.ts` - Validate form fields (`validateField`)
- `filtersHelper.ts` - Filter logic and utilities
- `numberFormatter.ts` - Format numbers and money
- `packagesHelper.ts` - Package data manipulation
- `routesHelper.ts` - Route utilities and type guards
- `schemaHelper.ts` - Generate metadata and schema.org data
- `slugFormatter.ts` - Format slugs (`formatSlug`)
- `textFormatter.ts` - Text parsing and manipulation
- `translationHelper.ts` - Translation utilities
- `urlHelper.ts` - URL generation and manipulation

**Rule**: Check existing utilities before creating new ones. Always use named imports.

---

## Forms & Validation

### Form Hook Pattern

Use the custom `useForm` hook from `hooks/useForm.ts`:

```typescript
const { values, errors, handleChange, handleSubmit, isSending } = useForm(
  fields,
  'contact', // form type
  { additionalData }, // optional
);
```

### Validation

- Validator: `validateField()` in `utils/fieldValidator.ts`
- Rules: Required, email, phone, length checks
- Timing: On blur and on submit

### Form Structure

```typescript
// Field configuration
const fields = {
  name: { initialValue: '', required: true },
  email: { initialValue: '', required: true },
  // ...
};

// Component
('use client');
export default function MyForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    fields,
    'myForm',
  );
  // ...
}
```

---

## SEO & Metadata

### Metadata Generation

- Use `generateMetadata()` async function in page components
- Helper: `getMetadata()` in `utils/schemaHelper.ts`
- Always provide localized titles, descriptions, URLs

### Structured Data (Schema.org)

- Component: `JsonLd` in `components/seo/JsonLd.tsx`
- Helper: `getSchema()` in `utils/schemaHelper.ts`
- Include breadcrumbs, organization, website schema

### Sitemap & Robots

- Static files: `public/sitemap.xml`, `public/robots.txt`
- Localized versions: `public/et/`, `public/ru/`

---

## Environment Variables

### Required Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# WordPress
NEXT_PUBLIC_WORDPRESS_API_ENDPOINT=
WORDPRESS_AUTH_REFRESH_TOKEN=

# Email
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Other
NEXT_PUBLIC_MAA_AMET_ADDRESS_API_ENDPOINT=
```

**Rule**: Prefix with `NEXT_PUBLIC_` for client-accessible variables. Keep sensitive keys server-only.

---

## Important Rules for AI Agents

### 🚫 DON'Ts

1. **Never** use relative imports - always use `@/` aliases
2. **Never** add `'use client'` to Server Components unless necessary
3. **Never** fetch data in Client Components if it can be done server-side
4. **Never** hardcode text - use i18n keys from `messages/*.json`
5. **Never** modify database schema without creating a migration
6. **Never** expose sensitive env variables to client
7. **Never** use `any` type - prefer `unknown` or proper types
8. **Never** create duplicate utility functions - check `utils/` first
9. **Never** ignore TypeScript errors - fix them properly
10. **Never** use `console.log` in production code - use proper error handling
11. **Never** use default exports in utility files - always use named exports

### ✅ DOs

1. **Always** use `setRequestLocale(locale)` in pages and layouts
2. **Always** add JSDoc comments to utility functions
3. **Always** use path aliases for imports
4. **Always** validate forms with the `useForm` hook
5. **Always** handle errors with translated messages
6. **Always** use Tailwind classes over custom CSS
7. **Always** check for existing types in `types/` before creating new ones
8. **Always** use Supabase RPC functions for data operations
9. **Always** test both locales (et, ru) when modifying routes
10. **Always** follow existing naming conventions and file structure

### 🔧 Common Tasks

#### Adding a New Page

1. Create page.tsx in `app/[locale]/(group)/[route]/`
2. Add `generateMetadata()` function
3. Add path to `i18n/routing.ts` pathnames
4. Use `setRequestLocale(locale)`
5. Add translations to `messages/*.json`
6. Test both locale URLs

#### Creating a New Component

1. Determine if it needs to be client or server component
2. Place in appropriate `components/` subdirectory
3. Use TypeScript with proper types
4. Add JSDoc if complex
5. Use Tailwind for styling
6. Export component as default (unless it's a UI library component with multiple exports)

#### Adding a Supabase Query

1. Create RPC function in Supabase (SQL)
2. Add wrapper in `lib/supabase/packages.ts` (or create new file in `lib/supabase/`)
3. Add TypeScript types in `types/`
4. Use in Server Component or API route
5. Handle errors appropriately

#### Creating a Form

1. Create client component with `'use client'`
2. Define field config (initialValue, required)
3. Use `useForm(fields, type)` hook
4. Add validation rules if needed
5. Create API route handler in `app/api/`
6. Add translations for labels and errors

---

## Testing & Development

### Scripts

- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Development Workflow

1. Start dev server: `npm run dev`
2. Access at `http://localhost:3000`
3. Default locale (et) loads without prefix
4. Russian locale at `http://localhost:3000/ru`

### Debugging

- Use Next.js dev mode error overlay
- Check browser console for client errors
- Check terminal for server errors
- Use React DevTools for component inspection

---

## Common Patterns

### Fetching Data in Server Component

```tsx
export default async function MyPage() {
  const data = await getPackages(oid, sort, [], []);
  return <PackageList packages={data} />;
}
```

### Passing Data to Client Component

```tsx
// Server Component
export default async function Wrapper() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// Client Component
('use client');
export default function ClientComponent({ data }) {
  const [state, setState] = useState(data);
  // ...
}
```

### Using Translations

```tsx
// Server Component
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('HomePage');

// Client Component
import { useTranslations } from 'next-intl';
const t = useTranslations('HomePage');

// Usage
<h1>{t('title')}</h1>;
```

### Link with Localized Routes

```tsx
import { Link } from '@/i18n/routing';

<Link href="/about">{t('aboutUs')}</Link>;
// Automatically uses correct localized path
```

---

## Migration & Schema Changes

### Database Migrations

- Location: `supabase/migrations/`
- Naming: `YYYYMMDDHHMMSS_description.sql`
- Apply via Supabase CLI or Dashboard

### Schema Backup

- Location: `db-backup/`
- Files: `schema.sql`, `data.sql`, `roles.sql`
- Update after major schema changes

---

## Performance Considerations

1. **Server Components**: Use for data fetching when possible
2. **Static Generation**: Pages in `ssgBasePaths` (middleware) are pre-rendered
3. **Image Optimization**: Use Next.js `<Image>` component with proper sizing
4. **Code Splitting**: Automatic with Next.js App Router
5. **Caching**: SWR for client-side data, Supabase for server-side

---

## Security

1. **CSP**: Nonce-based for inline scripts (NonceProvider)
2. **Cookie Consent**: ConsentContext tracks user preferences
3. **Env Variables**: Sensitive keys server-only
4. **Form Validation**: Both client and server-side
5. **SQL Injection**: Prevented via Supabase RPC (parameterized)

---

## Contact & Resources

- **Repository**: AnastassiaEE/netihind
- **Branch**: dev (default: main)
- **Next.js Docs**: https://nextjs.org/docs
- **next-intl Docs**: https://next-intl-docs.vercel.app
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## Changelog

This AGENTS.md file should be updated when:

- Major architecture changes occur
- New patterns or conventions are established
- Technology stack is upgraded
- New integrations are added
- Routing structure changes significantly

**Version**: 1.0 (April 2026)
**Last Updated**: 2026-04-28

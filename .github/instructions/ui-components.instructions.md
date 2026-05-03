---
description: Guidelines for building and styling UI components, including className handling and component patterns
---

# UI Components Instructions

## Class Name Management

**CRITICAL RULE**: When combining or conditionally applying CSS classes to HTML elements, **ALWAYS use the `classNames` library**. Never use template literals, array joins, or manual string concatenation.

### Required Import

```typescript
import classNames from 'classnames';
```

### Usage Patterns

#### Static Classes Only

```tsx
<div className="flex items-center gap-4">
```

#### Combining Static and Dynamic Classes

```tsx
<div className={classNames('base-class', dynamicClass, className)}>
```

#### Conditional Classes

```tsx
<button className={classNames('btn', { 'btn-active': isActive, 'btn-disabled': isDisabled })}>
```

#### Complex Scenarios

```tsx
<div className={classNames(
  'base-class',
  'another-class',
  {
    'conditional-class': condition,
    'state-class': isOpen,
  },
  additionalClassName
)}>
```

### ❌ DON'Ts

```tsx
// NEVER use template literals
<div className={`base-class ${isActive ? 'active' : ''}`}>

// NEVER use array join
<div className={['base-class', isActive && 'active'].filter(Boolean).join(' ')}>

// NEVER use manual concatenation
<div className={'base-class ' + (isActive ? 'active' : '')}>

// NEVER use other utilities like clsx or cn for className merging
<div className={cn('base-class', className)}>  // WRONG - always use classNames
```

### ✅ DOs

```tsx
// ALWAYS use classNames - for ALL components including shadcn/ui
<div className={classNames('base-class', { active: isActive })}>

// Even for shadcn components - use classNames, NOT cn()
import classNames from 'classnames';
<Button className={classNames('custom-styles', className)} />
```

## Notes

- The `classNames` library is already installed in the project
- Use `classNames` for ALL components without exceptions, including shadcn/ui components

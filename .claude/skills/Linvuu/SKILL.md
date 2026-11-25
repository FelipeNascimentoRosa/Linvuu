---
name: linvuu-conventions
description: "Convenções de desenvolvimento do repositório Linvuu (TypeScript, Vite, commits). Consulte ao começar tarefa de código."
---

# Linvuu Conventions

> Generated from [FelipeNascimentoRosa/Linvuu](https://github.com/FelipeNascimentoRosa/Linvuu) on 2026-11-16

## Overview

This skill teaches Claude the development patterns and conventions used in Linvuu.

## Tech Stack

- **Primary Language**: TypeScript
- **Framework**: Vite
- **Architecture**: type-based module organization
- **Test Location**: mixed

## When to Use This Skill

Activate this skill when:
- Making changes to this repository
- Adding new features following established patterns
- Writing tests that match project conventions
- Creating commits with proper message format

## Commit Conventions

Follow these commit message conventions based on 200 analyzed commits.

### Commit Style: Mixed Style

### Prefixes Used

- `feat`
- `docs`
- `fix`
- `seo`
- `chore`
- `home`

### Message Guidelines

- Average message length: ~78 characters
- Keep first line concise and descriptive
- Use imperative mood ("Add feature" not "Added feature")


*Commit message example*

```text
docs: orientar colaboração com Gemini (#614)
```

*Commit message example*

```text
style: preencher cartões com arte e documentar paleta (#612)
```

*Commit message example*

```text
feat: ilustrar cartões de alfabetos com rabiscos (#610)
```

*Commit message example*

```text
fix: corrigir pronúncia russa de кот
```

*Commit message example*

```text
seo: registrar atualização dos materiais gratuitos
```

*Commit message example*

```text
Merge pull request #606 from FelipeNascimentoRosa/dependabot/npm_and_yarn/fast-xml-parser-5.12.0
```

*Commit message example*

```text
Simplifica a home e a vitrine brasileira (#615)
```

*Commit message example*

```text
Redesenha a home brasileira com rabiscos progressivos (#613)
```

## Architecture

### Project Structure: Single Package

This project uses **type-based** module organization.

### Source Layout

```
src/
├── components/
├── config/
├── i18n/
├── lib/
├── pages/
├── plataforma/
```

### Entry Points

- `src/App.tsx`
- `src/main.tsx`

### Configuration Files

- `.github/workflows/analytics.yml`
- `.github/workflows/app-android.yml`
- `.github/workflows/audio.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/manter-acordado.yml`
- `.github/workflows/posthog-web.yml`
- `.github/workflows/qualidade-seo.yml`
- `.github/workflows/revisao-apk.yml`
- `.github/workflows/revisao-publica.yml`
- `.github/workflows/seguranca.yml`
- `_para_apagar/legado/alemao-descomplicado/package.json`
- `_para_apagar/legado/alemao-descomplicado/tsconfig.json`
- `_para_apagar/legado/alemao-descomplicado/vite.config.ts`
- `_para_apagar/legado/russo-interativo/package.json`
- `_para_apagar/legado/russo-interativo/tsconfig.json`
- `_para_apagar/legado/russo-interativo/vite.config.ts`
- `package.json`
- `scripts/en-tools/package.json`
- `scripts/regras/package.json`
- `scripts/seo-tools/package.json`
- `tsconfig.json`
- `vite.config.ts`

### Guidelines

- Group code by type (components, services, utils)
- Keep related functionality in the same type folder
- Avoid circular dependencies between type folders

## Code Style

### Language: TypeScript

### Naming Conventions

| Element | Convention |
|---------|------------|
| Files | camelCase |
| Functions | camelCase |
| Classes | PascalCase |
| Constants | SCREAMING_SNAKE_CASE |

### Import Style: Relative Imports

### Export Style: Named Exports


*Preferred import style*

```typescript
// Use relative imports
import { Button } from '../components/Button'
import { useAuth } from './hooks/useAuth'
```

*Preferred export style*

```typescript
// Use named exports
export function calculateTotal() { ... }
export const TAX_RATE = 0.1
export interface Order { ... }
```

## Testing

### Test Framework

No specific test framework detected — use the repository's existing test patterns.

### File Pattern: `*.test.ts`

### Test Types

- **Unit tests**: Test individual functions and components in isolation


## Error Handling

### Error Handling Style: Try-Catch Blocks


*Standard error handling pattern*

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('User-friendly message')
}
```

## Common Workflows

These workflows were detected from analyzing commit patterns.

### Feature Development

Standard feature implementation workflow

**Frequency**: ~7 times per month

**Steps**:
1. Add feature implementation
2. Add tests for feature
3. Update documentation

**Files typically involved**:
- `/*`
- `src/components/*`
- `src/config/*`
- `**/*.test.*`

**Example commit sequence**:
```
feat(seo): o servidor entrega a página real ao Google (#580)
fix(prerender): playwright em dependencies (o Render instala com NODE_ENV=production e pula devDependencies) (#581)
fix(lote-11): o .com só promete o que entrega (#576)
```

### Test Driven Development

Test-first development workflow (TDD)

**Frequency**: ~4 times per month

**Steps**:
1. Write failing test
2. Implement code to pass test
3. Refactor if needed

**Files typically involved**:
- `**/*.test.*`
- `**/*.spec.*`
- `src/**/*`

**Example commit sequence**:
```
test: add tests for user validation
feat: implement user validation
```


## Best Practices

Based on analysis of the codebase, follow these practices:

### Do

- Follow *.test.ts naming pattern
- Use camelCase for file names
- Prefer named exports

### Don't

- Don't skip tests for new features
- Don't deviate from established patterns without discussion

---

*This skill was auto-generated by [ECC Tools](https://ecc.tools). Review and customize as needed for your team.*

import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // components/ui and hooks are vendored shadcn/ui scaffolding
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts', '.github/**', 'components/ui/**', 'hooks/**']),
])

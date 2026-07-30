#!/usr/bin/env node
/**
 * Rough React Compiler evaluation: build with and without the compiler and
 * print wall-clock time + largest JS chunk size.
 */
import { execSync } from 'node:child_process'
import { readdirSync, statSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname

function largestJs(distDir) {
  if (!existsSync(distDir)) return { name: '—', size: 0 }
  const assets = join(distDir, 'assets')
  if (!existsSync(assets)) return { name: '—', size: 0 }

  let max = 0
  let name = '—'
  for (const file of readdirSync(assets)) {
    if (!file.endsWith('.js') || file.endsWith('.gz') || file.endsWith('.br')) continue
    const size = statSync(join(assets, file)).size
    if (size > max) {
      max = size
      name = file
    }
  }
  return { name, size: max }
}

function runBuild(label, env) {
  const dist = join(root, `dist-${label}`)
  rmSync(dist, { recursive: true, force: true })

  const started = Date.now()
  execSync('npx vite build', {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...env,
      // vite writes to dist/ by default; we rename after
    },
  })
  const ms = Date.now() - started

  // Move default dist → labeled folder
  rmSync(dist, { recursive: true, force: true })
  execSync(`mv dist "${dist}"`, { cwd: root })

  const js = largestJs(dist)
  return { label, ms, js }
}

console.log('Building WITH React Compiler…')
const withCompiler = runBuild('with-compiler', { REACT_COMPILER: '1' })

console.log('\nBuilding WITHOUT React Compiler…')
const withoutCompiler = runBuild('without-compiler', { REACT_COMPILER: '0' })

console.log('\n=== React Compiler comparison ===')
for (const row of [withCompiler, withoutCompiler]) {
  console.log(
    `${row.label}: ${(row.ms / 1000).toFixed(1)}s · largest JS ${row.js.name} (${(row.js.size / 1024).toFixed(1)}KB)`,
  )
}

const deltaMs = withCompiler.ms - withoutCompiler.ms
const deltaJs = withCompiler.js.size - withoutCompiler.js.size
console.log(
  `\nDelta (with − without): ${deltaMs >= 0 ? '+' : ''}${(deltaMs / 1000).toFixed(1)}s build, ${deltaJs >= 0 ? '+' : ''}${(deltaJs / 1024).toFixed(1)}KB largest JS`,
)
console.log(
  'Recommendation: keep compiler ON unless local DX pain outweighs runtime wins; use REACT_COMPILER=0 to opt out.',
)

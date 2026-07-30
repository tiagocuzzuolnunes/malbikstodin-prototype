#!/usr/bin/env node
/**
 * Fails CI when production assets exceed agreed budgets.
 * Run after `vite build` (expects ./dist).
 */
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST_PATH = fileURLToPath(new URL('../dist/', import.meta.url))

/** Raw (uncompressed) budgets — gzip/br are generated alongside and usually ~35–45% of these. */
const BUDGETS = {
  /** Largest entry/chunk JS file */
  maxJsFileBytes: 450 * 1024,
  /** Sum of all JS in dist */
  maxTotalJsBytes: 900 * 1024,
  /** Sum of all CSS in dist */
  maxTotalCssBytes: 80 * 1024,
  /**
   * Soft cap for images. Oversized files warn but do not fail CI yet —
   * the 404 PNGs still exceed this and are tracked separately.
   */
  maxImageBytes: 350 * 1024,
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg'])

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`
}

if (!existsSync(DIST_PATH)) {
  console.error('dist/ not found. Run `npm run build` first.')
  process.exit(1)
}

const files = walk(DIST_PATH).filter((file) => !file.endsWith('.gz') && !file.endsWith('.br'))

let totalJs = 0
let totalCss = 0
let maxJs = 0
let maxJsName = ''
const violations = []
const imageWarnings = []

for (const file of files) {
  const size = statSync(file).size
  const ext = extname(file).toLowerCase()
  const rel = file.slice(DIST_PATH.length)

  if (ext === '.js') {
    totalJs += size
    if (size > maxJs) {
      maxJs = size
      maxJsName = rel
    }
    if (size > BUDGETS.maxJsFileBytes) {
      violations.push(
        `JS file ${rel} is ${formatKb(size)} (max ${formatKb(BUDGETS.maxJsFileBytes)})`,
      )
    }
  }

  if (ext === '.css') {
    totalCss += size
  }

  if (IMAGE_EXTS.has(ext) && size > BUDGETS.maxImageBytes) {
    imageWarnings.push(
      `Image ${rel} is ${formatKb(size)} (soft max ${formatKb(BUDGETS.maxImageBytes)})`,
    )
  }
}

if (totalJs > BUDGETS.maxTotalJsBytes) {
  violations.push(
    `Total JS is ${formatKb(totalJs)} (max ${formatKb(BUDGETS.maxTotalJsBytes)})`,
  )
}

if (totalCss > BUDGETS.maxTotalCssBytes) {
  violations.push(
    `Total CSS is ${formatKb(totalCss)} (max ${formatKb(BUDGETS.maxTotalCssBytes)})`,
  )
}

console.log('Bundle budget report')
console.log(`  Largest JS: ${maxJsName || '—'} (${formatKb(maxJs)})`)
console.log(`  Total JS:   ${formatKb(totalJs)} / ${formatKb(BUDGETS.maxTotalJsBytes)}`)
console.log(`  Total CSS:  ${formatKb(totalCss)} / ${formatKb(BUDGETS.maxTotalCssBytes)}`)
console.log(`  Image cap:  ${formatKb(BUDGETS.maxImageBytes)} per file`)

if (imageWarnings.length > 0) {
  console.warn('\nImage budget warnings (non-blocking):')
  for (const line of imageWarnings) console.warn(`  • ${line}`)
}

if (violations.length > 0) {
  console.error('\nBudget exceeded:')
  for (const line of violations) console.error(`  • ${line}`)
  process.exit(1)
}

console.log('\nAll hard budgets OK.')

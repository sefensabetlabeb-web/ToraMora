import {readdir, readFile, stat} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const limits = {largeSource: 120_000, largePublicAsset: 600_000};
const findings = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full)); else out.push(full);
  }
  return out;
}

for (const file of await walk(root)) {
  const info = await stat(file);
  const rel = path.relative(root, file).replaceAll('\\', '/');
  if (/^(src|messages|locales)\//.test(rel) && info.size > limits.largeSource) {
    findings.push(`Large source file: ${rel} (${Math.round(info.size / 1024)} KB)`);
  }
  if (rel.startsWith('public/') && info.size > limits.largePublicAsset) {
    findings.push(`Large public asset: ${rel} (${Math.round(info.size / 1024)} KB)`);
  }
}

const nextConfig = await readFile(path.join(root, 'next.config.ts'), 'utf8');
if (!nextConfig.includes("formats: ['image/avif', 'image/webp']")) findings.push('AVIF/WebP image output is not configured.');
if (!nextConfig.includes('minimumCacheTTL')) findings.push('Next image cache TTL is not configured.');

console.log(`Performance audit: ${findings.length ? 'REVIEW' : 'PASS'}`);
for (const item of findings) console.log(`- ${item}`);
if (findings.length) process.exitCode = 1;

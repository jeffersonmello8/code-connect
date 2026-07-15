#!/usr/bin/env node
/**
 * Hook afterFileEdit: roda lint no app afetado (web ou api).
 * Fail-open: não bloqueia o agente se lint falhar.
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const input = readFileSync(0, 'utf8');
let payload;

try {
  payload = JSON.parse(input);
} catch {
  process.exit(0);
}

const filePath = payload.file_path ?? payload.path ?? '';
if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replace(/\\/g, '/');
const isWeb = normalized.includes('apps/web/');
const isApi = normalized.includes('apps/api/');
const isTs = /\.tsx?$/.test(normalized);

if (!isTs || (!isWeb && !isApi)) {
  process.exit(0);
}

const command = isWeb ? 'pnpm lint:web' : 'pnpm lint:api';

try {
  execSync(command, {
    stdio: 'inherit',
    cwd: process.cwd(),
    shell: true,
  });
} catch {
  // fail-open: lint failure is reported in output but does not block the agent
  process.stderr.write(`[lint-after-edit] ${command} reported issues\n`);
}

process.exit(0);

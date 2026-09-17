#!/usr/bin/env node
/**
 * openspec-scaffold — generate the four OpenSpec files for one change.
 * No network, no AI. Fills a template; you edit the result.
 */

import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

function slugify(s) {
  const v = String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return v || 'my-feature';
}

function arg(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  if (i === -1) return fallback;
  const v = process.argv[i + 1];
  return v && !v.startsWith('--') ? v : fallback;
}

const project = arg('project', 'my-project');
const feature = slugify(arg('feature', 'my-feature'));
const requirement = arg('requirement', '(describe what you want here)');
const outDir = resolve(arg('out', '.'));
const force = process.argv.includes('--force');

const root = join(outDir, 'openspec', 'changes', feature);

const proposal = `# ${requirement}

## Why
<!-- Why this change: who hits the problem, and how it is handled today -->
${requirement}. This capability is missing today and needs to be added.

## What Changes
- Adds the ${feature} capability
- Blast radius: TODO (list the modules this touches)

## Impact
- Affected modules: TODO
- Backwards compatible: TODO (yes / no)
- Data migration needed: none / TODO
`;

const spec = `# ${feature} Specification

## ADDED Requirements

### Requirement: ${requirement}
The system SHALL ${requirement}.

#### Scenario: happy path works
- **GIVEN** the user is on the relevant page
- **WHEN** the user performs the expected action
- **THEN** the system returns the expected result

#### Scenario: invalid input
- **GIVEN** the user provides invalid input
- **WHEN** the user submits
- **THEN** the system rejects it with a clear error message
`;

const design = `# Design: ${feature}

## Context
${requirement}. State where this sits inside ${project} and what it depends on.

## Goals / Non-Goals

**Goals**
- Make the ${requirement} path work end to end

**Non-Goals**
- No rebuild of the permissions model in this change
- No performance work in this change

## Decisions

1. **Decision**: (what you chose)
   - Why:
   - Alternatives rejected:
`;

const tasks = `# Tasks: ${feature}

1. [ ] Define the acceptance criteria for "${requirement}" and write them into the spec.md scenarios
2. [ ] Build the smallest path that works end to end (no completeness yet)
3. [ ] Fill in error handling and edge cases
4. [ ] Add tests covering every scenario in the spec
5. [ ] Run /opsx:verify and confirm the implementation matches the spec
6. [ ] Update the related docs
`;

const files = [
  { rel: 'proposal.md', body: proposal },
  { rel: `specs/${feature}/spec.md`, body: spec },
  { rel: 'design.md', body: design },
  { rel: 'tasks.md', body: tasks },
];

let written = 0;
let skipped = 0;

for (const f of files) {
  const target = join(root, f.rel);
  let exists = false;
  try {
    await stat(target);
    exists = true;
  } catch {
    exists = false;
  }
  if (exists && !force) {
    console.log(`skip   ${target} (exists, use --force)`);
    skipped += 1;
    continue;
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, f.body, 'utf8');
  console.log(`write  ${target}`);
  written += 1;
}

console.log(`\n${written} written, ${skipped} skipped  ->  openspec/changes/${feature}/`);
console.log('next: /opsx:explore -> /opsx:propose -> /opsx:apply -> /opsx:verify -> /opsx:archive');

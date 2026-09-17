# The OpenSpec workflow in five steps

OpenSpec puts a spec layer above your code. The loop it asks you to run is
`explore -> propose -> apply -> verify -> archive`. Command names and file layout
follow the official site <https://www.openspec.cn/> (read 2026-09-17).

## 1. `/opsx:explore` — understand before writing

Read the problem and the existing code. Nothing is written in this step. Skipping it
is the usual reason a spec turns out to describe the wrong thing.

## 2. `/opsx:propose` — draft the change

Produces four files under `openspec/changes/<feature>/`:

| File | Question it answers |
| --- | --- |
| `proposal.md` | Why are we doing this, and what breaks? |
| `specs/<feature>/spec.md` | What exactly must be true when we are done? |
| `design.md` | How did we decide to build it? |
| `tasks.md` | What is the order of work? |

`spec.md` is the one that gets verified later. Write it as `SHALL` requirements with
`GIVEN / WHEN / THEN` scenarios, so it can be checked rather than admired.

## 3. `/opsx:apply` — implement

The agent works through `tasks.md`. Because the tasks came from a spec, the diff has
something to be measured against.

## 4. `/opsx:verify` — check the implementation against the spec

This is the step people skip. Passing tests only say the code does what the code does;
verify asks whether the code does what the spec said.

## 5. `/opsx:archive` — close it out

Archive the finished change so the open folder stays short and the record stays readable.

## Where this repo fits

`openspec-scaffold` writes step 2's four files so you start by editing them instead of
facing four blank pages. It does not replace OpenSpec and it does not call an AI —
install OpenSpec itself with:

```bash
npm install -g @fission-ai/openspec@latest
```

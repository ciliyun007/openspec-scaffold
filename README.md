# openspec-scaffold

Generate the four OpenSpec files for a change — `proposal.md`, `spec.md`, `design.md`, `tasks.md` — from a single sentence you type in.

It writes plain Markdown into `openspec/changes/<feature>/`, following the layout the OpenSpec workflow expects. No AI call, no network request, no telemetry. It fills in a template; you edit the result and hand it to your coding agent with `/opsx:apply`.

If you would rather click than type, the same generator runs in a browser at https://openspec-mvp.pages.dev/

## Why

[OpenSpec](https://github.com/Fission-AI/OpenSpec) is a lightweight, configurable spec framework for AI coding agents: you write down what should change before any code is written, the agent implements against that description, and you verify the implementation matches it.

The hard part is usually the empty page. This tool writes the four files with the right headings in the right places so you start by editing instead of staring.

## Install

```bash
npm install -g @ciliyun007/openspec-scaffold
```

or run it once:

```bash
npx @ciliyun007/openspec-scaffold --feature user-login --requirement "Users can sign in with email and a one-time code, no password"
```

The package is published to the GitHub Packages npm registry. To install from there, point the scope at it:

```bash
npm config set @ciliyun007:registry https://npm.pkg.github.com
```

## Usage

```bash
openspec-scaffold --feature <feature-name> --requirement "<one sentence>"
```

(`openspec-scaffold` is the command name after a global install; the package name is `@ciliyun007/openspec-scaffold`.)

Options:

| Flag | Default | Meaning |
| --- | --- | --- |
| `--feature` | `my-feature` | Change name. Slugified and used as the folder name. |
| `--requirement` | *(placeholder text)* | What you want, in one sentence. |
| `--project` | `my-project` | Project name, written into `design.md`. |
| `--out` | `.` | Where `openspec/` is created. |
| `--force` | off | Overwrite files that already exist. |

Example:

```bash
openspec-scaffold --feature user-login \
  --requirement "Users can sign in with email and a one-time code, no password"
```

Output:

```
openspec/changes/user-login/proposal.md
openspec/changes/user-login/specs/user-login/spec.md
openspec/changes/user-login/design.md
openspec/changes/user-login/tasks.md
```

Then, in your agent:

```
/opsx:explore    # understand the problem and existing code first
/opsx:propose    # draft the change with the files above
/opsx:apply      # let the agent work through tasks.md
/opsx:verify     # confirm the implementation matches the spec
/opsx:archive    # archive this change
```

## What the generated spec looks like

`spec.md` uses SHALL plus GIVEN / WHEN / THEN scenarios, which is the shape OpenSpec verifies against:

```markdown
### Requirement: Users can sign in with email and a one-time code, no password
The system SHALL Users can sign in with email and a one-time code, no password.

#### Scenario: happy path works
- **GIVEN** the user is on the relevant page
- **WHEN** the user performs the expected action
- **THEN** the system returns the expected result
```

Scenarios are deliberately generic — they are prompts for you to fill in, not a finished specification.

## Data files

| File | What it holds |
| --- | --- |
| `data/openspec-commands.csv` | The five `/opsx:` commands: what each does, when to run it, what it writes. |
| `data/openspec-facts.csv` | Facts about OpenSpec with a source URL and the date checked, so you can re-verify instead of trusting a number. |

See `docs/workflow.md` for a short write-up of the five steps.

## Sources

The command names, the file layout, and the workflow in this repo follow the official OpenSpec site <https://www.openspec.cn/> and the repository <https://github.com/Fission-AI/OpenSpec>. Facts in `data/openspec-facts.csv` carry the date they were read.

## License

MIT

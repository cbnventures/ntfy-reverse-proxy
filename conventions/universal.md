# Universal Coding Conventions

Rules that apply across all programming languages and platforms.

## AI Agent Behavior

### Task Tracking

Every top-level user request must be tracked as a task. Break multi-step requests into discrete sub-tasks. Mark each task as in-progress before starting and completed when done.

**Claude Code:**

| Tool         | Purpose                                                                    |
|--------------|----------------------------------------------------------------------------|
| `TaskCreate` | Create a new task with subject, description, and optional spinner text.    |
| `TaskGet`    | Retrieve a task by ID to check its current state.                          |
| `TaskList`   | List all tasks to find the next available work.                            |
| `TaskUpdate` | Update status (`pending` / `in_progress` / `completed`), add dependencies. |

**Codex CLI / Cursor / Other agents:**

If your platform does not provide dedicated task tracking tools, maintain a checklist in your working memory or output. State what you are about to do before starting and confirm completion before moving on.

### Command Output Caching

When a command produces output that may be referenced later, save it to a file in the agent's designated temporary directory. Read from the cached file instead of re-running the command. Do not rely on conversation memory for command output — files survive context compaction.

### Command Transparency

Run commands from explicit, full directory paths so every invocation is unambiguous. Prefix commands with `cd` to the target directory so the working directory is visible in the output.

```bash
# BAD — ambiguous which workspace
npm run build

# GOOD — explicit directory
cd /path/to/packages/nova && npm run build
```

### Web Browser Debugging

Use the `agent-browser` command for visual testing and web page interaction. Do not use `curl`, `wget`, or other HTTP clients for tasks that require rendering, clicking, or inspecting a page.

Run `agent-browser --help` for available commands.

## Workflow

### Scope

- **Only apply version and changelog rules to user-requested product changes.** Process-only edits, tooling updates, and non-product changes do not trigger version bumps or changelog entries.
- **Confirm your understanding before making changes.** For each user request, state exactly what you understood and what you plan to do before starting work.

### Per-Change Mechanics

- **Update the changelog with every change.** Add bullet points under the current version section. If the platform uses build numbers, recalculate using the bullet-count formula.
- **Build after every change.** Run the platform build command and verify success before moving on.
- **Do not add changelog entries for version bumps alone** or for incidental implementation fallout unless there is a clear user-visible behavior change.

### Version Lifecycle

- **Keep the version unchanged while working within a release line.** Do not bump the version until the user signals a new release.
- **Start a new version only when the working tree is clean** — all current changes committed and `git status --short` is empty.
- **When starting a new version, ask first.** Confirm whether the bump is major, minor, or bugfix (semver). Then create a new changelog section, bump the version, and carry forward the prior build number.
- **Do not commit a version bump by itself.** Keep version bump changes in the working copy until at least one user-requested change is included. Do not run a build when only starting a new version line.

### Wrapping Up

- **Keep working until the user says "all done."** Continue executing per-change bumps and builds until explicitly told to stop.
- **On "all done":** consolidate the changelog, recalculate the build number (if applicable), sync the version across all version files, and commit with a version subject line. Do not add co-author credits.
- **Keep version numbers and CHANGELOG.md synchronized** at all times before commit.

## General Code Style

- Semicolons at statement ends.
- Commas as separators in arrays, dictionaries, and argument lists (not semicolons).
- Trailing commas in multiline constructs.
- Ternary form: `(condition) ? valueA : valueB` — parenthesized condition, single-line.
- Curly braces required for all control structures (no braceless `if`/`else`/`for`).
- LF line endings.
- Final newline required at end of file.
- No abbreviations in variable names, type names, or any identifiers — spell everything out fully. External API names (e.g., `tmpdir()`) are fine as-is, but the variable storing the result must be spelled out.

### Quotes and Indentation

| Language                | Quotes                           | Indentation |
|-------------------------|----------------------------------|-------------|
| TypeScript / JavaScript | Single                           | 2-space     |
| Swift                   | Double (only option)             | 4-space     |
| Java                    | Double (only option)             | 4-space     |
| Kotlin                  | Double (only option)             | 4-space     |
| C#                      | Double (only option)             | 4-space     |
| PHP                     | Single (non-interpolated)        | 4-space     |
| Python                  | Double (Black/Google convention) | 4-space     |
| CSS                     | N/A                              | 2-space     |
| Docker                  | Double (for variable expansion)  | 2-space     |
| Shell                   | Double (for variable expansion)  | 2-space     |

### File Naming

| Language                | Convention                       | Example                                     |
|-------------------------|----------------------------------|---------------------------------------------|
| TypeScript / JavaScript | kebab-case                       | `markdown-table.ts`, `cli-header.d.ts`      |
| Swift                   | PascalCase + role suffix         | `TunnelFormView.swift`, `TunnelModel.swift` |
| Java                    | PascalCase matching class name   | `EntityRepository.java`                     |
| Kotlin                  | PascalCase matching class name   | `EntityRepository.kt`                       |
| C#                      | PascalCase matching class name   | `EntityRepository.cs`                       |
| PHP                     | PascalCase (PSR-4) or snake_case | `EntityRepository.php`                      |
| Python                  | snake_case (PEP 8)               | `entity_repository.py`                      |
| CSS                     | kebab-case                       | `user-profile.css`                          |
| Docker                  | kebab-case                       | `api-gateway.Dockerfile`                    |
| Shell                   | kebab-case                       | `backup-config.sh`                          |

## Documentation Style

### General Rules

- Every member documented — public, private, protocol stubs (`var body`). No exceptions.
- Required body paragraph: every doc comment MUST include a body paragraph after the summary line that explains why the declaration exists, who uses it, or when it matters. Body must be 2–3 lines, max 80 characters per line (not counting the comment prefix). Prefer 2 lines — fill the first line as fully as possible, remainder on line 2. Use 3 lines only when content truly needs it. For 3-line bodies, the second line must be the longest (diamond/belly shape) — keep the 1st and 3rd lines at reasonable length. Structured tags (`- Parameter`, `- Returns`, `- Throws`, `@param`, `@returns`, etc.) go after the body.
- No file-level comments above imports.

### Summary Line Convention

- Summary line uses the hierarchy chain format: `ClassName - Member Name.`
- Summary line ends with a period.
- `var body: some View` is documented as `TypeName - Body.`

### Hierarchy Chain

- Top-level declarations: `ClassName.`
- Members: `ClassName - MemberName.`
- Nested types: `OuterClass.InnerClass - MemberName.`
- Enum cases: `EnumName - CaseName.`

## Platform Build Rules

### Apple (Xcode)

- **Version file:** `project.pbxproj` (`MARKETING_VERSION` + `CURRENT_PROJECT_VERSION`)
- **Build number:** Yes — equals total count of changelog bullet lines across `CHANGELOG.md`
- **Build command:** `xcodebuild build` (with project-specific scheme/destination)
- **Changelog header:** `## X.Y.Z (build) - YYYY-MM-DD`

### TypeScript / JavaScript (Node.js)

- **Version file:** `package.json` `version`
- **Build number:** No
- **Build command:** `npm run build`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### Android (Gradle)

- **Version file:** `build.gradle` (`versionName` + `versionCode`)
- **Build number:** Yes — equals total count of changelog bullet lines across `CHANGELOG.md`
- **Build command:** `./gradlew assembleDebug`
- **Changelog header:** `## X.Y.Z (build) - YYYY-MM-DD`

### Windows (.NET)

- **Version file:** `.csproj` (`Version`)
- **Build number:** No
- **Build command:** `dotnet build`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### PHP (Composer)

- **Version file:** `composer.json` `version`
- **Build number:** No
- **Build command:** `composer test`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### Python (pip / Poetry)

- **Version file:** `pyproject.toml` `version`
- **Build number:** No
- **Build command:** `python -m build`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### Docker

- **Version file:** `Dockerfile` `ARG VERSION` or none
- **Build number:** No
- **Build command:** `docker build .`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

## Release Notes Format

```markdown
## 1.2.0 - 2026-01-01

### UPDATED
- Enhanced the changelog release summary output.

### FIXED
- Fixed version bump calculation for major releases.

### ADDED
- Added dry-run mode to the release command.
```

- Use headings in this order: `### UPDATED`, `### FIXED`, `### ADDED`, `### REMOVED`.
- Leave out any heading that has no entries.
- Use only ASCII characters and standard US keyboard quotes.

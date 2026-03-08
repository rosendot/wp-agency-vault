# Commit Skill

Create a well-formatted git commit for staged and unstaged changes.

## Procedure

1. Run `git status` to see all changed and untracked files.
2. Run `git diff` and `git diff --cached` to review staged and unstaged changes.
3. Run `git log --oneline -5` to see recent commit message style.
4. Stage all relevant files (but never stage `.env`, credentials, or secrets).
5. Write a concise commit message:
   - Use imperative mood ("Add feature" not "Added feature")
   - Keep the first line under 72 characters
   - Focus on **why** not **what**
   - If $ARGUMENTS is provided, use it as the commit message or as guidance for the message
6. Commit the changes.
7. Run `git status` to confirm the commit succeeded.

## Rules

- Never stage files that contain secrets (`.env`, credentials, API keys)
- Never use `--no-verify` or skip hooks
- Never amend a previous commit unless explicitly asked
- Never push unless explicitly asked
- If a pre-commit hook fails, fix the issue and create a new commit

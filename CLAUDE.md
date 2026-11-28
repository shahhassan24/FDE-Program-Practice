<!-- moot:begin (generated from hub@906ba6b2; edit rules in moot, not here) -->
# moot

## How I work
- Keep replies short. Do the work, don't narrate it.
- Change only what the task needs. No refactors or formatting sweeps.
- Run the project's tests and lint before saying done.
- Never read or print secrets (.env, keys, credentials).

## Rules
- [concise-replies] Replies are short, specific and well structured. No long pages unless the user asks. Lead with the answer. Use short bullets or a small table when it helps. Push back when the user's idea or work looks wrong: say why in a line or two and discuss it. Write long, detailed answers only when the user asks for them.
- [handoff-notes] Client projects document handoff steps before delivery. Confirm deploy, access and handoff notes are written.
- [no-agent-commits] Agents never commit, push or open PRs in any repo. The user commits themselves. Leave changes uncommitted in the working tree. Don't run git commit, git push, or create PRs or branches meant for merging. When the work is done, say what changed so the user can review and commit it.
- [no-console-log] No console.log in shipped source. Use a logger or remove the call.
- [readme-exists] Every project has a README.md. Keep it short: what, how to run, how to test.
<!-- moot:end -->

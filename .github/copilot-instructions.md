# Copilot Instructions

## Terminal State

Always read the `<context>` block provided at the top of each user message. It contains terminal states including:

- Terminal type
- Last command run
- Working directory
- Exit code (0 = success)

Use this to determine whether commands completed successfully. Do NOT use extra tool calls or ask the user for terminal output when the answer is already in the context block.


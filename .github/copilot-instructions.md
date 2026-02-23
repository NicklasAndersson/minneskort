# Copilot Instructions

## Terminal State

Always read the `<context>` block provided at the top of each user message. It contains terminal states including:

- Terminal type
- Last command run
- Working directory
- Exit code (0 = success)

Use this to determine whether commands completed successfully. Do NOT use extra tool calls or ask the user for terminal output when the answer is already in the context block.

## Terminal Tool

Terminal commands are never blocked. If the tool returns empty output, read the exit code from the context block instead — exit code 0 means success. Do not re-run or skip commands due to empty output.


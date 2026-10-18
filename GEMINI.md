# Speed & Context Optimization Rules

> **How to remove this rule:** Simply delete this file (`GEMINI.md`) and `.aiexclude` from the project root.

Based on [Gemini Code Assist Slow in VSCode (Thread #414435357)](https://support.google.com/gemini/thread/414435357/gemini-code-assist-slow-in-vscode?hl=en), apply the following practices to keep back-and-forth interactions fast and responsive:

1. **Keep Context Lean (`.aiexclude`):**
   - Never read or index `node_modules/`, `dist/`, `package-lock.json`, or `.tsbuildinfo` files.
   - Read only the specific lines/files needed rather than scanning the entire workspace.
2. **Minimize Tool Round-Trips:**
   - Avoid running shell commands (`run_command`) for simple checks when native file tools or direct answers work.
   - Batch related file edits or reads in parallel rather than sequential turns.
3. **Clarify Before Large Generations:**
   - Confirm requirements (such as subject matter or content) before generating large multi-file templates to avoid wasted generation time and context bloat.
4. **Keep Responses Concise:**
   - Avoid lengthy recaps so chat history stays compact (preventing chat-history token bloat). You can also use `/compact` when the conversation gets long.


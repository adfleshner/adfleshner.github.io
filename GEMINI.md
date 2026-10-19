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

---

# Aaron Fleshner's Design, Motion & Engineering Standards

## 1. Zero Synthetic / Mock Code
- **Never fabricate synthetic packages or fake code** (e.g., no fake company packages or synthetic APIs).
- When showcasing or rendering code snippets, always use authentic, real code sourced directly from Aaron Fleshner's verified public repositories (`adfleshner/*`), such as:
  - `adfleshner/Random-Love` (`com.flesh.dataaboutapp.dataaboutapp`)
  - `adfleshner/Using-DiffUtil` (`io.coding.usingdiffutil`)
  - `adfleshner/Furballs` (`com.flesh.furballs`, `com.flesh.furballs.web`)
  - `adfleshner/Hyerplex2` (`io.flesh.hyerplex2`)

## 2. Git Safety
- **Never run `git commit` or `git push` automatically.**
- Always leave changes uncommitted in the local working tree for Aaron to inspect, test, and commit himself.

## 3. High Customizability & Clean Configuration
- Isolate all animation physics, colors, typography, and visual variables into a clean, strongly-typed, beautifully documented `CONFIG` object (or top-level CSS variables).
- Provide presets and clear comments for every variable so Aaron can easily tweak speeds, radii, and aesthetics without digging through render loops.

## 4. Motion & Animation Philosophy: "Dreamy, Fluid & Non-Punchy"
- **No aggressive spring overshoot, bouncy snaps, or jarring scale expansions.**
- **Easing curves:** Use silky, gentle curves like `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Buttons:**
  - Subtle hover lift (`translateY(-1.5px)`), gentle click press (`translateY(0.5px)`), zero scale distortion.
  - No complex pseudo-element sheens or oversized gradients that produce edge seams/artifacts.
- **Cursor tracking / Canvas highlights:**
  - Use the **Dreamy Nebula** physics preset by default:
    - `springTension: 0.018`, `springDamping: 0.92` (slow, celestial glide)
    - `trailTension: 0.009`, `trailDamping: 0.90` (viscous trailing wake)
    - `radius: 180`, `falloffExponent: 1.5` (broad, soft celestial feathering)
    - `easeInSpeed: 0.026` (gradual, soft bloom rather than instant flash)

## 5. Eye-Friendly Light Mode
- Avoid blinding, sterile blue-white canvases (`#ffffff`, `#f8fafc`) and high-contrast pitch black text (`#000000`).
- Use warm, natural paper/stone tones (`#f6f5f1` primary, `#edebe4` secondary) with deep warm charcoal typography (`#292524`).
- Use calming oceanic/sapphire accents (`#0369a1`), warm borders, and diffuse shadows.
- Ambient code or background elements in light mode should be gentle watermarks (`100, 116, 139` at low opacity), never dark ink smudges.

## 6. Layout & Foreground Protection
- Background elements must never bleed into or behind sticky navigation headers. Always offset (`startY: 92px`) or clip (`headerHeight: 70px`) below headers.
- Keep card backgrounds solid or elevated (`#151e2e` in dark, `#ffffff` in light) to guarantee foreground readability.



# CYBER NEXUS — MK1 SUB-ZERO V2 (Prototype)

Original, Dracula-inspired **component architecture**, not a copy of the Dracula artwork. **The existing `mk1/` skin is unchanged.**

## Test live

Open `https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/mk1-v2/` in Chrome/Edge, connect DualSense via USB/Bluetooth and press a button. Background transparent by default; append `?bg=1` for easier testing.

## OBS

Browser Source URL is the same live URL. Suggested source dimensions 806×598, transparent background. On some setups OBS browser sources may not receive the physical gamepad; if this occurs, use Window Capture of the interactive browser instead. Test before relying on it for streaming.

## Input mapping

Standard Gamepad API: cross 0, circle 1, square 2, triangle 3, L1 4, R1 5, L2 6, R2 7, Create 8, Options 9, L3 10, R3 11, D-pad 12-15, PS 16, touchpad 17. Left stick axes 0/1; right 2/3. Controller/browser mappings may vary.

## Files

`index.html` standalone live viewer, `main.js` real-time input mapping, `style.css` geometry and effects, `assets/*.svg` independent original controller elements.

**Status:** Initial functional prototype, pending real DualSense/OBS calibration; visuals are original SVG illustrations. No files in the old MK1 project were overwritten.

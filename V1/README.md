# CYBER NEXUS — MK1 V1 (formerly mk1-v4)
A recolored **classic DS4/PS4 controller silhouette** based on the Dracula theme that you chose as reference. The shape and button layout are **not redrawn**: the modular artwork is sourced from [Dracula Gamepad Viewer](https://github.com/dracula/gamepad-viewer), licensed MIT. Original CYBER NEXUS brand and frost overlays are separate SVG files. The V2 Gamepad API mapping is preserved.

## Live
- [MK1 V1 transparent](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/V1/)
- [MK1 V1 dark test background](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/V1/?bg=1)

Press any button to activate your PS4/PS5 controller in Chrome or Edge. Test buttons 0–17, analog movement and trigger pressure. This is a **prototype awaiting live visual validation**, not a claim that all controls are calibrated.

## Dependencies
The Dracula DS4 graphical assets are included **locally** as SVG files in `assets/`; there are no external image dependencies. They preserve the exact classic shape selected. See `DRACULA-LICENSE.txt` for the original MIT license and attribution.

## Files
- `index.html` standalone viewer
- `main.js` proven V2 mapping
- `style.css` Dracula layout + Sub-Zero recoloring
- `assets/brand.svg` custom branding
- `assets/ice-overlay.svg` subtle cold accents

Prior MK1, V2 and V3 folders are unchanged.

## OBS
OBS Browser Source may not expose the physical gamepad. If no input is detected in OBS, use browser Window Capture instead.


## Version folder mapping
- `V1`: formerly `mk1-v4` (first stable controller)
- `V2`: formerly `mk1-v5` (ice-dragon design)
- `V3`: formerly `mk1-v5.1` (larger CYBER NEXUS touchpad branding)

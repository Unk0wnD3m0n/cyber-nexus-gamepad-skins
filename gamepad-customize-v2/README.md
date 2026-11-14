# 🎮 CYBER NEXUS — Gamepad Customize V2

**Gamepad Customize V2** extends the existing three-game controller designer with **local photo skin uploads**. Users can choose **Wuthering Waves, Neverness to Everness or Mortal Kombat 1**, upload a PNG/JPG/WebP image, and apply it inside the controller silhouette without covering the controller inputs.

<p align="center"><img src="preview.svg" width="700" alt="CYBER NEXUS Gamepad Customize V2 jade controller"></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1"><img src="https://img.shields.io/badge/%F0%9F%8E%AE_TRY_CONTROL-UPLOAD_A_PHOTO-16BFA6?style=for-the-badge&labelColor=092D28" alt="Try Gamepad Customize V2"></a></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?overlay=1">Clean OBS overlay</a> · <a href="README_ES.md">🇪🇸 Español</a> · <a href="../gamepad-customize/">Original customizer</a></p>

## 🖼️ Photo skins
1. Pick your game.
2. In **Imagen personalizada**, select a local PNG, JPEG or WebP file under 15 MB.
3. Select **Foto personalizada** (automatically selected after upload).
4. Adjust **scale, horizontal position, vertical position, rotation and opacity**. The photo is masked to the controller shape behind the buttons.
5. Switch back to preset skins without deleting the photo, reset its position or remove it.

Photos **are not uploaded**: the browser stores image files locally using IndexedDB where available. Color, per-game preferences and image adjustments use localStorage. Photos may be lost in private browsing or when browser storage is cleared.

## 🎨 Everything else retained
The original multigame selector, **15 game-specific skins**, **18 themed stick icons**, customizable color picker and quick swatches are retained.

## 🎮 Test / OBS
[Open V2](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1) · [Button diagnostics](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1&debug=1) · [Clean OBS view](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?overlay=1)

The Gamepad API input mapping in `main.js` is unchanged. **Experimental:** please validate image clipping and persistence in your own browser.

## Files
`index.html`, `style.css`, `customizer.js`, `photo-skin.js`, `main.js`, `assets/`, and `DRACULA-LICENSE.txt`.

**Original Gamepad Customize, WuWa V1, NTE V1 and MK1 V1–V3 are unchanged.**

---

© 2026 CYBER NEXUS for original creations. Derived Dracula artwork retains its [MIT license](DRACULA-LICENSE.txt). Game names and trademarks belong to their respective owners.

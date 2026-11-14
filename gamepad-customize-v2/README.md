# 🌈 CYBER NEXUS — Gamepad Customize V2 · RGB + Press Effects

**Gamepad Customize V2** extends the existing three-game controller designer with **local photo skin uploads**. Users can choose **Wuthering Waves, Neverness to Everness or Mortal Kombat 1**, upload a PNG/JPG/WebP image, and apply it inside the controller silhouette without covering the controller inputs.

<p align="center"><img src="preview.svg" width="700" alt="CYBER NEXUS Gamepad Customize jade controller"></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1"><img src="https://img.shields.io/badge/%F0%9F%8E%AE_TRY_CONTROL-UPLOAD_A_PHOTO-16BFA6?style=for-the-badge&labelColor=092D28" alt="Try Gamepad Customize"></a></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?overlay=1">Clean OBS overlay</a> · <a href="README_ES.md">🇪🇸 Español</a></p>

## 🌈 Experimental RGB lighting

**Gamepad Customize V2** adds a visual RGB lighting layer to the proven main editor. Choose among **controller outline, analog stick rings, touchpad and L1/R1 shoulder accents**, with individual on/off switches.

Select **static, breathing, rainbow or energy pulse**, set your lighting color, intensity and animation speed, or turn lighting off. Settings persist in your browser. RGB modes use SVG/CSS and remain in the exported **Save for streaming (.html)** file for OBS without needing the editing script.

This controls **on-screen visual lighting only**, not the physical controller LEDs. The stable [Gamepad Customize main edition](../gamepad-customize/) remains unchanged. This version is experimental and awaits live browser/OBS testing.

## ⚡ Animated on-press effects — V2

The **Button press effects** panel creates short particle bursts only on the transition from released to pressed. The original `main.js` input mapping is not modified.

- **Auto by game:** MK1 = ice ❄️; WuWa = resonance 🌊; NTE = electricity ⚡, with manual ice, resonance, electricity and fire 🔥 options.
- **Independent groups:** face buttons, D-pad, triggers/shoulders, L3/R3, and optional system buttons.
- **Settings:** enabled/disabled, intensity 20–100%, duration 250–950 ms, reset, and a preview button that works without a controller.
- **OBS:** **Save for streaming (.html)** now includes the effect configuration and a lightweight press-effect script. Re-export after editing settings.
- **Performance:** short CSS particle animations, capped at 38 simultaneous bursts; no sounds or changes to gamepad input.

Existing RGB lighting, photos on both grips and the stable `gamepad-customize/` remain unchanged. **Experimental: validate the exported overlay with OBS before streaming.**

## 🖼️ Character art on both controller grips
The photo is now clipped to **the two handles of the controller, right down to the bottom tips**, away from the D-pad, action buttons, analog sticks and touchpad.

1. Choose a game, then upload a PNG/JPG/WebP image under 15 MB to **Foto para ambos lados**.
2. The same image automatically appears on both grips; optionally select a **different photo for the right grip**.
3. Edit the left and right handles independently, with **cover** or **contain** framing, scale, X/Y positioning, rotation and opacity.
4. Switch back to a preset skin without deleting the photos. Reset each grip's framing or remove photos entirely.

Images never leave your browser. IndexedDB stores photos where available; localStorage remembers settings per game. Images with different aspect ratios may still need individual framing adjustments.

## ✨ No texture — original finish

Choose **“Sin textura · acabado original”** under the game skin selector to remove the patterned overlay while retaining the controller's original detailed artwork and a subtle satin sheen. Character photos on both grips remain available. The selection is saved per game.

## 📺 Save your exact controller for OBS / TikTok

Custom photos are stored in **your Chrome browser**, not in the public GitHub link. OBS and TikTok LIVE Studio use separate browser storage, so opening `?overlay=1` alone **cannot** automatically show your photos and custom settings.

After designing your controller:
1. In the editor, click **💾 Guardar control para streaming (.html)**.
2. A file called `CYBER-NEXUS-WUWA-STREAM.html` (or NTE / MK1) downloads. It embeds your current left and right grip photos, game, texture, icon and color.
3. **OBS:** Add **Browser Source** → enable **Local file** → select the downloaded HTML. Set the source to **806 × 598** for the full controller, then resize it in the scene. The exported viewer loads the original Gamepad API input script.
4. **TikTok LIVE Studio:** its browser/link source typically expects an HTTPS URL rather than a local HTML file; use an **OBS projector/window capture or OBS Virtual Camera** to pass the customized controller scene into TikTok. Live controller input inside the OBS browser source depends on controller access in OBS; test it before going live.
5. If you edit your design later, **download again** and replace/refresh your overlay file. Saving does not live-sync across browsers.

This export keeps images embedded locally and does not upload photos to GitHub. The HTML may still load the public controller CSS, icons and input code over the internet.

## 🎨 Everything else retained
The original multigame selector, **15 game-specific skins**, **18 themed stick icons**, customizable color picker and quick swatches are retained.

## 🎮 Test / OBS
[Open V2](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1) · [Button diagnostics](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1&debug=1) · [Clean OBS view](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?overlay=1)

The Gamepad API input mapping in `main.js` is unchanged. The main version has been tested by its creator with OBS and live controller input.

## Files
`index.html`, `style.css`, `customizer.js`, `photo-skin.js`, `main.js`, `assets/`, and `DRACULA-LICENSE.txt`.

**WuWa V1, NTE V1 and MK1 V1–V3 remain unchanged.**

---

© 2026 CYBER NEXUS for original creations. Derived Dracula artwork retains its [MIT license](DRACULA-LICENSE.txt). Game names and trademarks belong to their respective owners.

# 🎮 CYBER NEXUS — Gamepad Customize

Este es **Gamepad Customize**, el personalizador multijuego de CYBER NEXUS: permite elegir **Wuthering Waves, Neverness to Everness o Mortal Kombat 1 — Sub-Zero**. Cambia la apariencia completa del control, sus iconos y las texturas disponibles en función del juego, conservando el mismo `main.js` y las posiciones de los botones.

<p align="center"><img src="preview.svg" alt="Gamepad Customize, diseño inicial jade" width="700"></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize/?bg=1"><img src="https://img.shields.io/badge/%F0%9F%8E%AE_TRY_CONTROL-PERSONALIZAR_V2-16BFA6?style=for-the-badge&labelColor=092D28" alt="TRY CONTROL — GAMEPAD CUSTOMIZE"></a></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize/?overlay=1">🎥 Vista limpia para OBS</a> · <a href="README.md">🇺🇸 English</a> · <a href="../wuwa-v1/">🌊 V1 original</a></p>

## 🎮 Selector de juego

Al cambiar **Juego**, el control aplica automáticamente la carcasa, botones, touchpad y detalles de ese título. Las opciones de cada juego son independientes; no aparecen símbolos ni skins de otros juegos.

| Juego | Skins / texturas (5) | Iconos de palancas (6) |
|---|---|---|
| 🌊 WuWa | Jade Resonance, Abyssal Echo, Celestial Tide, Golden Frequency, Moonlit Sonic | Ondas, Eco, Diapasón, Pulso, Estrella, Luna |
| 🌆 NTE | Neon City, Midnight Grid, Hologram City, Sunset Circuit, Electric Violet | N Neón, Ciudad, Circuito, Cristal, Portal, Rayo |
| ❄️ MK1 / Sub-Zero | Frozen Armor, Glacial Veins, Dark Blizzard, Frost Relic, Arctic Pulse | Dragón, Copo, Fragmento, Máscara, Runa, Ventisca |

Los iconos y patrones son **diseños originales inspirados en las temáticas**, no logotipos oficiales de esos juegos.

## 🎨 Personalización
- **15 skins/texturas:** cinco para cada juego, con miniaturas seleccionables.
- **18 iconos de palancas:** seis por juego, con vista previa.
- **Selector de color:** rueda de color nativa y cuatro colores rápidos.
- **Guardar preferencias por juego:** cada juego recuerda su última skin, icono y color mediante `localStorage`.
- **Restablecer:** botón para recuperar las opciones originales del juego que esté seleccionado.

Los controles de personalización aparecen en el botón **🎨 Personalizar**. Se pueden ocultar sin afectar la transmisión.

## 🎮 Cómo probar
Abre [TRY CONTROL — PERSONALIZAR V2](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize/?bg=1), conecta tu mando por USB o Bluetooth y presiona cualquier botón en Chrome o Edge. El botón de personalización controla exclusivamente los gráficos.

**Cruceta • △ ○ × □ • L1/R1 • L2/R2 • Sticks/L3/R3 • Create/Options • PS • Touchpad**

[Modo diagnóstico](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize/?bg=1&debug=1).

> 🧪 **Estado: PERSONALIZADOR MULTIJUEGO.** La V2 reutiliza el código de detección de WuWa V1 sin alterarlo; aún es necesaria una prueba directa del selector y las entradas en un navegador con mando.

## 📺 OBS / vista sin controles
Para no mostrar el panel ni su botón en el streaming, utiliza **[gamepad-customize/?overlay=1](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize/?overlay=1)**. Para revisar el control con fondo oscuro, usa `?bg=1` y para ver los botones detectados `?debug=1`.

## 📁 Archivos
- `index.html`: visor y panel de personalización.
- `main.js`: mapeo original del mando, sin modificaciones.
- `customizer.js`: skins, iconos, colores y guardado local.
- `style.css`: estilos del control y del panel.
- `assets/skins/{wuwa,nte,mk1}/`: 15 texturas separadas por juego.
- `assets/icons/{wuwa,nte,mk1}/`: 18 emblemas originales separados por juego.
- `DRACULA-LICENSE.txt`: licencia MIT y atribución de la base gráfica.

**WuWa V1, NTE V1 y MK1 V1–V3 permanecen intactos.**

---

## © Créditos
© 2026 CYBER NEXUS por los recursos originales. El arte base del mando incorpora componentes derivados de [Dracula Gamepad Viewer](https://github.com/dracula/gamepad-viewer), conservando su [licencia MIT](DRACULA-LICENSE.txt). Wuthering Waves pertenece a sus titulares.

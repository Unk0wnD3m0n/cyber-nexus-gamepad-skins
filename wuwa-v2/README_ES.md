# 🌊 CYBER NEXUS × Wuthering Waves — V2 Personalizable

Esta es la **versión experimental V2** del control de Wuthering Waves. Utiliza la misma silueta, las mismas posiciones y el mismo `main.js` de **WuWa V1**, pero incorpora un **panel interactivo de personalización**.

<p align="center"><img src="preview.svg" alt="Control CYBER NEXUS WuWa V2, versión jade" width="700"></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/wuwa-v2/?bg=1"><img src="https://img.shields.io/badge/%F0%9F%8E%AE_TRY_CONTROL-PERSONALIZAR_V2-16BFA6?style=for-the-badge&labelColor=092D28" alt="TRY CONTROL — PERSONALIZAR V2"></a></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/wuwa-v2/?overlay=1">🎥 Vista limpia para OBS</a> · <a href="README.md">🇺🇸 English</a> · <a href="../wuwa-v1/">🌊 V1 original</a></p>

## 🎨 Personalización
- **3 skins/texturas:** Jade Resonance, Dark Jade y Light Aqua.
- **3 iconos de palancas:** ondas originales, pulso resonante y órbita futurista.
- **Selector de color:** rueda de color nativa y cuatro colores rápidos.
- **Guardar preferencias:** los cambios permanecen en el mismo navegador mediante `localStorage`.
- **Restablecer:** botón para volver a Jade Resonance con los símbolos y colores originales.

Los controles de personalización aparecen en el botón **🎨 Personalizar**. Se pueden ocultar sin afectar la transmisión.

## 🎮 Cómo probar
Abre [TRY CONTROL — PERSONALIZAR V2](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/wuwa-v2/?bg=1), conecta tu mando por USB o Bluetooth y presiona cualquier botón en Chrome o Edge. El botón de personalización controla exclusivamente los gráficos.

**Cruceta • △ ○ × □ • L1/R1 • L2/R2 • Sticks/L3/R3 • Create/Options • PS • Touchpad**

[Modo diagnóstico](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/wuwa-v2/?bg=1&debug=1).

> 🧪 **Estado: EXPERIMENTAL.** La V2 reutiliza el código de detección de WuWa V1 sin alterarlo; aún es necesaria una prueba directa del selector y las entradas en un navegador con mando.

## 📺 OBS / vista sin controles
Para no mostrar el panel ni su botón en el streaming, utiliza **[wuwa-v2/?overlay=1](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/wuwa-v2/?overlay=1)**. Para revisar el control con fondo oscuro, usa `?bg=1` y para ver los botones detectados `?debug=1`.

## 📁 Archivos
- `index.html`: visor y panel de personalización.
- `main.js`: mapeo original del mando, sin modificaciones.
- `customizer.js`: skins, iconos, colores y guardado local.
- `style.css`: estilos del control y del panel.
- `assets/skin-*.svg`: texturas intercambiables.
- `assets/pulse.svg`, `assets/orbit.svg`, `assets/resonance-emblem.svg`: iconos de palancas.
- `DRACULA-LICENSE.txt`: licencia MIT y atribución de la base gráfica.

**WuWa V1 y los controles de MK1/NTE no fueron modificados.**

---

## © Créditos
© 2026 CYBER NEXUS por los recursos originales. El arte base del mando incorpora componentes derivados de [Dracula Gamepad Viewer](https://github.com/dracula/gamepad-viewer), conservando su [licencia MIT](DRACULA-LICENSE.txt). Wuthering Waves pertenece a sus titulares.

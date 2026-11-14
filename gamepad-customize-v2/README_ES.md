# 🎮 CYBER NEXUS — Gamepad Customize V2

La nueva **Gamepad Customize V2** permite aplicar **fotografías o imágenes locales** como skin sobre la carcasa de los controles de **Wuthering Waves, NTE y Mortal Kombat 1 / Sub-Zero**, además de conservar las 15 texturas, 18 iconos y el selector de colores de la primera versión.

<p align="center"><img src="preview.svg" width="700" alt="CYBER NEXUS Gamepad Customize V2, base jade"></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1"><img src="https://img.shields.io/badge/%F0%9F%8E%AE_TRY_CONTROL-SUBIR_FOTO_Y_PERSONALIZAR-16BFA6?style=for-the-badge&labelColor=092D28" alt="Probar Gamepad Customize V2"></a></p>

<p align="center"><a href="https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?overlay=1">🎥 Vista transparente sin panel para OBS</a> · <a href="README.md">🇺🇸 English</a> · <a href="../gamepad-customize/">Versión anterior</a></p>

## 🖼️ Nueva función: subir una foto como skin

1. Abre el botón **🎨 Personalizar** y selecciona el juego deseado.
2. En **Imagen personalizada**, pulsa **Seleccionar imagen** y elige un archivo PNG, JPG o WebP de tu computadora (máximo 15 MB).
3. El selector cambia automáticamente a **Foto personalizada**. La imagen se recorta a la silueta del mando y se dibuja por debajo de los botones.
4. Ajusta **tamaño, posición horizontal, posición vertical, rotación y opacidad** con los deslizadores.
5. Vuelve a **Skin del juego** para usar las texturas originales, sin borrar tu fotografía. También puedes eliminarla o restablecer sus ajustes.

La imagen **no se envía a GitHub ni a ningún servidor**: se almacena en el navegador con IndexedDB cuando está disponible. Los ajustes por juego se guardan mediante localStorage. Si el almacenamiento privado está bloqueado, la imagen funciona durante la sesión, pero puede desaparecer al recargar.

Puedes descargar una imagen legalmente utilizable de Internet para cargarla; comprueba siempre las licencias antes de compartir públicamente una skin.

## 🎨 Personalización existente

- **Juegos:** WuWa, Neverness to Everness y Mortal Kombat 1.
- **15 skins / texturas:** cinco por juego.
- **18 emblemas de sticks:** seis por juego.
- **Selector de color:** personalizado y cuatro botones rápidos.
- **Memoria por juego** para iconos, texturas, color y ajuste de foto.

## 🎮 Probar y usar en OBS

[**Abrir Gamepad Customize V2**](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1)

[Modo diagnóstico](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?bg=1&debug=1) · [Overlay sin panel](https://unk0wnd3m0n.github.io/cyber-nexus-gamepad-skins/gamepad-customize-v2/?overlay=1)

El archivo `main.js` conserva el mismo mapeo Gamepad API probado en las versiones anteriores. Si OBS Browser Source no recibe las pulsaciones del mando, captura la ventana del navegador.

> 🧪 **V2 experimental:** los archivos y las rutas se han verificado en GitHub. Aún falta comprobar el recorte de imagen y la persistencia con un mando y un navegador reales.

## 📁 Archivos principales

- `index.html`: visor y controles de personalización.
- `style.css`: máscaras, capas y opciones.
- `customizer.js`: selección multijuego, skins, iconos y colores.
- `photo-skin.js`: subida local, recorte y ajustes de imagen con IndexedDB.
- `main.js`: mapeo original de controles, **sin modificaciones**.
- `assets/`: texturas y emblemas.
- `DRACULA-LICENSE.txt`: licencia y atribución de los gráficos derivados de Dracula.

**Gamepad Customize original, WuWa V1, NTE V1 y MK1 V1–V3 permanecen intactos.**

---

© 2026 CYBER NEXUS por sus recursos originales. Algunos gráficos base se derivan de [Dracula Gamepad Viewer](https://github.com/dracula/gamepad-viewer), bajo la [licencia MIT](DRACULA-LICENSE.txt). Los nombres y marcas de los juegos pertenecen a sus respectivos propietarios.

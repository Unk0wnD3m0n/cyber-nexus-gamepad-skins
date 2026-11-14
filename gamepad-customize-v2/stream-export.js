/* CYBER NEXUS — portable OBS browser-source export.
 * Copies the current visual DOM, embeds the user's local photos and preserves
 * all game-specific CSS settings. No upload or backend; no image leaves browser.
 * Asset CSS / gamepad runtime load from this project's public GitHub Pages site. */
(()=>{
"use strict";
const button=document.getElementById("export-stream-html");
const status=document.getElementById("stream-export-status");
if(!button||!status)return;
const rootUrl=new URL("./",location.href).href;
const setStatus=(value)=>{status.textContent=value};
function absoluteInlineUrls(element){
 const style=element.style;
 for(let i=0;i<style.length;i++){
  const prop=style.item(i),raw=style.getPropertyValue(prop);
  if(!raw.includes("url("))continue;
  const resolved=raw.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g,(_full,_quote,url)=>{
   if(/^(data:|blob:|https?:)/i.test(url))return `url("${url}")`;
   return `url("${new URL(url,rootUrl).href}")`;
  });
  style.setProperty(prop,resolved,style.getPropertyPriority(prop));
 }
}
async function embedBlobImage(source,target){
 const original=source.getAttribute("src")||"";
 if(!original.startsWith("blob:"))return;
 const response=await fetch(original);
 if(!response.ok)throw new Error("No se pudo leer la foto local.");
 const blob=await response.blob();
 const dataUrl=await new Promise((resolve,reject)=>{
  const reader=new FileReader();
  reader.onload=()=>resolve(reader.result);
  reader.onerror=()=>reject(new Error("Error convirtiendo la imagen."));
  reader.readAsDataURL(blob);
 });
 target.setAttribute("src",dataUrl);
}
function createFile(html,gameName){
 const data=new Blob(["<!doctype html>\n",html],{type:"text/html;charset=utf-8"});
 const url=URL.createObjectURL(data);
 const anchor=document.createElement("a");
 anchor.href=url;anchor.download="CYBER-NEXUS-"+gameName+"-STREAM.html";
 document.body.append(anchor);anchor.click();anchor.remove();
 setTimeout(()=>URL.revokeObjectURL(url),30000);
}
button.addEventListener("click",async()=>{
 if(button.disabled)return;
 button.disabled=true;setStatus("Preparando las imágenes y el control...");
 try{
  const clone=document.documentElement.cloneNode(true);
  clone.querySelectorAll("script,#customizer,#customizer-toggle").forEach(x=>x.remove());
  // Do not freeze transient animation frames into the saved overlay.
  clone.querySelectorAll(".button-fx-burst").forEach(x=>x.remove());
  const exportedStage=clone.querySelector(".stage");
  const chosenGame=document.getElementById("game-select")?.value;
  if(exportedStage&&chosenGame)exportedStage.dataset.fxGame=chosenGame;
  // For streaming: transparent background, no panel, no debug readout.
  clone.querySelector("body")?.classList.remove("show-bg","debug-mode");
  clone.querySelector(".debug")?.remove();
  clone.removeAttribute("data-exporting");
  clone.style.removeProperty("--zoom");
  absoluteInlineUrls(clone);
  // The inline CSS for photo position is preserved on the cloned grip elements.
  const names=["photo-preview","photo-preview-right"];
  for(const id of names){
   const src=document.getElementById(id),dst=clone.querySelector("#"+id);
   if(src&&dst)await embedBlobImage(src,dst);
  }
  const h=clone.querySelector("head");
  if(!h)throw new Error("No se encontró la cabecera del control.");
  const base=document.createElement("base");base.href=rootUrl;
  h.prepend(base);
  const title=h.querySelector("title");if(title)title.textContent="CYBER NEXUS — Stream Controller";
  const meta=document.createElement("meta");meta.name="referrer";meta.content="no-referrer";
  h.append(meta);
  // Do not run customizer/photo editor in this export: frozen visual state
  // is fully captured above. Only the original Gamepad API animation runs.
  const main=document.createElement("script");
  main.src=new URL("main.js",rootUrl).href;
  clone.querySelector("body").append(main);
  // The visual-only FX runtime watches main.js pressed classes in the export.
  // It reads the saved data-fx-* attributes, not editor-only localStorage.
  if(clone.querySelector("#button-fx-layer")){
   const effects=document.createElement("script");
   effects.src=new URL("button-effects.js?v=button-fx-v1",rootUrl).href;
   clone.querySelector("body").append(effects);
  }
  // Remove aria/interactive editor remnants if styles change in future.
  clone.querySelector(".status")?.setAttribute("aria-live","off");
  // Ensure all root-level visual variables keep pointing to published art.
  for(const el of clone.querySelectorAll("[style]"))absoluteInlineUrls(el);
  const chosen=document.getElementById("game-select")?.value||"gamepad";
  createFile(clone.outerHTML,chosen.toUpperCase());
  setStatus("✅ HTML descargado con las fotos incorporadas. Úsalo como archivo local en OBS.");
 }catch(error){
  setStatus("No se pudo exportar: "+(error?.message||String(error)));
 }finally{button.disabled=false}
});
})();
/* CYBER NEXUS — Gamepad Customize V2 image skins.
   Images stay in this browser (IndexedDB); no uploads to the server. */
(()=>{"use strict";
const key="cybernexus-photo-skins-v2", dbName="cybernexus-gamepad-images-v2", store="photos";
const $=id=>document.getElementById(id);
const game=$("game-select"),layer=$("photo-skin"),img=$("photo-preview"),mode=$("photo-mode"),upload=$("photo-upload"),
 status=$("photo-status"),remove=$("photo-remove"),reset=$("photo-reset"),originalReset=$("reset-customizer");
if(!game||!layer||!img||!mode||!upload)return;
const defaults=()=>({mode:"preset",scale:100,x:0,y:0,rotation:0,opacity:75});
const allowed=new Set(["wuwa","nte","mk1"]);
const fields=[["scale",50,250,"%"],["x",-360,360," px"],["y",-260,260," px"],["rotation",-180,180,"°"],["opacity",10,100,"%"]];
let cache={},dbPromise=null,blobUrls={},requestToken=0,active=game.value;
try{const v=JSON.parse(localStorage.getItem(key)||"{}");if(v&&typeof v==="object")cache=v}catch(_){}
function stateFor(g){
 if(!allowed.has(g))g="wuwa";
 if(!cache[g]||typeof cache[g]!=="object")cache[g]=defaults();
 const st=cache[g];if(st.mode!=="photo"&&st.mode!=="preset")st.mode="preset";
 for(const [name,min,max] of fields){let n=Number(st[name]);st[name]=Number.isFinite(n)?Math.max(min,Math.min(max,n)):defaults()[name]}
 return st;
}
function save(){try{localStorage.setItem(key,JSON.stringify(cache))}catch(_){}}
function message(s){status.textContent=s}
function db(){
 if(!("indexedDB" in window))return Promise.reject(new Error("IndexedDB no disponible"));
 if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
  const req=indexedDB.open(dbName,1);
  req.onupgradeneeded=()=>{const database=req.result;if(!database.objectStoreNames.contains(store))database.createObjectStore(store)};
  req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error("Error de almacenamiento"));
 });
 return dbPromise;
}
async function writePhoto(g,blob){
 const database=await db();
 return new Promise((resolve,reject)=>{const tx=database.transaction(store,"readwrite");
 tx.objectStore(store).put(blob,g);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});
}
async function readPhoto(g){
 const database=await db();
 return new Promise((resolve,reject)=>{const tx=database.transaction(store,"readonly"),req=tx.objectStore(store).get(g);
 req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error)});
}
async function deletePhoto(g){
 const database=await db();
 return new Promise((resolve,reject)=>{const tx=database.transaction(store,"readwrite");
 tx.objectStore(store).delete(g);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});
}
function assignUrl(g,blob){
 if(blobUrls[g])URL.revokeObjectURL(blobUrls[g]);
 blobUrls[g]=URL.createObjectURL(blob);
}
function render(){
 const st=stateFor(active),has=Boolean(blobUrls[active]);
 mode.value=st.mode;
 for(const [name,,,suffix] of fields){$( "photo-"+name).value=String(st[name]);$("photo-"+name+"-value").textContent=st[name]+suffix}
 img.src=has?blobUrls[active]:"";
 layer.classList.toggle("visible",st.mode==="photo"&&has);
 document.documentElement.classList.toggle("using-photo",st.mode==="photo"&&has);
 layer.style.setProperty("--photo-scale",String(st.scale/100));
 layer.style.setProperty("--photo-x",st.x+"px");
 layer.style.setProperty("--photo-y",st.y+"px");
 layer.style.setProperty("--photo-rotation",st.rotation+"deg");
 layer.style.setProperty("--photo-opacity",String(st.opacity/100));
 document.querySelector(".photo-controls")?.classList.toggle("disabled",st.mode!=="photo");
}
async function switchGame(){
 active=allowed.has(game.value)?game.value:"wuwa";
 const token=++requestToken;
 render();upload.value="";
 if(!blobUrls[active]){
  try{const photo=await readPhoto(active);if(token!==requestToken)return;
   if(photo)assignUrl(active,photo);
  }catch(_){if(token===requestToken)message("El navegador no permite recuperar fotos guardadas en este contexto.")}
 }
 if(token===requestToken){render();if(blobUrls[active])message("Imagen lista para "+active.toUpperCase());else message("Selecciona una imagen para crear una skin.")}
}
game.addEventListener("change",switchGame);
mode.addEventListener("change",()=>{stateFor(active).mode=mode.value;save();render()});
for(const [name] of fields){
 $("photo-"+name).addEventListener("input",e=>{stateFor(active)[name]=Number(e.target.value);save();render()});
}
upload.addEventListener("change",async()=>{
 const file=upload.files?.[0];if(!file)return;
 if(!["image/png","image/jpeg","image/webp"].includes(file.type)){message("Usa PNG, JPG o WebP.");return}
 if(file.size>15*1024*1024){message("La imagen debe ocupar menos de 15 MB.");return}
 const currentGame=active;
 try{
  const image=await createImageBitmap(file);image.close();
 }catch(_){message("No se pudo abrir la imagen seleccionada.");return}
 assignUrl(currentGame,file);
 stateFor(currentGame).mode="photo";save();render();
 message("Imagen aplicada. Puedes moverla y ajustar su tamaño.");
 try{await writePhoto(currentGame,file);message("Imagen guardada en este navegador (no en GitHub).")}
 catch(_){message("Imagen aplicada, pero el navegador no permitió guardarla; se perderá al cerrar o recargar.")}
});
reset.addEventListener("click",()=>{const old=stateFor(active);Object.assign(old,defaults(),{mode:old.mode});save();render();message("Posición y tamaño restablecidos.")});
remove.addEventListener("click",async()=>{
 const g=active;if(blobUrls[g]){URL.revokeObjectURL(blobUrls[g]);delete blobUrls[g]}
 const st=stateFor(g);st.mode="preset";save();upload.value="";render();message("Imagen eliminada de "+g.toUpperCase()+".");
 try{await deletePhoto(g)}catch(_){message("Imagen quitada de la vista; no fue posible borrar la copia almacenada.")}
});
originalReset?.addEventListener("click",()=>{const st=stateFor(active);st.mode="preset";save();render()});
window.addEventListener("pagehide",()=>{for(const u of Object.values(blobUrls))URL.revokeObjectURL(u)});
switchGame();
})();
/* CYBER NEXUS — gamepad character grip skins v2.1.
   Images are local-only. Reuses previous IndexedDB and localStorage keys. */
(()=>{"use strict";
const key="cybernexus-photo-skins-v2",dbName="cybernexus-gamepad-images-v2",store="photos";
const $=id=>document.getElementById(id),game=$("game-select"),layer=$("photo-skin"),
images={left:$("photo-preview"),right:$("photo-preview-right")},
mode=$("photo-mode"),upload=$("photo-upload"),rightUpload=$("photo-right-upload"),
sideSelect=$("photo-side"),fit=$("photo-fit"),status=$("photo-status"),
remove=$("photo-remove"),reset=$("photo-reset"),originalReset=$("reset-customizer");
if(!game||!layer||!images.left||!images.right||!mode||!upload||!rightUpload)return;
const defaults=()=>({scale:100,x:0,y:0,rotation:0,opacity:100,fit:"cover"});
const fields=[["scale",50,250,"%"],["x",-200,200," px"],["y",-220,220," px"],["rotation",-180,180,"°"],["opacity",15,100,"%"]];
const allowed=new Set(["wuwa","nte","mk1"]);
let cache={},dbPromise,urls={},loaded=new Set(),requestToken=0,active=game.value,editSide="left";
try{const stored=JSON.parse(localStorage.getItem(key)||"{}");if(stored&&typeof stored==="object")cache=stored}catch(_){}
function stateFor(g){
 if(!allowed.has(g))g="wuwa";
 if(!cache[g]||typeof cache[g]!=="object")cache[g]={};
 const st=cache[g];
 if(!["preset","photo"].includes(st.mode))st.mode="preset";
 if(!st.sides||typeof st.sides!=="object"){
  const previous=Object.fromEntries(fields.map(([name])=>[name,st[name]]));
  // Preserve old placement where possible; convert initial full-body settings to grip defaults.
  st.sides={left:{...defaults(),scale:typeof previous.scale==="number"?previous.scale:100,opacity:100},right:defaults()};
 }
 for(const side of ["left","right"]){
  if(!st.sides[side]||typeof st.sides[side]!=="object")st.sides[side]=defaults();
  const entry=st.sides[side];
  for(const [field,min,max] of fields){
   const n=Number(entry[field]);entry[field]=Number.isFinite(n)?Math.min(max,Math.max(min,n)):defaults()[field];
  }
  if(!["cover","contain"].includes(entry.fit))entry.fit="cover";
 }
 return st;
}
function save(){try{localStorage.setItem(key,JSON.stringify(cache))}catch(_){}}
function message(text){if(status)status.textContent=text}
function db(){
 if(!("indexedDB" in window))return Promise.reject(new Error("IndexedDB no disponible"));
 if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
  const req=indexedDB.open(dbName,1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(store))req.result.createObjectStore(store)};
  req.onsuccess=()=>resolve(req.result);
  req.onerror=()=>reject(req.error||new Error("No se pudo abrir IndexedDB"));
 });
 return dbPromise;
}
async function transact(kind,method,id,blob){
 const database=await db();
 return new Promise((resolve,reject)=>{
  const tx=database.transaction(store,kind),object=tx.objectStore(store);
  const request=method==="put"?object.put(blob,id):method==="delete"?object.delete(id):object.get(id);
  if(method==="get")request.onsuccess=()=>resolve(request.result||null);
  else tx.oncomplete=()=>resolve();
  request.onerror=()=>reject(request.error);
  tx.onerror=()=>reject(tx.error);
 });
}
const slot=(g,side)=>side==="left"?g:g+":right";
function addUrl(id,blob){
 if(urls[id])URL.revokeObjectURL(urls[id]);
 urls[id]=URL.createObjectURL(blob);
 loaded.add(id);
}
async function restore(g,side){
 const id=slot(g,side);
 if(loaded.has(id))return;
 const blob=await transact("readonly","get",id);
 loaded.add(id);
 if(blob)addUrl(id,blob);
}
function render(){
 const st=stateFor(active),left=urls[slot(active,"left")],right=urls[slot(active,"right")]||left;
 const visible=st.mode==="photo"&&(Boolean(left)||Boolean(right));
 mode.value=st.mode;
 for(const side of ["left","right"]){
  const image=images[side],url=side==="left"?left:right,container=image.parentElement,settings=st.sides[side];
  if(image.getAttribute("src")!==(url||""))image.setAttribute("src",url||"");
  container.style.setProperty("--side-scale",String(settings.scale/100));
  container.style.setProperty("--side-x",settings.x+"px");
  container.style.setProperty("--side-y",settings.y+"px");
  container.style.setProperty("--side-rotation",settings.rotation+"deg");
  container.style.setProperty("--side-opacity",String(settings.opacity/100));
  image.style.objectFit=settings.fit;
 }
 layer.classList.toggle("visible",visible);
 document.documentElement.classList.toggle("using-photo",visible);
 sideSelect.value=editSide;
 const current=st.sides[editSide];
 fit.value=current.fit;
 for(const [field,,,unit] of fields){
  $("photo-"+field).value=String(current[field]);
  $("photo-"+field+"-value").textContent=current[field]+unit;
 }
 document.querySelector(".photo-controls")?.classList.toggle("disabled",st.mode!=="photo");
}
async function switchGame(){
 active=allowed.has(game.value)?game.value:"wuwa";
 const token=++requestToken;
 editSide="left";
 upload.value="";rightUpload.value="";
 for(const side of ["left","right"]){
  try{await restore(active,side)}catch(_){if(token===requestToken)message("Las fotos no pudieron recuperarse; puedes cargar otras imágenes.")}
  if(token!==requestToken)return;
 }
 render();
 message(urls[slot(active,"left")]?"Personaje en ambos grips. Puedes editar cada lado.":"Selecciona una foto para decorar ambos grips.");
}
async function uploadImage(file,side){
 if(!file)return;
 if(!["image/png","image/jpeg","image/webp"].includes(file.type)){message("Usa PNG, JPG o WebP.");return}
 if(file.size>15*1024*1024){message("Máximo 15 MB por imagen.");return}
 try{const check=await createImageBitmap(file);check.close()}catch(_){message("La imagen no pudo abrirse.");return}
 const g=active,id=slot(g,side);
 addUrl(id,file);
 stateFor(g).mode="photo";editSide=side;
 render();
 message(side==="right"?"Grip derecho actualizado.":"Foto colocada en ambos grips. Ajusta el encuadre de cada lado.");
 try{await transact("readwrite","put",id,file);message("Imagen guardada localmente en el navegador.")}
 catch(_){message("Imagen aplicada; el navegador no permitió guardarla permanentemente.")}
}
game.addEventListener("change",switchGame);
mode.addEventListener("change",()=>{stateFor(active).mode=mode.value;save();render()});
sideSelect.addEventListener("change",()=>{editSide=sideSelect.value;render()});
fit.addEventListener("change",()=>{stateFor(active).sides[editSide].fit=fit.value;save();render()});
for(const [field] of fields){
 $("photo-"+field).addEventListener("input",event=>{
  stateFor(active).sides[editSide][field]=Number(event.target.value);save();render();
 });
}
upload.addEventListener("change",()=>uploadImage(upload.files?.[0],"left"));
rightUpload.addEventListener("change",()=>uploadImage(rightUpload.files?.[0],"right"));
reset.addEventListener("click",()=>{
 stateFor(active).sides[editSide]=defaults();save();render();message("Encuadre del grip "+(editSide==="left"?"izquierdo":"derecho")+" restaurado.");
});
remove.addEventListener("click",async()=>{
 const g=active;
 for(const side of ["left","right"]){
  const id=slot(g,side);
  if(urls[id]){URL.revokeObjectURL(urls[id]);delete urls[id]}
  loaded.add(id);
 }
 stateFor(g).mode="preset";upload.value="";rightUpload.value="";save();render();message("Fotos eliminadas de ambos grips.");
 for(const side of ["left","right"]){
  try{await transact("readwrite","delete",slot(g,side))}catch(_){message("El navegador no permitió eliminar la copia guardada.")}
 }
});
originalReset?.addEventListener("click",()=>{stateFor(active).mode="preset";save();render()});
window.addEventListener("pagehide",()=>{for(const url of Object.values(urls))URL.revokeObjectURL(url)});
switchGame();
})();
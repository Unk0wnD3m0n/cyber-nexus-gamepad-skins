/* CYBER NEXUS — Experimental multigame skin editor.
 * Read-only artwork selection; gameplay stays in the original main.js. */
(()=>{"use strict";
const catalog={
 wuwa:{title:"Wuthering Waves",subtitle:"WUTHERING WAVES",folder:"../wuwa-v1/assets/",base:"#00d8c0",hue:173,bg:["#104e48","#061917"],skins:[["jade","Jade Resonance"],["abyss","Abyssal Echo"],["celestial","Celestial Tide"],["golden","Golden Frequency"],["moon","Moonlit Sonic"]],icons:[["wave","Ondas"],["echo","Eco"],["tuning","Diapasón"],["pulse","Pulso"],["astral","Estrella"],["crescent","Luna"]]},
 nte:{title:"Neverness to Everness",subtitle:"NEVERNESS TO EVERNESS",folder:"../nte-v1/assets/",base:"#d383ff",hue:279,bg:["#48104e","#190618"],skins:[["neon","Neon City"],["midnight","Midnight Grid"],["holo","Hologram City"],["sunset","Sunset Circuit"],["electric","Electric Violet"]],icons:[["monogram","N Neón"],["skyline","Ciudad"],["circuit","Circuito"],["diamond","Cristal"],["portal","Portal"],["bolt","Rayo"]]},
 mk1:{title:"Mortal Kombat 1 · Sub-Zero",subtitle:"MORTAL KOMBAT 1",folder:"../V3/assets/",base:"#52baff",hue:205,bg:["#122d4c","#070d18"],skins:[["frozen","Frozen Armor"],["veins","Glacial Veins"],["blizzard","Dark Blizzard"],["relic","Frost Relic"],["arctic","Arctic Pulse"]],icons:[["dragon","Dragón"],["snowflake","Copo"],["shard","Fragmento"],["mask","Máscara"],["rune","Runa"],["blizzard","Ventisca"]]}
};
const key="cybernexus-multigame-customizer-v2", oldKey="cybernexus-wuwa-v2";
const root=document.documentElement, game=document.querySelector("#game-select"), skins=document.querySelector("#skin-select"),
 icons=document.querySelector("#icon-select"), color=document.querySelector("#color-select"),
 value=document.querySelector("#color-value"), toggle=document.querySelector("#customizer-toggle"),
 panel=document.querySelector("#customizer"), title=document.querySelector("#customizer-title"),
 reset=document.querySelector("#reset-customizer"), iconGallery=document.querySelector("#icon-gallery"),
 skinGallery=document.querySelector("#skin-gallery"), brand=document.querySelector("svg.brand"),
 label=brand?.querySelectorAll("text"), frost=document.querySelector(".frost"),
 swatches=[...document.querySelectorAll("[data-preset-color]")];
if(!game||!skins||!icons||!color||!panel||!brand||!frost)return;
const baseDefault=g=>({skin:catalog[g].skins[0][0],icon:catalog[g].icons[0][0],color:catalog[g].base});
const hex=x=>typeof x==="string"&&/^#[a-f\d]{6}$/i.test(x);
let stored={};try{stored=JSON.parse(localStorage.getItem(key)||"{}")||{}}catch(_){}
const data={game:catalog[stored.game]?stored.game:"wuwa",prefs:{}};
for(const g of Object.keys(catalog)){
 const raw=stored.prefs?.[g]||{},def=baseDefault(g);
 data.prefs[g]={
  skin:catalog[g].skins.some(x=>x[0]===raw.skin)?raw.skin:def.skin,
  icon:catalog[g].icons.some(x=>x[0]===raw.icon)?raw.icon:def.icon,
  color:hex(raw.color)?raw.color:def.color
 };
}
if(!stored.prefs){
 try{const old=JSON.parse(localStorage.getItem(oldKey)||"{}")||{},w=data.prefs.wuwa;
 if(catalog.wuwa.skins.some(x=>x[0]===old.skin))w.skin=old.skin;
 if(catalog.wuwa.icons.some(x=>x[0]===old.icon))w.icon=old.icon;
 if(hex(old.color))w.color=old.color;}catch(_){}
}
const safeUrl=x=>`url("${x}")`;
function hue(hexValue){
 const [r,g,b]=[1,3,5].map(i=>parseInt(hexValue.slice(i,i+2),16)/255);
 const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
 if(!d)return 0;
 let h=max===r?((g-b)/d)%6:max===g?(b-r)/d+2:(r-g)/d+4;
 return (h*60+360)%360;
}
const setVar=(name,link)=>root.style.setProperty(name,safeUrl(link));
const makeOptions=(el,items)=>{el.replaceChildren(...items.map(([id,name])=>new Option(name,id)))};
function buildGallery(host,items,folder,kind){
 host.replaceChildren();
 for(const [id,name] of items){
  const b=document.createElement("button");
  b.type="button";b.className="choice";b.dataset.choice=id;
  b.title=name;b.setAttribute("aria-label",name);
  const image=document.createElement("img");
  image.alt="";image.loading="lazy";
  image.src=folder+id+".svg";
  b.append(image);
  const caption=document.createElement("span");caption.textContent=name;b.append(caption);
  b.addEventListener("click",()=>{data.prefs[data.game][kind]=id;apply()});
  host.append(b);
 }
}
function updateGameArt(cfg){
 const base=cfg.folder;
 for(const [varName,file] of Object.entries({
  "--game-base":"base.svg","--game-triggers":"triggers.svg","--game-bumper":"bumper.svg",
  "--game-start":"start.svg","--game-face":"face.svg","--game-dpad":"dpad.svg",
  "--game-sticks":"sticks.svg","--game-touch":"touchpad-ice.svg",
  "--game-touchpress":"touchpad.svg"
 }))setVar(varName,base+file);
 frost.src=base+"ice-overlay.svg";
 if(label?.length>2){
  label[label.length-1].textContent=cfg.subtitle;
  label[label.length-1].setAttribute("font-size",data.game==="nte"?"26":data.game==="mk1"?"33":"34");
  label[label.length-1].setAttribute("letter-spacing",data.game==="nte"?"4":data.game==="mk1"?"10":"9");
 }
 brand.setAttribute("aria-label","CYBER NEXUS — "+cfg.subtitle);
 title.textContent="🎮 CYBER NEXUS · "+cfg.title;
 document.title="CYBER NEXUS — "+cfg.title+" | Personalizador V2";
 root.style.setProperty("--bg-light",cfg.bg[0]);
 root.style.setProperty("--bg-dark",cfg.bg[1]);
}
function gallerySelected(host,id){
 for(const b of host.querySelectorAll(".choice"))b.setAttribute("aria-pressed",String(b.dataset.choice===id));
}
function apply(){
 const cfg=catalog[data.game], current=data.prefs[data.game];
 const delta=Math.round(hue(current.color)-hue(cfg.base));
 const originalJadeHue=hue(catalog.wuwa.base);
 root.style.setProperty("--hue-shift",delta+"deg");
 root.style.setProperty("--logo-shift",Math.round(hue(current.color)-originalJadeHue)+"deg");
 setVar("--skin-image","assets/skins/"+data.game+"/"+current.skin+".svg");
 setVar("--stick-icon","assets/icons/"+data.game+"/"+current.icon+".svg");
 game.value=data.game;skins.value=current.skin;icons.value=current.icon;color.value=current.color;
 value.textContent=current.color.toUpperCase();
 gallerySelected(skinGallery,current.skin);gallerySelected(iconGallery,current.icon);
 for(const button of swatches)button.setAttribute("aria-pressed",String(button.dataset.presetColor.toLowerCase()===current.color.toLowerCase()));
 try{localStorage.setItem(key,JSON.stringify(data))}catch(_){}
}
function chooseGame(id){
 if(!catalog[id])return;
 data.game=id;
 const cfg=catalog[id];
 makeOptions(skins,cfg.skins);makeOptions(icons,cfg.icons);
 buildGallery(skinGallery,cfg.skins,"assets/skins/"+id+"/","skin");
 buildGallery(iconGallery,cfg.icons,"assets/icons/"+id+"/","icon");
 updateGameArt(cfg);apply();
}
game.addEventListener("change",()=>chooseGame(game.value));
skins.addEventListener("change",()=>{data.prefs[data.game].skin=skins.value;apply()});
icons.addEventListener("change",()=>{data.prefs[data.game].icon=icons.value;apply()});
color.addEventListener("input",()=>{data.prefs[data.game].color=color.value;apply()});
for(const button of swatches)button.addEventListener("click",()=>{data.prefs[data.game].color=button.dataset.presetColor;apply()});
reset.addEventListener("click",()=>{data.prefs[data.game]=baseDefault(data.game);apply()});
toggle.addEventListener("click",()=>{panel.classList.toggle("hidden");toggle.setAttribute("aria-expanded",String(!panel.classList.contains("hidden")))});
if(new URLSearchParams(location.search).get("overlay")==="1"){
 panel.classList.add("hidden");toggle.hidden=true;toggle.setAttribute("aria-expanded","false");
}
chooseGame(data.game);
})();
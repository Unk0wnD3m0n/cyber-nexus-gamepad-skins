/* CYBER NEXUS — WuWa V2 experimental skin customizer.
   Presentation only: the original main.js Gamepad API mapping is unchanged. */
(()=>{"use strict";
const stateKey="cybernexus-wuwa-v2";
const themes={jade:"skin-jade.svg",dark:"skin-dark.svg",aqua:"skin-aqua.svg"};
const icons={wave:"resonance-emblem.svg",pulse:"pulse.svg",orbit:"orbit.svg"};
const root=document.documentElement, panel=document.getElementById("customizer"),
 toggle=document.getElementById("customizer-toggle"), skin=document.getElementById("skin-select"),
 icon=document.getElementById("icon-select"), color=document.getElementById("color-select"),
 colorValue=document.getElementById("color-value"), reset=document.getElementById("reset-customizer"),
 swatches=[...document.querySelectorAll("[data-preset-color]")];
const initial={skin:"jade",icon:"wave",color:"#00d8c0"};
const isHex=x=>typeof x==="string"&&/^#[0-9a-f]{6}$/i.test(x);
let saved={};try{saved=JSON.parse(localStorage.getItem(stateKey)||"{}")||{}}catch(_){}
const state={...initial,...saved};
if(!(state.skin in themes))state.skin="jade";
if(!(state.icon in icons))state.icon="wave";
if(!isHex(state.color))state.color=initial.color;
function hue(hex){const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(!d)return 0;let h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;return (h*60+360)%360}
function apply(){
 const shift=Math.round(hue(state.color)-hue(initial.color));
 root.style.setProperty("--hue-shift",shift+"deg");
 root.style.setProperty("--skin-image",'url("assets/'+themes[state.skin]+'")');
 root.style.setProperty("--stick-icon",'url("assets/'+icons[state.icon]+'")');
 skin.value=state.skin;icon.value=state.icon;color.value=state.color;colorValue.textContent=state.color.toUpperCase();
 for(const el of swatches)el.setAttribute("aria-pressed",String(el.dataset.presetColor.toLowerCase()===state.color.toLowerCase()));
 try{localStorage.setItem(stateKey,JSON.stringify(state))}catch(_){}
}
skin.addEventListener("change",()=>{state.skin=skin.value;apply()});
icon.addEventListener("change",()=>{state.icon=icon.value;apply()});
color.addEventListener("input",()=>{state.color=color.value;apply()});
swatches.forEach(el=>el.addEventListener("click",()=>{state.color=el.dataset.presetColor;apply()}));
reset.addEventListener("click",()=>{Object.assign(state,initial);apply()});
toggle.addEventListener("click",()=>{panel.classList.toggle("hidden");toggle.setAttribute("aria-expanded",String(!panel.classList.contains("hidden")))});
if(new URLSearchParams(location.search).get("overlay")==="1"){panel.classList.add("hidden");toggle.hidden=true}
apply();
})();
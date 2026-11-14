/* CYBER NEXUS — Gamepad Customize V2 RGB.
   Visual-only and OBS-export friendly: visible RGB state is encoded into
   classes and inline custom properties, preserved by stream-export.js. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const layer=$("rgb-layer"),enabled=$("rgb-enabled"),effect=$("rgb-effect"),
 color=$("rgb-color"),brightness=$("rgb-brightness"),speed=$("rgb-speed"),
 brightnessValue=$("rgb-brightness-value"),speedValue=$("rgb-speed-value"),reset=$("rgb-reset"),
 zones=["outline","sticks","touchpad","shoulders"];
if(!layer||!enabled||!effect||!color||!brightness||!speed)return;
const key="cybernexus-gamepad-rgb-v2";
const initial={enabled:true,effect:"static",color:"#00edff",brightness:65,speed:50,outline:true,sticks:true,touchpad:true,shoulders:true};
let state={...initial};
try{const saved=JSON.parse(localStorage.getItem(key)||"{}");if(saved&&typeof saved==="object")state={...state,...saved}}catch(_){}
function clamp(x,a,b){const n=Number(x);return Number.isFinite(n)?Math.min(b,Math.max(a,n)):a}
function render(syncColor=true){
 if(!["static","breathing","rainbow","pulse"].includes(state.effect))state.effect="static";
 if(!/^#[0-9a-f]{6}$/i.test(state.color))state.color=initial.color;
 state.brightness=clamp(state.brightness,10,100);
 state.speed=clamp(state.speed,10,100);
 enabled.value=state.enabled?"on":"off";effect.value=state.effect;
 if(syncColor)color.value=state.color;
 brightness.value=state.brightness;speed.value=state.speed;
 brightnessValue.textContent=state.brightness+"%";speedValue.textContent=state.speed+"%";
 layer.classList.toggle("rgb-off",!state.enabled);
 for(const name of ["static","breathing","rainbow","pulse"])layer.classList.toggle("rgb-effect-"+name,state.effect===name);
 for(const zone of zones){$( "rgb-"+zone).checked=Boolean(state[zone]);layer.classList.toggle("rgb-no-"+zone,!state[zone])}
 // 6s slow through 0.9s fast, perceptually progressive.
 const duration=(6.5-(state.speed/100)*5.5).toFixed(2)+"s";
 const opacity=(state.brightness/100).toFixed(2);
 layer.style.setProperty("--rgb-color",state.color);
 layer.style.setProperty("--rgb-duration",duration);
 layer.style.setProperty("--rgb-opacity",opacity);
 layer.style.opacity=state.enabled?opacity:"0";
 // Animated effects own the opacity property; remove static inline override.
 if(state.enabled&&state.effect!=="static")layer.style.removeProperty("opacity");
 // Persist visual mode as CSS classes and inline properties so OBS HTML exports
 // retain exactly the chosen RGB effect without reloading this editor's script.
 try{localStorage.setItem(key,JSON.stringify(state))}catch(_){}
}
enabled.addEventListener("change",()=>{state.enabled=enabled.value==="on";render()});
effect.addEventListener("change",()=>{state.effect=effect.value;render()});
color.addEventListener("input",()=>{state.color=color.value;render(false)});
color.addEventListener("change",()=>{state.color=color.value;render()});
brightness.addEventListener("input",()=>{state.brightness=Number(brightness.value);render()});
speed.addEventListener("input",()=>{state.speed=Number(speed.value);render()});
for(const zone of zones)$( "rgb-"+zone).addEventListener("change",e=>{state[zone]=e.target.checked;render()});
reset.addEventListener("click",()=>{state={...initial};render()});
render();
})();
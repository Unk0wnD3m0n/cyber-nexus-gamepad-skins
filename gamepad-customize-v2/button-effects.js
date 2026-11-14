/* CYBER NEXUS — V2 press-triggered gamepad effects.
 * A visual observer of the original, untouched main.js "pressed" classes.
 * Also runs in OBS exported HTML without the customizer panel. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const stage=document.querySelector(".stage"),art=document.querySelector(".controller-art"),layer=$("button-fx-layer");
if(!stage||!art||!layer)return;
const inputs=[...art.querySelectorAll(".part[data-button]")];
const key="cybernexus-button-effects-v2";
const defaults=()=>({enabled:true,style:"auto",strength:65,duration:450,face:true,dpad:true,shoulders:true,sticks:true,system:false});
const validStyles=new Set(["auto","ice","resonance","electric","fire"]);
const groups={face:new Set([0,1,2,3]),shoulders:new Set([4,5,6,7]),dpad:new Set([12,13,14,15]),sticks:new Set([10,11]),system:new Set([8,9,16,17])};
const groupFor=id=>Object.keys(groups).find(name=>groups[name].has(id))||"system";
let state=defaults();
try{const data=JSON.parse(localStorage.getItem(key)||"{}");if(data&&typeof data==="object")state={...state,...data}}catch(_){}
const clamp=(value,min,max,fallback)=>{const n=Number(value);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback};
const chooseStyle=()=>state.style==="auto"?({mk1:"ice",wuwa:"resonance",nte:"electric"}[stage.dataset.fxGame]||"resonance"):state.style;
function validate(){
 if(!validStyles.has(state.style))state.style="auto";
 state.enabled=state.enabled!==false;
 state.strength=clamp(state.strength,20,100,65);
 state.duration=clamp(state.duration,250,950,450);
 for(const group of Object.keys(groups))state[group]=state[group]===true;
}
function persist(){try{localStorage.setItem(key,JSON.stringify(state))}catch(_){}}
function applyToStage(){
 validate();
 stage.dataset.fxEnabled=state.enabled?"on":"off";
 stage.dataset.fxStyle=state.style;
 stage.dataset.fxStrength=String(state.strength);
 stage.dataset.fxDuration=String(state.duration);
 for(const group of Object.keys(groups))stage.dataset["fx"+group[0].toUpperCase()+group.slice(1)]=state[group]?"on":"off";
}
function restoreFromStage(){
 const attr=stage.dataset;
 if(attr.fxEnabled===undefined)return;
 state.enabled=attr.fxEnabled==="on";
 if(validStyles.has(attr.fxStyle))state.style=attr.fxStyle;
 state.strength=clamp(attr.fxStrength,20,100,65);
 state.duration=clamp(attr.fxDuration,250,950,450);
 for(const group of Object.keys(groups)){
  const data=attr["fx"+group[0].toUpperCase()+group.slice(1)];
  if(data!==undefined)state[group]=data==="on";
 }
 validate();
}
const select=$("game-select"),enabled=$("fx-enabled"),style=$("fx-style"),
 strength=$("fx-strength"),duration=$("fx-duration"),
 preview=$("fx-preview"),reset=$("fx-reset"),status=$("fx-status");
const isEditor=Boolean(enabled&&style&&strength&&duration);
// Editor settings come from localStorage; OBS export has no editor and uses
// data-fx-* embedded on the cloned stage by stream-export.js.
if(!isEditor)restoreFromStage();
function updateEditor(){
 if(!isEditor)return;
 enabled.value=state.enabled?"on":"off";style.value=state.style;
 strength.value=state.strength;duration.value=state.duration;
 $("fx-strength-value").textContent=state.strength+"%";
 $("fx-duration-value").textContent=state.duration+" ms";
 for(const group of Object.keys(groups)){const input=$("fx-"+group);if(input)input.checked=state[group]}
}
function saveAndRender(){applyToStage();updateEditor();persist()}
if(isEditor){
 enabled.addEventListener("change",()=>{state.enabled=enabled.value==="on";saveAndRender()});
 style.addEventListener("change",()=>{state.style=style.value;saveAndRender()});
 strength.addEventListener("input",()=>{state.strength=Number(strength.value);saveAndRender()});
 duration.addEventListener("input",()=>{state.duration=Number(duration.value);saveAndRender()});
 for(const group of Object.keys(groups))$("fx-"+group)?.addEventListener("change",e=>{state[group]=e.target.checked;saveAndRender()});
 reset?.addEventListener("click",()=>{state=defaults();saveAndRender();if(status)status.textContent="Efectos restaurados."});
 preview?.addEventListener("click",()=>{
  const sample=art.querySelector('.part.face.cross')||inputs[0];
  burst(sample,true);
  if(status)status.textContent="Vista previa generada. Conecta el mando para probar cada botón.";
 });
}
saveAndRender();
function spawnParticle(parent,index,count){
 const particle=document.createElement("i");
 particle.className="button-fx-particle";
 const angle=(index/count)*Math.PI*2+Math.PI/8;
 const distance=30+(state.strength/100)*32+(index%3)*4;
 particle.style.setProperty("--dx",Math.cos(angle)*distance+"px");
 particle.style.setProperty("--dy",Math.sin(angle)*distance+"px");
 particle.style.setProperty("--twist",(index%2?75:-75)+"deg");
 particle.style.setProperty("--delay",(index%3)*24+"ms");
 parent.append(particle);
}
function burst(part,forced=false){
 if(!state.enabled&&!forced)return;
 const button=Number(part.dataset.button);
 if(!forced&&!state[groupFor(button)])return;
 // Coordinates are fixed 806x598 art units, so CSS scaling in main.js is safe.
 const x=part.offsetLeft+part.offsetWidth/2,y=part.offsetTop+part.offsetHeight/2;
 const wrap=document.createElement("div");
 wrap.className="button-fx-burst fx-"+chooseStyle();
 wrap.style.left=x+"px";wrap.style.top=y+"px";
 wrap.style.setProperty("--fx-duration",state.duration+"ms");
 wrap.style.setProperty("--fx-intensity",String(state.strength/100));
 wrap.style.setProperty("--fx-scale",String(.7+state.strength/100*.55));
 const ring=document.createElement("span");ring.className="button-fx-ring";wrap.append(ring);
 const core=document.createElement("span");core.className="button-fx-core";wrap.append(core);
 const count=state.strength>=75?10:7;
 for(let i=0;i<count;i++)spawnParticle(wrap,i,count);
 layer.append(wrap);
 // Remove after last CSS animation ends; cap simultaneous effects.
 setTimeout(()=>wrap.remove(),state.duration+210);
 if(layer.childElementCount>38)layer.firstElementChild?.remove();
}
const previous=new WeakMap();
for(const part of inputs)previous.set(part,part.classList.contains("pressed"));
function frame(){
 if(select&&select.value)stage.dataset.fxGame=select.value;
 // On exported viewers game-select is removed; game is frozen in stage.dataset.fxGame.
 for(const part of inputs){
  const pressed=part.classList.contains("pressed");
  if(pressed&&!previous.get(part))burst(part);
  previous.set(part,pressed);
 }
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
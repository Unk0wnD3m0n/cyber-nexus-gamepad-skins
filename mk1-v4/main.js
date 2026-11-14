/* CYBER NEXUS MK1 V4: preserving the proven V2 standard Gamepad API mapping. */
(()=>{'use strict';
const stage=document.querySelector('.stage'),parts=[...document.querySelectorAll('[data-button]')],ls=document.querySelector('.stick.ls'),rs=document.querySelector('.stick.rs');
let padIndex=null;const query=new URLSearchParams(location.search);
if(query.get('bg')==='1')document.body.classList.add('show-bg');
function resize(){document.documentElement.style.setProperty('--zoom',Math.min(innerWidth/806,innerHeight/598).toFixed(4));}
addEventListener('resize',resize);resize();
function frame(){
const pads=navigator.getGamepads?.()||[];let pad=padIndex!==null?pads[padIndex]:null;
if(!pad){pad=[...pads].find(p=>p&&p.connected);if(pad)padIndex=pad.index;}
const valid=Boolean(pad&&pad.connected);stage.classList.toggle('connected',valid);
if(valid){
for(const el of parts){const button=pad.buttons[Number(el.dataset.button)];const pressed=!!(button&&(button.pressed||button.value>.5));el.classList.toggle('pressed',pressed);if(el.classList.contains('trigger'))el.style.setProperty('--pressure',(button?.value||0).toFixed(3));}
[[ls,0,1],[rs,2,3]].forEach(([el,x,y])=>{const vx=Math.abs(pad.axes[x]||0)>.07?pad.axes[x]:0;const vy=Math.abs(pad.axes[y]||0)>.07?pad.axes[y]:0;el.style.setProperty('--x',Math.round(vx*11)+'px');el.style.setProperty('--y',Math.round(vy*11)+'px');});
}
requestAnimationFrame(frame);
}
addEventListener('gamepadconnected',e=>{padIndex=e.gamepad.index});
addEventListener('gamepaddisconnected',e=>{if(padIndex===e.gamepad.index)padIndex=null});
requestAnimationFrame(frame);
})();
/* Prince.OS 3D object suite — physical-feeling interactions. */
(()=>{if(window.__prince3DObjects)return;window.__prince3DObjects=true;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];

function dna(){
 const root=q('.os-dna');if(!root)return;root.innerHTML='';
 const n=96,h=286,cx=80,amp=47,turns=2.35,step=h/(n-1),strands=[[],[]];
 for(let i=0;i<n;i++){const y=8+i*step,a=i/(n-1)*Math.PI*2*turns-Math.PI/2;
   strands[0].push([cx+Math.cos(a)*amp,y,Math.sin(a)*amp]);
   strands[1].push([cx+Math.cos(a+Math.PI)*amp,y,Math.sin(a+Math.PI)*amp]);
 }
 const tube=(a,b,cls)=>{
   const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],len=Math.hypot(dx,dy,dz),mid=[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2],horiz=Math.hypot(dx,dz);
   const el=document.createElement('i');el.className=cls;el.style.left=mid[0]+'px';el.style.top=mid[1]+'px';el.style.width=(len+2)+'px';
   el.style.transform='translate3d(0,0,'+mid[2]+'px) rotateY('+(-Math.atan2(dz,dx)*180/Math.PI)+'deg) rotateZ('+Math.atan2(dy,horiz)*180/Math.PI+'deg)';return el;
 };
 strands.forEach((pts,s)=>{for(let i=0;i<n-1;i++)root.appendChild(tube(pts[i],pts[i+1],'os-dna-tube '+(s?'red':'blue')))});
 for(let i=3;i<n-3;i+=5){const r=tube(strands[0][i],strands[1][i],'os-dna-rung');r.dataset.pair=['A—T','T—A','C—G','G—C'][i%4];root.appendChild(r)}
}
function dragDna(){
 const root=q('.os-dna'),stage=root?.parentElement;if(!root||!stage)return;
 let down=false,sx=0,sy=0,ry=0,rx=0,vx=.004,vy=0,last=0;
 const apply=()=>root.style.transform='rotateX('+rx+'deg) rotateY('+ry+'rad)';
 const tick=()=>{if(!down&&!reduce){ry+=.004+vx;vx*=.985;rx+=vy;vy*=.93;rx=Math.max(-.22,Math.min(.22,rx));apply()}requestAnimationFrame(tick)};requestAnimationFrame(tick);
 stage.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sy=e.clientY;last=performance.now();vx=0;vy=0;stage.setPointerCapture?.(e.pointerId)});
 stage.addEventListener('pointermove',e=>{if(!down)return;const now=performance.now(),dt=Math.max(8,now-last),dx=e.clientX-sx,dy=e.clientY-sy;vx=dx/dt*.004;vy=-dy/dt*.0009;ry+=dx*.012;rx=Math.max(-.22,Math.min(.22,rx-dy*.002));sx=e.clientX;sy=e.clientY;last=now;apply()});
 const up=()=>down=false;stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
}

const FACE_NAMES=['U','R','F','D','L','B'],COLORS={U:'#f7f7f7',R:'#d93a35',F:'#35a95a',D:'#f1d84b',L:'#f28c28',B:'#2f78d0'};
const DIRS={U:[0,1,0],D:[0,-1,0],R:[1,0,0],L:[-1,0,0],F:[0,0,1],B:[0,0,-1]};
function rotVec(v,axis,dir){const[x,y,z]=v;if(axis==='x')return dir>0?[x,-z,y]:[x,z,-y];if(axis==='y')return dir>0?[z,y,-x]:[-z,y,x];return dir>0?[-y,x,z]:[y,-x,z]}
function buildCubies(){const out=[];for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){const stickers=[];for(const f of FACE_NAMES){const d=DIRS[f];if(x*d[0]+y*d[1]+z*d[2]===1)stickers.push({n:[...d],c:f})}out.push({p:[x,y,z],stickers})}return out}
function rotateLayerAxis(cubies,axis,side,dir){const index={x:0,y:1,z:2}[axis];cubies.forEach(c=>{if(c.p[index]===side){c.p=rotVec(c.p,axis,dir);c.stickers.forEach(s=>s.n=rotVec(s.n,axis,dir))}})}
function stickerName(n){for(const f of FACE_NAMES){const d=DIRS[f];if(d[0]===n[0]&&d[1]===n[1]&&d[2]===n[2])return f}return 'U'}
function cubieMarkup(c,id){
 const el=document.createElement('div');el.className='os-rubik-cubie';el.dataset.id=id;el.style.transform='translate3d('+(c.p[0]*51)+'px,'+(-c.p[1]*51)+'px,'+(c.p[2]*51)+'px)';
 const faces=[['front',[0,0,1]],['back',[0,0,-1]],['right',[1,0,0]],['left',[-1,0,0]],['top',[0,1,0]],['bottom',[0,-1,0]]];
 faces.forEach(([name,n])=>{const s=c.stickers.find(v=>v.n[0]===n[0]&&v.n[1]===n[1]&&v.n[2]===n[2]);if(!s)return;const f=document.createElement('i');f.className='os-rubik-sticker '+name;f.dataset.face=stickerName(s.n);f.style.background=COLORS[s.c];f.setAttribute('aria-label',f.dataset.face+' sticker');el.appendChild(f)});return el;
}
function rubik(){
 const wrap=q('.os-rubik-wrap'),old=q('.os-rubik');if(!wrap||!old)return;
 let cubies=buildCubies(),rx=-25,ry=-35,busy=false,selected=null,gesture=null;
 old.remove();const cube=document.createElement('div');cube.className='os-rubik';wrap.appendChild(cube);
 const stage=wrap.parentElement;
 const info=stage.parentElement.querySelector('[data-rubik-info] p');
 const controls=document.createElement('div');controls.className='os-rubik-controls';
 const status=document.createElement('span');status.className='os-rubik-move-status';status.textContent='TAP A ROW / COLUMN';controls.appendChild(status);
 const setView=()=>cube.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
 const render=()=>{cube.innerHTML='';cubies.forEach((c,i)=>cube.appendChild(cubieMarkup(c,i)));setView();highlight()};
 const axisIndex={x:0,y:1,z:2};
 const selectionFor=(face,c)=>{
   const p=c.p, maps={
    F:{row:['y',p[1]],col:['x',p[0]]},B:{row:['y',p[1]],col:['x',p[0]]},
    R:{row:['y',p[1]],col:['z',p[2]]},L:{row:['y',p[1]],col:['z',p[2]]},
    U:{row:['z',p[2]],col:['x',p[0]]},D:{row:['z',p[2]],col:['x',p[0]]}
   },m=maps[face];
   return {face,rowAxis:m.row[0],rowSide:m.row[1],colAxis:m.col[0],colSide:m.col[1],id:c.p.join(',')};
 };
 const highlight=()=>{qa('.os-rubik-sticker',cube).forEach(s=>s.classList.remove('selected-row','selected-col','selected-source'));if(!selected)return;
   const ri=axisIndex[selected.rowAxis],ci=axisIndex[selected.colAxis];
   cubies.forEach((c,i)=>{const el=cube.children[i];if(!el)return;qa('.os-rubik-sticker',el).forEach(s=>{if(c.p[ri]===selected.rowSide)s.classList.add('selected-row');if(c.p[ci]===selected.colSide)s.classList.add('selected-col');if(c.p.join(',')===selected.id&&s.dataset.face===selected.face)s.classList.add('selected-source')})});
   status.textContent=selected.face+' SELECTED · SWIPE ↔ ROW / ↕ COLUMN';
   if(info)info.textContent='Selected '+selected.face+' layer — swipe horizontally for the highlighted row or vertically for the highlighted column.';
 };
 const animateLayer=(axis,side,dir,label)=>{
   if(busy)return false;busy=true;
   const index=axisIndex[axis],layer=document.createElement('div');layer.className='os-rubik-turn-layer';
   const chosen=cubies.filter(c=>c.p[index]===side);
   chosen.forEach(c=>{const el=cube.querySelector('[data-id="'+c.p.join(',')+'"]');if(el)layer.appendChild(el)});
   cube.appendChild(layer);layer.style.transform='rotate'+axis.toUpperCase()+'('+(dir*90)+'deg)';
   const finish=()=>{rotateLayerAxis(cubies,axis,side,dir);layer.remove();render();busy=false;status.textContent=label||'MOVE COMPLETE'};
   if(reduce)finish();else{layer.addEventListener('transitionend',finish,{once:true});setTimeout(()=>{if(busy)finish()},430)}return true;
 };
 const faceMove=(face,clock=true)=>{const axis={U:'y',D:'y',R:'x',L:'x',F:'z',B:'z'}[face],side={U:1,D:-1,R:1,L:-1,F:1,B:-1}[face];return animateLayer(axis,side,clock?side:-side,face+(clock?'':'′'))};
 const addButton=(label,title,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.title=title;b.addEventListener('click',fn);controls.appendChild(b);return b};
 FACE_NAMES.forEach(f=>addButton(f,'Turn '+f+' face clockwise',()=>faceMove(f,true)));
 addButton("R'",'Turn the last face counter-clockwise',()=>faceMove(controls.dataset.last||'F',false));
 addButton('SCRAMBLE','Scramble using legal quarter turns',async()=>{if(busy)return;selected=null;highlight();let last='';for(let i=0;i<20;i++){let f;do{f=FACE_NAMES[Math.floor(Math.random()*6)]}while(f===last);last=f;controls.dataset.last=f;faceMove(f,Math.random()>.5);await new Promise(r=>setTimeout(r,reduce?20:455))}status.textContent='SCRAMBLED'});
 addButton('RESET','Return to solved cube',()=>{if(busy)return;cubies=buildCubies();selected=null;render();status.textContent='SOLVED'});
 stage.parentElement.appendChild(controls);
 const stickerStart=e=>{if(busy)return;const sticker=e.target.closest('.os-rubik-sticker'),cubieEl=sticker?.closest('.os-rubik-cubie');if(!sticker||!cubieEl)return;
   const id=cubieEl.dataset.id,idx=cubies.findIndex(c=>c.p.join(',')===id),c=cubies[idx];selected=selectionFor(sticker.dataset.face,c);selected.id=id;highlight();gesture={x:e.clientX,y:e.clientY,started:false,face:sticker.dataset.face,c};
   wrap.setPointerCapture?.(e.pointerId);e.stopPropagation();
 };
 wrap.addEventListener('pointerdown',e=>{if(e.target.closest('.os-rubik-sticker')){stickerStart(e);return}gesture={x:e.clientX,y:e.clientY,started:false};wrap.setPointerCapture?.(e.pointerId)});
 wrap.addEventListener('pointermove',e=>{if(!gesture||busy)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(!gesture.started&&Math.hypot(dx,dy)>9){gesture.started=true;
   if(gesture.c){const sel=selected,vertical=Math.abs(dy)>Math.abs(dx),axis=vertical?sel.colAxis:sel.rowAxis,side=vertical?sel.colSide:sel.rowSide,dir=vertical?(dy<0?1:-1):(dx>0?1:-1);animateLayer(axis,side,dir,axis.toUpperCase()+' SLICE');}
   else{rx-=dy*.5;ry+=dx*.5;rx=Math.max(-75,Math.min(75,rx));setView()}
 }else if(gesture.started&&!gesture.c){rx-=dy*.5;ry+=dx*.5;rx=Math.max(-75,Math.min(75,rx));setView();gesture.x=e.clientX;gesture.y=e.clientY}});
 const finishGesture=()=>{gesture=null};wrap.addEventListener('pointerup',finishGesture);wrap.addEventListener('pointercancel',finishGesture);
 render();
}
function tiltPlanet(){const s=q('.os-planet-system');if(!s||reduce)return;let raf=0;s.parentElement.addEventListener('pointermove',e=>{const r=s.parentElement.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>s.style.transform='rotateX('+(-y*7)+'deg) rotateY('+(x*9)+'deg)')},{passive:true});s.parentElement.addEventListener('pointerleave',()=>s.style.transform='',{passive:true})}
function dragGyro(){const root=q('.os-gyro'),stage=q('[data-gyro-stage]');if(!root||!stage)return;let down=false,sx=0,sy=0,rx=0,ry=0;stage.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sy=e.clientY;stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointermove',e=>{if(!down)return;ry+=(e.clientX-sx)*.35;rx-=(e.clientY-sy)*.35;sx=e.clientX;sy=e.clientY;root.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)'});stage.addEventListener('pointerup',()=>down=false);stage.addEventListener('pointercancel',()=>down=false)}
function init(){dna();dragDna();tiltPlanet();dragGyro();rubik()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
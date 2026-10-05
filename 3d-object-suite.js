/* Prince.OS 3D object suite — physical-feeling interactions. */
(()=>{if(window.__prince3DObjects)return;window.__prince3DObjects=true;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];

function dna(){
 const host=q('.os-dna');if(!host)return;
 host.innerHTML='';
 const canvas=document.createElement('canvas');canvas.className='os-dna-canvas';canvas.setAttribute('aria-label','Interactive 3D DNA double helix');host.appendChild(canvas);
 const ctx=canvas.getContext('2d',{alpha:true});
 const state={ry:0,rx:-0.08,vx:.004,vy:0,down:false,sx:0,sy:0,last:0};
 const points=[];
 const N=260,H=286,AMP=55,TURNS=2.35;
 for(let i=0;i<N;i++){const t=i/(N-1),a=t*Math.PI*2*TURNS-Math.PI/2,y=(t-.5)*H;
   points.push({a,y,x:Math.cos(a)*AMP,z:Math.sin(a)*AMP});
   points.push({a:a+Math.PI,y,x:Math.cos(a+Math.PI)*AMP,z:Math.sin(a+Math.PI)*AMP});
 }
 const resize=()=>{const r=host.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.max(1,Math.round(r.width*d));canvas.height=Math.max(1,Math.round(r.height*d));canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(d,0,0,d,0,0)};
 new ResizeObserver(resize).observe(host);resize();
 const project=(p)=>{
   let x=p.x,y=p.y,z=p.z;
   const cy=Math.cos(state.ry),sy=Math.sin(state.ry);let X=x*cy-z*sy,Z=x*sy+z*cy;
   const cx=Math.cos(state.rx),sx=Math.sin(state.rx);let Y=y*cx-Z*sx;Z=y*sx+Z*cx;
   const scale=1/(1+Z/700),r=host.clientWidth/2;
   return {x:r+X*scale,y:host.clientHeight/2+Y*scale,z:Z,scale};
 };
 const tubeGradient=(p1,p2,red)=>{const g=ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);if(red){g.addColorStop(0,'#4d0508');g.addColorStop(.28,'#b80d15');g.addColorStop(.52,'#ff3440');g.addColorStop(.72,'#d3151e');g.addColorStop(1,'#52060a')}else{g.addColorStop(0,'#021b50');g.addColorStop(.28,'#0647c7');g.addColorStop(.52,'#1680ff');g.addColorStop(.72,'#0754d6');g.addColorStop(1,'#031d58')}return g};
 const draw=()=>{
   const w=host.clientWidth,h=host.clientHeight;ctx.clearRect(0,0,w,h);
   const glow=ctx.createRadialGradient(w/2,h/2,20,w/2,h/2,170);glow.addColorStop(0,'rgba(80,140,255,.12)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
   const A=[],B=[];for(let i=0;i<N;i++){A.push(project(points[i*2]));B.push(project(points[i*2+1]));}
   const segments=[];
   for(let i=0;i<N-1;i++){segments.push({a:A[i],b:A[i+1],red:false});segments.push({a:B[i],b:B[i+1],red:true});}
   for(let i=0;i<N-1;i+=8)segments.push({a:A[i],b:B[i],red:null});
   segments.sort((u,v)=>((u.a.z+u.b.z)/2)-((v.a.z+v.b.z)/2));
   segments.forEach(s=>{
     const p=s.a,q=s.b;
     if(s.red===null){ctx.save();ctx.lineCap='round';ctx.lineWidth=6;const g=ctx.createLinearGradient(p.x,p.y,q.x,q.y);g.addColorStop(0,'rgba(225,235,245,.75)');g.addColorStop(.5,'rgba(255,255,255,.95)');g.addColorStop(1,'rgba(130,145,165,.65)');ctx.strokeStyle=g;ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.restore();return}
     const alpha=Math.max(.38,Math.min(1,.58+((p.z+q.z)/2+AMP)/AMP*.22));ctx.save();ctx.globalAlpha=alpha;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=20;ctx.strokeStyle=tubeGradient(p,q,s.red);ctx.shadowColor=s.red?'rgba(130,0,8,.42)':'rgba(0,60,170,.42)';ctx.shadowBlur=9;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
     ctx.globalAlpha=Math.min(1,alpha*.55);ctx.lineWidth=4;ctx.strokeStyle='rgba(255,255,255,.5)';ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(p.x,p.y-2);ctx.lineTo(q.x,q.y-2);ctx.stroke();ctx.restore();
   });
 };
 const tick=()=>{if(!state.down&&!reduce){state.ry+=.0038+state.vx;state.vx*=.985;state.rx+=state.vy;state.vy*=.93;state.rx=Math.max(-.24,Math.min(.24,state.rx))}draw();requestAnimationFrame(tick)};requestAnimationFrame(tick);
 const down=e=>{state.down=true;state.sx=e.clientX;state.sy=e.clientY;state.last=performance.now();state.vx=0;state.vy=0;host.setPointerCapture?.(e.pointerId)};
 const move=e=>{if(!state.down)return;const now=performance.now(),dt=Math.max(8,now-state.last),dx=e.clientX-state.sx,dy=e.clientY-state.sy;state.vx=dx/dt*.0035;state.vy=-dy/dt*.0008;state.ry+=dx*.010;state.rx=Math.max(-.24,Math.min(.24,state.rx-dy*.0018));state.sx=e.clientX;state.sy=e.clientY;state.last=now};
 host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',()=>state.down=false);host.addEventListener('pointercancel',()=>state.down=false);
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
 const render=()=>{cube.innerHTML='';cubies.forEach(c=>cube.appendChild(cubieMarkup(c,c.p.join(','))));setView();highlight()};
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
   const id=cubieEl.dataset.id,idx=cubies.findIndex(c=>c.p.join(',')===id),c=cubies[idx];if(!c)return;selected=selectionFor(sticker.dataset.face,c);selected.id=id;highlight();gesture={x:e.clientX,y:e.clientY,started:false,face:sticker.dataset.face,c};
   wrap.setPointerCapture?.(e.pointerId);e.stopPropagation();
 };
 wrap.addEventListener('pointerdown',e=>{if(e.target.closest('.os-rubik-sticker')){stickerStart(e);return}gesture={x:e.clientX,y:e.clientY,started:false};wrap.setPointerCapture?.(e.pointerId)});
 wrap.addEventListener('pointermove',e=>{if(!gesture||busy)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(!gesture.started&&Math.hypot(dx,dy)>9){gesture.started=true;
   if(gesture.c){const sel=selected,vertical=Math.abs(dy)>Math.abs(dx),axis=vertical?sel.colAxis:sel.rowAxis,side=vertical?sel.colSide:sel.rowSide,dir=vertical?(dy<0?1:-1):(dx>0?1:-1);animateLayer(axis,side,dir,(vertical?'COLUMN':'ROW')+' ROTATED');}
   else{rx-=dy*.5;ry+=dx*.5;rx=Math.max(-75,Math.min(75,rx));setView()}
 }else if(gesture.started&&!gesture.c){rx-=dy*.5;ry+=dx*.5;rx=Math.max(-75,Math.min(75,rx));setView();gesture.x=e.clientX;gesture.y=e.clientY}});
 const finishGesture=()=>{gesture=null};wrap.addEventListener('pointerup',finishGesture);wrap.addEventListener('pointercancel',finishGesture);
 render();
}
function tiltPlanet(){const s=q('.os-planet-system');if(!s||reduce)return;let raf=0;s.parentElement.addEventListener('pointermove',e=>{const r=s.parentElement.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>s.style.transform='rotateX('+(-y*7)+'deg) rotateY('+(x*9)+'deg)')},{passive:true});s.parentElement.addEventListener('pointerleave',()=>s.style.transform='',{passive:true})}
function dragGyro(){const root=q('.os-gyro'),stage=q('[data-gyro-stage]');if(!root||!stage)return;let down=false,sx=0,sy=0,rx=0,ry=0;stage.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sy=e.clientY;stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointermove',e=>{if(!down)return;ry+=(e.clientX-sx)*.35;rx-=(e.clientY-sy)*.35;sx=e.clientX;sy=e.clientY;root.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)'});stage.addEventListener('pointerup',()=>down=false);stage.addEventListener('pointercancel',()=>down=false)}
function init(){[dna,dragDna,tiltPlanet,dragGyro,rubik].forEach(fn=>{try{fn()}catch(err){console.warn('Prince.OS visual module skipped:',fn.name,err)}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
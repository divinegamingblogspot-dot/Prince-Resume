/* Prince.OS 3D object suite — physical-feeling interactions. */
(()=>{if(window.__prince3DObjects)return;window.__prince3DObjects=true;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

function dna(){
 const root=q('.os-dna'); if(!root)return; root.innerHTML='';
 const n=64,h=260,cx=75,amp=43,turns=2.25,step=h/(n-1);
 const strands=[[],[]];
 for(let i=0;i<n;i++){
   const y=10+i*step, a=i/(n-1)*Math.PI*2*turns-Math.PI/2;
   strands[0].push([cx+Math.cos(a)*amp,y,Math.sin(a)*amp]);
   strands[1].push([cx+Math.cos(a+Math.PI)*amp,y,Math.sin(a+Math.PI)*amp]);
 }
 const tube=(p1,p2,cls)=>{
   const dx=p2[0]-p1[0],dy=p2[1]-p1[1],dz=p2[2]-p1[2];
   const len=Math.hypot(dx,dy,dz),midX=(p1[0]+p2[0])/2,midY=(p1[1]+p2[1])/2,midZ=(p1[2]+p2[2])/2;
   const horiz=Math.hypot(dx,dz);
   const el=document.createElement('i'); el.className=cls;
   el.style.left=midX+'px'; el.style.top=midY+'px'; el.style.width=len+'px';
   el.style.transform='translate3d(0,0,'+midZ+'px) rotateY('+(-Math.atan2(dz,dx)*180/Math.PI)+'deg) rotateZ('+Math.atan2(dy,horiz)*180/Math.PI+'deg)';
   return el;
 };
 strands.forEach((pts,s)=>{for(let i=0;i<n-1;i++)root.appendChild(tube(pts[i],pts[i+1],'os-dna-tube '+(s?'red':'blue')));});
 for(let i=1;i<n-1;i+=3){
   const a=strands[0][i],b=strands[1][i],r=tube(a,b,'os-dna-rung');
   r.dataset.pair=['A—T','T—A','C—G','G—C'][i%4]; root.appendChild(r);
 }
 const cap=(p,s)=>{const el=document.createElement('i');el.className='os-dna-cap '+(s?'red':'blue');el.style.left=p[0]+'px';el.style.top=p[1]+'px';el.style.transform='translateZ('+p[2]+'px)';root.appendChild(el)};
 cap(strands[0][0],0);cap(strands[1][0],1);cap(strands[0][n-1],0);cap(strands[1][n-1],1);
}
function dragDna(){
 const root=q('.os-dna'),stage=root?.parentElement;if(!root||!stage)return;
 let down=false,sx=0,sy=0,ry=0,rx=0,vx=.006,vy=0,last=0;
 const apply=()=>root.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
 const tick=(t)=>{if(!down&&!reduce){ry+=.036+vx;vx*=.985;rx+=vy;vy*=.93;rx=Math.max(-13,Math.min(13,rx));apply()}requestAnimationFrame(tick)};
 requestAnimationFrame(tick);
 stage.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sy=e.clientY;last=performance.now();vx=0;vy=0;stage.setPointerCapture?.(e.pointerId)});
 stage.addEventListener('pointermove',e=>{if(!down)return;const now=performance.now(),dt=Math.max(8,now-last),dx=e.clientX-sx,dy=e.clientY-sy;vx=dx/dt*.22;vy=-dy/dt*.055;ry+=dx*.5;rx=Math.max(-13,Math.min(13,rx-dy*.055));sx=e.clientX;sy=e.clientY;last=now;apply()});
 const up=()=>{down=false};stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
}

const FACE_NAMES=['U','R','F','D','L','B'],COLORS={U:'#f7f7f7',R:'#d93a35',F:'#35a95a',D:'#f1d84b',L:'#f28c28',B:'#2f78d0'};
const DIRS={U:[0,1,0],D:[0,-1,0],R:[1,0,0],L:[-1,0,0],F:[0,0,1],B:[0,0,-1]};
const colorForNormal=n=>{for(const k of FACE_NAMES){const d=DIRS[k];if(d[0]===n[0]&&d[1]===n[1]&&d[2]===n[2])return COLORS[k]}return '#111'};
const faceFromNormal=n=>FACE_NAMES.find(k=>DIRS[k][0]===n[0]&&DIRS[k][1]===n[1]&&DIRS[k][2]===n[2]);
function rotVec(v,axis,dir){let[x,y,z]=v;if(axis==='x')return dir>0?[x,-z,y]:[x,z,-y];if(axis==='y')return dir>0?[z,y,-x]:[-z,y,x];return dir>0?[-y,x,z]:[y,-x,z]}
function buildCubies(){
 const out=[];for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){
  const stickers=[];for(const f of FACE_NAMES){const d=DIRS[f];if(x*d[0]+y*d[1]+z*d[2]===1)stickers.push({n:[...d],c:f})}
  if(stickers.length)out.push({p:[x,y,z],stickers});
 }return out;
}
function rotateLayer(cubies,face,clock){
 const axis={U:'y',D:'y',R:'x',L:'x',F:'z',B:'z'}[face],side={U:1,D:-1,R:1,L:-1,F:1,B:-1}[face];
 const dir=clock?side:-side;
 cubies.forEach(c=>{if(c.p[{x:0,y:1,z:2}[axis]]===side){c.p=rotVec(c.p,axis,dir);c.stickers.forEach(s=>s.n=rotVec(s.n,axis,dir))}});
}
function cubieMarkup(c){
 const el=document.createElement('div');el.className='os-rubik-cubie';el.style.transform='translate3d('+(c.p[0]*51)+'px,'+(-c.p[1]*51)+'px,'+(c.p[2]*51)+'px)';
 const faces=[['front',[0,0,1]],['back',[0,0,-1]],['right',[1,0,0]],['left',[-1,0,0]],['top',[0,1,0]],['bottom',[0,-1,0]]];
 faces.forEach(([name,n])=>{const s=c.stickers.find(v=>v.n[0]===n[0]&&v.n[1]===n[1]&&v.n[2]===n[2]);if(!s)return;const f=document.createElement('i');f.className='os-rubik-sticker '+name;f.style.background=COLORS[s.c];el.appendChild(f)});return el;
}
function rubik(){
 const wrap=q('.os-rubik-wrap'),old=q('.os-rubik');if(!wrap||!old)return;
 const stage=wrap.parentElement;
 let cubies=buildCubies(),rx=-25,ry=-35,down=false,sx=0,sy=0,busy=false;
 old.remove();const cube=document.createElement('div');cube.className='os-rubik';wrap.appendChild(cube);
 const render=()=>{cube.innerHTML='';cubies.forEach(c=>cube.appendChild(cubieMarkup(c)))};
 render();
 const controls=document.createElement('div');controls.className='os-rubik-controls';
 const moveLabel=document.createElement('span');moveLabel.className='os-rubik-move-status';moveLabel.textContent='READY';
 const addButton=(label,title,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.title=title;b.addEventListener('click',fn);controls.appendChild(b);return b};
 const doMove=(face,clock=true)=>{
   if(busy)return;busy=true;controls.dataset.last=face;
   const axis={U:'y',D:'y',R:'x',L:'x',F:'z',B:'z'}[face],side={U:1,D:-1,R:1,L:-1,F:1,B:-1}[face];
   const dir=clock?side:-side;
   const layer=document.createElement('div');layer.className='os-rubik-turn-layer';
   [...cube.children].forEach((el,i)=>{const c=cubies[i];if(c.p[{x:0,y:1,z:2}[axis]]===side){layer.appendChild(el)}});
   cube.appendChild(layer);
   const deg=clock?90:-90;layer.style.transform='rotate'+axis.toUpperCase()+'('+deg+'deg)';
   const finish=()=>{rotateLayer(cubies,face,clock);layer.remove();render();busy=false;moveLabel.textContent=face+(clock?'':'′')};
   if(reduce)finish();else layer.addEventListener('transitionend',finish,{once:true});
   if(reduce){} else setTimeout(()=>{if(busy)finish()},430);
 };
 FACE_NAMES.forEach(f=>addButton(f,'Turn '+f+' face clockwise',()=>doMove(f,true)));
 addButton("R'",'Reverse the last face',()=>doMove(controls.dataset.last||'F',false));
 addButton('SCRAMBLE','Scramble with legal cube turns',async()=>{
   if(busy)return;const seq=[];let last='';for(let i=0;i<18;i++){let f;do{f=FACE_NAMES[Math.floor(Math.random()*6)]}while(f===last);last=f;seq.push([f,Math.random()>.5])}for(const [f,c] of seq){doMove(f,c);await new Promise(r=>setTimeout(r,reduce?20:455))}moveLabel.textContent='SCRAMBLED';
 });
 addButton('RESET','Return to solved state',()=>{if(busy)return;cubies=buildCubies();render();moveLabel.textContent='SOLVED'});
 controls.appendChild(moveLabel);stage.parentElement.appendChild(controls);
 const setView=()=>cube.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
 setView();
 wrap.addEventListener('pointerdown',e=>{if(e.target.closest('.os-rubik-sticker'))return;down=true;sx=e.clientX;sy=e.clientY;wrap.setPointerCapture?.(e.pointerId)});
 wrap.addEventListener('pointermove',e=>{if(!down||busy)return;ry+=(e.clientX-sx)*.5;rx-=(e.clientY-sy)*.5;rx=Math.max(-75,Math.min(75,rx));sx=e.clientX;sy=e.clientY;setView()});
 const up=()=>down=false;wrap.addEventListener('pointerup',up);wrap.addEventListener('pointercancel',up);
}
function tiltPlanet(){const s=q('.os-planet-system');if(!s||reduce)return;let raf=0;s.parentElement.addEventListener('pointermove',e=>{const r=s.parentElement.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>s.style.transform='rotateX('+(-y*7)+'deg) rotateY('+(x*9)+'deg)')},{passive:true});s.parentElement.addEventListener('pointerleave',()=>s.style.transform='',{passive:true})}
function dragGyro(){const root=q('.os-gyro'),stage=q('[data-gyro-stage]');if(!root||!stage)return;let down=false,sx=0,sy=0,rx=0,ry=0;stage.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sy=e.clientY;stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointermove',e=>{if(!down)return;ry+=(e.clientX-sx)*.35;rx-=(e.clientY-sy)*.35;sx=e.clientX;sy=e.clientY;root.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)'});stage.addEventListener('pointerup',()=>down=false);stage.addEventListener('pointercancel',()=>down=false)}
function init(){dna();dragDna();tiltPlanet();dragGyro();rubik()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
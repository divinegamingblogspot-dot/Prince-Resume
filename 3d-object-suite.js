/* Prince.OS 3D object suite — physical-feeling interactions. */
(()=>{if(window.__prince3DObjects)return;window.__prince3DObjects=true;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];

function dna(){
 const host=q('.os-dna');if(!host)return;const staticFallback=host.querySelector('.dna-static');if(staticFallback)staticFallback.style.display='none';host.querySelector('.os-dna-webgl')?.remove();
 const canvas=document.createElement('canvas');canvas.className='os-dna-webgl';canvas.setAttribute('aria-label','Interactive scientific 3D DNA double helix');host.appendChild(canvas);
 const gl=canvas.getContext('webgl',{antialias:true,alpha:true});
 if(!gl){host.classList.add('dna-fallback');return}
 const vs=`
 attribute vec3 aPos,aNormal; uniform mat4 uM,uP; varying vec3 vN,vP;
 void main(){vec4 p=uM*vec4(aPos,1.0);vP=p.xyz;vN=mat3(uM)*aNormal;gl_Position=uP*p;}
 `;
 const fs=`
 precision highp float; uniform vec3 uColor; varying vec3 vN,vP;
 void main(){vec3 N=normalize(vN),L=normalize(vec3(-.48,.72,.96)),V=normalize(-vP);float d=max(dot(N,L),0.0);float rim=pow(1.0-max(dot(N,V),0.0),2.0);float spec=pow(max(dot(reflect(-L,N),V),0.0),42.0);vec3 c=uColor*(.22+.78*d)+vec3(1.0)*(.10*rim+.28*spec);gl_FragColor=vec4(c,1.0);}
 `;
 const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s};
 const vert=compile(gl.VERTEX_SHADER,vs),frag=compile(gl.FRAGMENT_SHADER,fs);
 if(!gl.getShaderParameter(vert,gl.COMPILE_STATUS)||!gl.getShaderParameter(frag,gl.COMPILE_STATUS)){host.classList.add('dna-fallback');host.innerHTML='<div class="dna-fallback-model" aria-hidden="true"><span class="dna-fb-strand blue"></span><span class="dna-fb-strand red"></span><span class="dna-fb-rungs"></span></div>';return}
 const prog=gl.createProgram();gl.attachShader(prog,vert);gl.attachShader(prog,frag);gl.linkProgram(prog);
 if(!gl.getProgramParameter(prog,gl.LINK_STATUS)){host.classList.add('dna-fallback');host.innerHTML='<div class="dna-fallback-model" aria-hidden="true"><span class="dna-fb-strand blue"></span><span class="dna-fb-strand red"></span><span class="dna-fb-rungs"></span></div>';return}
 gl.useProgram(prog);
 const ap=gl.getAttribLocation(prog,'aPos'),an=gl.getAttribLocation(prog,'aNormal'),um=gl.getUniformLocation(prog,'uM'),up=gl.getUniformLocation(prog,'uP'),uc=gl.getUniformLocation(prog,'uColor');
 const meshes=[];
 // Scientific proportions: B-DNA has ~10.5 base pairs/turn, ~3.4 Å rise/pair, ~20 Å diameter.
 const BP=42,RISE=7.0,HELIX_RADIUS=38,STRAND_RADIUS=6.6,RUNG_RADIUS=2.15,TURNS=BP/10.5,HEIGHT=(BP-1)*RISE;
 const A=[],B=[];
 for(let i=0;i<BP;i++){const y=(i-(BP-1)/2)*RISE,a=i/10.5*Math.PI*2-Math.PI/2;A.push([Math.cos(a)*HELIX_RADIUS,y,Math.sin(a)*HELIX_RADIUS]);B.push([Math.cos(a+Math.PI)*HELIX_RADIUS,y,Math.sin(a+Math.PI)*HELIX_RADIUS]);}
 const tubeMesh=(path,radius,color)=>{
   const sides=28,verts=[],norms=[],idx=[];
   for(let i=0;i<path.length;i++){const p=path[i],qv=path[Math.min(i+1,path.length-1)],tx=qv[0]-p[0],ty=qv[1]-p[1],tz=qv[2]-p[2],tl=Math.hypot(tx,ty,tz)||1,T=[tx/tl,ty/tl,tz/tl],ref=Math.abs(T[1])>.9?[1,0,0]:[0,1,0];
     let N=[T[1]*ref[2]-T[2]*ref[1],T[2]*ref[0]-T[0]*ref[2],T[0]*ref[1]-T[1]*ref[0]],nl=Math.hypot(...N)||1;N=N.map(v=>v/nl);const Bx=[T[1]*N[2]-T[2]*N[1],T[2]*N[0]-T[0]*N[2],T[0]*N[1]-T[1]*N[0]];
     for(let j=0;j<sides;j++){const a=j/sides*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a),nx=N[0]*ca+Bx[0]*sa,ny=N[1]*ca+Bx[1]*sa,nz=N[2]*ca+Bx[2]*sa;verts.push(p[0]+nx*radius,p[1]+ny*radius,p[2]+nz*radius);norms.push(nx,ny,nz)}
   }
   for(let i=0;i<path.length-1;i++)for(let j=0;j<sides;j++){const a=i*sides+j,b=i*sides+(j+1)%sides,c=(i+1)*sides+(j+1)%sides,d=(i+1)*sides+j;idx.push(a,b,d,b,c,d)}
   meshes.push({verts,norms,idx,color});
 };
 const cylinder=(a,b,radius,color,sides=20)=>{
   const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],len=Math.hypot(dx,dy,dz)||1,T=[dx/len,dy/len,dz/len],ref=Math.abs(T[1])>.9?[1,0,0]:[0,1,0];
   let N=[T[1]*ref[2]-T[2]*ref[1],T[2]*ref[0]-T[0]*ref[2],T[0]*ref[1]-T[1]*ref[0]],nl=Math.hypot(...N)||1;N=N.map(v=>v/nl);const Bx=[T[1]*N[2]-T[2]*N[1],T[2]*N[0]-T[0]*N[2],T[0]*N[1]-T[1]*N[0]],verts=[],norms=[],idx=[];
   for(const p of [a,b])for(let j=0;j<sides;j++){const ang=j/sides*Math.PI*2,ca=Math.cos(ang),sa=Math.sin(ang),nx=N[0]*ca+Bx[0]*sa,ny=N[1]*ca+Bx[1]*sa,nz=N[2]*ca+Bx[2]*sa;verts.push(p[0]+nx*radius,p[1]+ny*radius,p[2]+nz*radius);norms.push(nx,ny,nz)}
   for(let j=0;j<sides;j++){const k=(j+1)%sides;idx.push(j,k,sides+j,j,sides+j,sides+k)}meshes.push({verts,norms,idx,color});
 };
 // Long, smooth continuous backbones. More interpolation points make the helical curve truly continuous.
 const smoothPath=(path)=>{
   const out=[];for(let i=0;i<path.length-1;i++){const p=path[i],qv=path[i+1];for(let k=0;k<10;k++){const t=k/10;out.push([p[0]*(1-t)+qv[0]*t,p[1]*(1-t)+qv[1]*t,p[2]*(1-t)+qv[2]*t])}}out.push(path[path.length-1]);return out;
 };
 tubeMesh(smoothPath(A),STRAND_RADIUS,[.025,.25,.98]);tubeMesh(smoothPath(B),STRAND_RADIUS,[.88,.018,.035]);
 // Every base pair is a physical rung. A small gap inside each backbone makes the connector visibly attached rather than passing through it.
 for(let i=0;i<BP;i++){const a=A[i],b=B[i],dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],len=Math.hypot(dx,dy,dz),u=[dx/len,dy/len,dz/len],aa=[a[0]+u[0]*STRAND_RADIUS*.72,a[1]+u[1]*STRAND_RADIUS*.72,a[2]+u[2]*STRAND_RADIUS*.72],bb=[b[0]-u[0]*STRAND_RADIUS*.72,b[1]-u[1]*STRAND_RADIUS*.72,b[2]-u[2]*STRAND_RADIUS*.72];cylinder(aa,bb,RUNG_RADIUS,i%2?[.78,.84,.91]:[.58,.68,.82],18)}
 // A subtle centerline axis makes depth and scientific structure easier to read without becoming a third strand.
 const buffers=meshes.map(m=>{const pb=gl.createBuffer(),nb=gl.createBuffer(),ib=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(m.verts),gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,nb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(m.norms),gl.STATIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(m.idx),gl.STATIC_DRAW);return {...m,pb,nb,ib,count:m.idx.length}});
 const S={ry:0,rx:-.055,v:.0026,down:false,sx:0,sy:0,last:0};
 const mul=(a,b)=>{const o=new Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o};
 const rotX=a=>[1,0,0,0,0,Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1];
 const rotY=a=>[Math.cos(a),0,-Math.sin(a),0,0,1,0,0,Math.sin(a),0,Math.cos(a),0,0,0,0,1];
 const persp=(fov,asp,n,f)=>{const t=1/Math.tan(fov/2);return[t/asp,0,0,0,0,t,0,0,0,0,(f+n)/(n-f),-1,0,0,(2*f*n)/(n-f),0]};
 const resize=()=>{const d=Math.min(devicePixelRatio||1,2),w=host.clientWidth,h=host.clientHeight;canvas.width=Math.max(1,Math.round(w*d));canvas.height=Math.max(1,Math.round(h*d));gl.viewport(0,0,canvas.width,canvas.height)};
 new ResizeObserver(resize).observe(host);resize();gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.clearColor(0,0,0,0);
 const frame=()=>{if(!S.down&&!reduce)S.ry+=S.v;S.v*=.987;const M=mul(rotY(S.ry),rotX(S.rx)),P=persp(.72,canvas.width/canvas.height,1,1000),T=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-410,1],MM=mul(M,T);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(up,false,P);gl.uniformMatrix4fv(um,false,MM);buffers.forEach(m=>{gl.bindBuffer(gl.ARRAY_BUFFER,m.pb);gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,m.nb);gl.enableVertexAttribArray(an);gl.vertexAttribPointer(an,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,m.ib);gl.uniform3fv(uc,m.color);gl.drawElements(gl.TRIANGLES,m.count,gl.UNSIGNED_SHORT,0)});requestAnimationFrame(frame)};requestAnimationFrame(frame);
 canvas.addEventListener('pointerdown',e=>{S.down=true;S.sx=e.clientX;S.sy=e.clientY;S.last=performance.now();S.v=0;canvas.setPointerCapture?.(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!S.down)return;const now=performance.now(),dx=e.clientX-S.sx,dy=e.clientY-S.sy;S.v=dx/Math.max(8,now-S.last)*.0028;S.ry+=dx*.009;S.rx=Math.max(-.22,Math.min(.22,S.rx-dy*.0016));S.sx=e.clientX;S.sy=e.clientY;S.last=now});
 const up=()=>S.down=false;canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
}
function dragDna(){
 const root=q('.os-dna'),stage=root?.parentElement;if(!root||!stage||root.querySelector('.os-dna-webgl'))return;
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
function init(){dna();dragDna();tiltPlanet();dragGyro();rubik()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
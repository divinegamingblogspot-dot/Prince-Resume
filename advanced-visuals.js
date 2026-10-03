/* Additive Skills proof + Systems architecture interaction. */
(()=>{if(window.__princeAdvancedVisuals)return;window.__princeAdvancedVisuals=true;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const proofData={
 'E-commerce Operations':['MULTYBYTE PURCHASE SYSTEM','Product/SKU workflows, purchasing coordination, inventory, vendor workflows, warehouse execution and fulfillment.','systems.html'],
 'Google Sheets':['OPERATIONAL SPREADSHEET SYSTEMS','Structured product, SKU, supplier and inventory data with controlled formulas and automation.','systems.html'],
 'Apps Script':['MULTYBYTE IMAGE-SYNC','URL discovery, validation, retries, caching, locks, formula writes and backup/recovery.','systems.html'],
 'JavaScript':['PRINCE.OS + SOFTWARE EXPERIMENTS','Portfolio interaction, automation logic, APIs and practical software experiments.','projects.html'],
 'Web + SEO + Digital Marketing':['PRINCE.OS + DIGITAL WORK','Website building, technical fixes, metadata, information architecture, on-page SEO and digital growth workflows.','work.html'],
 'AI + Voice':['NOVA + DOC / EYENAV','Portfolio-native AI interaction plus voice-first Android accessibility experiments.','projects.html'],
 'Supabase Backend':['SUPABASE-BACKED PRIVATE WEBSITE','Authentication, PostgreSQL, Storage and Row Level Security supporting an authenticated admin/media workflow.','systems.html']
};
function mountProof(){const host=document.querySelector('.skill-constellation');if(!host)return;const panel=host.querySelector('.skill-proof-panel');host.querySelectorAll('.skill-proof-node').forEach(btn=>btn.addEventListener('click',()=>{host.querySelectorAll('.skill-proof-node').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const d=proofData[btn.dataset.skill];if(!d||!panel)return;panel.querySelector('small').textContent=d[0];panel.querySelector('h4').textContent=btn.dataset.skill;panel.querySelector('p').innerHTML=d[1]+' <a href="'+d[2]+'">VIEW PROOF ↗</a>';panel.querySelector('a').style.color='var(--os-accent)';}));}
function mountTilt(){const lab=document.querySelector('.system-3d-lab'),stack=document.querySelector('.system-3d-stack');if(!lab||!stack||reduce)return;let raf=0;lab.addEventListener('pointermove',e=>{const r=lab.getBoundingClientRect(),x=e.clientX/r.width-(r.left/r.width)-.5,y=e.clientY/r.height-(r.top/r.height)-.5;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>stack.style.transform='rotateX('+(-y*9)+'deg) rotateY('+(x*10)+'deg)');},{passive:true});lab.addEventListener('pointerleave',()=>{cancelAnimationFrame(raf);stack.style.transform='';},{passive:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{mountProof();mountTilt()},{once:true});else{mountProof();mountTilt();}
})();
const spotlight=document.createElement('div');spotlight.className='spotlight';document.body.appendChild(spotlight);window.addEventListener('pointermove',e=>{spotlight.style.setProperty('--mx',e.clientX+'px');spotlight.style.setProperty('--my',e.clientY+'px')});
const loader=document.getElementById('loader');window.addEventListener('load',()=>setTimeout(()=>{loader.style.opacity='0';loader.style.visibility='hidden'},1750));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const c=document.querySelector('.cursor'),d=document.querySelector('.cursor-dot');window.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';d.style.left=e.clientX+'px';d.style.top=e.clientY+'px'});
document.querySelectorAll('a,.project,.skill').forEach(el=>{el.addEventListener('mouseenter',()=>c&&(c.style.transform='translate(-50%,-50%) scale(1.6)'));el.addEventListener('mouseleave',()=>c&&(c.style.transform='translate(-50%,-50%) scale(1)'))});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));const rb=document.getElementById('recruiterBtn'),rp=document.getElementById('recruiterPanel');rb?.addEventListener('click',()=>{rp.classList.add('open');document.body.style.overflow='hidden'});document.getElementById('closeRecruiter')?.addEventListener('click',()=>{rp.classList.remove('open');document.body.style.overflow=''});document.addEventListener('keydown',e=>{if(e.key==='Escape'){rp?.classList.remove('open');document.body.style.overflow=''}});const input=document.getElementById('terminalInput'),tb=document.getElementById('terminalBody');const cmds={help:'commands: help · whoami · skills · projects · contact · clear',whoami:'Prince Dixit — Operations × Digital × Automation',skills:'e-commerce · automation · SEO · Apps Script · JavaScript · AI workflows',projects:'multybyte-automation · eyenav-doc · me-n-u',contact:'divinegamingblogspot@gmail.com'};tb?.addEventListener('keydown',e=>{if(e.key!=='Enter'||!e.target.matches('input'))return;const current=e.target;const q=current.value.trim().toLowerCase();if(q==='clear'){tb.innerHTML='<div class="terminal-prompt">$ <input id="terminalInput" aria-label="Terminal command" placeholder="try: help"></div>';tb.querySelector('input')?.focus();return}const p=document.createElement('p');p.textContent=cmds[q]||'command not found — try: help';tb.insertBefore(p,tb.lastElementChild);current.value='';tb.lastElementChild?.querySelector('input')?.focus()});
/* Add relevant artwork to each work experience without changing the content structure. */
document.querySelectorAll('#experience .job').forEach((job,index)=>{
  const visuals=['multybyte.svg','crafts.svg','paraxion.svg','unique-threads.svg'];
  if(job.querySelector('.job-visual')) return;
  const visual=document.createElement('div');
  visual.className='job-visual';
  visual.innerHTML='<img loading="lazy" alt="" src="images/'+visuals[index]+'"><span class="job-index">0'+(index+1)+'</span>';
  job.insertBefore(visual,job.firstElementChild);
});
/* Subtle pointer tilt for interactive cards. */
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.project,.process-card,.build-grid>div,.edu-grid>div,.training-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.transform='perspective(900px) rotateX('+(((e.clientY-r.top)/r.height-.5)*-2.2)+'deg) rotateY('+(((e.clientX-r.left)/r.width-.5)*2.2)+'deg) translateY(-4px)';
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

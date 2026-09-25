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

const progress=document.createElement('div');progress.id='scrollProgress';document.body.appendChild(progress);
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%'},{passive:true});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* Hero area navigation: each numbered capability jumps to the relevant section and highlights it. */
document.querySelectorAll('.hero-meta-link').forEach(link=>{
  link.addEventListener('click',()=>{
    document.querySelectorAll('.hero-meta-link').forEach(x=>x.classList.remove('active'));
    link.classList.add('active');
    const target=document.querySelector(link.getAttribute('href'));
    if(target){
      target.classList.remove('hero-focus');
      requestAnimationFrame(()=>target.classList.add('hero-focus'));
      setTimeout(()=>target.classList.remove('hero-focus'),900);
    }
  });
});

/* Guarantee local portfolio artwork for reliable GitHub Pages loading. */
const localExperienceImages=['images/multybyte.svg','images/crafts.svg','images/paraxion.svg','images/unique-threads.svg'];
document.querySelectorAll('.job-card img').forEach((img,i)=>{
  if(localExperienceImages[i]) img.src=localExperienceImages[i];
});

/* Hero area navigation + live data panel. */
const heroData={
  operations:{index:'01',title:'OPERATIONS',text:'4 roles across e-commerce operations, fulfillment, inventory, warehouse coordination and customer-facing work.',meta:'Experience · Orders · Inventory · Warehouse'},
  digital:{index:'02',title:'DIGITAL',text:'SEO, website management, social media marketing and digital promotion across practical business workflows.',meta:'SEO · Websites · Social · Marketing'},
  automation:{index:'03',title:'AUTOMATION',text:'Google Sheets, Apps Script, JavaScript and API-driven workflows used to reduce repetitive operational work.',meta:'Sheets · Apps Script · JavaScript · APIs'},
  ai:{index:'04',title:'AI / SOFTWARE',text:'AI workflows, Android experiments, voice interaction and GitHub-based software projects built around practical use cases.',meta:'AI · Android · Voice · GitHub'}
};
const detail=document.getElementById('heroDetailPanel');
document.querySelectorAll('.hero-meta-link').forEach(link=>{
  link.addEventListener('click',()=>{
    document.querySelectorAll('.hero-meta-link').forEach(x=>x.classList.remove('active'));
    link.classList.add('active');
    const data=heroData[link.dataset.focus];
    if(detail&&data){
      detail.querySelector('.hero-detail-index').textContent=data.index;
      detail.querySelector('strong').textContent=data.title;
      detail.querySelector('p').textContent=data.text;
      detail.querySelector('small').textContent=data.meta;
      detail.classList.add('visible');
    }
    const target=document.querySelector(link.getAttribute('href'));
    if(target){target.classList.remove('hero-focus');requestAnimationFrame(()=>target.classList.add('hero-focus'));setTimeout(()=>target.classList.remove('hero-focus'),900);}
  });
});

/* ===== NOVA AI ASSISTANT ===== */
(()=> {
  const root=document.getElementById('pageBot'),orb=document.getElementById('botOrb'),chat=document.getElementById('botChat'),close=document.getElementById('botClose'),reaction=document.getElementById('botReaction'),messages=document.getElementById('botMessages'),form=document.getElementById('botForm'),input=document.getElementById('botInput');
  if(!root||!orb) return;
  const moods=['happy','wink','surprised','love'];
  const reactions=['Ooo, nice choice ✦','I saw that click!','Hehe, exploring?','Good eye 👀','That part matters.','Boop! ✨','Okayyy, I like that.'];
  let reactionTimer;
  function mood(m,txt){
    root.dataset.mood=m||'happy';
    if(txt){reaction.textContent=txt;reaction.classList.add('show');clearTimeout(reactionTimer);reactionTimer=setTimeout(()=>reaction.classList.remove('show'),2300);}
  }
  function toggle(open){
    chat.classList.toggle('open',open);
    chat.setAttribute('aria-hidden',String(!open));
    if(open){mood('happy','Ask me about Prince ✦');setTimeout(()=>input?.focus(),180);}
  }
  orb.addEventListener('click',()=>toggle(!chat.classList.contains('open')));
  close?.addEventListener('click',()=>toggle(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  document.addEventListener('click',e=>{
    if(e.target.closest('#pageBot')) return;
    const el=e.target.closest('a,button,.system-card,.job-card,.range-card,.skill,.process-card,.training-card');
    if(!el) return;
    const label=(el.innerText||el.getAttribute('aria-label')||'that').replace(/\s+/g,' ').trim().slice(0,42);
    mood(moods[Math.floor(Math.random()*moods.length)],reactions[Math.floor(Math.random()*reactions.length)]+' · '+label);
  });
  let lastX=innerWidth*.75,lastY=innerHeight*.8;
  document.addEventListener('pointermove',e=>{
    lastX=e.clientX;lastY=e.clientY;
    const r=orb.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height*.4);
    if(Math.abs(dx)<260&&Math.abs(dy)<230){
      const eyes=root.querySelectorAll('.bot-eye');
      eyes.forEach(eye=>{const lim=2.2;eye.style.transform='translate('+Math.max(-lim,Math.min(lim,dx/70))+'px,'+Math.max(-lim,Math.min(lim,dy/80))+'px)'});
    }
  });
  const replies=[
    [/who is prince|about prince|who are you/i,'Prince is an e-commerce operations and digital automation professional. His work sits between business execution, websites, data, marketing and practical software systems.'],
    [/experience|work|job|career/i,'He has worked across e-commerce operations, management, telesales, orders and inventory — with Multybyte, Crafts Banaras, Paraxion and Unique Threads.'],
    [/skill|stack|technology|tech/i,'His toolkit includes Google Sheets, Apps Script, JavaScript, HTML/CSS, APIs, SEO, digital marketing, inventory, fulfillment, business automation and AI workflows.'],
    [/project|system|build|portfolio/i,'Key builds include Multybyte automation, EyeNav → Doc, ME N U and this portfolio/resume system.'],
    [/multybyte|automation|sheet|apps script/i,'The Multybyte work focuses on product/SKU workflows, purchasing, inventory, vendor processes and Sheets + Apps Script automation.'],
    [/ai|artificial intelligence|assistant/i,'AI is one of Prince’s experimental layers: AI-assisted workflows, voice interaction, Android experiments and now… me. I’m Nova. ✦'],
    [/contact|email|hire|reach/i,'You can reach Prince at divinegamingblogspot@gmail.com or use the Contact section.'],
    [/education|bhu|degree|study/i,'Prince studied BA (Hons.) Economics at BHU and completed Class 12 in Commerce.'],
    [/hello|hi|hey|hii/i,'Heyyy ✦ I’m Nova. Click me, scroll around, or ask me anything about the portfolio!']
  ];
  function answer(q){
    for(const [re,ans] of replies) if(re.test(q)) return ans;
    return 'I’m still learning that one 😅 Try asking about Prince’s experience, skills, projects, automation, AI, education or contact details.';
  }
  function addMsg(textValue,type){
    const div=document.createElement('div');div.className='bot-msg '+type;div.textContent=textValue;messages.appendChild(div);messages.scrollTop=messages.scrollHeight;
  }
  function ask(q){
    if(!q.trim())return;
    addMsg(q.trim(),'user');mood(q.length>28?'surprised':'happy');
    setTimeout(()=>{addMsg(answer(q),'bot');mood(['happy','wink','love'][Math.floor(Math.random()*3)],'There you go ✦')},350);
  }
  form?.addEventListener('submit',e=>{e.preventDefault();const q=input.value;input.value='';ask(q)});
  messages?.addEventListener('click',e=>{const b=e.target.closest('[data-bot-q]');if(b)ask(b.dataset.botQ)});
  let scrollTimer;
  window.addEventListener('scroll',()=>{
    root.classList.add('walking');clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>root.classList.remove('walking'),180);
    const max=document.documentElement.scrollHeight-innerHeight,p=max>0?scrollY/max:0;
    const x=10+Math.min(82,p*82);
    root.style.right='auto';root.style.left=x+'vw';
    root.style.transition='left .55s cubic-bezier(.22,.7,.2,1)';
    if(p>.93)mood('happy','We made it to the end! ✦');
  },{passive:true});
  setTimeout(()=>mood('happy','Hi! I’m Nova ✦'),1200);
})();

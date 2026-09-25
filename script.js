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

/* ===== NOVA AI KNOWLEDGE + INTERACTION ===== */
const nova=document.getElementById('novaBot'), novaCharacter=document.getElementById('novaCharacter'), reaction=document.getElementById('novaReaction'), reactionText=document.getElementById('novaReactionText'), chat=document.getElementById('novaChat'), messages=document.getElementById('novaMessages'), form=document.getElementById('novaForm'), input=document.getElementById('novaInput'), close=document.getElementById('novaClose');
const novaKnowledge=[
  [/who is prince|who is he|tell me about prince|about prince/i,'Prince Dixit is a 22-year-old builder from Delhi who works across e-commerce operations, digital marketing, automation, websites and practical AI/software experiments.'],
  [/name|what is prince.*name/i,'His name is Prince Dixit. He also uses Prince/Monu casually.'],
  [/age|how old/i,'Prince is 22.'],
  [/where.*(from|live)|location|delhi/i,'Prince is based in Delhi, India.'],
  [/work|job|career|profession/i,'Prince works across e-commerce operations and digital systems. His current work includes product/SKU data, inventory, purchasing coordination, vendor workflows, warehouse coordination, packing/dispatch, spreadsheets and automation.'],
  [/multybyte/i,'At Multybyte Marketing India, Prince works in wholesale e-commerce operations and connects product data, purchasing, office workflows and warehouse execution. He also builds Sheets and Apps Script automation.'],
  [/crafts|banaras/i,'At Crafts Banaras, Prince worked in e-commerce management, fulfillment, inventory, customer requirements, website work and digital marketing.'],
  [/education|bhu|degree|college/i,'Prince studied BA (Hons.) Economics at Banaras Hindu University. He completed Class 12 in Commerce and achieved 99.43 percentile in CUET Reasoning.'],
  [/skills|technology|tech stack|what.*know/i,'His practical toolkit includes Google Sheets, Apps Script, JavaScript, HTML/CSS, APIs, SEO, social media marketing, e-commerce operations, inventory, fulfillment, website management, AI workflows and business automation.'],
  [/project|projects/i,'Key projects include Multybyte purchase/image automation, EyeNav → Doc, ME N U and this portfolio.'],
  [/eyenav|doc|voice assistant/i,'EyeNav evolved from gaze-navigation experiments into Doc, a hands-free Android voice-command assistant concept focused on hotword interaction and accessibility.'],
  [/me n u|menu|relationship.*project/i,'ME N U is Prince’s private zero-cost personal companion project using Google Sheets, Apps Script, AI-assisted memory, tasks, coins/shop logic and voice interaction.'],
  [/ai|artificial intelligence|nova/i,'Prince likes practical AI experiments rather than AI for its own sake. Nova is the portfolio’s cheerful AI assistant, designed to explain Prince’s work and interact with visitors.'],
  [/like|likes|interest|hobby|free time/i,'Prince is interested in technology, automation, AI experiments, websites, gaming, bikes and creative digital projects. He enjoys games including Brawl Stars, Mortal Kombat and Genshin.'],
  [/personality|what.*like|why.*build/i,'Prince is hands-on, ambitious and systems-focused. He likes finding friction in real workflows, building something practical, testing it and improving it.'],
  [/contact|email|reach/i,'You can contact Prince at divinegamingblogspot@gmail.com.'],
  [/hello|hi|hey|namaste/i,'Hii! ✦ I’m Nova. Ask me anything about Prince’s work, skills, projects or interests.'],
  [/thank|thanks/i,'You’re welcome! ✦ Keep exploring — Prince has built quite a few systems.']
];
function novaAnswer(q){
  const hit=novaKnowledge.find(([re])=>re.test(q));
  return hit?hit[1]:'I know Prince’s public portfolio story, work, skills, projects and interests. Try asking “Who is Prince?”, “What does he do?”, “What are his projects?”, or “What does he like?”';
}
function novaReact(text, mood='excited', ms=2600){
  if(!nova)return;
  reactionText.textContent=text; nova.classList.remove('excited','wink','surprised','moving'); nova.classList.add(mood); reaction.classList.add('show');
  clearTimeout(window.novaReactionTimer); window.novaReactionTimer=setTimeout(()=>reaction.classList.remove('show'),ms);
}
function novaOpen(){chat?.classList.add('open');chat?.setAttribute('aria-hidden','false');setTimeout(()=>input?.focus(),80)}
function novaCloseChat(){chat?.classList.remove('open');chat?.setAttribute('aria-hidden','true')}
function novaAdd(text,type='bot'){if(!messages)return;const el=document.createElement('div');el.className='nova-msg '+type;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight}
novaCharacter?.addEventListener('click',()=>{novaOpen();novaReact('Yay! You clicked me ✦','wink')});
close?.addEventListener('click',novaCloseChat);
form?.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;novaAdd(q,'user');input.value='';setTimeout(()=>{const answer=novaAnswer(q);novaAdd(answer);novaReact('I’ve got an answer ✦','excited');},220)});
document.querySelectorAll('[data-nova]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.nova;form.requestSubmit()}));
document.addEventListener('click',e=>{if(!nova?.contains(e.target))novaReact(['Hehe ✦','I saw that!','Nice click ✦','Let’s explore!'][Math.floor(Math.random()*4)],'wink',1500)});
document.querySelectorAll('a,button,.skill,.project,.job-card,.system-card').forEach(el=>el.addEventListener('click',()=>{if(nova)novaReact(['Ooh, good choice ✦','Nice!','Let’s gooo ✦','I like that one!'][Math.floor(Math.random()*4)],'excited',1300)}));
let novaScrollTimer=0,novaLastScroll=window.scrollY;
window.addEventListener('scroll',()=>{if(!nova)return;const delta=window.scrollY-novaLastScroll;novaLastScroll=window.scrollY;if(Math.abs(delta)<2)return;nova.classList.add('moving');clearTimeout(novaScrollTimer);novaScrollTimer=setTimeout(()=>nova.classList.remove('moving'),420);const pct=Math.round((window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100);if(pct>7&&pct%10<2)novaReact(pct<50?'I’m walking with you ✦':'We’re getting to the good stuff ✦','excited',1400)},{passive:true});
let novaMoveTimer=0;
document.addEventListener('mousemove',e=>{if(!nova||window.innerWidth<760)return;const r=novaCharacter?.getBoundingClientRect();if(!r)return;const cx=r.left+r.width/2,cy=r.top+r.height/3;const dx=e.clientX-cx,dy=e.clientY-cy;const eyeX=Math.max(-3,Math.min(3,dx/65)),eyeY=Math.max(-2,Math.min(2,dy/100));document.querySelectorAll('.nova-eye').forEach(eye=>eye.style.transform='translate('+eyeX+'px,'+eyeY+'px)');if(Math.abs(dx)<120&&Math.abs(dy)<160){clearTimeout(novaMoveTimer);novaReact('Hi there ✦','wink',900)}});
setTimeout(()=>novaReact('Hi Prince ✦ I’m Nova — ask me anything.','excited',4200),2100);

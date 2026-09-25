const spotlight=document.createElement('div');spotlight.className='spotlight';document.body.appendChild(spotlight);
let spotlightRaf=0,spotX=innerWidth*.5,spotY=innerHeight*.5;
window.addEventListener('pointermove',e=>{spotX=e.clientX;spotY=e.clientY;if(!spotlightRaf)spotlightRaf=requestAnimationFrame(()=>{spotlight.style.setProperty('--mx',spotX+'px');spotlight.style.setProperty('--my',spotY+'px');spotlightRaf=0})},{passive:true});
const loader=document.getElementById('loader');window.addEventListener('load',()=>setTimeout(()=>{loader.style.opacity='0';loader.style.visibility='hidden'},1350));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const c=document.querySelector('.cursor'),d=document.querySelector('.cursor-dot');
let cursorRaf=0,cx=0,cy=0;
window.addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;if(!cursorRaf)cursorRaf=requestAnimationFrame(()=>{c.style.left=cx+'px';c.style.top=cy+'px';d.style.left=cx+'px';d.style.top=cy+'px';cursorRaf=0})},{passive:true});
document.querySelectorAll('a,.project,.skill').forEach(el=>{el.addEventListener('mouseenter',()=>c&&(c.style.transform='translate(-50%,-50%) scale(1.6)'));el.addEventListener('mouseleave',()=>c&&(c.style.transform='translate(-50%,-50%) scale(1)'))});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));const rb=document.getElementById('recruiterBtn'),rp=document.getElementById('recruiterPanel');rb?.addEventListener('click',()=>{rp.classList.add('open');document.body.style.overflow='hidden'});document.getElementById('closeRecruiter')?.addEventListener('click',()=>{rp.classList.remove('open');document.body.style.overflow=''});document.addEventListener('keydown',e=>{if(e.key==='Escape'){rp?.classList.remove('open');document.body.style.overflow=''}});const input=document.getElementById('terminalInput'),tb=document.getElementById('terminalBody');const cmds={help:'commands: help · whoami · skills · projects · contact · clear',whoami:'Prince Dixit — Operations × Digital × Automation',skills:'e-commerce · automation · SEO · Apps Script · JavaScript · AI workflows',projects:'multybyte-automation · eyenav-doc · me-n-u',contact:'demonicspirit888@gmail.com'};tb?.addEventListener('keydown',e=>{if(e.key!=='Enter'||!e.target.matches('input'))return;const current=e.target;const q=current.value.trim().toLowerCase();if(q==='clear'){tb.innerHTML='<div class="terminal-prompt">$ <input id="terminalInput" aria-label="Terminal command" placeholder="try: help"></div>';tb.querySelector('input')?.focus();return}const p=document.createElement('p');p.textContent=cmds[q]||'command not found — try: help';tb.insertBefore(p,tb.lastElementChild);current.value='';tb.lastElementChild?.querySelector('input')?.focus()});
/* Add relevant artwork to each work experience without changing the content structure. */
document.querySelectorAll('#experience .job').forEach((job,index)=>{
  const visuals=['multybyte.svg','crafts.svg','paraxion.svg','unique-threads.svg'];
  if(job.querySelector('.job-visual')) return;
  const visual=document.createElement('div');
  visual.className='job-visual';
  visual.innerHTML='<img loading="lazy" alt="" src="images/'+visuals[index]+'"><span class="job-index">0'+(index+1)+'</span>';
  job.insertBefore(visual,job.firstElementChild);
});
/* Smooth, throttled pointer tilt — avoids per-event layout churn. */
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.project,.process-card,.build-grid>div,.edu-grid>div,.training-card').forEach(card=>{
    let raf=0,px=0,py=0;
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      px=((e.clientX-r.left)/r.width-.5)*2.2;
      py=((e.clientY-r.top)/r.height-.5)*-2.2;
      if(!raf) raf=requestAnimationFrame(()=>{
        card.style.transform='perspective(1000px) rotateX('+py+'deg) rotateY('+px+'deg) translate3d(0,-4px,0)';
        raf=0;
      });
    },{passive:true});
    card.addEventListener('pointerleave',()=>{
      if(raf)cancelAnimationFrame(raf);raf=0;
      card.style.transform='';
    });
  });
}

const progress=document.createElement('div');progress.id='scrollProgress';document.body.appendChild(progress);
let scrollRaf=0;
window.addEventListener('scroll',()=>{if(scrollRaf)return;scrollRaf=requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%';scrollRaf=0})},{passive:true});
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
    root.classList.toggle('nova-open',open);
    chat.classList.toggle('open',open);
    chat.setAttribute('aria-hidden',String(!open));
    orb.setAttribute('aria-expanded',String(open));
    if(open){
      mood('happy','Ask me about Prince ✦');
      setTimeout(()=>input?.focus(),180);
    }else{
      root.classList.remove('walking');
    }
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
    [/who is prince|who are you|about prince|tell me about prince/i,'Prince Dixit is 22 and based in Delhi, India. He works at the intersection of e-commerce operations, digital work, automation and practical software.'],
    [/name|full name/i,'His name is Prince Dixit.'],
    [/age|how old/i,'Prince is 22 years old.'],
    [/where.*(from|live)|location|delhi/i,'Prince is based in Delhi, India.'],
    [/why|purpose|motivation|what drives/i,'Prince likes building useful things that solve real problems. He moved toward Delhi for personal and career reasons and has focused on turning business work into better systems, automation and digital workflows.'],
    [/experience|work|job|career/i,'He has worked across e-commerce operations, management, telesales, orders and inventory — including Multybyte, Crafts Banaras, Paraxion and Unique Threads.'],
    [/multybyte|current job|current work/i,'At Multybyte, Prince works around wholesale e-commerce operations, product and SKU data, inventory, purchasing coordination, vendor workflows, warehouse coordination, packing/dispatch and website/data issues.'],
    [/crafts|banaras/i,'At Crafts Banaras, Prince handled e-commerce management, daily operations, team coordination, customer service, digital marketing, social media, orders, inventory and website work.'],
    [/education|bhu|degree|study|college|school/i,'Prince studied BA (Hons.) Economics at BHU and completed Class 12 in Commerce. His CUET Reasoning percentile was 99.43%. He also completed training in SEO, website building and social media marketing.'],
    [/skill|stack|technology|tech|know/i,'His toolkit includes Google Sheets, Google Apps Script, JavaScript, HTML/CSS, APIs, SEO, social media marketing, e-commerce operations, inventory, fulfillment, website management, AI workflows and business automation.'],
    [/project|system|build|portfolio/i,'His main systems include Multybyte automation, EyeNav → Doc, the private ME N U companion, and this portfolio/resume website.'],
    [/multybyte.*automation|automation|sheet|apps script/i,'Prince builds practical automation with Google Sheets, Apps Script, JavaScript and APIs — especially for product, image, purchasing, inventory and vendor workflows.'],
    [/eyenav|doc|voice|android/i,'EyeNav evolved into Doc, an Android voice-assistant experiment focused on voice commands and hands-free interaction.'],
    [/me n u|relationship companion|spreadsheet/i,'ME N U is a private relationship companion system Prince built as a zero-cost personal project, with memories, tasks, coins, questions and an AI-style assistant.'],
    [/ai|artificial intelligence|assistant|nova/i,'Prince is interested in practical AI and software experiments. Nova is the portfolio assistant built to explain his work, personality, skills, projects and background.'],
    [/like|likes|favorite|hobby|interests|enjoy/i,'Prince likes technology, automation, AI experiments, building websites and useful systems, gaming, bikes and creative digital projects. He also enjoys Brawl Stars, Mortal Kombat and exploring games and anime-style entertainment.'],
    [/bike|gt650|royal enfield/i,'One of Prince’s bike goals is a Royal Enfield GT 650. He has tied that goal to growing his monthly income and savings.'],
    [/gaming|game|games/i,'Prince plays games including Brawl Stars and Mortal Kombat, and has also played Genshin Impact.'],
    [/relationship|girlfriend|love|partner/i,'Prince values close relationships and has built personal digital projects around memories, tasks and shared experiences. Nova keeps personal relationship details intentionally general rather than exposing private conversations.'],
    [/personality|kind of person|character/i,'Prince tends to be hands-on, ambitious and systems-focused. He likes turning an idea into something working instead of stopping at a concept.'],
    [/contact|email|hire|reach/i,'You can reach Prince at demonicspirit888@gmail.com or use the Contact section.'],
    [/hello|hi|hey|hii/i,'Heyyy ✦ I’m Nova. Ask me about Prince, what he likes, what he builds, his work, education, skills, projects or goals.']
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
  function positionNova(){
    const max=document.documentElement.scrollHeight-innerHeight;
    const p=max>0?Math.max(0,Math.min(1,scrollY/max)):0;
    const edge=24,botWidth=104;
    const x=edge+(innerWidth-botWidth-edge*2)*(1-p);
    root.style.right='auto';
    root.style.left=Math.max(8,x)+'px';
    root.style.transition='left .7s cubic-bezier(.22,.7,.2,1)';
    root.classList.toggle('nova-at-bottom',p>=.5);
    root.classList.toggle('nova-at-top',p<.5);
  }
  window.addEventListener('scroll',()=>{
    root.classList.add('walking');clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>root.classList.remove('walking'),180);
    positionNova();
    const max=document.documentElement.scrollHeight-innerHeight,p=max>0?scrollY/max:0;
    if(p>.93)mood('happy','We made it to the end! ✦');
  },{passive:true});
  window.addEventListener('resize',positionNova,{passive:true});
  positionNova();
  setTimeout(()=>mood('happy','Hi! I’m Nova ✦'),1200);
})();

/* ===== PREMIUM MOTION + PERFORMANCE LAYER ===== */
(()=> {
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  document.querySelectorAll('.process-card,.job-card,.system-card,.range-card,.skill,.build-grid>div,.edu-grid>div').forEach((el,i)=>{
    el.style.setProperty('--motion-delay',(i%6)*55+'ms');
  });
  document.querySelectorAll('.btn,.hero-meta-link,.nav-recruiter').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)/r.width*7;
      const y=(e.clientY-r.top-r.height/2)/r.height*7;
      el.style.transform='translate('+x+'px,'+y+'px)';
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });
  document.querySelectorAll('.stats strong').forEach(el=>{
    const raw=el.textContent.trim();
    if(!/^\d+(\.\d+)?$/.test(raw)) return;
    const target=parseFloat(raw), decimals=raw.includes('.')?raw.split('.')[1].length:0;
    const io=new IntersectionObserver(entries=>{
      if(!entries[0].isIntersecting)return;
      io.disconnect();
      const start=performance.now(),duration=900;
      const tick=now=>{
        const p=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-p,3);
        el.textContent=(target*ease).toFixed(decimals);
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },{threshold:.7});
    io.observe(el);
  });
  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('loading') && !img.closest('.hero')) img.loading='lazy';
    img.decoding='async';
  });
})();


/* ===== RECRUITER EXPERIENCE / INTERACTION PACK ===== */
(()=> {
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Resume CTA: opens the clean printable resume; browser can Save as PDF. */
  document.getElementById('downloadResume')?.addEventListener('click',()=>{});

  /* Interactive skill constellation. */
  const skillInfo={
    systems:['Systems thinking','Connecting people, process, data and technology.'],
    operations:['E-commerce operations','Orders, inventory, fulfillment, purchasing and warehouse workflows.'],
    sheets:['Google Sheets','Structured operational data, formulas, validation and controlled workbooks.'],
    automation:['Apps Script','Practical automation, retries, caching, locks and workflow protection.'],
    web:['Web / SEO','Websites, search visibility, content structure and digital presence.'],
    javascript:['JavaScript','Interactive web behavior, automation logic and API-connected experiences.'],
    ai:['AI / Voice','AI experiments, voice interaction and Android assistant concepts.'],
    marketing:['Digital marketing','SEO, websites and social media marketing supporting business growth.']
  };
  const info=document.getElementById('skillMapInfo');
  document.querySelectorAll('.skill-node').forEach(node=>{
    const show=()=>{
      document.querySelectorAll('.skill-node').forEach(n=>n.classList.remove('active'));
      node.classList.add('active');
      const d=skillInfo[node.dataset.skill]||skillInfo.systems;
      if(info) info.innerHTML='<strong>'+d[0]+'</strong><span>'+d[1]+'</span>';
    };
    node.addEventListener('mouseenter',show);
    node.addEventListener('focus',show);
    node.addEventListener('click',show);
  });

  /* Before → after micro demos. */
  const demoSteps={
    images:['Reading product URL…','Discovering og:image / CDN source…','Validating image source…','Retry + cache check…','✓ Image formula ready.'],
    data:['Reading SKU rows…','Checking required fields…','Validating product / vendor mapping…','Applying controlled workflow…','✓ Data path ready.']
  };
  document.querySelectorAll('.demo-run').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const log=btn.parentElement.querySelector('.demo-log');
      const steps=demoSteps[btn.dataset.demo]||demoSteps.images;
      let i=0;
      btn.disabled=true;
      log.className='demo-log running';
      const tick=()=>{
        log.textContent=steps[i++];
        if(i<steps.length) setTimeout(tick,360);
        else {log.className='demo-log done';btn.disabled=false;}
      };
      tick();
    });
  });

  /* Gentle card depth without fighting reveal transforms. */
  if(!reduce){
    document.querySelectorAll('.case-study,.automation-demo,.github-repo-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-.5)*-2.2;
        const ry=((e.clientX-r.left)/r.width-.5)*2.2;
        card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-6px)';
      });
      card.addEventListener('pointerleave',()=>{card.style.transform=''});
    });
  }

  /* Active navigation state while scrolling through the resume. */
  const navLinks=[...document.querySelectorAll('header nav a[href^="#"]')];
  const observed=[...document.querySelectorAll('main section[id]')];
  if('IntersectionObserver' in window){
    const navIO=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        navLinks.forEach(link=>link.classList.toggle('current',link.getAttribute('href')==='#'+entry.target.id));
      });
    },{rootMargin:'-35% 0px -55% 0px',threshold:0});
    observed.forEach(s=>navIO.observe(s));
  }

  /* Scroll-linked visual depth, throttled through requestAnimationFrame. */
  if(!reduce){
    let raf=0;
    const parallax=()=>{
      raf=0;
      const y=scrollY;
      document.querySelectorAll('.section-heading-visual img').forEach((img,i)=>{
        const r=img.parentElement.getBoundingClientRect();
        if(r.bottom<0||r.top>innerHeight)return;
        const shift=(r.top-innerHeight/2)*-0.035;
        img.style.transform='translate3d(0,'+shift+'px,0) scale(1.04)';
      });
    };
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(parallax)},{passive:true});
    parallax();
  }

  /* Public GitHub activity: small, cached, non-blocking enhancement with local fallback. */
  const repoWrap=document.getElementById('githubRepos'),status=document.getElementById('githubStatus');
  const owner='divinegamingblogspot-dot';
  const cached=(()=>{try{return JSON.parse(sessionStorage.getItem('princeGithubRepos')||'null')}catch{return null}})();
  function renderRepos(repos){
    if(!repoWrap||!Array.isArray(repos)||!repos.length)return;
    repoWrap.innerHTML=repos.slice(0,6).map(r=>{
      const desc=(r.description||'Public repository by Prince Dixit.').replace(/[<>&"]/g,'');
      return '<a class="github-repo-card" href="'+r.html_url+'" target="_blank" rel="noopener"><span>'+((r.language||'GITHUB')+' · PUBLIC').toUpperCase()+'</span><strong>'+r.name.replace(/[<>&"]/g,'')+'</strong><small>'+desc.slice(0,130)+'</small><b>★ '+r.stargazers_count+' · Open ↗</b></a>';
    }).join('');
  }
  if(cached){renderRepos(cached);if(status)status.innerHTML='<span></span> Public repository snapshot loaded.';}
  fetch('https://api.github.com/users/'+owner+'/repos?sort=updated&per_page=6',{headers:{Accept:'application/vnd.github+json'}})
    .then(r=>r.ok?r.json():Promise.reject())
    .then(repos=>{
      sessionStorage.setItem('princeGithubRepos',JSON.stringify(repos));
      renderRepos(repos);
      if(status)status.innerHTML='<span></span> Live public repositories connected.';
    })
    .catch(()=>{if(status)status.innerHTML='<span></span> Using the built-in repository list.';});

  /* Recruiter mode gets a direct keyboard shortcut for fast review. */
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();
      document.getElementById('recruiterBtn')?.click();
    }
  });

  /* Mobile navigation closes after a destination is selected. */
  document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('nav')?.classList.remove('open')));

  /* Small performance wins for a static resume: defer non-critical image decoding and avoid layout work offscreen. */
  document.querySelectorAll('img').forEach(img=>{
    img.decoding='async';
    if(!img.closest('.hero')) img.loading='lazy';
  });

  /* Keyboard-visible current nav state. */
  const style=document.createElement('style');
  style.textContent='header nav a.current{color:#f4f5f2} header nav a.current:after{content:"";display:block;height:1px;background:#b7ff52;transform:scaleX(1);transform-origin:left}';
  document.head.appendChild(style);
})();

/* ===== DETAIL PAGE NAVIGATION ===== */
(()=>{const cards=document.querySelectorAll('.detail-card[data-detail]');cards.forEach(card=>{const open=()=>{if(card.dataset.detail) window.location.href=card.dataset.detail};card.addEventListener('click',e=>{if(e.target.closest('a,button,input,textarea,select'))return;open()});card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('a,button,input,textarea,select')){e.preventDefault();open()}})})})();

/* ===== GLOBAL MOTION ENGINE v3 ===== */
(()=>{
  const energy=document.createElement('div'); energy.className='motion-energy'; energy.setAttribute('aria-hidden','true');
  document.body.prepend(energy);
  const transition=document.createElement('div'); transition.id='pageTransition'; transition.setAttribute('aria-hidden','true');
  document.body.appendChild(transition);

  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in-view')});
  },{threshold:.08,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.section,.contact,.capability-strip').forEach(el=>sectionObserver.observe(el));

  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a || a.target==='_blank' || a.hasAttribute('download')) return;
    const href=a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/i.test(href)) return;
    if(a.closest('#botChat')) return;
    e.preventDefault();
    transition.classList.add('active');
    window.setTimeout(()=>{window.location.href=href},260);
  },true);

  window.addEventListener('pageshow',()=>transition.classList.remove('active'));

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let last=performance.now(),fpsLowUntil=0;
  const tick=now=>{
    if(now-last>50){fpsLowUntil=now+500;last=now}
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();


/* ===== UI UPGRADE PACK / 10-LAYER EXPERIENCE ===== */
(()=> {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const main=document.querySelector('main');
  if(!main) return;

  /* 1. Cinematic hero layer — injected so existing hero markup stays untouched. */
  const hero=document.querySelector('.hero');
  if(hero){
    const cinematic=document.createElement('div'); cinematic.className='hero-cinematic'; cinematic.setAttribute('aria-hidden','true'); hero.prepend(cinematic);
    const hud=document.createElement('div'); hud.className='hero-hud reveal';
    hud.innerHTML='<b>PRINCE.OS / ONLINE</b><span>BUILD · TEST · IMPROVE</span><span class="hud-live">● SYSTEM LIVE</span><i class="hud-line"></i>';
    hero.appendChild(hud);
  }

  /* 2. Moving red/purple energy layer — visual only, no layout interaction. */
  const energy=document.createElement('div'); energy.className='ui-energy'; energy.setAttribute('aria-hidden','true');
  for(let i=0;i<4;i++) energy.appendChild(document.createElement('i'));
  document.body.appendChild(energy);

  /* 3. Scroll storytelling HUD. */
  const story=document.createElement('div'); story.className='section-story'; story.innerHTML='<b>SCROLL / BUILD STORY</b><i></i>'; document.body.appendChild(story);

  /* 4. Experience timeline enhancement. */
  const exp=document.querySelector('#experience .experience-stack');
  exp?.querySelectorAll('.job-card').forEach((card,i)=>card.dataset.timeline=String(i+1).padStart(2,'0'));

  /* 5. Skills constellation. Add beside the existing skills UI without replacing it. */
  const skills=document.querySelector('#skills');
  if(skills && !skills.querySelector('.skills-constellation')){
    const box=document.createElement('div'); box.className='skills-constellation';
    box.innerHTML='<div class="skill-orbit"><div class="skill-core">PRINCE<br>STACK</div><button class="skill-node-ui n1" data-skill-ui="OPERATIONS">OPERATIONS</button><button class="skill-node-ui n2" data-skill-ui="AUTOMATION">AUTOMATION</button><button class="skill-node-ui n3" data-skill-ui="AI / VOICE">AI / VOICE</button><button class="skill-node-ui n4" data-skill-ui="WEB / SEO">WEB / SEO</button><button class="skill-node-ui n5" data-skill-ui="JAVASCRIPT">JAVASCRIPT</button><button class="skill-node-ui n6" data-skill-ui="SHEETS">GOOGLE SHEETS</button></div><div class="skill-constellation-info" id="uiSkillInfo"><strong>Select a capability</strong><span>Explore how the pieces connect into one operating layer.</span></div>';
    skills.appendChild(box);
    const descriptions={
      OPERATIONS:'Orders, inventory, fulfillment, purchasing and warehouse execution.',
      AUTOMATION:'Apps Script, formulas, retries, caching, locks and controlled workflows.',
      'AI / VOICE':'AI experiments, voice interaction and practical assistant concepts.',
      'WEB / SEO':'Websites, search visibility, content structure and digital presence.',
      JAVASCRIPT:'Interactive web behavior, automation logic and API-connected experiences.',
      'GOOGLE SHEETS':'Structured operational data, formulas, validation and business workbooks.'
    };
    box.querySelectorAll('.skill-node-ui').forEach(n=>n.addEventListener('click',()=>{
      box.querySelectorAll('.skill-node-ui').forEach(x=>x.classList.remove('active')); n.classList.add('active');
      const d=descriptions[n.dataset.skillUi]; box.querySelector('#uiSkillInfo').innerHTML='<strong>'+n.dataset.skillUi+'</strong><span>'+d+'</span>';
    }));
  }

  /* 6. Project cards: live-system status strip and lightweight counter. */
  document.querySelectorAll('.system-card,.project').forEach((card,i)=>{
    if(card.querySelector('.ui-counter')) return;
    const c=document.createElement('div'); c.className='ui-counter';
    c.innerHTML='<b>0'+((i%9)+1)+'</b> / SYSTEM MODULE';
    const target=card.querySelector('.system-copy,.project-top');
    (target||card).appendChild(c);
  });

  /* 7. Recruiter-friendly system status — non-blocking, purely visual. */
  const status=document.createElement('div'); status.className='ui-counter'; status.style.position='fixed'; status.style.right='18px'; status.style.bottom='16px'; status.style.zIndex='8'; status.style.opacity='.7';
  status.innerHTML='<b>99.9%</b> UI READY · <span style="color:#a855f7">●</span> MOTION';
  document.body.appendChild(status);

  /* 8. Magnetic controls, throttled through RAF to avoid pointer lag. */
  if(!reduce){
    const magnets=document.querySelectorAll('.btn,.nav-recruiter,.hero-meta-link,.system-copy a,.text-link');
    magnets.forEach(el=>{
      let raf=0,tx=0,ty=0;
      const move=e=>{
        const r=el.getBoundingClientRect(); tx=(e.clientX-(r.left+r.width/2))/r.width*8; ty=(e.clientY-(r.top+r.height/2))/r.height*8;
        if(!raf) raf=requestAnimationFrame(()=>{raf=0;el.style.transform='translate3d('+tx+'px,'+ty+'px,0)'});
      };
      const leave=()=>{el.classList.remove('magnetic-active');el.style.transform='';};
      el.addEventListener('pointerenter',()=>el.classList.add('magnetic-active')); el.addEventListener('pointermove',move); el.addEventListener('pointerleave',leave);
    });
  }

  /* 9. Section progress color language — violet/red follows scroll depth. */
  if(!reduce){
    let raf=0;
    const update=()=>{
      raf=0;
      const max=document.documentElement.scrollHeight-innerHeight, p=max?scrollY/max:0;
      document.documentElement.style.setProperty('--scroll-energy',p);
      const hue=p<.5?'#a855f7':'#ff3b5c';
      document.querySelector('.section-story i')?.style.setProperty('background','linear-gradient('+hue+',#292c35)');
    };
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update)},{passive:true}); update();
  }

  /* 10. Premium page-change/load behavior: keep existing transition, add a tiny motion cue. */
  addEventListener('pageshow',()=>{document.body.classList.add('ui-ready');setTimeout(()=>document.body.classList.remove('ui-ready'),900)});
})();

/* ===== NOVA GENERIC KNOWLEDGE + REASONING LAYER ===== */
(()=> {
  const root=document.getElementById('pageBot'), messages=document.getElementById('botMessages');
  if(!root||!messages) return;
  const form=document.getElementById('botForm'), input=document.getElementById('botInput');
  const generic=[
    [/what is ai|what is artificial intelligence/i,'AI (artificial intelligence) is software designed to perform tasks that normally require human-like capabilities such as pattern recognition, language understanding, prediction or decision support.'],
    [/what is machine learning|define machine learning/i,'Machine learning is a branch of AI where systems learn patterns from data rather than being explicitly programmed with every rule.'],
    [/what is javascript|what is html|what is css/i,'JavaScript adds behavior and logic to web pages; HTML structures content; CSS controls presentation and layout.'],
    [/what is api|define api/i,'An API is a defined way for software systems to communicate, request data or trigger actions from another system.'],
    [/what is seo|define seo/i,'SEO means search engine optimization: improving a website so search engines can understand, index and surface its useful content.'],
    [/what is a database|define database/i,'A database is an organized system for storing and retrieving structured information efficiently.'],
    [/capital of india|capital of india/i,'New Delhi is the capital of India.'],
    [/largest planet/i,'Jupiter is the largest planet in our Solar System.'],
    [/red planet/i,'Mars is commonly called the Red Planet because iron minerals on its surface give it a reddish appearance.'],
    [/how many continents/i,'There are seven commonly recognized continents: Africa, Antarctica, Asia, Europe, North America, South America and Australia.'],
    [/speed of light/i,'The speed of light in vacuum is approximately 299,792,458 metres per second.'],
    [/water.*boil|boiling point/i,'At standard atmospheric pressure, water boils at 100°C (212°F). Boiling temperature changes with pressure and altitude.'],
    [/photosynthesis/i,'Photosynthesis is the process by which plants, algae and some microorganisms use light energy to convert carbon dioxide and water into chemical energy, releasing oxygen in the process.'],
    [/difference.*ram.*storage|ram vs storage/i,'RAM is fast working memory used while programs run; storage such as SSDs keeps data persistently when the device is powered off.'],
    [/what is iq|meaning of iq/i,'IQ stands for intelligence quotient. Traditional IQ tests measure selected reasoning and problem-solving abilities; they do not capture every aspect of intelligence or human capability.'],
    [/prime number/i,'A prime number is a whole number greater than 1 that has exactly two positive divisors: 1 and itself.'],
    [/gravity/i,'Gravity is the attractive interaction associated with mass and energy. Near Earth’s surface it gives objects an acceleration of about 9.8 m/s² downward.'],
    [/why is sky blue/i,'Earth’s sky appears blue mainly because air molecules scatter shorter blue wavelengths of sunlight more strongly than longer red wavelengths.'],
    [/difference.*http.*https|http vs https/i,'HTTPS is HTTP protected by TLS encryption and authentication, helping protect data in transit between a browser and server.']
  ];
  const original=window.__novaOriginalAnswer;
  function genericAnswer(q){
    for(const [re,ans] of generic) if(re.test(q)) return ans;
    const m=q.match(/(?:what is|calculate|solve|how much is)\s+(-?\d+(?:\.\d+)?)\s*([+\-*x×÷/])\s*(-?\d+(?:\.\d+)?)/i);
    if(m){
      const a=Number(m[1]),b=Number(m[3]),op=m[2];
      let v=null;
      if(op==='+')v=a+b; else if(op==='-')v=a-b; else if(op==='*'||op.toLowerCase()==='x'||op==='×')v=a*b; else if(op==='/'||op==='÷')v=b===0?null:a/b;
      if(v!==null) return 'The answer is '+v+'.';
      return 'Division by zero is undefined.';
    }
    return null;
  }
  function princeContext(q){
    if(!/prince|dixit/i.test(q)) return '';
    return ' If you mean Prince Dixit specifically, I can also connect the answer to his work, skills, projects or portfolio.';
  }
  function enhance(){
    const originalForm=form; if(!originalForm)return;
    originalForm.addEventListener('submit',e=>{
      const q=input?.value?.trim(); if(!q)return;
      const ans=genericAnswer(q);
      if(!ans)return;
      e.preventDefault();
      const oldInput=input.value; input.value='';
      const u=document.createElement('div');u.className='bot-msg user';u.textContent=oldInput;messages.appendChild(u);
      setTimeout(()=>{const b=document.createElement('div');b.className='bot-msg bot';b.textContent=ans+princeContext(q);messages.appendChild(b);messages.scrollTop=messages.scrollHeight;},220);
    },true);
  }
  enhance();
})();

/* ===== PAGE-AWARE CINEMATIC CONTEXT ===== */
(()=>{const sections=[...document.querySelectorAll('.section,.inner-section')];if(!sections.length)return;const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;document.body.dataset.visual=el.dataset.visual||'violet';if(el.classList.contains('inner-section')&&!el.querySelector('.inner-section-nova')){const b=document.createElement('button');b.className='inner-section-nova';b.type='button';b.textContent='✦ ASK NOVA ABOUT THIS SECTION';b.dataset.askNova='Explain this section';el.appendChild(b)}}),{threshold:.35});sections.forEach((s,i)=>{s.dataset.visual=['violet','red','blue','acid'][i%4];io.observe(s)});if(reduce)document.body.dataset.visual='violet'})();

/* ===== FINAL PORTFOLIO SYSTEM — ADDITIVE / DEFENSIVE ===== */
(()=> {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader=document.getElementById('loader'),bar=loader?.querySelector('.loader-bar i'),pct=loader?.querySelector('#loaderPercent'),status=loader?.querySelector('#loaderStatus');
  if(loader){
    const stages=['INITIALIZING SYSTEM','LOADING PORTFOLIO','MAPPING EXPERIENCE','PREPARING SYSTEMS','READY TO EXPLORE'],start=performance.now(),duration=reduce?500:1850;
    const frame=now=>{const p=Math.min(1,(now-start)/duration),e=1-Math.pow(1-p,3),v=Math.round(e*100);if(bar)bar.style.width=v+'%';if(pct)pct.textContent=String(v).padStart(2,'0')+'%';if(status)status.textContent=stages[Math.min(4,Math.floor(p*5))];if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame);
    addEventListener('load',()=>{if(bar)bar.style.width='100%';if(pct)pct.textContent='100%';if(status)status.textContent='SYSTEM READY'},{once:true});
  }
  window.princeProfile=window.princeProfile||{identity:{name:'Prince Dixit',location:'Delhi, India',focus:'E-commerce Operations × Digital × Automation'},contact:{phone:'+91 88878 31825',email:'demonicspirit888@gmail.com',github:'https://github.com/divinegamingblogspot-dot'},experience:[{company:'Multybyte Marketing India',role:'E-commerce Operations',period:'May 2026 — Present'},{company:'Crafts Banaras',role:'E-commerce Manager',period:'March 2025 — 2026'},{company:'Paraxion Management & Consultant Pvt. Ltd.',role:'Telesales Executive',period:'November 2024 — February 2025'},{company:'Unique Threads Sarees',role:'Orders & Inventory Manager',period:'May — October 2024'}],skills:['E-commerce Operations','Google Sheets','Apps Script','JavaScript','SEO','Digital Marketing','AI Workflows','HTML/CSS','APIs'],systems:['Multybyte Automation','Operational Spreadsheet Systems','AI / Software Experiments','ME N U','EyeNav / Doc','Portfolio / Resume System']};
  const hero=document.querySelector('.hero');
  if(hero&&!document.querySelector('.current-build')){const t=document.createElement('div');t.className='current-build';t.innerHTML='<span>CURRENTLY BUILDING <b>✦</b> DOC ANDROID VOICE ASSISTANT <b>✦</b> BUSINESS AUTOMATION <b>✦</b> AI WORKFLOWS <b>✦</b> PORTFOLIO SYSTEM <b>✦</b> CURRENTLY BUILDING <b>✦</b> DOC ANDROID VOICE ASSISTANT <b>✦</b></span>';hero.appendChild(t)}
  const h=document.querySelector('.hero h1 em');
  if(h&&!h.dataset.cycle){h.dataset.cycle='1';const roles=['systems','automation','workflows','digital systems'];let i=0;if(!reduce)setInterval(()=>{h.style.opacity='0';setTimeout(()=>{h.textContent=roles[++i%roles.length];h.style.opacity='1'},180)},3800)}
  const commands=[['01','Home','Portfolio landing','index.html'],['02','About','How Prince thinks','about.html'],['03','Experience','Career history','experience.html'],['04','Systems','Builds and architecture','systems.html'],['05','Skills','Capability network','skills.html'],['06','Recruiter','Hiring dashboard','recruiter.html'],['07','Resume','ATS / recruiter / detailed','resume.html'],['08','Nova','AI portfolio intelligence','nova.html'],['09','Contact','Reach Prince','contact.html'],['10','GitHub','Open GitHub profile','https://github.com/divinegamingblogspot-dot']];
  let palette=document.getElementById('commandPalette');
  if(!palette){palette=document.createElement('div');palette.id='commandPalette';palette.className='command-backdrop';palette.setAttribute('role','dialog');palette.setAttribute('aria-modal','true');palette.innerHTML='<div class="command-box"><div class="command-head"><input id="commandInput" aria-label="Search commands" placeholder="Search portfolio…"><kbd>ESC</kbd></div><div class="command-list" id="commandList"></div><div class="command-footer">↑ ↓ NAVIGATE · ENTER OPEN · CTRL/CMD K TO TOGGLE</div></div>';document.body.appendChild(palette)}
  const ci=palette.querySelector('#commandInput'),cl=palette.querySelector('#commandList');const render=f=>{cl.innerHTML='';commands.filter(c=>(c[1]+' '+c[2]).toLowerCase().includes((f||'').toLowerCase())).forEach((c,n)=>{const b=document.createElement('button');b.className='command-item'+(n===0?' active':'');b.innerHTML='<b>'+c[0]+'</b><span>'+c[1]+'<small> — '+c[2]+'</small></span><small>↵</small>';b.dataset.action=c[3];cl.appendChild(b)})};render('');
  const open=()=>{render('');palette.classList.add('open');ci.focus()},close=()=>palette.classList.remove('open');
  const run=a=>{close();if(a==='__recruiter'){location.href='recruiter.html';return}if(a==='__nova'){if(document.querySelector('#pageBot')){document.querySelector('#botInput')?.focus()}else location.href='nova.html';return}if(/^https?:/.test(a)){window.open(a,'_blank','noopener');return}const hash=a.split('#')[1],el=hash&&document.getElementById(hash);if(el)el.scrollIntoView({behavior:reduce?'auto':'smooth'});else location.href=a};
  addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();palette.classList.contains('open')?close():open()}if(e.key==='Escape')close();if(!palette.classList.contains('open'))return;const items=[...cl.querySelectorAll('.command-item')],active=items.findIndex(x=>x.classList.contains('active'));if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const next=(active+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach(x=>x.classList.remove('active'));items[next]?.classList.add('active')}if(e.key==='Enter'){e.preventDefault();items[active>=0?active:0]?.click()}});
  ci?.addEventListener('input',()=>render(ci.value));cl?.addEventListener('click',e=>{const x=e.target.closest('.command-item');if(x)run(x.dataset.action)});palette.addEventListener('click',e=>{if(e.target===palette)close()});
  document.querySelectorAll('.detail-card[role="link"]').forEach(card=>card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('a')){e.preventDefault();card.click()}}));document.querySelectorAll('img:not([alt])').forEach(img=>img.alt='Portfolio visual');
  const systems=document.querySelector('#systems');
  if(systems&&!systems.querySelector('.build-demo')){const demo=document.createElement('div');demo.className='build-demo';demo.innerHTML='<div class="build-demo-head"><strong>MULTYBYTE AUTOMATION / LIVE SYSTEM DEMO</strong><button class="demo-run" type="button">RUN DEMO</button></div><div class="build-steps"><div class="build-step"><b>01</b>READ SKU</div><div class="build-step"><b>02</b>DISCOVER URL</div><div class="build-step"><b>03</b>VALIDATE SOURCE</div><div class="build-step"><b>04</b>WRITE IMAGE</div><div class="build-step"><b>05</b>BACKUP / RETRY</div><div class="build-step"><b>06</b>COMPLETE</div></div><div class="demo-log" aria-live="polite">$ waiting for demo…</div>';systems.appendChild(demo);const steps=[...demo.querySelectorAll('.build-step')],log=demo.querySelector('.demo-log');demo.querySelector('.demo-run').addEventListener('click',()=>{steps.forEach(x=>x.classList.remove('active','done'));let n=0;log.textContent='$ workflow.start()';const next=()=>{if(n)steps[n-1].classList.add('done');if(n>=steps.length){log.innerHTML='<strong>✓ system complete</strong> — protected data flow demonstrated.';return}steps[n].classList.add('active');log.textContent='$ '+steps[n].textContent.replace(/^\d+/,'').trim().toLowerCase();n++;setTimeout(next,reduce?90:320)};next()})}
  const about=document.querySelector('#about');
  if(about&&!about.querySelector('.profile-dash')){const d=document.createElement('div');d.className='profile-dash';d.innerHTML='<div class="profile-dash-card"><h3>HOW I THINK</h3><p>Observe → break down → automate → validate → improve. The goal is a workflow people can actually use and maintain.</p></div><div class="profile-metrics"><div class="profile-metric"><small>FOCUS</small><b>Business systems</b></div><div class="profile-metric"><small>BUILDING</small><b>AI + automation</b></div><div class="profile-metric"><small>MODE</small><b>Practical</b></div><div class="profile-metric"><small>OUTPUT</small><b>Usable systems</b></div></div>';about.appendChild(d)}
})();


/* ===== NOVA PERSONAL KNOWLEDGE ===== */
(()=>{
 const K={
  identity:'Prince Dixit is 22, based in Delhi, India, focused on E-commerce Operations × Digital × Automation.',
  contact:'Prince can be contacted at demonicspirit888@gmail.com or +91 88878 31825.',
  education:'BA (Hons.) Economics at Banaras Hindu University; CUET Reasoning 99.43 percentile; Class 12 Commerce; Digital Marketing training.',
  experience:'Experience includes Multybyte Marketing India — E-commerce Operations (May 2026–Present); Crafts Banaras — E-commerce Manager; Paraxion Management & Consultant Pvt. Ltd. — Telesales Executive; and Unique Threads Sarees — Orders & Inventory Manager.',
  skills:'E-commerce Operations, Google Sheets, Apps Script, JavaScript, SEO, Digital Marketing, AI Workflows, HTML/CSS and APIs.',
  systems:'Multybyte Automation, Operational Spreadsheet Systems, AI / Software Experiments, ME N U, EyeNav / Doc, and the Prince-Resume portfolio system.',
  multybyte:'Prince works on product/SKU workflows, purchasing coordination, vendor workflows, warehouse coordination and Google Sheets + Apps Script automation, including retries, caching, locks and backup/recovery.',
  doc:'EyeNav evolved toward Doc, an Android voice-assistant concept using hey doc / doc commands, with background and locked-screen command goals.',
  menu:'ME N U is a private relationship-focused Google Sheets/AI project with TODAY, MEMORIES, FUTURE and SECRET areas plus tasks, coins and assistant interactions.',
  nova:'Nova is Prince’s portfolio assistant. Keep Nova’s physical appearance basic unless Prince explicitly asks for a visual/model change.'
 };
 window.princeNovaPersonalAnswer=function(q){const x=q.toLowerCase();
  if(/who is prince|about prince|tell me about prince/.test(x))return K.identity;
  if(/where.*prince|location.*prince/.test(x))return 'Prince is based in Delhi, India.';
  if(/contact|email|phone|reach prince/.test(x))return K.contact;
  if(/education|bhu|cuet/.test(x))return K.education;
  if(/experience|career|worked|jobs/.test(x))return K.experience;
  if(/skills|stack|technology/.test(x))return K.skills;
  if(/multybyte/.test(x))return K.multybyte;
  if(/eyenav|doc android|voice assistant/.test(x))return K.doc;
  if(/me n u|menu project/.test(x))return K.menu;
  if(/nova.*look|nova.*model|nova.*appearance/.test(x))return K.nova;
  if(/projects|systems|what.*build/.test(x))return K.systems;
  return null;
 };
 const form=document.getElementById('botForm'),input=document.getElementById('botInput'),messages=document.getElementById('botMessages');
 if(form&&input&&messages){form.addEventListener('submit',e=>{const q=input.value.trim(),a=window.princeNovaPersonalAnswer(q);if(!q||!a)return;e.preventDefault();e.stopImmediatePropagation();const u=document.createElement('div');u.className='bot-msg user';u.textContent=q;messages.appendChild(u);input.value='';setTimeout(()=>{const b=document.createElement('div');b.className='bot-msg bot';b.textContent=a;messages.appendChild(b);messages.scrollTop=messages.scrollHeight},160)},true)}
})();

/* ===== HOMEPAGE 3D INTERACTIVE CORE ===== */
(()=>{const stage=document.getElementById('home3dStage'),cube=document.getElementById('home3dCube');if(!stage||!cube)return;
let rx=-18,ry=-32,lastX=0,lastY=0,drag=false,raf=0;
const render=()=>{raf=0;cube.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';};
const move=(x,y)=>{if(!drag)return;ry+=(x-lastX)*.45;rx-=(y-lastY)*.45;rx=Math.max(-70,Math.min(70,rx));lastX=x;lastY=y;if(!raf)raf=requestAnimationFrame(render)};
stage.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;stage.classList.add('dragging');stage.setPointerCapture?.(e.pointerId)});
stage.addEventListener('pointermove',e=>move(e.clientX,e.clientY));
stage.addEventListener('pointerup',()=>{drag=false;stage.classList.remove('dragging')});
stage.addEventListener('pointercancel',()=>{drag=false;stage.classList.remove('dragging')});
stage.addEventListener('wheel',e=>{e.preventDefault();ry+=e.deltaY*.18;rx-=e.deltaX*.08;if(!raf)raf=requestAnimationFrame(render)},{passive:false});
render();
})();


/* ===== PERFORMANCE PASS ===== */
(()=>{const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,coarse=matchMedia('(pointer:coarse)').matches;if(coarse){document.querySelector('.cursor')?.remove();document.querySelector('.cursor-dot')?.remove()}document.querySelectorAll('img').forEach((img,i)=>{if(i>1&&!img.loading)img.loading='lazy';if(!img.decoding)img.decoding='async'});const loader=document.getElementById('loader');if(loader){const hide=()=>{loader.style.opacity='0';loader.style.visibility='hidden';loader.style.pointerEvents='none'};window.addEventListener('load',()=>setTimeout(hide,reduce?180:650),{once:true});setTimeout(hide,reduce?900:1800)}})();


/* ===== UI UPGRADE JS — ADDITIVE / DEFENSIVE ===== */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fine=matchMedia('(pointer:fine)').matches;
 const header=document.querySelector('header');
 let raf=0;
 addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{header?.classList.toggle('scrolled',scrollY>18);raf=0})},{passive:true});
 header?.classList.toggle('scrolled',scrollY>18);
 /* Active navigation indicator, including inner pages. */
 const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 document.querySelectorAll('nav a').forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();if(href===file||((file==='index.html'||!file)&&href==='#home'))a.classList.add('active')});
 /* Smooth page transition without blocking navigation. */
 if(!reduce){document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:')||a.target==='_blank'||href.startsWith('http'))return;const u=new URL(href,location.href);if(u.origin!==location.origin)return;e.preventDefault();document.body.classList.add('page-exit');setTimeout(()=>{location.href=u.href},150)})}
 /* Mobile sticky high-value actions: Contact, Resume and Nova. */
 if(matchMedia('(max-width:700px)').matches && !document.querySelector('.mobile-action-bar')){
   const bar=document.createElement('div');bar.className='mobile-action-bar';bar.setAttribute('aria-label','Quick actions');
   bar.innerHTML='<a href="contact.html">CONTACT</a><a href="resume.html">RESUME</a><button type="button" data-mobile-nova>NOVA ✦</button>';
   document.body.appendChild(bar);
   bar.querySelector('[data-mobile-nova]')?.addEventListener('click',()=>document.getElementById('botOrb')?.click());
 }
 /* Keep mobile interactions lightweight: no tilt, no pointer-follow spotlight work. */
 if(!fine){document.querySelectorAll('.project,.process-card,.build-grid>div,.edu-grid>div,.training-card').forEach(el=>{el.style.willChange='auto'});}
 /* Prevent accidental long-press selection on interactive controls while retaining text selection elsewhere. */
 document.querySelectorAll('.btn,.menu,.bot-orb,.inner-cta,.demo-run').forEach(el=>el.style.webkitTapHighlightColor='transparent');
 /* Respect reduced motion and avoid the page-exit animation in that mode. */
 if(reduce)document.body.classList.add('motion-reduced');
})();


/* Mobile menu visual state — additive to existing menu behavior. */
(()=>{const m=document.querySelector('.menu'),n=document.querySelector('nav');if(!m||!n)return;m.addEventListener('click',()=>m.classList.toggle('open'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>m.classList.remove('open')));})();

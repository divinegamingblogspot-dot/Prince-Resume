/* PRINCE.OS PRO INTERACTION LAYER — additive and defensive. */
(()=>{if(window.__princeProLayer)return;window.__princeProLayer=true;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('pro-ready');

/* ===== SHORT PAGE LOADER + NAVIGATION TRANSITION =====
   Home keeps the full 5s cinematic intro. Every other route gets a compact,
   non-blocking loader so navigation feels intentional without delaying content. */
const siteRoot='https://divinegamingblogspot-dot.github.io/Prince-Resume/';
const homeRoute=/\/Prince-Resume\/?(?:index\.html)?$/i.test(location.pathname);
const shortLoaderHTML='<div class="short-loader-core"><span class="short-loader-ring"></span><span class="short-loader-dot"></span><b>PRINCE.OS</b><small>LOADING PAGE</small></div>';
const makeShortLoader=()=>{
  let el=document.getElementById('pageShortLoader');
  if(el)return el;
  el=document.createElement('div');
  el.id='pageShortLoader';
  el.className='page-short-loader';
  el.setAttribute('role','status');
  el.setAttribute('aria-label','Loading page');
  el.innerHTML=shortLoaderHTML;
  document.body.insertBefore(el,document.body.firstChild);
  return el;
};
const releaseShortLoader=(el,delay=620)=>{
  if(!el)return;
  setTimeout(()=>{el.classList.add('is-done');setTimeout(()=>el.remove(),220)},delay);
};
if(!homeRoute){
  const legacy=document.getElementById('loader');
  if(legacy){ legacy.classList.add('short-page-loader'); legacy.style.display='none'; legacy.setAttribute('aria-hidden','true'); }
  const pageLoader=makeShortLoader(); pageLoader.dataset.singleTransition='true';
  releaseShortLoader(pageLoader,420);
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;
    const raw=a.getAttribute('href')||'';
    if(!raw||raw.startsWith('#')||/^(mailto:|tel:|javascript:)/i.test(raw))return;
    let u;try{u=new URL(raw,location.href)}catch(_){return}
    if(u.origin!==location.origin)return;
    const current=new URL(location.href);u.hash='';current.hash='';
    if(u.href===current.href)return;
    const next=makeShortLoader();next.classList.remove('is-done');
  },true);
}

/* ===== SEO HARDENING — additive, canonical and content-aware =====
   Existing authored metadata wins when valid; missing/incorrect technical
   metadata is repaired so every indexable route exposes a consistent signal. */
(()=>{
  const robots=document.querySelector('meta[name="robots"]')?.content||'';
  const noindex=/noindex/i.test(robots);
  const path=location.pathname;
  const canonicalPath=path.replace(/\/index\.html$/i,'/');
  const canonical=siteRoot.replace(/\/$/,'')+(canonicalPath.startsWith('/Prince-Resume')?canonicalPath:'/'+canonicalPath.replace(/^\//,''));
  const pageTitle=(document.querySelector('h1')?.textContent||document.title||'Prince Dixit Portfolio').replace(/\\s+/g,' ').trim();
  const existingDesc=document.querySelector('meta[name="description"]')?.content?.trim();
  const bodyText=(document.querySelector('main')?.innerText||document.body.innerText||'').replace(/\\s+/g,' ').trim();
  const desc=(existingDesc&&existingDesc.length>=70&&existingDesc.length<=180)?existingDesc:bodyText.slice(0,155).replace(/\\s+\\S*$/,'')||'Prince Dixit portfolio covering e-commerce operations, digital marketing, SEO, automation, practical software systems and AI interfaces.';
  const ensureMeta=(name,content)=>{
    let m=document.querySelector('meta[name="'+name+'"]');
    if(!m){m=document.createElement('meta');m.name=name;document.head.appendChild(m)}
    if(content)m.content=content;
  };
  const ensureProp=(property,content)=>{
    let m=document.querySelector('meta[property="'+property+'"]');
    if(!m){m=document.createElement('meta');m.setAttribute('property',property);document.head.appendChild(m)}
    if(content)m.content=content;
  };
  if(!noindex){
    let c=document.querySelector('link[rel="canonical"]');
    if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c)}
    c.href=canonical;
  }
  ensureMeta('description',desc);
  ensureMeta('author','Prince Dixit');
  ensureMeta('robots',noindex?'noindex,follow':'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  ensureMeta('theme-color','#08090d');
  const imageNode=document.querySelector('.article-hero img,main img[alt],img[alt]');
  const image=imageNode?new URL(imageNode.getAttribute('src'),location.href).href:siteRoot+'images/automation.svg';
  ensureProp('og:type',document.querySelector('.article-body')?'article':'website');
  ensureProp('og:title',pageTitle);
  ensureProp('og:description',desc);
  ensureProp('og:url',canonical);
  ensureProp('og:site_name','Prince Dixit Portfolio');
  ensureProp('og:image',image);
  ensureProp('og:image:alt',imageNode?.alt||'Prince Dixit portfolio');
  ensureMeta('twitter:card','summary_large_image');
  ensureMeta('twitter:title',pageTitle);
  ensureMeta('twitter:description',desc);
  ensureMeta('twitter:image',image);
  ensureMeta('twitter:url',canonical);

  document.documentElement.lang=document.documentElement.lang||'en';
  document.querySelectorAll('img').forEach((img,i)=>{
    if(!img.hasAttribute('alt'))img.alt='Prince Dixit portfolio visual';
    if(!img.hasAttribute('decoding'))img.decoding='async';
    if(i>0&&!img.hasAttribute('loading'))img.loading='lazy';
  });
  document.querySelectorAll('a').forEach(a=>{
    if(a.target==='_blank'&&!a.rel.includes('noopener'))a.rel=(a.rel+' noopener').trim();
    if(!a.getAttribute('aria-label')&&!a.textContent.trim()&&a.querySelector('img'))a.setAttribute('aria-label',a.querySelector('img').alt||'Open portfolio link');
  });

  const addJSON=(key,obj)=>{
    if(document.querySelector('script[data-seo="'+key+'"]'))return;
    const s=document.createElement('script');s.type='application/ld+json';s.dataset.seo=key;s.textContent=JSON.stringify(obj);document.head.appendChild(s);
  };
  addJSON('person',{
    '@context':'https://schema.org','@type':'Person','@id':siteRoot+'#prince-dixit',
    name:'Prince Dixit',url:siteRoot+'about.html',jobTitle:'E-commerce Operations & Digital Automation Professional',
    description:'E-commerce operations, digital marketing, SEO, business automation and practical software systems.',
    homeLocation:{'@type':'Place',name:'Delhi, India'},sameAs:['https://github.com/divinegamingblogspot-dot']
  });
  addJSON('webpage',{'@context':'https://schema.org','@type':'WebPage','@id':canonical+'#webpage',name:pageTitle,url:canonical,description:desc,isPartOf:{'@type':'WebSite','@id':siteRoot+'#website',name:'Prince Dixit Portfolio',url:siteRoot},about:{'@id':siteRoot+'#prince-dixit'}});
  const crumbs=[...document.querySelectorAll('.portfolio-breadcrumb a,.portfolio-breadcrumb span')].map((el,i)=>({name:el.textContent.trim(),item:el.href||canonical,position:i+1})).filter(x=>x.name);
  if(crumbs.length)addJSON('breadcrumbs',{'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':crumbs.map(x=>({'@type':'ListItem',position:x.position,name:x.name,item:x.item}))});
  const article=document.querySelector('.article-shell');
  if(article){
    const headline=article.querySelector('h1')?.textContent.trim()||pageTitle;
    const articleImage=article.querySelector('img')?new URL(article.querySelector('img').getAttribute('src'),location.href).href:image;
    addJSON('article',{'@context':'https://schema.org','@type':'BlogPosting','headline':headline,image:[articleImage],author:{'@type':'Person','name':'Prince Dixit','url':siteRoot+'about.html'},mainEntityOfPage:{'@type':'WebPage','@id':canonical},description:desc});
  }
})();
/* Remove an unintended/injected accessibility skip control from the visible Prince.OS UI. */
const removeUnexpectedSkipControl=()=>{document.querySelectorAll('a,button').forEach(el=>{const t=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();if(t==='skip to content'||t==='skip to main content')el.remove()})};
removeUnexpectedSkipControl();
new MutationObserver(removeUnexpectedSkipControl).observe(document.documentElement,{childList:true,subtree:true});
/* Loader safety: content must always win. Keep cinematic intro, but never allow a stuck overlay. */
const introLoader=document.getElementById('loader');
if(introLoader){const releaseIntro=()=>{introLoader.style.opacity='0';introLoader.style.visibility='hidden';introLoader.style.pointerEvents='none';introLoader.setAttribute('aria-hidden','true');};document.addEventListener('DOMContentLoaded',()=>setTimeout(releaseIntro,5350),{once:true});setTimeout(releaseIntro,6500);}
const nav=document.querySelector('.inner-nav')||document.querySelector('header nav');
if(nav&&!document.querySelector('.pro-system-rail')){const rail=document.createElement('div');rail.className='pro-system-rail';rail.innerHTML='<b>PRINCE.OS</b><span class="pro-chip">SYSTEMS</span><span class="pro-chip">DIGITAL</span><span class="pro-chip">AUTOMATION</span><span class="pro-chip">AI</span><span class="pro-chip">SEO</span>';const h=nav.closest('header');if(h)h.insertAdjacentElement('afterend',rail)}
/* Unified navigation: keep legacy URLs alive while presenting combined sections. */
if(nav){const links=[...nav.querySelectorAll('a')];const navBase=location.pathname.includes('/blog/')?'../':'';const set=(match,label,href)=>{const a=links.find(x=>match.test((x.textContent||'').trim()));if(a){a.textContent=label;a.href=navBase+href;a.classList.toggle('active',location.pathname.endsWith('/'+href))}};set(/^Projects$/,'Work','work.html');set(/^Insights$/,'Work','work.html');set(/^Experience$/,'Career','career.html');set(/^Now$/,'Career','career.html');set(/^Recruiter$/,'Profile','profile.html');set(/^Resume$/,'Profile','profile.html');links.forEach((a,i)=>{if((a.textContent||'')==='Work'||(a.textContent||'')==='Career'||(a.textContent||'')==='Profile'){const dup=links.find((x,j)=>j>i&&(x.textContent||'')===a.textContent);if(dup)dup.remove()}});if(![...nav.querySelectorAll('a')].some(a=>a.getAttribute('href')==='blog.html')){const b=document.createElement('a');b.href=navBase+'blog.html';b.textContent='Blog';b.classList.toggle('active',location.pathname.endsWith('/blog.html')||location.pathname.includes('/blog/'));const work=[...nav.querySelectorAll('a')].find(a=>a.getAttribute('href')==='work.html');if(work)work.insertAdjacentElement('afterend',b);else nav.appendChild(b)}}
/* 13: route transition is entrance-only so existing click handlers remain untouched. */
const bar=document.createElement('div');bar.className='pro-scrollbar';bar.innerHTML='<i></i>';document.body.appendChild(bar);const fill=bar.firstElementChild;
const sections=[...document.querySelectorAll('main section')].filter(s=>s.offsetHeight>40),index=document.createElement('div');index.className='pro-section-index';sections.slice(0,12).forEach(()=>index.appendChild(document.createElement('i')));if(sections.length>1)document.body.appendChild(index);const dots=[...index.children];
let ticking=false,activeIndex=-1;
const tick=()=>{
  ticking=false;
  const max=document.documentElement.scrollHeight-innerHeight;
  fill.style.width=(max>0?scrollY/max*100:0)+'%';
  if(!sections.length)return;
  let active=0;
  const threshold=innerHeight*.48;
  for(let i=0;i<sections.length;i++){if(sections[i].getBoundingClientRect().top<threshold)active=i;else break}
  if(active!==activeIndex){activeIndex=active;dots.forEach((d,i)=>d.classList.toggle('active',i===active))}
};
const requestTick=()=>{if(!ticking){ticking=true;requestAnimationFrame(tick)}};
addEventListener('scroll',requestTick,{passive:true});
addEventListener('resize',requestTick,{passive:true});
requestTick();
if(!reduce&&matchMedia('(pointer:fine)').matches){[...document.querySelectorAll('.inner-card,.portfolio-proof article,.portfolio-insights a')].slice(0,8).forEach(el=>el.classList.add('pro-3d'))}
const page=document.body.dataset.page||'',main=document.querySelector('main');
if(page==='now'&&main&&!main.querySelector('.pro-now-grid')){const g=document.createElement('section');g.className='pro-now-grid';g.innerHTML='<article class="pro-now-card"><span class="pro-now-stamp">NOW / CURRENT FOCUS</span><h2>Building useful systems, not just pages.</h2><div class="pro-now-list"><div class="pro-now-item"><small>01</small><div><b>Portfolio</b><p>Refining Prince.OS into a clearer portfolio of projects, systems, insights and recruiter context.</p></div></div><div class="pro-now-item"><small>02</small><div><b>Automation</b><p>Exploring dependable e-commerce workflows, product data, image synchronization and operational tooling.</p></div></div><div class="pro-now-item"><small>03</small><div><b>AI</b><p>Developing Nova as a contextual portfolio interface rather than a generic chat box.</p></div></div><div class="pro-now-item"><small>04</small><div><b>Learning</b><p>Connecting digital marketing, SEO, JavaScript and business operations into practical systems.</p></div></div></div></article><aside class="pro-now-card"><span class="pro-now-stamp">STATUS</span><h3>Prince.OS / Online</h3><p>Last updated: September 30, 2026.</p><div class="pro-divider"></div><p>Focus areas</p><div class="pro-chip">E-commerce</div> <div class="pro-chip">Automation</div> <div class="pro-chip">SEO</div> <div class="pro-chip">AI UX</div></aside></section>';main.appendChild(g)}
if(page==='contact'&&main&&!main.querySelector('.pro-contact-panel')){const s=document.createElement('section');s.className='pro-contact-panel';s.innerHTML='<div class="pro-contact-grid"><article class="pro-contact-card"><small>OPPORTUNITIES</small><h3>Have a role or project?</h3><p>Use the direct contact options on this page and include the role, project or problem you want to discuss.</p></article><article class="pro-contact-card"><small>PORTFOLIO CONTEXT</small><h3>Want the technical story?</h3><p>Start with Projects and Systems, then use Nova for a conversational route through the portfolio.</p></article></div>';main.appendChild(s)}
if(main&&page!=='now'){const n=document.createElement('div');n.className='pro-entity-line';n.innerHTML='<strong>Prince Dixit portfolio</strong> · E-commerce operations · Digital marketing · SEO · Automation · Practical software systems · AI interfaces';main.appendChild(n)}
})();

/* ============================================================
   PRINCE OS 2.0 SELECTED UPGRADES
   Additive, defensive and performance-conscious.
   ============================================================ */
(()=>{if(window.__princeOS20)return;window.__princeOS20=true;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const path=location.pathname;
const root=document.documentElement;
const body=document.body;
const siteRoot='https://divinegamingblogspot-dot.github.io/Prince-Resume/';
const page=body.dataset.page||'';
const isHome=/\/Prince-Resume\/?(?:index\.html)?$/i.test(path);
const isArticle=/\/blog\/[^/]+\.html$/i.test(path);
const isBlogIndex=/\/blog\.html$/i.test(path);
const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const safeText=s=>String(s||'').replace(/\s+/g,' ').trim();

/* ---------- 1 / performance hardening ---------- */
if(!isHome){
  qsa('img').forEach((img,i)=>{
    img.decoding='async';
    if(i===0 || img.closest('.article-hero')) img.loading='eager';
    else img.loading='lazy';
    if(img.closest('.article-hero')) img.setAttribute('fetchpriority','high');
    const reserve=()=>{
      if(!img.width&&img.naturalWidth&&img.naturalHeight){
        img.style.aspectRatio=img.naturalWidth+'/'+img.naturalHeight;
      }
    };
    if(img.complete)reserve();else img.addEventListener('load',reserve,{once:true,passive:true});
  });
  qsa('main section').forEach(s=>{
    if(!s.classList.contains('inner-hero')&&!s.classList.contains('portfolio-command')&&!s.querySelector('form,input,textarea,.resume-quickbar'))
      s.classList.add('pro-upgrade-card');
  });
}
/* Pause only the upgrade layer's own animations when offscreen; existing intro animations are deliberately untouched. */
if(!reduce){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.target.classList.contains('pro-upgrade-card'))e.target.classList.toggle('pro-offscreen',!e.isIntersecting);
  }),{rootMargin:'120px 0px'});
  qsa('.pro-upgrade-card').forEach(el=>io.observe(el));
}

/* ---------- 3 / blog UX ---------- */
const blogTitles=[
  ['automation-starts-with-the-workflow.html','Automation starts with the workflow.'],
  ['reliable-google-sheets-automation.html','Reliable Google Sheets automation.'],
  ['ecommerce-product-data-system.html','E-commerce product data system.'],
  ['seo-is-information-architecture.html','SEO is information architecture.'],
  ['contextual-ai-on-a-portfolio.html','Contextual AI on a portfolio.'],
  ['performance-without-sacrificing-design.html','Performance without sacrificing design.'],
  ['protecting-data-in-automated-workflows.html','Protecting data in automated workflows.'],
  ['mobile-first-portfolio-systems.html','Mobile-first portfolio systems.'],
  ['building-a-portfolio-as-a-system.html','Building a portfolio as a system.'],
  ['reliability-is-a-feature.html','Reliability is a feature.']
];
const slugFor=p=>p.split('/').pop();
function addBlogMeta(card){
  if(card.querySelector('.pro-blog-meta'))return;
  const text=safeText(card.innerText);
  const words=Math.max(1,text.split(/\s+/).length);
  const minutes=Math.max(2,Math.round(words/190));
  const meta=document.createElement('div');meta.className='pro-blog-meta';
  meta.innerHTML='<span>'+minutes+' min read</span><span>PRINCE.OS / BLOG</span>';
  card.appendChild(meta);
}
if(isBlogIndex){
  const cards=qsa('.portfolio-insights a,.blog-card,.post-card,.blog-grid article,.insights-grid article,main article').filter(x=>x.querySelector('a,h2,h3')||x.matches('a'));
  const unique=[...new Set(cards)];
  if(unique.length){
    unique.forEach(c=>{c.classList.add('pro-blog-card');addBlogMeta(c)});
    const host=unique[0].parentElement;
    if(host&&!qs('.pro-blog-toolbar',host.parentElement)){
      const bar=document.createElement('div');bar.className='pro-blog-toolbar';
      bar.innerHTML='<input class="pro-blog-search" type="search" placeholder="Search articles…" aria-label="Search blog articles"><select class="pro-blog-filter" aria-label="Filter blog articles"><option value="all">All topics</option><option value="automation">Automation</option><option value="seo">SEO</option><option value="ai">AI / UX</option><option value="performance">Performance</option><option value="systems">Systems</option></select><span class="pro-blog-count"></span>';
      host.parentElement.insertBefore(bar,host);
      const empty=document.createElement('div');empty.className='pro-blog-empty';empty.textContent='No articles match that search.';
      host.parentElement.insertBefore(empty,host.nextSibling);
      const input=bar.querySelector('input'),select=bar.querySelector('select'),count=bar.querySelector('.pro-blog-count');
      const apply=()=>{
        const term=safeText(input.value).toLowerCase(),filter=select.value;
        let visible=0;
        unique.forEach(card=>{
          const t=safeText(card.innerText).toLowerCase();
          const okText=!term||t.includes(term);
          const okFilter=filter==='all'||t.includes(filter);
          card.classList.toggle('is-filtered',!(okText&&okFilter));
          if(okText&&okFilter)visible++;
        });
        count.textContent=visible+' / '+unique.length+' ARTICLES';
        empty.style.display=visible?'none':'block';
      };
      input.addEventListener('input',apply,{passive:true});select.addEventListener('change',apply);apply();
    }
  }
}
if(isArticle){
  const shell=qs('.article-shell');
  if(shell){
    const progress=document.createElement('div');progress.className='pro-article-progress';document.body.appendChild(progress);
    let raf=0;
    const updateProgress=()=>{
      raf=0;
      const top=shell.getBoundingClientRect().top+scrollY;
      const total=Math.max(1,shell.scrollHeight-innerHeight);
      const p=Math.max(0,Math.min(1,(scrollY-top)/total))*100;
      progress.style.width=p+'%';
    };
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(updateProgress)},{passive:true});addEventListener('resize',updateProgress,{passive:true});updateProgress();

    const tools=document.createElement('div');tools.className='pro-article-tools';
    const copy=document.createElement('button');copy.type='button';copy.textContent='Copy link';
    const share=document.createElement('button');share.type='button';share.textContent='Share';
    const back=document.createElement('a');back.href='../blog.html';back.textContent='← All articles';
    copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);copy.textContent='Copied ✓';setTimeout(()=>copy.textContent='Copy link',1300)}catch(_){copy.textContent='Copy unavailable'}});
    share.addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href})}catch(_){}}else{try{await navigator.clipboard.writeText(location.href);share.textContent='Link copied ✓';setTimeout(()=>share.textContent='Share',1300)}catch(_){}}});
    tools.append(copy,share,back);
    shell.parentElement.insertBefore(tools,shell);

    const headings=qsa('.article-body h2,.article-body h3',shell);
    if(headings.length>1){
      const layout=document.createElement('div');layout.className='pro-article-layout';
      const content=document.createElement('div');content.className='pro-article-main';
      const toc=document.createElement('aside');toc.className='pro-article-toc';toc.setAttribute('aria-label','Article contents');
      const label=document.createElement('b');label.textContent='ON THIS PAGE';toc.appendChild(label);
      headings.forEach((h,i)=>{const id=h.id||'section-'+(i+1);h.id=id;const a=document.createElement('a');a.href='#'+id;a.textContent=safeText(h.textContent);if(h.tagName==='H3')a.classList.add('sub');toc.appendChild(a)});
      const parent=shell.parentElement;
      const nodes=[...parent.childNodes];nodes.forEach(n=>{if(n===tools)return});
      parent.insertBefore(layout,shell);content.appendChild(shell);layout.append(content,toc);
    }
    const related=document.createElement('section');related.className='pro-blog-related';related.innerHTML='<h2>Keep reading</h2><div class="pro-blog-related-grid"></div>';
    const grid=qs('.pro-blog-related-grid',related),current=slugFor(path);
    blogTitles.filter(x=>x[0]!==current).slice(0,3).forEach(([file,title])=>{
      const a=document.createElement('article');a.innerHTML='<a href="'+file+'">'+title+'</a><small>Prince.OS / Blog</small>';grid.appendChild(a);
    });
    shell.parentElement.appendChild(related);
  }
}

/* ---------- 4 + 5 / contextual, expressive Nova ---------- */
const nova=qs('#pageBot'),messages=qs('#botMessages',nova||document);
if(nova&&messages){
  const contextMap={
    work:['This page / Work','Show me the projects','What systems are behind these builds?','Explain the insights'],
    career:['This page / Career','Summarize Prince’s experience','What does he do now?','Which skills support his work?'],
    profile:['This page / Profile','Give me the recruiter summary','What is Prince’s stack?','Open the resume'],
    blog:['This page / Blog','What should I read first?','Explain the latest article','Show me automation articles'],
    contact:['This page / Contact','How can I contact Prince?','What roles fit his background?','Show me the recruiter view'],
    now:['This page / Now','What is Prince focused on?','What is he building?','Ask about his systems'],
    projects:['This page / Projects','What are Prince’s main projects?','Tell me about Multybyte','Tell me about Nova']
  };
  const key=page||((isBlogIndex||isArticle)?'blog':'');
  const cfg=contextMap[key]||['This page / Prince.OS','Who is Prince?','What does he build?','Show me his experience'];
  let strip=qs('.nova-context-strip',messages);
  if(!strip){strip=document.createElement('div');strip.className='nova-context-strip';messages.insertBefore(strip,messages.firstChild)}
  strip.innerHTML='<b>NOVA CONTEXT</b><span>'+cfg[0]+'</span><i>contextual</i>';
  let suggestions=qs('.nova-suggest-plus',messages);
  if(!suggestions){suggestions=document.createElement('div');suggestions.className='nova-suggest-plus';messages.appendChild(suggestions)}
  suggestions.innerHTML='';
  cfg.slice(1).forEach(q=>{const b=document.createElement('button');b.type='button';b.dataset.botQ=q;b.textContent=q;suggestions.appendChild(b)});
  if(!qs('.nova-voice',messages)&&'speechSynthesis' in window){
    const voice=document.createElement('button');voice.type='button';voice.className='nova-voice';voice.setAttribute('aria-label','Read Nova replies aloud');voice.textContent='VOICE';
    voice.addEventListener('click',()=>{const last=[...qsa('.bot-msg.bot',messages)].pop();if(last)window.speechSynthesis.speak(new SpeechSynthesisUtterance(last.textContent))});
    suggestions.appendChild(voice);
  }
  nova.classList.add('nova-context-aware');
  if(!reduce){let idleTimer;const wake=()=>{nova.classList.add('nova-attentive');clearTimeout(idleTimer);idleTimer=setTimeout(()=>nova.classList.remove('nova-attentive'),1800)};document.addEventListener('pointerdown',wake,{passive:true});}
}

/* ---------- 7 / theme system ---------- */
const themes=[
  ['midnight','Midnight'],['graphite','Graphite'],['pearl','Pearl'],['cream','Cream'],
  ['rose','Rose'],['aurora','Aurora'],['cyber','Cyber'],['minimal','Minimal']
];
const saved=localStorage.getItem('prince-os-theme')||'midnight';
body.dataset.princeTheme=themes.some(t=>t[0]===saved)?saved:'midnight';
function setTheme(name){
  if(!themes.some(t=>t[0]===name))return;
  body.dataset.princeTheme=name;localStorage.setItem('prince-os-theme',name);
  qsa('.pro-theme-swatch').forEach(b=>b.classList.toggle('active',b.dataset.theme===name));
}
window.PrinceOSTheme={set:setTheme,themes:themes};

/* ---------- 9 / micro interactions ---------- */
if(fine&&!reduce){
  qsa('.btn,.inner-cta,.portfolio-cta a,.portfolio-map a,.hero-meta-link').forEach(el=>{
    if(el.dataset.proMagnet)return;el.dataset.proMagnet='1';el.classList.add('pro-upgrade-magnetic');
    let raf=0,x=0,y=0;
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();x=(e.clientX-(r.left+r.width/2))/r.width*5;y=(e.clientY-(r.top+r.height/2))/r.height*5;
      if(!raf)raf=requestAnimationFrame(()=>{el.classList.add('is-magnet-active');el.style.transform='translate3d('+x+'px,'+y+'px,0)';raf=0});
    },{passive:true});
    el.addEventListener('pointerleave',()=>{if(raf)cancelAnimationFrame(raf);raf=0;el.classList.remove('is-magnet-active');el.style.transform=''});
  });
}

/* ---------- 10 / mobile navigation + touch safety ---------- */
const mobileMenus=qsa('.inner-menu,.menu');
mobileMenus.forEach(menu=>{
  const nav=menu.parentElement?.querySelector('nav');
  if(!nav)return;
  if(!menu.dataset.proMobile){
    menu.dataset.proMobile='1';
    menu.addEventListener('click',()=>{if(innerWidth<=800){const open=nav.classList.contains('open');menu.setAttribute('aria-expanded',String(open));}});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
  }
});

/* ---------- 12 + 13 / SEO + accessibility hardening ---------- */
const noindex=/noindex/i.test(qs('meta[name="robots"]')?.content||'');
if(!noindex){
  const canonical=siteRoot+path.replace(/^\/Prince-Resume\/?/,'').replace(/^index\.html$/,'').replace(/^$/,'');
  let c=qs('link[rel="canonical"]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c)}
  c.href=canonical.endsWith('/')?canonical:canonical;
}
qsa('nav a').forEach(a=>{
  const href=a.getAttribute('href')||'';
  if(!a.getAttribute('aria-current')&&(href===location.pathname.split('/').pop()||((href==='index.html'||href==='#home')&&isHome)))a.setAttribute('aria-current','page');
});
qsa('img').forEach(img=>{
  if(!img.alt)img.alt=img.closest('.article-hero')?'Article illustration':'Prince Dixit portfolio visual';
  if(!img.hasAttribute('decoding'))img.decoding='async';
});
if(!qs('script[data-os20-schema="website"]')){
  const s=document.createElement('script');s.type='application/ld+json';s.dataset.os20Schema='website';
  s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebSite','name':'Prince Dixit Portfolio','url':siteRoot,'publisher':{'@type':'Person','name':'Prince Dixit','url':siteRoot+'about.html'},'inLanguage':'en-IN'});
  document.head.appendChild(s);
}
if(isArticle&&!qs('script[data-os20-schema="article"]')){
  const h=safeText(qs('h1')?.textContent||document.title);
  const s=document.createElement('script');s.type='application/ld+json';s.dataset.os20Schema='article';
  s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting','headline':h,'mainEntityOfPage':location.href,'author':{'@type':'Person','name':'Prince Dixit','url':siteRoot+'about.html'},'publisher':{'@type':'Person','name':'Prince Dixit'},'dateModified':document.lastModified});
  document.head.appendChild(s);
}
/* Add a machine-readable breadcrumb on every non-home indexable route, including article routes where visible breadcrumbs are intentionally absent. */
if(!isHome&&!noindex&&!qs('script[data-os20-schema="breadcrumb"]')){
  const parts=path.replace(/^\/Prince-Resume\/?/,'').split('/').filter(Boolean);
  const items=[{'@type':'ListItem',position:1,name:'Prince.OS',item:siteRoot}];
  if(parts.length){
    let item=siteRoot;
    parts.forEach((part,i)=>{item+=part+(part.includes('.')?'':'/');items.push({'@type':'ListItem',position:i+2,name:safeText(part.replace(/\.html$/,'').replace(/[-_]/g,' ')),item})});
  }
  const s=document.createElement('script');s.type='application/ld+json';s.dataset.os20Schema='breadcrumb';s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':items});document.head.appendChild(s);
}
/* ---------- 14 / stronger 404 recovery ---------- */
if(page==='404'){
  const main=qs('main');
  if(main&&!qs('.pro-404-panel',main)){
    const panel=document.createElement('section');panel.className='pro-404-panel';
    panel.innerHTML='<span class="portfolio-command-kicker">RECOVERY / PRINCE.OS</span><h2>Find your way back into the system.</h2><p>The route is unavailable, but the portfolio is still online. Jump to a main destination or use the command palette.</p><div class="pro-404-actions"><a href="index.html">HOME ↗</a><a href="work.html">WORK ↗</a><a href="career.html">CAREER ↗</a><a href="profile.html">PROFILE ↗</a><a href="blog.html">BLOG ↗</a></div>';
    main.appendChild(panel);
  }
}

/* ---------- 16 / keyboard navigation + command palette ---------- */
let palette,backdrop,searchInput;
function openPalette(){if(!backdrop){buildPalette()}backdrop.classList.add('open');palette.setAttribute('aria-hidden','false');setTimeout(()=>searchInput?.focus(),30)}
function closePalette(){backdrop?.classList.remove('open');palette?.setAttribute('aria-hidden','true')}
function buildPalette(){
  backdrop=document.createElement('div');backdrop.className='pro-command-backdrop';backdrop.addEventListener('click',e=>{if(e.target===backdrop)closePalette()});
  palette=document.createElement('section');palette.className='pro-command-panel';palette.setAttribute('role','dialog');palette.setAttribute('aria-modal','true');palette.setAttribute('aria-label','Prince.OS command palette');palette.setAttribute('aria-hidden','true');
  const head=document.createElement('div');head.className='pro-command-head';
  searchInput=document.createElement('input');searchInput.type='search';searchInput.placeholder='Jump, search or change theme…';searchInput.setAttribute('aria-label','Command palette search');
  const k=document.createElement('span');k.className='pro-command-kbd';k.textContent='ESC';
  head.append(searchInput,k);
  const list=document.createElement('div');list.className='pro-command-list';
  const commands=[
    ['⌂','Home','Open the portfolio home','index.html'],['W','Work','Projects + Insights','work.html'],
    ['C','Career','Experience + current direction','career.html'],['B','Blog','Read portfolio articles','blog.html'],
    ['P','Profile','Recruiter + Resume','profile.html'],['N','Nova','Open the portfolio assistant','nova.html'],
    ['✉','Contact','Reach Prince directly','contact.html'],['R','Resume','Open the resume','resume.html']
  ];
  commands.forEach(([icon,title,desc,href])=>{const a=document.createElement('a');a.className='pro-command-item';a.href=href;a.innerHTML='<i>'+icon+'</i><span><b>'+title+'</b><small>'+desc+'</small></span><small>↗</small>';list.appendChild(a)});
  const themeRow=document.createElement('div');themeRow.className='pro-command-themes';
  themes.forEach(([id,label])=>{const b=document.createElement('button');b.type='button';b.className='pro-theme-swatch';b.dataset.theme=id;b.textContent=label;b.addEventListener('click',()=>setTheme(id));themeRow.appendChild(b)});
  palette.append(head,list,themeRow);backdrop.appendChild(palette);document.body.appendChild(backdrop);
  const filter=()=>{const t=safeText(searchInput.value).toLowerCase();qsa('.pro-command-item',list).forEach(a=>a.style.display=!t||safeText(a.innerText).toLowerCase().includes(t)?'grid':'none')};
  searchInput.addEventListener('input',filter,{passive:true});
  backdrop.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closePalette()}});
}
document.addEventListener('keydown',e=>{
  const tag=(e.target?.tagName||'').toLowerCase();const typing=tag==='input'||tag==='textarea'||tag==='select'||e.target?.isContentEditable;
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette();return}
  if(e.key==='Escape'){closePalette();return}
  if(!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key==='/'){e.preventDefault();openPalette();return}
  if(!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
    const key=e.key.toLowerCase();
    if(!window.__princeGKey)window.__princeGKey=0;
    if(key==='g'){window.__princeGKey=Date.now();return}
    if(Date.now()-window.__princeGKey<900){
      const map={w:'work.html',c:'career.html',b:'blog.html',p:'profile.html'};
      if(map[key]){window.__princeGKey=0;location.href=map[key]}
    }
  }
});

/* ---------- 17 / footer system ---------- */
qsa('footer').forEach(footer=>{
  if(qs('.pro-footer-upgrade',footer))return;
  const wrap=document.createElement('div');wrap.className='pro-footer-upgrade';
  wrap.innerHTML='<nav class="pro-footer-links" aria-label="Footer navigation"><a href="work.html">WORK</a><a href="career.html">CAREER</a><a href="profile.html">PROFILE</a><a href="blog.html">BLOG</a><a href="nova.html">NOVA</a><a href="contact.html">CONTACT</a></nav><span class="pro-footer-status"><i></i> PRINCE.OS / ONLINE · CTRL+K</span>';
  footer.appendChild(wrap);
});

/* ---------- 19 / smarter image handling ---------- */
qsa('img').forEach(img=>{
  if(img.closest('.article-hero'))img.setAttribute('fetchpriority','high');
  img.decoding='async';
});

/* ---------- 20 / connected portfolio graph ---------- */
const relatedByPage={
  work:['career.html','systems.html','blog.html','nova.html'],
  career:['work.html','profile.html','systems.html','contact.html'],
  profile:['career.html','work.html','resume.html','contact.html'],
  blog:['work.html','systems.html','nova.html'],
  contact:['profile.html','work.html','nova.html'],
  now:['career.html','systems.html','work.html','nova.html'],
  projects:['work.html','systems.html','career.html','nova.html']
};
const upgradeMain=qs('main');
if(upgradeMain&&relatedByPage[page]&&!qs('.pro-connected-panel')){
  const sec=document.createElement('section');sec.className='pro-blog-related pro-connected-panel';
  sec.innerHTML='<h2>Continue through the system</h2><div class="pro-blog-related-grid"></div>';
  const g=qs('.pro-blog-related-grid',sec);
  relatedByPage[page].forEach(href=>{const a=document.createElement('article');const name=href.replace('.html','').replace(/-/g,' ');a.innerHTML='<a href="'+href+'">'+name+'</a><small>Connected Prince.OS route ↗</small>';g.appendChild(a)});
  upgradeMain.appendChild(sec);
}

/* Theme controls are deliberately outside the cinematic intro DOM. */
setTheme(body.dataset.princeTheme||'midnight');
})();

/* ===== PERFORMANCE GUARD =====
   Keep non-critical visual upgrades off the critical rendering path. */
(()=>{
  const loadIdle=()=>{
    document.querySelectorAll('img:not([loading])').forEach((img,i)=>{if(i>0)img.loading='lazy';img.decoding='async'});
  };
  if('requestIdleCallback' in window) requestIdleCallback(loadIdle,{timeout:1200}); else setTimeout(loadIdle,700);
})();

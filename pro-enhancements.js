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
  if(legacy)legacy.classList.add('short-page-loader');
  const pageLoader=makeShortLoader();
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
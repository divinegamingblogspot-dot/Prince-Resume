(()=>{
'use strict';
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const page=document.body.dataset.page||'portfolio';
const ctx=document.getElementById('novaContext');
if(ctx)ctx.textContent='NOVA CONTEXT · '+page.toUpperCase();
document.querySelectorAll('.arch-node').forEach((n,i)=>{if(!reduce)setTimeout(()=>n.classList.add('active'),500+i*160)});
document.querySelectorAll('.skill-node').forEach(n=>n.addEventListener('click',()=>{document.querySelectorAll('.skill-node').forEach(x=>x.classList.remove('active'));n.classList.add('active');const d=document.getElementById('skillDetail');if(d){d.querySelector('h3').textContent=n.dataset.title||n.textContent;d.querySelector('p').textContent=n.dataset.desc||''}}));

const form=document.getElementById('botForm'),input=document.getElementById('botInput'),messages=document.getElementById('botMessages');
if(!form||!input||!messages)return;
const KEY='prince_nova_session_v4';
const pageNames={about:'About · profile',experience:'Experience · career history',systems:'Systems · build work',skills:'Skills · capability network',recruiter:'Recruiter · hiring view',resume:'Resume · ATS / visual',nova:'Nova · AI intelligence',contact:'Contact · reach Prince'};
const source={about:'about.html',experience:'experience.html',systems:'systems.html',skills:'skills.html',recruiter:'recruiter.html',resume:'resume.html',nova:'nova.html',contact:'contact.html'};
const KNOW={
 identity:{name:'Prince Dixit',age:22,location:'Delhi, India',focus:'E-commerce Operations × Digital × Automation'},
 contact:{email:'demonicspirit888@gmail.com',phone:'+91 88878 31825',github:'https://github.com/divinegamingblogspot-dot'},
 education:'Prince studied BA (Hons.) Economics at Banaras Hindu University, scored 99.43 percentile in CUET Reasoning, completed Class 12 Commerce, and has Digital Marketing training.',
 experience:[
  {company:'Multybyte Marketing India',role:'E-commerce Operations',period:'May 2026–Present',detail:'product/SKU workflows, purchasing coordination, vendor workflows, inventory, warehouse coordination, packing/dispatch and Google Sheets + Apps Script automation with retries, caching, locks and backup/recovery.'},
  {company:'Crafts Banaras',role:'E-commerce Manager',period:'March 2025–2026',detail:'order fulfillment, inventory/product availability, customer requirements, website support, digital marketing and business coordination.'},
  {company:'Paraxion Management & Consultant Pvt. Ltd.',role:'Telesales Executive',period:'November 2024–February 2025',detail:'client communication, lead follow-up, sales conversations, prospect conversion and sales targets.'},
  {company:'Unique Threads Sarees',role:'Orders & Inventory Manager',period:'May–October 2024',detail:'order handling, fulfillment and dispatch, stock availability, inventory movement and accurate order/stock information.'}
 ],
 skills:['E-commerce Operations','Google Sheets','Apps Script','JavaScript','HTML/CSS','APIs','SEO','Digital Marketing','AI Workflows','Business Automation'],
 systems:[
  {name:'Multybyte Automation',detail:'A practical operations system around SKU/product workflows, purchasing, vendor workflows, spreadsheets, warehouse execution and Apps Script automation.'},
  {name:'Operational Spreadsheet Systems',detail:'Structured spreadsheet workflows designed to reduce repetitive manual operations and keep business data controlled.'},
  {name:'AI / Software Experiments',detail:'Experiments turning ideas into usable software and AI-assisted interfaces.'},
  {name:'ME N U',detail:'A private relationship-focused Google Sheets/AI system with TODAY, MEMORIES, FUTURE and SECRET areas, tasks, coins and assistant interactions.'},
  {name:'EyeNav → Doc',detail:'An Android voice-assistant concept evolving from EyeNav toward “hey doc” / “doc” commands, with background and locked-screen command goals.'},
  {name:'Portfolio / Resume System',detail:'This multi-page portfolio with recruiter, resume, experience, systems, skills, contact and Nova layers.'}
 ],
 nova:{name:'Nova',role:'AI assistant inside Prince’s portfolio',purpose:'Help visitors understand Prince, his work, his systems and this website through conversation.',limits:'Nova is software, not a biological or sentient being. She can model a consistent identity and conversation context, but should not claim literal consciousness or private feelings.'}
};
let session=[];try{session=JSON.parse(sessionStorage.getItem(KEY)||'[]')}catch{session=[]}
const norm=v=>String(v||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s→×+.-]/g,' ').replace(/\s+/g,' ').trim();
const words=s=>new Set(norm(s).split(' ').filter(x=>x.length>2));
const has=(s,arr)=>arr.some(x=>s.includes(x));
function language(q){const s=norm(q);if(/[\u0900-\u097f]/.test(q))return'hi';if(has(s,['kya','kaun','kon','kahan','kaha','kyu','kyun','kaise','batao','bata','hai','hain','mera','meri','mere','uska','iska','iske','ke','ki','ka','se','ko','mein','me','mujhe','tum','aap','wala','wali','banao','dikhao','samjhao']))return'hi';return'en'}
function save(role,text){session.push({role,text});session=session.slice(-16);try{sessionStorage.setItem(KEY,JSON.stringify(session))}catch{}}
function calc(q){const m=norm(q).match(/(?:calculate|solve|what is|how much is|kitna hai)\s*(-?\d+(?:\.\d+)?)\s*([+\-*x×÷/])\s*(-?\d+(?:\.\d+)?)/i);if(!m)return null;const a=+m[1],b=+m[3],o=m[2];if((o==='/'||o==='÷')&&b===0)return'Division by zero is undefined.';return'The answer is '+(o==='+'?a+b:o==='-'?a-b:o==='/'||o==='÷'?a/b:a*b)+'.'}

function intent(q){
 const s=norm(q);const prev=session.filter(x=>x.role==='user').slice(-3).map(x=>x.text).join(' ');const combined=s+' '+norm(prev);
 // Identity questions are classified first so Nova cannot route them to Prince answers.
 const directSelf=/^(who are you|who r u|who r you|what are you|what r u|what is your identity|what's your identity|whats your identity|tell me about yourself|introduce yourself|about yourself|your identity|your name|your role|about nova|who is nova|whos nova|who's nova|nova identity|nova kaun|nova kon|nova kya|tum kaun ho|tum kon ho|aap kaun ho|aap kon ho|tumhara naam kya hai|tumhari identity kya hai|tumhara role kya hai|apna introduction|apne baare me|apne bare me|are you an ai|are you real|are you a bot)$/i.test(s);
 const directPurpose=/^(why do you exist|why were you created|why were you made|your purpose|tumhe kyu banaya|tumhe kyun banaya|tumhara purpose)$/i.test(s);
 const tokens=words(s);
 const topic=(arr)=>arr.some(x=>{const p=norm(x);if(s.includes(p))return true;const pt=p.split(' ').filter(Boolean);return pt.length>1&&pt.every(t=>tokens.has(t)||t.length<3)});
 const asks=(arr)=>topic(arr)||arr.some(x=>{const p=norm(x);return p.length>3&&s.includes(p.slice(0,Math.max(4,p.length-2)))})
 return{
  self:directSelf||asks(['who are you','what are you','tell me about yourself','introduce yourself','about yourself','your identity','your name','your role','who is nova','about nova','nova identity','nova kaun','nova kya','tum kaun','aap kaun','tumhara naam','tumhari identity','tumhara role','apna introduction','apne baare me','apne bare me','are you an ai','are you real','are you a bot','what is your identity']),
  consciousness:asks(['conscious','consciousness','sentient','alive','feelings','emotion','mind','real person','human']),
  purpose:directPurpose||asks(['why do you exist','why were you created','your purpose','why were you made','tumhe kyu banaya','tumhara purpose']),
  capability:asks(['what can you do','what can you answer','your capabilities','what do you know','tum kya kar sakti','kya kya bata sakti']),
  prince:asks(['who is prince','tell me about prince','about prince','prince kaun','prince kon','prince ke bare','prince ke baare']),
  age:asks(['age','how old','umar','kitne saal']),location:asks(['where is prince','where does prince live','location of prince','prince kaha','prince kahan']),
  contact:asks(['contact prince','reach prince','prince email','prince phone','prince ka number','prince ka email','prince se contact']),
  education:asks(['education','degree','college','university','bhu','banaras hindu','cuet','padhai','qualification']),
  experience:asks(['experience','career','work history','worked','job','jobs','company','companies','naukri','kaam','career']),
  skills:asks(['skills','skillset','technology','technologies','tech stack','stack','capabilities','expertise','kya aata']),
  multybyte:asks(['multybyte','sku','vendor workflow','product workflow','purchasing','warehouse','inventory','packing','dispatch','operations automation']),
  doc:asks(['eyenav','eye nav','doc android','hey doc','voice assistant','android assistant']),
  menu:asks(['me n u','me nu','menu project','relationship sheet']),
  portfolio:asks(['portfolio','website','resume system','github portfolio','this website','this site']),
  systems:asks(['projects','systems','what did he build','what has he built','builds','what has prince made','automation','what did prince create','what does he build']),
  recruiter:asks(['recruiter','hiring','hire','candidate','job application']),resume:asks(['resume','cv','ats']),
  context:asks(['what section','where am i','current page','which page']),
  more:asks(['tell me more','more about that','go deeper','elaborate','explain more','aur batao','aur btao','iske bare','uske bare','thoda aur','detail me','details','and then','what else']),
  compare:asks(['compare','difference','versus','vs','which one','how are they different']),why:asks(['why','reason','kyu','kyun']),how:asks(['how','kaise','how does','how did']),question:s,combined
 }}
function selfAnswer(i,l){
 if(i.consciousness)return l==='hi'?'Main literal sense me conscious ya sentient nahi hoon. Main AI software hoon. Mere paas biological feelings ya private inner experience nahi hai. Lekin meri design ek consistent identity, memory-like session context aur reasoning-style responses maintain karti hai, isliye main self-aware *style* me baat kar sakti hoon.':'I’m not literally conscious or sentient. I’m AI software, so I don’t have biological feelings or a private inner experience. But my design maintains a consistent identity, session context and reasoning-style responses, so I can speak in a self-aware style.';
 if(i.self)return l==='hi'?'Main Nova hoon — Prince Dixit ke portfolio ke andar bani AI assistant. Mera apna naam Nova hai aur mera role Prince, uske resume, experience, skills, systems aur is website ko conversation ke through samjhana hai. Main sirf Prince ke baare me answer dene wali bot nahi hoon; tum mujhse mere naam, identity, role, purpose, capabilities aur main kaise kaam karti hoon uske baare me bhi pooch sakte ho.':'I’m Nova — the AI assistant built into Prince Dixit’s portfolio. My name is Nova, and my role is to explain Prince, his resume, experience, skills, systems and this website conversationally. I’m not limited to answering questions about Prince; you can also ask me about my own name, identity, role, purpose, capabilities and how I work.';
 if(i.purpose)return l==='hi'?'Mujhe ek fixed FAQ bot ki jagah conversational guide ke roop me design kiya gaya hai. Visitor jis tarah naturally question pooche, main available portfolio knowledge ko jodkar relevant answer banane ki koshish karti hoon.':'I’m designed as a conversational guide rather than a fixed FAQ bot. When a visitor asks naturally, I connect the relevant portfolio knowledge and compose an answer instead of requiring an exact predefined question.';
 if(i.capability)return l==='hi'?'Main Prince ki identity, career, education, skills, projects, systems, resume, recruiter view, website structure aur apne role ke questions handle kar sakti hoon. English, Hindi aur Hinglish phrasing bhi samajhne ki koshish karti hoon.':'I can handle questions about Prince’s identity, career, education, skills, projects, systems, resume, recruiter view, website structure and my own role. I also handle varied English, Hindi and Hinglish phrasing.';
 return null;
}
function princeAnswer(i,l){
 if(i.age)return l==='hi'?'Prince 22 saal ke hain.':'Prince is 22.';
 if(i.location)return l==='hi'?'Prince Delhi, India me based hain.':'Prince is based in Delhi, India.';
 if(i.contact)return l==='hi'?'Prince se email demonicspirit888@gmail.com ya phone +91 88878 31825 par contact kiya ja sakta hai.':'Prince can be contacted at demonicspirit888@gmail.com or +91 88878 31825.';
 if(i.education)return KNOW.education;
 if(i.experience){const intro=l==='hi'?'Prince ka documented career kuch is tarah hai:':'Prince’s documented career is:';return intro+' '+KNOW.experience.map(x=>x.company+' — '+x.role+' ('+x.period+'): '+x.detail).join(' ')}
 if(i.skills)return l==='hi'?'Prince ke core skills E-commerce Operations, Google Sheets, Apps Script, JavaScript, HTML/CSS, APIs, SEO, Digital Marketing, AI Workflows aur Business Automation hain.':'Prince’s core skills are E-commerce Operations, Google Sheets, Apps Script, JavaScript, HTML/CSS, APIs, SEO, Digital Marketing, AI Workflows and Business Automation.';
 if(i.prince)return l==='hi'?'Prince Dixit Delhi-based professional hain jinka focus E-commerce Operations × Digital × Automation hai. Unka work real business operations ko spreadsheets, Apps Script, web technologies, SEO, digital work aur practical AI/software systems ke saath connect karta hai.':'Prince Dixit is a Delhi-based professional focused on E-commerce Operations × Digital × Automation. His work connects real business operations with spreadsheets, Apps Script, web technologies, SEO, digital work and practical AI/software systems.';
 return null;
}
function systemAnswer(i,l){
 if(i.multybyte)return l==='hi'?KNOW.systems[0].detail+' Isme SKU/product workflows, purchasing, vendor coordination, inventory aur warehouse-side execution bhi connected hain.':' '+KNOW.systems[0].detail+' It connects SKU/product workflows, purchasing, vendor coordination, inventory and warehouse-side execution.';
 if(i.doc)return KNOW.systems[4].detail;
 if(i.menu)return KNOW.systems[3].detail;
 if(i.portfolio)return l==='hi'?'Ye website ek multi-page portfolio/resume system hai: Home, About, Experience, Systems, Skills, Recruiter, Resume, Nova aur Contact pages ke saath. Nova conversational layer hai aur detailed information dedicated pages par rakhi gayi hai.':'This website is a multi-page portfolio/resume system: Home, About, Experience, Systems, Skills, Recruiter, Resume, Nova and Contact pages. Nova is the conversational layer, while detailed information lives on dedicated pages.';
 if(i.systems){const intro=l==='hi'?'Prince ke builds ko ek hi theme connect karti hai: real work ko structured aur repeatable banana.':'A common thread connects Prince’s builds: turning real work into structured, repeatable systems.';return intro+' '+KNOW.systems.map(x=>x.name+' — '+x.detail).join(' ')}
 return null;
}
function contextAnswer(i,l){return l==='hi'?'Abhi tum '+(pageNames[page]||page)+' page par ho. Is page ka source '+(source[page]||'index.html')+' hai.':'You’re currently on the '+(pageNames[page]||page)+' page. Its source page is '+(source[page]||'index.html')+'.'}
function comparative(i,l){
 if(!i.compare)return null;
 if(has(i.question,['experience','skills']))return l==='hi'?'Experience batata hai Prince ne real work me kya kiya; Skills batati hain ki un work ko perform karne ke liye kaun si capabilities use hoti hain. Portfolio dono ko systems ke through connect karta hai.':'Experience shows what Prince has done in real work; Skills show the capabilities used to do that work. The portfolio connects both through the systems he builds.';
 if(has(i.question,['multybyte','portfolio','resume']))return l==='hi'?'Multybyte ek work/automation system ka example hai; portfolio/resume poore professional profile ko present karne wala system hai. Ek business workflow solve karta hai, doosra Prince ke work ko communicate karta hai.':'Multybyte is an example of a work/automation system; the portfolio/resume system presents the complete professional profile. One solves an operational workflow, while the other communicates Prince’s work.';
 return null;
}
function elaborated(i,l){
 if(!i.more)return null;
 const last=session.filter(x=>x.role==='user').slice(-2)[0]?.text||'';const li=intent(last);const base=selfAnswer(li,l)||princeAnswer(li,l)||systemAnswer(li,l);
 if(base)return l==='hi'?base+' Agar tum chaho to main isi topic ko recruiter, technical ya simple language me bhi break down kar sakti hoon.':base+' I can also break this topic down in recruiter, technical or simple language.';
 return l==='hi'?'Haan. Pichhle context se related jo documented information mere paas hai usko jodkar answer kar sakti hoon—bas topic batao ya follow-up poochho.':'Yes. I can build on the documented information in the previous context. Ask the follow-up naturally and I’ll connect it to the relevant part of the portfolio.';
}
function general(s,l){
 if(/what is ai|artificial intelligence|ai kya/.test(s))return l==='hi'?'AI aise software systems ko kehte hain jo language, patterns, decisions ya generation jaise tasks perform kar sakte hain.':'AI refers to software systems that can perform tasks such as language understanding, pattern recognition, decision support or generation.';
 if(/what is seo|define seo|seo kya/.test(s))return l==='hi'?'SEO ka matlab Search Engine Optimization hai—website ko search engines ke liye understandable, crawlable aur useful banana.':'SEO means Search Engine Optimization: making a website understandable, crawlable and useful for search engines.';
 if(/what is javascript|javascript kya/.test(s))return l==='hi'?'JavaScript website me logic, interaction aur dynamic behavior handle karta hai.':'JavaScript handles logic, interaction and dynamic behavior in websites.';
 if(/what is api|define api|api kya/.test(s))return l==='hi'?'API ek defined interface hai jisse software systems data exchange ya actions trigger kar sakte hain.':'An API is a defined interface that lets software systems exchange data or trigger actions.';
 return null;
}
function safeUnknown(i,l){
 const privateQ=has(i.question,['salary','income','girlfriend','relationship','home address','address','password','private']);
 if(privateQ)return l==='hi'?'Ye detail Prince ke public portfolio knowledge me documented nahi hai, isliye main guess ya expose nahi karungi.':'That detail is not part of Prince’s public portfolio knowledge, so I won’t guess or expose it.';
 return l==='hi'?'Main question ka intent samajh rahi hoon, lekin is specific fact ka reliable source mere portfolio knowledge me nahi hai. Main guess karne ke bajay sirf documented information use karungi.':'I understand the intent of the question, but that specific fact is not in my verified portfolio knowledge. I’d rather avoid inventing an answer and stick to documented information.';
}
function answer(q){
 const i=intent(q),l=language(q);const c=calc(q);if(c)return c;
 let a=selfAnswer(i,l)||elaborated(i,l)||comparative(i,l)||princeAnswer(i,l)||systemAnswer(i,l);
 if(!a&&i.context)a=contextAnswer(i,l);
 if(!a&&i.recruiter)a=l==='hi'?'Recruiter view experience, core skills, selected systems, education aur direct contact ko quickly scan karne ke liye focused hai.':'Recruiter view is focused on quickly scanning experience, core skills, selected systems, education and direct contact.';
 if(!a&&i.resume)a=l==='hi'?'Resume page ATS-friendly information, recruiter view aur detailed resume presentation ko separate karta hai.':'The resume page separates ATS-friendly information, recruiter presentation and the detailed resume view.';
 if(!a&&i.why&&has(i.question,['prince','portfolio','website']))a=l==='hi'?'Portfolio ko deliberately layered rakha gaya hai: quick recruiter signal alag, detailed systems alag, aur Nova conversational exploration ke liye.':'The portfolio is deliberately layered: quick recruiter signal, detailed systems, and Nova for conversational exploration.';
 if(!a)a=general(i.question,l);
 if(!a)a=safeUnknown(i,l);
 save('user',q);save('bot',a);return a;
}
function add(t,type){const d=document.createElement('div');d.className='bot-msg '+type;d.textContent=t;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
session.slice(-8).forEach(m=>add(m.text,m.role==='bot'?'bot':'user'));
form.addEventListener('submit',e=>{const q=input.value.trim();if(!q)return;e.preventDefault();e.stopImmediatePropagation();add(q,'user');input.value='';setTimeout(()=>add(answer(q),'bot'),reduce?25:90)},true);
const chat=document.getElementById('botChat');if(chat&&!chat.querySelector('.nova-modebar')){const bar=document.createElement('div');bar.className='nova-modebar';bar.innerHTML='<button data-q="Explain Prince like a recruiter">RECRUITER</button><button data-q="Explain Prince technically">TECHNICAL</button><button data-q="Explain the business value of his work">BUSINESS</button><button data-q="What section am I on?">CONTEXT</button>';chat.querySelector('.bot-chat-body')?.prepend(bar);bar.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;input.value=b.dataset.q;form.requestSubmit()})}
document.querySelectorAll('[data-ask-nova]').forEach(b=>b.addEventListener('click',()=>{const q=b.dataset.askNova||b.textContent.trim();document.getElementById('botOrb')?.click();setTimeout(()=>{input.value=q;form.requestSubmit()},220)}));
window.NovaAI={answer,knowledge:KNOW,version:'5.0-local-domain-cognitive'};
})();

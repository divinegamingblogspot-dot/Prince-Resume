/* ===== NOVA EXPRESSIVE LAYER v1 — ADDITIVE / FUNCTION SAFE =====
   Adds only presentation/state behavior to the existing Nova assistant.
   It does not replace the existing chat, answer, memory, theme, navigation,
   animation or model logic. */
(()=> {
  'use strict';
  if(window.__novaExpressiveLayer) return;
  window.__novaExpressiveLayer=true;

  const root=document.getElementById('pageBot');
  const orb=document.getElementById('botOrb');
  const chat=document.getElementById('botChat');
  const messages=document.getElementById('botMessages');
  const form=document.getElementById('botForm');
  const input=document.getElementById('botInput');
  if(!root||!orb||!messages) return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style=document.createElement('style');
  style.id='nova-expressive-style';
  style.textContent=`
    /* Expressive states — intentionally scoped to #pageBot */
    #pageBot.nova-expressive{--nova-expression-duration:${reduce?'0s':'280ms'}}
    #pageBot .bot-character{transform-origin:50% 82%;transition:transform var(--nova-expression-duration) cubic-bezier(.22,1,.36,1),filter var(--nova-expression-duration) ease}
    #pageBot .bot-head{transform-origin:50% 70%;transition:transform var(--nova-expression-duration) cubic-bezier(.22,1,.36,1)}
    #pageBot .bot-eye{transition:transform 120ms ease,opacity 180ms ease}
    #pageBot .bot-mouth{transition:transform 180ms ease,width 180ms ease,height 180ms ease,border-radius 180ms ease}
    #pageBot .bot-blush{transition:opacity 180ms ease,transform 180ms ease}
    #pageBot .bot-arm{transform-origin:50% 8%;transition:transform 260ms cubic-bezier(.22,1,.36,1)}
    #pageBot .bot-reaction{transition:opacity .2s ease,transform .25s ease}

    /* Idle */
    #pageBot[data-expression="idle"] .bot-character{animation:novaIdleFloat 4.2s ease-in-out infinite}
    /* Listening */
    #pageBot[data-expression="listening"] .bot-head{transform:rotate(-4deg) translateY(-2px)}
    #pageBot[data-expression="listening"] .bot-eye{transform:scaleY(1.08)!important}
    #pageBot[data-expression="listening"] .bot-arm.left{transform:rotate(-7deg) translateY(-3px)}
    /* Thinking */
    #pageBot[data-expression="thinking"] .bot-head{transform:rotate(3deg) translateY(-2px)}
    #pageBot[data-expression="thinking"] .bot-eye{transform:translateY(-1px) scaleY(.82)!important}
    #pageBot[data-expression="thinking"] .bot-mouth{width:9px!important;height:9px!important;border-radius:50%!important;transform:translateY(1px)}
    #pageBot[data-expression="thinking"] .bot-character{filter:saturate(.92) brightness(1.04)}
    /* Speaking */
    #pageBot[data-expression="speaking"] .bot-mouth{width:13px!important;height:7px!important;border-radius:0 0 12px 12px!important;animation:novaTalk 180ms ease-in-out infinite alternate}
    #pageBot[data-expression="speaking"] .bot-head{transform:translateY(-1px)}
    /* Happy */
    #pageBot[data-expression="happy"] .bot-mouth{width:13px!important;height:7px!important;border-radius:0 0 14px 14px!important}
    #pageBot[data-expression="happy"] .bot-blush{opacity:.9!important}
    /* Excited */
    #pageBot[data-expression="excited"] .bot-character{transform:translateY(-5px) scale(1.015);filter:brightness(1.08) saturate(1.1)}
    #pageBot[data-expression="excited"] .bot-arm.left{transform:rotate(-18deg) translateY(-4px)}
    #pageBot[data-expression="excited"] .bot-arm.right{transform:rotate(18deg) translateY(-4px)}
    /* Surprised */
    #pageBot[data-expression="surprised"] .bot-eye{transform:scale(1.12)!important}
    #pageBot[data-expression="surprised"] .bot-mouth{width:9px!important;height:12px!important;border-radius:50%!important}
    /* Love */
    #pageBot[data-expression="love"] .bot-character{filter:saturate(1.16) brightness(1.04)}
    #pageBot[data-expression="love"] .bot-blush{opacity:1!important;transform:scale(1.25)}
    /* Confused / concerned */
    #pageBot[data-expression="confused"] .bot-head{transform:rotate(4deg)}
    #pageBot[data-expression="confused"] .bot-mouth{transform:translateX(2px)}
    #pageBot[data-expression="concerned"] .bot-head{transform:rotate(-2deg) translateY(1px)}
    #pageBot[data-expression="concerned"] .bot-character{filter:saturate(.82)}
    /* Wink */
    #pageBot[data-expression="wink"] .bot-eye.right{transform:scaleY(.12)!important}
    #pageBot[data-expression="wink"] .bot-mouth{width:13px!important;height:6px!important;border-radius:0 0 12px 12px!important}

    .nova-think-panel{display:flex;align-items:center;gap:10px;margin:4px 0 9px;padding:9px 11px;border:1px solid rgba(183,255,82,.14);border-radius:10px;background:linear-gradient(135deg,rgba(183,255,82,.045),rgba(168,85,247,.055));color:#9da5b0;font:600 9px/1.4 Inter,system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;opacity:0;transform:translateY(5px);transition:opacity .18s ease,transform .18s ease}
    .nova-think-panel.show{opacity:1;transform:none}
    .nova-think-orbit{position:relative;width:22px;height:22px;flex:0 0 22px;border:1px solid rgba(183,255,82,.32);border-radius:50%}
    .nova-think-orbit:before,.nova-think-orbit:after{content:"";position:absolute;inset:5px;border:1px solid rgba(32,230,213,.42);border-radius:50%;animation:novaThinkSpin 1.5s linear infinite}
    .nova-think-orbit:after{inset:8px;border-color:rgba(184,108,255,.6);animation-duration:1s;animation-direction:reverse}
    .nova-think-copy{min-width:0}
    .nova-think-title{display:block;color:#dce2e9;font-size:9px}
    .nova-think-sub{display:block;margin-top:2px;color:#7e8793;font-size:8px;text-transform:none;letter-spacing:0}
    .nova-expression-badge{position:absolute;right:10px;bottom:8px;padding:3px 6px;border:1px solid rgba(183,255,82,.14);border-radius:999px;background:rgba(7,9,13,.72);color:#727b87;font:700 7px Inter,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;pointer-events:none;opacity:0;transition:opacity .2s ease}
    #pageBot.nova-open .nova-expression-badge{opacity:.72}
    @keyframes novaIdleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
    @keyframes novaTalk{from{transform:scaleY(.75)}to{transform:scaleY(1.15)}}
    @keyframes novaThinkSpin{to{transform:rotate(360deg)}}
    @media(prefers-reduced-motion:reduce){
      #pageBot .bot-character,#pageBot .bot-head,#pageBot .bot-eye,#pageBot .bot-mouth,#pageBot .bot-blush,#pageBot .bot-arm,.nova-think-panel{animation:none!important;transition:none!important}
    }
  `;
  document.head.appendChild(style);
  root.classList.add('nova-expressive');

  const panel=document.createElement('div');
  panel.className='nova-think-panel';
  panel.setAttribute('aria-live','polite');
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML='<span class="nova-think-orbit" aria-hidden="true"></span><span class="nova-think-copy"><b class="nova-think-title">Nova is thinking…</b><small class="nova-think-sub">Understanding your request</small></span>';
  const inputBar=chat?.querySelector('.bot-chat-input');
  if(inputBar) inputBar.parentNode.insertBefore(panel,inputBar);
  else chat?.appendChild(panel);

  const badge=document.createElement('span');
  badge.className='nova-expression-badge';
  badge.textContent='IDLE';
  orb.appendChild(badge);

  const labels={
    idle:'Idle',listening:'Listening',thinking:'Thinking',speaking:'Speaking',
    happy:'Happy',excited:'Excited',surprised:'Surprised',love:'Warm',
    confused:'Curious',concerned:'Concerned',wink:'Playful'
  };

  let stateTimer=0;
  let thinkingTimer=0;
  let lastBotCount=messages.querySelectorAll('.bot-msg.bot').length;

  function setExpression(name,duration){
    const allowed=labels[name]?name:'idle';
    root.dataset.expression=allowed;
    root.dataset.mood=allowed;
    badge.textContent=labels[allowed].toUpperCase();
    clearTimeout(stateTimer);
    if(duration) stateTimer=setTimeout(()=>setExpression('idle'),duration);
  }

  function showThinking(){
    clearTimeout(thinkingTimer);
    panel.classList.add('show');
    panel.setAttribute('aria-hidden','false');
    setExpression('thinking');
    const title=panel.querySelector('.nova-think-title');
    const sub=panel.querySelector('.nova-think-sub');
    const stages=[
      ['Nova is thinking…','Understanding your request'],
      ['Nova is thinking…','Checking relevant context'],
      ['Nova is thinking…','Preparing a response']
    ];
    let i=0;
    title.textContent=stages[0][0]; sub.textContent=stages[0][1];
    const advance=()=>{
      if(!panel.classList.contains('show'))return;
      i=(i+1)%stages.length;
      title.textContent=stages[i][0];sub.textContent=stages[i][1];
      thinkingTimer=setTimeout(advance,520);
    };
    thinkingTimer=setTimeout(advance,520);
  }

  function stopThinking(){
    clearTimeout(thinkingTimer);
    panel.classList.remove('show');
    panel.setAttribute('aria-hidden','true');
  }

  function expressForText(q){
    const s=String(q||'').toLowerCase();
    if(/love|beautiful|cute|amazing|thank|thanks|good job|proud/.test(s)) return 'love';
    if(/wow|really|seriously|crazy|awesome|damn/.test(s)) return 'excited';
    if(/help|problem|broken|error|wrong|issue|fix/.test(s)) return 'concerned';
    if(/why|how|explain|difference|what if/.test(s)) return 'curious';
    if(/who are you|who is nova|introduce|your identity/.test(s)) return 'happy';
    return 'listening';
  }

  /* Normalize the expressive state name used for curious prompts. */
  const originalSetExpression=setExpression;
  setExpression=(name,duration)=>{
    if(name==='curious') name='confused';
    originalSetExpression(name,duration);
  };

  /* Existing submit handler remains the owner of chat behavior. This listener only
     adds a visual state before it runs. */
  form?.addEventListener('submit',()=>{
    const q=input?.value?.trim();
    if(!q)return;
    setExpression(expressForText(q));
    window.setTimeout(showThinking,70);
  },true);

  /* Suggestions are existing controls; we only observe the click and add expression. */
  messages.addEventListener('click',e=>{
    const b=e.target.closest('[data-bot-q]');
    if(!b)return;
    setExpression(expressForText(b.dataset.botQ));
    window.setTimeout(showThinking,70);
  },true);

  /* Detect the existing assistant response without replacing the existing answer flow. */
  const mo=new MutationObserver(()=>{
    const bots=messages.querySelectorAll('.bot-msg.bot');
    if(bots.length>lastBotCount){
      lastBotCount=bots.length;
      stopThinking();
      setExpression('speaking');
      const latest=bots[bots.length-1].textContent||'';
      if(/still learning|try asking|not sure|can't help/i.test(latest)) setExpression('confused',900);
      else setExpression(/love|thank|glad|happy/i.test(latest)?'happy':'speaking',900);
    }
  });
  mo.observe(messages,{childList:true});

  /* Open/close is already controlled by the existing Nova code. Reflect it visually. */
  const syncOpen=()=>{
    if(root.classList.contains('nova-open')){
      if(!root.dataset.expression||root.dataset.expression==='idle') setExpression('happy',900);
    }else{
      stopThinking();
      setExpression('idle');
    }
  };
  new MutationObserver(syncOpen).observe(root,{attributes:true,attributeFilter:['class']});
  syncOpen();

  /* Small expressive reactions to existing page interactions, without replacing them. */
  document.addEventListener('click',e=>{
    if(e.target.closest('#pageBot'))return;
    const el=e.target.closest('a,button,.system-card,.job-card,.range-card,.skill,.process-card,.training-card');
    if(!el)return;
    const label=(el.innerText||el.getAttribute('aria-label')||'').toLowerCase();
    if(/contact|email|hire/.test(label))setExpression('happy',1100);
    else if(/resume|download/.test(label))setExpression('excited',900);
    else setExpression('curious',750);
  },{passive:true});

  /* Return to idle after inactivity while Nova remains visible. */
  let idleTimer=0;
  const resetIdle=()=>{
    clearTimeout(idleTimer);
    idleTimer=setTimeout(()=>{
      if(!root.classList.contains('nova-open'))setExpression('idle');
      else if(!panel.classList.contains('show') && root.dataset.expression!=='speaking')setExpression('idle');
    },3200);
  };
  ['pointermove','pointerdown','touchstart'].forEach(ev=>document.addEventListener(ev,resetIdle,{passive:true}));
  resetIdle();
})();
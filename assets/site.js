(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ---- marine snow ---- */
  function readSnow(){return (getComputedStyle(document.documentElement).getPropertyValue('--snow')||'220,232,250').trim();}
  var snowRGB=readSnow(); addEventListener('themechange',function(){snowRGB=readSnow();});
  var c=document.getElementById('seafield'), x=c.getContext('2d'), parts=[], DPR=Math.min(window.devicePixelRatio||1,2);
  function size(){c.width=innerWidth*DPR;c.height=innerHeight*DPR;x.setTransform(DPR,0,0,DPR,0,0);}
  size();addEventListener('resize',size);
  for(var i=0;i<70;i++){parts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.6+.3,sp:Math.random()*.22+.05,dr:Math.random()*.3-.15,o:Math.random()*.4+.1});}
  function snow(){
    x.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<parts.length;i++){var p=parts[i];
      x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);
      x.fillStyle='rgba('+snowRGB+','+p.o+')';x.fill();
      p.y+=p.sp;p.x+=p.dr;
      if(p.y>innerHeight+5){p.y=-5;p.x=Math.random()*innerWidth;}
    }
    if(!reduce) requestAnimationFrame(snow);
  }
  if(reduce) snow(); else requestAnimationFrame(snow);

  /* ---- reveal on scroll ---- */
  var rev=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0,rootMargin:'0px 0px -10% 0px'});
    rev.forEach(function(el){
      var r=el.getBoundingClientRect();
      /* anything already on screen, or taller than the viewport, shows at once */
      if(r.top<innerHeight && r.bottom>0 || r.height>innerHeight*.8){el.classList.add('in');}
      else io.observe(el);
    });
  } else { rev.forEach(function(el){el.classList.add('in');}); }
  /* hide the swipe hint once a diagram has been scrolled */
  document.querySelectorAll('.infogram-wrap').forEach(function(w){w.addEventListener('scroll',function(){w.classList.add('scrolled');},{passive:true});});
  /* newspaper columns: each .prose becomes 1-3 column cards, balanced by text length */
  function colCount(w){return w>=1250?3:(w>=820?2:1);}
  document.querySelectorAll('.prose').forEach(function(pr){
    if(pr.closest('.accordion'))return;
    var items=[].slice.call(pr.children);
    if(!items.length)return;
    pr.classList.add('cols');
    var last=-1;
    function layout(){
      var n=colCount(pr.getBoundingClientRect().width||innerWidth);
      if(n===last)return; last=n;
      pr.innerHTML='';
      pr.style.gridTemplateColumns='repeat('+n+',1fr)';
      var total=items.reduce(function(a,el){return a+(el.textContent.length||60);},0), per=total/n;
      var cols=[],cur=document.createElement('div'),acc=0; cur.className='col glass'; cols.push(cur);
      items.forEach(function(el,i){
        var len=el.textContent.length||60;
        if(cols.length<n && acc>0 && acc+len/2>per*cols.length){cur=document.createElement('div');cur.className='col glass';cols.push(cur);}
        cur.appendChild(el); acc+=len;
      });
      cols.forEach(function(c){pr.appendChild(c);});
    }
    layout();
    var t; addEventListener('resize',function(){clearTimeout(t);t=setTimeout(layout,120);});
  });
  /* light / high-contrast toggle: blue by default, the choice is remembered */
  document.querySelectorAll('.theme-toggle').forEach(function(btn){
    btn.addEventListener('click',function(){
      var root=document.documentElement;
      var next=root.getAttribute('data-theme')==='light'?'dark':'light';
      if(next==='light'){root.setAttribute('data-theme','light');}else{root.removeAttribute('data-theme');}
      try{localStorage.setItem('theme',next);}catch(e){}
      btn.setAttribute('aria-pressed',next==='light'?'true':'false');
      dispatchEvent(new Event('themechange'));
    });
  });
})();

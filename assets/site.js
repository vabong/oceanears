(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ---- marine snow ---- */
  var c=document.getElementById('seafield'), x=c.getContext('2d'), parts=[], DPR=Math.min(window.devicePixelRatio||1,2);
  function size(){c.width=innerWidth*DPR;c.height=innerHeight*DPR;x.setTransform(DPR,0,0,DPR,0,0);}
  size();addEventListener('resize',size);
  for(var i=0;i<70;i++){parts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.6+.3,sp:Math.random()*.22+.05,dr:Math.random()*.3-.15,o:Math.random()*.4+.1});}
  function snow(){
    x.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<parts.length;i++){var p=parts[i];
      x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);
      x.fillStyle='rgba(220,232,250,'+p.o+')';x.fill();
      p.y+=p.sp;p.x+=p.dr;
      if(p.y>innerHeight+5){p.y=-5;p.x=Math.random()*innerWidth;}
    }
    if(!reduce) requestAnimationFrame(snow);
  }
  if(reduce) snow(); else requestAnimationFrame(snow);

  /* ---- reveal on scroll ---- */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.18});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  } else { document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');}); }
})();

(function(){
  /* marine snow, landing page only */
  var c=document.getElementById('seafield');
  if(c&&document.body.classList.contains('water')){
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var x=c.getContext('2d'),parts=[],DPR=Math.min(window.devicePixelRatio||1,2);
    function size(){c.width=innerWidth*DPR;c.height=innerHeight*DPR;x.setTransform(DPR,0,0,DPR,0,0);}
    size();addEventListener('resize',size);
    for(var i=0;i<60;i++){parts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.3,sp:Math.random()*.2+.04,dr:Math.random()*.3-.15,o:Math.random()*.35+.08});}
    function snow(){x.clearRect(0,0,innerWidth,innerHeight);for(var i=0;i<parts.length;i++){var p=parts[i];x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);x.fillStyle='rgba(220,232,250,'+p.o+')';x.fill();p.y+=p.sp;p.x+=p.dr;if(p.y>innerHeight+5){p.y=-5;p.x=Math.random()*innerWidth;}}if(!reduce)requestAnimationFrame(snow);}
    if(reduce)snow();else requestAnimationFrame(snow);
  }
  /* paper / ocean toggle: paper by default, the choice is remembered on this device */
  document.querySelectorAll('.theme-toggle').forEach(function(btn){
    btn.addEventListener('click',function(){
      var root=document.documentElement;
      var next=root.getAttribute('data-theme')==='ocean'?'paper':'ocean';
      if(next==='ocean'){root.setAttribute('data-theme','ocean');}else{root.removeAttribute('data-theme');}
      try{localStorage.setItem('theme',next);}catch(e){}
      btn.setAttribute('aria-pressed',next==='ocean'?'true':'false');
      dispatchEvent(new Event('themechange'));
    });
  });
  /* hide the swipe hint once a diagram has been scrolled */
  document.querySelectorAll('.infogram-wrap').forEach(function(w){w.addEventListener('scroll',function(){w.classList.add('scrolled');},{passive:true});});
  /* copy an address to the clipboard */
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var text=btn.getAttribute('data-copy'), label=btn.textContent;
      function done(){btn.textContent='Copied';btn.classList.add('done');setTimeout(function(){btn.textContent=label;btn.classList.remove('done');},1800);}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,function(){fallback();});}else{fallback();}
      function fallback(){var ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done();}catch(e){}document.body.removeChild(ta);}
    });
  });
})();

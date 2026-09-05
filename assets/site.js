(function(){
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

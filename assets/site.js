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
})();

(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* lightbox for gallery photos */
  var imgs=[].slice.call(document.querySelectorAll('.gallery img, .cover img'));
  if(imgs.length){
    var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Photo viewer');
    lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&lsaquo;</button><img alt=""><div class="cap"></div><button class="nx" aria-label="Next">&rsaquo;</button>';
    document.body.appendChild(lb);
    var cur=0, im=lb.querySelector('img'), cap=lb.querySelector('.cap');
    function show(i){cur=(i+imgs.length)%imgs.length;var s=imgs[cur];im.src=s.currentSrc||s.src;im.alt=s.alt;
      var f=s.closest('figure'),fc=f&&f.querySelector('figcaption');cap.textContent=fc?fc.textContent:(s.alt||'');lb.classList.add('open');document.body.style.overflow='hidden';}
    function hide(){lb.classList.remove('open');document.body.style.overflow='';}
    imgs.forEach(function(s,i){s.addEventListener('click',function(){show(i);});});
    lb.querySelector('.x').onclick=hide;lb.querySelector('.p').onclick=function(){show(cur-1);};lb.querySelector('.nx').onclick=function(){show(cur+1);};
    lb.addEventListener('click',function(e){if(e.target===lb)hide();});
    addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')hide();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
  }

  /* share buttons */
  var url=encodeURIComponent(location.href), title=encodeURIComponent(document.title);
  var li=document.querySelector('.sbtn.linkedin'), fb=document.querySelector('.sbtn.facebook'), cp=document.querySelector('.sbtn.copy'), na=document.querySelector('.sbtn.native');
  if(li) li.href='https://www.linkedin.com/sharing/share-offsite/?url='+url;
  if(fb) fb.href='https://www.facebook.com/sharer/sharer.php?u='+url;
  if(cp) cp.addEventListener('click',function(){navigator.clipboard.writeText(location.href).then(function(){var t=cp.querySelector('span');var o=t.textContent;t.textContent='Link copied';setTimeout(function(){t.textContent=o;},1800);});});
  if(na && navigator.share){na.style.display='inline-flex';na.addEventListener('click',function(){navigator.share({title:document.title,url:location.href});});}
})();

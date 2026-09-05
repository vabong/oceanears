(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(document.getElementById('w1')){
  /* ---- hero whale-song waves ---- */
  var W=1200, paths=[
    {el:document.getElementById('w1'), amp:34, base:170, layers:[[0.012,1],[0.031,.5],[0.07,.22]], sp:0.6},
    {el:document.getElementById('w2'), amp:52, base:170, layers:[[0.009,1],[0.024,.55],[0.05,.3]], sp:0.42},
    {el:document.getElementById('w3'), amp:78, base:170, layers:[[0.006,1],[0.017,.6]], sp:0.3}
  ];
  function build(p,t){
    var d='M 0 '+ (p.base);
    for(var x=0;x<=W;x+=10){
      var y=p.base;
      for(var i=0;i<p.layers.length;i++){
        y += Math.sin(x*p.layers[i][0] + t*p.sp + i*1.7)*p.amp*p.layers[i][1];
      }
      d+=' L '+x+' '+y.toFixed(1);
    }
    return d;
  }
  function frame(now){
    var t=now*0.001;
    for(var i=0;i<paths.length;i++) paths[i].el.setAttribute('d', build(paths[i], t));
    if(!reduce) requestAnimationFrame(frame);
  }
  if(reduce){ for(var i=0;i<paths.length;i++) paths[i].el.setAttribute('d', build(paths[i],0)); }
  else requestAnimationFrame(frame);

  }
  var g=document.getElementById('stations'); if(!g) return;
  /* ---- listening stations on the map ---- */
  var stations=[[180,150,'Antarctic'],[300,300,'S. Atlantic'],[520,200,'Indian Ocean'],
                [700,140,'N. Pacific'],[880,310,'Baja, California'],[1000,210,'East Africa']];
  var svgns='http://www.w3.org/2000/svg';
  stations.forEach(function(s,idx){
    var ping=document.createElementNS(svgns,'circle');
    ping.setAttribute('cx',s[0]);ping.setAttribute('cy',s[1]);ping.setAttribute('r','5');
    ping.setAttribute('fill','url(#ping)');
    var core=document.createElementNS(svgns,'circle');
    core.setAttribute('cx',s[0]);core.setAttribute('cy',s[1]);core.setAttribute('r','2.4');
    core.style.fill='var(--glow-2)';
    if(false){
      var an=document.createElementNS(svgns,'animate');
      an.setAttribute('attributeName','r');an.setAttribute('values','3;26;3');
      an.setAttribute('dur',(3.2+idx*0.4)+'s');an.setAttribute('repeatCount','indefinite');
      var ao=document.createElementNS(svgns,'animate');
      ao.setAttribute('attributeName','opacity');ao.setAttribute('values','.8;0;.8');
      ao.setAttribute('dur',(3.2+idx*0.4)+'s');ao.setAttribute('repeatCount','indefinite');
      ping.appendChild(an);ping.appendChild(ao);
    }
    var lbl=document.createElementNS(svgns,'text');
    lbl.setAttribute('x',s[0]+10);lbl.setAttribute('y',s[1]+4);
    lbl.style.fill='var(--foam-faint)';
    lbl.setAttribute('font-family',"'IBM Plex Mono',monospace");
    lbl.setAttribute('font-size','11');lbl.setAttribute('letter-spacing','1');
    lbl.textContent=s[2];
    g.appendChild(ping);g.appendChild(core);g.appendChild(lbl);
  });
})();

/* ===================== PIXEL LOGO ON CANVAS ===================== */
(function(){
  const cv = document.getElementById('pixelLogo');
  const ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#ffb000';
  ctx.font = '900 30px "Press Start 2P", monospace';
  // Fallback if font not loaded yet: draw after font ready
  function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    ctx.fillStyle = '#ffb000';
    ctx.textBaseline = 'middle';
    ctx.font = '20px "Press Start 2P", monospace';
    ctx.fillText('WANXIN', 18, 28);
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillStyle = '#e9ebe4';
    ctx.fillText('2 0 0  ·  8 M', 18, 58);
  }
  if (document.fonts) {
    document.fonts.load('20px "Press Start 2P"').then(draw);
    document.fonts.load('14px "Press Start 2P"').then(draw);
    setTimeout(draw, 250);
  } else { draw(); }
})();

/* ===================== BOOT SEQUENCE ===================== */
(function(){
  const fill = document.getElementById('bootFill');
  const pct = document.getElementById('bootPct');
  const press = document.getElementById('bootPress');
  const boot = document.getElementById('boot');
  const site = document.getElementById('site');
  let p = 0;
  const interval = setInterval(()=>{
    p += Math.random()*9 + 4;
    if(p >= 100){ p = 100; clearInterval(interval); onLoaded(); }
    fill.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 130);

  function onLoaded(){
    pct.textContent = '100%';
    setTimeout(()=>{
      press.classList.add('show');
      const go = ()=>{
        boot.classList.add('hide');
        site.classList.add('show');
        document.removeEventListener('click', go);
        document.removeEventListener('keydown', go);
        setTimeout(()=> boot.remove(), 700);
      };
      document.addEventListener('click', go);
      document.addEventListener('keydown', go);
      // auto-continue if user doesn't interact
      setTimeout(go, 1800);
    }, 300);
  }
})();

/* ===================== HERO 3D CANVAS (wireframe grid + particles) ===================== */
(function(){
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize(){
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  window.addEventListener('resize', resize);
  // wait for layout
  requestAnimationFrame(()=>{ resize(); });

  const horizon = ()=> h*0.55;
  let t = 0;
  const stars = Array.from({length:90}, ()=>({
    x: Math.random()*1, y: Math.random()*0.55, s: Math.random()*1.6+0.4, tw: Math.random()*Math.PI*2
  }));

  function draw(){
    t += 0.6;
    ctx.clearRect(0,0,w,h);

    // stars / particles
    ctx.fillStyle = 'rgba(233,235,228,0.5)';
    stars.forEach(s=>{
      const tw = (Math.sin(t*0.02 + s.tw)+1)/2;
      ctx.globalAlpha = 0.15 + tw*0.5;
      ctx.fillRect(s.x*w, s.y*h, s.s*devicePixelRatio, s.s*devicePixelRatio);
    });
    ctx.globalAlpha = 1;

    // perspective grid floor
    const hy = horizon();
    ctx.strokeStyle = 'rgba(255,176,0,0.35)';
    ctx.lineWidth = 1;
    const vpX = w/2;
    // vertical converging lines
    const lines = 14;
    for(let i=-lines;i<=lines;i++){
      const xBottom = w/2 + i*(w/lines)*1.2;
      ctx.beginPath();
      ctx.moveTo(vpX, hy);
      ctx.lineTo(xBottom, h);
      ctx.stroke();
    }
    // horizontal lines with movement
    const rows = 10;
    for(let j=0;j<rows;j++){
      const prog = ((j/rows) + (t*0.0025)%1) % 1;
      const y = hy + Math.pow(prog,2.2) * (h - hy);
      const alpha = 0.5 * (1-prog);
      ctx.strokeStyle = `rgba(255,176,0,${alpha*0.6})`;
      ctx.beginPath();
      ctx.moveTo(0,y);
      ctx.lineTo(w,y);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===================== TILT CARD 3D (mouse) ===================== */
(function(){
  const card = document.getElementById('tiltCard');
  const stage = card.parentElement;
  stage.addEventListener('mousemove', (e)=>{
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    card.style.transform = `rotateY(${x*14}deg) rotateX(${-y*14}deg)`;
  });
  stage.addEventListener('mouseleave', ()=>{ card.style.transform = 'rotateY(0) rotateX(0)'; });
})();

/* ===================== REVEAL ON SCROLL ===================== */
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        e.target.querySelectorAll('.stat-fill').forEach(f=> f.style.width = f.dataset.w);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.2});
  els.forEach(el=>io.observe(el));
})();

/* ===================== COLOR SELECT ===================== */
(function(){
  const items = document.querySelectorAll('.select-item');
  const bikeFill = document.getElementById('bikeFill');
  items.forEach(item=>{
    item.addEventListener('click', ()=>{
      items.forEach(i=>{ i.classList.remove('active'); i.querySelector('.color-dot').classList.remove('active'); });
      item.classList.add('active');
      item.querySelector('.color-dot').classList.add('active');
      bikeFill.setAttribute('stroke', item.dataset.color);
    });
  });
})();


  // Speedometer animation on load
  window.addEventListener('load', () => {
    const ring = document.getElementById('speedRing');
    const num = document.getElementById('speedNum');
    const target = 120;
    const circumference = 578;
    let current = 0;
    const duration = 1800;
    const start = performance.now();
    function animate(t){
      const p = Math.min((t-start)/duration, 1);
      const eased = 1 - Math.pow(1-p, 3);
      current = Math.round(target * eased);
      num.textContent = current;
      ring.style.strokeDashoffset = circumference - (circumference * (eased * 0.78));
      if(p < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        if(e.target.querySelectorAll){
          e.target.querySelectorAll('.stat-fill').forEach(f=>{
            f.style.width = f.dataset.w;
          });
        }
        io.unobserve(e.target);
      }
    });
  }, {threshold:.2});
  revealEls.forEach(el=>io.observe(el));

  // Color select interaction
  const items = document.querySelectorAll('.select-item');
  const bikeFill = document.getElementById('bikeFill');
  items.forEach(item=>{
    item.addEventListener('click', ()=>{
      items.forEach(i=>{ i.classList.remove('active'); i.querySelector('.color-dot').classList.remove('active'); });
      item.classList.add('active');
      item.querySelector('.color-dot').classList.add('active');
      const color = item.dataset.color;
      bikeFill.setAttribute('stroke', color);
    });
  });

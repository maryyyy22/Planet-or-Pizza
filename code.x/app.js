// app.js (fixed)

document.addEventListener('DOMContentLoaded', () => {
  // ===== Helpers =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ===== Year =====
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Starfield =====
  (function () {
    const field = $('#starfield');
    if (!field) return;
    const N = 140;
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = Math.random() * 1.2 + 0.3;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      const d = (Math.random() * 6 + 2).toFixed(2);
      s.style.animationDuration = d + 's';
      s.style.animationDelay = i * 0.02 + 's';
      field.appendChild(s);
    }
  })();

  // ===== Orbit spin keyframes =====
  const style = document.createElement('style');
  style.textContent = `@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`;
  document.head.appendChild(style);

  // ===== Transit demo =====
  // ===== Transit demo =====
(function () {
  const slider = $('#radius');
  const depthBadge = $('#depth');
  const dip = $('#dip');
  const planet = $('#planet');

  if (!slider || !depthBadge || !dip || !planet) return;

  function updateTransit() {
    const r = parseFloat(slider.value);
    const depth = Math.min(100, Math.max(0, Math.round(r * r * 1000) / 10)); // %
    depthBadge.textContent = `Depth: ${depth.toFixed(1)}%`;
    const px = 24 * r;
    planet.style.width = px + 'px';
    planet.style.height = px + 'px';
    
    // الشكل الجديد - مثلثات بدل المستطيل
    const y = 30 + depth;
    const startX = 220;
    const endX = 280;
    const midX = (startX + endX) / 2;
    
    // نقاط الشكل المثلث
    const pts = `0,30 ${startX},30 ${midX-10},${y} ${midX+10},${y} ${endX},30 600,30`;
    dip.setAttribute('points', pts);
  }

  slider.addEventListener('input', updateTransit);
  updateTransit();
})();
// تأثيرات تفاعلية لكوكب البيتزا
document.addEventListener('DOMContentLoaded', function() {
  const pizzaPlanet = document.querySelector('.pizza-rock-planet');
  
  if (pizzaPlanet) {
    pizzaPlanet.addEventListener('click', function() {
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  }
});


// ===== تحسين إشعاع الشمس =====
(function enhanceSun() {
  const sunContainer = document.querySelector('#transit-demo [style*="radial-gradient"]');
  if (!sunContainer) return;
  
  // إضافة طبقات إضافية للإشعاع
  const glowLayers = [
    { size: '200px', blur: '80px', color: 'rgba(255, 200, 100, 0.6)' },
    { size: '250px', blur: '120px', color: 'rgba(255, 150, 50, 0.4)' },
    { size: '300px', blur: '160px', color: 'rgba(255, 100, 0, 0.3)' },
    { size: '350px', blur: '200px', color: 'rgba(255, 50, 0, 0.2)' }
  ];
  
  glowLayers.forEach((layer, index) => {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: absolute;
      width: ${layer.size};
      height: ${layer.size};
      border-radius: 50%;
      background: ${layer.color};
      filter: blur(${layer.blur});
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      animation: sunPulse ${3 + index * 0.5}s ease-in-out infinite alternate;
    `;
    sunContainer.parentElement.appendChild(glow);
  });

  // تحسين الشمس الأصلية
  sunContainer.style.cssText += `
    background: radial-gradient(circle at 35% 35%, 
      #ffffff 0%, 
      #fffacd 10%, 
      #ffeb3b 25%, 
      #ff9800 45%, 
      #ff5722 65%, 
      #e65100 100%);
    box-shadow: 
      0 0 80px #ffeb3b,
      0 0 160px rgba(255, 152, 0, 0.8),
      0 0 240px rgba(255, 87, 34, 0.6),
      0 0 320px rgba(230, 81, 0, 0.4);
    animation: sunCorePulse 4s ease-in-out infinite;
  `;
})();

  // ===== Mission tabs =====
  (function () {
    const missionCopy = {
      kepler: {
        title: 'Kepler',
        body:
          "Kepler surveyed a patch of the sky for years, measuring tiny dips in starlight to discover thousands of exoplanet candidates using the transit method.",
      },
      k2: {
        title: "K2 (Kepler's Second Light)",
        body:
          'After a hardware issue, the spacecraft was repurposed as K2, observing along the ecliptic in multiple campaigns and continuing to find planets.',
      },
      tess: {
        title: 'TESS',
        body:
          'The Transiting Exoplanet Survey Satellite scans almost the entire sky, focusing on bright nearby stars to find planets ideal for follow-up studies.',
      },
    };

    const tabs = $$('.tab');
    const mTitle = $('#mission-title');
    const mBody = $('#mission-body');
    if (!tabs.length || !mTitle || !mBody) return;

    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-m');
        const d = missionCopy[key];
        if (!d) return;
        mTitle.textContent = d.title;
        mBody.textContent = d.body;
      });
    });
  })();

  // ===== Light Curves from CSV =====
  (function () {
    const targets = {
      kepler10b: { file: 'data/kepler10b.csv' },
      kepler62f: { file: 'data/kepler62f.csv' },
      wasp12b: { file: 'data/wasp12b.csv' },
    };

    const targetSel = $('#target');
    const svg = $('#lc-chart');
    const dataLine = $('#lc-data');
    const modelLine = $('#lc-model');
    const hoverDot = $('#lc-hover');
    const hit = $('#lc-hit');
    const tooltip = $('#tooltip');
    const ticksG = $('#ticks');

    // لو مافيش عناصر الشارت، اخرج
    if (!targetSel || !svg || !dataLine || !modelLine || !hoverDot || !hit || !tooltip) return;

    function scaleX(ph) {
      // map phase [-0.5..0.5] to [50..660]
      return 50 + (ph + 0.5) * 610;
    }
    function scaleY(flux) {
      // map flux ~ [0.97..1.01] to [270..40]
      const min = 0.97,
        max = 1.01;
      const y = 270 - ((flux - min) / (max - min)) * 230;
      return Math.max(40, Math.min(270, y));
    }

    // Draw ticks once (لو كانت فاضية)
    if (ticksG && !ticksG.hasChildNodes()) {
      const phases = [-0.5, -0.25, 0, 0.25, 0.5];
      phases.forEach((p) => {
        const x = scaleX(p);
        const t1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        t1.setAttribute('x1', x);
        t1.setAttribute('x2', x);
        t1.setAttribute('y1', '270');
        t1.setAttribute('y2', '274');
        t1.setAttribute('stroke', 'rgba(255,255,255,.5)');
        t1.setAttribute('stroke-width', '1');
        ticksG.appendChild(t1);
        const tx = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tx.setAttribute('x', x - 8);
        tx.setAttribute('y', 288);
        tx.setAttribute('fill', '#9fb1d2');
        tx.setAttribute('font-size', '11');
        tx.textContent = p.toFixed(2);
        ticksG.appendChild(tx);
      });
      const fluxTicks = [0.98, 1.0];
      fluxTicks.forEach((fv) => {
        const y = scaleY(fv);
        const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ln.setAttribute('x1', '46');
        ln.setAttribute('x2', '50');
        ln.setAttribute('y1', y);
        ln.setAttribute('y2', y);
        ln.setAttribute('stroke', 'rgba(255,255,255,.5)');
        ln.setAttribute('stroke-width', '1');
        ticksG.appendChild(ln);
        const tx = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tx.setAttribute('x', 12);
        tx.setAttribute('y', y + 4);
        tx.setAttribute('fill', '#9fb1d2');
        tx.setAttribute('font-size', '11');
        tx.textContent = fv.toFixed(2);
        ticksG.appendChild(tx);
      });
    }

    async function loadCSV(path) {
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const rows = text
          .trim()
          .split(/\r?\n/)
          .map((line) => line.split(',').map((v) => Number(v)));
        return rows
          .filter((arr) => Array.isArray(arr) && arr.length >= 2 && isFinite(arr[0]) && isFinite(arr[1]))
          .map(([phase, flux]) => ({ phase, flux }));
      } catch (e) {
        console.error('Failed to load CSV:', path, e);
        // Tooltip رسالة سريعة
        tooltip.style.opacity = 1;
        tooltip.textContent = 'CSV load error — شغّل Live Server';
        setTimeout(() => (tooltip.style.opacity = 0), 2500);
        return [];
      }
    }

    // تقدير موديل بسيط من الداتا
    function modelFromData(data) {
      if (!data.length) {
        return {
          modelFlux: () => 1.0,
          depth: 0,
          duration: 0.12,
        };
      }
      const minFlux = data.reduce((m, p) => Math.min(m, p.flux), Infinity);
      const depth = Math.max(0.0001, 1 - minFlux);
      const thresh = 1 - depth * 0.5;
      const xs = data.filter((p) => p.flux < thresh).map((p) => p.phase);
      const duration = xs.length ? Math.max(...xs) - Math.min(...xs) : 0.12;
      function modelFlux(phase) {
        const half = duration / 2;
        const t = Math.abs(phase);
        if (t > half) return 1.0;
        const edge = Math.max(0, half - t);
        const shape = Math.min(1, (edge / half) * 0.15 + 0.85);
        return 1.0 - depth * shape;
      }
      return { depth, duration, modelFlux };
    }

    function drawLCPoints(data, model) {
      const ptsData = [];
      const ptsModel = [];
      for (const { phase, flux } of data) {
        ptsData.push(`${scaleX(phase)},${scaleY(flux)}`);
        const fm = model.modelFlux(phase);
        ptsModel.push(`${scaleX(phase)},${scaleY(fm)}`);
      }
      dataLine.setAttribute('points', ptsData.join(' '));
      modelLine.setAttribute('points', ptsModel.join(' '));
    }

    async function renderTarget(key) {
      const t = targets[key];
      if (!t) return;
      const data = await loadCSV(t.file);
      const model = modelFromData(data);
      drawLCPoints(data, model);
    }

    targetSel.addEventListener('change', () => renderTarget(targetSel.value));
    // أول تحميل
    renderTarget(targetSel.value);

    // Hover tooltip
    hit.addEventListener('mousemove', (e) => {
      const rect = svg.getBoundingClientRect();
      const rx = e.clientX - rect.left;
      const tx = Math.max(50, Math.min(660, rx));

      const pointsStr = dataLine.getAttribute('points') || '';
      const pts = pointsStr.trim() ? pointsStr.trim().split(' ') : [];
      if (!pts.length) return;

      // أقرب نقطة
      let bestIdx = 0;
      let bestDx = 1e9;
      for (let i = 0; i < pts.length; i++) {
        const [xstr] = pts[i].split(',');
        const x = parseFloat(xstr);
        const dx = Math.abs(x - tx);
        if (dx < bestDx) {
          bestDx = dx;
          bestIdx = i;
        }
      }
      const [xStr, yStr] = pts[bestIdx].split(',');
      const x = parseFloat(xStr);
      const y = parseFloat(yStr);

      hoverDot.setAttribute('cx', x);
      hoverDot.setAttribute('cy', y);
      hoverDot.setAttribute('opacity', '1');

      const fluxApprox = ((270 - y) / 230) * (1.01 - 0.97) + 0.97;
      const phase = (x - 50) / 610 - 0.5;

      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      tooltip.textContent = `phase: ${phase.toFixed(2)} • flux: ${fluxApprox.toFixed(4)}`;
      tooltip.style.opacity = 1;
    });

    hit.addEventListener('mouseleave', () => {
      hoverDot.setAttribute('opacity', '0');
      tooltip.style.opacity = 0;
    });
  })();

  // Add hover effects to planets in learn section
  const planets = document.querySelectorAll('.planet, .planet-orbiting, .multi-planet');
  planets.forEach(planet => {
    planet.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2)';
    });
    planet.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});
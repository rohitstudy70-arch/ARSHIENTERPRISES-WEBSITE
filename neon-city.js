/**
 * Neon City 3D Interactive Telematics Engine
 * Built with Three.js r128
 * Theme: Dark Neon Isometric Smart City with Live GPS Beacon Markers
 */

(function (window) {
  'use strict';

  let renderer = null;
  let scene = null;
  let camera = null;
  let modelGroup = null;
  let cars = [];
  let gpsPins = [];
  let isRunning = false;
  let isPaused = false;
  let animationFrameId = null;
  let clock = null;

  // Camera Orbit & Interaction States
  let az = 0.8;
  let el = 0.75;
  let dist = 95;
  let tAz = az;
  let tEl = el;
  let tDist = dist;
  let autoRotate = true;
  let idleTime = 0;
  const pointerMap = new Map();
  let lastPinchDist = 0;

  const rnd = (a, b) => a + Math.random() * (b - a);

  // Procedural Window Texture for Skyscrapers
  function createSkyscraperTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#140d4f';
    ctx.fillRect(0, 0, 64, 128);

    for (let j = 0; j < 16; j++) {
      for (let i = 0; i < 6; i++) {
        const r = Math.random();
        // Neon window colors: warm amber, electric cyan, deep indigo
        ctx.fillStyle = r < 0.38 ? '#ffc48a' : r < 0.55 ? '#4bc0ff' : r < 0.65 ? '#ff79e0' : '#1c1566';
        ctx.fillRect(i * 10 + 3, j * 8 + 2, 6, 4);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  // Procedural Crosswalk Zebra Texture
  function createCrosswalkTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1e1875';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = '#9fb0ff';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(i * 16 + 3, 0, 10, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }

  function initNeonCity(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if WebGL is supported
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth > 768,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported or disabled', e);
      return;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    renderer.setClearColor(0x0a0630, 0); // transparent background blending with CSS
    container.appendChild(renderer.domElement);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.cursor = 'grab';

    scene = new THREE.Scene();
    scene.background = null; // Let CSS gradient shine through

    camera = new THREE.PerspectiveCamera(35, 1, 1, 450);
    clock = new THREE.Clock();

    // Ambient & Directional Neon Lighting System
    const hemiLight = new THREE.HemisphereLight(0x8a7cff, 0x140d5c, 0.95);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffb27a, 1.25); // Warm Amber Sun
    sunLight.position.set(-25, 45, 18);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x3f6bff, 0.85); // Electric Blue Rim
    rimLight.position.set(30, 25, -25);
    scene.add(rimLight);

    const stripes = createCrosswalkTexture();
    const N = 5, B = 8, W = 3, P = B + W, SPAN = N * P + W, off = -(N - 1) * P / 2;

    modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Floating Platform Base
    const baseGeo = new THREE.BoxGeometry(SPAN + 2, 1.6, SPAN + 2);
    const baseMat = new THREE.MeshLambertMaterial({ color: 0x140d5c });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.8;
    modelGroup.add(baseMesh);

    // Neon Edge Trim
    const edgeGeo = new THREE.BoxGeometry(SPAN + 2.15, 0.14, SPAN + 2.15);
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x3f6bff });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.y = -0.06;
    modelGroup.add(edgeMesh);

    // Ground Floor Ambient Glow
    const glowGeo = new THREE.PlaneGeometry(SPAN * 1.8, SPAN * 1.8);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x22137e,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const groundGlow = new THREE.Mesh(glowGeo, glowMat);
    groundGlow.rotation.x = -Math.PI / 2;
    groundGlow.position.y = -2.1;
    modelGroup.add(groundGlow);

    // Roads Grid
    const roadMat = new THREE.MeshLambertMaterial({ color: 0x18106b });
    const roadMesh = new THREE.Mesh(new THREE.BoxGeometry(SPAN, 0.1, SPAN), roadMat);
    roadMesh.position.y = 0.03;
    modelGroup.add(roadMesh);

    const laneLineMat = new THREE.MeshBasicMaterial({ color: 0x6b84ff });
    for (let i = 0; i <= N; i++) {
      const p = off - P / 2 + i * P;
      for (let k = 0; k < SPAN / 2.7; k++) {
        const q = -SPAN / 2 + k * 2.7 + 1.2;
        const laneA = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.08), laneLineMat);
        laneA.rotation.x = -Math.PI / 2;
        laneA.position.set(q, 0.09, p);
        modelGroup.add(laneA);

        const laneB = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.9), laneLineMat);
        laneB.rotation.x = -Math.PI / 2;
        laneB.position.set(p, 0.09, q);
        modelGroup.add(laneB);
      }
    }

    // Crosswalks
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const px = off - P / 2 + i * P;
        const pz = off - P / 2 + j * P;
        if ((i + j) % 3 === 0) continue;
        const c1 = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.2, 1), new THREE.MeshBasicMaterial({ map: stripes }));
        c1.rotation.x = -Math.PI / 2;
        c1.position.set(px, 0.1, pz + W / 2 + 0.9);
        modelGroup.add(c1);

        const c2 = c1.clone();
        c2.rotation.z = Math.PI / 2;
        c2.position.set(px + W / 2 + 0.9, 0.1, pz);
        modelGroup.add(c2);
      }
    }

    // City Blocks & Buildings
    const blockAccentColors = [0x6b4bff, 0x3f6bff, 0xb04bff, 0x4bc0ff];
    const buildingRoofMat = new THREE.MeshLambertMaterial({ color: 0x241785 });
    const blockSlabMat = new THREE.MeshLambertMaterial({ color: 0x201475 });

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const cx = off + i * P;
        const cz = off + j * P;
        const slab = new THREE.Mesh(new THREE.BoxGeometry(B, 0.3, B), blockSlabMat);
        slab.position.set(cx, 0.15, cz);
        modelGroup.add(slab);

        const distFromCenter = Math.abs(i - 2) + Math.abs(j - 2);
        const buildingCount = 1 + Math.floor(Math.random() * 3);

        for (let k = 0; k < buildingCount; k++) {
          const bw = rnd(2.2, buildingCount > 1 ? 4.2 : 6.4);
          const bd = rnd(2.2, buildingCount > 1 ? 4.2 : 6.4);
          const bh = rnd(2.5, distFromCenter < 3 ? 15 : 8.5);

          const winTexture = createSkyscraperTexture();
          winTexture.repeat.set(Math.max(1, Math.round(bw / 2)), Math.max(1, Math.round(bh / 2.5)));

          const buildingSideMat = new THREE.MeshLambertMaterial({
            map: winTexture,
            emissive: 0xffffff,
            emissiveMap: winTexture,
            emissiveIntensity: 0.65,
            color: blockAccentColors[Math.floor(Math.random() * 4)]
          });

          const buildingMesh = new THREE.Mesh(
            new THREE.BoxGeometry(bw, bh, bd),
            [buildingSideMat, buildingSideMat, buildingRoofMat, buildingRoofMat, buildingSideMat, buildingSideMat]
          );

          buildingMesh.position.set(
            cx + (buildingCount > 1 ? rnd(-1.6, 1.6) : 0),
            bh / 2 + 0.3,
            cz + (buildingCount > 1 ? rnd(-1.6, 1.6) : 0)
          );
          modelGroup.add(buildingMesh);

          // Neon Spire Antenna on Tall Buildings
          if (bh > 9.5) {
            const spire = new THREE.Mesh(
              new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8),
              new THREE.MeshBasicMaterial({ color: 0xff79e0 })
            );
            spire.position.set(buildingMesh.position.x, bh + 1.4, buildingMesh.position.z);
            modelGroup.add(spire);

            const beaconGeo = new THREE.SphereGeometry(0.18, 8, 8);
            const beaconMat = new THREE.MeshBasicMaterial({ color: 0xe3ab84 });
            const beacon = new THREE.Mesh(beaconGeo, beaconMat);
            beacon.position.set(buildingMesh.position.x, bh + 2.5, buildingMesh.position.z);
            modelGroup.add(beacon);
          }
        }
      }
    }

    // Vehicle Traffic Generation
    const carPalette = [0xff79e0, 0xe3ab84, 0x4bc0ff, 0x3f6bff, 0xffd35c, 0xffffff];
    const totalCars = isMobile ? 16 : 38;
    cars = [];
    gpsPins = [];

    for (let n = 0; n < totalCars; n++) {
      const horiz = Math.random() < 0.5;
      const dir = Math.random() < 0.5 ? 1 : -1;
      const lane = Math.floor(Math.random() * (N + 1));
      const carGroup = new THREE.Group();
      const carColor = carPalette[n % carPalette.length];

      // Car Body
      const bodyMat = new THREE.MeshLambertMaterial({
        color: carColor,
        emissive: carColor,
        emissiveIntensity: 0.45
      });
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.6, 0.9), bodyMat);
      body.position.y = 0.5;
      carGroup.add(body);

      // Cabin
      const cabMat = new THREE.MeshLambertMaterial({ color: 0x1e155c });
      const cab = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.8), cabMat);
      cab.position.set(-0.1, 0.95, 0);
      carGroup.add(cab);

      // Headlight Beam
      const hlMat = new THREE.MeshBasicMaterial({ color: 0xffe9a0 });
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.7), hlMat);
      hl.position.set(0.98, 0.55, 0);
      carGroup.add(hl);

      // Taillight
      const tlMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.7), tlMat);
      tl.position.set(-0.98, 0.55, 0);
      carGroup.add(tl);

      // Floating Live GPS Pin Marker on Selected Telematics Fleet Cars
      let pinGroup = null;
      if (n % (isMobile ? 4 : 5) === 0) {
        pinGroup = new THREE.Group();
        
        // Glowing Pin Head
        const pinBall = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x4bc0ff })
        );
        pinBall.position.y = 2.4;
        pinGroup.add(pinBall);

        // Holographic Pulse Ring
        const ringGeo = new THREE.RingGeometry(0.25, 0.45, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xe3ab84,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const pulseRing = new THREE.Mesh(ringGeo, ringMat);
        pulseRing.rotation.x = -Math.PI / 2;
        pulseRing.position.y = 2.4;
        pinGroup.add(pulseRing);

        // Pin Stalk Line
        const stalkGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6);
        const stalkMat = new THREE.MeshBasicMaterial({ color: 0x3f6bff });
        const stalk = new THREE.Mesh(stalkGeo, stalkMat);
        stalk.position.y = 1.7;
        pinGroup.add(stalk);

        carGroup.add(pinGroup);
        gpsPins.push({ group: pinGroup, pulseRing, baseScale: 1 });
      }

      const carData = {
        g: carGroup,
        horiz,
        dir,
        p: off - P / 2 + lane * P + dir * 0.55,
        t: Math.random() * SPAN,
        v: rnd(3.0, 6.2),
        span: SPAN
      };

      cars.push(carData);
      modelGroup.add(carGroup);
    }

    function placeCar(c) {
      const x = -c.span / 2 + c.t;
      if (c.horiz) {
        c.g.position.set(c.dir > 0 ? x : -x, 0.05, c.p);
        c.g.rotation.y = c.dir > 0 ? 0 : Math.PI;
      } else {
        c.g.position.set(c.p, 0.05, c.dir > 0 ? x : -x);
        c.g.rotation.y = c.dir > 0 ? -Math.PI / 2 : Math.PI / 2;
      }
    }

    cars.forEach(placeCar);

    // Pointer Orbit Controls
    canvas.addEventListener('pointerdown', (e) => {
      canvas.setPointerCapture(e.pointerId);
      pointerMap.set(e.pointerId, { x: e.clientX, y: e.clientY });
      autoRotate = false;
      idleTime = 0;
      canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('pointerup', (e) => {
      pointerMap.delete(e.pointerId);
      lastPinchDist = 0;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('pointercancel', (e) => {
      pointerMap.delete(e.pointerId);
      lastPinchDist = 0;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('pointermove', (e) => {
      const p = pointerMap.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;

      if (pointerMap.size === 1) {
        tAz -= dx * 0.006;
        tEl = Math.max(0.15, Math.min(1.45, tEl + dy * 0.006));
      } else if (pointerMap.size === 2) {
        const [p1, p2] = [...pointerMap.values()];
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (lastPinchDist > 0) {
          tDist = Math.max(35, Math.min(160, tDist * (lastPinchDist / d)));
        }
        lastPinchDist = d;
      }
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      tDist = Math.max(35, Math.min(160, tDist * (1 + e.deltaY * 0.001)));
      autoRotate = false;
      idleTime = 0;
    }, { passive: false });

    canvas.addEventListener('dblclick', () => {
      tAz = 0.8;
      tEl = 0.75;
      tDist = 95;
      autoRotate = true;
    });

    // Resize Handler
    function handleResize() {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < height ? 55 : 35;
      camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // IntersectionObserver to pause rendering when canvas is scrolled off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isPaused = !entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    // Page Visibility to pause when tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isPaused = true;
      } else {
        isPaused = false;
        if (clock) clock.getDelta(); // reset delta to prevent jump
      }
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render Loop
    let pulseTime = 0;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (isPaused) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      pulseTime += dt * 4;

      if (!prefersReducedMotion) {
        // Move Cars
        for (let i = 0; i < cars.length; i++) {
          const c = cars[i];
          c.t = (c.t + c.v * dt) % c.span;
          placeCar(c);
        }

        // Animate GPS Beacon Radar Pulses
        for (let j = 0; j < gpsPins.length; j++) {
          const pin = gpsPins[j];
          const scale = 1 + Math.sin(pulseTime + j) * 0.4;
          const opacity = 0.4 + Math.cos(pulseTime + j) * 0.4;
          pin.pulseRing.scale.set(scale, scale, scale);
          pin.pulseRing.material.opacity = Math.max(0.1, opacity);
        }

        // Auto Rotation resume after 4s idle
        if (!autoRotate && pointerMap.size === 0) {
          idleTime += dt;
          if (idleTime > 4) autoRotate = true;
        }

        if (autoRotate) {
          tAz += dt * 0.12;
        }
      }

      // Smooth Camera Damping
      az += (tAz - az) * 0.08;
      el += (tEl - el) * 0.08;
      dist += (tDist - dist) * 0.08;

      camera.position.set(
        Math.cos(az) * Math.cos(el) * dist,
        Math.sin(el) * dist + 4,
        Math.sin(az) * Math.cos(el) * dist
      );
      camera.lookAt(0, 4, 0);

      renderer.render(scene, camera);
    }

    isRunning = true;
    animate();
  }

  window.initNeonCity = initNeonCity;
})(window);

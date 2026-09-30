import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Pause, Play, Compass, Eye, ShieldCheck, Zap } from 'lucide-react';

export default function NeonCity3D() {
  const mountRef = useRef(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMult, setSpeedMult] = useState(1);
  const [trailsOn, setTrailsOn] = useState(true);
  const [stats, setStats] = useState({ total: 0, cars: 0, trucks: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0630);
    scene.fog = new THREE.Fog(0x0a0630, 200, 600);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.5, 1600);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const hemi = new THREE.HemisphereLight(0x8a7cff, 0x1a1060, 0.95);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffb27a, 1.1);
    sun.position.set(130, 170, 70);
    sun.castShadow = true;
    scene.add(sun);

    // Stars
    const starCount = 400;
    const starArr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(0.1 + Math.random() * 0.9);
      const r = 1100;
      starArr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      starArr[i * 3 + 1] = r * Math.cos(ph);
      starArr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starArr, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xdde6ff, size: 1.5, transparent: true, opacity: 0.7 })
    );
    scene.add(stars);

    // Ground & Roads
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x140d5c });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const V3 = (x, z) => new THREE.Vector3(x, 0, z);
    const routes = {
      ring: {
        name: 'Ring Road Highway',
        half: 7.2,
        y: 0.05,
        curve: new THREE.CatmullRomCurve3(
          [
            [110, 0], [85, 70], [20, 105], [-60, 90],
            [-110, 25], [-95, -55], [-30, -100], [45, -90], [100, -45]
          ].map(p => V3(p[0], p[1])),
          true,
          'centripetal'
        )
      },
      cross: {
        name: 'Central Telematics Avenue',
        half: 6.2,
        y: 0.1,
        curve: new THREE.CatmullRomCurve3(
          [
            [-190, 20], [-120, -75], [0, -38], [120, -85],
            [195, 10], [110, 92], [0, 62], [-110, 98]
          ].map(p => V3(p[0], p[1])),
          true,
          'centripetal'
        )
      }
    };
    Object.values(routes).forEach(r => { r.len = r.curve.getLength(); });

    // Road Meshes
    const asphaltMat = new THREE.MeshLambertMaterial({ color: 0x2a2490 });
    function ribbon(route, halfW, y, mat) {
      const N = 400;
      const pos = [];
      const idx = [];
      let v = 0;
      for (let i = 0; i < N; i++) {
        for (const u of [i / N, (i + 1) / N]) {
          const uu = Math.min(u, 0.99999);
          const p = route.curve.getPointAt(uu);
          const t = route.curve.getTangentAt(uu);
          const rx = -t.z, rz = t.x;
          pos.push(p.x - rx * halfW, y, p.z - rz * halfW, p.x + rx * halfW, y, p.z + rz * halfW);
        }
        idx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
        v += 4;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      const m = new THREE.Mesh(g, mat);
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    ribbon(routes.ring, routes.ring.half, routes.ring.y, asphaltMat);
    ribbon(routes.cross, routes.cross.half, routes.cross.y, asphaltMat);

    // Procedural Skyscrapers
    const bldColors = [0x9b8bff, 0x7f9bff, 0xc48bff, 0x8fd8ff];
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 400;
      if (Math.hypot(x, z) < 40) continue;
      const w = 15 + Math.random() * 20;
      const d = 15 + Math.random() * 20;
      const h = 10 + Math.pow(Math.random(), 2) * 45;
      const bMat = new THREE.MeshLambertMaterial({
        color: bldColors[Math.floor(Math.random() * bldColors.length)],
        emissive: 0x140d5c
      });
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bMat);
      b.position.set(x, h / 2, z);
      b.castShadow = true;
      b.receiveShadow = true;
      scene.add(b);
    }

    // Vehicle Models & Markers
    const vehicles = [];
    const CAR_COL = 0x4bc0ff;
    const TRUCK_COL = 0xe3ab84;
    const VLTD_YELLOW_COL = 0xffd35c;
    const carColors = [0x3ddcff, 0xa78bff, 0xffd35c, 0xff79e0, 0x5fb4ff, 0xffb020];
    let cCount = 0, tCount = 0, vltdCount = 0, gpsCount = 0;

    function spawn(route, off, dir, type, s, cruise) {
      const isTruck = type === 'truck';
      let id, hex, carColor;

      if (isTruck) {
        tCount++;
        vltdCount++;
        id = 'VLTD-' + String(vltdCount).padStart(2, '0');
        hex = TRUCK_COL;
      } else {
        cCount++;
        carColor = carColors[Math.floor(Math.random() * carColors.length)];
        const isYellowCar = (carColor === 0xffd35c || carColor === 0xffb020);
        if (isYellowCar) {
          vltdCount++;
          id = 'VLTD-' + String(vltdCount).padStart(2, '0');
          hex = VLTD_YELLOW_COL;
        } else {
          gpsCount++;
          id = 'GPS-' + String(gpsCount).padStart(2, '0');
          hex = CAR_COL;
        }
      }

      const grp = new THREE.Group();

      if (isTruck) {
        const body = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 10), new THREE.MeshLambertMaterial({ color: 0xffb020 }));
        body.position.y = 2;
        body.castShadow = true;
        grp.add(body);
      } else {
        const body = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 4.5), new THREE.MeshLambertMaterial({ color: carColor || 0x3ddcff }));
        body.position.y = 1;
        body.castShadow = true;
        grp.add(body);
      }

      // GPS Pulsing Ring
      const ringGeo = new THREE.RingGeometry(2.0, 2.4, 30);
      const ringMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.2;
      grp.add(ring);

      // Pin
      const pinGeo = new THREE.OctahedronGeometry(0.8);
      const pinMat = new THREE.MeshBasicMaterial({ color: hex });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.y = isTruck ? 5.5 : 3.5;
      grp.add(pin);

      scene.add(grp);

      const v = {
        id,
        type,
        route,
        off,
        dir,
        s,
        speed: cruise,
        cruise,
        grp,
        pin,
        ring,
        hex,
        x: 0,
        z: 0,
        hx: 0,
        hz: 1,
        trip: 0,
        phase: Math.random() * 6.28
      };
      vehicles.push(v);
      return v;
    }

    // Spawn fleet
    for (let i = 0; i < 4; i++) spawn(routes.ring, -3.5, 1, 'truck', i * 150, 14);
    for (let i = 0; i < 6; i++) spawn(routes.ring, 3.5, 1, 'car', i * 100 + 40, 22);
    for (let i = 0; i < 4; i++) spawn(routes.cross, 2.5, 1, 'car', i * 120, 18);
    for (let i = 0; i < 3; i++) spawn(routes.cross, -2.5, -1, 'truck', i * 160 + 50, 15);

    setStats({ total: vehicles.length, cars: cCount, trucks: tCount });

    // Camera Orbit State
    let az = 0.6;
    let pol = 1.0;
    let dist = 185;
    let target = new THREE.Vector3(0, 0, 0);
    let selected = null;
    let lastAutoTour = performance.now();
    let lastUserTouch = 0;

    const selectVehicle = (v, fromUser = true) => {
      selected = v;
      setSelectedVehicle(v ? { ...v } : null);
      if (fromUser) {
        lastUserTouch = performance.now();
        lastAutoTour = performance.now();
      }
      if (v) {
        dist = v.type === 'truck' ? 55 : 42;
        pol = 1.05;
      } else {
        dist = 185;
        pol = 1.0;
      }
    };

    const triggerAutoSwitch = () => {
      if (!vehicles.length) return;
      const others = vehicles.filter(v => v !== selected);
      const next = others.length ? others[Math.floor(Math.random() * others.length)] : vehicles[0];
      selectVehicle(next, false);
      az += 0.8 + Math.random() * 0.6;
    };

    // Initial auto focus after 2.5s
    setTimeout(() => {
      if (!selected) triggerAutoSwitch();
    }, 2500);

    let isPointerDown = false;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let moved = 0;

    const onPointerDown = (e) => {
      isPointerDown = true;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved = 0;
      lastUserTouch = performance.now();
    };
    const onPointerMove = (e) => {
      if (!isPointerDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      az -= dx * 0.005;
      pol = Math.max(0.1, Math.min(1.4, pol - dy * 0.005));
      lastUserTouch = performance.now();
    };
    const onPointerUp = (e) => {
      isPointerDown = false;
      // If was a click without drag, pick vehicle
      if (moved < 6) {
        const rect = container.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        let nearestV = null;
        let minDist = 25;
        const v3 = new THREE.Vector3();

        vehicles.forEach(v => {
          v3.set(v.x, 2, v.z).project(camera);
          if (v3.z < 1) {
            const sx = (v3.x * 0.5 + 0.5) * rect.width + rect.left;
            const sy = (-v3.y * 0.5 + 0.5) * rect.height + rect.top;
            const d = Math.hypot(sx - e.clientX, sy - e.clientY);
            if (d < minDist) {
              minDist = d;
              nearestV = v;
            }
          }
        });

        if (nearestV) {
          selectVehicle(nearestV === selected ? null : nearestV, true);
        }
      }
    };
    const onWheel = (e) => {
      dist = Math.max(30, Math.min(450, dist + e.deltaY * 0.2));
      lastUserTouch = performance.now();
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    // Animation Loop
    let animationId;
    let lastTime = performance.now();

    const animate = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Auto rotation when idle
      if (!isPointerDown && now - lastUserTouch > 3000) {
        az += dt * (selected ? 0.025 : 0.04);
      }

      // 5-Second Auto-Touring Cycle
      if (now - lastAutoTour >= 5000) {
        lastAutoTour = now;
        if (now - lastUserTouch > 3000) {
          triggerAutoSwitch();
        }
      }

      // Step simulation
      vehicles.forEach(v => {
        const len = v.route.len;
        const ds = v.speed * dt * speedMult;
        v.s += v.dir * ds;
        v.trip += ds;
        if (v.s < 0) v.s += len;
        if (v.s >= len) v.s -= len;

        const u = (((v.s % len) + len) % len) / len;
        const p = v.route.curve.getPointAt(u);
        const t = v.route.curve.getTangentAt(u);
        v.x = p.x - t.z * v.off;
        v.z = p.z + t.x * v.off;
        v.hx = t.x * v.dir;
        v.hz = t.z * v.dir;

        v.grp.position.set(v.x, 0, v.z);
        v.grp.rotation.y = Math.atan2(v.hx, v.hz);

        // Pulse GPS ring
        const isSel = v === selected;
        const pulse = ((now * 0.001 * 1.5 + v.phase) % 1.5) / 1.5;
        v.ring.scale.setScalar((isSel ? 1.6 : 1) + pulse * (isSel ? 3.0 : 2.2));
        v.ring.material.opacity = (isSel ? 0.9 : 0.6) * (1 - pulse);
        v.pin.position.y = (v.type === 'truck' ? 5.5 : 3.5) + Math.sin(now * 0.003 + v.phase) * 0.4;
      });

      // Smooth Camera Target Lerp
      const goal = selected ? new THREE.Vector3(selected.x, 1.5, selected.z) : new THREE.Vector3(0, 0, 0);
      target.lerp(goal, 1 - Math.exp(-dt * (selected ? 5 : 3)));

      // Update camera position
      const sp = Math.sin(pol);
      const cp = Math.cos(pol);
      camera.position.set(
        target.x + dist * sp * Math.sin(az),
        target.y + dist * cp,
        target.z + dist * sp * Math.cos(az)
      );
      camera.lookAt(target);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [speedMult]);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl overflow-hidden glass-panel border border-[#3a2f9a] shadow-neonCard">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-[#0a0630]/85 backdrop-blur-md border border-[#4bc0ff]/40 text-xs font-semibold text-[#4bc0ff] flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#4bc0ff] animate-ping" />
          <span>LIVE TELEMETRY STREAM</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#0a0630]/85 backdrop-blur-md border border-[#e3ab84]/40 text-xs font-medium text-white/90">
          📍 Purnea Fleet Zone: <span className="text-[#e3ab84] font-bold">{stats.total} Active Beacons</span>
        </div>
      </div>

      {/* Tracked Vehicle Telemetry Card (When active) */}
      {selectedVehicle && (
        <div className="absolute bottom-16 left-4 z-10 p-4 rounded-xl bg-[#0a0630]/90 backdrop-blur-md border border-[#e3ab84]/50 text-white shadow-2xl animate-fadeIn max-w-[240px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#e3ab84] bg-[#e3ab84]/20 px-2 py-0.5 rounded">
              🎯 {selectedVehicle.type === 'truck' ? 'Heavy Truck' : 'Commercial Car'}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">● Active 5s Tour</span>
          </div>
          <div className="text-lg font-black tracking-tight">{selectedVehicle.id}</div>
          <div className="text-xs text-slate-300 mt-0.5">{selectedVehicle.route?.name}</div>
          <div className="mt-2 pt-2 border-t border-[#3a2f9a]/60 flex items-baseline justify-between">
            <span className="text-[11px] text-slate-400">Live Speed:</span>
            <span className="text-sm font-black text-[#4bc0ff]">{Math.round(selectedVehicle.speed * 3.6)} km/h</span>
          </div>
        </div>
      )}

      {/* Controls HUD */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setSpeedMult(prev => (prev === 1 ? 2 : prev === 2 ? 4 : 1))}
          className="px-3 py-1.5 rounded-lg bg-[#140d5c]/80 backdrop-blur-md border border-[#3a2f9a] text-xs font-semibold text-white hover:border-[#e3ab84] transition"
        >
          ⚡ {speedMult}x Speed
        </button>
      </div>

      {/* Interactive Drag Notice */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-[#0a0630]/80 backdrop-blur-md border border-[#3a2f9a] text-[11px] text-[#a9a4d6] flex items-center gap-2 pointer-events-none">
        <span>🔄 Auto-Touring Vehicles Every 5s • Click Vehicle or Drag to Orbit</span>
      </div>
    </div>
  );
}

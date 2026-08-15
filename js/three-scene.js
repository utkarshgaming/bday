/**
 * 🌸 ULTRA-BESPOKE 3D BIRTHDAY ODYSSEY FOR REET
 * Three.js Procedural 3D White Lily Petals & Floating Romantic Hearts Garden
 * Interactive Wind Vortex & Click-to-Bloom Heart Physics
 */

class Birthday3DScene {
  constructor() {
    this.container = document.getElementById('three-canvas-container');
    if (!this.container || typeof THREE === 'undefined') return;

    this.isMobile = window.innerWidth < 768;
    this.isPaused = false;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !this.isMobile,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
    this.container.appendChild(this.renderer.domElement);

    // Mouse & Touch Tracking
    this.mouse = new THREE.Vector2(0, 0);
    this.mouseTarget = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.mouse3D = new THREE.Vector3(0, 0, 0);

    // Objects
    this.particles = [];
    this.particleBursts = [];

    this.initLights();
    this.createBotanicalAndHeartGarden();
    this.bindEvents();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0xFFE3E8, 1.4);
    this.scene.add(ambientLight);

    // Warm romantic rose-gold directional light
    const roseSunLight = new THREE.DirectionalLight(0xFFB3C1, 1.6);
    roseSunLight.position.set(25, 45, 30);
    this.scene.add(roseSunLight);

    // Soft strawberry pink fill light
    const pinkFillLight = new THREE.DirectionalLight(0xFF758F, 1.2);
    pinkFillLight.position.set(-25, -20, 20);
    this.scene.add(pinkFillLight);

    // Dynamic Valentine red cursor spotlight
    const pointLight = new THREE.PointLight(0xE63946, 1.6, 60);
    pointLight.position.set(0, 0, 15);
    this.scene.add(pointLight);
    this.cursorLight = pointLight;
  }

  createPetalGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.8);
    shape.bezierCurveTo(1.0, -0.6, 1.4, 0.8, 0, 2.2);
    shape.bezierCurveTo(-1.4, 0.8, -1.0, -0.6, 0, -1.8);

    const geometry = new THREE.ShapeGeometry(shape, 12);
    
    // Displace vertices for authentic 3D petal curvature
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distFromCenter = Math.abs(x);
      const zOffset = Math.sin((y + 1.8) / 4.0 * Math.PI) * 0.45 - (distFromCenter * 0.25);
      pos.setZ(i, zOffset);
    }
    geometry.computeVertexNormals();
    return geometry;
  }

  createHeartGeometry() {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.4);
    shape.bezierCurveTo(x, y + 0.4, x - 0.4, y + 0.9, x - 0.9, y + 0.9);
    shape.bezierCurveTo(x - 1.5, y + 0.9, x - 1.5, y + 0.2, x - 1.5, y + 0.2);
    shape.bezierCurveTo(x - 1.5, y - 0.4, x - 0.7, y - 1.0, x, y - 1.5);
    shape.bezierCurveTo(x + 0.7, y - 1.0, x + 1.5, y - 0.4, x + 1.5, y + 0.2);
    shape.bezierCurveTo(x + 1.5, y + 0.2, x + 1.5, y + 0.9, x + 0.9, y + 0.9);
    shape.bezierCurveTo(x + 0.4, y + 0.9, x, y + 0.4, x, y + 0.4);

    const geometry = new THREE.ShapeGeometry(shape, 10);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const dist = Math.sqrt(px * px + py * py);
      pos.setZ(i, Math.cos(dist * 0.9) * 0.2);
    }
    geometry.computeVertexNormals();
    return geometry;
  }

  createBotanicalAndHeartGarden() {
    const petalGeo = this.createPetalGeometry();
    const heartGeo = this.createHeartGeometry();

    // 🌸 1. Silky White Lily Petals
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.3,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });

    // 💖 2. Sweetheart Strawberry Pink Hearts
    const pinkHeartMat = new THREE.MeshStandardMaterial({
      color: 0xFF758F,
      roughness: 0.2,
      metalness: 0.15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88
    });

    // ❤️ 3. Vibrant Valentine Red Hearts
    const redHeartMat = new THREE.MeshStandardMaterial({
      color: 0xE63946,
      roughness: 0.18,
      metalness: 0.2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });

    // ✨ 4. Soft Rose-Gold Stardust Sparkles
    const stardustMat = new THREE.MeshStandardMaterial({
      color: 0xFFCCD5,
      roughness: 0.1,
      metalness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });

    // Optimized particle counts: Mobile capped to ~24 total particles, Desktop to 78
    const petalCount = this.isMobile ? 10 : 28;
    const pinkHeartCount = this.isMobile ? 8 : 20;
    const redHeartCount = this.isMobile ? 6 : 16;
    const stardustCount = this.isMobile ? 4 : 14;

    // Spawn White Lily Petals
    for (let i = 0; i < petalCount; i++) {
      const mesh = new THREE.Mesh(petalGeo, petalMat.clone());
      this.initParticleData(mesh, 0.45 + Math.random() * 0.6, 0.022);
      this.scene.add(mesh);
      this.particles.push(mesh);
    }

    // Spawn Sweetheart Pink Hearts
    for (let i = 0; i < pinkHeartCount; i++) {
      const mesh = new THREE.Mesh(heartGeo, pinkHeartMat.clone());
      this.initParticleData(mesh, 0.35 + Math.random() * 0.55, 0.024);
      this.scene.add(mesh);
      this.particles.push(mesh);
    }

    // Spawn Vibrant Valentine Red Hearts
    for (let i = 0; i < redHeartCount; i++) {
      const mesh = new THREE.Mesh(heartGeo, redHeartMat.clone());
      this.initParticleData(mesh, 0.3 + Math.random() * 0.5, 0.026);
      this.scene.add(mesh);
      this.particles.push(mesh);
    }

    // Spawn Twinkling Stardust / Micro-Hearts
    for (let i = 0; i < stardustCount; i++) {
      const mesh = new THREE.Mesh(heartGeo, stardustMat.clone());
      this.initParticleData(mesh, 0.18 + Math.random() * 0.25, 0.018);
      this.scene.add(mesh);
      this.particles.push(mesh);
    }
  }

  initParticleData(mesh, scale, baseFallSpeed) {
    mesh.scale.set(scale, scale, scale);

    mesh.position.x = (Math.random() - 0.5) * 60;
    mesh.position.y = (Math.random() - 0.5) * 50;
    mesh.position.z = (Math.random() - 0.5) * 30;

    mesh.rotation.x = Math.random() * Math.PI * 2;
    mesh.rotation.y = Math.random() * Math.PI * 2;
    mesh.rotation.z = Math.random() * Math.PI * 2;

    mesh.userData = {
      vx: (Math.random() - 0.5) * 0.035,
      vy: -baseFallSpeed - Math.random() * 0.035,
      vz: (Math.random() - 0.5) * 0.02,
      rotSpeedX: (Math.random() - 0.5) * 0.03,
      rotSpeedY: (Math.random() - 0.5) * 0.035,
      rotSpeedZ: (Math.random() - 0.5) * 0.025,
      flutterPhase: Math.random() * Math.PI * 2,
      flutterSpeed: 0.02 + Math.random() * 0.03
    };
  }

  spawnBloomBurst(screenX, screenY, count = 32) {
    const burstCount = this.isMobile ? Math.min(count, 14) : count;
    const x = (screenX / window.innerWidth) * 2 - 1;
    const y = -(screenY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z + 10;
    const origin = this.camera.position.clone().add(dir.multiplyScalar(distance));

    const heartGeo = this.createHeartGeometry();

    for (let i = 0; i < burstCount; i++) {
      const isHeart = Math.random() > 0.25;
      const type = Math.random();

      let color = 0xFF758F; // Sweetheart pink
      if (type > 0.6) color = 0xE63946; // Valentine red
      else if (type > 0.4) color = 0xFFB3C1; // Baby pink
      else if (type > 0.2) color = 0xFFFFFF; // Silky lily white

      const geom = isHeart ? heartGeo : new THREE.SphereGeometry(0.22, 6, 6);
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.95
      });

      const particle = new THREE.Mesh(geom, mat);
      const scale = isHeart ? (0.22 + Math.random() * 0.35) : (0.12 + Math.random() * 0.22);
      particle.scale.set(scale, scale, scale);
      particle.position.copy(origin);

      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI;
      const speed = 0.18 + Math.random() * 0.35;

      particle.userData = {
        vx: Math.cos(angle) * Math.cos(elevation) * speed,
        vy: Math.sin(elevation) * speed + 0.15, // float upward
        vz: Math.sin(angle) * Math.cos(elevation) * speed,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.02,
        rotSpeed: (Math.random() - 0.5) * 0.09
      };

      this.scene.add(particle);
      this.particleBursts.push(particle);
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
    });

    // Pause rendering loop on tab background to preserve battery life
    document.addEventListener('visibilitychange', () => {
      this.isPaused = (document.visibilityState === 'hidden');
      if (!this.isPaused) {
        requestAnimationFrame(this.animate);
      }
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseTarget.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouseTarget.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    }, { passive: true });

    window.addEventListener('click', (e) => {
      this.spawnBloomBurst(e.clientX, e.clientY, this.isMobile ? 12 : 24);
    });

    window.addEventListener('dblclick', (e) => {
      this.spawnBloomBurst(e.clientX, e.clientY, this.isMobile ? 20 : 48);
    });
  }

  animate() {
    if (this.isPaused) return;
    requestAnimationFrame(this.animate);

    // Smooth mouse interpolation
    this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.08;

    this.mouse3D.set(this.mouse.x * 25, this.mouse.y * 18, 0);

    if (this.cursorLight) {
      this.cursorLight.position.set(this.mouse3D.x, this.mouse3D.y, 12);
    }

    // Update Floating Petals & Hearts
    for (let i = 0; i < this.particles.length; i++) {
      const item = this.particles[i];
      const data = item.userData;

      data.flutterPhase += data.flutterSpeed;
      const flutterX = Math.sin(data.flutterPhase) * 0.04;
      const flutterZ = Math.cos(data.flutterPhase) * 0.02;

      item.position.x += data.vx + flutterX;
      item.position.y += data.vy;
      item.position.z += data.vz + flutterZ;

      item.rotation.x += data.rotSpeedX;
      item.rotation.y += data.rotSpeedY;
      item.rotation.z += data.rotSpeedZ;

      // Spatial wind vortex interaction with cursor
      const dx = item.position.x - this.mouse3D.x;
      const dy = item.position.y - this.mouse3D.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 11) {
        const force = (11 - dist) * 0.009;
        item.position.x += (dx / dist) * force;
        item.position.y += (dy / dist) * force;
        item.rotation.z += 0.05;
      }

      // Wrap around bounds
      if (item.position.y < -28) {
        item.position.y = 28;
        item.position.x = (Math.random() - 0.5) * 60;
      }
      if (item.position.x > 32) item.position.x = -32;
      if (item.position.x < -32) item.position.x = 32;
    }

    // Update Particle Bursts
    for (let i = this.particleBursts.length - 1; i >= 0; i--) {
      const p = this.particleBursts[i];
      p.position.x += p.userData.vx;
      p.position.y += p.userData.vy;
      p.position.z += p.userData.vz;
      p.rotation.z += p.userData.rotSpeed || 0.02;
      p.userData.vy -= 0.004; // subtle gravity

      p.userData.life -= p.userData.decay;
      p.material.opacity = p.userData.life;

      if (p.userData.life <= 0) {
        this.scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        this.particleBursts.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialized on load
window.addEventListener('DOMContentLoaded', () => {
  window.birthday3D = new Birthday3DScene();
});

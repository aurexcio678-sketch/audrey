/**
 * scene.js - Three.js 3D Scene, Turntable Stage & Aesthetic Dressing Room
 */

class FashionScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.THREE = window.THREE;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Stage groups
    this.turntableGroup = null;
    this.dressingRoomGroup = null;
    this.particleSystem = null;

    // Turntable drag state
    this.isDragging = false;
    this.previousMouseX = 0;
    this.turntableRotationVelocity = 0;
    this.turntableAngle = 0;

    // Camera preset targets
    this.camTargetPos = new this.THREE.Vector3(0, 1.35, 3.8);
    this.camLookTarget = new this.THREE.Vector3(0, 1.15, 0);

    this.init();
  }

  init() {
    const THREE = this.THREE;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a14);
    this.scene.fog = new THREE.FogExp2(0x0a0a14, 0.05);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.copy(this.camTargetPos);
    this.camera.lookAt(this.camLookTarget);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    this.setupLighting();

    // 5. Turntable & Environment
    this.setupDressingRoom();
    this.setupTurntable();
    this.setupSparkles();

    // 6. Interaction listeners
    this.setupEventListeners();
  }

  setupLighting() {
    const THREE = this.THREE;

    // Ambient fill
    const ambient = new THREE.AmbientLight(0xffe6f2, 0.7);
    this.scene.add(ambient);

    // Main Stage Spotlight
    const spot = new THREE.SpotLight(0xffffff, 2.2);
    spot.position.set(0, 5.5, 3.5);
    spot.angle = Math.PI / 4.2;
    spot.penumbra = 0.5;
    spot.decay = 1.2;
    spot.distance = 20;
    spot.castShadow = true;
    spot.shadow.mapSize.width = 1024;
    spot.shadow.mapSize.height = 1024;
    spot.shadow.bias = -0.001;
    this.scene.add(spot);
    this.mainSpot = spot;

    // Overhead Center Light
    const topLight = new THREE.PointLight(0xffb7d5, 1.2, 8);
    topLight.position.set(0, 3.8, 0);
    this.scene.add(topLight);

    // Cyan Rim Light (Back-Left)
    const rimLeft = new THREE.DirectionalLight(0x00f0ff, 1.1);
    rimLeft.position.set(-3.5, 2.5, -2.5);
    this.scene.add(rimLeft);

    // Magenta Rim Light (Back-Right)
    const rimRight = new THREE.DirectionalLight(0xff3385, 1.1);
    rimRight.position.set(3.5, 2.5, -2.5);
    this.scene.add(rimRight);
  }

  setupTurntable() {
    const THREE = this.THREE;

    this.turntableGroup = new THREE.Group();
    this.scene.add(this.turntableGroup);

    this.turntableBase = new THREE.Group();
    this.turntableGroup.add(this.turntableBase);

    // Circular Turntable Platform
    const stageGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.22, 48);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x181828,
      roughness: 0.2,
      metalness: 0.8
    });
    const stage = new THREE.Mesh(stageGeo, stageMat);
    stage.position.y = -0.11;
    stage.receiveShadow = true;
    this.turntableBase.add(stage);

    // Glowing Platform Edge Neon Ring
    const ringGeo = new THREE.TorusGeometry(1.64, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff3385 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.5;
    ring.position.y = -0.02;
    this.turntableBase.add(ring);

    // Inner Glowing Accent Ring
    const innerRingGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI * 0.5;
    innerRing.position.y = 0.005;
    this.turntableBase.add(innerRing);
  }

  setupDressingRoom() {
    const THREE = this.THREE;

    this.dressingRoomGroup = new THREE.Group();
    this.scene.add(this.dressingRoomGroup);

    // Floor Base Plane
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c16,
      roughness: 0.35,
      metalness: 0.5
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = -0.22;
    floor.receiveShadow = true;
    this.dressingRoomGroup.add(floor);

    // Back Luxury Boutique Wall Arch
    const wallGeo = new THREE.CylinderGeometry(6.5, 6.5, 6, 32, 1, true, Math.PI * 0.6, Math.PI * 0.8);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x141426,
      roughness: 0.6,
      side: THREE.BackSide
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 2.5, 0.5);
    this.dressingRoomGroup.add(wall);

    // Back Light Pillars (Luxury Neon Strips)
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      const angle = (i * 0.18) + Math.PI;
      const x = Math.sin(angle) * 5.8;
      const z = Math.cos(angle) * 5.8 + 0.5;

      const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 5.5, 12);
      const pillarMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xff3385 : 0x00f0ff });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, 2.5, z);
      this.dressingRoomGroup.add(pillar);
    }

    // Boutique Mirror Frame
    const frameGeo = new THREE.BoxGeometry(2.4, 4.0, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.15 });
    const mirrorFrame = new THREE.Mesh(frameGeo, frameMat);
    mirrorFrame.position.set(0, 2.2, -4.5);
    this.dressingRoomGroup.add(mirrorFrame);

    // Mirror Glass Surface
    const mirrorGeo = new THREE.PlaneGeometry(2.1, 3.7);
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: 0x334466,
      roughness: 0.05,
      metalness: 0.95
    });
    const mirrorGlass = new THREE.Mesh(mirrorGeo, mirrorMat);
    mirrorGlass.position.set(0, 2.2, -4.44);
    this.dressingRoomGroup.add(mirrorGlass);
  }

  setupSparkles() {
    const THREE = this.THREE;
    const particleCount = 120;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 4.5 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.08 + 0.02;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffb7d5,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geo, mat);
    this.scene.add(this.particleSystem);
  }

  setupEventListeners() {
    // Window Resize
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    // Mouse / Touch Drag to Rotate Turntable
    const onPointerDown = (e) => {
      // Don't drag if clicking UI overlays
      if (e.target.closest('#customizer-panel') || e.target.closest('#top-hud') || e.target.closest('#results-modal') || e.target.closest('.camera-actions')) {
        return;
      }
      this.isDragging = true;
      this.previousMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      this.turntableRotationVelocity = 0;
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - this.previousMouseX;
      this.previousMouseX = clientX;

      this.turntableRotationVelocity = deltaX * 0.007;
      this.turntableAngle += this.turntableRotationVelocity;
      if (this.turntableGroup) {
        this.turntableGroup.rotation.y = this.turntableAngle;
      }
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  rotateTurntableBy(angle) {
    this.turntableAngle += angle;
    if (this.turntableGroup) {
      this.turntableGroup.rotation.y = this.turntableAngle;
    }
  }

  resetTurntable() {
    this.turntableAngle = 0;
    if (this.turntableGroup) {
      this.turntableGroup.rotation.y = 0;
    }
  }

  /**
   * Updates animations and renders frame
   */
  update(delta, time) {
    // Friction for turntable spin
    if (!this.isDragging && Math.abs(this.turntableRotationVelocity) > 0.0001) {
      this.turntableRotationVelocity *= 0.92;
      this.turntableAngle += this.turntableRotationVelocity;
      if (this.turntableGroup) {
        this.turntableGroup.rotation.y = this.turntableAngle;
      }
    }

    // Sparkle gentle drift
    if (this.particleSystem) {
      const positions = this.particleSystem.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + positions[i]) * 0.002;
        if (positions[i] > 4.5) positions[i] = 0.2;
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // Smooth camera damping towards target
    this.camera.position.lerp(this.camTargetPos, 0.08);
    this.camera.lookAt(this.camLookTarget);

    this.renderer.render(this.scene, this.camera);
  }
}

window.FashionScene = FashionScene;

/**
 * runway.js - Runway Catwalk Stage, Camera Sequence & Pose Animations
 */

class RunwayManager {
  constructor(sceneInstance, characterInstance) {
    this.fashionScene = sceneInstance;
    this.character = characterInstance;
    this.THREE = window.THREE;

    this.runwayGroup = null;
    this.isRunning = false;
    this.startTime = 0;
    this.walkDuration = 7.0; // 7 seconds walk down the runway
    this.poseDuration = 3.0; // 3 seconds per pose
    this.onFinishCallback = null;

    this.flashOverlay = document.getElementById('flash-overlay');
    this.cinematicBars = document.getElementById('cinematic-bars');
    this.runwayHud = document.getElementById('runway-hud');
    this.poseTitle = document.getElementById('pose-title');

    this.buildRunwayStage();
  }

  buildRunwayStage() {
    const THREE = this.THREE;
    this.runwayGroup = new THREE.Group();
    this.runwayGroup.visible = false;
    this.fashionScene.scene.add(this.runwayGroup);

    // Catwalk Stage (Long rectangular platform extending forward from z: 0 to z: 6)
    const catwalkGeo = new THREE.BoxGeometry(2.4, 0.22, 7.5);
    const catwalkMat = new THREE.MeshStandardMaterial({
      color: 0x121220,
      roughness: 0.15,
      metalness: 0.85
    });
    const catwalk = new THREE.Mesh(catwalkGeo, catwalkMat);
    catwalk.position.set(0, -0.11, 2.8);
    catwalk.receiveShadow = true;
    this.runwayGroup.add(catwalk);

    // Catwalk Side Neon Glow Strips
    const neonMat = new THREE.MeshBasicMaterial({ color: 0xff3385 });
    const stripL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 7.5), neonMat);
    stripL.position.set(-1.2, 0.01, 2.8);
    const stripR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 7.5), neonMat);
    stripR.position.set(1.2, 0.01, 2.8);
    this.runwayGroup.add(stripL, stripR);

    // Runway Tip Rounded Balcony
    const tipGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.22, 32, 1, false, 0, Math.PI);
    const tip = new THREE.Mesh(tipGeo, catwalkMat);
    tip.position.set(0, -0.11, 6.55);
    tip.receiveShadow = true;
    this.runwayGroup.add(tip);

    // Audience Floor Dark silhouettes
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 12; i++) {
        const audGeo = new THREE.SphereGeometry(0.24, 8, 8);
        const audMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
        const aud = new THREE.Mesh(audGeo, audMat);
        aud.position.set(side * (2.2 + Math.random() * 1.5), -0.1 + Math.random() * 0.2, i * 0.6);
        this.runwayGroup.add(aud);
      }
    }
  }

  triggerFlash() {
    if (this.flashOverlay) {
      this.flashOverlay.classList.add('active');
      setTimeout(() => {
        this.flashOverlay.classList.remove('active');
      }, 70);
    }
    if (window.SoundFXInstance) {
      window.SoundFXInstance.playCameraFlash();
    }
  }

  startRunway(onFinish) {
    this.onFinishCallback = onFinish;
    this.isRunning = true;
    this.startTime = performance.now();

    // Show runway, hide boutique wall & dressing room turntable
    this.runwayGroup.visible = true;
    this.fashionScene.dressingRoomGroup.visible = false;
    if (this.fashionScene.turntableBase) {
      this.fashionScene.turntableBase.visible = false;
    }
    this.fashionScene.resetTurntable();

    // Reset character position to runway start
    this.character.root.position.set(0, 0, -0.5);
    this.character.root.rotation.set(0, 0, 0);
    this.character.resetPose();

    // Show HUD & letterbox bars
    this.cinematicBars.classList.remove('hidden');
    this.runwayHud.classList.remove('hidden');
    this.poseTitle.textContent = "Catwalk Strut...";

    // Audio beat
    if (window.SoundFXInstance) {
      window.SoundFXInstance.startRunwayBeat();
    }
  }

  stopRunway() {
    this.isRunning = false;
    this.runwayGroup.visible = false;
    this.fashionScene.dressingRoomGroup.visible = true;
    if (this.fashionScene.turntableBase) {
      this.fashionScene.turntableBase.visible = true;
    }

    this.cinematicBars.classList.add('hidden');
    this.runwayHud.classList.add('hidden');

    this.character.root.position.set(0, 0, 0);
    this.character.root.rotation.set(0, 0, 0);
    this.character.resetPose();

    this.fashionScene.camTargetPos.set(0, 1.35, 3.8);
    this.fashionScene.camLookTarget.set(0, 1.15, 0);

    if (window.SoundFXInstance) {
      window.SoundFXInstance.stopRunwayBeat();
    }
  }

  update(now) {
    if (!this.isRunning) return;

    const elapsed = (now - this.startTime) / 1000;

    if (elapsed < this.walkDuration) {
      // ----------------------------------------------------
      // PHASE 1: WALKING FORWARD DOWN THE CATWALK (0 - 7s)
      // ----------------------------------------------------
      const progress = elapsed / this.walkDuration;
      const currentZ = -0.5 + progress * 5.8; // moves from -0.5 to 5.3

      this.character.root.position.z = currentZ;
      this.character.animateWalk(elapsed);

      // Dynamic cinematic camera dolly tracking the model
      this.fashionScene.camTargetPos.set(
        Math.sin(elapsed * 0.4) * 1.4,
        1.1 + Math.sin(elapsed * 0.3) * 0.3,
        currentZ + 3.2
      );
      this.fashionScene.camLookTarget.set(0, 1.25, currentZ);

      // Random paparazzi flash during walk
      if (Math.random() < 0.04) {
        this.triggerFlash();
      }
    } else if (elapsed < this.walkDuration + this.poseDuration) {
      // ----------------------------------------------------
      // PHASE 2: POSE 1 - Sassy Hip & Vogue (7 - 10s)
      // ----------------------------------------------------
      if (this.poseTitle.textContent !== "Pose 1: Sassy Vogue") {
        this.poseTitle.textContent = "Pose 1: Sassy Vogue";
        this.character.applyPose('pose_hip');
        this.triggerFlash();
      }

      this.fashionScene.camTargetPos.set(1.2, 1.3, 8.2);
      this.fashionScene.camLookTarget.set(0, 1.2, 5.3);

      if (elapsed > this.walkDuration + 1.2 && elapsed < this.walkDuration + 1.35) {
        this.triggerFlash();
      }
    } else if (elapsed < this.walkDuration + this.poseDuration * 2) {
      // ----------------------------------------------------
      // PHASE 3: POSE 2 - High Fashion Frame (10 - 13s)
      // ----------------------------------------------------
      if (this.poseTitle.textContent !== "Pose 2: High Fashion Frame") {
        this.poseTitle.textContent = "Pose 2: High Fashion Frame";
        this.character.applyPose('pose_vogue');
        this.triggerFlash();
      }

      this.fashionScene.camTargetPos.set(-1.4, 1.4, 7.8);
      this.fashionScene.camLookTarget.set(0, 1.25, 5.3);

      if (elapsed > this.walkDuration + this.poseDuration + 1.5 && elapsed < this.walkDuration + this.poseDuration + 1.65) {
        this.triggerFlash();
      }
    } else if (elapsed < this.walkDuration + this.poseDuration * 3) {
      // ----------------------------------------------------
      // PHASE 4: POSE 3 - Model Wink & Peace (13 - 16s)
      // ----------------------------------------------------
      if (this.poseTitle.textContent !== "Pose 3: Glamour Wink!") {
        this.poseTitle.textContent = "Pose 3: Glamour Wink!";
        this.character.applyPose('pose_wink');
        this.triggerFlash();
      }

      // Close-up camera shot
      this.fashionScene.camTargetPos.set(0, 1.45, 6.8);
      this.fashionScene.camLookTarget.set(0, 1.35, 5.3);

      if (elapsed > this.walkDuration + this.poseDuration * 2 + 1.2 && elapsed < this.walkDuration + this.poseDuration * 2 + 1.35) {
        this.triggerFlash();
      }
    } else {
      // ----------------------------------------------------
      // RUNWAY COMPLETED -> SHOW RESULTS & SCORING MODAL
      // ----------------------------------------------------
      this.stopRunway();
      if (this.onFinishCallback) {
        this.onFinishCallback();
      }
    }
  }
}

window.RunwayManager = RunwayManager;

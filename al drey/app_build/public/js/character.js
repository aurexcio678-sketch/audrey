/**
 * character.js - Stylized Chibi Mannequin 3D & Modular Wardrobe Manager
 */

class FashionCharacter {
  constructor(THREE) {
    this.THREE = THREE;
    this.root = new this.THREE.Group();

    // Wardrobe slots
    this.slots = {
      hair: null,
      top: null,
      bottom: null,
      shoes: null,
      accessory: null
    };

    // Current item data and colors
    this.equippedItems = {
      hair: null,
      top: null,
      bottom: null,
      shoes: null,
      accessory: null
    };

    this.equippedColors = {
      hair: '#ff4081',
      top: '#ff3385',
      bottom: '#ffffff',
      shoes: '#ffffff',
      accessory: '#ffd700'
    };

    // Body parts hierarchy for animation
    this.parts = {};

    this.buildBaseMannequin();
  }

  buildBaseMannequin() {
    const THREE = this.THREE;

    // Stylized Anime/Chibi Skin Material
    const skinMat = new THREE.MeshToonMaterial({
      color: 0xffdfd0,
      bumpScale: 0.02
    });

    // Eye & Face Details Material
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xff8fa3, transparent: true, opacity: 0.65 });
    const lipMat = new THREE.MeshBasicMaterial({ color: 0xff6b81 });

    // --- Hips & Pelvis (Root anchor) ---
    const pelvis = new THREE.Group();
    pelvis.position.y = 1.05;
    this.root.add(pelvis);
    this.parts.pelvis = pelvis;

    const pelvisMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.24, 16), skinMat);
    pelvisMesh.position.y = -0.05;
    pelvis.add(pelvisMesh);

    // --- Torso & Chest ---
    const torso = new THREE.Group();
    torso.position.y = 0.12;
    pelvis.add(torso);
    this.parts.torso = torso;

    const chestMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.38, 16), skinMat);
    chestMesh.position.y = 0.18;
    torso.add(chestMesh);

    // --- Neck & Head ---
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.14, 12), skinMat);
    neck.position.y = 0.42;
    torso.add(neck);

    const headGroup = new THREE.Group();
    headGroup.position.y = 0.72;
    torso.add(headGroup);
    this.parts.head = headGroup;

    // Stylized chibi head sphere
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.48, 24, 24), skinMat);
    headGroup.add(headMesh);

    // Cute Anime Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), eyeMat);
    leftEye.scale.set(0.6, 1.2, 0.4);
    leftEye.position.set(-0.16, 0.02, 0.44);
    leftEye.rotation.y = -0.15;

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), eyeMat);
    rightEye.scale.set(0.6, 1.2, 0.4);
    rightEye.position.set(0.16, 0.02, 0.44);
    rightEye.rotation.y = 0.15;
    headGroup.add(leftEye, rightEye);

    // Eye highlights (sparkle)
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const spL = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), sparkleMat);
    spL.position.set(-0.15, 0.05, 0.46);
    const spR = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), sparkleMat);
    spR.position.set(0.17, 0.05, 0.46);
    headGroup.add(spL, spR);

    // Soft Blush
    const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.055, 12), blushMat);
    blushL.position.set(-0.24, -0.08, 0.42);
    blushL.rotation.y = -0.3;
    const blushR = new THREE.Mesh(new THREE.CircleGeometry(0.055, 12), blushMat);
    blushR.position.set(0.24, -0.08, 0.42);
    blushR.rotation.y = 0.3;
    headGroup.add(blushL, blushR);

    // Cute Smile / Lips
    const lips = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.012, 6, 12, Math.PI * 0.8), lipMat);
    lips.rotation.x = Math.PI * 0.55;
    lips.position.set(0, -0.16, 0.45);
    headGroup.add(lips);

    // --- Arms Hierarchy (Shoulders -> Upper Arm -> Forearm -> Hand) ---
    const armGeo = new THREE.CylinderGeometry(0.06, 0.055, 0.32, 12);
    const forearmGeo = new THREE.CylinderGeometry(0.055, 0.05, 0.3, 12);
    const handGeo = new THREE.SphereGeometry(0.06, 12, 12);

    // Left Arm
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.35, 0.32, 0);
    torso.add(leftShoulder);
    this.parts.leftShoulder = leftShoulder;

    const leftUpperArm = new THREE.Mesh(armGeo, skinMat);
    leftUpperArm.position.y = -0.16;
    leftShoulder.add(leftUpperArm);

    const leftForearm = new THREE.Group();
    leftForearm.position.y = -0.32;
    leftShoulder.add(leftForearm);
    this.parts.leftForearm = leftForearm;

    const leftForearmMesh = new THREE.Mesh(forearmGeo, skinMat);
    leftForearmMesh.position.y = -0.14;
    leftForearm.add(leftForearmMesh);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.y = -0.3;
    leftForearm.add(leftHand);

    // Right Arm
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.35, 0.32, 0);
    torso.add(rightShoulder);
    this.parts.rightShoulder = rightShoulder;

    const rightUpperArm = new THREE.Mesh(armGeo, skinMat);
    rightUpperArm.position.y = -0.16;
    rightShoulder.add(rightUpperArm);

    const rightForearm = new THREE.Group();
    rightForearm.position.y = -0.32;
    rightShoulder.add(rightForearm);
    this.parts.rightForearm = rightForearm;

    const rightForearmMesh = new THREE.Mesh(forearmGeo, skinMat);
    rightForearmMesh.position.y = -0.14;
    rightForearm.add(rightForearmMesh);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.y = -0.3;
    rightForearm.add(rightHand);

    // --- Legs Hierarchy (Hips -> Thigh -> Calf -> Foot) ---
    const legGeo = new THREE.CylinderGeometry(0.09, 0.075, 0.44, 12);
    const calfGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.44, 12);
    const footGeo = new THREE.BoxGeometry(0.12, 0.07, 0.22);

    // Left Leg
    const leftHip = new THREE.Group();
    leftHip.position.set(-0.16, -0.12, 0);
    pelvis.add(leftHip);
    this.parts.leftHip = leftHip;

    const leftThigh = new THREE.Mesh(legGeo, skinMat);
    leftThigh.position.y = -0.22;
    leftHip.add(leftThigh);

    const leftCalfGroup = new THREE.Group();
    leftCalfGroup.position.y = -0.44;
    leftHip.add(leftCalfGroup);
    this.parts.leftCalf = leftCalfGroup;

    const leftCalfMesh = new THREE.Mesh(calfGeo, skinMat);
    leftCalfMesh.position.y = -0.2;
    leftCalfGroup.add(leftCalfMesh);

    const leftFoot = new THREE.Mesh(footGeo, skinMat);
    leftFoot.position.set(0, -0.42, 0.04);
    leftCalfGroup.add(leftFoot);

    // Right Leg
    const rightHip = new THREE.Group();
    rightHip.position.set(0.16, -0.12, 0);
    pelvis.add(rightHip);
    this.parts.rightHip = rightHip;

    const rightThigh = new THREE.Mesh(legGeo, skinMat);
    rightThigh.position.y = -0.22;
    rightHip.add(rightThigh);

    const rightCalfGroup = new THREE.Group();
    rightCalfGroup.position.y = -0.44;
    rightHip.add(rightCalfGroup);
    this.parts.rightCalf = rightCalfGroup;

    const rightCalfMesh = new THREE.Mesh(calfGeo, skinMat);
    rightCalfMesh.position.y = -0.2;
    rightCalfGroup.add(rightCalfMesh);

    const rightFoot = new THREE.Mesh(footGeo, skinMat);
    rightFoot.position.set(0, -0.42, 0.04);
    rightCalfGroup.add(rightFoot);

    // Anchor points for clothing slots
    this.slotAnchors = {
      hair: this.parts.head,
      accessory: this.parts.head,
      top: this.root,     // Aligned to world character coordinates
      bottom: this.root,
      shoes: this.root
    };
  }

  /**
   * Equips an item into the designated slot.
   */
  equipItem(item, colorHex = null) {
    const slot = item.category;
    const color = colorHex || this.equippedColors[slot] || item.defaultColor;

    // Remove previous mesh
    if (this.slots[slot]) {
      const anchor = this.slotAnchors[slot];
      anchor.remove(this.slots[slot]);
      this.slots[slot] = null;
    }

    // Build new mesh
    const mesh = item.createMesh(this.THREE, color);
    this.slots[slot] = mesh;
    this.equippedItems[slot] = item;
    this.equippedColors[slot] = color;

    // Add to appropriate anchor
    const anchor = this.slotAnchors[slot];
    anchor.add(mesh);
  }

  /**
   * Updates color of currently equipped item in a slot.
   */
  setSlotColor(slot, colorHex) {
    this.equippedColors[slot] = colorHex;
    const item = this.equippedItems[slot];
    if (item) {
      this.equipItem(item, colorHex);
    }
  }

  /**
   * Resets all joint rotations to neutral standing pose.
   */
  resetPose() {
    this.parts.pelvis.position.set(0, 1.05, 0);
    this.parts.pelvis.rotation.set(0, 0, 0);
    this.parts.torso.rotation.set(0, 0, 0);
    this.parts.head.rotation.set(0, 0, 0);

    this.parts.leftShoulder.rotation.set(0, 0, 0.12);
    this.parts.leftForearm.rotation.set(0, 0, -0.08);

    this.parts.rightShoulder.rotation.set(0, 0, -0.12);
    this.parts.rightForearm.rotation.set(0, 0, 0.08);

    this.parts.leftHip.rotation.set(0, 0, 0);
    this.parts.leftCalf.rotation.set(0, 0, 0);

    this.parts.rightHip.rotation.set(0, 0, 0);
    this.parts.rightCalf.rotation.set(0, 0, 0);
  }

  /**
   * Procedural catwalk walk cycle step.
   * @param {number} time - Elapsed time in seconds.
   */
  animateWalk(time) {
    const speed = 7.0;
    const t = time * speed;

    // Pelvis subtle vertical bounce & hip sway
    this.parts.pelvis.position.y = 1.05 + Math.abs(Math.sin(t)) * 0.05;
    this.parts.pelvis.rotation.y = Math.sin(t) * 0.18;
    this.parts.pelvis.rotation.z = Math.sin(t) * 0.06;

    // Torso counter-twist
    this.parts.torso.rotation.y = -Math.sin(t) * 0.12;

    // Leg swings (opposite phases)
    this.parts.leftHip.rotation.x = Math.sin(t) * 0.45;
    this.parts.rightHip.rotation.x = -Math.sin(t) * 0.45;

    // Knee bend during back swing
    this.parts.leftCalf.rotation.x = Math.max(0, -Math.sin(t) * 0.55);
    this.parts.rightCalf.rotation.x = Math.max(0, Math.sin(t) * 0.55);

    // Arm natural swings (counter to legs)
    this.parts.leftShoulder.rotation.x = -Math.sin(t) * 0.35;
    this.parts.rightShoulder.rotation.x = Math.sin(t) * 0.35;
    this.parts.leftShoulder.rotation.z = 0.18;
    this.parts.rightShoulder.rotation.z = -0.18;
  }

  /**
   * Applies one of 3 fashion poses at the end of the catwalk.
   * @param {string} poseName - 'pose_hip', 'pose_vogue', 'pose_wink'
   */
  applyPose(poseName) {
    this.resetPose();

    if (poseName === 'pose_hip') {
      // Pose 1: Hand on hip, slight body turn
      this.parts.pelvis.rotation.y = 0.25;
      this.parts.torso.rotation.y = -0.1;
      this.parts.head.rotation.y = -0.15;
      this.parts.head.rotation.z = 0.1;

      // Left hand on hip
      this.parts.leftShoulder.rotation.set(0.1, 0, 0.45);
      this.parts.leftForearm.rotation.set(-1.1, 0, -0.6);

      // Right arm elegant drop
      this.parts.rightShoulder.rotation.set(-0.1, 0, -0.2);

      // Sassy leg weight shift
      this.parts.leftHip.rotation.z = 0.12;
      this.parts.rightHip.rotation.z = 0.15;
      this.parts.rightCalf.rotation.x = 0.2;
    } else if (poseName === 'pose_vogue') {
      // Pose 2: High fashion double arm frame / vogue
      this.parts.head.rotation.x = -0.1;
      this.parts.head.rotation.z = -0.12;

      // Left arm high framing
      this.parts.leftShoulder.rotation.set(0.4, 0, 1.3);
      this.parts.leftForearm.rotation.set(0, 0, -1.2);

      // Right hand touching chin
      this.parts.rightShoulder.rotation.set(0.6, -0.2, -0.5);
      this.parts.rightForearm.rotation.set(-1.3, 0, 0.8);

      // Crossed legs
      this.parts.leftHip.rotation.set(0.1, 0, -0.1);
      this.parts.rightHip.rotation.set(-0.1, 0, 0.1);
    } else if (poseName === 'pose_wink') {
      // Pose 3: Playful model wink / peace & chest pop
      this.parts.torso.rotation.x = -0.1;
      this.parts.head.rotation.z = 0.15;

      // Left arm salute/peace
      this.parts.leftShoulder.rotation.set(0.5, 0, 0.9);
      this.parts.leftForearm.rotation.set(-1.4, 0, -0.5);

      // Right hand on hip
      this.parts.rightShoulder.rotation.set(0.1, 0, -0.45);
      this.parts.rightForearm.rotation.set(-1.0, 0, 0.5);

      this.parts.leftHip.rotation.set(0.2, 0, 0.1);
    }
  }
}

window.FashionCharacter = FashionCharacter;

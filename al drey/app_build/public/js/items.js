/**
 * items.js - Catalog & Procedural 3D Mesh Generator for Glamour Runway 3D
 * All meshes are generated procedurally with Three.js geometries.
 */

window.ItemCatalog = {
  // ==========================================
  // 1. HAIR (Rambut)
  // ==========================================
  hair: [
    {
      id: 'hair_bob',
      name: 'Chic Bob Cut',
      icon: '💇‍♀️',
      category: 'hair',
      tags: ['casual', 'y2k', 'modern'],
      defaultColor: '#ff4081',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({
          color: colorHex,
          bumpScale: 0.05
        });

        // Top skull cap
        const skullGeo = new THREE.SphereGeometry(0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.58);
        const skull = new THREE.Mesh(skullGeo, mat);
        skull.position.y = 0.05;
        group.add(skull);

        // Side bob locks
        const sideGeo = new THREE.CylinderGeometry(0.53, 0.48, 0.45, 20, 1, true);
        const sides = new THREE.Mesh(sideGeo, mat);
        sides.position.y = -0.12;
        group.add(sides);

        // Front fringe/bangs
        const bangGeo = new THREE.BoxGeometry(0.46, 0.18, 0.15);
        const bangs = new THREE.Mesh(bangGeo, mat);
        bangs.position.set(0, 0.12, 0.45);
        bangs.rotation.x = 0.2;
        group.add(bangs);

        return group;
      }
    },
    {
      id: 'hair_twintails',
      name: 'Anime Twin Tails',
      icon: '👧',
      category: 'hair',
      tags: ['y2k', 'cyber', 'cute'],
      defaultColor: '#00e5ff',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        // Base hair cap
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.51, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), mat);
        cap.position.y = 0.06;
        group.add(cap);

        // Left ponytail
        const tailGeo = new THREE.ConeGeometry(0.18, 0.9, 16);
        tailGeo.rotateZ(Math.PI);
        const leftTail = new THREE.Mesh(tailGeo, mat);
        leftTail.position.set(-0.52, 0.05, -0.1);
        leftTail.rotation.z = -0.35;
        leftTail.rotation.x = -0.15;
        group.add(leftTail);

        // Right ponytail
        const rightTail = new THREE.Mesh(tailGeo, mat);
        rightTail.position.set(0.52, 0.05, -0.1);
        rightTail.rotation.z = 0.35;
        rightTail.rotation.x = -0.15;
        group.add(rightTail);

        // Hair ties (metallic ring)
        const tieMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 });
        const tieGeo = new THREE.TorusGeometry(0.12, 0.03, 8, 16);
        const leftTie = new THREE.Mesh(tieGeo, tieMat);
        leftTie.position.set(-0.5, 0.22, -0.08);
        const rightTie = new THREE.Mesh(tieGeo, tieMat);
        rightTie.position.set(0.5, 0.22, -0.08);
        group.add(leftTie, rightTie);

        return group;
      }
    },
    {
      id: 'hair_wavy_glam',
      name: 'Long Wavy Glam',
      icon: '✨',
      category: 'hair',
      tags: ['royal', 'elegant', 'cottage'],
      defaultColor: '#ffd700',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6), mat);
        cap.position.y = 0.05;
        group.add(cap);

        // Cascading back wave
        const backGeo = new THREE.CylinderGeometry(0.5, 0.65, 1.1, 16);
        const backHair = new THREE.Mesh(backGeo, mat);
        backHair.position.set(0, -0.4, -0.18);
        group.add(backHair);

        // Front locks
        const lockGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.8, 12);
        const lockLeft = new THREE.Mesh(lockGeo, mat);
        lockLeft.position.set(-0.38, -0.3, 0.28);
        lockLeft.rotation.z = -0.15;

        const lockRight = new THREE.Mesh(lockGeo, mat);
        lockRight.position.set(0.38, -0.3, 0.28);
        lockRight.rotation.z = 0.15;

        group.add(lockLeft, lockRight);
        return group;
      }
    },
    {
      id: 'hair_high_pony',
      name: 'High Sleek Ponytail',
      icon: '🎀',
      category: 'hair',
      tags: ['cyber', 'gothic', 'glamour'],
      defaultColor: '#1a1a24',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.51, 24, 24), mat);
        cap.position.y = 0.05;
        group.add(cap);

        // High Ponytail stem
        const ponyGeo = new THREE.ConeGeometry(0.16, 0.95, 16);
        ponyGeo.rotateX(0.4);
        const pony = new THREE.Mesh(ponyGeo, mat);
        pony.position.set(0, 0.35, -0.45);
        group.add(pony);

        // Gold Ring Tie
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 12, 24), ringMat);
        ring.position.set(0, 0.35, -0.35);
        ring.rotation.x = Math.PI * 0.35;
        group.add(ring);

        return group;
      }
    }
  ],

  // ==========================================
  // 2. TOPS (Atasan & Gaun)
  // ==========================================
  top: [
    {
      id: 'top_crop',
      name: 'Modern Crop Top',
      icon: '👚',
      category: 'top',
      tags: ['y2k', 'summer', 'casual'],
      defaultColor: '#ff3385',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        // Bustier torso wrap
        const cropGeo = new THREE.CylinderGeometry(0.36, 0.32, 0.42, 24);
        const crop = new THREE.Mesh(cropGeo, mat);
        crop.position.set(0, 1.28, 0);
        group.add(crop);

        // Shoulder straps
        const strapGeo = new THREE.BoxGeometry(0.06, 0.28, 0.03);
        const leftStrap = new THREE.Mesh(strapGeo, mat);
        leftStrap.position.set(-0.2, 1.5, 0.02);
        const rightStrap = new THREE.Mesh(strapGeo, mat);
        rightStrap.position.set(0.2, 1.5, 0.02);
        group.add(leftStrap, rightStrap);

        return group;
      }
    },
    {
      id: 'top_ballgown_corset',
      name: 'Royal Corset & Puff',
      icon: '👗',
      category: 'top',
      tags: ['royal', 'elegant', 'glamour'],
      defaultColor: '#ffd700',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.4, metalness: 0.3 });

        // Fitted Corset
        const corsetGeo = new THREE.CylinderGeometry(0.36, 0.3, 0.52, 24);
        const corset = new THREE.Mesh(corsetGeo, mat);
        corset.position.set(0, 1.24, 0);
        group.add(corset);

        // Puffed Off-Shoulder Sleeves
        const puffGeo = new THREE.SphereGeometry(0.18, 16, 16);
        const puffL = new THREE.Mesh(puffGeo, mat);
        puffL.position.set(-0.45, 1.4, 0);
        const puffR = new THREE.Mesh(puffGeo, mat);
        puffR.position.set(0.45, 1.4, 0);
        group.add(puffL, puffR);

        // Gold chest jewel
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.08), new THREE.MeshStandardMaterial({ color: 0xff0055, metalness: 0.8, roughness: 0.1 }));
        gem.position.set(0, 1.42, 0.34);
        group.add(gem);

        return group;
      }
    },
    {
      id: 'top_hoodie',
      name: 'Oversized Street Hoodie',
      icon: '🧥',
      category: 'top',
      tags: ['casual', 'y2k', 'cyber'],
      defaultColor: '#9c27b0',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        // Chunky body
        const bodyGeo = new THREE.CylinderGeometry(0.42, 0.38, 0.62, 24);
        const body = new THREE.Mesh(bodyGeo, mat);
        body.position.set(0, 1.22, 0);
        group.add(body);

        // Hood fold on shoulders
        const hoodGeo = new THREE.TorusGeometry(0.32, 0.1, 12, 24);
        const hood = new THREE.Mesh(hoodGeo, mat);
        hood.rotation.x = Math.PI * 0.45;
        hood.position.set(0, 1.48, -0.06);
        group.add(hood);

        // Pouch pocket
        const pocketGeo = new THREE.BoxGeometry(0.34, 0.18, 0.08);
        const pocket = new THREE.Mesh(pocketGeo, mat);
        pocket.position.set(0, 1.08, 0.35);
        group.add(pocket);

        return group;
      }
    },
    {
      id: 'top_halter_vest',
      name: 'Tailored Halter Vest',
      icon: '🦺',
      category: 'top',
      tags: ['gothic', 'cottage', 'elegant'],
      defaultColor: '#1a1a24',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.6 });

        const vestGeo = new THREE.CylinderGeometry(0.36, 0.33, 0.5, 24);
        const vest = new THREE.Mesh(vestGeo, mat);
        vest.position.set(0, 1.25, 0);
        group.add(vest);

        // Collar v-neck trim
        const collarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
        const collarGeo = new THREE.BoxGeometry(0.12, 0.28, 0.04);
        const colL = new THREE.Mesh(collarGeo, collarMat);
        colL.position.set(-0.16, 1.44, 0.32);
        colL.rotation.z = -0.3;
        const colR = new THREE.Mesh(collarGeo, collarMat);
        colR.position.set(0.16, 1.44, 0.32);
        colR.rotation.z = 0.3;
        group.add(colL, colR);

        return group;
      }
    },
    {
      id: 'top_cyber_jacket',
      name: 'Cyberpunk Tech Jacket',
      icon: '⚡',
      category: 'top',
      tags: ['cyber', 'gothic', 'futuristic'],
      defaultColor: '#00e5ff',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.7, roughness: 0.25 });

        // Angular armored jacket
        const jacketGeo = new THREE.CylinderGeometry(0.44, 0.36, 0.56, 16);
        const jacket = new THREE.Mesh(jacketGeo, mat);
        jacket.position.set(0, 1.24, 0);
        group.add(jacket);

        // Cyber shoulder plates
        const plateMat = new THREE.MeshStandardMaterial({ color: 0x111122, metalness: 0.9, roughness: 0.1 });
        const plateGeo = new THREE.BoxGeometry(0.25, 0.12, 0.28);
        const pL = new THREE.Mesh(plateGeo, plateMat);
        pL.position.set(-0.48, 1.45, 0);
        pL.rotation.z = -0.25;

        const pR = new THREE.Mesh(plateGeo, plateMat);
        pR.position.set(0.48, 1.45, 0);
        pR.rotation.z = 0.25;
        group.add(pL, pR);

        return group;
      }
    }
  ],

  // ==========================================
  // 3. BOTTOMS (Bawahan & Rok)
  // ==========================================
  bottom: [
    {
      id: 'bot_tennis_skirt',
      name: 'Pleated Tennis Skirt',
      icon: '🩳',
      category: 'bottom',
      tags: ['y2k', 'summer', 'casual'],
      defaultColor: '#ffffff',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex, side: THREE.DoubleSide });

        // Flared pleated skirt
        const skirtGeo = new THREE.ConeGeometry(0.55, 0.36, 24, 1, true);
        const skirt = new THREE.Mesh(skirtGeo, mat);
        skirt.position.set(0, 0.85, 0);
        group.add(skirt);

        // Waistband
        const beltMat = new THREE.MeshToonMaterial({ color: 0xff4081 });
        const beltGeo = new THREE.CylinderGeometry(0.33, 0.33, 0.08, 24);
        const belt = new THREE.Mesh(beltGeo, beltMat);
        belt.position.set(0, 1.02, 0);
        group.add(belt);

        return group;
      }
    },
    {
      id: 'bot_mermaid_skirt',
      name: 'Mermaid Ballgown Skirt',
      icon: '👗',
      category: 'bottom',
      tags: ['royal', 'elegant', 'glamour'],
      defaultColor: '#ffd700',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.35, metalness: 0.3 });

        // Long flowing gown skirt
        const gownGeo = new THREE.CylinderGeometry(0.32, 0.85, 1.05, 32);
        const gown = new THREE.Mesh(gownGeo, mat);
        gown.position.set(0, 0.52, 0);
        group.add(gown);

        // Hem ruffle
        const ruffleGeo = new THREE.TorusGeometry(0.85, 0.08, 12, 32);
        const ruffle = new THREE.Mesh(ruffleGeo, mat);
        ruffle.rotation.x = Math.PI * 0.5;
        ruffle.position.set(0, 0.02, 0);
        group.add(ruffle);

        return group;
      }
    },
    {
      id: 'bot_high_shorts',
      name: 'High-Waist Shorts',
      icon: '👖',
      category: 'bottom',
      tags: ['casual', 'summer', 'y2k'],
      defaultColor: '#00e5ff',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        // Pelvis base
        const hipGeo = new THREE.CylinderGeometry(0.34, 0.36, 0.28, 24);
        const hip = new THREE.Mesh(hipGeo, mat);
        hip.position.set(0, 0.92, 0);
        group.add(hip);

        // Left & right leg cuffs
        const cuffGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 16);
        const cuffL = new THREE.Mesh(cuffGeo, mat);
        cuffL.position.set(-0.16, 0.74, 0);
        const cuffR = new THREE.Mesh(cuffGeo, mat);
        cuffR.position.set(0.16, 0.74, 0);
        group.add(cuffL, cuffR);

        return group;
      }
    },
    {
      id: 'bot_flare_jeans',
      name: 'Bell-Bottom Flare Pants',
      icon: '👖',
      category: 'bottom',
      tags: ['y2k', 'cottage', 'casual'],
      defaultColor: '#3d5afe',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        // Waist
        const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.35, 0.26, 24), mat);
        waist.position.set(0, 0.94, 0);
        group.add(waist);

        // Flaring legs
        const legGeo = new THREE.CylinderGeometry(0.16, 0.32, 0.9, 16);
        const legL = new THREE.Mesh(legGeo, mat);
        legL.position.set(-0.17, 0.45, 0);
        const legR = new THREE.Mesh(legGeo, mat);
        legR.position.set(0.17, 0.45, 0);
        group.add(legL, legR);

        return group;
      }
    },
    {
      id: 'bot_cyber_skirt',
      name: 'Cyber Armor Skirt',
      icon: '🛡️',
      category: 'bottom',
      tags: ['cyber', 'gothic', 'futuristic'],
      defaultColor: '#1a1a24',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.85, roughness: 0.2 });

        // Angular armored plates
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const plateGeo = new THREE.BoxGeometry(0.24, 0.38, 0.04);
          const plate = new THREE.Mesh(plateGeo, mat);
          plate.position.set(Math.sin(angle) * 0.35, 0.86, Math.cos(angle) * 0.35);
          plate.rotation.y = angle;
          plate.rotation.x = 0.15;
          group.add(plate);
        }

        // Glowing waist ring
        const glowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.025, 12, 24), glowMat);
        ring.rotation.x = Math.PI * 0.5;
        ring.position.set(0, 1.02, 0);
        group.add(ring);

        return group;
      }
    }
  ],

  // ==========================================
  // 4. SHOES (Sepatu)
  // ==========================================
  shoes: [
    {
      id: 'shoes_sneakers',
      name: 'Platform Chunky Sneakers',
      icon: '👟',
      category: 'shoes',
      tags: ['casual', 'y2k', 'summer'],
      defaultColor: '#ffffff',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const upperMat = new THREE.MeshToonMaterial({ color: colorHex });
        const soleMat = new THREE.MeshToonMaterial({ color: 0x111111 });

        const makeShoe = (x) => {
          const shoeGroup = new THREE.Group();
          // Chunky sole
          const sole = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.38), soleMat);
          sole.position.set(x, 0.05, 0.05);
          // Upper sneaker
          const upper = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.34), upperMat);
          upper.position.set(x, 0.15, 0.04);
          shoeGroup.add(sole, upper);
          return shoeGroup;
        };

        group.add(makeShoe(-0.2));
        group.add(makeShoe(0.2));
        return group;
      }
    },
    {
      id: 'shoes_high_heels',
      name: 'High Heel Stilettos',
      icon: '👠',
      category: 'shoes',
      tags: ['royal', 'elegant', 'glamour'],
      defaultColor: '#ff3385',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.25, metalness: 0.4 });

        const makeHeel = (x) => {
          const heelGroup = new THREE.Group();
          // Toe point
          const toe = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.26, 16), mat);
          toe.rotation.x = Math.PI * 0.4;
          toe.position.set(x, 0.08, 0.12);
          // Stiletto needle
          const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.2, 12), mat);
          needle.position.set(x, 0.1, -0.08);
          heelGroup.add(toe, needle);
          return heelGroup;
        };

        group.add(makeHeel(-0.2));
        group.add(makeHeel(0.2));
        return group;
      }
    },
    {
      id: 'shoes_boots',
      name: 'Combat Knee Boots',
      icon: '👢',
      category: 'shoes',
      tags: ['gothic', 'cyber', 'street'],
      defaultColor: '#1a1a24',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });

        const makeBoot = (x) => {
          const bootGroup = new THREE.Group();
          // Boot shaft
          const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.45, 16), mat);
          shaft.position.set(x, 0.25, 0);
          // Foot base
          const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.34), mat);
          foot.position.set(x, 0.06, 0.06);
          bootGroup.add(shaft, foot);
          return bootGroup;
        };

        group.add(makeBoot(-0.2));
        group.add(makeBoot(0.2));
        return group;
      }
    },
    {
      id: 'shoes_sandals',
      name: 'Strappy Ankle Sandals',
      icon: '👡',
      category: 'shoes',
      tags: ['summer', 'cottage', 'casual'],
      defaultColor: '#ffd700',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.6, roughness: 0.3 });

        const makeSandal = (x) => {
          const g = new THREE.Group();
          const sole = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.32), mat);
          sole.position.set(x, 0.02, 0.04);
          const strap = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 8, 16), mat);
          strap.rotation.x = Math.PI * 0.5;
          strap.position.set(x, 0.12, 0);
          g.add(sole, strap);
          return g;
        };

        group.add(makeSandal(-0.2));
        group.add(makeSandal(0.2));
        return group;
      }
    }
  ],

  // ==========================================
  // 5. ACCESSORIES (Aksesoris Kepala)
  // ==========================================
  accessory: [
    {
      id: 'acc_tiara',
      name: 'Royal Crown Tiara',
      icon: '👑',
      category: 'accessory',
      tags: ['royal', 'glamour', 'elegant'],
      defaultColor: '#ffd700',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const goldMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.95, roughness: 0.15 });

        // Arc band
        const arcGeo = new THREE.TorusGeometry(0.48, 0.035, 12, 24, Math.PI * 0.7);
        const arc = new THREE.Mesh(arcGeo, goldMat);
        arc.rotation.x = Math.PI * 0.65;
        arc.position.set(0, 0.36, 0.05);
        group.add(arc);

        // Center jewel crown spikes
        for (let i = -2; i <= 2; i++) {
          const h = 0.22 - Math.abs(i) * 0.04;
          const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, h, 8), goldMat);
          spike.position.set(i * 0.12, 0.52 - Math.abs(i) * 0.03, 0.35);
          group.add(spike);
        }

        // Diamond gem
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
        gem.position.set(0, 0.48, 0.4);
        group.add(gem);

        return group;
      }
    },
    {
      id: 'acc_cat_ears',
      name: 'Neko Cat Ears Headband',
      icon: '🐱',
      category: 'accessory',
      tags: ['cute', 'y2k', 'cyber'],
      defaultColor: '#ff4081',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const earMat = new THREE.MeshToonMaterial({ color: colorHex });
        const innerMat = new THREE.MeshToonMaterial({ color: 0xffffff });

        // Headband arc
        const band = new THREE.Mesh(
          new THREE.TorusGeometry(0.5, 0.03, 8, 24, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 })
        );
        band.rotation.x = Math.PI * 0.5;
        band.position.set(0, 0.32, 0);
        group.add(band);

        // Left Ear
        const leftEar = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.32, 4), earMat);
        leftEar.position.set(-0.35, 0.6, 0.05);
        leftEar.rotation.z = -0.3;
        leftEar.rotation.y = Math.PI * 0.25;

        // Right Ear
        const rightEar = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.32, 4), earMat);
        rightEar.position.set(0.35, 0.6, 0.05);
        rightEar.rotation.z = 0.3;
        rightEar.rotation.y = Math.PI * 0.25;

        group.add(leftEar, rightEar);
        return group;
      }
    },
    {
      id: 'acc_beret',
      name: 'Parisian Chic Beret',
      icon: '👒',
      category: 'accessory',
      tags: ['cottage', 'elegant', 'casual'],
      defaultColor: '#ff3d00',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshToonMaterial({ color: colorHex });

        // Angled disk
        const beretGeo = new THREE.CylinderGeometry(0.56, 0.46, 0.16, 24);
        const beret = new THREE.Mesh(beretGeo, mat);
        beret.position.set(0.1, 0.52, 0);
        beret.rotation.z = -0.25;
        beret.rotation.x = 0.1;
        group.add(beret);

        // Little stem tip
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 8), mat);
        stem.position.set(0.1, 0.62, 0);
        stem.rotation.z = -0.25;
        group.add(stem);

        return group;
      }
    },
    {
      id: 'acc_cyber_visor',
      name: 'Cyberpunk Neon Visor',
      icon: '🥽',
      category: 'accessory',
      tags: ['cyber', 'futuristic', 'y2k'],
      defaultColor: '#00e5ff',
      createMesh: (THREE, colorHex) => {
        const group = new THREE.Group();
        const visorMat = new THREE.MeshStandardMaterial({
          color: colorHex,
          transparent: true,
          opacity: 0.85,
          roughness: 0.1,
          metalness: 0.9
        });

        // Curved eye shield
        const visorGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.14, 24, 1, true, -Math.PI * 0.35, Math.PI * 0.7);
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(0, 0.08, 0.05);
        group.add(visor);

        // Frame temples
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
        const templeL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.45), frameMat);
        templeL.position.set(-0.52, 0.08, -0.15);
        const templeR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.45), frameMat);
        templeR.position.set(0.52, 0.08, -0.15);
        group.add(templeL, templeR);

        return group;
      }
    }
  ]
};

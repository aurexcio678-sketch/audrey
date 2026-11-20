/**
 * main.js - Application Entry Point & UI Event Binding for Glamour Runway 3D
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Core 3D Scene & Character
  const fashionScene = new window.FashionScene('canvas-container');
  const character = new window.FashionCharacter(window.THREE);
  fashionScene.turntableGroup.add(character.root);

  // 2. Initialize Runway Manager & Game Manager
  const runwayManager = new window.RunwayManager(fashionScene, character);
  const gameManager = new window.GameManager(character);

  // 3. State Variables
  let currentCategory = 'hair';
  let isPanelCollapsed = false;

  // 4. Equip Default Starter Outfit
  character.equipItem(window.ItemCatalog.hair[0], '#ff4081');
  character.equipItem(window.ItemCatalog.top[0], '#ff3385');
  character.equipItem(window.ItemCatalog.bottom[0], '#ffffff');
  character.equipItem(window.ItemCatalog.shoes[0], '#ffffff');
  character.equipItem(window.ItemCatalog.accessory[0], '#ffd700');

  // 5. DOM Elements
  const categoryTabs = document.querySelectorAll('.cat-tab');
  const itemsGrid = document.getElementById('items-grid');
  const colorSwatches = document.querySelectorAll('.swatch');
  const customColorInput = document.getElementById('custom-color-input');
  const colorPreviewCircle = document.getElementById('color-preview-circle');
  const selectedItemTag = document.getElementById('selected-item-tag');
  const btnFinish = document.getElementById('btn-finish');
  const btnAudio = document.getElementById('btn-audio');
  const audioIcon = document.getElementById('audio-icon');
  const btnTogglePanel = document.getElementById('btn-toggle-panel');
  const btnReopenPanel = document.getElementById('btn-reopen-panel');
  const customizerPanel = document.getElementById('customizer-panel');
  const topHud = document.getElementById('top-hud');
  const turntableControls = document.getElementById('turntable-controls');
  const btnPlayAgain = document.getElementById('btn-play-again');

  // Camera Quick Buttons
  const btnRotateLeft = document.getElementById('btn-rotate-left');
  const btnRotateRight = document.getElementById('btn-rotate-right');
  const btnResetCam = document.getElementById('btn-reset-cam');

  // 6. Populate Item Grid Function
  function renderItemGrid(category) {
    currentCategory = category;
    itemsGrid.innerHTML = '';
    const items = window.ItemCatalog[category] || [];

    const activeItem = character.equippedItems[category];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = `item-card ${activeItem && activeItem.id === item.id ? 'equipped' : ''}`;
      card.innerHTML = `
        <span class="item-card-icon">${item.icon}</span>
        <span class="item-card-name">${item.name}</span>
        <span class="item-card-tag">#${item.tags[0] || 'style'}</span>
      `;

      card.addEventListener('click', () => {
        window.SoundFXInstance.playSelect();
        character.equipItem(item);
        renderItemGrid(category);
        updateColorUI();
      });

      itemsGrid.appendChild(card);
    });

    updateColorUI();
  }

  function updateColorUI() {
    const activeColor = character.equippedColors[currentCategory] || '#ff4081';
    if (selectedItemTag) {
      const catNames = { hair: 'Rambut', top: 'Atasan', bottom: 'Bawahan', shoes: 'Sepatu', accessory: 'Aksesoris' };
      selectedItemTag.textContent = catNames[currentCategory] || 'Pakaian';
    }
    if (colorPreviewCircle) {
      colorPreviewCircle.style.backgroundColor = activeColor;
    }
    if (customColorInput) {
      customColorInput.value = activeColor;
    }

    // Highlight matching preset swatch if any
    colorSwatches.forEach(swatch => {
      if (swatch.dataset.color.toLowerCase() === activeColor.toLowerCase()) {
        swatch.classList.add('active');
      } else {
        swatch.classList.remove('active');
      }
    });
  }

  // 7. Event Listeners: Category Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderItemGrid(tab.dataset.category);
    });
  });

  // 8. Event Listeners: Color Swatches & Picker
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.dataset.color;
      window.SoundFXInstance.playColorChange();
      character.setSlotColor(currentCategory, color);
      updateColorUI();
    });
  });

  if (customColorInput) {
    customColorInput.addEventListener('input', (e) => {
      const color = e.target.value;
      character.setSlotColor(currentCategory, color);
      if (colorPreviewCircle) colorPreviewCircle.style.backgroundColor = color;
    });
  }

  // 9. Camera Controls Buttons
  if (btnRotateLeft) {
    btnRotateLeft.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      fashionScene.rotateTurntableBy(0.4);
    });
  }
  if (btnRotateRight) {
    btnRotateRight.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      fashionScene.rotateTurntableBy(-0.4);
    });
  }
  if (btnResetCam) {
    btnResetCam.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      fashionScene.resetTurntable();
      fashionScene.camTargetPos.set(0, 1.35, 3.8);
      fashionScene.camLookTarget.set(0, 1.15, 0);
    });
  }

  // 10. Drawer Collapse / Reopen
  if (btnTogglePanel) {
    btnTogglePanel.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      customizerPanel.classList.add('collapsed');
      btnReopenPanel.classList.remove('hidden');
    });
  }
  if (btnReopenPanel) {
    btnReopenPanel.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      customizerPanel.classList.remove('collapsed');
      btnReopenPanel.classList.add('hidden');
    });
  }

  // 11. Audio Toggle
  if (btnAudio) {
    btnAudio.addEventListener('click', () => {
      const isUnmuted = window.SoundFXInstance.toggleMute();
      audioIcon.textContent = isUnmuted ? '🔊' : '🔇';
    });
  }

  // 12. "Selesai & Tampil" (Finish & Walk Catwalk)
  function startRunwaySequence() {
    window.SoundFXInstance.playClick();
    gameManager.stopTimer();

    // Hide Customizer UI & Top HUD for clean runway camera view
    customizerPanel.classList.add('collapsed');
    btnReopenPanel.classList.add('hidden');
    topHud.classList.add('hidden');
    turntableControls.classList.add('hidden');

    runwayManager.startRunway(() => {
      // Callback after catwalk completes
      gameManager.showResults();
    });
  }

  if (btnFinish) {
    btnFinish.addEventListener('click', startRunwaySequence);
  }

  // If 90-second timer runs out, auto-start runway!
  gameManager.onTimerExpired = () => {
    startRunwaySequence();
  };

  // 13. "Main Lagi" (Play Again)
  if (btnPlayAgain) {
    btnPlayAgain.addEventListener('click', () => {
      window.SoundFXInstance.playClick();
      gameManager.hideResults();

      // Restore HUD and Panel
      topHud.classList.remove('hidden');
      customizerPanel.classList.remove('collapsed');
      turntableControls.classList.remove('hidden');

      // Reset game with a brand new theme & timer
      gameManager.init();
      renderItemGrid(currentCategory);
    });
  }

  // 14. Initial Render
  renderItemGrid('hair');
  gameManager.init();

  // 15. Global Animation Loop (60 FPS)
  const clock = new window.THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Update 3D scene & camera
    fashionScene.update(delta, elapsedTime);

    // Update runway catwalk motion if active
    runwayManager.update(performance.now());
  }

  animate();
});

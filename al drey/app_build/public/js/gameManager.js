/**
 * gameManager.js - Game State, Themes, 90s Countdown Timer, AI Competitors & Scoring
 */

window.THEMES = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Gala',
    icon: '⚡',
    hint: 'Futuristic, Neon, Metallic',
    tags: ['cyber', 'futuristic', 'gothic'],
    preferredColors: ['#00e5ff', '#9c27b0', '#1a1a24']
  },
  {
    id: 'royal',
    name: 'Royal Elegance',
    icon: '👑',
    hint: 'Gold, Glamour, Ballgown',
    tags: ['royal', 'elegant', 'glamour'],
    preferredColors: ['#ffd700', '#ff3385', '#ffffff']
  },
  {
    id: 'y2k',
    name: 'Y2K Pop Star',
    icon: '💖',
    hint: 'Pink, Cute, Crop Tops',
    tags: ['y2k', 'cute', 'casual'],
    preferredColors: ['#ff4081', '#00e5ff', '#ffffff']
  },
  {
    id: 'gothic',
    name: 'Gothic Romance',
    icon: '🖤',
    hint: 'Dark, Velvet, Leather Boots',
    tags: ['gothic', 'street', 'cyber'],
    preferredColors: ['#1a1a24', '#ff3d00', '#b388ff']
  },
  {
    id: 'summer',
    name: 'Summer Beach Party',
    icon: '🌴',
    hint: 'Shorts, Sandals, Casual Vibes',
    tags: ['summer', 'casual', 'cute'],
    preferredColors: ['#00e5ff', '#ffab91', '#ffd700']
  },
  {
    id: 'cottagecore',
    name: 'Cottagecore Dream',
    icon: '🌸',
    hint: 'Vintage, Beret, Soft Pastels',
    tags: ['cottage', 'elegant', 'casual'],
    preferredColors: ['#ffab91', '#ffd700', '#ffffff']
  }
];

class GameManager {
  constructor(characterInstance) {
    this.character = characterInstance;
    this.currentTheme = null;
    this.timerSeconds = 90;
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.aiCompetitors = [];

    // DOM references
    this.themeTitle = document.getElementById('theme-title');
    this.themeIcon = document.getElementById('theme-icon');
    this.themeHint = document.getElementById('theme-hint');
    this.timerText = document.getElementById('timer-text');
    this.timerBar = document.getElementById('timer-bar');
    this.timerCard = document.getElementById('timer-card');

    this.resultsModal = document.getElementById('results-modal');
    this.modalThemeName = document.getElementById('modal-theme-name');
    this.scoreStars = document.getElementById('score-stars');
    this.playerScoreValue = document.getElementById('player-score-value');
    this.playerRankAnnouncement = document.getElementById('player-rank-announcement');
    this.critTheme = document.getElementById('crit-theme');
    this.critColor = document.getElementById('crit-color');
    this.critSet = document.getElementById('crit-set');
    this.podiumList = document.getElementById('podium-list');

    this.onTimerExpired = null;
  }

  init() {
    this.selectRandomTheme();
    this.generateAiCompetitors();
    this.startTimer();
  }

  selectRandomTheme() {
    const idx = Math.floor(Math.random() * window.THEMES.length);
    this.currentTheme = window.THEMES[idx];

    if (this.themeTitle) this.themeTitle.textContent = this.currentTheme.name;
    if (this.themeIcon) this.themeIcon.textContent = this.currentTheme.icon;
    if (this.themeHint) this.themeHint.textContent = this.currentTheme.hint;
  }

  startTimer() {
    this.stopTimer();
    this.timerSeconds = 90;
    this.isTimerRunning = true;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      if (!this.isTimerRunning) return;
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        this.stopTimer();
        if (this.onTimerExpired) {
          this.onTimerExpired();
        }
      }
    }, 1000);
  }

  stopTimer() {
    this.isTimerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    if (!this.timerText) return;
    this.timerText.textContent = this.timerSeconds;

    // Circle circumference = 2 * PI * 18 ≈ 113.1
    const totalCircumference = 113.1;
    const progress = (90 - this.timerSeconds) / 90;
    const offset = progress * totalCircumference;
    if (this.timerBar) {
      this.timerBar.style.strokeDashoffset = offset;
    }

    if (this.timerSeconds <= 15) {
      this.timerCard.classList.add('timer-urgent');
    } else {
      this.timerCard.classList.remove('timer-urgent');
    }
  }

  generateAiCompetitors() {
    const aiNames = [
      { name: 'Elena Vogue', avatar: '💃' },
      { name: 'Bella Cyber', avatar: '✨' },
      { name: 'Chloe Chic', avatar: '🌸' }
    ];

    this.aiCompetitors = aiNames.map(bot => {
      // AI scores baseline between 68 and 89 with slight variance
      const variance = Math.floor(Math.random() * 20);
      return {
        name: bot.name,
        avatar: bot.avatar,
        isPlayer: false,
        score: 70 + variance
      };
    });
  }

  evaluatePlayerScore() {
    let themeMatchPoints = 0;
    let colorHarmonyPoints = 0;
    let setCompletenessPoints = 0;

    const equipped = this.character.equippedItems;
    const colors = this.character.equippedColors;
    const theme = this.currentTheme;

    // 1. Theme Match (Max 40 points)
    let matchedTagCount = 0;
    let totalSlotsChecked = 0;

    Object.keys(equipped).forEach(slot => {
      const item = equipped[slot];
      if (item && item.tags) {
        totalSlotsChecked++;
        const matches = item.tags.some(tag => theme.tags.includes(tag));
        if (matches) matchedTagCount++;
      }
    });

    if (totalSlotsChecked > 0) {
      themeMatchPoints = Math.round((matchedTagCount / totalSlotsChecked) * 36) + 4;
    } else {
      themeMatchPoints = 10;
    }

    // 2. Color Harmony (Max 30 points)
    let colorMatches = 0;
    Object.keys(colors).forEach(slot => {
      const col = colors[slot];
      if (theme.preferredColors.includes(col)) {
        colorMatches++;
      }
    });
    colorHarmonyPoints = 15 + Math.min(15, colorMatches * 5);

    // 3. Completeness of Outfit (Max 30 points)
    const requiredSlots = ['hair', 'top', 'bottom', 'shoes', 'accessory'];
    const equippedCount = requiredSlots.filter(s => equipped[s] !== null).length;
    setCompletenessPoints = Math.round((equippedCount / requiredSlots.length) * 30);

    const totalScore = Math.min(100, Math.max(30, themeMatchPoints + colorHarmonyPoints + setCompletenessPoints));

    return {
      totalScore,
      themeMatchPoints,
      colorHarmonyPoints,
      setCompletenessPoints
    };
  }

  showResults() {
    this.stopTimer();

    const evaluation = this.evaluatePlayerScore();
    const playerScore = evaluation.totalScore;

    // Build standings
    const standings = [
      { name: 'Kamu (Player)', avatar: '🌟', isPlayer: true, score: playerScore },
      ...this.aiCompetitors
    ];

    standings.sort((a, b) => b.score - a.score);

    const playerRank = standings.findIndex(item => item.isPlayer) + 1;

    // Populate Modal
    if (this.modalThemeName) this.modalThemeName.textContent = this.currentTheme.name;
    if (this.playerScoreValue) this.playerScoreValue.textContent = playerScore;

    // Star Rating
    let starCount = 3;
    if (playerScore >= 90) starCount = 5;
    else if (playerScore >= 78) starCount = 4;
    else if (playerScore >= 60) starCount = 3;
    else starCount = 2;
    if (this.scoreStars) this.scoreStars.textContent = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);

    // Rank Announcement
    const announcements = {
      1: '🏆 Juara 1! Gaya busanamu memukau panggung catwalk!',
      2: '🥈 Juara 2! Penampilan yang sangat memikat dan modis!',
      3: '🥉 Juara 3! Eksplorasi gaya yang sangat baik di atas panggung!',
      4: '✨ Juara 4! Terus berkreasi dan temukan paduan warna terbaikmu!'
    };
    if (this.playerRankAnnouncement) this.playerRankAnnouncement.textContent = announcements[playerRank] || announcements[1];

    // Breakdown
    if (this.critTheme) this.critTheme.textContent = `+${evaluation.themeMatchPoints} Poin`;
    if (this.critColor) this.critColor.textContent = `+${evaluation.colorHarmonyPoints} Poin`;
    if (this.critSet) this.critSet.textContent = `+${evaluation.setCompletenessPoints} Poin`;

    // Populate Podium List
    if (this.podiumList) {
      this.podiumList.innerHTML = '';
      standings.forEach((item, index) => {
        const rank = index + 1;
        const row = document.createElement('div');
        row.className = `podium-item rank-${rank} ${item.isPlayer ? 'is-player' : ''}`;
        row.innerHTML = `
          <div class="podium-left">
            <span class="podium-badge">${rank}</span>
            <span class="podium-name">${item.avatar} ${item.name}</span>
          </div>
          <span class="podium-score">${item.score} Poin</span>
        `;
        this.podiumList.appendChild(row);
      });
    }

    // Play Victory Sound & Show Modal
    if (window.SoundFXInstance) {
      window.SoundFXInstance.playVictory();
    }
    if (this.resultsModal) {
      this.resultsModal.classList.remove('hidden');
    }
  }

  hideResults() {
    if (this.resultsModal) {
      this.resultsModal.classList.add('hidden');
    }
  }
}

window.GameManager = GameManager;

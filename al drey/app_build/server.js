const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false,
  maxAge: 0
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Glamour Runway 3D',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✨ Glamour Runway 3D is live!`);
  console.log(`👗 Local URL: http://localhost:${PORT}`);
  console.log(`🎮 Mode: Dressing Room & Catwalk Simulation`);
  console.log(`====================================================`);
});

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Basic security / CORS configuration for deployment
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN, // Netlify / other frontend domain
  process.env.FRONTEND_ORIGIN_2 // optional second domain
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || process.env.ALLOW_ALL_CORS === 'true') {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed for this origin'));
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', require('./routes/tasks'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Taskify API is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Serve frontend build in production if build exists (optional convenience)
const frontendBuildPath = path.join(__dirname, '../frontend_build');
if (process.env.SERVE_STATIC === 'true' && require('fs').existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  // 404 handler for API only
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Taskify server is running on port ${PORT}`);
  console.log(`📊 Health check: /api/health`);
  console.log(`📝 Tasks API: /api/tasks`);
  if (allowedOrigins.length) {
    console.log('✅ Allowed origins:', allowedOrigins.join(', '));
  } else if (process.env.ALLOW_ALL_CORS === 'true') {
    console.log('⚠️  All origins allowed (development mode)');
  }
});
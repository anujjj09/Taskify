const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Basic CORS configuration for deployment
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.ALLOW_ALL_CORS === 'true') {
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

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
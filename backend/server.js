const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const seedData = require('./seed');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static directory for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/stats', require('./routes/statRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Triport Properties Backend API',
    corridor: 'Tirupati-Naidupeta Growth Corridor',
    timestamp: new Date()
  });
});

// Serve frontend dist if available
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  console.log('Serving production frontend from:', frontendDist);
  app.use(express.static(frontendDist));
  app.use((req, res, next) => {
    if (req.url.startsWith('/api') || req.url.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Database Connection with Auto Fallback to In-Memory if local daemon not reachable
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/triport_properties';
  try {
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB Connected Successfully to local/configured instance.');

    // Check if seeded, if empty seed automatically
    const User = require('./models/User');
    const count = await User.countDocuments();
    if (count === 0) {
      console.log('Database empty. Running seed automatically...');
      await seedData();
    }
  } catch (err) {
    console.warn('Local MongoDB daemon not running directly on 27017. Initializing embedded high-performance MongoDB instance...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log('Embedded MongoDB initialized at:', uri);
      await mongoose.connect(uri);
      console.log('Embedded MongoDB connected. Populating seed dataset...');
      await seedData();
      console.log('Seed dataset loaded into memory server successfully.');
    } catch (memErr) {
      console.error('Fatal: Could not initialize database:', memErr);
    }
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Triport Properties Server listening on port ${PORT}`);
  });
});

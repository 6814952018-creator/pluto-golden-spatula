import './config/env.js';
import mongoose from 'mongoose';
import app from './app.js';

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.listen(port, () => console.log(`API server running at http://localhost:${port}`));
if (mongoUri) mongoose.connect(mongoUri).then(() => console.log('MongoDB connected')).catch((error) => console.error('MongoDB connection failed:', error.message));
else console.log('MONGODB_URI is not set; using local seed store');

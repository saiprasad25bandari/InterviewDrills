const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.JWT_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000*60*60*24, // 1 day
  },
}));

require('./config/passport'); // Google strategy
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => res.json({ ok: true }));

const authRoutes = require('./routes/auth');
const drillRoutes = require('./routes/drills');
const attemptRoutes = require('./routes/attempts');

app.use('/auth', authRoutes);
app.use('/api/drills', drillRoutes);
app.use('/api/attempts', attemptRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  picture: { type: String },
  providers: [
    {
      provider: { type: String },    // e.g., "google"
      providerId: { type: String },  // Google account ID
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

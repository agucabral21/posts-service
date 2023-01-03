const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    title: { type: String, unique: true },
    body: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', schema);

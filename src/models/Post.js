const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    title: { type: String, maxLength: 20, unique: true },
    body: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', schema);

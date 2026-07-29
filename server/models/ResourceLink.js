const mongoose = require('mongoose');

const resourceLinkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    category: {
      type: String,
      enum: ['DSA_SHEETS', 'DSA_PLATFORMS', 'Aptitude', 'Core'],
      required: true,
    },
    label: { type: String, required: true, trim: true, maxlength: 80 },
    url: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResourceLink', resourceLinkSchema);

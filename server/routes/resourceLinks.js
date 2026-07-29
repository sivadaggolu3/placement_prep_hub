const express = require('express');
const ResourceLink = require('../models/ResourceLink');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Only allow http/https URLs — blocks javascript:, data:, etc. from being
// stored and later rendered as a clickable link.
function isSafeUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// GET /api/resource-links?category=DSA
router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = { user: req.user.id };
  if (category) filter.category = category;

  const links = await ResourceLink.find(filter).sort({ createdAt: -1 });
  res.json(links);
});

// POST /api/resource-links
router.post('/', async (req, res) => {
  try {
    const { category, label, url } = req.body;

    if (!category || !label || !url) {
      return res.status(400).json({ message: 'Category, label and url are required' });
    }
    if (!['DSA_SHEETS', 'DSA_PLATFORMS', 'Aptitude', 'Core'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }
    if (!isSafeUrl(url)) {
      return res.status(400).json({ message: 'URL must start with http:// or https://' });
    }

    const link = await ResourceLink.create({ user: req.user.id, category, label, url });
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ message: 'Could not save link', error: err.message });
  }
});

// DELETE /api/resource-links/:id
router.delete('/:id', async (req, res) => {
  const link = await ResourceLink.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!link) return res.status(404).json({ message: 'Link not found' });
  res.json({ message: 'Link deleted' });
});

module.exports = router;

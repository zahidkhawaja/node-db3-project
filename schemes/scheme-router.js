const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

// GET schemes
router.get('/', (req, res) => {
  Schemes.find()
  .then(schemes => {
    res.json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

// GET schemes by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

// GET steps
router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

// POST scheme
router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
  .then(scheme => {
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme' });
  });
});

// PUT scheme
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.update(changes, id)
      .then(updatedScheme => {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});


// DELETE scheme
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;
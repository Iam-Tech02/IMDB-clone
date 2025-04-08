const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actarController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
router.get('/',auth, actorController.getActors);

router.post(
  '/',
  auth,
  upload.fields([{ name: 'image' }, { name: 'poster' }]),
  actorController.createActor
);

router.put(
  '/:id',
  auth,
  upload.fields([{ name: 'image' }, { name: 'poster' }]),
  actorController.updateActor
);

router.delete('/:id', auth, actorController.deleteActor);

module.exports = router;

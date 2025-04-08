const express = require('express');
const router = express.Router();
const { createMovie, getAllMovies,updateMovie,deleteMovie} = require('../controllers/movieController');
const upload = require('../middlewares/upload');
router.post('/', upload.single('poster'), createMovie);
router.get('/', getAllMovies);

router.put('/:id', upload.single('poster'), updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;

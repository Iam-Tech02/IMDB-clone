const Actor = require('../models/Actor');

exports.createActor = async (req, res) => {
  try {
    const { name, age, movies } = req.body;
    const image = req.file?.path;
    const actor = await Actor.create({ name, age, image, movies });
    res.status(201).json(actor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getActors = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const actors = await Actor.find().skip((page - 1) * limit).limit(Number(limit));
    const count = await Actor.countDocuments();
    res.json({ data: actors, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    res.json(actor);
  } catch (err) {
    res.status(404).json({ error: 'Actor not found' });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) updatedData.image = req.file.path;
    const actor = await Actor.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(actor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteActor = async (req, res) => {
  try {
    await Actor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Actor deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const Component = require('../models/Component');
// main controller for creating, getting, updating and deleting components 
exports.createComponent = async (req, res) => {
  try {
    const newComponent = new Component(req.body);
    await newComponent.save();
    res.status(201).json(newComponent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComponent = async (req, res) => {
  try {
    const updatedComponent = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedComponent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    await Component.findByIdAndDelete(req.params.id);
    res.json({ message: 'Component deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

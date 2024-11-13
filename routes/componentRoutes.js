const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
// test stuff for the post, get, put and delete routes
router.post('/', componentController.createComponent);
router.get('/', componentController.getComponents);
router.put('/:id', componentController.updateComponent);
router.delete('/:id', componentController.deleteComponent);

module.exports = router;

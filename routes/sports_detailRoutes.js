var express = require('express');
var router = express.Router();
var sports_detailController = require('../controllers/sports_detailController.js');

/*
 * GET
 */
router.get('/', sports_detailController.list);

/*
 * GET
 */
router.get('/:id', sports_detailController.show);

/*
 * POST
 */
router.post('/', sports_detailController.create);

/*
 * PUT
 */
router.put('/:id', sports_detailController.update);

/*
 * DELETE
 */
router.delete('/:id', sports_detailController.remove);

module.exports = router;

var express = require('express');
var router = express.Router();
var lat_detailController = require('../controllers/lat_detailController.js');

/*
 * GET
 */
router.get('/', lat_detailController.list);

/*
 * GET
 */
router.get('/:id', lat_detailController.show);

/*
 * POST
 */
router.post('/', lat_detailController.create);

/*
 * PUT
 */
router.put('/:id', lat_detailController.update);

/*
 * DELETE
 */
router.delete('/:id', lat_detailController.remove);

module.exports = router;

var express = require('express');
var router = express.Router();
var ent_detailController = require('../controllers/ent_detailController.js');

/*
 * GET
 */
router.get('/', ent_detailController.list);

/*
 * GET
 */
router.get('/:id', ent_detailController.show);

/*
 * POST
 */
router.post('/', ent_detailController.create);

/*
 * PUT
 */
router.put('/:id', ent_detailController.update);

/*
 * DELETE
 */
router.delete('/:id', ent_detailController.remove);

module.exports = router;

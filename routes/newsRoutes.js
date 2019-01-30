var express = require('express');
var router = express.Router();
var newsController = require('../controllers/newsController.js');

/*
 * GET
 */
router.get('/', newsController.list);
//
// SEED
router.get('/seed', newsController.seeding);
/*
 * GET
 */
router.get('/:id', newsController.show);

/*
 * POST
 */
router.post('/', newsController.create);

/*
 * PUT
 */
router.put('/:id', newsController.update);

/*
 * DELETE
 */
router.delete('/:id', newsController.remove);

module.exports = router;

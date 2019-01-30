var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController.js');
var businessModel = require('../models/businessModel.js');


/*
 * GET
 */
 router.get('/', function (req, res) {
 businessModel.find(function (err, business) {
     if (err) {
         return res.status(500).json({
             message: 'Error when getting sports.',
             error: err
         });
     }
     return res.render('sports',{ posts: business,trendings:business,category:"business" , randomImage:"business,dark"});
 });
 });
/*
 * GET
 */
router.get('/:id', businessController.show);

/*
 * POST
 */
router.post('/', businessController.create);

/*
 * PUT
 */
router.put('/:id', businessController.update);

/*
 * DELETE
 */
router.delete('/:id', businessController.remove);

module.exports = router;

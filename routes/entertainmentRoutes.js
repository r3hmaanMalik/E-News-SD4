var express = require('express');
var router = express.Router();
var entertainmentController = require('../controllers/entertainmentController.js');
var entertainmentModel = require('../models/entertainmentModel.js');
var ent_detailModel = require('../models/ent_detailModel.js');
/*
 * GET
 */

router.get('/', function(req, res) {
  entertainmentModel.find(function(err, entertainments) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports.',
        error: err
      });
    }
    return res.render('sports', {
      posts: entertainments,
      trendings: entertainments,
      category: "Hasham",
      randomImage: "lahore"
    });
  });
});





/*
 * GET
 */
router.get('/:id', function(req, res) {

  ent_detailModel.findOne({
    id: req.params.id
  }, function(err, entdetail) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports_detail.',
        error: err
      });
    }
    if (!entdetail) {
      return res.status(404).json({
        message: 'No such sports_detail'
      });
    }
    return res.render('post', {
      message: entdetail,
      randomImage: "films",
      category: "entertainment"
    });
  });
});

/*
 * POST
 */
router.post('/', entertainmentController.create);

/*
 * PUT
 */
router.put('/:id', entertainmentController.update);

/*
 * DELETE
 */
router.delete('/:id', entertainmentController.remove);

module.exports = router;
var express = require('express');
var router = express.Router();
var sportsController = require('../controllers/sportsController.js');

var sportsModel = require('../models/sportsModel.js');
var sports_detailModel = require('../models/sports_detailModel.js');




/*
 * GET
 */
router.get('/', function(req, res) {
  sportsModel.find(function(err, sportss) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports.',
        error: err
      });
    }
    return res.render('sports', {
      posts: sportss,
      trendings: sportss,
      category: "sports",
      randomImage: "black,sports"
    });
  });
});

/*
 * GET
 */
router.get('/:id', function(req, res) {

  sports_detailModel.findOne({
    id: req.params.id
  }, function(err, sports_detail) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports_detail.',
        error: err
      });
    }
    if (!sports_detail) {
      return res.status(404).json({
        message: 'No such sports_detail'
      });
    }
    return res.render('post', {
      message: sports_detail,
      category: "Sports",
      randomImage: "Sports"
    });
  });
});




// /*
//  * GET
//  */
// router.get('/', sportsController.list);
//
// /*
//  * GET
//  */
// router.get('/:id', sportsController.show);
//
// /*
//  * POST
//  */
// router.post('/', sportsController.create);
//
// /*
//  * PUT
//  */
// router.put('/:id', sportsController.update);
//
// /*
//  * DELETE
//  */
// router.delete('/:id', sportsController.remove);

module.exports = router;
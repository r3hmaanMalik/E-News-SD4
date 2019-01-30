var express = require('express');
var router = express.Router();
var latestController = require('../controllers/latestController.js');
var latestModel = require('../models/latestModel.js');
var lat_detailModel = require('../models/lat_detailModel.js');


/*
 * GET
 */
router.get('/', function(req, res) {
  latestModel.find(function(err, latests) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports.',
        error: err
      });
    }
    return res.render('sports', {
      posts: latests,
      trendings: latests,
      category: "latest",
      randomImage: "lahore"
    });
  });
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
  lat_detailModel.findOne({
    id: req.params.id
  }, function(err, latdetail) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports_detail.',
        error: err
      });
    }
    if (!latdetail) {
      return res.status(404).json({
        message: 'No such sports_detail'
      });
    }
    return res.render('post', {
      message: latdetail,
      category: "latest",
      randomImage: "lahore"
    });
  });
});

/*
 * POST
 */
router.post('/', latestController.create);

/*
 * PUT
 */
router.put('/:id', latestController.update);

/*
 * DELETE
 */
router.delete('/:id', latestController.remove);

module.exports = router;
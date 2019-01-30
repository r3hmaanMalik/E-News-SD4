var express = require('express');
var router = express.Router();
var worldController = require('../controllers/worldController.js');
var worldModel = require('../models/worldModel.js');
var world_detailModel = require('../models/world_detailModel.js');

/*
 * GET
 */
 router.get('/', function (req, res) {
     worldModel.find(function (err, worlds) {
         if (err) {
             return res.status(500).json({
                 message: 'Error when getting sports.',
                 error: err
             });
         }
         return res.render('sports',{ posts: worlds,trendings:worlds,category:"world" , randomImage:"world,student"});
     });
 });

/*
 * GET
 */
 router.get('/:id', function (req, res) {
     world_detailModel.findOne({id: req.params.id}, function (err, sports_detail) {
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
         return res.render('post',{ message: sports_detail,category:"World",randomImage:"world"});
     });
 });

/*
 * POST
 */
router.post('/', worldController.create);

/*
 * PUT
 */
router.put('/:id', worldController.update);

/*
 * DELETE
 */
router.delete('/:id', worldController.remove);

module.exports = router;

var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController.js');
var studentModel = require('../models/studentModel.js');
var studentDetailModel = require('../models/studentDetailModel.js');



/*
 * GET
 */
 router.get('/', function (req, res) {
     studentModel.find(function (err, student) {
         if (err) {
             return res.status(500).json({
                 message: 'Error when getting sports.',
                 error: err
             });
         }
         return res.render('sports',{ posts: student,trendings:student,category:"studentcorner" , randomImage:"study,student"});
     });
 });

/*
 * GET
 */
 router.get('/:id', function (req, res) {
     studentDetailModel.findOne({id: req.params.id}, function (err, sports_detail) {
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
         return res.render('post',{ message: sports_detail,category:"Student",randomImage:"education"});
     });
 });
/*
 * POST
 */


/*
 * PUT
 */
 router.get('/', studentController.list);

 router.get('/:id', studentController.show);
router.put('/:id', studentController.update);

/*
 * DELETE
 */
router.delete('/:id', studentController.remove);

module.exports = router;

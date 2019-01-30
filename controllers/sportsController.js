var sportsModel = require('../models/sportsModel.js');
var sports_detailModel = require('../models/sports_detailModel.js');

/**
 * sportsController.js
 *
 * @description :: Server-side logic for managing sportss.
 */
module.exports = {

    /**
     * sportsController.list()
     */
    list: function (req, res) {
        sportsModel.find(function (err, sportss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sports.',
                    error: err
                });
            }
            return res.json(sportss);
        });
    },

    /**
     * sportsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        sports_detailModel.findOne({id: id}, function (err, sports) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sports.',
                    error: err
                });
            }
            if (!sports) {
                return res.status(404).json({
                    message: 'No such sports'
                });
            }
            return res.json(sports);
        });
    },

    /**
     * sportsController.create()
     */
    create: function (req, res) {
        var sports = new sportsModel({
			title : req.body.title,
			discription : req.body.discription,
			newslink : req.body.newslink,
			ilink : req.body.ilink

        });

        sports.save(function (err, sports) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating sports',
                    error: err
                });
            }
            return res.status(201).json(sports);
        });
    },

    /**
     * sportsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        sportsModel.findOne({_id: id}, function (err, sports) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sports',
                    error: err
                });
            }
            if (!sports) {
                return res.status(404).json({
                    message: 'No such sports'
                });
            }

            sports.title = req.body.title ? req.body.title : sports.title;
			sports.discription = req.body.discription ? req.body.discription : sports.discription;
			sports.newslink = req.body.newslink ? req.body.newslink : sports.newslink;
			sports.ilink = req.body.ilink ? req.body.ilink : sports.ilink;

            sports.save(function (err, sports) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating sports.',
                        error: err
                    });
                }

                return res.json(sports);
            });
        });
    },

    /**
     * sportsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        sportsModel.findByIdAndRemove(id, function (err, sports) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the sports.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

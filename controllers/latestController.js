var latestModel = require('../models/latestModel.js');

/**
 * latestController.js
 *
 * @description :: Server-side logic for managing latests.
 */
module.exports = {

    /**
     * latestController.list()
     */
    list: function (req, res) {
        latestModel.find(function (err, latests) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting latest.',
                    error: err
                });
            }
            return res.json(latests);
        });
    },

    /**
     * latestController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        latestModel.findOne({_id: id}, function (err, latest) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting latest.',
                    error: err
                });
            }
            if (!latest) {
                return res.status(404).json({
                    message: 'No such latest'
                });
            }
            return res.json(latest);
        });
    },

    /**
     * latestController.create()
     */
    create: function (req, res) {
        var latest = new latestModel({
			title : req.body.title,
			discription : req.body.discription,
			newslink : req.body.newslink,
			ilink : req.body.ilink

        });

        latest.save(function (err, latest) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating latest',
                    error: err
                });
            }
            return res.status(201).json(latest);
        });
    },

    /**
     * latestController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        latestModel.findOne({_id: id}, function (err, latest) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting latest',
                    error: err
                });
            }
            if (!latest) {
                return res.status(404).json({
                    message: 'No such latest'
                });
            }

            latest.title = req.body.title ? req.body.title : latest.title;
			latest.discription = req.body.discription ? req.body.discription : latest.discription;
			latest.newslink = req.body.newslink ? req.body.newslink : latest.newslink;
			latest.ilink = req.body.ilink ? req.body.ilink : latest.ilink;
			
            latest.save(function (err, latest) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating latest.',
                        error: err
                    });
                }

                return res.json(latest);
            });
        });
    },

    /**
     * latestController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        latestModel.findByIdAndRemove(id, function (err, latest) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the latest.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

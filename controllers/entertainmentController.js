var entertainmentModel = require('../models/entertainmentModel.js');

/**
 * entertainmentController.js
 *
 * @description :: Server-side logic for managing entertainments.
 */
module.exports = {

    /**
     * entertainmentController.list()
     */
    list: function (req, res) {
        entertainmentModel.find(function (err, entertainments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting entertainment.',
                    error: err
                });
            }
            return res.json(entertainments);
        });
    },

    /**
     * entertainmentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        entertainmentModel.findOne({_id: id}, function (err, entertainment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting entertainment.',
                    error: err
                });
            }
            if (!entertainment) {
                return res.status(404).json({
                    message: 'No such entertainment'
                });
            }
            return res.json(entertainment);
        });
    },

    /**
     * entertainmentController.create()
     */
    create: function (req, res) {
        var entertainment = new entertainmentModel({
			title : req.body.title,
			discription : req.body.discription,
			newslink : req.body.newslink,
			ilink : req.body.ilink

        });

        entertainment.save(function (err, entertainment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating entertainment',
                    error: err
                });
            }
            return res.status(201).json(entertainment);
        });
    },

    /**
     * entertainmentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        entertainmentModel.findOne({_id: id}, function (err, entertainment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting entertainment',
                    error: err
                });
            }
            if (!entertainment) {
                return res.status(404).json({
                    message: 'No such entertainment'
                });
            }

            entertainment.title = req.body.title ? req.body.title : entertainment.title;
			entertainment.discription = req.body.discription ? req.body.discription : entertainment.discription;
			entertainment.newslink = req.body.newslink ? req.body.newslink : entertainment.newslink;
			entertainment.ilink = req.body.ilink ? req.body.ilink : entertainment.ilink;
			
            entertainment.save(function (err, entertainment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating entertainment.',
                        error: err
                    });
                }

                return res.json(entertainment);
            });
        });
    },

    /**
     * entertainmentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        entertainmentModel.findByIdAndRemove(id, function (err, entertainment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the entertainment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

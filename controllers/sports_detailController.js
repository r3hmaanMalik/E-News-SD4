var sports_detailModel = require('../models/sports_detailModel.js');

/**
 * sports_detailController.js
 *
 * @description :: Server-side logic for managing sports_details.
 */
module.exports = {

    /**
     * sports_detailController.list()
     */
    list: function (req, res) {
        sports_detailModel.find(function (err, sports_details) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sports_detail.',
                    error: err
                });
            }
            return res.json(sports_details);
        });
    },

    /**
     * sports_detailController.show()
     */
    show: function (req, res) {

        sports_detailModel.findOne({id: req.params.id}, function (err, sports_detail) {
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
            return res.json(sports_detail);
        });
    },

    /**
     * sports_detailController.create()
     */
    create: function (req, res) {
        var sports_detail = new sports_detailModel({
			id : req.body.id,
			title : req.body.title,
			content : req.body.content,
			ilink : req.body.ilink

        });

        sports_detail.save(function (err, sports_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating sports_detail',
                    error: err
                });
            }
            return res.status(201).json(sports_detail);
        });
    },

    /**
     * sports_detailController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        sports_detailModel.findOne({_id: id}, function (err, sports_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting sports_detail',
                    error: err
                });
            }
            if (!sports_detail) {
                return res.status(404).json({
                    message: 'No such sports_detail'
                });
            }

            sports_detail.id = req.body.id ? req.body.id : sports_detail.id;
			sports_detail.title = req.body.title ? req.body.title : sports_detail.title;
			sports_detail.content = req.body.content ? req.body.content : sports_detail.content;
			sports_detail.ilink = req.body.ilink ? req.body.ilink : sports_detail.ilink;

            sports_detail.save(function (err, sports_detail) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating sports_detail.',
                        error: err
                    });
                }

                return res.json(sports_detail);
            });
        });
    },

    /**
     * sports_detailController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        sports_detailModel.findByIdAndRemove(id, function (err, sports_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the sports_detail.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

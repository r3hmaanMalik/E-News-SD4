var lat_detailModel = require('../models/lat_detailModel.js');

/**
 * lat_detailController.js
 *
 * @description :: Server-side logic for managing lat_details.
 */
module.exports = {

    /**
     * lat_detailController.list()
     */
    list: function (req, res) {
        lat_detailModel.find(function (err, lat_details) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting lat_detail.',
                    error: err
                });
            }
            return res.json(lat_details);
        });
    },

    /**
     * lat_detailController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        lat_detailModel.findOne({_id: id}, function (err, lat_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting lat_detail.',
                    error: err
                });
            }
            if (!lat_detail) {
                return res.status(404).json({
                    message: 'No such lat_detail'
                });
            }
            return res.json(lat_detail);
        });
    },

    /**
     * lat_detailController.create()
     */
    create: function (req, res) {
        var lat_detail = new lat_detailModel({
			id : req.body.id,
			title : req.body.title,
			content : req.body.content,
			ilink : req.body.ilink

        });

        lat_detail.save(function (err, lat_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating lat_detail',
                    error: err
                });
            }
            return res.status(201).json(lat_detail);
        });
    },

    /**
     * lat_detailController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        lat_detailModel.findOne({_id: id}, function (err, lat_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting lat_detail',
                    error: err
                });
            }
            if (!lat_detail) {
                return res.status(404).json({
                    message: 'No such lat_detail'
                });
            }

            lat_detail.id = req.body.id ? req.body.id : lat_detail.id;
			lat_detail.title = req.body.title ? req.body.title : lat_detail.title;
			lat_detail.content = req.body.content ? req.body.content : lat_detail.content;
			lat_detail.ilink = req.body.ilink ? req.body.ilink : lat_detail.ilink;
			
            lat_detail.save(function (err, lat_detail) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating lat_detail.',
                        error: err
                    });
                }

                return res.json(lat_detail);
            });
        });
    },

    /**
     * lat_detailController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        lat_detailModel.findByIdAndRemove(id, function (err, lat_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the lat_detail.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

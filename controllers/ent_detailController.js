var ent_detailModel = require('../models/ent_detailModel.js');

/**
 * ent_detailController.js
 *
 * @description :: Server-side logic for managing ent_details.
 */
module.exports = {

    /**
     * ent_detailController.list()
     */
    list: function (req, res) {
        ent_detailModel.find(function (err, ent_details) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ent_detail.',
                    error: err
                });
            }
            return res.json(ent_details);
        });
    },

    /**
     * ent_detailController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ent_detailModel.findOne({_id: id}, function (err, ent_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ent_detail.',
                    error: err
                });
            }
            if (!ent_detail) {
                return res.status(404).json({
                    message: 'No such ent_detail'
                });
            }
            return res.json(ent_detail);
        });
    },

    /**
     * ent_detailController.create()
     */
    create: function (req, res) {
        var ent_detail = new ent_detailModel({
			id : req.body.id,
			title : req.body.title,
			content : req.body.content,
			ilink : req.body.ilink

        });

        ent_detail.save(function (err, ent_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ent_detail',
                    error: err
                });
            }
            return res.status(201).json(ent_detail);
        });
    },

    /**
     * ent_detailController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ent_detailModel.findOne({_id: id}, function (err, ent_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ent_detail',
                    error: err
                });
            }
            if (!ent_detail) {
                return res.status(404).json({
                    message: 'No such ent_detail'
                });
            }

            ent_detail.id = req.body.id ? req.body.id : ent_detail.id;
			ent_detail.title = req.body.title ? req.body.title : ent_detail.title;
			ent_detail.content = req.body.content ? req.body.content : ent_detail.content;
			ent_detail.ilink = req.body.ilink ? req.body.ilink : ent_detail.ilink;
			
            ent_detail.save(function (err, ent_detail) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ent_detail.',
                        error: err
                    });
                }

                return res.json(ent_detail);
            });
        });
    },

    /**
     * ent_detailController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ent_detailModel.findByIdAndRemove(id, function (err, ent_detail) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ent_detail.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

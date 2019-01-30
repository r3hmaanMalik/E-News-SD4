var businessModel = require('../models/businessModel.js');

/**
 * businessController.js
 *
 * @description :: Server-side logic for managing businesss.
 */
module.exports = {

    /**
     * businessController.list()
     */
    list: function (req, res) {
        businessModel.find(function (err, businesss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting business.',
                    error: err
                });
            }
            return res.json(businesss);
        });
    },

    /**
     * businessController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        businessModel.findOne({_id: id}, function (err, business) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting business.',
                    error: err
                });
            }
            if (!business) {
                return res.status(404).json({
                    message: 'No such business'
                });
            }
            return res.json(business);
        });
    },

    /**
     * businessController.create()
     */
    create: function (req, res) {
        var business = new businessModel({
			title : req.body.title,
			discription : req.body.discription,
			newslink : req.body.newslink,
			ilink : req.body.ilink

        });

        business.save(function (err, business) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating business',
                    error: err
                });
            }
            return res.status(201).json(business);
        });
    },

    /**
     * businessController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        businessModel.findOne({_id: id}, function (err, business) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting business',
                    error: err
                });
            }
            if (!business) {
                return res.status(404).json({
                    message: 'No such business'
                });
            }

            business.title = req.body.title ? req.body.title : business.title;
			business.discription = req.body.discription ? req.body.discription : business.discription;
			business.newslink = req.body.newslink ? req.body.newslink : business.newslink;
			business.ilink = req.body.ilink ? req.body.ilink : business.ilink;
			
            business.save(function (err, business) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating business.',
                        error: err
                    });
                }

                return res.json(business);
            });
        });
    },

    /**
     * businessController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        businessModel.findByIdAndRemove(id, function (err, business) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the business.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

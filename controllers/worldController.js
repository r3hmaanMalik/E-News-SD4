var worldModel = require('../models/worldModel.js');

/**
 * worldController.js
 *
 * @description :: Server-side logic for managing worlds.
 */
module.exports = {

    /**
     * worldController.list()
     */
    list: function (req, res) {
        worldModel.find(function (err, worlds) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting world.',
                    error: err
                });
            }
            return res.json(worlds);
        });
    },

    /**
     * worldController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        worldModel.findOne({_id: id}, function (err, world) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting world.',
                    error: err
                });
            }
            if (!world) {
                return res.status(404).json({
                    message: 'No such world'
                });
            }
            return res.json(world);
        });
    },

    /**
     * worldController.create()
     */
    create: function (req, res) {
        var world = new worldModel({
			title : req.body.title,
			discription : req.body.discription,
			newslink : req.body.newslink,
			ilink : req.body.ilink

        });

        world.save(function (err, world) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating world',
                    error: err
                });
            }
            return res.status(201).json(world);
        });
    },

    /**
     * worldController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        worldModel.findOne({_id: id}, function (err, world) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting world',
                    error: err
                });
            }
            if (!world) {
                return res.status(404).json({
                    message: 'No such world'
                });
            }

            world.title = req.body.title ? req.body.title : world.title;
			world.discription = req.body.discription ? req.body.discription : world.discription;
			world.newslink = req.body.newslink ? req.body.newslink : world.newslink;
			world.ilink = req.body.ilink ? req.body.ilink : world.ilink;
			
            world.save(function (err, world) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating world.',
                        error: err
                    });
                }

                return res.json(world);
            });
        });
    },

    /**
     * worldController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        worldModel.findByIdAndRemove(id, function (err, world) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the world.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

var newsModel = require('../models/newsModel.js');
var faker = require('faker');

/**
 * newsController.js
 *
 * @description :: Server-side logic for managing newss.
 */
module.exports = {

    /**
     * newsController.list()
     */
    list: function (req, res) {
        newsModel.find(function (err, newss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting news.',
                    error: err
                });
            }
            return res.json(newss);
        });
    },

    /**
     * newsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        newsModel.findOne({_id: id}, function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting news.',
                    error: err
                });
            }
            if (!news) {
                return res.status(404).json({
                    message: 'No such news'
                });
            }
            return res.json(news);
        });
    },

    /**
     * newsController.create()
     */
    create: function (req, res) {
      var news = new newsModel({
			heading : req.body.heading,
			image : req.body.image,
			detail : req.body.detail,
			date : req.body.date

        });

        news.save(function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating news',
                    error: err
                });
            }
            return res.status(201).json(news);
        });
    },

// seeding
    seeding: function (req, res) {

      function Fakeit(){
        this.heading = faker.lorem.sentence();
        this.image = faker.image.imageUrl();
        this.detail = faker.lorem.sentences();
        this.date = faker.date.past();
      }

      var NewsArray = [];
      for (var i = 0; i <20; i++) {
      NewsArray.push(new Fakeit());
      }

     for (oldnews of NewsArray) {
       var news = new newsModel(oldnews);
       news.save(function (err, news) {
           if (err) {
               return res.status(500).json({
                   message: 'Error when creating news',
                   error: err
               });
           }
       });
     }
     return res.status(201).json(NewsArray);

    },



    /**
     * newsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        newsModel.findOne({_id: id}, function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting news',
                    error: err
                });
            }
            if (!news) {
                return res.status(404).json({
                    message: 'No such news'
                });
            }

            news.heading = req.body.heading ? req.body.heading : news.heading;
			news.image = req.body.image ? req.body.image : news.image;
			news.detail = req.body.detail ? req.body.detail : news.detail;
			news.date = req.body.date ? req.body.date : news.date;

            news.save(function (err, news) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating news.',
                        error: err
                    });
                }

                return res.json(news);
            });
        });
    },

    /**
     * newsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        newsModel.findByIdAndRemove(id, function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the news.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

var express = require('express');
var router = express.Router();
var carController = require('../controllers/carController.js');
// var carModel = require('../models/carModel.js');
// var newsModel = require('../models/newsModel.js');

var NodeGeocoder = require('node-geocoder');


var latestModel = require('../models/latestModel.js');
var sportsModel = require('../models/sportsModel.js');
var entertainmentModel = require('../models/entertainmentModel.js');
var studentModel = require('../models/studentModel.js');
var businessModel = require('../models/businessModel.js');
var worldModel = require('../models/worldModel.js');
var lat_detailModel = require('../models/lat_detailModel.js');
var RSS = require('rss');


var feed = new RSS({
  title: 'E-News',
  description: 'description',
  feed_url: 'http://example.com/rss',
  site_url: 'http://example.com',
  language: 'en',
  categories: ['Category 1', 'Category 2', 'Category 3'],
  custom_namespaces: {
    'News': 'http://example.com'
  },
  custom_elements: [{
      'News:title': 'News Title about everything'
    },
    {
      'News:discription': 'Discription'
    },
    {
      'News:URL': 'News URL'
    },
    {
      'News:ImageURL': 'News Image URL'
    }
  ]
});

worldModel.find(function(err, worlds) {
  if (err) {
    return res.status(500).json({
      message: 'Error when getting world.',
      error: err
    });
  }
  worlds.forEach(function(news) {
    // someFn(item);
    feed.item({
      title: 'E-News',
      custom_namespaces: {
        'News': news['title']
      },
      custom_elements: [{
          'News:title': news['title']
        },
        {
          'News:discription': news['discription']
        },
        {
          'News:URL': news['newslink']
        },
        {
          'News:ImageURL': news['ilink']
        },
      ]
    });
  })

});


/* loop over data and add to feed */
// feed.item({
//   title: 'item title',
//   description: 'use this for the content. It can include html.',
//   url: 'http://example.com/article4?this&that', // link to the item
//   categories: ['Category 1'], // optional - array of item categories
// });

// cache the xml to send to clients


var xml = feed.xml({
  indent: true
});



///////RSS CODE Ends here
router.get('/', function(req, res) {
  latestModel.find(function(err, latests) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports.',
        error: err
      });
    }

    sportsModel.find(function(err, sportss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting sports.',
          error: err
        });
      }

      entertainmentModel.find(function(err, entertainments) {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting sports.',
            error: err
          });
        }
        studentModel.find(function(err, student) {
          if (err) {
            return res.status(500).json({
              message: 'Error when getting sports.',
              error: err
            });
          }
          businessModel.find(function(err, businesss) {
            if (err) {
              return res.status(500).json({
                message: 'Error when getting business.',
                error: err
              });
            }
            worldModel.find(function(err, worlds) {
              if (err) {
                return res.status(500).json({
                  message: 'Error when getting world.',
                  error: err
                });
              }
              return res.render('index', {
                trendings: latests,
                sport: sportss,
                entertainment: entertainments,
                education: student,
                business: businesss,
                world: worlds,
                category: "latest",
                randomImage: "chocolates"
              });

            });
          });
        });
      });

    });
  });
});
router.get('/rss', function(req, res, next) {

  var xml = feed.xml();
  res.set('Content-Type', 'text/xml');
  res.type('application/xml');
  return res.send(xml);

});


router.get('/login', function(req, res, next) {


  var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDKp3JCvoBPEV-zicOFHNv0shpg9CzJvkY', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);
  // geocoder.geocode('29 champs elysée paris', function(err, response) {
  //   return res.send(response);
  // });
  geocoder.reverse({
      lat: 45.767,
      lon: 4.833
    })
    .then(function(response) {
      return res.send(response[0]["country"]);
    })
    .catch(function(err) {
      console.log(err);
    });




});




router.post('/test', (req, res) => {


  var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDKp3JCvoBPEV-zicOFHNv0shpg9CzJvkY', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);
  // geocoder.geocode('29 champs elysée paris', function(err, response) {
  //   return res.send(response);
  // });
  geocoder.reverse({
      lat: req.body.lat,
      lon: req.body.lng
    })
    .then(function(response) {

      // return res.send(response);
      lat_detailModel.find({
        content: {
          "$regex": response[0]['city'],
          "$options": "i"
        }
      }, function(err, lat_detail) {
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



    })
    .catch(function(err) {
      console.log(err);
    });

  // res.send(req.body)
})




router.get('/locationBasesLatest/:id', (req, res) => {

  var id = req.params.id;
  latestModel.findOne({
    _id: id
  }, function(err, latest) {
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

})




router.get('/search', (req, res) => {
  worldModel.find(function(err, worlds) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting sports.',
        error: err
      });
    }
    return res.render('sports', {
      posts: worlds,
      trendings: worlds,
      category: "world",
      randomImage: "world,student"
    });
  });

})

router.get('/find', (req, res) => {

  lat_detailModel.find({
    content: {
      "$regex": "islamabad",
      "$options": "i"
    }
  }, function(err, lat_detail) {
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



})






// /* GET home page. */
// router.get('/', function(req, res, next) {
//   newsModel.find(function (err, allnews) {
//       if (err) {
//           return res.status(500).json({
//               message: 'Error when getting car.',
//               error: err
//           });
//       }
//       var news = allnews
//
//
//       latestModel.find(function (err, alllatests) {
//           if (err) {
//               return res.status(500).json({
//                   message: 'Error when getting sports.',
//                   error: err
//               });
//           }
//           var latests = alllatests
//           return res.render('index',{ posts: allnews,trendings:latests,category:"latest",randomImage:"lahore"});
//       });
//
//       // res.render('index', { posts: news,
//       //   rehman: "malik"
//       //  });
//       // return res.json(cars);
//   });
//
// });



module.exports = router;
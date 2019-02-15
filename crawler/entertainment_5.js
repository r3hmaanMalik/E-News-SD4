//LATEST NEWS


const request = require('request');
const cheerio = require('cheerio');
const mongodb = require('mongodb');
// Write Header
var title, discrp, imglink, newslink;

request('https://images.dawn.com/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    var MongoClient = require('mongodb').MongoClient,
      assert = require('assert');
    // Connection URL
    var url = 'mongodb://localhost:27017/';
    // Creations
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("razakDb");
      $('article.box.story.mb-4.pb-4').each((i, el) => {
        title = $(el).find('a.story__link').text();
        discrp = $(el).find('div.story__excerpt').text();
        newslink = $(el).find('div.media__item > a').attr('href');
        imglink = $(el).find('div.media__item > a > img').attr('src');

        var post = {
          title: title,
          discription: discrp,
          newslink: newslink,
          ilink: imglink
        }
        dbo.collection("entertainment").insertOne(post, function(err, res) {
          if (err) throw err;
          console.log(i + "inserted");

        });
      });
      db.close();
    });
  }
});
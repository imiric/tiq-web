var fs = require('fs'),
    async = require('async'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;

var dbPort = fs.readFileSync('app/.meteor/local/db/METEOR-PORT', 'utf8');
var db = new Db('meteor', new Server('localhost', dbPort));

module.exports = {
  baseUrl: 'http://localhost:3000',
  placeholders: {
    text: {sel: '.text.placeholder', value: 'add text'},
    tag:  {sel: '.tag.placeholder',  value: 'add tag'}
  },
  beforeEach: function(client, done) {
    console.log('>>> Clearing test collections');
    db.open(function(err, db) {
      db.collections(function(err, collections) {
        async.each(collections, function(collection, cb) {
          if (collection.collectionName.indexOf('system') === 0) {
            return cb();
          }
          collection.remove(cb);
        }, function() {
          db.close();
          done();
        });
      });
    });
  }
}

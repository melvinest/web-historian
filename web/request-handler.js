var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var indexContent;
  fs.readFile(archive.paths.siteAssets + '/index.html', (err, data) => {
    if (err) { 
      throw err;
    }
    indexContent = data;
    res.end(indexContent);
  });
};

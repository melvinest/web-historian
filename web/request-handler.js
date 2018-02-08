var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var queryString = require('query-string');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var indexContent;
  var path;

  if (req.method === 'GET') {
    
    if (req.url === '/') {
      path = archive.paths.siteAssets + '/' + 'index.html';
    } else if (req.url === '/loading.html') {
      path = archive.paths.siteAssets + '/' + 'loading.html';
    } else {
      path = archive.paths.archivedSites + req.url;  
    } 
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) { 
        res.writeHead(404);
        res.end();
      }
      
      indexContent = data;
      res.end(indexContent);
    });
  }

  if (req.method === 'POST') {
    var body = [];
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      body = queryString.parse(body[0]);
      var location;

      archive.isUrlArchived(body.url, function(isArchived) {
        if (isArchived) {
          res.writeHead(302, {
            Location: body.url
          });
          res.end();
        } else {
          archive.addUrlToList(body.url, function() {
            res.writeHead(302, {
              Location: 'loading.html' 
            });
            res.end(); 
          }); 
        }
      });
    });     
    
  }
  
};

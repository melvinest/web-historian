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
    } else {
      path = archive.paths.archivedSites + req.url;  
    } 

    fs.readFile(path, (err, data) => {
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
      archive.addUrlToList(body.url + '\n', function() {
        res.writeHead(302);
        res.end();
      }); 
    });     
    
  }
  
};

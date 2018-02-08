var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    var urlArray;
    if (data.length === 0) {
      urlArray = [];
    } else {
      urlArray = data.split('\n');
    }
    
    
    
    callback(urlArray);
  });
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(function(urlArray) {
    var check = _.contains(urlArray, url);
    callback(check, urlArray);
  });
};

exports.addUrlToList = function(url, callback) {
  this.isUrlInList(url, (check, urlArray) => {
    if (!check) {
      urlArray.push(url);
      var urlString = urlArray.join('\n');
      fs.writeFile(this.paths.list, urlString);
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile(this.paths.archivedSites + '/' + url, (err, data) => {
    var check;
    if (err) {
      check = false;
    } else {
      check = true;  
    }
    callback(check);
  });
};

exports.downloadUrls = function(urls) {

  for (var i = 0; i < urls.length; i++) {
    var options = {
      hostname: urls[i],
      method: 'GET',
    };
    
    var body = [];
    var req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {        
        fs.writeFile(this.paths.archivedSites + '/' + options.hostname, body);
      });
    });

    req.end();

  }
  
};

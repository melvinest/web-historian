// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');
var fs = require('fs');
var CronJob = require('cron').CronJob;
console.log('working');
// new CronJob('* * * * * *', function() {
//   archive.readListOfUrls(function(urls) {
//     console.log('working too');
//     archive.downloadUrls(urls);
//     fs.writeFile(archive.paths.list, '');
//   });
// });




archive.readListOfUrls(function(urls) {
  console.log('working too');
  console.log(urls);
  archive.downloadUrls(urls);
  fs.writeFile(archive.paths.list, '');
});

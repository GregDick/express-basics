var loggly = require('loggly');

function logger (tag){
  var client = loggly.createClient({
    token: 'f05cf77d-a401-4704-8a65-7574f901db83',
    subdomain: 'gregdick',
    tags: ['NodeJS', tag],
    json: true
  });
  return client;
}

module.exports = logger;

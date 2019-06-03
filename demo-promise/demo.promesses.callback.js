const request = require('request');

function searchByName(nom, callback) {
  request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nom}`, {
    json: true
  }, (err, res, body) => {
    callback(body);
  });
}

searchByName('Marty', (resultat) => console.log(resultat));

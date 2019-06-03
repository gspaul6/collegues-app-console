const request = require('request');

function searchByName(nom) {

  return new Promise((resolve, reject) => {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nom}`, {
      json: true
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }

    });
  });

}

const promise$ = searchByName('Marty');

promise$
  .then(tabMatricules => console.log('Matricules trouvés', tabMatricules))
  .catch(err => console.log('OOps', err));

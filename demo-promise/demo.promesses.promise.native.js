const request = require('request-promise-native');

function searchByName(nom) {
  return request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nom}`, {
    json: true
  });
}

const promise$ = searchByName('Marty');

promise$
  .then(tabMatricules => console.log('Matricules trouvés', tabMatricules))
  .catch(err => console.log('OOps', err));

promise$
  .then(tabMatricules => console.log('Matricules trouvés', tabMatricules),
    (err => console.log('OOps', err)));

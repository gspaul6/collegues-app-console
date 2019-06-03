const request = require('request-promise-native');

const tabMatricules = ['9cbeb07c-5b79-4ef8-89de-39730e014d06',
  'e74cf3e7-df6a-47b3-a459-3cdbd619108f'
];

const tabPromesses1 = [];

tabMatricules.forEach(matricule => {

  const unePromise$ = request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, {
    json: true
  });

  tabPromesses1.push(unePromise$);

});

const tabPromesses2 = tabMatricules.map(matricule => request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, {
  json: true
}));

Promise.all(tabPromesses2)
  .then(tabResultats => {
    tabResultats.forEach(col => console.log(col.email));
  });

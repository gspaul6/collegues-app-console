const rechercher = (nom) => {
  console.log('Nom=', nom);

};

rechercher('Hii');

function search(nom, callback) {
  callback(nom);
}

search('Hii', function (resultat) {

});

search('Hii', (resultat) => {
  console.log(resultat)
});

search('Hii', (resultat) => console.log(resultat));

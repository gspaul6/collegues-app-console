var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback) {

    request('https://paul-collegues-api.herokuapp.com/collegues?nom=Marty', { json: true }, function(err, res, body) {

        
        var tableauColleguesTrouves = body;

        callback(tableauColleguesTrouves); // retour du résultat
    });

}

function rechercherColleguesParNom(nomRecherche, callback) {

    request('https://paul-collegues-api.herokuapp.com/collegues/matricule', { json: true }, function(err, res, body) {

        
        var tableauColleguesTrouvesParMatricule = body;

        callback(tableauColleguesTrouvesParMatricule); // retour du résultat
    });

}

exports.rechercherParNom=rechercherColleguesParNom();
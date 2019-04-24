var request = require('request');


function rechercherColleguesParNom(nomRecherche, callbackOk, callbackNotOk) {

    var collegue = [];
    request('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true }, function (err, res, body) {

        var tableauColleguesTrouvesParNom = body;
        if (err) {
            callbackNotOk.err("you have an error");
        }

        collegue.push(body);


        callback(collegue); // retour du résultat
    });

}
function rechercherColleguesParNom2(nomRecherche, callback, callbackErr) {
    request(`https://paul-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {
        json: true
    }, (err, res, body) => {
        if(err){callbackErr('error is there',err)}
        var tabMatricules = body;
        function trouverCollegues(tabMats, tabResultats) {
            if (tabMats.length === 0) {
                callback([]);
            }
            var matricule = tabMats.pop();

            rechercherColleguesParMatricule(matricule, (collegueTrouve) => {
                tabResultats.push(collegueTrouve);
                if (tabMats.length > 0) {
                    trouverCollegues(tabMats, tabResultats);
                } else {
                    callback(tabResultats);
                }
            });

        }
        trouverCollegues(tabMatricules, []);
    });
}



function rechercherColleguesParMatricule(matriculeRecherche, callback) {

    request(`https://paul-collegues-api.herokuapp.com/collegues/${matriculeRecherche}`, { json: true }, function (err, res, body) {


        var tableauColleguesTrouvesParMatricule = body;

        callback(tableauColleguesTrouvesParMatricule); // retour du résultat
    });

}
function addCollegues(addCollegues, callback) {

    request.post('https://paul-collegues-api.herokuapp.com/collegues/', { json: true }, { body: myJSONObject }, function (err, res, body) {


        var tableauCollegues = res;

        callback(tableauCollegues); // retour du résultat
    });

}

exports.rechercherParNom2 = rechercherColleguesParNom2;
exports.rechercherParMatricule = rechercherColleguesParMatricule;
exports.addCollegues = addCollegues;
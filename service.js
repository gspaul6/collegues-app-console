var request = require('request');


function rechercherColleguesParNom(nomRecherche, callbackOk, callbackNotOk) {


    request('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true }, function (err, res, body) {

        var tableauColleguesTrouvesParNom = body;
        if (err) {
            callbackNotOk("you have an error");
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {

            callbackNotOK('Erreur dans les informations de la requête');

        } else if (res.statusCode >= 500 && res.statusCode <= 599) {

            callbackNotOK('Erreur côté serveur');

        } else {
            var tabMatricules = body;
            var collegue = [];
            var nbRequetesATraiter = tabMatricules.length;
            tabMatricules.forEach(matricule => {
                rechercherColleguesParMatricule(matricule, (collegueTrouve) => {
                    nbRequetesATraiter--; // ?

                    tableauCollegue.push(collegueTrouve);



                    if (nbRequetesATraiter === 0) {

                        callbackOK(tableauCollegue);

                    }
                })

            });
        }




        callback(collegue); // retour du résultat
    });

}
function rechercherColleguesParNom2(nomRecherche, callback, callbackErr) {
    request(`https://paul-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {
        json: true
    }, (err, res, body) => {
        if (err) { callbackErr('error is there', err); }
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
function addCollegues(myJSONObject) {

    request({

        url: `https://paul-collegues-api.herokuapp.com/collegues`,
    
        method: 'POST',
    
        json: true,
    
        body: myJSONObject,
    
      },  function (err, res, body) {

        if (err) { console.log('error is there', err); }
        console.info('POST result:\n', body);
    
       // callback(tableauCollegues); // retour du résultat
    });

   // request.post({ uri: 'https://paul-collegues-api.herokuapp.com/collegues', body: myJSONObject, json: true }, function (err, res, body) {

        //if (err) { console.log('error is there', err); }
       // console.info('POST result:\n', body);
    
       // callback(tableauCollegues); // retour du résultat
  //  });

}

exports.rechercherParNom2 = rechercherColleguesParNom2;
exports.rechercherParMatricule = rechercherColleguesParMatricule;
exports.addCollegues = addCollegues;
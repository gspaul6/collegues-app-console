const request = require('request-promise-native');


function rechercherColleguesParNom(nomRecherche, callbackOk, callbackNotOk) {


    request('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true }, (err, res, body) => {

        let tableauColleguesTrouvesParNom = body;
        if (err) {
            callbackNotOk("you have an error");
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {

            callbackNotOK('Erreur dans les informations de la requête');

        } else if (res.statusCode >= 500 && res.statusCode <= 599) {

            callbackNotOK('Erreur côté serveur');

        } else {
            let tabMatricules = body;
            let collegue = [];
            let nbRequetesATraiter = tabMatricules.length;
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
        let tabMatricules = body;
        function trouverCollegues(tabMats, tabResultats) {
            if (tabMats.length === 0) {
                callback([]);
            }
            let matricule = tabMats.pop();

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

function rechercherColleguesParNom3(nomRecherche) {
    return new Promise((resolve, reject) => {
        tabPromise = [];
        const MatriculesPromise$ = request('https://paul-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true });
        //tabPromise = [promise0,promise1]
        MatriculesPromise$
            .then(matricules => {
                matricules.forEach(matricule => { rechercherColleguesParMatricule2(matricule) 
                .then(tabPromise.push(matricule))
            });

        Promise.all(MatriculesPromise$).then(collegues => resolve(collegues)).catch(err => reject("there is an error with the recuperation"));
    }).catch(err => reject("error in code"));
});
}


function rechercherColleguesParMatricule2(matriculeRecherche) {
    return new Promise((resolve, reject) => {
        const objetCollegue$ = request(`https://paul-collegues-api.herokuapp.com/collegues/${matriculeRecherche}`, { json: true });
        if (objetCollegue$) {
            resolve(objetCollegue$);
        }
        else {
            reject("il y a un error");
        }


    });
}

function rechercherColleguesParMatricule(matriculeRecherche, callback) {

    request(`https://paul-collegues-api.herokuapp.com/collegues/${matriculeRecherche}`, { json: true }, (err, res, body) => {


        let tableauColleguesTrouvesParMatricule = body;

        callback(tableauColleguesTrouvesParMatricule); // retour du résultat
    });

}
function addCollegues(myJSONObject) {

    request({

        url: `https://paul-collegues-api.herokuapp.com/collegues`,

        method: 'POST',

        json: true,

        body: myJSONObject,

    }, function (err, res, body) {

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

exports.rechercherParNom3 = rechercherColleguesParNom3;
exports.rechercherParMatricule2 = rechercherColleguesParMatricule2;
exports.addCollegues = addCollegues;

// récupération du module `readline`
var readline = require('readline');
var moduleA = require('./service.js');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    console.log('choose an option, either 1 or 99');
    console.log('1. Rechercher un collègue par nom');
    console.log('2. Créer un collègue');
    console.log('3. Modifier lemail');
    console.log('4. Modifier la photo');
    console.log('99. Sortir');

    rl.question('enter an option :', function (demande) {
        if (demande == 1) {
            console.log(">> Recherche en cours du nom xxx");
            rl.question('give the nom : ', function (getNom) {
                moduleA.rechercherParNom2(`${getNom}`, (resp) => {
                    resp.forEach(collegue => {
                        console.log(`${collegue.nom } ${collegue.prenoms } (${collegue.dateDeNaissance})`);

                    });
                    //    moduleA.rechercherParNom(`${getNom}`, (resp)=>{
                    //      return moduleA.rechercherParMatricule(resp, (collegues) => {
                    //        return console.log(collegues['nom'] + ' ' + collegues['prenoms'] + ' ' + collegues['dateDeNaissance']);
                    //  });
                start();
                }, (messageErr) => {

                    console.log('OOps :', messageErr);
          
                    start();
                });
                

            });

        }
        else if (demande == 2) {
            function Collegue(nom,prenoms,dateDeNaissance,photoUrl,email){
                this.nom=nom;
                this.prenoms=prenoms;
                this.dateDeNaissance=dateDeNaissance;
                this.photoUrl=photoUrl;
                this.email=email;
                    //return this.nom+''+this.prenom;
                }
            rl.question('enter the nom :', function (nomAsked){
                rl.question('enter the prenom :', function (prenomAsked){
                    rl.question('enter the date of birth :', function (dateAsked){
                        rl.question('enter the email :', function (emailAsked){
                            rl.question('enter the photo with http:// :', function (photoAsked){
                                var newCollegue=new Collegue(nomAsked,prenomAsked,dateAsked,photoAsked,emailAsked);
                                moduleA.addCollegues(newCollegue);
                            });
                        });
                    });
                });
            });

        }
        else if (demande == 99) {
            console.log("Aurevoir :-)");
            rl.close();
        }

    });
}

exports.start = start;
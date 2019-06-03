// récupération du module `readline`
const readline = require('readline');
const moduleA = require('./service.js');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    console.log('choose an option, either 1 or 99'+"\n"
                + '1. Rechercher un collègue par nom' +"\n"
                + '2. Créer un collègue' +"\n"
                + '3. Modifier lemail'+"\n"
                + '4. Modifier la photo' +"\n"
                + '99. Sortir');
       rl.question('enter an option :',  (demande)=> {
        if (demande == 1) {
            console.log(">> Recherche en cours du nom xxx");
            rl.question('give the nom : ',  (getNom)=> {
               let nomreseacrh$= moduleA.rechercherParNom3(`${getNom}`, (collegues) => {
                    collegues.forEach(collegue => {
                        console.log(`${collegue.nom } ${collegue.prenoms } (${collegue.dateDeNaissance})`);

                    });
                    //    moduleA.rechercherParNom(`${getNom}`, (resp)=>{
                    //      return moduleA.rechercherParMatricule(resp, (collegues) => {
                    //        return console.log(collegues['nom'] + ' ' + collegues['prenoms'] + ' ' + collegues['dateDeNaissance']);
                    //  });
                start();
                 //(messageErr) => {

                    //console.log('OOps :', messageErr);
          
                   // start(); }
                }).catch(err=>console.log(err));
                

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
            rl.question('enter the nom :',  (nomAsked)=>{
                rl.question('enter the prenom :', (prenomAsked)=>{
                    rl.question('enter the date of birth :', (dateAsked)=>{
                        rl.question('enter the email :', (emailAsked)=>{
                            rl.question('enter the photo with http:// :', (photoAsked)=>{
                                let newCollegue=new Collegue(nomAsked,prenomAsked,dateAsked,photoAsked,emailAsked);
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
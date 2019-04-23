// récupération du module `readline`
var readline = require('readline');
var moduleA = require('./service.js');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start(){
    console.log('choose an option, either 1 or 99');
    console.log('1. Rechercher un collègue par nom');
    console.log('99. Sortir');
    
    rl.question('enter an option :', function(demande){
if (demande==1){
    console.log(">> Recherche en cours du nom xxx");
    moduleA.rechercherParNom('xxxxx', function(colleguesTrouves){

        // affichage du tableau des collègues trouvés
        console.log(colleguesTrouves);
    
    });
    }
    else if (demande==99){
        console.log( "Aurevoir :-)");
    }
    
    rl.close();
    });
}

exports.start=start;
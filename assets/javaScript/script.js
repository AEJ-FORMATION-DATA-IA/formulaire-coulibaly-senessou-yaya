// declaration des balise
let frm =  document.getElementById('frm');
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let div3 = document.createElement('div');
let div4 = document.createElement('div');
let div5 = document.createElement('div');
let div6 = document.createElement('div');
let div7 = document.createElement('div');
// balise input
let nom =  document.createElement('input');
let prenom = document.createElement('input');
let date  = document.createElement('input');
let oui = document.createElement('input');
let non = document.createElement('input');
let select = document.createElement('select');
let option1 = document.createElement('option');
let option2 = document.createElement('option');
let br = document.createElement('br');
let commentaire = document.createElement('textarea');
let numero = document.createElement('input');
let bouton = document.createElement('input');
// balise Label
let labelNom = document.createElement('label');
let labelPrenom  = document.createElement('label');
let labelDate  = document.createElement('label');
let labelGenre  = document.createElement('label');
let labelStatus  = document.createElement('label');
let labelNon  = document.createElement('label');
let labelOui  = document.createElement('label');
let labelNumero = document.createElement('label');
let labelHandicap = document.createElement('label');

//association d'attribut
nom.type = 'text';
nom.pattern = '[A-Za-z]{2,}';
nom.id = 'nom';
nom.name = 'nom';
nom.className = 'champ';
nom.required = 'required';
nom.title ='pas de caractères spéciaux, minimum 2 caractères';
//prenom
prenom.type = 'text';
prenom.id = 'prenom';
prenom.name = 'prenom';
prenom.pattern = '[A-Za-z]{2,}';
prenom.required = 'required';
prenom.title = 'pas de caractères spéciaux, minimum 2 caractères';
prenom.className = 'champ';
//date
date.type = 'date';
date.id = 'date';
date.name = 'date';
date.value = '2000-01-01';
date.className = 'champ';
//option
option1.value = 'Homme';
option2.value = 'Femme';
//bouton radio
oui.type = 'radio';
oui.name = 'handicap';
oui.value = 'oui';
non.type = 'radio';
non.required = 'required';
non.name = 'handicap';
non.value = 'non';
//numero
numero.type = 'tel';
numero.name = 'numero';
numero.pattern = '[0-9]{8,}'
numero.required = 'required';
numero.className = 'champ';
//commentaire
commentaire.style.display = 'none';
commentaire.style.resize = 'none';
commentaire.name = 'commentaire';
commentaire.id = 'descript';
commentaire.required = 'required';
commentaire.cols = '70';
//bouton de validation
bouton.type = 'submit';
bouton.className = 'champ';
//ajouter du texte dans les balise 
labelNom.innerHTML = 'Nom (*)';
labelPrenom.innerHTML = 'Prenom (*)'
labelDate.innerHTML = 'Date (*)';
labelGenre.innerHTML = 'Genre (*)';
labelStatus.innerHTML = "Status de l'handicap (*)";
labelStatus.id = 'choix';
option1.innerHTML = 'Homme';
option2.innerHTML = 'Femme';
labelNon.innerHTML = 'NON';
labelOui.innerHTML = 'OUI';
labelNumero.innerHTML = 'Numéro (*)';
labelHandicap.innerHTML = "description de l'handicap (*)";
labelHandicap.style.display = 'none';

//inserer les elements enfants des balises
select.appendChild(option1);
select.appendChild(option2);

div1.appendChild(labelNom);
div1.appendChild(nom);
div2.appendChild(labelPrenom);
div2.appendChild(prenom);
div3.appendChild(labelDate);
div3.appendChild(date);
div4.appendChild(labelGenre);
div4.appendChild(select);
div5.appendChild(labelStatus);  
div5.appendChild(br);  
div5.appendChild(labelNon);
div5.appendChild(non);
div5.appendChild(labelOui);
div5.appendChild(oui);
div6.appendChild(labelNumero);
div6.appendChild(numero);

//afficher la balise dans le formulaire
frm.appendChild(div1);
frm.appendChild(div2);
frm.appendChild(div3);
frm.appendChild(div4);
frm.appendChild(div5);
frm.appendChild(labelHandicap);
frm.appendChild(commentaire);
frm.appendChild(div6);
frm.appendChild(bouton);

//Evenement des boutons radio
oui.addEventListener('click', function() {
    commentaire.style.display = 'block';
    labelHandicap.style.display = 'block';
}, false);
non.addEventListener('click', function() {
    commentaire.style.display = 'none';
    labelHandicap.style.display = 'none';
}, false);

// calculer de l'age et afficher l'alert
let elemtDate = document.getElementById('date');

elemtDate.addEventListener('input', () => {
    let dateFrm = new Date(date.value);
    let recupAnneFrm = Number(dateFrm.getFullYear());
    let dateDuJour = new Date();
    let recupAnneActuel = Number(dateDuJour.getFullYear());
    let age = recupAnneActuel - recupAnneFrm;
    if( age >= 16) {
        alert('votre cas est critique');
    }
    else {
        alert('vous êtes trop jeûne pour avoir un handicap');
    }
}, false);


/* 
  Desativer le bouton de formulaire et validation des champ de sassir
*/

//selection tous les objet input avec attribut required 
let fields = document.querySelectorAll('input[required]');
let msgTextarea = document.getElementById('descript');


//supprimer le message de validation en cliquant sur le champ et verifier la validation du champ en quitant le champ
fields.forEach((field) => {
    field.addEventListener('focus', () => {resetField(field)}, false);
    field.addEventListener('blur', () => {validationField(field)}, false);
});


//verification de tout les champ du formulaire en apuyant sur le boutton submit
frm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //supprimer le message de validation apres avoir clické sur la bonton submit
    fields.forEach((field) => {
        resetField(field);
    });

    //verification des champ de formulaire
    let valid = true;
    fields.forEach(field => {
        if(! validationField(field)) {
            valid = false;
        }
    });
    if(valid) {
        e.target.submit();
    }

}, false);

//function de validation de chaque champ
function validationField(field) {
    if(field.checkValidity()) {
        return true;
    } else {
        //ajouter une classe de bordure rouge quand le formulaire est pas valider
        msgTextarea.classList.add('invalid');
        field.classList.add('invalid');
        //afficher message de validation 
        if(! msgTextarea.checkValidity()) {
            msgTextarea.previousElementSibling.insertAdjacentHTML('beforeend', `<span class='msg'>${msgTextarea.validationMessage}</span>`);
        }
        field.previousElementSibling.insertAdjacentHTML('beforeend', `<span class='msg'>${field.validationMessage}</span>`);
        return false;
    }
}

//function de supprimer les message de validation
function resetField(field){
    let fieldLabel = field.previousElementSibling;
    field.classList.remove('invalid');
    
    while((fieldLabel.firstElementChild)) {
        fieldLabel.removeChild(fieldLabel.firstElementChild);
    }
    let labelTextarea = msgTextarea.previousElementSibling;
    msgTextarea.classList.remove('invalid');
    while(labelTextarea.firstElementChild) {
        labelTextarea.removeChild(labelTextarea.firstElementChild);
    }
    field.valid = true;
}


/*fetch("donne.json")
    .then(responsale => console.log(responsale));*/

//JSON 
    /*let dataNom = document.getElementById('nom').value;
    let dataPrenom = document.getElementById('prenom').value;
        sessionStorage.setItem("Nom", dataNom);
        sessionStorage.setItem("Prenom", dataPrenom);*/

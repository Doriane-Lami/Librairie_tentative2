<script setup>
const emit = defineEmits(["getL"]);

import { reactive, onMounted } from "vue";
import Livre from "../Livre";
import Ajout_View from "@/components/Ajout_View.vue";
import StockView from "@/components/StockView.vue";
const listeL = reactive([]);

// -- l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/22/livres";

// -- req AJAX pour récupérer les todos
//    et les stocker dans le state listeC
document.getElementById("livres").addEventListener("click", getLivres);

function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // -- vider la liste des choses
        listeL.splice(0, listeL.length);
        // pour chaque donnée renvoyée par l'API
        //  créer un objet instance de la classe Chose
        //  et l'ajouter dans la liste listeC
        dataJSON.forEach((v) =>
            listeL.push(new Livre(v.id, v.titre, v.qtestock, v.prix))
        );
        let resHTML = ""; // variable pour contenir le html généré
        for (let l of listeL) {
          // boucle sur le tableau des livres
          resHTML = resHTML + "<li>" + l.titre + "</li>";
        }
        // insérer le HTML dans la liste "les_livres" <ul></ul> indiquée dans le template
        document.getElementById("les_livres").innerHTML = resHTML;
      })
      .catch((error) => console.log(error));
}

function handlerAdd(titre, qtestock, prix) {
  console.log(titre);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(myHeaders);
  // --  le libelle de la nouvelle chose est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: titre, qtestock: qtestock, prix: prix }),
  };
  fetch(url, fetchOptions)
      .then((response) => {
        console.log("coucou3");
        return response.json();
      })
      .then((dataJSON) => {
        console.log("coucou4");
        console.log(dataJSON);
        getLivres();
      })
      .catch((error) => console.log(error));
}

function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id de la chose à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        getLivres();
      })
      .catch((error) => console.log(error));
};



onMounted(getLivres);

</script>

<template>
  <h3>Ajouter un livre à notre collection</h3>
  <Ajout_View @addL="handlerAdd"></Ajout_View>
  <StockView @deleteL="handlerDelete"></StockView>

</template>

<style scoped>
h3{
  color: rgb(171, 39, 79);
}


</style>

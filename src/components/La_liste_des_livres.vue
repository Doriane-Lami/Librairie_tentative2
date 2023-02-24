<template>
  <ul id="les_livres"></ul>

</template>

<script setup>
//export default {
  //name: "La_liste_des_livres.vue"
//}

import {onMounted, reactive} from "vue";
import Livre from "@/Livre";

let livres = reactive([]);

const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/22/livres";

// la fonction récupère les titres des livres et les affiche
function listeLivres() {
  // url de l'API qui permet de récupérer les livres
  let fetchOptions = {method: "GET"}; //On utilise GET pour collecter des données de l'API
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json(); // données format JSON
      })
      .then((dataJSON) => {
        console.log("test2");
        livres = dataJSON; // les livres ne sont dans aucune sous catégorie de l'API
        let resHTML = ""; // variable pour contenir le html généré
        for (let l of livres) {
          // boucle sur le tableau des livres
          resHTML = resHTML + "<li>" + l.titre + "</li>";
        }
        // insérer le HTML dans la liste "les_livres" <ul></ul> indiquée dans le template
        document.getElementById("les_livres").innerHTML = resHTML;
      })
      .catch((error) => {
        console.log(error);
      });
}

let listeL = reactive([]);
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

onMounted(getLivres);
</script>

<style scoped>

</style>
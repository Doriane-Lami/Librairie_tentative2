<script setup>

import {onMounted, reactive} from "vue";

const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/22/livres";
let livres = reactive([]);
function rechercherLivre(){
  const fetchOptions = { method: "GET" };
  // récupérer la valeur saisie dans la zone de texte
  let titre = document.getElementById("title").value;
  console.log(titre);
  // --- la valeur saisie doit être ajoutée à la fin de l'URL
  fetch(url + "?search=" + titre, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        livres = dataJSON; // les personnes sont le tableau "results"
        let resultHTML = "";
        for (let l of livres) {
          resultHTML = resultHTML + "<li>" + l.titre + "</li>";
        }
        document.getElementById("les_livres").innerHTML = resultHTML;
      })
      .catch((error) => console.log(error));
}
onMounted(rechercherLivre);
</script>

<template>
  <div id="recherche">
    <div id="champ_recherche"></div>
    <div id="boutton_recherche"></div>
  </div>
  <input type='text' id='title' placeholder='titre du livre recherché'/>
  <button @click="rechercherLivre">Chercher les livres</button>
</template>

<style>
#les_livres li {
  list-style: none;
}

img {
  width: 100%;
  height: auto;
}
</style>

<template>
  <StockView
      @plus="plusStock"
      @moins="moinsStock"
  />

</template>

<script setup>
import StockView from "./StockView.vue";
import Livre from "@/Livre";
import {reactive} from "vue";
defineProps(["leLivre"]);

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
      })
      .catch((error) => console.log(error));
}


function plusStock(leLivre){
  console.log(leLivre);
  leLivre.incrementerStock();
  console.log(leLivre.qtestock);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: leLivre._id,
      titre: leLivre._titre,
      qtestock: leLivre._qtestock,
      prix: leLivre._prix,
    }),
  };
  // -- la req AJAX
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        getLivres();
      })
      .catch((error) => console.log(error));
}

function moinsStock(leLivre){
  console.log(leLivre);
  leLivre.decrementerStock();
  console.log(leLivre.qtestock);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: leLivre._id,
      titre: leLivre._titre,
      qtestock: leLivre._qtestock,
      prix: leLivre._prix,
    }),
  };
  // -- la req AJAX
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        getLivres();
      })
      .catch((error) => console.log(error));
}
</script>

<style scoped>

</style>
<template>
  <StockView
      @plus="plusStock"
      @moins="moinsStock"
  />

</template>

<script setup>
import StockView from "./StockView.vue";
import Modifier_collection from "@/components/Modifier_collection.vue";
import {onMounted} from "vue";

defineProps(["leLivre"]);

const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/22/livres"

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
  if(leLivre.qtestock === 0){
    handlerDelete(leLivre.id);
  }
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

onMounted(getLivres);
</script>

<style scoped>

</style>
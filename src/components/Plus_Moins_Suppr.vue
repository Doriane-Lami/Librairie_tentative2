<template>
  <StockView @plus="plusStock(livre)"></StockView>
  <StockView @moins="moinsStock"></StockView>

</template>

<script setup>
import StockView from "./StockView.vue";

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
        chargeProduits();
      })
      .catch((error) => console.log(error));
}

function moinsStock(leLivre){
  console.log(leLivre);
  leLivre.decrementerStock();
  console.log(leLivre.qtestock);

  if(leLivre.qtestock == 0){
    emit("deleteL", leLivre.id);
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
        chargeProduits();
      })
      .catch((error) => console.log(error));
}
</script>

<style scoped>

</style>
<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre";
const emit = defineEmits(["deleteL", "plus", "moins"]);

let data = reactive({
  // La liste des produits affichée sous forme de table
  listeLivres: {},
});

const url ="https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/22/livres";

function chargeProduits() {
  let fetchOptions = { method: "GET" }; //On utilise GET pour collecter des données de l'API
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json(); // données format JSON
      })
      .then((dataJSON) => {
        data.listeLivres = dataJSON; // les livres ne sont dans aucune sous catégorie de l'API
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


// A l'affichage du composant, on affiche la liste
onMounted(getLivres);

</script>

<template>
  <main>
    <div>
      <table>
        <caption>
          Liste des livres
        </caption>
        <tr>
          <th>Id</th>
          <th>Titre</th>
          <th>Quantité en stock</th>
          <th>Arrivage</th>
          <th>Vente</th>
          <!-- Si le tableau des produits est vide -->
        </tr>
        <tr v-if="!data.listeLivres">
          <td colspan="5">Veuillez patienter, chargement des livres...</td>
        </tr>
        <!-- Si le tableau des produits n'est pas vide -->
        <tr v-for="livre in data.listeLivres" :key="livre.id">
          <td>{{ livre.id }}</td>
          <td>{{ livre.titre }}</td>
          <td>{{ livre.qtestock }}</td>
          <td>
            <button @click="$emit('plus', livre)">
              Ajouter un exemplaire
            </button>
          </td>
          <td>
            <button @click="$emit('moins', livre)">
              Enlever un exemplaire
            </button>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>


<style scoped>
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #232623;
  color: rgb(255, 255, 255);
}
</style>

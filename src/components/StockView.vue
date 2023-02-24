<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre";
defineProps(["leLivre"]);

const emit = defineEmits(["plus", "moins"]);

const listeL = reactive([]);
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
        <tr v-if="!listeL">
          <td colspan="5">Veuillez patienter, chargement des livres...</td>
        </tr>
        <!-- Si le tableau des produits n'est pas vide -->
        <tr v-for="livre in listeL" :key="livre.id">
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

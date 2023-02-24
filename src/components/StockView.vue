<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre";
import Modifier_collection from "@/components/Modifier_collection.vue";
import Plus_Moins_Suppr from "@/components/Plus_Moins_Suppr.vue";

defineProps(["livre"]);


const emit = defineEmits(["deleteL", "plus", "moins"]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/22/livres"

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
          <th>Supprimer</th>
          <!-- Si le tableau des produits est vide -->
        </tr>
        <tr v-if="!listeL">
          <td colspan="6">Veuillez patienter, chargement des livres...</td>
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
          <td>
            <button @click="$emit('deleteL', livre.id)">Supprimer</button>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>


<style scoped>
caption{
  color :rgb(171, 39, 79);
  margin: 15px;
  font-size: 18px;
  font-weight: bold;
}
td,
th {
  border: 1px solid rgb(171, 39, 79);
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(171, 39, 79);
  color: rgb(255, 255, 255);
}

button{
  background-color: white;
  border: none;
}
</style>

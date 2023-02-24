<script setup>
import { ref } from "vue"

// -- donnée réactive pour la saisie du titre
const titre = ref("");
const qtestock = ref("");
const prix = ref("");

const emit = defineEmits(["addL"]);
</script>

<template>
  <form @submit.prevent="$emit('addL', titre, qtestock, prix)">
    <input type="text" v-model="titre" placeholder="titre de l'ouvrage" />
    <input
        type="number"
        v-model="qtestock"
        step="1"
        placeholder="quantité en stock"
    />
    <input
        type="number"
        v-model="prix"
        step="0.1"
        placeholder="prix unitaire"
    />
    <input id="ok" type="submit" value="valider" />
  </form>
</template>

<style scoped>
input{
  border: 1px solid rgb(171, 39, 79);
  text-align: center;
}

#ok{
  background-color: rgb(171, 39, 79);
}
</style>

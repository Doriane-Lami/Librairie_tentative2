<script setup>
import Accueil from "@/components/Accueil.vue";
import La_liste_des_livres from "@/components/La_liste_des_livres.vue";
import RechercheLivre from "@/components/RechercheLivre.vue";
import Modifier_collection from "@/components/Modifier_collection.vue";
import View_suppr_livre from "@/components/View_suppr_livre.vue";
import StockView from "@/components/StockView.vue";
import Plus_Moins_Suppr from "@/components/Plus_Moins_Suppr.vue";
</script>

<template>
  <Accueil />
  <RechercheLivre />
  <La_liste_des_livres/>
  <Modifier_collection />
  <Plus_Moins_Suppr ></Plus_Moins_Suppr>
</template>

<style>
</style>

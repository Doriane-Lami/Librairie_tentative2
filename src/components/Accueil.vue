<script></script>

<template>
  <body>
  <div id="app"></div>
  <h1 id="brand">Dodo's Library</h1>
  <header>
    <nav>
      <ul id="bandeau">
        <li id="livres">Nos livres</li>
        <li>
          Modifier notre collection
          <ul class="sous">
            <li id="ajout">Ajouter un livre</li>
            <li id="suppr">Supprimer un livre</li>
          </ul>
        </li>
        <li>
          Stock
          <ul class="sous">
            <li id="plus">Arrivage</li>
            <li id="moins">Vente</li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  <img
      id="etagere_livres"
      src="../assets/étagères.png"
      alt="illustration d'un mur d'étagères remplies de livres"
  />
  </body>
</template>

<style>

img {
  width: 100%;
  height: auto;
}

#brand {
  color: rgb(171, 39, 79);
  text-align: center;
  width: 100%;
  font-size: 40px;
}

/*BANDEAU*/

#bandeau {
  height: 47px;
  display: flex; /*répartit les titres sur toute la ligne du bandeau*/
  padding: 0px;
  background-color: white;
  width: 100%; /*s'étale sur toute la largeur de l'écran*/
  top: 0px; /* fixe le bandeau tout en haut de la page*/
  margin: 0 auto;
}

#bandeau li {
  flex: auto; /*met le texte du bandeau sur 1 ligne en créant des cases de différentes tailles*/
  list-style-type: none;
  text-align: center;
  line-height: auto;
  position: relative;
  display: block;
  border-bottom: 2px solid black;
  padding: 15px 0px;
  text-transform: uppercase;
  color: black;
}

#bandeau li:hover {
  color: rgb(171, 39, 79);
  border-bottom: 2px solid rgb(171, 39, 79);
}

nav #bandeau::after {
  display: table;
}

/*sous catégories du bandeau*/

nav ul li:hover .sous {
  display: block;
} /* affiche le sous menu quand la souri passe sur l'item titre */

.sous {
  display: none; /* cache le sous menu */
  text-align: center;
  position: absolute;
  z-index: 1000;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: 15px;
  padding: 0px;
}

.sous li {
  width: 100%;
  float: none;
}

#bandeau li .sous #suppr,
#bandeau li .sous #ajout,
#bandeau li .sous #plus,
#bandeau li .sous #moins {
  font-weight: normal;
  text-transform: capitalize;
  text-align: center;
  border-bottom: none;
  padding: 10px 0px;
}

#bandeau li .sous #suppr:hover,
#bandeau li .sous #ajout:hover,
#bandeau li .sous #moins:hover,
#bandeau li .sous #plus:hover {
  background-color: white;
  color: rgb(171, 39, 79);
  font-weight: bolder;
}
</style>

export default class Livre {
    constructor(id, titre, qtestock, prix) {
        this._titre = titre;
        this._qtestock = qtestock;
        this._prix = prix;
        this._id = id;
        //this._id = Date.now() + Math.floor(Math.random() * 10); // génération d'un id unique
    }

    get titre() {
        return this._titre;
    }

    get qtestock() {
        return this._qtestock;
    }

    get prix() {
        return this._prix;
    }

    get id() {
        return this._id;
    }

    // modifier le texte
    set titre(titre) {
        this._titre = titre;
    }

    incrementerStock() {
        this._qtestock = this._qtestock + 1;
    }

    decrementerStock() {
        this._qtestock = this._qtestock - 1;
    }

    pourAfficher() {
        return `${this._titre}`;
    }

}

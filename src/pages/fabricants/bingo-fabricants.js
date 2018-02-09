import {Element as PolymerElement, html} from "../../../node_modules/@polymer/polymer/polymer-element.js"
import { GestureEventListeners } from '../../../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../node_modules/@polymer/iron-icons/iron-icons.js';
import '../../../node_modules/@polymer/iron-icons/maps-icons.js';
import '../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import { BingoModele } from '../../bingo-modele.js';
import '../../bingo-styles.js';
import '../../bingo-icons.js';
import '../../bingo-case.js';
class BingoFabricants extends GestureEventListeners(BingoModele(PolymerElement)) {
  static get template() {
    return html`
    <style include="bingo-styles">
      :host {
        display: block;
        height: 100vh;
        overflow: hidden;
        box-sizing: border-box;
      }

      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        margin: auto;
      }

      .grid-item {
        background-color: #fff;
      }
    </style>

    <app-toolbar>
      <div main-title="">Fabricants de voiture</div>
      <paper-icon-button on-tap="reset" icon="bingo-icons:refresh"></paper-icon-button>
      <paper-icon-button on-tap="accueil" icon="bingo-icons:home"></paper-icon-button>
    </app-toolbar>

    <div id="bingo" on-tap="fermerBingo">
      <div>Bingo!
        <template is="dom-if" if="[[nbBingo]]">
          <sup style="font-size: 0.6em;">[[nbBingo]]</sup>
        </template>
      </div>
    </div>

    <form>
      <div class="grid-box unselectable">

        <template is="dom-repeat" items="[[lignes]]" as="ligne" index-as="l">
          <div class="grid-row">
            <template is="dom-repeat" items="[[colonnes]]" as="colonne" index-as="c">
              <bingo-case id="case-[[l]]-[[c]]" class="grid-item">
                <img src="[[_getImage(l, c, cases)]]">
              </bingo-case>
            </template>
          </div>
        </template>
      </div>
    </form>
`;
  }

  static get is() { return 'bingo-fabricants' }

  _getImage(ligne, colonne, cases) {
    return this._getCase(ligne, colonne, cases).image
  }

  getTypes() {
    let dossier = 'images/logo-voitures/118x118/'
    let types = [
      { image: dossier + 'Acura.png' },
      { image: dossier + 'Audi.png' },
      { image: dossier + 'BMW.png' },
      { image: dossier + 'Buick.png' },
      { image: dossier + 'Cadillac.png' },
      { image: dossier + 'Chevrolet.png' },
      { image: dossier + 'Dodge.png' },
      { image: dossier + 'Ford.png' },
      { image: dossier + 'GMC.png' },
      { image: dossier + 'Honda.png' },
      { image: dossier + 'Hyundai.png' },
      { image: dossier + 'Infiniti.png' },
      { image: dossier + 'Kia.png' },
      { image: dossier + 'Mazda.png' },
      { image: dossier + 'Mercedes-Bens.png' },
      { image: dossier + 'Mini.png' },
      { image: dossier + 'Mitsubishi.png' },
      { image: dossier + 'Nissan.png' },
      { image: dossier + 'Subaru.png' },
      { image: dossier + 'Toyota.png' },

      { image: dossier + 'Honda.png' },
      { image: dossier + 'Kia.png' },
      { image: dossier + 'Mazda.png' },
      { image: dossier + 'Nissan.png' },
      { image: dossier + 'Toyota.png' }
    ]

    let liste = []

    types.forEach(function (type) {
      type.nombre = type.nombre || 1
      for (let index = 0; index < type.nombre; index++) {
        liste.push(Object.assign({ random: Math.random() }, type))
      }
    }, this)

    if (liste.length !== 25) {
      throw new Error("Il n'y a pas 25 voitures! (" + liste.length + ')')
    }
    return liste
  }
}

window.customElements.define(BingoFabricants.is, BingoFabricants)

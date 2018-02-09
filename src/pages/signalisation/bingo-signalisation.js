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
class BingoSignalisation extends GestureEventListeners(BingoModele(PolymerElement)) {
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
        transition: all 1s;
        opacity: 0;
      }

      .anim img {
        opacity: 1;
      }

      .grid-item {
        background-color: #fff;
      }
    </style>

    <app-toolbar>
      <div main-title="">Signalisation</div>
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
      <div id="gridBox" class="grid-box unselectable">
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

  static get is() { return 'bingo-signalisation' }

  connectedCallback() {
    super.connectedCallback()

    setTimeout(x => {
      this.$.gridBox.classList.add('anim')
      // this.$.vroum.play()
    }, 300)
  }

  _getImage(ligne, colonne, cases) {
    return this._getCase(ligne, colonne, cases).image
  }

  getTypes() {
    let dossier = 'images/signalisation/115x115/'
    let types = [
      { image: dossier + '4Stops.png' },
      { image: dossier + '65kmh.png' },
      { image: dossier + 'Autoroute.png' },
      { image: dossier + 'BaliseDeDanger.png' },
      { image: dossier + 'BorneFontaine.png' },
      { image: dossier + 'Camion.png' },
      { image: dossier + 'Construction.png' },
      { image: dossier + 'Courbe.png' },
      { image: dossier + 'Courbe2.png' },
      { image: dossier + 'CourbeDroite.png' },
      { image: dossier + 'CourbeGauche.png' },
      { image: dossier + 'DoubleSens.png' },
      { image: dossier + 'Est.png' },
      { image: dossier + 'FinDeRoute.png' },
      { image: dossier + 'FlecheDroiteGauche.png' },
      { image: dossier + 'Hebergement.png' },
      { image: dossier + 'Hopital.png' },
      { image: dossier + 'Information.png' },
      { image: dossier + 'Jonction.png' },
      { image: dossier + 'Max60kmh.png' },
      { image: dossier + 'Max90.png' },
      { image: dossier + 'Max100.png' },
      { image: dossier + 'Ouest.png' },
      { image: dossier + 'Parc.png' },
      { image: dossier + 'PassagePieton.png' }
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

window.customElements.define(BingoSignalisation.is, BingoSignalisation)

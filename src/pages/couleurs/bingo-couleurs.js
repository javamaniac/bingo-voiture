import {Element as PolymerElement, html} from "../../../node_modules/@polymer/polymer/polymer-element.js"
import { GestureEventListeners } from '../../../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../node_modules/@polymer/iron-icons/iron-icons.js';
import '../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import { BingoModele } from '../../bingo-modele.js';
import '../../bingo-styles.js';
import '../../bingo-icons.js';
import '../../bingo-case.js';
/**
 * @mixins {BingoModele}
 */
class BingoCouleurs extends GestureEventListeners(BingoModele(PolymerElement)) {
  static get template() {
    return html`
    <style include="bingo-styles">
       :host {
        display: block;
        height: 100vh;
        overflow: hidden;
        box-sizing: border-box;
      }
      .car {
        align-self: center;
        margin: 0 9%;
      }

      .car-anim {
        animation-name: car;
        animation-duration: 0.5s;
        /* animation-delay: 2.5s; */
      }

      @keyframes car {
        from {
          /* margin-left: -200%; */
          transform: translate(-200%, 0);
        }
        to {
          /* margin-left: 0; */
          transform: translate(0, 0);
        }
      }

      .car-anim2 {
        animation-name: car2;
        animation-duration: 0.5s;
        /* animation-delay: 2.5s; */
        margin: 0 9%;
      }

      @keyframes car2 {
        from {
          transform: translate(-200%, 0);
        }
        to {
          transform: translate(0, 0);
        }
      }
    </style>

    <audio id="vroum">
      <source src="../sounds/vroom2.mp3" type="audio/mpeg">
    </audio>

    <!-- Déplacer dans un cmp -->
    <app-toolbar>
      <div main-title="">Couleurs</div>
      <paper-icon-button on-tap="reset" icon="bingo-icons:refresh"></paper-icon-button>
      <paper-icon-button on-tap="accueil" icon="bingo-icons:home"></paper-icon-button>
    </app-toolbar>

    <!-- Déplacer dans un cmp -->
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
              <bingo-case id="case-[[l]]-[[c]]" class="grid-item" couleur="[[_getCouleur(l, c, cases)]]">
                <iron-icon icon="bingo-icons2:voiture1" class="car car-anim" style\$="color: [[_getCouleur(l, c, cases)]]; flex:1;--iron-icon-height: 14vh;--iron-icon-width: 14vw;"></iron-icon>
              </bingo-case>
            </template>
          </div>
        </template>

      </div>
    </form>
`;
  }

  static get is() { return 'bingo-couleurs' }

  static get properties() {
    return {
      lignes: {
        value: []
      }
    }
  }

  animation() {
    this.shadowRoot.querySelectorAll('iron-icon').forEach((car) => {
      car.classList.remove('car-anim')
    })
    setTimeout(x => {
      this.shadowRoot.querySelectorAll('iron-icon').forEach((car) => {
        car.classList.add('car-anim')
      })
      this.$.vroum.pause()
      this.$.vroum.currentTime = 0
      this.$.vroum.play()
    }, 200)
    //wait
  }

  _getCouleur(ligne, colonne, cases) {
    return this._getCase(ligne, colonne, cases).couleur
  }

  connectedCallback() {
    super.connectedCallback()

    setTimeout(x => {
      this.set('lignes', [1, 2, 3, 4, 5])
      this.$.vroum.play()
    }, 200)
  }

  reset() {

    super.reset()
  }

  getTypes() {
    let types = [
      {
        nom: 'rouge',
        couleur: '#ce1a1a',
        nombre: 4
      },
      {
        couleur: 'white',
        nombre: 4
      },
      {
        couleur: 'black',
        nombre: 4
      },
      {
        // blue
        couleur: '#3131f1',
        nombre: 4
      },
      {
        // gray
        couleur: '#676767',
        nombre: 4
      },
      // {
      //   couleur: 'yellow',
      //   nombre: 2
      // },
      {
        // green
        couleur: '#216f21',
        nombre: 3
      },
      // {
      //   // rose
      //   couleur: '#c3358f',
      //   nombre: 2
      // },
      // {
      //   // brun
      //   couleur: '#775656',
      //   nombre: 2
      // },
      {
        couleur: 'orange',
        nombre: 2
      }
    ]

    let liste = []

    types.forEach(function (type) {
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

window.customElements.define(BingoCouleurs.is, BingoCouleurs)

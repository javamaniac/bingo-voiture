import {Element as PolymerElement, html} from "../node_modules/@polymer/polymer/polymer-element.js"
import '../node_modules/@polymer/paper-dialog/paper-dialog.js';
import '../node_modules/@polymer/paper-button/paper-button.js';
import '../node_modules/@polymer/paper-toggle-button/paper-toggle-button.js';
import { MixinState } from './bingo-state.js';
import { GestureEventListeners } from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
/* <link rel="import" href="../polymer/lib/elements/dom-if.html"> */
/* <link rel="import" href="../polymer/lib/elements/dom-repeat.html"> */
/* <link rel="import" href="../ower_components/polymer/lib/mixins/gesture-event-listeners.html"> */
class BingoPreferences extends MixinState(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      #settingsDialog {
        min-width: 300px;
        min-height: 200px;
      }

      .option {
        display: flex;
      }

      .option div {
        flex: 1;
      }
      .option paper-toggle-button {

      }
    </style>

    <paper-dialog id="settingsDialog">
      <h2>Préférences</h2>
      <div class="option">
        <div>Musique</div>
        <paper-toggle-button checked="{{preferences.musique}}"></paper-toggle-button>
      </div>
      <div class="option">
        <div>Debug</div>
        <paper-toggle-button checked="{{preferences.debug}}"></paper-toggle-button>
      </div>
      <div class="buttons">
        <paper-button dialog-confirm="">Fermer</paper-button>
      </div>
    </paper-dialog>
`;
  }

  static get is() { return 'bingo-preferences' }

  static get properties() {
    return {
      preferences: {
        type: Object
      }
    }
  }



  open() {
    console.log('Afficher les préférences')
    this.$.settingsDialog.open()
  }

  connectedCallback() {
    super.connectedCallback()
  }
}

window.customElements.define(BingoPreferences.is, BingoPreferences)

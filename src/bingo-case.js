import {Element as PolymerElement, html} from "../node_modules/@polymer/polymer/polymer-element.js"
import { GestureEventListeners } from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import './bingo-icons.js';
class BingoCase extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        height: 100vh;

        /* overflow: hidden; */
        box-sizing: border-box;
      }

      .x {
        /* color: #ce3737; */
        color: #eaeaea;
        width: 20%;
        transition: opacity 0.5s;
        opacity: 0;
        position: absolute;
        z-index: 10;
        filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
      }

      input[type=checkbox]:checked~label .x {
        /* display: inline-block; */
        opacity: 1;
      }

      /* .car, */
      ::slotted() iron-icon {
        transition: opacity 0.5s;
        flex: 1;
      }

      input[type=checkbox]:checked~label .car {
        /* display: none; */
        opacity: 0.5;
        /* -webkit-transform: rotateX(65deg);
        transform: rotateX(65deg); */
      }

      input[type=checkbox] {
        position: absolute;
        top: -9999px;
        left: -9999px;
        /* For mobile, it's typically better to position checkbox on top of clickable
        area and turn opacity to 0 instead. */
      }

      iron-icon {
        --iron-icon-height: 14vh;
        --iron-icon-width: 14vw;
      }

      input {
        display: none;
      }

      label {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: stretch;
        /* flex: 1; */
      }

      iron-icon {
        align-self: center;
      }
    </style>

    <input on-change="pop" id="i" type="checkbox">
    <label class="case iconSvg" for="i">
      <!-- <iron-icon icon="bingo-icons2:voiture1" xicon="maps:directions-car" class="car car-anim" style\$="color: [[couleur]]"></iron-icon>
      -->
      <slot></slot>
      <iron-icon icon="bingo-icons:clear" class="x"></iron-icon>
    </label>
`;
  }

  static get is() { return 'bingo-case' }

  static get properties() {
    return {
      couleur: {
        type: String
      },
      coche: {
        value: false,
        reflectToAttribute: true
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
  }

  pop(ev) {
    this.coche = ev.target.checked
    this.dispatchEvent(new CustomEvent('bingo-pop2', { bubbles: true, composed: true }))
  }

  reset() {
    this.$.i.checked = false
    this.coche = false
  }
}

window.customElements.define(BingoCase.is, BingoCase)

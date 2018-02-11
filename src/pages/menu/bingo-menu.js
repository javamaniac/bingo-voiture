import {Element as PolymerElement, html} from "../../../node_modules/@polymer/polymer/polymer-element.js"
import { GestureEventListeners } from '../../../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../../bingo-icons.js'; // bug avec Babel
import '../../bingo-styles.js'; // bug avec Babel
import '../../github-corners.js'; // bug avec Babel
import { MixinState } from '../../bingo-state.js';
class BingoMenu extends MixinState(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
    <style include="bingo-styles">
       :host {
        display: block;

        padding: 10px;
      }

      .icon-wrapper {
        display: inline-block;
        width: 20vw;
        height: 20vw;
        max-width: 150px;
        max-height: 150px;
      }

      .icon-wrapper .icon-bingo {
        width: 100%;
        /* FIX lighthouse best practice */
        max-width: 144px;
        max-height: 144px;
      }

      .titre {
        display: inline-block;
        position: absolute;
        margin: 10px 30px;
        font-size: 7vw;
        text-shadow: 5px 3px 19px #aaaaaa;
      }
      /*paper-button {
        background: #2f415f;
        color: aliceblue;
      }*/

      .bouton-menu {
        background: #2f415f;
        color: aliceblue;
        box-shadow: 1px 1px 2px black, 0 0 11px orange, 0 0 14px darkblue;
        display: inline-block;
        padding: 3px 20px;
        font-size: 1.2em;
        margin: 1px 0;
        cursor: pointer;
      }

      *.unselectable {
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;

        /* Introduced in IE 10.
           See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
        */
        -ms-user-select: none;
        user-select: none;
      }

      .bouton-droit {
        animation-name: bouton-droit;
        animation-duration: 0.5s;
      }

      .bouton-gauche {
        animation-name: bouton-gauche;
        animation-duration: 0.5s;
      }

      .bouton-quitter-droit {
        animation-name: bouton-quitter-droit;
        animation-duration: 0.5s;
      }

      .bouton-quitter-gauche {
        animation-name: bouton-quitter-gauche;
        animation-duration: 0.5s;
      }
      /* https://css-tricks.com/myth-busting-css-animations-vs-javascript/ */

      @keyframes bouton-droit {
        from {
          transform: translate(100vw, 0);
        }
        to {
          transform: translate(0, 0);
        }
      }

      @keyframes bouton-gauche {
        from {
          transform: translate(-100vw, 0);
        }
        to {
          transform: translate(0, 0);
        }
      }

      @keyframes bouton-quitter-droit {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(100vw, 0);
        }
      }

      @keyframes bouton-quitter-gauche {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(-100vw, 0);
        }
      }

      .icons {
        position: absolute;
        left: calc(100vw - 3% - 10px - -1px - 30px);
      }

      .icons iron-icon {
        --iron-icon-height: 30px;
        --iron-icon-width: 30px;
        cursor: pointer;
      }

      .icons iron-icon {
        display: block;
        margin-bottom: 10px;
      }
    </style>

    <audio id="musique" loop="">
      <source src="../sounds/beat.mp3" type="audio/mpeg">
    </audio>

    <github-corners href="https://github.com/javamaniac/bingo-voiture" style="margin: 0 0 0 -10px;" class="left" left="left"></github-corners>

    <div class="card unselectable">
      <div class="icons">
        <iron-icon on-tap="onSettings" icon="bingo-icons:settings"></iron-icon>
      </div>

      <h1>
        <div class="icon-wrapper">
          <img class="icon-bingo" src="images/manifest/icon-144x144.png">
        </div>
        <div class="titre">Bingo voiture</div>
      </h1>
      <div style="margin-bottom: 20px;" class="bouton bouton-droit">
        <div class="bouton-menu" on-tap="couleurs">Couleurs</div>
      </div>
      <div style="margin-bottom: 20px;" class="bouton bouton-gauche">
        <div class="bouton-menu" on-tap="immatriculation">Immatriculations</div>
      </div>
      <div style="margin-bottom: 20px;" class="bouton bouton-droit">
        <div class="bouton-menu" on-tap="signalisation">Signalisation</div>
      </div>
      <div style="margin-bottom: 20px;" class="bouton bouton-gauche">
        <div class="bouton-menu" on-tap="fabricants">Fabricants de voiture</div>
      </div>
      <div>[[version]]&nbsp;</div>
    </div>
`;
  }

  static get is() { return 'bingo-menu' }
  static get properties() {
    return {
      version: {
        value: ''
      },
      actif: {
        type: Boolean,
        observer: 'onActiveChanged'
      },
    }
  }

  static get observers() {
    return [
      'onMusiqueChange(preferences.musique)'
    ]
  }

  onMusiqueChange(musique) {
    if (musique) {
      this.$.musique.currentTime = 0
      if (!this.playPromise) {
        this.playPromise = this.$.musique.play()
      }
    } else {
      this.pauseMusique()
    }
  }

  onActiveChanged(actif) {
    if (actif && this.preferences.musique) {
      this.$.musique.currentTime = 0
      this.playPromise = this.$.musique.play()
    }
  }

  onSettings() {
    this.dispatchEvent(new CustomEvent('open-preferences', { bubbles: true, composed: true }))
  }

  connectedCallback() {
    super.connectedCallback()
    // const state = this.getState();

    this.afficherVersion()

    window.addEventListener('bingo-stopmusic', () => {
      this.pauseMusique()
    })
  }

  goto(route) {
    this.pauseMusique()
    history.pushState({route: route}, '', route)
    window.dispatchEvent(new CustomEvent('location-changed', {
      detail: {
        route: route
      }
    }))
  }

  pauseMusique() {
    if (this.playPromise !== undefined) {
      this.playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        // We can now safely pause video...
        this.$.musique.pause()
        this.$.musique.currentTime = 0
          })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  }

  couleurs() {
    this.goto('couleurs')
  }
  immatriculation() {
    this.goto('immatriculations')
  }
  signalisation() {
    this.goto('signalisation')
  }
  fabricants() {
    this.goto('fabricants')
  }

  quitterMenu(destination) {
    this.shadowRoot.querySelectorAll('.bouton').forEach((bouton, index) => {
      let isPair = index % 2
      bouton.classList.remove('bouton-droit')
      bouton.classList.remove('bouton-gauche')
      if (isPair) {
        bouton.classList.add('bouton-quitter-droit')
      } else {
        bouton.classList.add('bouton-quitter-gauche')
      }
    })
    setTimeout(() => {
      window.location = destination
    }, 500)
  }

  afficherVersion() {
    const me = this
    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
      const version = JSON.parse(this.responseText).version
      me.set('version', 'Version ' + version)
      // console.log(this.responseText);
    }
    oReq.open('GET', '../config.json')
    oReq.send()
  }
}

window.customElements.define(BingoMenu.is, BingoMenu)

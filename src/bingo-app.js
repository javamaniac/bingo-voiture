import {Element as PolymerElement, html} from "../node_modules/@polymer/polymer/polymer-element.js"
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/paper-toast/paper-toast.js';
import { setPassiveTouchGestures } from '../node_modules/@polymer/polymer/lib/utils/settings.js';
// // import { importHref } from '../node_modules/@polymer/polymer/lib/utils/import-href.js';
import { dom } from '../node_modules/@polymer/polymer/lib/legacy/polymer.dom.js';

import './bingo-carousel.js';
import './pages/menu/bingo-menu.js';
import './bingo-preferences.js';
import { MixinState } from './bingo-state.js';

// À rendre lazy
import './pages/couleurs/bingo-couleurs.js';
import './pages/immatriculations/bingo-immatriculations.js';
import './pages/signalisation/bingo-signalisation.js';
import './pages/fabricants/bingo-fabricants.js';
import './bingo-view404.js';

setPassiveTouchGestures(true)

class BingoApp extends MixinState(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        --app-primary-color: #2f415f;
        --app-secondary-color: black;

        display: block;
      }

      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }

      app-header {
        color: #fff;
        background-color: var(--app-primary-color);
      }

      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

      app-toolbar {
        color: #dadada;
        z-index: 200;
        /* Devant bingo-view */
      }

      .drawer-list {
        margin: 0 20px;
      }

      .drawer-list a {
        display: block;
        padding: 0 16px;
        text-decoration: none;
        color: var(--app-secondary-color);
        line-height: 40px;
      }

      .drawer-list a.iron-selected {
        color: black;
        font-weight: bold;
      }

      #xcontenu {
        opacity: 0;
        transition: all 0.5s ease-in;
      }

      #xcontenu:not(:empty) {
        /* height:100px; */
        opacity: 1;
      }

      @keyframes fadeIn {
        from {
          margin-left: -100%;
          opacity: 0;
        }
        to {
          margin-left: 0;
          opacity: 1;
        }
      }

      /* patch pour FF */

      bingo-carousel>*,
      bingo-menu,
      #contenu {
        width: 100vw;
        box-sizing: border-box;
      }

      a:link,
      a:visited,
      a:active {
        color: #a8b9d4;
      }

    </style>

    <bingo-state></bingo-state>

    <bingo-preferences id="preferences" preferences="{{preferences}}" on-open-preferences="openPreferences"></bingo-preferences>

    <!-- <paper-toast id="toast" text="Hello world!" opened></paper-toast> -->
    <paper-toast id="toastMajApplication" text="Une nouvelle version est disponible." duration="0">
      &nbsp;
      <a href="#" onclick="document.location.reload()">Recharger l'application</a>
    </paper-toast>

    <audio id="pop">
      <source src="../sounds/pop.mp3" type="audio/mpeg">
    </audio>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
    <bingo-carousel id="carousel" niveau="1">
      <bingo-menu></bingo-menu>
      <div id="contenu"></div>
    </bingo-carousel>
`;
  }

  static get is() {
    return 'bingo-app'
  }

  static get properties() {
    return {
      route: {
        observer: '_routeChanged'
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: String,
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,

      preferences: {
        type: Object
      }
    }
  }

  _routeChanged(route) {
    console.log('route:', route)
    if (history.state && history.state.route) {
      this._pageChanged(history.state.route)
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('open-preferences', () => {
      // FIXME ajouter un mask
      this.$.preferences.open()
    })
  }

  ready() {
    super.ready()
    this.addEventListener('bingo-pop', e => this._pop(e))

    window.addEventListener('majApplication', e => {
      this.$.toastMajApplication.opened = true
    })
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ]
  }

  _routePageChanged(page) {
    this.page = page || 'menu'
    this.dispatchEvent(new CustomEvent('change-page', {}))
  }

  _pop() {
    this.$.pop.currentTime = 0
    this.$.pop.play()
  }

  _pageChanged(page) {
    if (page === 'index.html') {
      return
    }

    if (page === 'menu') {
      this.$.carousel.niveau = 1
      this._insererElement('')
    } else {
      this.majDom(page)
      this.$.carousel.niveau = 2
    }
  }

  majDom(page) {
    // if elem courant a un animConfig exit, joue!
    // const pageCour = this.shadowRoot.querySelector('bingo-' + page);
    // const p = this.shadowRoot.querySelector('bingo-menu')

    const cmp = 'bingo-' + page

    // Load page import on demand. Show 404 page if fails
    // const resolvedPageUrl = this.resolveUrl(`pages/${page}/${cmp}.js`)
    const resolvedPageUrl = `/pages/${page}/${cmp}.js`

    const me = this
    // Chargement du composant et de ses dépendances
    // debugger
    // import(resolvedPageUrl).then((MyView1) => {
      // console.log("MyView1 loaded");
      // Ajouter le composant dans la page
      me._insererElement(
        '<' + cmp + ' route="' + page + '" actif></' + cmp + '>')

      const elem = me.shadowRoot.querySelector(cmp)
      elem.classList.add('slideIn')
      me.pageCourante = cmp
    // }).catch((reason) => {
    //   console.log("MyView1 failed to load", reason);
    //   // En cas d'erreur de chargement
    //   console.warn("Erreur d'importation de " + resolvedPageUrl, e)

    //   // Pour éviter une erreur de chargement circulaire
    //   // if (application != 'page404') {
    //   //   // Charger et afficher une page 404
    //   //   me._chargerApplication('page404');
    //   // }
    // });

    // importScripts(
    //   resolvedPageUrl,
    //   // succès
    //   function (e) {
    //     // Ajouter le composant dans la page
    //     me._insererElement(
    //       '<' + cmp + ' route="' + page + '" actif></' + cmp + '>')

    //     const elem = me.shadowRoot.querySelector(cmp)
    //     elem.classList.add('slideIn')
    //     me.pageCourante = cmp
    //   },
    //   // erreur
    //   function (e) {
    //     // En cas d'erreur de chargement
    //     console.warn("Erreur d'importation de " + resolvedPageUrl, e)

    //     // Pour éviter une erreur de chargement circulaire
    //     // if (application != 'page404') {
    //     //   // Charger et afficher une page 404
    //     //   me._chargerApplication('page404');
    //     // }
    //   }, // async
    //   true)

  }

  _insererElement(element) {
    const me = this
    dom(me.$.contenu).innerHTML = element

    // Variante
    // injection dynamique de l'élément qui remplace l'élément précédent
    //        this.$.contenu.innerHTML = '<' + nomElement + '></' + nomElement + '>';
    // c.$.contenu.appendChild(item);
  }

  _showPage404() {
    this.page = 'view404'
  }
}

window.customElements.define(BingoApp.is, BingoApp)

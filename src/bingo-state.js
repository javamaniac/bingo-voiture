import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
import './fortune-cookie.js';
import { GestureEventListeners } from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';

let optionsInstance = null;

class BingoState extends GestureEventListeners(Element) {
  static get template() {
    return `
      <style>
        :host {
          display: block;
        }
      </style>

      <fortune-cookie auto-save="" id="cookie" name="bingoPrefs" value="{{preferences}}" handle-value-as="object" on-fortune-cookie-load-empty="_initPreferences">
      </fortune-cookie>
    `;
  }

  static get is() { return 'bingo-state' }

  static get properties() {
    return {
      preferences: {
        type: Object,
      },
      subscribers: {
        type: Array,
        value: () => []
      },
      preferencesParDefaut: {
        type: Object,
        value: {
          musique: true,
          debug: false
        }
      }
    }
  }

  static get observers() {
    return [
      'preferencesChanged(preferences.*)'
    ]
  }

  _initPreferences() {
    this.preferences = this.preferencesParDefaut
  }

  constructor() {
    super();

    if (!optionsInstance) optionsInstance = this;
  }

  register(subscriber) {
    this.subscribers.push(subscriber);
    subscriber.preferences = this.preferences;
    subscriber.notifyPath('preferences');
  }

  unregister(subscriber) {
    var i = this.subscribers.indexOf(subscriber);
    if (i > -1) this.subscribers.splice(i, 1)
  }

  preferencesChanged(change) {
    console.log('STATE changé :', change.path, change.value)
    for (var i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i].notifyPath(change.path);
    }
    this.$.cookie.save()
    // console.log('STATE cookie mis à jour', document.cookie)
  }
}

window.customElements.define(BingoState.is, BingoState)

// /**
// * `MixinState` enables a custom element to use declarative
// * lazy imports
// *
// * @polymerMixin
// */
export const MixinState = (superClass) => {

  /**
   * @polymer
   * @mixinClass
   * @implements {MixinState}
   */
  class MixinState extends superClass {
    static get properties() {
      return {
        preferences: {
          type: Object,
          value: function() {
            return {}
          }
        }
      }
    }

    static get observers() {
      return [
        'onPrefChange(preferences.*)'
      ]
    }

    onPrefChange(pref) {
      // console.log('Changement de preferences', this.nodeName)
      const state = this.shadowRoot.querySelector('bingo-state')
      if (state) {
        state.set(pref.path, pref.value)
        state.notifyPath('preferences.musique')
      }
    }

    connectedCallback() {
      super.connectedCallback()
      optionsInstance.register(this)
      this.state = optionsInstance
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      optionsInstance.unregister(this);
    }
  }

  return MixinState
}

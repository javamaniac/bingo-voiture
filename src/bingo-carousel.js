import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
/**
 * @implements BingoModele
 */
class BingoCarousel extends Element {
  static get template() {
    return `
    <style style="display:none">
       :host {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding: 0;
        margin: 0;
        display: block;
      }

      div#carousel {
        /* width: 100%; */
        /* overflow: hidden; */
        /* transform: translateX(-50vw); */
        /* white-space: nowrap; */
        /* transform: translateX(-100vw); */

        transition: transform 500ms;
        /* word-spacing: unset; */
        /* word-wrap: normal; */
        /* word-break: unset; */
        /* font-size: 0; */
        /* TODO rendre dynamique selon le nombre d'élément dans slot */
        width: 200vw;
        height: 100vh;
        /* background: yellow; */
        display: inline-flex;
        /* white-space: nowrap; */
        /* display: table; */
      }


        /* ne fonctionne pas dans FF */
        ::slotted(*) {
        width: 100vw;
        height: 100vh;
        display: block;
        /* box-sizing: border-box; */
        /* background-color: green; */
        box-sizing: border-box;
      }
    </style>

    <div id="carousel" select="{{niveau}}" class="">
      <!-- <div xstyle="width: 100vw; height 100vh; background-color: green;"> -->
      <slot></slot>
      <!-- </div> -->
    </div>
`;
  }

  static get is () { return 'bingo-carousel' }

  static get properties () {
    return {
      niveau: {
        value: 1,
        observer: 'onChangeNiveau'
      }
    }
  }

  onChangeNiveau (niveau) {
    let translateX = 0

    for (let i = 0; i < this.children.length; i++) {
    // for (let i in this.children) {
      this.children[i].removeAttribute('actif')
    }

    if (niveau > 1) {
      translateX = ((niveau - 1) * -100) + 'vw'
    }
    this.$.carousel.style.transform = 'translate(' + translateX + ')'
    const cmp = this.children[niveau - 1]
    cmp.setAttribute('actif', true)

    // this.$.carousel
  }

  ready () {
    super.ready()
  }
}

window.customElements.define(BingoCarousel.is, BingoCarousel)

import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class MgCard extends LitElement {
  static get properties() {
    return {
      tapped: { type: Boolean },
      correct: { type: Boolean },
      wrong: { type: Boolean },
    };
  }

  static styles = css`
    :host {
      border: 1px solid;
      width: 100px;
      height: 100px;
      font-size: 30px;
    }

    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tapped {
      background-color: #000;
    }

    .untapped {
      background-color: #fff;
    }

    .correct {
      background-color: green;
    }

    .wrong {
      background-color: red;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.toogleTapped);
  }  

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.toogleTapped);
  }

  toogleTapped = () => {
    this.tapped = !this.tapped;
    const e = new CustomEvent('discover', { composed: true, bubbles: true})
    this.dispatchEvent(e);
  }

  render() {
    const classes = { tapped: this.tapped, correct: this.correct, wrong: this.wrong };
    return html`
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
  }
}

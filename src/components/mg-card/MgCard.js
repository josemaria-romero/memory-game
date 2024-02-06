import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

export class MgCard extends LitElement {

  static get properties() {
    return {
      tapped: { type: Boolean, reflect: true },
      correct: { type: Boolean, reflect: true },
      wrong: { type: Boolean, reflect: true },
    };
  }
  static styles = css`
    :host {
      border: 1px solid;
      width: 100px;
      height: 100px;
      font-size: 30px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotateY(360deg);
      transition-duration:1s;
    }

    :host([tapped]) {
      background-color: #000;
      transform: rotateY(180deg);
      transition-duration:1s;
    }    

    :host([correct]) {
      background-color: green;
    }

    :host([wrong]) {
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
    const e = new CustomEvent("discover", { composed: true, bubbles: true });
    this.dispatchEvent(e);
  };

  render() {
    return html`<slot></slot>`;
  }
}

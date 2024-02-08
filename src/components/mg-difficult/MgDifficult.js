import { LitElement, html, css } from 'lit';

export class MgDifficult extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
      }
    `
  ];

  #selector;
  
  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated(){
    this.#selector = this.shadowRoot.querySelector('select');
    this.#selector.addEventListener("change", this.changeSelection);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#selector.removeEventListener("change", this.changeSelection);
  }

  changeSelection = () => {
    const e = new CustomEvent("selectLevel", { detail: this.#selector.value, composed: true, bubbles: true });
    this.dispatchEvent(e);
  };


  render() {
    return html`
    <h3>Choose difficult: </h3>
    <select id="selectLevel" name="selectLevel">
        <option value="0">Low</option>
        <option value="1">Middle</option>
        <option value="2">High</option>
    </select>
    `;
  }
}

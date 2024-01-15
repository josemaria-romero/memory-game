import { LitElement, html, css } from 'lit';

export class MgIndicator extends LitElement {
  static styles = [
    css`
      :host {
        margin: 10px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        border: 1px solid;
        width: 70px;
        height: 70px;
        border-radius:50%;
      }
    `
  ];

  render() {
    return html`<slot></slot>`;
  }
}

import { LitElement, html, css } from 'lit';

export class MgIndicator extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-content: center;
        justify-content: center;
        font-size: 40px;
      }
    `
  ];

  render() {
    return html`<slot></slot>`;
  }
}

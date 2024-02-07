import { LitElement, html, css } from 'lit';

export class MgPoints extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`<h3>Points: <slot></slot></h3>`;
  }
}

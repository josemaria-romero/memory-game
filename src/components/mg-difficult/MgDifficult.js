import { LitElement, html, css } from 'lit';

export class MgDifficult extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        gap: 20px;
      }
    `
  ];

  static get properties(){
    return {
      level: Number,
    }
  }
  

  render() {
    return html`
    <h3>Seleccione la dificultad: </h3>
    <select id="selectLevel" name="selectLevel">
        <option value="0">Bajo</option>
        <option value="1">Medio</option>
        <option value="2">Alto</option>
    </select>
    `;
  }
}

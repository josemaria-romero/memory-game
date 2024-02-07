import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class MgModal extends LitElement {
  static get properties() {
    return {
      hide: { type: Boolean },
      buttonCallback: {type: Function}
    };
  }
  static styles = [
    css`
      #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }

      #modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 20px;
        text-align: center;
        z-index: 2;
      }

      #modal .wrapper{
        display: flex;
        flex-direction: column
      }

      #modal p {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
      }

      .hide {
        display: none;
      }

      #restartButton {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
    `,
  ];

  constructor() {
    super();
  }

  render() {
    const classes = { hide: this.hide };
    return html`
      <div id="overlay" class=${classMap(classes)}></div>
      <div id="modal" class=${classMap(classes)}>
        <div class="wrapper">
          <slot></slot>
          <button id="restartButton" @click=${()=>this.buttonCallback()}>New game</button>
        </div>
      </div> 
    `;
  }
}

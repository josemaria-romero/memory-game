import { LitElement, html, css } from "lit";
import "../../components/mg-card/mg-card.js";
import "../../components/mg-indicator/mg-indicator.js";

export class MgGame extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .card-wrapper {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }

      button {
        width: 100px;
      }

      .bg-black{
        background-color: #000;
      }
    `,
  ];

  static properties = {
    cards: { type: Array },
    numbers: { type: Array },
    randomNumber: { type: Number },
  };

  constructor() {
    super();
    this.startGame();
  }

  startGame = () => {
    this.cards = this.fillArray();
    this.cards.sort(function () {
      return Math.random() - 0.5;
    });
    this.numbers = this.fillArray();
    this.numbers.sort(function () {
      return Math.random() - 0.5;
    });

    this.randomNumber = this.numbers.pop().number;
  };

  fillArray = () => {
    return Array.from({ length: 9 }, (_, index) => ({
      number: index + 1,
      tapped: false,
    }));
  };

  render() {
    return html`
      <mg-indicator>${this.randomNumber}</mg-indicator>
      <div class="card-wrapper">
        ${this.cards.map(
          (card) =>
            html` <mg-card .tapped=${card.tapped}>${card.number}</mg-card> `
        )}
      </div>
      <button @click=${() => this.startGame()}>Restart game</button>
    `;
  }
}

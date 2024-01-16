import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
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

      .tapped{
        background-color: #000;
      }
    `,
  ];

  static properties = {
    cards: { type: Array },
    numbers: { type: Array },
    randomNumber: { type: Number },
    gameStarted: {type: Boolean, attribute: false} 
  };

  constructor() {
    super();
    this.prepareGame();
  }

  prepareGame = () => {
    this.gameStarted= false;
    this.cards = this.fillArray();
    this.cards.sort(function () {
      return Math.random() - 0.5;
    });
    this.numbers = this.fillArray();
    this.numbers.sort(function () {
      return Math.random() - 0.5;
    });

    this.randomNumber = this.numbers.pop().number;

    setTimeout(() => {
      this.startGame();
    }, 3000);
  };

  fillArray = () => {
    return Array.from({ length: 9 }, (_, index) => ({
      number: index + 1,
      tapped: false,
    }));
  };

  startGame() {
    this.cards.forEach((card) => {
        card.tapped = true;
    });
    this.gameStarted= true;
    this.requestUpdate();

  }

  render() {
    const indicatorClasses = { tapped: !this.gameStarted };
    return html`
      <mg-indicator class=${classMap(indicatorClasses)}>${this.randomNumber}</mg-indicator>
      <div class="card-wrapper">
        ${this.cards.map(
          (card) =>
            html` <mg-card .tapped=${card.tapped}>${card.number}</mg-card> `
        )}
      </div>
      <button @click=${() => this.prepareGame()}>Restart game</button>
    `;
  }
}

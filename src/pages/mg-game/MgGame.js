import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import "../../components/mg-card/mg-card.js";
import "../../components/mg-indicator/mg-indicator.js";
import "../../components/mg-modal/mg-modal.js";

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

      .tapped {
        background-color: #000;
      }

      
    `,
  ];

  static properties = {
    cards: { type: Array },
    numbers: { type: Array },
    randomNumber: { type: Number },
    gameStarted: { type: Boolean, attribute: false },
    modalHidden: { type: Boolean, attribute: true },
  };

  constructor() {
    super();
    this.prepareGame();
  }

  prepareGame = () => {
    this.modalHidden = true;
    this.gameStarted = false;
    this.cards = this.fillArray();
    
    this.cards.sort(function () {
      return Math.random() - 0.5;
    });

    this.numbers = this.fillArray();
    this.numbers.sort(function () {
      return Math.random() - 0.5;
    });

    this.getRandomNumber();
    setTimeout(() => {
      this.startGame();
    }, 3000);
  };

  getRandomNumber = () => {
    this.randomNumber = this.numbers.pop().number;
  };

  fillArray = () => {
    return Array.from({ length: 9 }, (_, index) => ({
      number: index + 1,
      tapped: false,
      correct: false,
      wrong: false
    }));
  };

  startGame = () => {
    this.cards.forEach((card) => {
      card.tapped = true;
      card.correct = false;
      card.wrong = false;
    });
    this.gameStarted = true;
    this.requestUpdate();

  }

  cardTapped = (e) => {
    if (e.target.textContent === this.randomNumber.toString()) {
      e.target.correct = true;
      this.getRandomNumber();
    } else {
        e.target.wrong = true;
        this.gameOver();
    }
    e.stopPropagation();
  };

  gameOver = () => {
    this.modalHidden=false;
  }

  render() {
    const indicatorClasses = { tapped: !this.gameStarted };
    return html`
      <mg-indicator class=${classMap(indicatorClasses)}>
        ${this.randomNumber}
      </mg-indicator>
      <div @discover=${this.cardTapped} class="card-wrapper">
        ${this.cards.map(
          (card) =>
            html` <mg-card .tapped=${card.tapped} .correct=${card.correct} .wrong=${card.wrong}>${card.number}</mg-card> `
        )}
      </div>
      <button @click=${() => this.prepareGame()}>Restart game</button>
      <mg-modal .hide=${this.modalHidden} .buttonCallback=${this.prepareGame}>
       Game over
      </mg-modal>
    `;
  }
}

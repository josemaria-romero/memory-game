import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ContextConsumer } from "@lit/context";
import { userContext } from "../../contexts/user.js";
import "../../components/mg-card/mg-card.js";
import "../../components/mg-indicator/mg-indicator.js";
import "../../components/mg-modal/mg-modal.js";
import "../../components/mg-difficult/mg-difficult.js";
import "../../components/mg-points/mg-points.js";

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

      h2 {
        margin-block: 0;
        margin-top: 10px;
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

      header{
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    `,
  ];

  #userConsumer = new ContextConsumer(this, { context: userContext });

  static get properties() {
    return {
      username: {},
      gameStarted: { type: Boolean },
      modalHidden: { type: Boolean },
      randomNumber: { type: Number },
      numbers: { type: Array },
      cardsNumbers: { type: Array },
      cards: { type: Array },
      level: { type: Number },
      milliseconds: { type: Number },
      pointsPerCorrect: { type: Number },
      points: { type: Number },
      modalMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.changeLevel(0);
    this.configureBoard();
  }

  connectedCallback() {
    super.connectedCallback();
    this.username = this.#userConsumer.value.value;
  }

  firstUpdated() {
    this.configureGame();
  }

  restartGame = () => {
    this.configureBoard();
    this.configureGame();
  };

  prepareCards = () => {
    this.cards = this.shadowRoot.querySelectorAll("mg-card");
    this.cards.forEach((card) => {
      card.tapped = false;
      card.correct = false;
      card.wrong = false;
    });
  };

  configureGame = () => {
    this.points = 0;
    this.modalHidden = true;
    this.gameStarted = false;
    this.cardsNumbers.sort(function () {
      return Math.random() - 0.5;
    });
    this.numbers.sort(function () {
      return Math.random() - 0.5;
    });
    this.prepareCards();
    this.getRandomNumber();
    this.startGame();
  };

  configureBoard = () => {
    this.cardsNumbers = this.fillArray();
    this.numbers = this.fillArray();
  };

  getRandomNumber = () => {
    this.randomNumber = this.numbers.pop();
    if( ! this.randomNumber){
      this.modalMessage = 'You win!'
      this.modalHidden = false;
    }
  };

  fillArray = () => {
    return Array.from({ length: 9 }, (_, index) => index + 1);
  };

  startGame = () => {
    setTimeout(() => {
      this.cards.forEach((card) => {
        card.tapped = true;
      });
      this.gameStarted = true;
      this.requestUpdate();
    }, this.milliseconds);
  };

  cardTapped = (e) => {
    if (e.target.textContent === this.randomNumber.toString()) {
      e.target.correct = true;
      this.points += this.pointsPerCorrect; 
      this.getRandomNumber();
    } else {
      e.target.wrong = true;
      this.gameOver();
    }
    e.stopPropagation();
    this.requestUpdate();
  };

  selectLevel = (e) => {
    this.changeLevel(e.detail);
    e.stopPropagation();
    this.requestUpdate();
  };

  changeLevel = (level) => {
    if (this.level === parseInt(level)) return;
    this.level = parseInt(level);
    switch (this.level) {
      case 0:
        this.milliseconds = 10000;
        this.pointsPerCorrect = 10;
        break;
      case 1:
        this.milliseconds = 5000;
        this.pointsPerCorrect = 20;
        break;
      default:
        this.milliseconds = 2000;
        this.pointsPerCorrect = 30;
        break;
    }
  };

  gameOver = () => {
    this.modalMessage = 'Game Over';
    this.modalHidden = false;
  };

  render() {
    const indicatorClasses = { tapped: !this.gameStarted };
    return html`
      <header>
        <h3>Player: ${this.username}</h3>
        <mg-points>${this.points}</mg-points>
      </header>
      <mg-difficult @selectLevel=${this.selectLevel}></mg-difficult>
      <mg-indicator class=${classMap(indicatorClasses)}>
        ${this.randomNumber}
      </mg-indicator>
      <div @discover=${this.cardTapped} class="card-wrapper">
        ${this.cardsNumbers.map((card) => html` <mg-card>${card}</mg-card> `)}
      </div>
      <button @click=${() => this.restartGame()}>Restart game</button>
      <mg-modal ?hide=${this.modalHidden} .buttonCallback=${this.restartGame}>
        ${this.modalMessage}
      </mg-modal>
    `;
  }
}

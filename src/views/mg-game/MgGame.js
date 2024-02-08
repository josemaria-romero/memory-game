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
        position: relative;
      }

      h2 {
        margin-block: 0;
        margin-top: 10px;
      }

      #overlay.shown{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      #overlay{
        display: none;
      }

      .card-wrapper {
        position:relative;
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

      button{
        cursor: pointer;
        outline: 0;
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
        display: inline-block;
        font-weight: 400;
        line-height: 1.2;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        :hover {
            color: #fff;
            background-color: #0b5ed7;
            border-color: #0a58ca;
        }
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
    this.username = this.#userConsumer.value?.value || 'Player';
  }

  firstUpdated() {
    this.configureGame();
  }

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

  configureBoard = () => {
    this.cardsNumbers = this.fillArray();
    this.numbers = this.fillArray();
  };

  configureGame = () => {
    this.shadowRoot.querySelectorAll('mg-card').forEach((card)=>{
      card.setAttribute('disabled', 'true');
    })
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

  fillArray = () => {
    return Array.from({ length: 9 }, (_, index) => index + 1);
  };

  gameOver = () => {
    this.modalMessage = 'Game Over';
    this.modalHidden = false;
  };

  getRandomNumber = () => {
    this.randomNumber = this.numbers.pop();
    if( ! this.randomNumber){
      this.modalMessage = 'You win!'
      this.modalHidden = false;
    }
  };

  prepareCards = () => {
    this.cards = this.shadowRoot.querySelectorAll("mg-card");
    this.cards.forEach((card) => {
      card.tapped = false;
      card.correct = false;
      card.wrong = false;
    });
  };

  selectLevel = (e) => {
    this.changeLevel(e.detail);
    e.stopPropagation();
    this.requestUpdate();
  };

  restartGame = () => {
    this.configureBoard();
    this.configureGame();
  };

  startGame = () => {
    setTimeout(() => {
      this.cards.forEach((card) => {
        card.tapped = true;
      });
      this.gameStarted = true;
      this.requestUpdate();
      this.shadowRoot.querySelectorAll('mg-card').forEach((card)=>{
        if (card.hasAttribute('disabled')) {
          card.removeAttribute('disabled');
        }
      })
    }, this.milliseconds);

  };

  render() {
    const indicatorClasses = { tapped: !this.gameStarted };
    const overlayClasses = { shown: !this.gameStarted };
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
      <div id="overlay" class=${classMap(overlayClasses)}></div>
        ${this.cardsNumbers.map((card) => html` <mg-card>${card}</mg-card> `)}
      </div>
      <button @click=${() => this.restartGame()}>Restart game</button>
      <mg-modal ?hide=${this.modalHidden} .buttonCallback=${this.restartGame}>
        ${this.modalMessage}
      </mg-modal>
    `;
  }
}

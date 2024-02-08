import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ContextConsumer } from '@lit/context';
import { u as userContext } from './mg-app.js';
import '@lit-labs/router';
import 'relit';

class MgCard extends LitElement {

  static get properties() {
    return {
      tapped: { type: Boolean, reflect: true },
      correct: { type: Boolean, reflect: true },
      wrong: { type: Boolean, reflect: true },
    };
  }
  static styles = css`
    :host {
      border: 1px solid;
      width: 100px;
      height: 100px;
      font-size: 30px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotateY(360deg);
      transition-duration:1s;
    }

    :host([tapped]) {
      background-color: #000;
      transform: rotateY(180deg);
      transition-duration:1s;
    }    

    :host([correct]) {
      background-color: green;
    }

    :host([wrong]) {
      background-color: red;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.toggleTapped);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.toggleTapped);
  }

  toggleTapped = () => {
    this.tapped = !this.tapped;
    const e = new CustomEvent("discover", { detail: 'card', composed: true, bubbles: true });
    this.dispatchEvent(e);
  };

  render() {
    return html`<slot></slot>`;
  }
}

window.customElements.define("mg-card", MgCard);

class MgIndicator extends LitElement {
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

window.customElements.define("mg-indicator", MgIndicator);

class MgModal extends LitElement {
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
        outline: 0;
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
        display: inline-block;
        font-weight: 400;
        line-height: 1.2;
        text-align: center;
        border: 1px solid transparent;
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

window.customElements.define("mg-modal", MgModal);

class MgDifficult extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
      }
    `
  ];

  #selector;
  
  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated(){
    this.#selector = this.shadowRoot.querySelector('select');
    this.#selector.addEventListener("change", this.changeSelection);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#selector.removeEventListener("change", this.changeSelection);
  }

  changeSelection = () => {
    const e = new CustomEvent("selectLevel", { detail: this.#selector.value, composed: true, bubbles: true });
    this.dispatchEvent(e);
  };


  render() {
    return html`
    <h3>Choose difficult: </h3>
    <select id="selectLevel" name="selectLevel">
        <option value="0">Low</option>
        <option value="1">Middle</option>
        <option value="2">High</option>
    </select>
    `;
  }
}

window.customElements.define("mg-difficult", MgDifficult);

class MgPoints extends LitElement {
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

window.customElements.define("mg-points", MgPoints);

class MgGame extends LitElement {
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
      this.modalMessage = 'You win!';
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
    }, this.milliseconds);
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

customElements.define('mg-game', MgGame);

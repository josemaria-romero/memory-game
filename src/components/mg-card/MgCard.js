import { LitElement, html, css } from 'lit';

export class MgCard extends LitElement {
    
    static CardState = {
        TAPPED: 'tapped',
        UNTAPPED: 'untapped',
        CORRECT: 'correct',
        WRONG: 'wrong'
    };
    
    static get properties() {
        return {
            number: { type: Number },
            state: {
                type: String,
                reflect: true,
                converter: {
                    fromAttribute: (value) => {
                        return Object.values(MgCard.CardState).includes(value) ? value : MgCard.CardState.UNTAPPED;
                    },
                    toAttribute: (value) => value
                }
            }
        };
    }

    static styles = css`
        :host {
            display: block;
        }

        .mg-card {
            border: 1px solid;
            width: 100px;
            height: 100px;
            display: flex;
            justify-content:center;
            align-items: center;
        }

        .mg-tapped {
            background-color: #000;
        }

        .mg-untapped {
            background-color: #fff;
        }

        .mg-correct {
            background-color: green;
        }

        .mg-wrong {
            background-color: red;
        }
    `;

    constructor() {
        super();
        this.state = MgCard.CardState.TAPPED;
        this.addEventListener('click', this.handleCardClick.bind(this));
    }

    render() {
        const classes = 'mg-card mg-' + this.state;
        return html`
            <div class='${classes}'>${this.number}</div>
        `;
    }

    handleCardClick() {
        if (this.state === MgCard.CardState.UNTAPPED) {
            this.state = MgCard.CardState.TAPPED;
        } else {
            this.state = MgCard.CardState.UNTAPPED;
        }
    }
}


import { LitElement, html, css } from 'lit';
import {classMap} from 'lit/directives/class-map.js';


export class MgCard extends LitElement {
    
    static get properties() {
        return {
            tapped: { type: Boolean },
            correct: { type: Boolean }
        };
    }

    static styles = css`
        :host {
            border: 1px solid;
            width: 100px;
            height: 100px;
        }

        div{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content:center;
            align-items: center;
        }

        .tapped {
            background-color: #000;
        }

        .untapped {
            background-color: #fff;
        }

        .correct {
            background-color: green;
        }

        .wrong {
            background-color: red;
        }
    `;

    constructor() {
        super();
        this.tapped = false;
        this.correct = false;
        this.addEventListener('click', () => { this.tapped = !this.tapped; });
    }

    render() {
        const classes = { tapped: this.tapped, correct: this.correct };
        this.classList=classMap(classes);

        return html`
            <div class=${classMap(classes)} >
                <slot></slot>
            </div>
        `;
    }
}


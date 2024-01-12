import { LitElement, html, css } from 'lit';

export class MgCard extends LitElement {
    static get properties() {
        return {
            number: { type: Number }
        };
    }

    static styles = [
        css`
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

        `
    ];

    constructor() {
        super();
        this.number = 0;
    }

    render() {
        return html`
            <div class='mg-card'>${this.number}</div>
        `;
    }
}


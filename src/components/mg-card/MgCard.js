import { LitElement, html, css } from 'lit';

export class MgCard extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<h1>Card</h1>`;
    }
}

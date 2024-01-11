import { LitElement, html, css } from 'lit';

export class MgGame extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<h1>Game</h1>`;
    }
}

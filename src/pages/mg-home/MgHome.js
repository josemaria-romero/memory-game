import { LitElement, html, css } from 'lit';

export class MgHome extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<h1>Home</h1>`;
    }
}

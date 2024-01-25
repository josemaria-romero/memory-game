import { LitElement, html, css } from 'lit';

export class MgHome extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    #username = '';

    formOnSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    render() {
        return html`
        <form @submit=${this.formOnSubmit}>
            <input
                type="text"
                id="username"
                placeholder="Name"
                required
            />
            <input type='submit' value='Play'></input>
        </form>`;
    }
}

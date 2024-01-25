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

    set username(value) {
        let aux = this.#username;
        this.#username = value;
        this.requestUpdate('username', aux);
    }
    
    get username() {
        return this.#username;
    }
    

    formOnSubmit = (e) => {
        e.preventDefault();

        this.username = e.target.querySelector('#username').value;

        this.dispatchEvent(new CustomEvent('login-success', {
			detail: this.username,
			bubbles: true,
			composed: true
		}));
    }

    render() {
        return html`
        <form @submit=${this.formOnSubmit}>
            <input
                type="text"
                id="username"
                placeholder="Name"
                
            />
            <input type='submit' value='Play'></input>
        </form>`;
    }
}

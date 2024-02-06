import { LitElement, html, css } from 'lit';
import { ContextConsumer } from '@lit/context';
import { userContext } from '../../contexts/user.js';

export class MgHome extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    #userConsumer = new ContextConsumer(this, { context: userContext });;
    #userStore;

    static get properties() {
		return {
			username: { type: String },
		};
	}

    connectedCallback() {
		super.connectedCallback();
		this.#userStore = this.#userConsumer.value;
	}

    formOnSubmit = (e) => {
        e.preventDefault();
        this.#userStore.value = this.username;
		history.pushState({ user: this.#userStore.value }, '', '/game');
    }

    onKeyUpInput = (e) => {
        this.username = e.target.value;
    }

    render() {
        return html`
        <h3>Username: ${this.username}</h3>
        <form @submit=${this.formOnSubmit}>
            <input
                type="text"
                id="username"
                placeholder="Name"
                @keyup=${this.onKeyUpInput}
            />
            <input type='submit' value='Play'></input>
        </form>`;
    }
}

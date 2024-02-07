import { LitElement, html, css } from 'lit';
import { ContextConsumer } from '@lit/context';
import { userContext } from '../../contexts/user.js';

export class MgHome extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                text-align: center;
                margin: 30px 20px;
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
        <form @submit=${this.formOnSubmit}>
            <input
                type="text"
                id="username"
                placeholder="Name"
                @keyup=${this.onKeyUpInput}
                required
            />
            <input type='submit' value='Play'></input>
        </form>
        <h2>Welcome to Memory Card Game!</h2>
        <p>Introduce your name and press play to start.</p>
        <p>You have to memorize the 9 cards. 
        After a few seconds, cards will be hidden and you should select the 
        card with the number shown in the circle.</p>
        <p>You can select 3 different difficulties: low, middle and high. 
        You have to press "Restart game" to apply the new difficult. 
        With more difficult you gain more points but you have less time to memorize.</p>
        <p>Good luck and have fun!</p>
        `;
    }
}

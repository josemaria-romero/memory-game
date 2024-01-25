import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { userContext } from './contexts/user.js';
import { ContextProvider } from '@lit/context';
import './pages/mg-home/mg-home.js';
import './pages/mg-game/mg-game.js';



export class MgApp extends LitElement {

  static properties = {
    username: { type: String },
  };

  // TODO - Actually need a div in dom for the outlet. Try to render this div before all to be self-dependant.
  outlet = document.getElementById('app-container');

  routes = [
    {
      path: '/',
	    render: () => html`<mg-home></mg-home>`,
      enter: () => import('./pages/mg-home/mg-home.js'),
    },
    {
      path: '/game',
	    render: () => html`<mg-game></mg-game>`,
      enter: () => {
          return import('./pages/mg-game/mg-game.js');
      },
    },
  ];

  #router;
  #userContext;

  constructor(){
    super();
    this.#router = new Router(this, this.routes);
    this.#userContext = new ContextProvider(this, { context: userContext });
  }

  connectedCallback() {
		super.connectedCallback();
		this.addEventListener('login-success', this.loginSuccessHandler);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('login-success', this.loginSuccessHandler);
	}

  loginSuccessHandler = (e) => {
		this.username = e.detail;
		this.#userContext.setValue(e.detail);
    // console.log('App username: ' + this.#userContext.value)
    this.#router.goto('/game')
	}

  render() {
    return this.#router.outlet();
	}

}

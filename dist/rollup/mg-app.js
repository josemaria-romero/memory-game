import { LitElement, css, html } from 'lit';
import { Router } from '@lit-labs/router';
import { createContext, ContextProvider } from '@lit/context';
import { LocalStorageController } from 'relit';

const contextKey = Symbol('user');

const userContext = createContext(contextKey);

class MgApp extends LitElement {

  static styles = [
    css`
        :host {
            display: block;
            max-width:400px;
            min-height: 400px;
            margin: 0 auto;
            border: solid black 1px
        }

        header{
          text-align: center;
          background-color: blue;
          padding: 15px;
          color: white;
        }

        h1{
          margin-block: 0
        }
        
        h1 a, h1 a:visited {
          margin: none;
          text-decoration: none;
          color: inherit;
        }
    `
  ];

  static properties = {
    username: { type: String },
  };

  #routes = [
    {
      path: '/game',
	    render: () => html`<mg-game></mg-game>`,
      enter: () => {
				if(history.state?.user) {
					import('./mg-game-flN8jKKR.js');
				} else {
					history.pushState({}, '', '/');
				}
      }
    },
    {
      path: '/*',
	    render: () => html`<mg-home></mg-home>`,
      enter: () => import('./mg-home-MfO85zh6.js'),
    },
  ];

  #router = new Router(this, this.#routes);
  #userStore = new LocalStorageController(this, 'MgApp.user', 'Carlos');
  #userContext = new ContextProvider(this, { context: userContext });

  constructor(){
    super();
    this.#userContext.setValue(this.#userStore);
  }

  connectedCallback() {
		super.connectedCallback();
		if (history.state?.user) {
			this.#userStore.value = history.state.user;
		}
		globalThis.history.pushState = new Proxy(globalThis.history.pushState, 
    {
			apply: (target, thisArg, argArray) => {
				target.apply(thisArg, argArray);
				this.#router.goto(argArray[2]);
			},
		});
	}

  render() {
    return html`
      <header>
          <h1><a href="/">Memory Card Game</a></h1>
      </header>
      ${this.#router.outlet()}
    `
	}

}

customElements.define('mg-app', MgApp);

export { userContext as u };

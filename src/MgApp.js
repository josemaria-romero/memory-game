import { LitElement, html } from 'lit';
import { Router } from '@lit-labs/router';
import { ContextProvider } from '@lit/context';
import { LocalStorageController } from 'relit';
import { userContext } from './contexts/user.js';

export class MgApp extends LitElement {

  static properties = {
    username: { type: String },
  };

  #routes = [
    {
      path: '/game',
	    render: () => html`<mg-game></mg-game>`,
      enter: () => {
				if(history.state?.user) {
					import('./pages/mg-game/mg-game.js');
				} else {
					history.pushState({}, '', '/');
				}
      }
    },
    {
      path: '/*',
	    render: () => html`<mg-home></mg-home>`,
      enter: () => import('./pages/mg-home/mg-home.js'),
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
    return this.#router.outlet();
	}

}

import { Router } from '@vaadin/router';
import { LitElement } from 'lit';
import userContext from './contexts/user.js';
import { ContextProvider } from '@lit/context';
import './pages/mg-home/mg-home.js';
import './pages/mg-game/mg-game.js';



export class MgApp extends LitElement {

  // TODO - Actually need a div in dom for the outlet. Try to render this div before all to be self-dependant.
  outlet = document.getElementById('app-container');

  routes = [
    {
      path: '/',
      component: 'mg-home',
      action: () => import('./pages/mg-home/mg-home.js'),
    },
    {
      path: '/game',
      component: 'mg-game',
      action: (context, commands) => {
        if(!this.username){
          return commands.redirect('/');
        }
      }
    },
  ];

  #router = new Router(this.outlet);
  #userContext = new ContextProvider(this, {context: userContext});

  constructor(){
    super();
    this.#router.setRoutes(this.routes);
  }

  connectedCallback() {
		super.connectedCallback();
		this.outlet.addEventListener('login-success', this.loginSuccessHandler);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.outlet.removeEventListener('login-success', this.loginSuccessHandler);
	}

  loginSuccessHandler = (e) => {
		this.username = e.detail;
		this.#userContext.setValue(e.detail);
    console.log('App username: ' + this.#userContext.value)
    // This works but I do not know why, investigate it.
    // console.log(this.#router)
    this.#router.render('/game')
    // Router.go('/game')
	}

}

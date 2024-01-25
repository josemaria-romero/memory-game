import { Router } from '@vaadin/router';
import './pages/mg-home/mg-home.js';
import './pages/mg-game/mg-game.js';
import { LitElement } from 'lit';

export class MgApp extends LitElement {

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
      action: () => import('./pages/mg-game/mg-game.js'),
    },
  ];

  #router = new Router(this.outlet);

  constructor(){
    super();
    this.#router.setRoutes(this.routes);
  }
}

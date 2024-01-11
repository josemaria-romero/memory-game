import { Router } from '@vaadin/router';
import './pages/mg-home/mg-home.js';
import './pages/mg-game/mg-game.js';

const outlet = document.getElementById('app-container');

const routes = [
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

const router = new Router(outlet);
router.setRoutes(routes);

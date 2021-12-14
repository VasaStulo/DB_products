import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import FindProduct from '../views/FindProduct';
import AddProgram from '../views/AddProgram';
import AnalogProduct from '../views/AnalogProduct';
import FindByFeature from '../views/FindByFeature';
import Compatibility from '../views/Compatibility';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/findProduct',
    name: 'findProduct',
    component: FindProduct
  },
  {
    path: '/addProgram',
    name: 'addProgram',
    component: AddProgram
  },
  {
    path: '/analogProduct',
    name: 'analogProduct',
    component: AnalogProduct
  },
  {
    path: '/findByFeature',
    name: 'findByFeature',
    component: FindByFeature
  },
  {
    path: '/compatibility',
    name: 'compatibility',
    component: Compatibility
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

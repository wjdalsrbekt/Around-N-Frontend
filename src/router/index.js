import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Board from '@/views/Board.vue';
import BoardWrite from '@/components/Board/BoardWrite.vue';
import BoardRead from '@/components/Board/BoardRead.vue';
import BoardUpdate from '@/components/Board/BoardUpdate.vue';
import BoardDelete from '@/components/Board/BoardDelete.vue';

Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/board',
//     name: 'Board',
//     component: Board,
//   },
// ];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
    },
    {
      path: '/board/read',
      component: BoardRead,
    },
    {
      path: '/board/update',
      component: BoardUpdate,
    },
    {
      path: '/board/delete',
      component: BoardDelete,
    },
    {
      path: '/board/create',
      component: BoardWrite,
    },
  ],
});

export default router;

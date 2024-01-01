import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: {show:true}
  },
  {
    path: '/login',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView,
    meta: {show:false}
  },
  {
    path: '/',
    redirect:'/login'
  },{
    path: '/user',
    name: 'UserView',
    component: () => import('../views/UserView.vue'),
    meta: {show:true}
  },{
    path: '/user/search',
    name: 'UserSearchView',
    component: () => import('../views/UserSearchView.vue'),
    meta: {show:true}
  },{
    path: '/team/search',
    name: 'TeamSearchView',
    component: () => import('../views/TeamSearchView.vue'),
    meta: {show:true}
  },{
    path: '/team',
    name: 'TeamView',
    component: () => import('../views/TeamView.vue'),
    meta: {show:true}
  },{
    path: '/room/search',
    name: 'RoomSearchView',
    component: () => import('../views/RoomSearchView.vue'),
    meta: {show:true}
  },{
    path: '/room',
    name: 'RoomView',
    component: () => import('../views/RoomView.vue'),
    meta: {show:true}
  }/* ,{
    path: '/team/favour_list',
    name: 'TeamFavourView',
    component: () => import('../views/TeamFavourView.vue'),
    meta: {show:true}
  } */,{
    path: '/whisper',
    name: 'MessageView',
    component: () => import('../views/MessageView.vue'),
    meta: {show:true}
  },{
    path: "*", redirect: "/"
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.hideComponent) { // 判断是否需要隐藏组件
    to.meta.hideComponent.hide = true;
  } else {
    next();
  }
});

const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
export default router

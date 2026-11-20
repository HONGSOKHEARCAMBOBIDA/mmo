import { createRouter, createWebHistory, type RouteLocationNormalized, } from 'vue-router'
import { useUserDataStore } from '../store/user_date.ts';
import { useAuthStore } from '../store/auth.ts';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        meta: {
          title: "សង្ខែបទិន្ន័យ",
          icon: "Odometer",
          short: "ទិន្ន័យ",
          showInNav: true,
        },
        redirect: "/Dashboard/Room",
        children:[
          {
            path: "Room",
            name: "Room",
            component: () => import("../views/Room.vue"),
            meta: { title: "បន្ទប់", showInNav: false },
          },   
          {
            path: "Building",
            name: "Building",
            component: () => import("../views/Building.vue"),
            meta: { title: "អគ្គារ", showInNav: false },
          },      
          {
            path: "Floor",
            name: "Floor",
            component: () => import("../views/Floor.vue"),
            meta: { title: "ជាន់", showInNav: false },
          },      
        ]
      },      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to:RouteLocationNormalized) => {
  const userDataStore = useUserDataStore();
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isLoggedIn) {
    return { name: "Room" };
  }
  if (to.name === "Room" && auth.isLoggedIn) {
    return { name: "Room" };
  }
  if (to.meta.permission) {
    const hasPermission = userDataStore.permissions.includes(
      to.meta.permission
    );

    if (!hasPermission) {
      return { name: 'Room' };
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'HomeView',
      path: '/HomeView',
      component: HomeView,
    },
    {
      name: 'ces',
      path: '/ces',
      component: () => import('@/views/ces/index.vue')
    },
    {
      name: 'PersonalCenter',
      path: '/PersonalCenter',
      component: () => import('@/views/PersonalCenter/PersonalCenter.vue')
    },
    {
      name: 'PersonagePage',
      path: '/PersonagePage',
      component: () => import('@/views/TwoUser/PersonagePage.vue')
    },
    {
      name: 'SetNamePage',
      path: '/SetNamePage',
      component: () => import('@/views/TwoUser/SetNamePage/setNamePage.vue')
    },
    {
      name: 'SetSex',
      path: '/SetSex',
      component: () => import('@/views/TwoUser/SetSex/SetSex.vue')
    },
    {
      name: 'SetEmail',
      path: '/SetEmail',
      component: () => import('@/views/TwoUser/SetEmail/SetEmail.vue')
    },
    {
      name: 'SetPhone',
      path: '/SetPhone',
      component: () => import("@/views/TwoUser/SetPhone/SetPhone.vue")
    },
    {
      name: 'jurisdiction',
      path: '/jurisdiction',
      component: () => import('@/views/jurisdiction/index.vue'),
      children: [
        {
          name: 'home',
          path: 'home',
          component: () => import("@/views/jurisdictionHome/jurisdictionHome.vue")
        },
        {
          name: 'MaintainPage',
          path: 'maintainPage',
          component: () => import("@/views/MaintainPage/MaintainPage.vue")
        },
        {
          name: 'schedule',
          path: 'schedule',
          component: () => import("@/views/schedule/schedule.vue")
        },
        {
          name: 'Examine',
          path: 'Examine',
          component: () => import("@/views/Examine/Examine.vue")
        },
        {
          name: 'TaskProcessing',
          path: 'TaskProcessing',
          component: () => import('@/views/TaskProcessing/TaskProcessing.vue')
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        window.scrollTo({
          top: savedPosition.top,
          behavior: 'smooth'
        });
        resolve(savedPosition);
      });
    } else {
      return { top: 0 };
    }
  }
})

export default router

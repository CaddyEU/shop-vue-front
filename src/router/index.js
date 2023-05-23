import { createRouter, createWebHistory } from "vue-router"

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/itemListView.vue")
        },
        {
          path: "/userList",
          name: "users",
          component: () => import("../views/userListView.vue")
        },
        {
          path: "/itemList",
          name: "itemList",
          component: () => import("../views/itemListView.vue")
        },
        {
          path: "/reviewList",
          name: "reviews",
          component: () => import("../views/reviewListView.vue")
        },
    ],
  })

  export default router
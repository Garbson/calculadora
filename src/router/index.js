import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "calculadora",
      component: () => import("../views/CalculadoraView.vue"),
    },
    {
      path: "/historico",
      name: "historico",
      component: () => import("../views/HistoricoView.vue"),
    },
]
});

export default router;
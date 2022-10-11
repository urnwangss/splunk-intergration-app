import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views"),
    redirect: { name: "List" },
    children: [
      {
        path: "list",
        name: "List",
        component: () => import("@/views/list"),
      },
      {
        path: "example",
        name: "Example",
        component: () => import("@/views/example"),
      },
    ],
  },
  {
    path: "/add",
    name: "Add",
    component: () => import("@/views/info"),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("@/views/info"),
    props: {
      type: "edit",
    },
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import("@/views/detail"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

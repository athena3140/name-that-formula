import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "naming",
		component: () => import("../views/FormulaNaming.vue"),
	},
	{
		path: "/writing",
		name: "writing",
		component: import("../views/FormulaWriting.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

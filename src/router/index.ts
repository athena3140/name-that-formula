import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "naming",
		component: () => import("../views/FormulaNaming.vue"),
		meta: { layout: "default" },
	},
	{
		path: "/writing",
		name: "writing",
		component: () => import("../views/FormulaWriting.vue"),
		meta: { layout: "default" },
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notFound",
		component: () => import("../views/notFound.vue"),
		meta: { layout: null },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

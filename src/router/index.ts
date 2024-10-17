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
		path: "/guide",
		name: "guide",
		component: () => import("../views/guideView.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notFound",
		component: () => import("../views/notFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}

		if (to.path == "/guide" && to.hash != "") {
			return { el: to.hash, behavior: "smooth" };
		}

		return { top: 0 };
	},
});

export default router;

import { createStore } from "vuex";

export default createStore({
	state: {
		currentMode: "naming",
		currentData: JSON.parse(localStorage.getItem("currentData") || "{}"),
		alertStatus: { isData: false, isCorrect: "", message: "" },
	},
	getters: {
		currentData: (state) => state.currentData,
	},
	mutations: {
		changeMode: (state, mode) => {
			state.currentMode = mode;
		},
		changeCurrentData: (state, data) => {
			const currentData = { ...state.currentData };

			if (state.currentMode == "naming") {
				currentData.naming = data;
			} else {
				currentData.writing = data;
			}

			state.currentData = currentData;
			localStorage.setItem("currentData", JSON.stringify(currentData));
		},
		changeAlertStatus: (state, data) => {
			state.alertStatus = data;
			!data.timeout ? (data.timeout = 3000) : null;

			setTimeout(() => {
				state.alertStatus.isData = false;
			}, data.timeout);
		},
	},
	actions: {},
	modules: {},
});

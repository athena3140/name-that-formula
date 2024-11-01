import { createStore } from "vuex";

export default createStore({
	state: {
		currentMode: "naming",
		currentData: JSON.parse(localStorage.getItem("currentData") || "{}"),
		currentScore: JSON.parse(
			localStorage.getItem("currentScore") || '{"correctAnswers":0,"skippedQuestions":0,"totalQuestion":0}'
		),
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
		},
		updateScore(state, data) {
			const currentScore = { ...state.currentScore };

			if (data.isCorrect) {
				currentScore.correctAnswers++;
			}

			if (data.isSkipped) {
				currentScore.skippedQuestions++;
			}

			currentScore.totalQuestion++;
			state.currentScore = currentScore;
			localStorage.setItem("currentScore", JSON.stringify(currentScore));
		},
	},
	actions: {},
	modules: {},
});

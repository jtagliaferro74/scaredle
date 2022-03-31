import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
	state: {
		settings: {
			showNames: true,
		},
		stats: {
			gamesPlayed: 0,
			gamesWon: 0,
			currentStreak: 0,
			maxStreak: 0,
			winResults: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
				6: 0,
			},
			lastGamePlayed: 0,
			lastGameCompleted: 0,
		},
		currentGame: {
			gamestate: "start",
			guesses: [],
			guessesRemaining: 6,
		},
	},
	mutations: {
		// settings
		setSettingsShowNames(state, payload) {
			state.settings.showNames = payload;
		},

		// stats
		incrementGamesPlayed(state) {
			state.stats.gamesPlayed++;
		},
		incrementGamesWon(state) {
			state.stats.gamesWon++;
		},
		incrementCurrentStreak(state) {
			state.stats.currentStreak++;
		},
		resetCurrentStreak(state) {
			state.stats.currentStreak = 0;
		},
		setMaxStreak(state, payload) {
			state.stats.maxStreak = payload;
		},
		addWinResult(state, index) {
			state.stats.winResults[index]++;
		},
		resetSettings(state) {
			state.settings = {
				showNames: true,
			};
		},
		resetStats(state) {
			state.stats = {
				gamesPlayed: 0,
				gamesWon: 0,
				currentStreak: 0,
				maxStreak: 0,
				winResults: {
					1: 0,
					2: 0,
					3: 0,
					4: 0,
					5: 0,
					6: 0,
				},
				lastGamePlayed: 0,
				lastGameCompleted: 0,
			};
		},
		resetGame(state) {
			state.currentGame = {
				gamestate: "start",
				guesses: [],
				guessesRemaining: 6,
			};
		},
		setGameGuesses(state, payload) {
			state.currentGame.guesses = payload;
		},
		setGameGuessesRemaining(state, payload) {
			state.currentGame.guessesRemaining = payload;
		},
		setGameState(state, payload) {
			state.currentGame.gamestate = payload;
		},
		setLastGamePlayed(state, payload) {
			state.stats.lastGamePlayed = payload;
		},
		setLastGameCompleted(state, payload) {
			state.stats.lastGameCompleted = payload;
		},
	},
	plugins: [createPersistedState()],
});

export default store;

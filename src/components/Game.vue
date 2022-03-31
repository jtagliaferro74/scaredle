<template>
	<Navbar
		@click-help="showInstructions = true"
		@click-stats="showStats = true"
		@click-settings="showSettings = true"
		@click-support="showSupport = true"
	/>
	<Modal id="statsModal" v-show="showStats" @close="showStats = false">
		<template v-slot:header>
			<h3 class="modal-header">Statistics</h3>
		</template>
		<template v-slot:body>
			<div class="stats">
				<div class="stats-row">
					<div class="stats-object">
						<div class="stat">{{ gamesPlayed }}</div>
						<div class="stat-label">Played</div>
					</div>
					<div class="stats-object">
						<div class="stat">{{ gamesWon }}</div>
						<div class="stat-label">Won</div>
					</div>
					<div class="stats-object">
						<div class="stat">{{ winPercentage }}</div>
						<div class="stat-label">Win %</div>
					</div>
					<div class="stats-object">
						<div class="stat">{{ currentStreak }}</div>
						<div class="stat-label">Streak</div>
					</div>
					<div class="stats-object">
						<div class="stat">{{ maxStreak }}</div>
						<div class="stat-label">Max Streak</div>
					</div>
				</div>

				<table
					id="guess-chart"
					class="charts-css bar data-spacing-2 show-labels show-heading"
				>
					<caption>
						Guess Distribution
					</caption>

					<tbody>
						<tr v-for="i in 6" :key="i">
							<th scope="row">{{ i }}</th>
							<td
								:style="getWinDistributionBarLength(i)"
								:class="{ active: checkGuesses(i) }"
							>
								{{ winResults[i] }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
		<template v-if="gamestate === 'win' || gamestate === 'lose'" v-slot:footer>
			<div class="share">
				<div class="next">
					<div class="timer">
						<div class="timer-label">NEXT</div>
						<div class="timer-clock">
							<vue-countdown
								:endDateTime="new Date(new Date().setHours(24, 0, 0, 0))"
							>
								<template
									v-slot:default="{ countdown }"
									:endDateTime="new Date(new Date().setHours(24, 0, 0, 0))"
								>
									{{ formatDigit(countdown.remainingHours.value) }}:{{
										formatDigit(countdown.remainingMinutes.value)
									}}:{{ formatDigit(countdown.remainingSeconds.value) }}
								</template>
							</vue-countdown>
						</div>
					</div>
				</div>
				<button class="share-btn" @click="share">
					<div>SHARE</div>
					<Icon id="main-icon" icon="ep:share" width="20" />
				</button>
			</div>
			<div>
				<KoFiButton
					id="kofi-btn"
					username="joetagliaferro"
					color="#13C3FF"
					title="Support Scaredle!"
				/>
			</div>
		</template>
	</Modal>
	<Modal id="supportModal" v-show="showSupport" @close="showSupport = false">
		<template v-slot:header>
			<h3 class="modal-header">Support</h3>
		</template>
		<template v-slot:body>
			<div class="support-body-container">
				<div class="support-text">
					<p>
						Hey, thanks for playing! This was a fun game I made by myself and I am
						overjoyed that it has made its way to you.
					</p>
					<p>
						If you've enjoyed playing, please consider supporting the project – I
						promise I'll do my best to keep updating and improving Scaredle as long as
						people keep playing.
					</p>
				</div>
				<div class="support-quote">
					<q>To a new world of gods and monsters!</q>
				</div>
				<KoFiButton
					id="kofi-btn"
					username="joetagliaferro"
					color="#13C3FF"
					title="Support Scaredle!"
				/>
			</div>
		</template>
		<template v-slot:footer> </template>
	</Modal>
	<main>
		<transition name="open" mode="in-out">
			<h3 v-show="gamestate === 'win' || gamestate === 'lose'" style="transition-delay: 1s">
				{{ todaysMovie.title }} <span class="italic">({{ todaysMovie.year }})</span>
			</h3>
		</transition>
		<section id="deaths">
			<div
				aria-label="Skull"
				@click="activeDeathIndex = i"
				v-for="(death, i) in todaysMovie.deaths"
				:key="i"
				:class="[
					'death',
					{
						'death--hidden': i >= guesses.length && gamestate !== 'win',
						'death--active': activeDeathIndex === i,
					},
				]"
			>
				<Icon id="main-icon" icon="raphael:skull" :width="iconSize" />
				<p
					v-if="
						showNames &&
						(guesses.length >= i || gamestate == 'win' || gamestate == 'lose')
					"
				>
					{{ death.name }}
				</p>
			</div>

			<p
				v-if="
					(guessesRemaining < 6 || gamestate == 'win' || gamestate == 'lose') &&
					activeDeathIndex <= todaysMovie.deaths.length - 1
				"
				class="death-description"
			>
				{{ todaysMovie.deaths[activeDeathIndex].description }}
			</p>
			<p v-else class="death-description"></p>
		</section>

		<section id="guesses">
			<template v-for="(guess, i) in guesses" :key="i">
				<transition name="open" appear>
					<div
						style="transition-delay: 0s"
						:class="['guess', { 'guess_title--correct': checkWin(guess) }]"
					>
						<p>{{ guess.title }}</p>
					</div>
				</transition>
				<transition name="open" appear>
					<div
						style="transition-delay: 0.25s"
						:class="[
							'guess',
							{ 'guess_year--almost': sameDecade(guess.year, todaysMovie.year) },
							{ 'guess_year--correct': guess.year === todaysMovie.year },
						]"
					>
						<p>
							{{ guess.year }}
						</p>
					</div>
				</transition>
				<transition name="open" appear>
					<div
						style="transition-delay: 0.5s"
						v-if="guess.year < todaysMovie.year"
						class="guess"
					>
						<p>🔺</p>
					</div>
					<div
						style="transition-delay: 0.5s"
						v-else-if="guess.year > todaysMovie.year"
						class="guess"
					>
						<p>🔻</p>
					</div>
					<div v-else style="transition-delay: 0.5s" class="guess">
						<p>✅</p>
					</div>
				</transition>
			</template>

			<template v-for="i in 6 - guesses.length" :key="i">
				<div class="empty-guess"></div>
			</template>
		</section>

		<section>
			<label v-show="gamestate === 'start' || gamestate === 'playing'" for="movie-select"
				>Movie</label
			>
			<v-select
				v-show="gamestate === 'start' || gamestate === 'playing'"
				id="movie-select"
				v-model="currentGuess"
				placeholder="Choose a movie..."
				:clearable="false"
				label="title"
				:options="options"
				:get-option-label="(option) => option.title"
				append-to-body
				:calculate-position="withPopper"
				@dropdown:appending="({ el }) => el.classList.add('my-custom-select')"
			>
				<template #option="{ title, year }">
					{{ title }}
					<br />
					<cite>{{ year }}</cite>
				</template>
			</v-select>
			<!-- <input type="text" placeholder="Guess a movie..." /> -->
			<button
				v-if="gamestate === 'start' || gamestate === 'playing'"
				class="game-btn"
				@click="makeGuess"
			>
				🔪Take a Stab
			</button>
			<button v-else class="game-btn game-btn--share" @click="share">Share</button>
		</section>
		<transition name="open" mode="in-out" appear>
			<section v-show="showInstructions" id="how-to-play">
				<div class="instructions">
					<div class="instructions_header">
						<h2>HOW TO PLAY</h2>
						<button @click="showInstructions = false">&times;</button>
					</div>
					<p>Guess the <strong>SCAREDLE</strong> in six tries.</p>
					<p>Each guess must be a movie in our list.</p>
					<hr />
					<p>
						After each guess, you will learn the details of how one character in the
						movie met their end.
					</p>
					<div class="instruction_deaths">
						<div aria-label="Instruction Skull" class="death death--active">
							<Icon id="main-icon" icon="raphael:skull" :width="iconSize" />
							<p>Joe</p>
						</div>
						<p class="death-description">Stabbed with a machete</p>
					</div>
					<p>
						You will also learn whether the release year of the mystery movie is higher
						or lower than the release year of the movie you guessed.
					</p>
					<div class="instruction_guesses">
						<div class="guess">
							<p>Dracula</p>
						</div>
						<div class="guess">
							<p>1931</p>
						</div>
						<div class="guess">
							<p>🔺</p>
						</div>
						<div class="guess">
							<p>Pet Sematary</p>
						</div>
						<div class="guess guess_year--almost">
							<p>1989</p>
						</div>
						<div class="guess">
							<p>🔻</p>
						</div>
						<div class="empty-guess"></div>
					</div>
					<p>
						The movie in the above example came out after Dracula in 1931, but before
						and in the same decade as Pet Sematary in 1989.
					</p>
					<hr />
					<p>A new <strong>SCAREDLE</strong> will be available each day!</p>
				</div>
			</section>
		</transition>
		<transition name="open" mode="in-out">
			<section v-show="showSettings" id="settings">
				<div class="instructions">
					<div class="settings_header">
						<h2>Settings</h2>
						<button @click="showSettings = false">&times;</button>
					</div>
					<div class="settings_container">
						<div class="settings_row">
							<div>
								<label class="setting_label" for="showNamesToggle"
									>Show Names</label
								>
								<p class="setting_description">
									Turn off to hide the names of characters to avoid potential
									spoilers.
								</p>
							</div>
							<ToggleSwitch
								:value="showNames"
								id="showNamesToggle"
								@input="updateShowNames"
								onColor="var(--primary-color)"
							/>
						</div>
						<div class="settings_row">
							<div>
								<label class="setting_label" for="showNamesToggle"
									>Delete Saved Data</label
								>
								<p class="setting_description">
									Permanently delete all of your stored settings and statistics.
									This action cannot be undone.
								</p>
							</div>
							<button class="setting_btn--reset" type="submit" @click="resetData">
								Delete
							</button>
						</div>
						<div class="special-thanks">
							<p>
								SCAREDLE was heavily insipired by
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.powerlanguage.co.uk/wordle/"
									>Wordle</a
								>
								created by
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://twitter.com/powerlanguish"
									>Josh Wardle</a
								>
							</p>
							<p>
								Special thanks to
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://twitter.com/carebecc"
									>Chelsea Rebecca</a
								>
								and
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://twitter.com/JamesAJanisse"
									>James A. Janisse</a
								>
								of the YouTube Channel
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.youtube.com/deadmeat"
									>Dead Meat</a
								>
								because I definitely wouldn't have been able to make this without
								their Kill Counts. Most of the kill descriptions are theirs.
							</p>
							<p>Special thanks to Jesse - you know what you did.</p>
							<p>
								If you have any questions, find a bug, or want to suggest a movie
								that's not currently in the game, you can send me a DM on twitter
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://twitter.com/jtagliaferro74"
									>@jtagliaferro74</a
								>
							</p>
							<p>
								Skull Icon by
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dmitrybaranovskiy/raphael"
									>Dmitry Baranovskiy</a
								>
							</p>
						</div>
						<footer>
							<small>&copy; {{ currentYear }} Joe Tagliaferro</small>
						</footer>
					</div>
				</div>
			</section>
		</transition>
	</main>
</template>

<script>
	import KoFiButton from "./KoFiButton.vue";
	import Navbar from "./Navbar.vue";
	import Modal from "./Modal.vue";
	import ToggleSwitch from "./ToggleSwitch.vue";
	import { Icon } from "@iconify/vue";
	import { createPopper } from "@popperjs/core";
	import movies from "../random_movies.json";
	import movieOptions from "../sorted_movies.json";
	import "charts.css";
	export default {
		components: {
			Icon,
			Navbar,
			Modal,
			ToggleSwitch,
			KoFiButton,
		},
		data() {
			return {
				iconSize: "64px",
				activeDeathIndex: -1,
				showInstructions: true,
				showSettings: false,
				showStats: false,
				showSupport: false,
				showNames: this.$store.state.settings.showNames,
				currentGameNumber: 0,
				todaysMovie: {},
				guesses: this.$store.state.currentGame.guesses,
				currentGuess: null,
				options: movieOptions,
				placement: "top",
				fuck: false,
			};
		},
		created() {
			// get todays movie and game number
			this.currentGameNumber = this.getCurrentGameNumber();
			this.todaysMovie = movies[this.getMovieIndex(this.currentGameNumber)];

			// check if we broke our streak
			if (this.lastGameCompleted < this.currentGameNumber - 1) {
				this.$store.commit("resetCurrentStreak");
			}

			// check if we're still on the same game, and reset game data if not
			if (this.lastGamePlayed != this.currentGameNumber) {
				this.$store.commit("resetGame");
				this.guesses = [];
			}

			// show instructions only if this is a new game
			if (this.gamestate != "start") {
				this.showInstructions = false;
			}

			// set this game to last game played. needed for if we need to reset game data
			this.$store.commit("setLastGamePlayed", this.currentGameNumber);

			// set active death index to last given death or -1 if just started
			this.activeDeathIndex = this.guesses.length - 1;
		},
		computed: {
			guessesRemaining: function () {
				return 6 - this.guesses.length;
			},
			gamestate: function () {
				return this.$store.state.currentGame.gamestate;
			},
			gamesPlayed: function () {
				return this.$store.state.stats.gamesPlayed;
			},
			gamesWon: function () {
				return this.$store.state.stats.gamesWon;
			},
			winPercentage: function () {
				return this.gamesPlayed <= 0
					? 0
					: Math.round((this.gamesWon / this.gamesPlayed) * 100);
			},
			currentStreak: function () {
				return this.$store.state.stats.currentStreak;
			},
			maxStreak: function () {
				return this.$store.state.stats.maxStreak;
			},
			winResults: function () {
				return this.$store.state.stats.winResults;
			},
			lastGamePlayed: function () {
				return this.$store.state.stats.lastGamePlayed;
			},
			lastGameCompleted: function () {
				return this.$store.state.stats.lastGameCompleted;
			},
			currentYear: function () {
				return new Date().getFullYear();
			},
		},
		methods: {
			checkGuesses(num) {
				// helper function for stats modal to highlight specified bar
				return this.gamestate === "win" && this.guesses.length === num;
			},
			formatDigit(val) {
				// format digits to have leading 0s...
				return val >= 10 ? `${val}` : `0${val}`;
			},
			getCurrentGameNumber() {
				// get number of days between start date and current
				const startDate = new Date("2022-03-31");
				let timeDiff = new Date().setHours(0, 0, 0, 0) - startDate.getTime();
				return Math.floor(timeDiff / (1000 * 3600 * 24)); // current Game number
			},
			getMovieIndex(currentGameNumber) {
				// return modded index so game can continue looping
				return currentGameNumber % movies.length;
			},
			updateShowNames(value) {
				// update setting
				this.showNames = value;
				this.$store.commit("setSettingsShowNames", value);
			},
			resetData() {
				// reset setings and stats
				this.$store.commit("resetSettings");
				this.$store.commit("resetStats");

				// make last game played before current game date.
				// this will reset game data on reload
				this.$store.commit("setLastGamePlayed", -1);
				history.go(0); // refreah page
			},
			makeGuess() {
				// if user hasn't entered a search in the select field
				if (!this.currentGuess) {
					// show toast message
					this.$toast.show(`Please select a title from the list.`, { duration: 2000 });
				} else {
					// update gamestate
					this.$store.commit("setGameState", "playing");

					// if user still has guesses available
					if (this.guessesRemaining > 0) {
						// add guess to guesses array
						this.guesses.push(this.currentGuess);
						this.$store.commit("setGameGuesses", this.guesses);
						// if guess is correct
						if (this.checkWin(this.currentGuess)) {
							// update active death (unnecessary, but might as well)
							this.activeDeathIndex = this.guesses.length - 1;
							this.endGame("win"); // end game with 'win' status
							return; // break out of method
						}
						// we only reach here if our guess was wrong

						// update remaining guesses
						this.$store.commit("setGameGuessesRemaining", this.guessesRemaining);
						// empty guess field
						this.currentGuess = null;
						// if that was our last guess (and it was incorrect)
						if (this.guessesRemaining === 0) {
							this.endGame("lose"); // end game with 'lose' status
						} else {
							// if we changed what death we were looking at prior to guessing
							if (this.activeDeathIndex < this.todaysMovie.deaths.length - 1) {
								// update it with most recently revealed death
								this.activeDeathIndex = this.guesses.length - 1;
							}
						}
					}
				}
			},
			endGame(gamestate) {
				// update gamestate, last game played
				this.$store.commit("setGameState", gamestate);
				this.$store.commit("setLastGameCompleted", this.currentGameNumber);
				// increment games played, current streak, and max streak if needed
				this.$store.commit("incrementGamesPlayed");
				this.$store.commit("incrementCurrentStreak");
				if (this.currentStreak > this.maxStreak) {
					this.$store.commit("setMaxStreak", this.currentStreak);
				}
				// handle end game state
				switch (gamestate) {
					case "win":
						// increment games won and corresponding value in winresults dicitonary
						this.$store.commit("incrementGamesWon");
						this.$store.commit("addWinResult", this.guesses.length);
						break;
					case "lose":
						break;
				}
				// show stats modal 2.5 seconds after winning/losing
				setTimeout(() => {
					this.showStats = true;
				}, 2500);
			},
			checkWin(guess) {
				// check if guessed name and year are same as todays movie
				// note: this could be changed to just return the boolean value straight up
				// but i wasn't sure if this method would be expanded upon in the future
				// so i'll just leave it as is
				if (
					guess.title === this.todaysMovie.title &&
					guess.year === this.todaysMovie.year
				) {
					return true;
				} else {
					return false;
				}
			},
			share() {
				// add header to string for game summary
				let resultStr = this.gamestate === "lose" ? "x" : `${this.guesses.length}`;
				let str = `Scaredle #${this.currentGameNumber + 1} ${resultStr}/6\n`;

				// add game summary to string
				this.guesses.forEach((guess) => {
					if (this.checkWin(guess)) {
						str += "🎈✅";
					} else {
						str += "💀";
						if (guess.year > this.todaysMovie.year) {
							str += "🔻";
						} else if (guess.year < this.todaysMovie.year) {
							str += "🔺";
						} else {
							str += "✅";
						}
						str += "\n";
					}
				});

				str += "https://scaredle.com";

				// copy game summary string to clipboard, for easy copy and paste
				navigator.clipboard.writeText(str);
				this.$toast.show(`Copied to Clipboard`, { duration: 2000 });
			},
			getWinDistributionBarLength(index) {
				// helper function to determine stat modal bar graph bar sizes
				// highest number in winresults object equals 1
				// all others are proportionl to that 1
				// i.e. if max is 3. bar grapoh with 3 will have length of 100%
				// bar graph of 1 will have length of 33.3%
				// min value is 0.08 because that still looks good
				let objectValues = Object.values(this.winResults);
				let max = Math.max(...objectValues);
				if (max === 0) {
					max = 0.08;
				}
				return `--size: ${Math.max(this.winResults[index] / max, 0.08)}`;
			},
			sameDecade(year1, year2) {
				// Check if 2 years are in same decade (i.e. 1970 - 1979)
				return Math.floor(year1 / 10) === Math.floor(year2 / 10);
			},
			withPopper(dropdownList, component, { width }) {
				dropdownList.classList.add("test1");
				/**
				 * We need to explicitly define the dropdown width since
				 * it is usually inherited from the parent with CSS.
				 */
				dropdownList.style.width = width;

				/**
				 * Here we position the dropdownList relative to the $refs.toggle Element.
				 *
				 * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
				 * the dropdownList overlap by 1 pixel.
				 *
				 * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
				 * wrapper so that we can set some styles for when the dropdown is placed
				 * above.
				 */
				const popper = createPopper(component.$refs.toggle, dropdownList, {
					placement: this.placement,
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -1],
							},
						},
						{
							name: "toggleClass",
							enabled: true,
							phase: "write",
							fn({ state }) {
								component.$el.classList.toggle(
									"drop-up",
									state.placement === "top"
								);
							},
						},
					],
				});

				/**
				 * To prevent memory leaks Popper needs to be destroyed.
				 * If you return function, it will be called just before dropdown is removed from DOM.
				 */
				return () => popper.destroy();
			},
		},
	};
</script>

<style scoped>
	main {
		max-width: 500px;
		padding: 0 1em;
		margin: 0 auto;
		text-align: left;
	}

	.italic {
		font-style: italic;
		font-weight: 500;
		color: red;
	}
	.instruction_deaths,
	#deaths {
		display: flex;
		justify-content: center;
		/* align-items: center; */
		flex-wrap: wrap;
		margin: 0 2em;
		margin-bottom: 1em;
	}
	.death,
	.death--hidden {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		text-align: center;

		margin: 0 0.25em;
		margin-bottom: 0.5em;

		font-size: 14px;
	}

	.death svg {
		transition: all 0.2s ease-out;
	}

	.death:hover {
		cursor: pointer;
	}
	.death--active svg {
		/* fill: var(--primary-color); */
		color: var(--primary-color);
	}

	.death--hidden {
		pointer-events: none;
	}

	.death--hidden svg {
		color: var(--neutral-color);
	}

	.death--hidden p {
		display: none;
	}

	.death-description {
		display: block;
		width: 100%;
		text-align: center;
	}

	.death p {
		background-color: #2b2b2b;
		border: 1px solid var(--neutral-color);
		border-radius: 0.25em;
		/* padding: 0.5rem; */
		/* width: 100%; */
		margin: 0;
		max-width: 72px;
		width: 100%;
		/* width: 100%; */
	}
	.instruction_guesses,
	#guesses {
		display: grid;
		/* grid-template-columns: 5fr 1.5fr 1fr; */
		grid-template-columns: minmax(0, 5fr) 1.5fr 1fr;
		grid-gap: 0.25em;
		margin-bottom: 1em;
	}
	.guess {
		box-sizing: border-box;
		width: 100%;
		margin: auto;
		background-color: transparent;
		border: 1px solid var(--neutral-color);
		padding: 0.5em 0;
		display: flex;
		justify-content: center;
		font-size: 14px;
		max-height: 2rem;
		transition: all 0.2s ease-out;
	}

	.guess_year--almost {
		color: #ffd905;
	}

	.guess_title--correct,
	.guess_year--correct {
		/* color: #13a500; */
		color: #17c400;
	}

	.guess p {
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0 0.25em;
	}

	.empty-guess {
		grid-column: 1 / -1;
		background-color: var(--neutral-color);

		box-sizing: border-box;
		width: 100%;
		margin: auto;

		display: flex;
		justify-content: center;
		font-size: 14px;
		height: 2rem;
	}

	input {
		width: 100%;
		box-sizing: border-box;
		margin: 0;
		padding: 0.5em;
		display: flex;
		justify-content: center;
		background-color: #2b2b2b;
		border: 2px solid #3f3f3f;
		color: white;
		font-size: 10px;
	}

	.game-btn {
		width: 100%;
		padding: 0.5em 0.25em;
		box-sizing: border-box;
		margin: 0.5em 0;
		color: white;
		background-color: var(--neutral-color-dark);
		border: 2px solid var(--primary-color);
		border-radius: 4px;
		transition: background-color 0.2s ease-out;
	}

	.game-btn--share,
	.game-btn:hover {
		cursor: pointer;
		background-color: var(--primary-color);
	}

	.game-btn--share:hover {
		background-color: var(--primary-color-dark);
		border-color: var(--primary-color-dark);
	}
	#settings,
	#how-to-play {
		z-index: 999;
		position: absolute;
		width: 100%;
		height: 90%;
		top: 0;
		left: 0;
		background-color: var(--neutral-color-dark);
	}
	.instructions {
		width: 75%;
		margin: auto;
	}
	#how-to-play hr {
		border: none;
		border-bottom: 1px solid var(--neutral-color);
	}

	.settings_header,
	.instructions_header {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.settings_header button,
	.instructions_header button {
		position: absolute;
		right: 0;
		cursor: pointer;
		background: none;
		border: none;
		color: white;
		font-size: 2.5em;
		padding: 0;
		transition: color 0.2s ease;
	}
	.settings_header button:hover,
	.instructions_header button:hover {
		color: var(--primary-color);
	}

	#movie-select {
		--vs-controls-color: #3f3f3f;
		--vs-border-color: #3f3f3f;

		--vs-dropdown-bg: #2b2b2b;
		--vs-dropdown-color: white;
		--vs-dropdown-option-color: white;

		--vs-selected-bg: #664cc3;
		--vs-selected-color: #eeeeee;

		--vs-search-input-color: #eeeeee;

		--vs-dropdown-option--active-bg: #664cc3;
		--vs-dropdown-option--active-color: #eeeeee;
	}

	[data-popper-placement="top"] {
		border-radius: 4px;
		border-top-style: solid;
		border-bottom-style: none;
		box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
	}

	h3 {
		text-align: center;
	}

	.modal-header h3 {
		margin: 0;
		text-align: center;
		border: none;
		padding: 0;
	}

	.stats .stats-row {
		display: flex;
		justify-content: space-around;
		/* align-items: center; */
	}

	.stats-row {
		margin-bottom: 16px;
	}

	.stats-row .stat {
		font-size: 30px;
	}
	.stats-row .stat-label {
		font-size: 12px;
		max-width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	}

	table td {
		padding-right: 8px;
	}

	#guess-chart {
		--color: var(--neutral-color);
	}

	#guess-chart th {
		align-items: flex-end;
		padding-right: 12px;
	}

	#guess-chart tr {
		padding-right: 20px;
		margin: 0 0 0 40px;
	}
	#guess-chart td {
		padding-left: 14px;
		/* margin: 0 0 0 40px; */
	}

	#guess-chart .active {
		--color: var(--primary-color);
	}

	.share {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.share .timer .timer-clock {
		font-size: 2em;
	}

	.share .share-btn {
		width: 40%;
		height: 100%;
		/* padding: 0.5em 0.25em; */
		/* box-sizing: border-box; */
		/* margin: 0.5em 0; */
		color: white;
		background-color: var(--primary-color);
		border: none;
		border-radius: 6px;
		transition: background-color 0.2s ease-out;
		cursor: pointer;
		font-size: 1.2em;
		font-weight: bold;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-transform: uppercase;
	}

	.share .share-btn:hover {
		background-color: var(--primary-color-dark);
	}

	.settings_header {
		margin-bottom: 3em;
	}

	.settings_row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid var(--neutral-color);
		margin: 1em 0;
	}

	.settings_row .setting_label {
		font-weight: bold;
	}

	.settings_row .setting_description {
		font-size: 12px;
		color: var(--neutral-color-light);
		margin-top: 2px;
	}
	.special-thanks {
		font-size: 12px;
		color: var(--neutral-color-light);
	}
	.special-thanks a {
		color: var(--neutral-color-lightest);
	}

	#showNamesToggle {
		padding-left: 10px;
	}

	.setting_btn--reset {
		color: white;
		background-color: var(--neutral-color);
		border: none;
		border-radius: 4px;
		padding: 0.75em 1em;
		margin-left: 10px;
		margin-bottom: 1em;
		cursor: pointer;
		align-self: center;
	}
	.setting_btn--reset:hover {
		background-color: #2b2b2b;
	}

	.support-body-container {
		padding: 0 1em;
	}
	.support-text {
		margin-bottom: 16px;
	}
	.support-text p {
		margin-top: 0;
		text-align: left;
		line-height: 1.4;
	}

	#modalFooter {
		padding-top: 20px;
		background-color: #fff;
	}

	.support-quote {
		color: hsl(240, 3%, 30%);
		padding: 10px 0;
		font-style: italic;
	}

	#kofi-btn {
		align-self: center;
		padding: 1em;
	}

	.open-enter-active,
	.open-leave-active {
		transition: all 0.3s ease;
	}
	.open-enter-from,
	.open-leave-to {
		transform: translateY(20px);
		opacity: 0;
	}

	@keyframes kofi-wiggle {
		0% {
			transform: rotate(0) scale(1);
		}
		60% {
			transform: rotate(0) scale(1);
		}
		75% {
			transform: rotate(0) scale(1.12);
		}
		80% {
			transform: rotate(0) scale(1.1);
		}
		84% {
			transform: rotate(-10deg) scale(1.1);
		}
		88% {
			transform: rotate(10deg) scale(1.1);
		}
		92% {
			transform: rotate(-10deg) scale(1.1);
		}
		96% {
			transform: rotate(10deg) scale(1.1);
		}
		100% {
			transform: rotate(0) scale(1);
		}
	}

	@media only screen and (max-width: 360px) {
		.death svg {
			height: 48px;
			width: 48px;
		}
		.death-description {
			font-size: 14px;
		}
	}
</style>

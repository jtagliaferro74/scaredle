<template>
	<Game />
</template>

<script>
	import Game from "./components/Game.vue";

	export default {
		name: "Scaredle",
		components: {
			Game,
		},
	};
</script>

<style>
	@import "./assets/styles/variables.css";
	html,
	body {
		margin: 0;
		background-color: var(--neutral-color-dark);
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: white;
		/* margin-top: 60px; */
	}
	body .vs__dropdown-menu {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		color: white;
		background-color: #2b2b2b;
		font-size: 14px;
	}
	body .vs__dropdown-menu li {
		border: 1px solid var(--neutral-color);
	}

	body .vs__search {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 75%;
		font-size: 14px;
	}

	body span .vs__selected {
		font-size: 14px;
	}

	body .vs__dropdown-toggle {
		font-size: 14px;
	}
	body .v--default-css .c-toast {
		border-radius: 0.25em;
		padding: 0 1em;
		min-height: 3em;
		margin-top: 2em;
		box-shadow: 0 5px 10px 4px rgba(0, 0, 0, 0.4);
		/* border: 2px solid black; */
		/* font-weight: bold; */
		background-color: var(--neutral-color);
		color: white;
	}
	small {
		color: var(--neutral-color);
	}

	/* body .vs__dropdown-menu */

	@media only screen and (max-width: 360px) {
		body {
			font-size: 10pt;
		}
	}
</style>

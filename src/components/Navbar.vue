<template>
	<header>
		<div class="header-left">
			<button @click="$emit('clickHelp')" id="help-btn" class="header-icon" aria-label="Help">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path
						fill="#ffffff"
						d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
					></path>
				</svg>
			</button>

			<button
				@click="$emit('clickSupport')"
				id="support-btn"
				class="header-icon"
				aria-label="Support Us"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						id="heart-icon"
						stroke="#fff"
						d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
					></path>
				</svg>
			</button>
		</div>
		<h1>SCARED<span class="title">LE</span></h1>
		<div class="header-right">
			<button
				@click="$emit('clickStats')"
				id="statistics-btn"
				class="header-icon"
				aria-label="Statistics"
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path
						fill="#ffffff"
						d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
					></path>
				</svg>
			</button>
			<button
				@click="$emit('clickSettings')"
				id="settings-btn"
				class="header-icon"
				aria-label="Settings"
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path
						fill="#ffffff"
						d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
					></path>
				</svg>
			</button>
		</div>
	</header>
</template>

<script>
	export default {
		name: "Navbar",
	};
</script>

<style scoped>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--neutral-color-dark);
		padding: 0 1em;
		height: 50px;
		margin-bottom: 1em;
		border-bottom: 1px solid var(--neutral-color);
	}

	button {
		background: none;
		border: none;
		transition: background-color 0.2s ease-in;
	}

	button:hover svg #heart-icon {
		stroke: var(--primary-color);
		fill: none;
	}

	button:hover {
		cursor: pointer;
	}

	button svg path {
		transition: fill 0.2s ease, stroke 0.3s ease;
	}

	button:hover svg path {
		fill: var(--primary-color);
	}

	@keyframes fadeWhiteToRed {
		0% {
			color: white;
		}
		50% {
			color: white;
		}
		100% {
			color: var(--primary-color);
		}
	}

	.title {
		color: white;
	}
	h1 {
		color: var(--primary-color);
		animation: 1s ease-in 0s 1 fadeWhiteToRed;
		/* color: var(--primary-color); */
	}

	.header-left {
		display: flex;
		justify-content: left;
		width: 72px;
	}

	.header-right {
		display: flex;
		justify-content: right;
		width: 72px;
	}

	@media only screen and (max-width: 425px) {
		h1 {
			font-size: 1.25rem;
		}
	}
</style>

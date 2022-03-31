<template>
	<div class="btn-container">
		<a
			title="Support Scaredle on ko-fi.com"
			class="kofi-button"
			href="https://ko-fi.com/joetagliaferro"
			target="_blank"
		>
			<span class="kofitext"
				><img
					src="https://storage.ko-fi.com/cdn/cup-border.png"
					alt="Ko-fi donations"
					class="kofiimg"
				/>
				<span> Support Scaredle! </span>
			</span></a
		>
	</div>
</template>

<script>
	export default {};
</script>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");
	img .kofiimg {
		display: initial !important;
		vertical-align: middle;

		display: flex;
		justify-content: center;
		align-items: center;
		height: 13px !important;
		width: 20px !important;
		padding-top: 0;
		padding-bottom: 0;
		border: none;
		margin-top: 0;
		margin-right: 5px;
		margin-left: 0;
		/* margin-bottom: 3px !important; */
		content: url("https://storage.ko-fi.com/cdn/cup-border.png");
	}

	.kofiimg:after {
		vertical-align: middle;
		height: 25px;
		padding-top: 0;
		padding-bottom: 0;
		border: none;
		margin-top: 0;
		margin-right: 6px;
		margin-left: 0;
		margin-bottom: 4px !important;
		content: url("https://storage.ko-fi.com/cdn/whitelogo.svg");
	}

	.btn-container {
		display: inline-block !important;
		white-space: nowrap;
		min-width: 160px;
	}
	span .kofitext {
		color: #fff !important;
		letter-spacing: -0.15px !important;
		/* text-wrap: none; */
		vertical-align: middle;
		line-height: 33px !important;
		padding: 0;
		text-align: center;
		text-decoration: none !important;
	}

	.kofitext a {
		color: #fff !important;
		text-decoration: none !important;
	}

	.kofitext a:hover {
		color: #fff !important;
		text-decoration: none;
	}
	a.kofi-button {
		box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
		/* line-height: 36px !important; */
		height: 36px;
		min-width: 150px;
		/* display: inline-block !important; */
		display: flex !important;
		align-items: center;
		justify-content: center;
		background-color: #29abe0;
		padding: 2px 12px !important;
		text-align: center !important;
		border-radius: 7px;
		color: #fff;
		cursor: pointer;
		overflow-wrap: break-word;
		vertical-align: middle;
		border: 0 none #fff !important;
		font-family: "Quicksand", Helvetica, Century Gothic, sans-serif !important;
		text-decoration: none;
		text-shadow: none;
		font-weight: 700 !important;
		font-size: 14px !important;
		transition: opacity 0.2s ease;
	}

	a.kofi-button:visited {
		color: #fff !important;
		text-decoration: none !important;
	}

	a.kofi-button:hover {
		opacity: 0.9;
		color: #fff !important;
		text-decoration: none !important;
	}

	a.kofi-button:active {
		color: #fff !important;
		text-decoration: none !important;
	}
	.kofitext img.kofiimg {
		height: 15px !important;
		width: 22px !important;
		display: initial !important;

		animation: kofi-wiggle 2s infinite;
	}

	@keyframes kofi-wiggle {
		0% {
			transform: rotate(0) scale(1) translateY(2px);
		}
		60% {
			transform: rotate(0) scale(1) translateY(2px);
		}
		75% {
			transform: rotate(0) scale(1.12) translateY(2px);
		}
		80% {
			transform: rotate(0) scale(1.1) translateY(2px);
		}
		84% {
			transform: rotate(-10deg) scale(1.1) translateY(2px);
		}
		88% {
			transform: rotate(10deg) scale(1.1) translateY(2px);
		}
		92% {
			transform: rotate(-10deg) scale(1.1) translateY(2px);
		}
		96% {
			transform: rotate(10deg) scale(1.1) translateY(2px);
		}
		100% {
			transform: rotate(0) scale(1) translateY(2px);
		}
	}
</style>

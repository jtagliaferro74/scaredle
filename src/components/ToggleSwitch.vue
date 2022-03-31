<template>
	<div id="toggle-switch">
		<span
			class="toggle-wrapper"
			role="checkbox"
			:aria-checked="value.toString()"
			tabindex="0"
			@click="toggle"
		>
			<span class="toggle-background" :class="backgroundStyles" :style="onColorProp"> </span>
			<span class="toggle-indicator" :style="indicatorStyles"> </span>
		</span>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Boolean,
				required: true,
			},
			onColor: {
				type: String,
				default: "green",
			},
		},
		computed: {
			onColorProp() {
				return { "--on-color": this.onColor };
			},
			backgroundStyles() {
				return this.value ? "on" : "off";
			},
			indicatorStyles() {
				return { transform: this.value ? "translateX(14px)" : "translateX(0px)" };
			},
		},
		methods: {
			toggle() {
				this.$emit("input", !this.value);
			},
		},
	};
</script>

<style>
	.on {
		background-color: var(--on-color);
	}

	.off {
		background-color: #666666;
	}

	.toggle-wrapper {
		display: inline-block;
		position: relative;
		cursor: pointer;
		width: 32px;
		height: 18px;
		border-radius: 100px;
	}

	.toggle-wrapper:focus {
		outline: 0;
	}

	.toggle-background {
		display: inline-block;
		border-radius: 100px;
		height: 100%;
		width: 100%;
		transition: background-color 0.3s ease-out;
	}

	.toggle-indicator {
		position: absolute;
		height: 14px;
		width: 14px;
		left: 2px;
		bottom: 2px;
		background-color: #ffffff;
		border-radius: 100px;
		transition: transform 0.3s ease-out;
	}
</style>

<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div
				class="modal"
				role="dialog"
				aria-labelledby="modalTitle"
				aria-describedby="modalDescription"
			>
				<header class="modal-header" id="modalTitle">
					<slot name="header"> This is the default tile! </slot>
					<button type="button" class="btn-close" @click="close" aria-label="Close modal">
						&times;
					</button>
				</header>

				<section class="modal-body" id="modalDescription">
					<slot name="body"> This is the default body! </slot>
				</section>

				<footer class="modal-footer" id="modalFooter">
					<slot name="footer"></slot>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "Modal",
		methods: {
			close() {
				this.$emit("close");
			},
			fuck() {
				console.log("print");
			},
		},
	};
</script>

<style scoped>
	.modal-backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		/* align-items: center; */
		z-index: 100;
	}

	.modal {
		margin-left: auto;
		margin-right: auto;
		margin-top: 120px;
		/* margin-top: 100px; */
		width: 90%;
		max-height: 500px;
		min-width: 250px;
		max-width: 400px;
		background: var(--neutral-color-dark);
		box-shadow: 2px 2px 20px 1px black;
		border: 1px solid var(--neutral-color);
		overflow-x: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: white;
		border-radius: 8px;
		z-index: 101;
	}

	.modal-header,
	.modal-footer {
		padding: 15px;
		display: flex;
	}

	.modal-header {
		position: relative;
		color: white;
		justify-content: center;
	}

	.modal-footer {
		/* border-top: 1px solid var(--neutral-color); */
		flex-direction: column;
	}

	.modal-body {
		position: relative;
		padding: 0px 10px;
	}

	.btn-close {
		position: absolute;
		top: 0;
		right: 0;
		border: none;
		font-size: 20px;
		padding: 10px;
		cursor: pointer;
		font-weight: bold;
		color: white;
		background: transparent;
		font-size: 1.75em;
		transition: color 0.2s ease-out;
	}

	.btn-close:hover {
		color: var(--primary-color);
		/* font-weight: bolder; */
	}

	.btn-green {
		color: white;
		background: #4aae9b;
		border: 1px solid #4aae9b;
		border-radius: 2px;
	}

	.modal-fade-enter-from,
	.modal-fade-leave-to {
		transform: translateY(20px);
		opacity: 0;
	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: all 0.3s ease;
	}
</style>

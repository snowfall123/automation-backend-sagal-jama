<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class ItemCard extends Vue {
		public menu = false
		public toggleMenu() {
			this.menu = !this.menu
		}
		public closeMenu() {
			this.menu = false
		}
	}
</script>

<template>
	<div class="card">
		<slot />
		<div class="action" @click="toggleMenu"><img src="/ellipsis.svg" /></div>
		<div class="menu" v-if="menu" @click="closeMenu">
			<slot name="menu"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.card {
		text-align: left;
		margin-bottom: 1rem;
		position: relative;
		h3 {
			margin: 0;
		}
		.action {
			position: absolute;
			top: 1rem;
			right: 1rem;
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 1.25rem;
			text-align: center;
			cursor: pointer;
			img {
				width: 1.5rem;
				margin: 0.5rem
			}
			&:hover {
				background: rgba(0, 0, 0, 0.05);
			}
		}
		.menu {
			position: absolute;
			top: 4rem;
			right: 1rem;
			border-radius: 0.5rem;
			background: #FFFFFF;
			padding: 0.5rem 0;
			z-index: 1;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.125);
			cursor: pointer;
			a {
				display: block;
				padding: 0.75rem 2rem;
				width: 100px;
				&:hover {
					background: #F4F4F4;
				}
			}
		}
	}
</style>

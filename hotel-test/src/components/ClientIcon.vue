<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { Md5 } from 'ts-md5/dist/md5'

	@Component
	export default class ClientIcon extends Vue {
		@Prop() public client: any
		@Prop({ default: 'medium' }) public size: 'small' | 'medium' | 'large'

		public get initials() {
			return this.client && this.client.name
				? this.client.name.split(' ').map((n: string) => n.charAt(0)).splice(0, 2).join('').toUpperCase()
				: '•'
		}

		public get style() {
			const degrees = parseInt(Md5.hashStr(this.client.name + 'asd').toString(), 16)
			return {
				filter: `hue-rotate(${degrees}deg)`
			}
		}
	}
</script>

<template>
	<div class="icon" :class="size" :style="style">
		{{ initials }}
	</div>
</template>

<style scoped lang="scss">
	.icon {
		text-align: center;
		border-radius: 50%;
		color: #FFFFFF;
		background: hsl(0, 55, 60);
		margin-right: 1rem;
		user-select: none;
		flex-shrink: 0;

		&.large {
			$icon-size: 6rem;
			width: $icon-size;
			height: $icon-size;
			line-height: $icon-size;
			font-size: $icon-size / 2.5;
		}

		&.medium {
			$icon-size: 4rem;
			width: $icon-size;
			height: $icon-size;
			line-height: $icon-size;
			font-size: $icon-size / 2.5;
		}

		&.small {
			$icon-size: 3rem;
			width: $icon-size;
			height: $icon-size;
			line-height: $icon-size;
			font-size: $icon-size / 2.5;
		}
	}
</style>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { Md5 } from 'ts-md5/dist/md5'

	@Component
	export default class ClientIcon extends Vue {
		@Prop() public text: string
		@Prop({ default: '#AAAAAA' }) public color: string
		@Prop({ default: 'medium' }) public size: 'small' | 'medium' | 'large'

		public get style() {
			return { background: this.color }
		}
	}
</script>

<template>
	<div class="icon" :class="size" :style="style">
		{{ text }}
	</div>
</template>

<style scoped lang="scss">
	.icon {
		text-align: center;
		border-radius: 50%;
		color: #FFFFFF;
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

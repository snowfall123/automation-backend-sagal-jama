<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class CheckBox extends Vue {
		@Prop({ default: false }) public value: boolean
		public toggle() {
			this.$emit('input', !this.value)
		}
	}
</script>

<template>
	<div class="checkbox" @click="toggle">
		{{ value ? '✓' : '&nbsp;'}}
	</div>
</template>

<style lang="scss" scoped>
	.checkbox {
		display: inline-block;
		border: 1px solid #CCCCCC;
		width: 2rem;
		height: 2rem;
		vertical-align: middle;
		font-size: 1.5rem;
		text-align: center;
		cursor: pointer;
		overflow: hidden;
	}
</style>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Error404 extends Vue {}
</script>

<template>
	<div class="container small">
		<h2>404 - Oh no!</h2>
		<p>The page could not be found</p>
		<div>
			<router-link to="/" class="btn">Go To Homepage</router-link>
		</div>
	</div>
</template>

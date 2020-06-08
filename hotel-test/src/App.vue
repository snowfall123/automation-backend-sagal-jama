<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { logout } from '@/services/api'
	import { AppState } from '@/types'

	@Component
	export default class App extends Vue {

		public get user() {
			return (this.$store.state as AppState).user
		}

		public logout() {
			logout()
		}

	}
</script>

<template>
	<div id="app">
		<header>
			<div class="container">
				<h1><router-link to="/">Tester Hotel</router-link></h1>
				<div v-if="user" class="user">
					<span class="username">Welcome {{ user.username }}!</span>
					<button class="btn" @click="logout">Logout</button>
				</div>
			</div>
		</header>
		<router-view />
	</div>
</template>

<style lang="scss">
	@import '@/style/app.scss';
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>

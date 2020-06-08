<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { login, checkLoggedOut } from '@/services/api'
	import { push } from '@/router'

	@Component
	export default class Login extends Vue {

		public username: string = ''
		public password: string = ''
		public error: string = null

		public created() {
			checkLoggedOut()
		}

		public async login() {
			try {
				this.error = null
				await login(this.username, this.password, this.redirect)
			} catch (err) {
				this.error = err.error
			}
		}

		private get redirect() {
			return typeof this.$route.query.redirect === 'string' ? this.$route.query.redirect : null
		}

	}
</script>

<template>
	<div class="container small">
		<h2>Login</h2>
		<form @submit.prevent="login">
			<div class="field">
				<label>Username:</label>
				<input type="text" autocomplete="username" v-model="username" />
			</div>
			<div class="field">
				<label>Password:</label>
				<input type="password" autocomplete="current-password" v-model="password" />
			</div>
			<div class="field action">
				<button class="btn blue">Login</button>
			</div>
		</form>
		<div class="error" v-if="error">{{ error }}</div>
	</div>
</template>

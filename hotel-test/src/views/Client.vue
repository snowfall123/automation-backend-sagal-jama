<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { checkLoggedIn, getClient, createClient, editClient, deleteClient } from '@/services/api'
	import { validateEmail } from '@/services/validate'
	import Loading from '@/components/Loading.vue'
	import CheckBox from '@/components/CheckBox.vue'

	

	@Component({
		components: { Loading, CheckBox }
	})
	export default class Client extends Vue {
		public loading: boolean = false
		public saving: boolean = false
		public deleting: boolean = false
		public client = null
		public errors: string[] = []
		public dirty: boolean = false

		private async created() {
			if (checkLoggedIn()) {
				if (this.mode === 'create') {
					this.client = {}
				} else {
					this.loading = true
					this.client = await getClient(this.$route.params.id)
					this.loading = false
				}
			}
		}

		public get mode() {
			return this.$route.params.id === 'new' ? 'create' : 'edit'
		}

		private valiate() {
			this.errors = []

			if (!this.client.name || this.client.name.length === 0) {
				this.errors.push('Name must be set')
			} else if (this.client.name.length > 50) {
				this.errors.push('Name can not be longer than 50 characters')
			}

			if (!this.client.email || this.client.email.length === 0) {
				this.errors.push('Email must be set')
			} else if (this.client.name.length > 200) {
				this.errors.push('Email can not be longer than 200 characters')
			} else if (!validateEmail(this.client.email)) {
				this.errors.push('Email address is not valid')
			}

			if (!this.client.telephone || this.client.telephone.length === 0) {
				this.errors.push('Telephone must be set')
			} else if (this.client.name.length > 50) {
				this.errors.push('Telephone can not be longer than 50 characters')
			}

			return this.errors.length === 0
		}

		@Watch('client', { deep: true })
		private clearErrors() {
			if (this.dirty) {
				this.valiate()
			}
		}

		public async save() {
			this.dirty = true
			if (!this.valiate()) {
				return false
			}
			this.saving = true
			if (this.mode === 'create') {
				this.client = await createClient(this.client)
			} else {
				this.client = await editClient(this.client.id, this.client)
			}
			this.$router.push('/clients')
		}

		public async remove() {
			this.deleting = true
			await deleteClient(this.client.id)
			this.$router.push('/clients')
		}

	}
</script>

<template>
	<div class="container">
		<h2>
			<div v-if="mode === 'create'">New Client</div>
			<div v-if="mode === 'edit'">Client: {{ $route.params.id }}</div>
			<a v-if="mode === 'edit'" class="btn red" @click="remove">{{ deleting ? '...' : 'Delete' }}</a>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading">
			<div class="field" v-if="mode === 'edit'">
				<label>ID</label>
				<input type="text" disabled :value="client.id" />
			</div>
			<div class="field" v-if="mode === 'edit'">
				<label>Created</label>
				<input type="text" disabled :value="client.created" />
			</div>
			<div class="field">
				<label>Name</label>
				<input type="text" v-model="client.name" />
			</div>
			<div class="field">
				<label>Email</label>
				<input type="email" v-model="client.email" />
			</div>
			<div class="field">
				<label>Telephone</label>
				<input type="text" v-model="client.telephone" />
			</div>
		</div>
		<div class="error" v-for="(error, i) in errors" :key="i">{{ error }}</div>
		<div class="actions">
			<router-link class="btn" to="/clients">Back</router-link>
			<a class="btn blue" @click="save">{{ saving ? '...' : 'Save' }}</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	h2 {
		position: relative;
		a {
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.actions {
		display: flex;
		justify-content: space-between;
	}
</style>

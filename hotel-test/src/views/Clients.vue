<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { checkLoggedIn, getClients, deleteClient } from '@/services/api'
	import Loading from '@/components/Loading.vue'
	import ClientIcon from '@/components/ClientIcon.vue'
	import ItemCard from '@/components/ItemCard.vue'

	@Component({
		components: { Loading, ClientIcon, ItemCard }
	})
	export default class Clients extends Vue {
		public loading: boolean = false
		public get clients() {
			return this.$store.state.clients || []
		}

		private async created() {
			if (checkLoggedIn()) {
				this.loading = true
				await getClients()
				this.loading = false
			}
		}

		public editClient(client) {
			this.$router.push(`/client/${client.id}`)
		}

		public async deleteClient(client) {
			await deleteClient(client.id)
			await getClients()
		}
	}
</script>

<template>
	<div class="container">
		<h2>
			<div>Clients</div>
			<router-link class="btn blue" to="/client/new">Create Client</router-link>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading" class="clients">
			<ItemCard class="client" v-for="client in clients" :key="client.id">
				<ClientIcon :client="client" />
				<div>
					<h3>{{ client.name }} (#{{ client.id }})</h3>
					<div class="email">Email: {{ client.email }}</div>
					<div class="telephone">Telephone: {{ client.telephone }}</div>
				</div>
				<template v-slot:menu>
					<a @click="editClient(client)">Edit</a>
					<a @click="deleteClient(client)">Delete</a>
				</template>
			</ItemCard>
		</div>
		<div v-if="!clients.length">
			<p>There are no clients</p>
		</div>
		<div>
			<router-link class="btn" to="/">Back</router-link> 
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
	.client {
		display: flex;
	}
</style>

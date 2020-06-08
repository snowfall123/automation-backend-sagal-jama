<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { checkLoggedIn, getAll, getReservations, deleteReservation } from '@/services/api'
	import Loading from '@/components/Loading.vue'
	import ItemCard from '@/components/ItemCard.vue'

	@Component({
		components: { Loading, ItemCard }
	})
	export default class Reservations extends Vue {
		public loading: boolean = false

		public get rooms() {
			return this.$store.state.rooms || []
		}

		public get clients() {
			return this.$store.state.clients || []
		}

		public get bills() {
			return this.$store.state.bills || []
		}

		public get reservations() {
			return this.$store.state.reservations || []
		}

		private async created() {
			if (checkLoggedIn()) {
				this.loading = true
				await getAll()
				this.loading = false
			}
		}

		public client(reservation) {
			return this.clients.find((client) => client.id === reservation.client) || { name: 'No client' }
		}

		public bill(reservation) {
			return this.rooms.find((room) => room.id === reservation.room)
		}

		public room(reservation) {
			return this.bills.find((bill) => bill.id === reservation.bill)
		}

		public editReservation(reservation) {
			this.$router.push(`/reservation/${reservation.id}`)
		}

		public async deleteReservation(reservation) {
			await deleteReservation(reservation.id)
			await getReservations()
		}
	}
</script>

<template>
	<div class="container">
		<h2>
			<div>Reservations</div>
			<router-link class="btn blue" to="/reservation/new">Create Reservation</router-link>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading" class="reservations">
			<ItemCard class="reservation card" v-for="reservation in reservations" :key="reservation.id">
				<h3>{{ client(reservation).name }}: {{ reservation.start || 'No start' }} - {{ reservation.end || 'No end' }}</h3>
				<div class="id">Booking ID: {{ reservation.id }}</div>
				<div class="start">Start: {{ reservation.start || 'No start' }}</div>
				<div class="end">End: {{ reservation.end || 'No end' }}</div>
				<div class="client">Client: {{ reservation.client || 'No client' }}</div>
				<div class="room">Room: {{ reservation.room || 'No room' }}</div>
				<div class="bill">Bill: {{ reservation.bill || 'No bill' }}</div>
				<template v-slot:menu>
					<a @click="editReservation(reservation)">Edit</a>
					<a @click="deleteReservation(reservation)">Delete</a>
				</template>
			</ItemCard>
		</div>
		<div v-if="!reservations.length">
			<p>There are no reservations</p>
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
</style>

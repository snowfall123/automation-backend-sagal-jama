<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { checkLoggedIn, getAll, getReservation, createReservation, editReservation, deleteReservation } from '@/services/api'
	import { validateDate } from '@/services/validate'
	import Loading from '@/components/Loading.vue'
	import CheckBox from '@/components/CheckBox.vue'
	import { Reservation } from '@/types'

	@Component({
		components: { Loading, CheckBox }
	})
	export default class ReservationComponent extends Vue {
		public loading: boolean = false
		public saving: boolean = false
		public deleting: boolean = false
		public reservation: Reservation = {}
		public errors: string[] = []
		public dirty: boolean = false

		public get clients() {
			return this.$store.state.clients
		}

		public get rooms() {
			return this.$store.state.rooms
		}

		public get bills() {
			return this.$store.state.bills
		}


		private async created() {
			if (checkLoggedIn()) {

				await getAll()

				if (this.mode === 'create') {
					this.reservation = {
						client: '',
						room: '',
						bill: ''
					}
				} else {
					this.loading = true
					this.reservation = await getReservation(this.$route.params.id)
					this.loading = false
				}
			}
		}

		public get mode() {
			return this.$route.params.id === 'new' ? 'create' : 'edit'
		}

		private valiate() {
			this.errors = []

			if (!this.reservation.start || this.reservation.start.length === 0) {
				this.errors.push('Start date must be set')
			} else if (!validateDate(this.reservation.start)) {
				this.errors.push('Start date is not valid')
			}

			if (!this.reservation.end || this.reservation.end.length === 0) {
				this.errors.push('End date must be set')
			} else if (!validateDate(this.reservation.end)) {
				this.errors.push('End date is not valid')
			}

			if (this.reservation.client !== '' && !this.clients.find((c) => c.id === this.reservation.client)) {
				this.errors.push('Please select a valid client')
			}

			if (this.reservation.room !== '' && !this.rooms.find((c) => c.id === this.reservation.room)) {
				this.errors.push('Please select a valid room')
			}

			if (this.reservation.bill !== '' && !this.bills.find((c) => c.id === this.reservation.bill)) {
				this.errors.push('Please select a valid bill')
			}

			return this.errors.length === 0
		}

		@Watch('reservation', { deep: true })
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
				this.reservation = await createReservation(this.reservation)
			} else {
				this.reservation = await editReservation(this.reservation.id, this.reservation)
			}
			this.$router.push('/reservations')
		}

		public async remove() {
			this.deleting = true
			await deleteReservation(this.reservation.id)
			this.$router.push('/reservations')
		}

	}
</script>

<template>
	<div class="container">
		<h2>
			<div v-if="mode === 'create'">New Reservation</div>
			<div v-if="mode === 'edit'">Reservation: {{ $route.params.id }}</div>
			<a v-if="mode === 'edit'" class="btn red" @click="remove">{{ deleting ? '...' : 'Delete' }}</a>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading">
			<div class="field" v-if="mode === 'edit'">
				<label>ID</label>
				<input type="text" disabled :value="reservation.id" />
			</div>
			<div class="field" v-if="mode === 'edit'">
				<label>Created</label>
				<input type="text" disabled :value="reservation.created" />
			</div>
			<div class="field">
				<label>Start <small>(Format YYYY-MM-DD)</small></label>
				<input type="text" v-model="reservation.start" placeholder="YYYY-MM-DD" />
			</div>
			<div class="field">
				<label>End <small>(Format YYYY-MM-DD)</small></label>
				<input type="text" v-model="reservation.end" placeholder="YYYY-MM-DD" />
			</div>
			<div class="field">
				<label>Client</label>
				<select v-model="reservation.client">
					<option value="">- Not selected -</option>
					<option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }} (#{{ client.id }})</option>
				</select>
			</div>
			<div class="field">
				<label>Room</label>
				<select v-model="reservation.room">
					<option value="">- Not selected -</option>
					<option v-for="room in rooms" :key="room.id" :value="room.id">Floor {{ room.floor }}, Room {{ room.number }}</option>
				</select>
			</div>
			<div class="field">
				<label>Bill</label>
				<select v-model="reservation.bill">
					<option value="">- Not selected -</option>
					<option v-for="bill in bills" :key="bill.id" :value="bill.id">ID: {{ bill.id }}</option>
				</select>
			</div>
		</div>
		<div class="error" v-for="(error, i) in errors" :key="i">{{ error }}</div>
		<div class="actions">
			<router-link class="btn" to="/reservations">Back</router-link>
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

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { checkLoggedIn, getAll } from '@/services/api'
	import Loading from '@/components/Loading.vue'

	@Component({
		components: { Loading }
	})
	export default class Home extends Vue {

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

		public get currentReservations() {
			const reservations = this.reservations.filter((r) => {
				const start = new Date(`${r.start}T12:00:00`)
				const end = new Date(`${r.end}T12:00:00`)
				const now = new Date()
				return start <= now && end >= now
			})
			return reservations?.length || 0
		}

		public get paidBills() {
			return this.bills.filter((b) => b.paid)
		}

		public get billsValue() {
			return this.bills.map((b) => b.value).reduce((a, b) => a + b, 0)
		}

		public get paidBillsValue() {
			return this.paidBills.map((b) => b.value).reduce((a, b) => a + b, 0)
		}

	}
</script>

<template>
	<div class="container">
		<h2>Tester Hotel Overview</h2>
		<Loading v-if="loading" />
		<div v-if="!loading" class="blocks">
			<div class="block">
				<h4>Rooms</h4>
				<div>Number: {{ rooms.length }}</div>
				<router-link to="/rooms" class="btn">View</router-link>
			</div>
			<div class="block">
				<h4>Clients</h4>
				<div>Number: {{ clients.length }}</div>
				<router-link to="/clients" class="btn">View</router-link>
			</div>
			<div class="block">
				<h4>Bills</h4>
				<div>Total: {{ bills.length }} ({{ billsValue }}kr)</div>
				<div>Paid: {{ paidBills.length }} ({{ paidBillsValue }}kr)</div>
				<router-link to="/bills" class="btn">View</router-link>
			</div>
			<div class="block">
				<h4>Reservations</h4>
				<div>Total: {{ reservations.length }}</div>
				<div>Current: {{ currentReservations }}</div>
				<router-link to="/reservations" class="btn">View</router-link>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.blocks {
		
		.block {
			display: inline-block;
			padding: 2rem 0.5rem;
			background: #777777;
			color: #FFFFFF;
			width: 340px;
			max-width: calc(100% - 6rem);
			vertical-align: top;
			margin: 0 1rem 2rem;

			h4 {
				margin-top: 0;
			}

			.btn {
				background: #FFFFFF;
				margin-top: 2rem;
				transition: box-shadow 0.2s ease-in-out;
				&:hover,
				&:focus {
					box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.35);
				}
			}

			&:nth-child(1) { background: #AA3939; .btn { color: #AA3939 } }
			&:nth-child(2) { background: #AA6C39; .btn { color: #AA6C39 } }
			&:nth-child(3) { background: #226666; .btn { color: #226666 } }
			&:nth-child(4) { background: #2D882D; .btn { color: #2D882D } }
		}
	}
</style>

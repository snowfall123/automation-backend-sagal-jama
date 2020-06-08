<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { checkLoggedIn, getBills, deleteBill } from '@/services/api'
	import Loading from '@/components/Loading.vue'
	import ItemCard from '@/components/ItemCard.vue'

	@Component({
		components: { Loading, ItemCard }
	})
	export default class Bills extends Vue {
		public loading: boolean = false

		public get bills() {
			return this.$store.state.bills || []
		}

		private async created() {
			if (checkLoggedIn()) {
				this.loading = true
				await getBills()
				this.loading = false
			}
		}

		public editBill(bill) {
			this.$router.push(`/bill/${bill.id}`)
		}

		public async deleteBill(bill) {
			await deleteBill(bill.id)
			await getBills()
		}
	}
</script>

<template>
	<div class="container">
		<h2>
			<div>Bills</div>
			<router-link class="btn blue" to="/bill/new">Create Bill</router-link>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading" class="bills">
			<ItemCard class="bill" v-for="bill in bills" :key="bill.id">
				<h3 class="id">ID: {{ bill.id }}</h3>
				<div class="value">Value: {{ bill.value }}kr</div>
				<div class="paid">Paid: {{ bill.paid ? 'Yes' : 'No' }}</div>
				<template v-slot:menu>
					<a @click="editBill(bill)">Edit</a>
					<a @click="deleteBill(bill)">Delete</a>
				</template>
			</ItemCard>
		</div>
		<div v-if="!bills.length">
			<p>There are no bills</p>
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

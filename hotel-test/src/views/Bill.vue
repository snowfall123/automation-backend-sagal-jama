<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { checkLoggedIn, getBill, createBill, editBill, deleteBill } from '@/services/api'
	import Loading from '@/components/Loading.vue'
	import CheckBox from '@/components/CheckBox.vue'

	@Component({
		components: { Loading, CheckBox }
	})
	export default class Bill extends Vue {
		public loading: boolean = false
		public saving: boolean = false
		public deleting: boolean = false
		public bill = null
		public errors: string[] = []
		public dirty: boolean = false

		private async created() {
			if (checkLoggedIn()) {
				if (this.mode === 'create') {
					this.bill = {}
				} else {
					this.loading = true
					this.bill = await getBill(this.$route.params.id)
					this.loading = false
				}
			}
		}

		public get mode() {
			return this.$route.params.id === 'new' ? 'create' : 'edit'
		}

		private valiate() {
			this.errors = []
			if (this.bill.value >= 1000000000) {
				this.errors.push('Value must be less than 1000000000')
			} else if (this.bill.value <= 0) {
				this.errors.push('Value must be greater than 0')
			} else if (parseFloat(this.bill.value) % 1 !== 0) {
				this.errors.push('Value must be a whole number')
			}
			return this.errors.length === 0
		}

		@Watch('bill', { deep: true })
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
				this.bill = await createBill(this.bill)
			} else {
				this.bill = await editBill(this.bill.id, this.bill)
			}
			this.$router.push('/bills')
		}

		public async remove() {
			this.deleting = true
			await deleteBill(this.bill.id)
			this.$router.push('/bills')
		}

	}
</script>

<template>
	<div class="container">
		<h2>
			<div v-if="mode === 'create'">New Bill</div>
			<div v-if="mode === 'edit'">Bill: {{ $route.params.id }}</div>
			<a v-if="mode === 'edit'" class="btn red" @click="remove">{{ deleting ? '...' : 'Delete' }}</a>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading">
			<div class="field" v-if="mode === 'edit'">
				<label>ID</label>
				<input type="text" disabled :value="bill.id" />
			</div>
			<div class="field" v-if="mode === 'edit'">
				<label>Created</label>
				<input type="text" disabled :value="bill.created" />
			</div>
			<div class="field">
				<label>Value (SEK)</label>
				<input type="number" v-model="bill.value" />
			</div>
			<div class="field">
				<label>Paid</label>
				<CheckBox v-model="bill.paid" />
			</div>
		</div>
		<div class="error" v-for="(error, i) in errors" :key="i">{{ error }}</div>
		<div class="actions">
			<router-link class="btn" to="/bills">Back</router-link>
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

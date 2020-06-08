<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator'
	import { checkLoggedIn, getRoom, createRoom, editRoom, deleteRoom } from '@/services/api'
	import Loading from '@/components/Loading.vue'
	import CheckBox from '@/components/CheckBox.vue'
	import { RoomCategory, RoomFeature } from '@/types'

	@Component({
		components: { Loading, CheckBox }
	})
	export default class RoomComponent extends Vue {
		public loading: boolean = false
		public saving: boolean = false
		public deleting: boolean = false
		public room: any = null
		public errors: string[] = []
		public dirty: boolean = false

		public categories = RoomCategory
		public features = RoomFeature

		private async created() {
			if (checkLoggedIn()) {
				if (this.mode === 'create') {
					this.room = {
						features: []
					}
				} else {
					this.loading = true
					this.room = await getRoom(this.$route.params.id)
					this.loading = false
				}
			}
		}

		public get mode() {
			return this.$route.params.id === 'new' ? 'create' : 'edit'
		}

		private valiate() {
			this.errors = []

			if (typeof this.room.number === 'undefined') {
				this.errors.push('Room number must be set')
			}

			if (typeof this.room.floor === 'undefined') {
				this.errors.push('Floor must be set')
			}

			if (this.room.price >= 1000000000) {
				this.errors.push('Price must be less than 1000000000')
			} else if (this.room.price <= 0) {
				this.errors.push('Price must be greater than 0')
			} else if (parseFloat(this.room.price) % 1 !== 0) {
				this.errors.push('Price must be a whole number')
			}

			return this.errors.length === 0
		}

		@Watch('room', { deep: true })
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
				this.room = await createRoom(this.room)
			} else {
				this.room = await editRoom(this.room.id, this.room)
			}
			this.$router.push('/rooms')
		}

		public async remove() {
			this.deleting = true
			await deleteRoom(this.room.id)
			this.$router.push('/rooms')
		}

	}
</script>

<template>
	<div class="container">
		<h2>
			<div v-if="mode === 'create'">New Room</div>
			<div v-if="mode === 'edit'">Room: {{ $route.params.id }}</div>
			<a v-if="mode === 'edit'" class="btn red" @click="remove">{{ deleting ? '...' : 'Delete' }}</a>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading">
			<div class="field" v-if="mode === 'edit'">
				<label>ID</label>
				<input type="text" disabled :value="room.id" />
			</div>
			<div class="field" v-if="mode === 'edit'">
				<label>Created</label>
				<input type="text" disabled :value="room.created" />
			</div>
			<div class="field">
				<label>Category</label>
				<select v-model="room.category">
					<option v-for="(category, value) in categories" :value="value" :key="value">
						{{ category }}
					</option>
				</select>
			</div>
			<div class="field">
				<label>Number</label>
				<input type="number" v-model="room.number" />
			</div>
			<div class="field">
				<label>Floor</label>
				<input type="number" v-model="room.floor" />
			</div>
			<div class="field">
				<label>Available</label>
				<CheckBox v-model="room.available" />
			</div>
			<div class="field">
				<label>Price</label>
				<input type="number" v-model="room.price" />
			</div>
			<div class="field">
				<label>Features <small>(Hold Ctrl / ⌘ to select multiple)</small></label>
				<select v-model="room.features" multiple>
					<option v-for="(feature, value) in features" :value="value" :key="value">
						{{ feature }}
					</option>
				</select>
			</div>
		</div>
		<div class="error" v-for="(error, i) in errors" :key="i">{{ error }}</div>
		<div class="actions">
			<router-link class="btn" to="/rooms">Back</router-link>
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

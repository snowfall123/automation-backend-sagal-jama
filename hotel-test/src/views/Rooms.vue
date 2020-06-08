<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { checkLoggedIn, getRooms, deleteRoom } from '@/services/api'
	import Loading from '@/components/Loading.vue'
	import Icon from '@/components/Icon.vue'
	import ItemCard from '@/components/ItemCard.vue'

	@Component({
		components: { Loading, Icon, ItemCard }
	})
	export default class Rooms extends Vue {
		public loading: boolean = false

		public get rooms() {
			return this.$store.state.rooms || []
		}

		private async created() {
			if (checkLoggedIn()) {
				this.loading = true
				await getRooms()
				this.loading = false
			}
		}

		public featureStr(feature: string) {
			return feature.split('_').join(' ')
		}

		public editRoom(room) {
			this.$router.push(`/room/${room.id}`)
		}

		public async deleteRoom(room) {
			await deleteRoom(room.id)
			await getRooms()
		}

	}
</script>

<template>
	<div class="container">
		<h2>
			<div>Rooms</div>
			<router-link class="btn blue" to="/room/new">Create Room</router-link>
		</h2>
		<Loading v-if="loading" />
		<div v-if="!loading" class="rooms">
			<ItemCard class="room" v-for="room in rooms" :key="room.id">
				<Icon :text="room.number" />
				<div>
					<h3>Floor {{ room.floor }}, Room {{ room.number }}</h3>
					<div class="category">Category: {{ room.category }}</div>
					<div class="available">Available: {{ room.available }}</div>
					<div class="price">Price: {{ room.price }}kr</div>
					<div class="features">
						Features: 
						<div class="feature" v-for="(feature, i) in room.features" :key="i">
							{{ featureStr(feature) }}
						</div>
					</div>
				</div>
				<template v-slot:menu>
					<a @click="editRoom(room)">Edit</a>
					<a @click="deleteRoom(room)">Delete</a>
				</template>
			</ItemCard>
		</div>
		<div v-if="!rooms.length">
			<p>There are no rooms</p>
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
	.room {
		display: flex;
		.category {
			text-transform: capitalize;
		}
		.features {
			margin-bottom: -0.5rem;
			.feature {
				text-transform: capitalize;
				display: inline-block;
				padding: 0.25rem 1rem;
				border-radius: 1rem;
				background: #DDDDDD;
				margin: 0 0.5rem 0.5rem 0;
			}
		}
	}
</style>

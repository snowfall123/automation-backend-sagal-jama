import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Rooms from '@/views/Rooms.vue'
import Room from '@/views/Room.vue'
import Clients from '@/views/Clients.vue'
import Client from '@/views/Client.vue'
import Bills from '@/views/Bills.vue'
import Bill from '@/views/Bill.vue'
import Reservations from '@/views/Reservations.vue'
import Reservation from '@/views/Reservation.vue'
import Error404 from '@/views/Error404.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/rooms',
		name: 'Rooms',
		component: Rooms
	},
	{
		path: '/room/:id',
		name: 'Room',
		component: Room
	},
	{
		path: '/clients',
		name: 'Clients',
		component: Clients
	},
	{
		path: '/client/:id',
		name: 'Client',
		component: Client
	},
	{
		path: '/bills',
		name: 'Bills',
		component: Bills
	},
	{
		path: '/bill/:id',
		name: 'Bill',
		component: Bill
	},
	{
		path: '/reservations',
		name: 'Reservations',
		component: Reservations
	},
	{
		path: '/reservation/:id',
		name: 'Reservation',
		component: Reservation
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/*',
		name: '404',
		component: Error404
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export function push(path: string) {
	router.push(path)
}

export default router

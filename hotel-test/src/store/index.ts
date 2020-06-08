import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { AppState } from '@/types'

Vue.use(Vuex)

function initialState(): AppState {
	return {
		user: null,
		rooms: null,
		clients: null,
		bills: null,
		reservations: null
	}
}

export const ACTIONS = {
	RESET_STATE: 'RESET_STATE',
	SET_USER: 'SET_USER',
	SET_ROOMS: 'SET_ROOMS',
	SET_CLIENTS: 'SET_CLIENTS',
	SET_BILLS: 'SET_BILLS',
	SET_RESERVATIONS: 'SET_RESERVATIONS'
}

const mutations: MutationTree<AppState> = {
	[ACTIONS.RESET_STATE]: (state) => {
		Object.assign(state, initialState())
	},
	[ACTIONS.SET_USER]: (state, user) => {
		state.user = user
	},
	[ACTIONS.SET_ROOMS]: (state, rooms) => {
		state.rooms = rooms
	},
	[ACTIONS.SET_CLIENTS]: (state, clients) => {
		state.clients = clients
	},
	[ACTIONS.SET_BILLS]: (state, bills) => {
		state.bills = bills
	},
	[ACTIONS.SET_RESERVATIONS]: (state, reservations) => {
		state.reservations = reservations
	}
}

const vuexLocal = new VuexPersistence({
	key: 'tester-hotel',
	storage: window.localStorage
})

export default new Vuex.Store<AppState>({
	strict: true,
	state: initialState(),
	mutations,
	plugins: [ vuexLocal.plugin ]
})

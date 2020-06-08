import router, { push } from '@/router'
import xhr, { baseUrl } from './xhr'
import Store, { ACTIONS } from '@/store'

export function checkLoggedIn(redirect = true) {
	const loggedIn = Store.state.user
	if (redirect && !loggedIn) {
		push('/login')
		return false
	}
	return loggedIn
}

export function checkLoggedOut() {
	if (Store.state.user) {
		push('/')
	}
}

export async function logout() {
	try {
		await xhr.post(`${baseUrl}/api/logout`, null, authHeaders())
	} catch (err) {
		// Just logout anyway
	} finally {
		forceLogout(false)
	}
}

export async function login(username: string, password: string, redirect: string = '/') {
	try {
		const user = await xhr.post(`${baseUrl}/api/login`, {
			username,
			password
		})
		Store.commit(ACTIONS.SET_USER, user)
		redirect = redirect && redirect.startsWith('/login') ? '/' : redirect
		push(redirect || '/')
	} catch (err) {
		throw err
	}
}

function authHeaders() {
	return {
		'X-User-Auth': JSON.stringify(Store.state.user)
	}
}

function forceLogout(doRedirect = true) {
	Store.commit(ACTIONS.RESET_STATE)
	const redirect = doRedirect ? `?redirect=${router.currentRoute.path}` : ''
	push(`/login${redirect}`)
}

function force404() {
	push(`/404`)
}

export async function getAll() {
	try {
		await Promise.all([ getRooms(), getClients(), getBills(), getReservations() ])
		return true
	} catch (err) {
		forceLogout()
		return false
	}
}

export async function getRooms() {
	try {
		const rooms = await xhr.get(`${baseUrl}/api/rooms`, authHeaders())
		Store.commit(ACTIONS.SET_ROOMS, rooms)
		return rooms
	} catch (err) {
		return forceLogout()
	}
}

export async function createRoom(room) {
	try {
		return await xhr.post(`${baseUrl}/api/room/new`, room, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getRoom(id) {
	try {
		return await xhr.get(`${baseUrl}/api/room/${id}`, authHeaders())
	} catch (err) {
		return force404()
	}
}

export async function editRoom(id, room) {
	try {
		return await xhr.put(`${baseUrl}/api/room/${id}`, room, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function deleteRoom(id) {
	try {
		return await xhr.delete(`${baseUrl}/api/room/${id}`, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getClients() {
	try {
		const clients = await xhr.get(`${baseUrl}/api/clients`, authHeaders())
		Store.commit(ACTIONS.SET_CLIENTS, clients)
		return clients
	} catch (err) {
		return forceLogout()
	}
}

export async function createClient(client) {
	try {
		return await xhr.post(`${baseUrl}/api/client/new`, client, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getClient(id) {
	try {
		return await xhr.get(`${baseUrl}/api/client/${id}`, authHeaders())
	} catch (err) {
		return force404()
	}
}

export async function editClient(id, client) {
	try {
		return await xhr.put(`${baseUrl}/api/client/${id}`, client, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function deleteClient(id) {
	try {
		return await xhr.delete(`${baseUrl}/api/client/${id}`, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getBills() {
	try {
		const bills = await xhr.get(`${baseUrl}/api/bills`, authHeaders())
		Store.commit(ACTIONS.SET_BILLS, bills)
		return bills
	} catch (err) {
		return forceLogout()
	}
}

export async function createBill(bill) {
	try {
		return await xhr.post(`${baseUrl}/api/bill/new`, bill, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getBill(id) {
	try {
		return await xhr.get(`${baseUrl}/api/bill/${id}`, authHeaders())
	} catch (err) {
		return force404()
	}
}

export async function editBill(id, bill) {
	try {
		return await xhr.put(`${baseUrl}/api/bill/${id}`, bill, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function deleteBill(id) {
	try {
		return await xhr.delete(`${baseUrl}/api/bill/${id}`, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getReservations() {
	try {
		const reservations = await xhr.get(`${baseUrl}/api/reservations`, authHeaders())
		Store.commit(ACTIONS.SET_RESERVATIONS, reservations)
		return reservations
	} catch (err) {
		return forceLogout()
	}
}

export async function createReservation(reservation) {
	try {
		return await xhr.post(`${baseUrl}/api/reservation/new`, reservation, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function getReservation(id) {
	try {
		return await xhr.get(`${baseUrl}/api/reservation/${id}`, authHeaders())
	} catch (err) {
		return force404()
	}
}

export async function editReservation(id, reservation) {
	try {
		return await xhr.put(`${baseUrl}/api/reservation/${id}`, reservation, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

export async function deleteReservation(id) {
	try {
		return await xhr.delete(`${baseUrl}/api/reservation/${id}`, authHeaders())
	} catch (err) {
		return forceLogout()
	}
}

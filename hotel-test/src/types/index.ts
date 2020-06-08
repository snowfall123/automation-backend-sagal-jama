export interface User {
	username: string,
	token?: string
	password?: string
}

export enum RoomCategory {
	double = 'Double',
	single = 'Single',
	twin = 'Twin'
}

export enum RoomFeature {
	balcony = 'Balcony',
	ensuite = 'Ensuite',
	sea_view = 'Sea View',
	penthouse = 'Penthouse'
}

export interface Room {
	id?: number | string
	created?: string | Date
	category?: RoomCategory
	number?: number
	floor?: number
	available?: boolean
	price?: number
	features: RoomFeature[]
}

export interface Client {
	id?: number | string
	created?: string | Date
	name?: string
	email?: string
	telephone?: string
}

export interface Bill {
	id?: number | string
	created?: string | Date
	value?: number
	paid?: boolean
}

export interface Reservation {
	id?: number | string
	created?: string | Date
	start?: string
	end?: string
	client?: Client['id']
	room?: Room['id']
	bill?: Bill['id']
}

export interface AppState {
	user: User
	rooms: Room[]
	clients: Client[]
	bills: Bill[]
	reservations: Reservation[]
}

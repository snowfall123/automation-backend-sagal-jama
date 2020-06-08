const users = [
	{
		id: 1,
		created: new Date('2020-01-01T12:00:00Z'),
		username: 'tester01',
		password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c',
		token: null
	},
	{
		id: 2,
		created: new Date('2020-01-02T12:00:00Z'),
		username: 'tester02',
		password: 'sppm7qncqmVft5uECkwjLcLdEJGzM3Cw',
		token: null
	}
]

const rooms = [
	{
		id: 1,
		created: new Date('2020-01-03T12:00:00Z'),
		category: 'double',
		floor: 1,
		number: 101,
		available: true,
		price: 1500,
		features: [
			'balcony', 'ensuite'
		]
	},
	{
		id: 2,
		created: new Date('2020-01-04T12:00:00Z'),
		category: 'double',
		floor: 1,
		number: 102,
		available: true,
		price: 2000,
		features: [
			'balcony', 'sea_view', 'ensuite'
		]
	}
]

const clients = [
	{
		id: 1,
		created: new Date('2020-01-05T12:00:00Z'),
		name: 'Jonas Hellman',
		email: 'jonas.hellman@example.com',
		telephone: '070 000 0001'
	},
	{
		id: 2,
		created: new Date('2020-01-06T12:00:00Z'),
		name: 'Mikael Eriksson',
		email: 'mikael.eriksson@example.com',
		telephone: '070 000 0002'
	}
]

const bills = [
	{
		id: 1,
		created: new Date('2020-01-07T12:00:00Z'),
		value: 4500,
		paid: false
	}
]

const reservations = [
	{
		id: 1,
		created: new Date('2020-01-10T12:00:00Z'),
		start: '2020-04-01',
		end: '2020-04-04',
		client: 1,
		room: 1,
		bill: 1
	}
]

module.exports = {
    users,
    rooms,
    clients,
    bills,
    reservations
}

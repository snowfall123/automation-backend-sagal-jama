const express = require('express')
const router = express.Router()
const { createToken, sleep, userByPassword, userByHeaderToken, nextId } = require('./helper')
const data = require('./data')

// Login endpoints

router.post('/login', async (req, res) => {
	const user = userByPassword(req.body)
	await sleep(500) // Make user wait so emulate a slower connection
	if (user) {
		user.token = createToken()
		res.send({
			username: user.username,
			token: user.token
		})
	} else {
		res.status(401).send({ error: 'Bad username or password' })
	}
})

router.post('/logout', (req, res) => {
	const user = userByHeaderToken(req)
	if (user) {
		user.token = null
	}
	res.sendStatus(200)
})

// Room endpoints

router.get('/rooms', (req, res) => {
	if (userByHeaderToken(req)) res.send(data.rooms)
	else res.sendStatus(401)
})
router.get('/room/:id', (req, res) => {
	const room = data.rooms.find((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && room) res.send(room)
	else res.sendStatus(401)
})
router.post('/room/new', (req, res) => {
	if (userByHeaderToken(req)) {
		const room = req.body
		room.id = nextId(data.rooms)
		room.created = new Date()
		room.floor = parseFloat(room.floor) || 0
		room.number = parseFloat(room.number) || 0
		room.price = parseFloat(room.price) || 0
		data.rooms.push(room)
		res.send(room)
	} else res.sendStatus(401)
})
router.put('/room/:id', (req, res) => {
	const index = data.rooms.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		req.body.floor = parseFloat(req.body.floor) || 0
		req.body.number = parseFloat(req.body.number) || 0
		req.body.price = parseFloat(req.body.price) || 0
		res.send(data.rooms[index] = req.body)
	} else res.sendStatus(401)
})
router.delete('/room/:id', (req, res) => {
	const index = data.rooms.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		data.rooms.splice(index, 1)
		res.send({ ok: true })
	} else res.sendStatus(401)
})

// Client endpoints

router.get('/clients', (req, res) => {
	if (userByHeaderToken(req)) res.send(data.clients)
	else res.sendStatus(401)
})
router.get('/client/:id', (req, res) => {
	const client = data.clients.find((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && client) res.send(client)
	else res.sendStatus(401)
})
router.post('/client/new', (req, res) => {
	if (userByHeaderToken(req)) {
		const client = req.body
		client.id = nextId(data.clients)
		client.created = new Date()
		data.clients.push(client)
		res.send(client)
	} else res.sendStatus(401)
})
router.put('/client/:id', (req, res) => {
	const index = data.clients.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		res.send(data.clients[index] = req.body)
	} else res.sendStatus(401)
})
router.delete('/client/:id', (req, res) => {
	const index = data.clients.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		data.clients.splice(index, 1)
		res.send({ ok: true })
	} else res.sendStatus(401)
})

// Bill endpoints

router.get('/bills', (req, res) => {
	if (userByHeaderToken(req)) res.send(data.bills)
	else res.sendStatus(401)
})
router.get('/bill/:id', (req, res) => {
	const bill = data.bills.find((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && bill) res.send(bill)
	else res.sendStatus(401)
})
router.post('/bill/new', (req, res) => {
	if (userByHeaderToken(req)) {
		const bill = req.body
		bill.id = nextId(data.bills)
		bill.created = new Date()
		bill.value = parseFloat(bill.value) || 0
		data.bills.push(bill)
		res.send(bill)
	} else res.sendStatus(401)
})
router.put('/bill/:id', (req, res) => {
	const index = data.bills.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		req.body.value = parseFloat(req.body.value) || 0
		res.send(data.bills[index] = req.body)
	} else res.sendStatus(401)
})
router.delete('/bill/:id', (req, res) => {
	const index = data.bills.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		data.bills.splice(index, 1)
		res.send({ ok: true })
	} else res.sendStatus(401)
})

// Reservation endpoints

router.get('/reservations', (req, res) => {
	if (userByHeaderToken(req)) res.send(data.reservations)
	else res.sendStatus(401)
})
router.get('/reservation/:id', (req, res) => {
	const reservation = data.reservations.find((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && reservation) res.send(reservation)
	else res.sendStatus(401)
})
router.post('/reservation/new', (req, res) => {
	if (userByHeaderToken(req)) {
		const reservation = req.body
		reservation.id = nextId(data.reservations)
		reservation.created = new Date()
		data.reservations.push(reservation)
		res.send(reservation)
	} else res.sendStatus(401)
})
router.put('/reservation/:id', (req, res) => {
	const index = data.reservations.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		res.send(data.reservations[index] = req.body)
	} else res.sendStatus(401)
})
router.delete('/reservation/:id', (req, res) => {
	const index = data.reservations.findIndex((c) => c.id === parseInt(req.params.id, 10))
	if (userByHeaderToken(req) && index !== -1) {
		data.reservations.splice(index, 1)
		res.send({ ok: true })
	} else res.sendStatus(401)
})

module.exports = router

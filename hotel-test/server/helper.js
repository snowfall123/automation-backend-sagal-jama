const { Md5 } = require('ts-md5/dist/md5')
const data = require('./data')

function userByPassword({ username, password }) {
	return data.users.find((u) => {
		return u.username === username && u.password === password
	})
}

function userByHeaderToken(req) {
	const header = req.header('X-User-Auth')
	try {
		const auth = JSON.parse(header)
		return data.users.find((u) => {
			return u.username === auth.username && u.token === auth.token
		})
	} catch (err) {
		return null
	}
}

function createToken() {
	return Md5.hashStr(Math.random() + new Date())
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function nextId(list) {
	return list.length ? list[list.length - 1].id + 1 : 1
}

module.exports = {
	userByPassword,
	userByHeaderToken,
	createToken,
	sleep,
	nextId
}

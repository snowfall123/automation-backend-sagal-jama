const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())

console.log('\033cTESTER HOTEL')

/* tslint:disable:no-console */
app.listen(3000, () => console.log('Running on http://localhost:3000'))

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(cors())
app.use(express.static('dist'))
app.use('/api', require('./server/api'))

app.get('*', (_req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`)
})

module.exports = app

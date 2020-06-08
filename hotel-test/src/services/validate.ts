export function validateDate(date) {
	const format = /[19|20][0-9][0-9]-[0|1][0-9]-[0-3][0-9]/.test(date)
	const dateObj = new Date(date)
	return format && !isNaN(dateObj.getTime())
}

export function validateEmail(email) {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return emailRegex.test(String(email).toLowerCase())
}

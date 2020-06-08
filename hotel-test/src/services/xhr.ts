class RentalServiceXHR {
	public execute(url: string, method: string, data: any = null, headers: any = {}) {
		headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			...headers
		}
		const body = data ? JSON.stringify(data) : null
		const options = { method, headers, body }
		return fetch(url, options)
			.then((response) => response.json().then((json) => [response.ok, json]))
			.then(([ok, json]) => ok ? Promise.resolve(json) : Promise.reject(json))
	}

	public get(url: string, headers: any = null) {
		return this.execute(url, 'GET', null, headers)
	}

	public post(url: string, data: any, headers: any = null) {
		return this.execute(url, 'POST', data, headers)
	}

	public put(url: string, data: any, headers: any = null) {
		return this.execute(url, 'PUT', data, headers)
	}

	public delete(url: string, headers: any = null) {
		return this.execute(url, 'DELETE', null, headers)
	}
}

export const baseUrl = 'http://localhost:3000'

const rentalServiceXHR = new RentalServiceXHR()
export default rentalServiceXHR

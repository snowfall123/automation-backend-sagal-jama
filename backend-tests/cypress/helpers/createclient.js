const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT ='http://localhost:3000/api/client/new'


function createRandomClientPayload() {

    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const faketelephone = faker.phone.phoneNumber()

    const payload = {
        "name": fakeName,
        "email": fakeEmail,
        "telephone": faketelephone
    }
    return payload

}
//Create a new client

function createClientrequest(cy) {
    cy.authenticateSession().then((response => {
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
            method: "POST",
            url:ENDPOINT_POST_CLIENT,
            headers: {

                'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                'Content-Type': 'application/json'
            },
            body: fakeClientPayload
        }).then((response => {
            // cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeClientPayload.name)

        }))

        fetchAllClients(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)


    }))


}




//GET request to fetch all clients

function fetchAllClients(cy, name, email, telephone) {
    // cy.authenticateSession().then((response => {

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {

            'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
            'Content-Type': 'application/json'
        },

    }).then((response => {
        cy.log(JSON.stringify(response))

        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)


    }))
}

// Get all clients

    function getallClients(cy) {
        cy.authenticateSession().then((response => {
            cy.request({
                method: "GET",
                url: ENDPOINT_GET_CLIENTS,
                headers: {

                    'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                const responseAsString = JSON.stringify(response)
                cy.log(responseAsString)



            })
         
        }))
    }

   





module.exports = {

    createClientrequest,
    getallClients,
     
}


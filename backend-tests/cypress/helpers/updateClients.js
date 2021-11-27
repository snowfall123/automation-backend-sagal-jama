const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_PUT__CLIENT = 'http://localhost:3000/api/client/'


function createRandomClientPayload() {

    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakeTelephone = faker.phone.phoneNumber()
    const fakecreated = faker.date.recent()

    const payload = {
        "name": fakeName,
        "email": fakeEmail,
        "telephone": fakeTelephone,
        "created":fakecreated,
        
    }
    return payload
}



function updateClient(cy) {
    cy.authenticateSession().then((response => {


        const updateclient = {
            
             "id":"2",
            "name":"sara",
            "email":"sara@gmail.com",
            "telephone": "0732269921"
        }
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers: {


            'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
            'Content-Type': 'application/json'
        },

        }).then((response => {
          //  let clientId = response.body[response.body.length].id
            cy.request({
                method: "PUT",
                url: 'http://localhost:3000/api/client/2',
                headers: {

                    'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                    'Content-Type': 'application/json'
                },
                body: updateclient
            }).then((response => {
                // cy.log(JSON.stringify(response))
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(updateclient.name)

            }))

        }))





    }))

}


function createAndUpdateClient(cy) {
    cy.authenticateSession().then((response => {
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
            method: "POST",
            url: 'http://localhost:3000/api/client/new',
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

       updateClient(cy)

    }))


}
module.exports = {
    createAndUpdateClient
}
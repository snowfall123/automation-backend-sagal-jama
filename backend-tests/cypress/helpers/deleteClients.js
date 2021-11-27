const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT ='http://localhost:3000/api/client/new'
const ENDPOINT_DELETE_CLIENT='http://localhost:3000/api/client/'

function createRandomClientPayload() {

    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakeTelephone = faker.phone.phoneNumber()

    const payload = {
        "name": fakeName,
        "email": fakeEmail,
        "telephone": fakeTelephone
    }
    return payload

}
function deleteClient(cy) {
    // cy.authenticateSession().then((response => {

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {

            'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
            'Content-Type': 'application/json'
        },

    }).then((response => {
        let lastId = response.body[response.body.length -1].id
         cy.request({
             method:"DELETE",
             url: ENDPOINT_DELETE_CLIENT + lastId,
             headers: {

                'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                'Content-Type': 'application/json'
            },
         }).then((response =>{
             cy.log(JSON.stringify(response))
             const responseAsString = JSON.stringify(response.body)
             cy.log(responseAsString)
            
             expect(responseAsString).to.have.string('true')
         }))
        

    }))
}


function createAndDeleteClient(cy) {
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

        deleteClient(cy)

    }))


}
module.exports = {
    createAndDeleteClient
}

const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'

function createRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }

    return payload
}

function getRequestAllClientsWithAssertion(cy,name, email, telephone){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)
    }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
           
        }))
    }))
}

function createClientRequest(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        // post request to create a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))

        getRequestAllClientsWithAssertion(cy,fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}

function editClient(){
    cy.authenticateSession().then((response =>{
    cy.request({
    method: "GET",
    url: "http://localhost:3000/api/clients",
    headers:{
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
        'Content-Type': 'application/json'
    },
    }).then((response =>{
        const clientData = response.body[response.body.length - 1]
        clientData.name = "Testnamn"
        clientData.email = "testnamn@example.com"

        cy.request({
        method: "PUT",
        url: "http://localhost:3000/api/client/" + clientData.id,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:clientData
        
    }).then((response =>{
        const responseString = JSON.stringify(response.body)
        expect(responseString).to.have.string(clientData.name)
        expect(responseString).to.have.string(clientData.email)
    }))

    }))
    cy.log(response.body)

}))

}

function logOut(){
    cy.authenticateSession().then((response =>{
    cy.request({
    method: "POST",
    url: "http://localhost:3000/api/logout",
    headers:{
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
        'Content-Type': 'application/json'
    },
    }).then((response =>{
        cy.request({
        method: "PUT",
        url: "http://localhost:3000/api/client/" + clientData.id,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:clientData
        
    }).then((response =>{
        const responseString = JSON.stringify(response.body)
        expect(responseString).to.have.string(clientData.name)
        expect(responseString).to.have.string(clientData.email)
    }))

    }))
    cy.log(response.body)

}))

}

module.exports = {
    createRandomClientPayload, 
    createClientRequest, 
    getAllClientsRequest,
    editClient,
}


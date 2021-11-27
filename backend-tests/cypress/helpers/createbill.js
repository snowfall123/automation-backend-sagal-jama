// Create , Get all Clients and Delete client


const faker = require('faker')

const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'
const ENDPOINT_DELETE_BILL = 'http://localhost:3000/api/bill/'

// using faker to create randam values

function createRandombillPayload() {

    const fakevalue = faker.finance.amount()


    const payload = {
        "value": fakevalue,

    }
    return payload

}

// create new bill
function createBillRequest(cy) {
    cy.authenticateSession().then((response => {
        let fakeIDPayload = createRandombillPayload()
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers: {

                'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                'Content-Type': 'application/json'
            },
            body: fakeIDPayload
        }).then((response => {
            cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeIDPayload.value)

        }))

        fetchAllBills(cy, fakeIDPayload.value)


    }))


}




//GET request to fetch all bills

function fetchAllBills(cy, value) {
    // cy.authenticateSession().then((response => {

    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers: {

            'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
            'Content-Type': 'application/json'
        },

    }).then((response => {
        cy.log(JSON.stringify(response))

        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(value)



    }))
}

// get all bills
function getallbills(cy) {
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
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

// delete bill by DELETE request
function deleteBill(cy) {
   

        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS ,
            headers: {

                'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                'Content-Type': 'application/json'
            },

        }).then((response => {
            let lastId = response.body[response.body.length - 1].id
            cy.request({
                method: "DELETE",
                url: ENDPOINT_DELETE_BILL + lastId,
                headers: {

                    'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response => {
                cy.log(JSON.stringify(response))
                const responseAsString = JSON.stringify(response.body)
                cy.log(responseAsString)
                expect(responseAsString).to.have.string('true')
            }))


        }))
    
}
// create and delete bill
function createAndDeleteBill(cy) {
    cy.authenticateSession().then((response => {
        let fakeBillPayload = createRandombillPayload()
        cy.request({
            method: "POST",
            url:ENDPOINT_POST_BILL ,
            headers: {

                'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                'Content-Type': 'application/json'
            },
            body: fakeBillPayload
        }).then((response => {
            // cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeBillPayload.value)

        }))

        deleteBill(cy)

    }))


}
module.exports = {
            createBillRequest,
            getallbills,
           createAndDeleteBill
        }
const ENDPOINT_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_CREATE_ROOM = 'http://localhost:3000/api/room/new'

// create new room
function createRoom(cy) {
    cy.authenticateSession().then((response => {


        const roompayload = {
            "features":["balcony"],
            "category":"single",
            "number":"1",
            "floor":"5",
            "available":true,
            "price":"500"
        }
        cy.request({
            method: "POST",
            url: ENDPOINT_CREATE_ROOM,

            headers: {


                'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
                'Content-Type': 'application/json'
            },
            body: roompayload
        }).then((response => {
            cy.log(JSON.stringify(response))
        
        }))
    }))

}

// get all rooms
function getallRooms(cy) {
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_ROOMS,
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
    getallRooms,
    createRoom
}
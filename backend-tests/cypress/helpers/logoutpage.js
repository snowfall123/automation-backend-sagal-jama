// create logout function with api



function logout(cy){
    cy.request({
     method: "POST",
     url: 'http://localhost:3000/api/logout',
     headers: {

         'X-User-Auth': JSON.stringify(Cypress.env().LoginToken),
         'Content-Type': 'application/json'
     },
 }).then(response => {
    expect(response.status).to.eq(200)

    })
}

module.exports = {
    logout
}
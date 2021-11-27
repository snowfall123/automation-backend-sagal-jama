 
import * as clientHelpers from '../helpers/clientHelpers'
import * as deleteClients from '../helpers/deleteClients'
import * as logoutapplication from '../helpers/logout'




describe('Test suite, Client', function(){

    it('Create a new client', function(){
       clientHelpers.createClientRequest(cy)
    })

    it('Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
     })
     
     it("Edit client", function(){
      clientHelpers.editClient()
  })
   
     
     it('Delete a client',function(){

      deleteClients.deleteClientAfterCreate(cy)
     })

     it('LOG OUT', function(){
      logoutapplication.logout(cy)

     })
    


})



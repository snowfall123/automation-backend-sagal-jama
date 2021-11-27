 /*
import * as clientHelpers from '../helpers/clientHelpers'


describe('Test suite, CLIENT', function(){

    it('Create a new client', function(){
       clientHelpers.createClientRequest(cy)
    })

    it('Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
     })

})
*/


import * as clientpage from '../helpers/createclient'
import * as billpage from '../helpers/createbills'
import * as deleteclient from '../helpers/deleteClient'
import *as updateClient from '../pages/updateClient'
import * as logoutapplication from '../helpers/logoutpage'
import * as createRoom from '../helpers/createRoom'

describe('testing auth', function(){
   
  // Test case 1

    it('Create and Get all clients', function(){
        clientpage.createClientrequest(cy)
        clientpage.getallClients(cy)
        logoutapplication.logout(cy)
        
    })  
    
   
    //TEST case 2

    it('Create and delete client', function(){
        deleteclient.createAndDeleteClient(cy)
        logoutapplication.logout(cy)
        
    })
       
        
    //Test case 3

   it('Create and get all bills',function(){
       billpage.createBillRequest(cy)
       billpage.getallbills(cy)
       logoutapplication.logout(cy)
       
   })

    
    //Test case 4

    it('Create and delete bill',function(){
       billpage.createAndDeleteBill(cy)
       logoutapplication.logout(cy)
       
   })
   // Test case 5
   
   it('create room', function(){
       createRoom.createRoom(cy)
       createRoom.getallRooms(cy)
       logoutapplication.logout(cy)
       
   })


    //Test case 6 update
    it('create and update client',function(){
     updateClient.createAndUpdateClient(cy)
    })
    

})

        
   
    
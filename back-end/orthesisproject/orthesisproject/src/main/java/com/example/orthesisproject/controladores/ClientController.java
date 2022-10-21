package com.example.orthesisproject.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.orthesisproject.entidades.Client;
import com.example.orthesisproject.servicios.ClientService;


@Service
@RestController
@RequestMapping("/api/Client")
@CrossOrigin(origins="*", methods = {
   RequestMethod.GET,
   RequestMethod.POST,
   RequestMethod.PUT,
   RequestMethod.DELETE,
})
public class ClientController {
   

   @Autowired
   ClientService clientService;

   public ClientController(ClientService clientService){
      this.clientService = clientService;
   }

   @GetMapping(path ="/all")
   public ResponseEntity<List<Client>> getClients(){
      return new ResponseEntity<List<Client>>(this.clientService.getListClients(), HttpStatus.OK);
   }
 
    @PostMapping(path = "/save")
    public ResponseEntity<Client> createClient(@RequestBody Client client){
      return new ResponseEntity<Client>(this.clientService.createClient(client), HttpStatus.CREATED);
    }  

    @PutMapping("/update")
    public ResponseEntity<String> updateClient(@RequestBody Client client){
        this.clientService.updateClient(client.getIdClient(), client);
        return new ResponseEntity<String>("Client updated", HttpStatus.CREATED);
    }

     @DeleteMapping(path="/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") int id){
        this.clientService.deleteClient(id);
        return new ResponseEntity<String>("Client deleted", HttpStatus.NO_CONTENT);
    }
   
   
}

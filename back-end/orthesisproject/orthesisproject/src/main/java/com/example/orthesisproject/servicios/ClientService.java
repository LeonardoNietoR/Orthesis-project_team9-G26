package com.example.orthesisproject.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orthesisproject.entidades.Client;
import com.example.orthesisproject.repositorios.OrtipedicRepository;

@Service
public class ClientService {
   

   //@ Autowired creates an object of "clientRepository" with access to all the functionalities. Since it is an interface, its not possible to do "= new ClientRepository".
@Autowired
private OrtipedicRepository clientRepository;

public ClientService(OrtipedicRepository clientRepository) {
   this.clientRepository = clientRepository;
}

public List<Client>  getListClients(){
   return this.clientRepository.findAll();
} 

public Client createClient(Client newClient){
   return this.clientRepository.save(newClient);
}

public void updateClient(int id, Client client){
   if(!this.clientRepository.findById(id).isEmpty()){
         Client clientDB = this.clientRepository.findById(id).get();

         if(client.getName() != null)
            clientDB.setName(client.getName());
         if(client.getEmail() != null)
            clientDB.setEmail(client.getEmail());
         if(client.getPassword() != null)
            clientDB.setPassword(client.getPassword());
         if(client.getAge() != null)
            clientDB.setAge(client.getAge());

         this.clientRepository.save(clientDB);
   }
}

public void deleteClient(int id){
   if(!this.clientRepository.findById(id).isEmpty()){
      this.clientRepository.deleteById(id);
   }
}

}

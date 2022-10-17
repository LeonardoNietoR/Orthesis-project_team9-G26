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

import com.example.orthesisproject.entidades.Message;
import com.example.orthesisproject.servicios.MessageService;


@Service
@RestController
@RequestMapping("/api/Message")
@CrossOrigin(origins="*", methods = {
   RequestMethod.GET,
   RequestMethod.POST,
   RequestMethod.PUT,
   RequestMethod.DELETE,
})
public class MessageController {
   

   @Autowired
   MessageService messageService;

   public MessageController(MessageService messageService){
      this.messageService = messageService;
   }

   @GetMapping(path ="/all")
   public ResponseEntity<List<Message>> getMessages(){
      return new ResponseEntity<List<Message>>(this.messageService.getListMessages(), HttpStatus.OK);
   }
 
    @PostMapping(path = "/save")
    public ResponseEntity<Message> createMessage(@RequestBody Message message){
      return new ResponseEntity<Message>(this.messageService.createMessage(message), HttpStatus.CREATED);
    }  

   
    @PutMapping("/update")
    public ResponseEntity<String> updateMessage(@RequestBody Message message){
        this.messageService.updateMessage(message.getIdMessage(), message);
        return new ResponseEntity<String>("Message updated", HttpStatus.CREATED);
    }

   @DeleteMapping(path="/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable("id") int id){
        this.messageService.deleteMessage(id);
        return new ResponseEntity<String>("Message deleted", HttpStatus.NO_CONTENT);
    }
   
   
}


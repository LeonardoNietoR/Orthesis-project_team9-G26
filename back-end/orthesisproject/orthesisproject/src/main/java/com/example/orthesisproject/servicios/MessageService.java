package com.example.orthesisproject.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orthesisproject.entidades.Message;
import com.example.orthesisproject.repositorios.MessageRepository;

@Service
public class MessageService {
   
   @Autowired
   private MessageRepository messageRepository;

   public MessageService(MessageRepository messageRepository) {
      this.messageRepository = messageRepository;
   }
   
   public List<Message> getListMessages(){
      return this.messageRepository.findAll();
   }

   public Message createMessage(Message newMessage){
      return this.messageRepository.save(newMessage);
   }

   public void updateMessage(int id, Message message){
   if(!this.messageRepository.findById(id).isEmpty()){
         Message messageDB = this.messageRepository.findById(id).get();

         if(message.getMessageText() != null)
            messageDB.setMessageText(message.getMessageText());
        
         this.messageRepository.save(messageDB);
   }
}

   public void deleteMessage(int id){
      if(!this.messageRepository.findById(id).isEmpty())
         this.messageRepository.deleteById(id);
   }

}

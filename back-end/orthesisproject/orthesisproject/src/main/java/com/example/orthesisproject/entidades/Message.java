package com.example.orthesisproject.entidades;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="message")
public class Message implements Serializable{

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer idMessage;

   @Column(name="messageText")
   private String messageText;

   @ManyToOne
   @JoinColumn(name="ortopedicId")
   @JsonIgnoreProperties({"messages", "reservations"})
   private Ortopedic ortopedic;

   @ManyToOne
   @JoinColumn(name="clientId")
   @JsonIgnoreProperties({"messages", "reservations"})
   private Client client;

   public Message(){}

   public Integer getIdMessage() {
      return idMessage;
   }

   public void setIdMessage(Integer idMessage) {
      this.idMessage = idMessage;
   }

   public String getMessageText() {
      return messageText;
   }

   public void setMessageText(String messageText) {
      this.messageText = messageText;
   }

   public Ortopedic getOrtopedic() {
      return ortopedic;
   }

   public void setOrtopedic(Ortopedic ortopedic) {
      this.ortopedic = ortopedic;
   }

   public Client getClient() {
      return client;
   }

   public void setClient(Client client) {
      this.client = client;
   }

  
   
}

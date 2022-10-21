package com.example.orthesisproject.model.DTOs;

import com.example.orthesisproject.entidades.Client;

public class CountClient {
   private Long total;
   private Client client;
   
   public CountClient(Long total, Client client) {
      this.total = total;
      this.client = client;
   }
   public Long getTotal() {
      return total;
   }
   public void setTotal(Long total) {
      this.total = total;
   }
   public Client getClient() {
      return client;
   }
   public void setClient(Client client) {
      this.client = client;
   }

   
}

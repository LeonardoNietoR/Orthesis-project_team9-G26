package com.example.orthesisproject.entidades;

import java.io.Serializable;
import java.util.Date;

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
@Table(name="reservation")
public class Reservation implements Serializable {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer idReservation;
   
   @Column(name="startDate")
   private Date startDate;

   @Column(name="devolutionDate")
   private Date devolutionDate;

   @Column(name="score")
   private Integer score;

   @Column(name="status")
   private String status;

   @ManyToOne
   @JoinColumn(name="ortopedicId")
   @JsonIgnoreProperties("reservations")
   private Ortopedic ortopedic;

   @ManyToOne
   @JoinColumn(name="clientId")
   @JsonIgnoreProperties({"reservations", "messages"})
   private Client client;

  

   public Reservation( ){
      this.status = "created";
   }

   public Integer getIdReservation() {
      return idReservation;
   }

   public void setIdReservation(Integer idReservation) {
      this.idReservation = idReservation;
   }

   public Date getStartDate() {
      return startDate;
   }

   public void setStartDate(Date startDate) {
      this.startDate = startDate;
   }

   public Date getDevolutionDate() {
      return devolutionDate;
   }

   public void setDevolutionDate(Date devolutionDate) {
      this.devolutionDate = devolutionDate;
   }

   public Client getClient() {
      return client;
   }

   public void setClient(Client client) {
      this.client = client;
   }

   public Ortopedic getOrtopedic() {
      return ortopedic;
   }

   public void setOrtopedic(Ortopedic ortopedic) {
      this.ortopedic = ortopedic;
   }

   public Integer getScore() {
      return score;
   }

   public void setScore(Integer score) {
      this.score = score;
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
   };

   
   
}

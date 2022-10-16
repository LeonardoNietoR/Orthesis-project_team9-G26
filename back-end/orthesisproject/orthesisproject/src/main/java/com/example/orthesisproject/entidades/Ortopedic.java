
package com.example.orthesisproject.entidades;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
// import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="ortopedic")
public class Ortopedic implements Serializable{
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   @Column(name="brand")
   private String brand;
   @Column(name="year")
   private Integer year;
   @Column(name="name")
   private String name;
   @Column(name="description")
   private String description;   

   @ManyToOne
   @JoinColumn(name="categoryId")
   @JsonIgnoreProperties("ortopedics")
   private Category category;

   @OneToMany(cascade ={CascadeType.PERSIST}, mappedBy = "ortopedic")  
   @JsonIgnoreProperties("ortopedic")
   private List<Message> messages;

   @OneToMany
   @JsonIgnoreProperties("ortopedic")
   private List<Reservation> reservations;

   public Ortopedic(){}

   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
   }

   public String getBrand() {
      return brand;
   }

   public void setBrand(String brand) {
      this.brand = brand;
   }

   public Integer getYear() {
      return year;
   }

   public void setYear(Integer year) {
      this.year = year;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   public Category getCategory() {
      return category;
   }

   public void setCategory(Category category) {
      this.category = category;
   }

   public List<Message> getMessages() {
      return messages;
   }

   public void setMessages(List<Message> messages) {
      this.messages = messages;
   }

   public List<Reservation> getReservations() {
      return reservations;
   }

   public void setReservations(List<Reservation> reservations) {
      this.reservations = reservations;
   }


  


}

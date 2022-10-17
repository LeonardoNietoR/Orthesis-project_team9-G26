package com.example.orthesisproject.entidades;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="category")
public class Category implements Serializable { 

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   @Column(name="name")
   private String name;
   @Column(name="description")
   private String description;

   @OneToMany(cascade={CascadeType.PERSIST}, mappedBy="category")
   @JsonIgnoreProperties("category")
   private List<Ortopedic> ortopedics;

   public Category(){}


   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
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

   public List<Ortopedic> getOrtopedics() {
      return ortopedics;
   }

   public void setOrtopedics(List<Ortopedic> ortopedics) {
      this.ortopedics = ortopedics;
   }

   @Override
   public String toString() {
      return "Category [id=" + id + ", name=" + name + ", description=" + description + ", ortopedics=" + ortopedics
            + "]";
   }


   
   
}

package com.example.orthesisproject.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.orthesisproject.entidades.Client;

// @Repository represents all the clients created whereas the @Entity represents a single client

@Repository
public interface ClientRepository extends JpaRepository<Client,Integer> {
   

}

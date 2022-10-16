package com.example.orthesisproject.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.orthesisproject.entidades.Message;


@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
   
}

package com.example.orthesisproject.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.orthesisproject.entidades.Ortopedic;

@Repository
public interface OrtopedicRepository extends JpaRepository<Ortopedic,Integer>  {
   

}

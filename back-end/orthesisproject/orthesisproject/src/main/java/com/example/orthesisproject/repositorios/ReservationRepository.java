package com.example.orthesisproject.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.orthesisproject.entidades.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
   
}

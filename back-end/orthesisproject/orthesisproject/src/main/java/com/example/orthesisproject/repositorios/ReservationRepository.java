package com.example.orthesisproject.repositorios;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.orthesisproject.entidades.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
   
   @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT(c.client) DESC")
   public  List<Object[]> countTotalReservationByClient();

   public List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);

   public List<Reservation> findAllByStatus(String status);
}

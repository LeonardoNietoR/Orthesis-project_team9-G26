package com.example.orthesisproject.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orthesisproject.entidades.Reservation;
import com.example.orthesisproject.repositorios.ReservationRepository;

@Service
public class ReservationService {
   

@Autowired
private ReservationRepository reservationRepository;

public ReservationService(ReservationRepository reservationRepository) {
   this.reservationRepository = reservationRepository;
}

public List<Reservation>  getListReservations(){
   return this.reservationRepository.findAll();
} 

public Reservation createReservation(Reservation newReservation){
   return this.reservationRepository.save(newReservation);
}

public void updateReservation(int id, Reservation reservation){
   if(!this.reservationRepository.findById(id).isEmpty()){
         Reservation reservationDB = this.reservationRepository.findById(id).get();

         if(reservation.getStartDate() != null)
            reservationDB.setStartDate(reservation.getStartDate());
         if(reservation.getDevolutionDate() != null)
            reservationDB.setDevolutionDate(reservation.getDevolutionDate());
         if(reservation.getScore() != null)
            reservationDB.setScore(reservation.getScore());
         if(reservation.getStatus() != null)
            reservationDB.setStatus(reservation.getStatus());
        

         this.reservationRepository.save(reservationDB);
   }
}

public void deleteReservation(int id){
   if(!this.reservationRepository.findById(id).isEmpty()){
      this.reservationRepository.deleteById(id);
   }
}

}


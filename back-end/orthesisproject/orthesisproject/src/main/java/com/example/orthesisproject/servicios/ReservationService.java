package com.example.orthesisproject.servicios;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orthesisproject.entidades.Client;
import com.example.orthesisproject.entidades.Reservation;
import com.example.orthesisproject.model.DTOs.CountClient;
import com.example.orthesisproject.model.DTOs.CountStatus;
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

public List<CountClient> getCLientsMoreReservations(){
   List<CountClient> respuesta = new ArrayList<>();
  
   List<Object[]> reporte = reservationRepository.countTotalReservationByClient();

   for(int i =0;i<reporte.size(); i++){

      respuesta.add(new CountClient((long) reporte.get(i)[1], (Client) reporte.get(i)[0]));
   }

   return respuesta;
}

public List<Reservation> getReservationsBetweenDates(String dateString1, String dateString2){

   SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
   
   Date date1 = new Date();
   Date date2 = new Date();

   try {
      date1 = parser.parse(dateString1);
      date2 = parser.parse(dateString2);
   } catch (ParseException error) {
      error.printStackTrace();
   }

       return reservationRepository.findAllByStartDateAfterAndDevolutionDateBefore(date1, date2);
   
}

public CountStatus getReservationByStatus(){

   List<Reservation> reservasCompletadas = reservationRepository.findAllByStatus("completed");
   List<Reservation> reservasCanceladas = reservationRepository.findAllByStatus("cancelled");

   return new CountStatus((long) reservasCompletadas.size(),(long) reservasCanceladas.size());


}


}


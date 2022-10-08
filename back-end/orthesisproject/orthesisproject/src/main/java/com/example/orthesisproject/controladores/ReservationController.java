package com.example.orthesisproject.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.orthesisproject.entidades.Reservation;
import com.example.orthesisproject.servicios.ReservationService;


@Service
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins="*", methods = {
   RequestMethod.GET,
   RequestMethod.POST,
   RequestMethod.PUT,
   RequestMethod.DELETE,
})
public class ReservationController {
   

   @Autowired
   ReservationService reservationService;

   public ReservationController(ReservationService reservationService){
      this.reservationService = reservationService;
   }

   @GetMapping(path ="/all")
   public ResponseEntity<List<Reservation>> getReservation(){
      return new ResponseEntity<List<Reservation>>(this.reservationService.getListReservations(), HttpStatus.OK);
   }
 
    @PostMapping(path = "/save")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation){
      return new ResponseEntity<Reservation>(this.reservationService.createReservation(reservation), HttpStatus.CREATED);
    }  

   @PutMapping("/update")
    public ResponseEntity<String> updateReservation(@RequestBody Reservation reservation){
        this.reservationService.updateReservation(reservation.getIdReservation(), reservation);
        return new ResponseEntity<String>("Reservation updated", HttpStatus.CREATED);
    }

     @DeleteMapping(path="/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable("id") int id){
        this.reservationService.deleteReservation(id);
        return new ResponseEntity<String>("Reservation deleted", HttpStatus.NO_CONTENT);
    }
   
   
}


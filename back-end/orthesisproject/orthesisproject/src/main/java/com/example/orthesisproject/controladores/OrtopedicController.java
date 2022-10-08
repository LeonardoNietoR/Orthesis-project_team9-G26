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

import com.example.orthesisproject.entidades.Ortopedic;
import com.example.orthesisproject.servicios.OrtopedicService;

@Service
@RestController
@RequestMapping("/api/Ortopedic")
@CrossOrigin(origins="*", methods={
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE
})
public class OrtopedicController {
 
   @Autowired
   OrtopedicService ortopedicService;

   public OrtopedicController(OrtopedicService ortopedicService) {
      this.ortopedicService = ortopedicService;
   }

   @GetMapping(path="/all")
   public ResponseEntity<List<Ortopedic>> getOrtopedics(){
      return new ResponseEntity<List<Ortopedic>>(this.ortopedicService.getListOrtopedics(), HttpStatus.OK);
   }

   @PostMapping(path="/save")
   public ResponseEntity<Ortopedic> createOrtopedic(@RequestBody Ortopedic ortopedic){
      return new ResponseEntity<Ortopedic>(this.ortopedicService.createOrtopedic(ortopedic), HttpStatus.CREATED);
   }

    @PutMapping("/update")
    public ResponseEntity<String> updateOrtopedic(@RequestBody Ortopedic ortopedic){
        this.ortopedicService.updateOrtopedic(ortopedic.getId(), ortopedic);
        return new ResponseEntity<String>("Ortopedic updated", HttpStatus.CREATED);
    }


     @DeleteMapping(path="/{id}")
    public ResponseEntity<String> deleteOrtopedic(@PathVariable("id") int id){
        this.ortopedicService.deleteOrtopedic(id);
        return new ResponseEntity<String>("Ortopedic deleted", HttpStatus.NO_CONTENT);
    }


}

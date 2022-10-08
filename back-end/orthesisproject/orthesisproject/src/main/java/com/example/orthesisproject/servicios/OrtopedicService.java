package com.example.orthesisproject.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orthesisproject.entidades.Ortopedic;
import com.example.orthesisproject.repositorios.OrtopedicRepository;

@Service
public class OrtopedicService {
   
   @Autowired
   private OrtopedicRepository ortopedicRepository;

   public OrtopedicService(OrtopedicRepository ortopedicRepository) {
      this.ortopedicRepository = ortopedicRepository;
   }
   
   public List<Ortopedic> getListOrtopedics(){
      return this.ortopedicRepository.findAll();
   }

   public Ortopedic createOrtopedic(Ortopedic newOrtopedic){
      return this.ortopedicRepository.save(newOrtopedic);
   }

   public void updateOrtopedic(int id, Ortopedic ortopedic){
   if(!this.ortopedicRepository.findById(id).isEmpty()){
         Ortopedic ortopedicDB = this.ortopedicRepository.findById(id).get();

         if(ortopedic.getBrand() != null)
            ortopedicDB.setBrand(ortopedic.getBrand());
         if(ortopedic.getYear() != null)
            ortopedicDB.setYear(ortopedic.getYear());
         if(ortopedic.getName() != null)
            ortopedicDB.setName(ortopedic.getName());
         if(ortopedic.getDescription() != null)
            ortopedicDB.setDescription(ortopedic.getDescription());
        

         this.ortopedicRepository.save(ortopedicDB);
   }
}

   public void deleteOrtopedic(int id){
      if(!this.ortopedicRepository.findById(id).isEmpty())
         this.ortopedicRepository.deleteById(id);
   }


   

}

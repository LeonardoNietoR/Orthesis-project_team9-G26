package com.example.orthesisproject.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.orthesisproject.entidades.Category;
import com.example.orthesisproject.servicios.CategoryService;

@Service
@RestController
@RequestMapping("/api/Category")
public class CategoryController {

   @Autowired
   CategoryService categoryService;

   public CategoryController(CategoryService categoryService){
      this.categoryService = categoryService;
   }
   
   @GetMapping("/all")
   public ResponseEntity<List<Category>> getCategories(){
      return new ResponseEntity<List<Category>>( this.categoryService.getListCategories(), HttpStatus.OK);
   }

   @PostMapping("/save")
   public ResponseEntity<Category> createCategory(@RequestBody Category category){
      return new ResponseEntity<Category>(this.categoryService.createCategory(category), HttpStatus.CREATED);
   }

    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(@RequestBody Category category){
        this.categoryService.updateCategory(category.getId(), category);
        return new ResponseEntity<String>("Category updated", HttpStatus.CREATED);
    }

   @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") int id){
        this.categoryService.deleteCategory(id);
        return new ResponseEntity<String>("Category deleted", HttpStatus.NO_CONTENT);
    }

}

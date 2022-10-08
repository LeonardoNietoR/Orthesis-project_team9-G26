package com.example.orthesisproject.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.orthesisproject.entidades.Category;
import com.example.orthesisproject.repositorios.CategoryRepository;

@Service
public class CategoryService {
   
@Autowired
private CategoryRepository categoryRepository;

public CategoryService(CategoryRepository categoryRepository){
   this.categoryRepository = categoryRepository;
}

public List<Category> getListCategories(){
   return this.categoryRepository.findAll();
}

public  Category createCategory(Category newCategory){
    return this.categoryRepository.save(newCategory);
}

public void updateCategory(int id, Category category){
   if(!this.categoryRepository.findById(id).isEmpty()){
         Category categoryDB = this.categoryRepository.findById(id).get();

         if(category.getName() != null)
            categoryDB.setName(category.getName());
         if(category.getDescription() != null)
            categoryDB.setDescription(category.getDescription());

         this.categoryRepository.save(categoryDB);
   }
}

public void deleteCategory(int id){
   if(!this.categoryRepository.findById(id).isEmpty()){
      this.categoryRepository.deleteById(id);
   }
}


}

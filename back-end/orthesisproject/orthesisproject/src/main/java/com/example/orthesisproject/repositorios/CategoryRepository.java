package com.example.orthesisproject.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.orthesisproject.entidades.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
   
}

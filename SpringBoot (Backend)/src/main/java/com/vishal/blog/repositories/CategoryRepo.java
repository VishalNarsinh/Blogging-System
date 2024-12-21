package com.vishal.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vishal.blog.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}

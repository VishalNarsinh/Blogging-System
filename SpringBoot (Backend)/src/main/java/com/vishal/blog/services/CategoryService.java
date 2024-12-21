package com.vishal.blog.services;

import java.util.List;

import com.vishal.blog.entities.Category;
import com.vishal.blog.payloads.CategoryDto;

public interface CategoryService {
	
	public Category dtoToCategory(CategoryDto categoryDto);
	public CategoryDto categoryToDto(Category category);

	CategoryDto createCategory(CategoryDto categoryDto);
	
	CategoryDto updateCategory(CategoryDto categoryDto,Integer cId);
	
	void deleteCategory(Integer cId);
	
	List<CategoryDto> getAllCategory();
	
	CategoryDto getCategoryById(Integer cId); 
}

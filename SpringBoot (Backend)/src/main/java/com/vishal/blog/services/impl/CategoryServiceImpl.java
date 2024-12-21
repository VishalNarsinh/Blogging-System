package com.vishal.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vishal.blog.entities.Category;
import com.vishal.blog.exceptions.ResourceNotFoundException;
import com.vishal.blog.payloads.CategoryDto;
import com.vishal.blog.repositories.CategoryRepo;
import com.vishal.blog.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryRepo categoryRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		Category category = dtoToCategory(categoryDto);
		Category savedCategory = categoryRepo.save(category);
		return  categoryToDto(savedCategory);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer cId) {
		Category category = categoryRepo.findById(cId).orElseThrow(()->new ResourceNotFoundException("Category", "cId", cId));
		category.setName(categoryDto.getName());
		category.setDescription(categoryDto.getDescription());
		Category updatedCategory = categoryRepo.save(category);
		return categoryToDto(updatedCategory);
	}

	@Override
	public void deleteCategory(Integer cId) {
		Category category = categoryRepo.findById(cId).orElseThrow(()-> new ResourceNotFoundException("Category", "cId", cId));
		categoryRepo.delete(category);
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> categories = categoryRepo.findAll();
		List<CategoryDto> categoryDtos = categories.stream().map(category->categoryToDto(category)).collect(Collectors.toList());
		return categoryDtos;
	}

	@Override
	public CategoryDto getCategoryById(Integer cId) {
		Category category = categoryRepo.findById(cId).orElseThrow(()-> new ResourceNotFoundException("Category", "cId", cId));
		return categoryToDto(category);
	}

	public Category dtoToCategory(CategoryDto categoryDto) {
		return mapper.map(categoryDto, Category.class);
	}
	
	public CategoryDto categoryToDto(Category category) {
		return mapper.map(category, CategoryDto.class);
	}
}

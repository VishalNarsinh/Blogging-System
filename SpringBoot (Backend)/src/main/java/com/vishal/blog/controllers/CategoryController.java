package com.vishal.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.payloads.CategoryDto;
import com.vishal.blog.services.CategoryService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
@SecurityRequirement(name = "scheme1")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
//	create
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
		CategoryDto category = categoryService.createCategory(categoryDto);
		return new ResponseEntity<>(category,HttpStatus.CREATED);
	}

//  update
	@PutMapping("/{cId}")
	public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto, @PathVariable Integer cId) {
		CategoryDto updatedCategory = categoryService.updateCategory(categoryDto, cId);
		return ResponseEntity.ok(updatedCategory);
	}


//	delete
	@DeleteMapping("/{cId}")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer cId) {
		categoryService.deleteCategory(cId);
		return ResponseEntity.ok(new ApiResponse("Category deleted Successfully",true));
	}
	
//	get
	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> getAllCategory() {
		return ResponseEntity.ok(categoryService.getAllCategory());
	}
	
//	get all
	@GetMapping("/{cId}")
	public ResponseEntity<CategoryDto> getCategory(@PathVariable Integer cId) {
		return ResponseEntity.ok(categoryService.getCategoryById(cId));
	}

}

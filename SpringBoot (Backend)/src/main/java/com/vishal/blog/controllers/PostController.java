package com.vishal.blog.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.payloads.PostDto;
import com.vishal.blog.payloads.PostResponse;
import com.vishal.blog.services.PostService;
import com.vishal.blog.utils.AppConstants;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@SecurityRequirement(name = "scheme1")
@RestController
@RequestMapping("/api")
@CrossOrigin
public class PostController {

	private static final Logger log = LoggerFactory.getLogger(PostController.class);
	@Autowired
	private PostService postService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@PostMapping("/user/{uId}/category/{cId}/posts")
	public ResponseEntity<?> createPost(@RequestParam("postDto")String postData,@RequestParam(value = "image",required = false) MultipartFile file , @PathVariable Integer uId,@PathVariable Integer cId ){
		log.info("Entry {}",postData);
		try {
			PostDto postDto = objectMapper.readValue(postData, PostDto.class);
			PostDto post = postService.createPost(postDto, uId, cId , file);
			return new ResponseEntity<>(post,HttpStatus.CREATED);
		} catch (JsonMappingException e) {
	        // Return a BAD_REQUEST response if there's an error in JSON mapping
	        return ResponseEntity.badRequest().body("Error while mapping JSON: " + e.getMessage());
	    } catch (JsonProcessingException e) {
	        // Return a BAD_REQUEST response if there's an error in JSON processing
	        return ResponseEntity.badRequest().body("Error while processing JSON: " + e.getMessage());
	    } catch (Exception e) {
	        // Return a SERVER_ERROR response for other unexpected errors
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create post: " + e.getMessage());
	    }
	}



	@GetMapping("/posts/{pId}")
	public ResponseEntity<?> getPostsByPostId(@PathVariable Integer pId){
		return ResponseEntity.ok(postService.getPostById(pId));
	}
	
	@GetMapping("/user/{uId}/posts")
	public ResponseEntity<?> getPostsByUser(@PathVariable Integer uId){
		return ResponseEntity.ok(postService.getAllPostByUser(uId));
	}
	
	@GetMapping("/category/{cId}/posts")
	public ResponseEntity<?> getPostsByCategory(@PathVariable Integer cId) {
		return ResponseEntity.ok(postService.getAllPostByCategory(cId));
	}

	@GetMapping("/posts/search/{keyword}")
	public ResponseEntity<List<PostDto>> getPostsByKeyword(@PathVariable String keyword) {
		return ResponseEntity.ok(postService.searchPosts(keyword));
	}
	
	
	@DeleteMapping("/posts/{pId}")
	public ResponseEntity<?> deletePost(@PathVariable Integer pId){
		postService.deletePost(pId);
		return ResponseEntity.ok(new ApiResponse("Post deleted",true));
	}
	
	

	@PutMapping("/posts/{pId}/category/{cId}")
	public ResponseEntity<?> updatePost(@RequestParam("postDto")String postData,@RequestParam(value = "image",required = false) MultipartFile file ,@PathVariable Integer pId,@PathVariable Integer cId  ){
		try {
			PostDto postDto = objectMapper.readValue(postData, PostDto.class);
			PostDto updatePost = postService.updatePost(postDto, pId,cId, file);
			return new ResponseEntity<>(updatePost,HttpStatus.OK);
		} catch (JsonMappingException e) {
	        // Return a BAD_REQUEST response if there's an error in JSON mapping
	        return ResponseEntity.badRequest().body("Error while mapping JSON: " + e.getMessage());
	    } catch (JsonProcessingException e) {
	        // Return a BAD_REQUEST response if there's an error in JSON processing
	        return ResponseEntity.badRequest().body("Error while processing JSON: " + e.getMessage());
	    } catch (Exception e) {
	        // Return a SERVER_ERROR response for other unexpected errors
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update post: " + e.getMessage());
	    }
	}

	@GetMapping("/posts")
	public ResponseEntity<PostResponse> getPostWithPagination(
			@RequestParam(value = "pageNumber" ,defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
			@RequestParam(value = "pageSize" ,defaultValue = AppConstants.PAGE_SIZE,required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY,required = false) String sortBy,
			@RequestParam(value = "sortDir",defaultValue = AppConstants.SORT_DIR,required = false) String sortDir
			){
		return ResponseEntity.ok(postService.getAllPostWithPagination(pageNumber, pageSize,sortBy,sortDir));
	}
	
}

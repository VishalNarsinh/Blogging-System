package com.vishal.blog.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.payloads.UserDto;
import com.vishal.blog.services.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@SecurityRequirement(name = "scheme1")
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ObjectMapper objectMapper;

	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@RequestParam("userDto")String userData,@RequestParam(value = "image",required = false) MultipartFile file , @PathVariable Integer id ){
		try {
		 UserDto userDto = objectMapper.readValue(userData, UserDto.class);
		 	UserDto updateUser = userService.updateUser(userDto, id,file);
			return new ResponseEntity<>(updateUser,HttpStatus.CREATED);
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



	@DeleteMapping("/delete")
	public ResponseEntity<ApiResponse> deleteUser(Principal principal) {
		UserDto user = userService.getUserByEmail(principal.getName());
		userService.deletUser(user.getId());
		return ResponseEntity.ok(new ApiResponse("User deleted Successfully",true));
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/")
	public ResponseEntity<?> getAllUsers(){
		List<UserDto> users = userService.getAllUsers();
		if(users.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse("No user found",false),HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(users);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable("id") Integer id){
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@GetMapping("/current")
	public ResponseEntity<?> getCurrentUser(Principal principal){
		return ResponseEntity.ok(userService.getUserByEmail(principal.getName()));
	}
	
	@PutMapping("/toggle/{id}")
	public ResponseEntity<?> toggleUserStatus(@PathVariable("id") Integer id)
	{
		return ResponseEntity.ok(Map.of("status",userService.toggleUserActiveStatus(id)));
	}
}

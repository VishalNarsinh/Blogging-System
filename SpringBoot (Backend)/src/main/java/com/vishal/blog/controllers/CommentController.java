package com.vishal.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.payloads.CommentDto;
import com.vishal.blog.services.CommentService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@SecurityRequirement(name = "scheme1")
@RestController
@RequestMapping("/api")
public class CommentController {

	@Autowired
	CommentService commentService;
	
	@PostMapping("/user/{uId}/post/{pId}/comments")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,@PathVariable Integer uId,@PathVariable Integer pId){
		CommentDto comment = commentService.createComment(commentDto, pId, uId);
		return new ResponseEntity<CommentDto>(comment,HttpStatus.CREATED);
	}
	
	

	@DeleteMapping("/comments/{commentId}")
	public ResponseEntity<?> deleteComment(@PathVariable Integer commentId) {
		commentService.deleteComment(commentId);
		return ResponseEntity.ok(new ApiResponse("Comment deleted", true));
	}

}

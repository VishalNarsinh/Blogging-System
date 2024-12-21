package com.vishal.blog.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.payloads.UserDto;
import com.vishal.blog.services.LikeService;
import com.vishal.blog.services.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@SecurityRequirement(name = "scheme1")
@RestController
@RequestMapping("/api")
public class LikeController {

	@Autowired
	UserService userService;

	@Autowired
	LikeService likeService;

	@PostMapping("/post/check-like/{pId}")
	public ResponseEntity<ApiResponse> isLikedByUser(Principal principal, @PathVariable Integer pId) {
		UserDto userDto = userService.getUserByEmail(principal.getName());
		boolean isLikedByUser = likeService.isLikedByUser(userDto.getId(), pId);
		return ResponseEntity.ok(new ApiResponse("isLiked", isLikedByUser));
	}

	@PostMapping("/post/{pId}")
	public ResponseEntity<ApiResponse> togglingLike(Principal principal, @PathVariable Integer pId) {
		UserDto userDto = userService.getUserByEmail(principal.getName());
		return ResponseEntity.ok(likeService.toggleLike(userDto.getId(), pId));
	}
}

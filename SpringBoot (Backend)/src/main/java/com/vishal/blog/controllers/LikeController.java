package com.vishal.blog.controllers;

import java.security.Principal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.vishal.blog.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
		User user = (User) token.getPrincipal();
		boolean isLikedByUser = likeService.isLikedByUser(user.getId(), pId);
		return ResponseEntity.ok(new ApiResponse("isLiked", isLikedByUser));
	}

	@PostMapping("/post/{pId}")
	public ResponseEntity<ApiResponse> togglingLike(Principal principal, @PathVariable Integer pId) {
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
		User user = (User) token.getPrincipal();
		return ResponseEntity.ok(likeService.toggleLike(user.getId(), pId));
	}

	@GetMapping("/post/{pId}/likes/count")
	public ResponseEntity<?> getLikeCount(@PathVariable Integer pId) {
		long count = likeService.getLikeCount(pId);
		return ResponseEntity.ok(java.util.Map.of("count", count));
	}
}

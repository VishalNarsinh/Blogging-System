package com.vishal.blog.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vishal.blog.entities.Like;
import com.vishal.blog.entities.Post;
import com.vishal.blog.entities.User;
import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.repositories.LikeRepo;
import com.vishal.blog.repositories.UserRepo;
import com.vishal.blog.repositories.PostRepo;
import com.vishal.blog.services.LikeService;
import com.vishal.blog.services.PostService;
import com.vishal.blog.services.UserService;

@Service
public class LikeServiceImpl implements LikeService {

	@Autowired
	UserService userService;
	
	@Autowired
	PostService postService;

	@Autowired
	LikeRepo likeRepo;

	@Autowired
	UserRepo userRepo;

	@Autowired
	PostRepo postRepo;
	
	@Override
	public boolean isLikedByUser(Integer uId, Integer pId) {
		boolean flag = false;
		flag = likeRepo.existsByUser_IdAndPost_pId(uId, pId);
		return flag;
	}

	@Override
	public ApiResponse toggleLike(Integer uId, Integer pId) {
		Optional<Like> likeOptional = likeRepo.findByUser_IdAndPost_pId(uId, pId);
		if(likeOptional.isPresent()) {
			likeRepo.delete(likeOptional.get());
			return new ApiResponse("Like deleted", true);
		}else {
			User user = userRepo.getReferenceById(uId);
			Post post = postRepo.getReferenceById(pId);
			Like like = Like.builder().user(user).post(post).build();
			likeRepo.save(like);
			return new ApiResponse("Like added", true);
		}
	}

	@Override
	public long getLikeCount(Integer pId) {
		return likeRepo.countByPost_pId(pId);
	}

}

package com.vishal.blog.services;

import com.vishal.blog.payloads.ApiResponse;

public interface LikeService {
	boolean isLikedByUser(Integer uId, Integer pId);
	
	ApiResponse toggleLike(Integer uId, Integer pId);
}

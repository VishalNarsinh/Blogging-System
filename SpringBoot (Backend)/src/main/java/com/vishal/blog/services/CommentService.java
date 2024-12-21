package com.vishal.blog.services;

import com.vishal.blog.payloads.CommentDto;

public interface CommentService {

	CommentDto createComment(CommentDto commentDto,Integer pId,Integer uId);
	
	void deleteComment(Integer commentId);
}

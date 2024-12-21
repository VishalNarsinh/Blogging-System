package com.vishal.blog.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vishal.blog.entities.Comment;
import com.vishal.blog.entities.Post;
import com.vishal.blog.entities.User;
import com.vishal.blog.exceptions.ResourceNotFoundException;
import com.vishal.blog.payloads.CommentDto;
import com.vishal.blog.repositories.CommentRepo;
import com.vishal.blog.repositories.PostRepo;
import com.vishal.blog.repositories.UserRepo;
import com.vishal.blog.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentRepo commentRepo;
	
	@Autowired
	PostRepo postRepo;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	ModelMapper mapper;
	
	private Comment dtoToComment(CommentDto commentDto) {
		return mapper.map(commentDto, Comment.class);
	}
	
	private CommentDto commentToDto(Comment comment) {
		return mapper.map(comment, CommentDto.class);
	}
	
	@Override
	public CommentDto createComment(CommentDto commentDto, Integer pId, Integer uId) {
		User user = userRepo.findById(uId).orElseThrow(()->new ResourceNotFoundException("User", "id", uId));
		Post post = postRepo.findById(pId).orElseThrow(() -> new ResourceNotFoundException("Post", "pId", pId));
		Comment comment = dtoToComment(commentDto);
		comment.setUser(user);
		comment.setPost(post);
		Comment save = commentRepo.save(comment);
		return commentToDto(save);
	}

	@Override
	public void deleteComment(Integer commentId) {
		Comment comment = commentRepo.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment", "commentId", commentId));
		commentRepo.delete(comment);
	}

}

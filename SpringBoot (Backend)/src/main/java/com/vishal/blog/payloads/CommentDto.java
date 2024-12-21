package com.vishal.blog.payloads;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

	private int commentId;
	
	private String content;
	
	
	private UserDto user;

	@JsonBackReference
	private PostDto post;
}

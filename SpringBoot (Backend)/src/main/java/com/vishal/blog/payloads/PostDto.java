package com.vishal.blog.payloads;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDto {

	private int pId;
	
	@NotBlank
	@Size(min = 5,max = 255,message = "Title must be 3-20 characters")
	private String title;
	
	@NotBlank
	@Size(min = 10,message = "Blog Content is too short!!!")
	private String content;
	
	private Map<String, String> image = new HashMap<>(); 
	
	private Date dateAdded;
	

	private boolean isLive;
	
	private UserDto user;
	
	private CategoryDto category;

	private List<CommentDto> comments = new ArrayList<>();
	
	
}

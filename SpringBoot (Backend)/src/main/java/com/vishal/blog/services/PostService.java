package com.vishal.blog.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.vishal.blog.entities.Post;
import com.vishal.blog.payloads.PostDto;
import com.vishal.blog.payloads.PostResponse;

public interface PostService {

	public Post dtoToPost(PostDto postDto);

	public PostDto postToDto(Post post);

	PostDto createPost(PostDto postDto, Integer uId, Integer cId, MultipartFile file);

	PostDto updatePost(PostDto postDto, Integer pId,Integer cId, MultipartFile file);

	void deletePost(Integer pId);

	PostDto getPostById(Integer pId);

	List<PostDto> getAllPost();
	
	PostResponse getAllPostWithPagination(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);

	List<PostDto> getAllPostByUser(Integer uId);

	List<PostDto> getAllPostByCategory(Integer cId);

	List<PostDto> searchPosts(String keyword);
}

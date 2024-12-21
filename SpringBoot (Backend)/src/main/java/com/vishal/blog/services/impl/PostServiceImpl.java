package com.vishal.blog.services.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.vishal.blog.entities.Category;
import com.vishal.blog.entities.Post;
import com.vishal.blog.entities.User;
import com.vishal.blog.exceptions.ResourceNotFoundException;
import com.vishal.blog.payloads.PostDto;
import com.vishal.blog.payloads.PostResponse;
import com.vishal.blog.repositories.CategoryRepo;
import com.vishal.blog.repositories.PostRepo;
import com.vishal.blog.repositories.UserRepo;
import com.vishal.blog.services.CategoryService;
import com.vishal.blog.services.PostService;
import com.vishal.blog.services.UserService;
import com.vishal.blog.utils.AppConstants;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	PostRepo postRepo;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	CategoryRepo categoryRepo;
	
	@Autowired
	ModelMapper mapper;
	
	@Autowired
	UserService userService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	Cloudinary cloudinary;
	
	
	public Map upload(MultipartFile file,String folderName) {
		try {
			Map upload = cloudinary.uploader().upload(file.getBytes(), Map.of("folder",folderName));
			return upload;
		} catch (Exception e) {
			throw new RuntimeException("Couldn't upload image");
		}
	}
	
	public Post dtoToPost(PostDto postDto) {
		return mapper.map(postDto, Post.class);
	}
	
	public PostDto postToDto(Post post) {
		return mapper.map(post, PostDto.class);
	}
	
	
	@Override
	public PostDto createPost(PostDto postDto,Integer uId, Integer cId,MultipartFile file) {
		User user = userRepo.findById(uId).orElseThrow(()->new ResourceNotFoundException("User", "id", uId));
		Category category = categoryRepo.findById(cId).orElseThrow(()->new ResourceNotFoundException("Category", "cId", cId));
		Post post = dtoToPost(postDto);
		if(file!=null) {
			Map upload = upload(file,"blogs");
			String imageUrl = (String) upload.get("secure_url");
			String publicId = (String) upload.get("public_id");
			post.getImage().put("imageUrl", imageUrl);
			post.getImage().put("public_id", publicId);
		}
		else {
			post.getImage().put(AppConstants.DEFAULT_BLOG_IMAGE_PUBLIC_ID,AppConstants.DEFAULT_BLOG_IMAGE_URL);
		}
		post.setLive(true);
		post.setDateAdded(new Date());
		post.setUser(user);
		post.setCategory(category);
		Post savedPost = postRepo.save(post);
		return postToDto(savedPost);
	}
	



	@Override
	public void deletePost(Integer pId) {
		Post post = postRepo.findById(pId).orElseThrow(() -> new ResourceNotFoundException("Post", "pId", pId));
		
		
		postRepo.delete(post);
	}

	@Override
	public PostDto getPostById(Integer pId) {
		Post post = postRepo.findById(pId).orElseThrow(() -> new ResourceNotFoundException("Post", "pId", pId));
		return postToDto(post);
	}

	@Override
	public List<PostDto> getAllPost() {
		List<Post> posts = postRepo.findAll();
		List<PostDto> postDtos = posts.stream().map(post -> postToDto(post)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> getAllPostByUser(Integer uId) {
		List<Post> posts = postRepo.findAllByUserOrderByDateAddedDesc(userRepo.findById(uId).orElseThrow(()->new ResourceNotFoundException("User", "id", uId)));
		List<PostDto> postDtos = posts.stream().map(post -> postToDto(post)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> searchPosts(String keyword) {
		List<Post> posts = postRepo.findByTitleAllIgnoreCaseContaining(keyword);
		List<PostDto> postDtos = posts.stream().map(post -> postToDto(post)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> getAllPostByCategory(Integer cId) {
		List<Post> posts = postRepo.findByCategoryOrderByDateAddedDesc(categoryRepo.findById(cId).orElseThrow(()->new ResourceNotFoundException("Category", "cId", cId)));
		List<PostDto> postDtos = posts.stream().map(post -> postToDto(post)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer pId,Integer cId, MultipartFile file) {
		Post post = postRepo.findById(pId).orElseThrow(()->new ResourceNotFoundException("Post", "post id", pId));
		Category category = categoryRepo.findById(cId).orElseThrow(()->new ResourceNotFoundException("Category", "cId", cId));
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setCategory(category);
		if(file!=null) {
			post.getImage().clear();
			Map upload = upload(file,"blogs");
			String imageUrl = (String) upload.get("secure_url");
			String publicId = (String) upload.get("public_id");
			post.getImage().put("imageUrl", imageUrl);
			post.getImage().put("public_id", publicId);
			
			
		}
		Post save = postRepo.save(post);
		return postToDto(post);

	}

	@Override
	public PostResponse getAllPostWithPagination(
			Integer pageNumber,Integer pageSize,String sortBy,String sortDir
			) {
		
//		Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.by(sortBy));
//		Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.by(sortBy).ascending());
		/*
		 * In both cases, Sort.by(sortBy) creates a Sort object based on the provided
		 * sorting criteria, and .ascending() is implicitly applied, as it is the
		 * default behavior when sorting criteria are provided without specifying the
		 * direction. Therefore, both lines produce the same result.
		 */
//		use below function for descending sort
//		Pageable pageable = PageRequest.of(pageNumber, pageSize,Sort.by(sortBy).descending());
		
 		Sort sort = Sort.by(sortBy);
 		if(!sortDir.equalsIgnoreCase("asc")) {
 			sort = sort.descending();
 		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize,sort);
		Page<Post> pagePost = postRepo.findAll(pageable);
		List<Post> posts = pagePost.getContent();
		List<PostDto> postDtos = posts.stream().map(post -> postToDto(post)).collect(Collectors.toList());
		PostResponse postResponse = PostResponse.builder()
			.content(postDtos)
			.pageNumber(pagePost.getNumber())
			.pageSize(pagePost.getSize())
			.totalElements(pagePost.getTotalElements())
			.totalPages(pagePost.getTotalPages())
			.lastPage(pagePost.isLast()).build();
		return postResponse;
	}
	

}

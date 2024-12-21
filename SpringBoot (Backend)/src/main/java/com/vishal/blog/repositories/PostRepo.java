package com.vishal.blog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vishal.blog.entities.Category;
import com.vishal.blog.entities.Post;
import com.vishal.blog.entities.User;

public interface PostRepo extends JpaRepository<Post, Integer> {

	List<Post> findAllByUserOrderByDateAddedDesc(User user);
	
	List<Post> findByCategoryOrderByDateAddedDesc(Category category);
	
//	List<Post> findByTitleContainingIgnoreCase(String keyword);
	
	List<Post> findByTitleAllIgnoreCaseContaining(String keyword);
	
	
	
}

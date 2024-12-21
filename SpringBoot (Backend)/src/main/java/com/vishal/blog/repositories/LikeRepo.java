package com.vishal.blog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vishal.blog.entities.Like;
import com.vishal.blog.entities.Post;
import com.vishal.blog.entities.User;

public interface LikeRepo extends JpaRepository<Like, Integer> {
	boolean existsByUserAndPost(User user,Post post);
	
	boolean existsByUser_IdAndPost_pId(Integer uId, Integer pId);
	
	Optional<Like> findByUser_IdAndPost_pId(Integer uId, Integer pId);
}

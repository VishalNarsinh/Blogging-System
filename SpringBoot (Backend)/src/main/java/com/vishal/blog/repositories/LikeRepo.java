package com.vishal.blog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vishal.blog.entities.Like;
import com.vishal.blog.entities.Post;
import com.vishal.blog.entities.User;

public interface LikeRepo extends JpaRepository<Like, Integer> {
	boolean existsByUserAndPost(User user,Post post);
	
	@Query("select count(l) > 0 from Like l where l.user.id = :uId and l.post.pId = :pId")
	boolean existsByUser_IdAndPost_pId(@Param("uId") Integer uId, @Param("pId") Integer pId);
	
	@Query("select l from Like l where l.user.id = :uId and l.post.pId = :pId")
	Optional<Like> findByUser_IdAndPost_pId(@Param("uId") Integer uId, @Param("pId") Integer pId);
	
	long countByPost_pId(Integer pId);
}

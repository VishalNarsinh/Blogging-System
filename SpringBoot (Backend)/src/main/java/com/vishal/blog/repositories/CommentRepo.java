package com.vishal.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vishal.blog.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}

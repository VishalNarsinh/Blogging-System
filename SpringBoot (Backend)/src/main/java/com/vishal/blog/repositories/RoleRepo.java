package com.vishal.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vishal.blog.entities.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {

}

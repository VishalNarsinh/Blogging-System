package com.vishal.blog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.vishal.blog.entities.Role;
import com.vishal.blog.repositories.RoleRepo;
import com.vishal.blog.utils.AppConstants;
@SpringBootApplication
public class BlogAppApisApplication implements CommandLineRunner{

	@Autowired
	private RoleRepo roleRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(BlogAppApisApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		try {
			Role adminRole = new Role(AppConstants.ADMIN_USER,"ROLE_ADMIN");
			Role userRole= new Role(AppConstants.NORMAL_USER,"ROLE_NORMAL");
			Role visitorRole= new Role(AppConstants.VISITOR_USER,"ROLE_VISITOR");
			List<Role> roles = List.of(adminRole,userRole,visitorRole);
			List<Role> result = roleRepo.saveAll(roles);
		} catch (Exception e) {
		}
	}

	
}

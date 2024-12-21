package com.vishal.blog.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vishal.blog.entities.User;
import com.vishal.blog.exceptions.ResourceNotFoundException;
import com.vishal.blog.repositories.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	private final UserRepo userRepo;

	public CustomUserDetailsService(UserRepo userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(username).orElseThrow(()->new ResourceNotFoundException("User", "email", username));
		return user;
	}

}

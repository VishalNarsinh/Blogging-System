package com.vishal.blog.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.vishal.blog.entities.User;
import com.vishal.blog.payloads.UserDto;

public interface UserService {
	
	public User dtoToUser(UserDto userDto);
	public UserDto userToDto(User user);
	
	
	UserDto createUser(UserDto userDto);
	UserDto createAdminUser(UserDto userDto);
	
	UserDto updateUser(UserDto userDto,Integer id,MultipartFile file);
	
	UserDto getUserById(Integer id);
	
	UserDto getUserByEmail(String email);
	
	List<UserDto> getAllUsers();
	
	void deletUser(Integer id);
	public boolean toggleUserActiveStatus(Integer userId);
}

package com.vishal.blog.services.impl;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.vishal.blog.entities.Role;
import com.vishal.blog.entities.User;
import com.vishal.blog.exceptions.ResourceNotFoundException;
import com.vishal.blog.payloads.UserDto;
import com.vishal.blog.repositories.RoleRepo;
import com.vishal.blog.repositories.UserRepo;
import com.vishal.blog.services.UserService;
import com.vishal.blog.utils.AppConstants;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;
	
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
	@Override
	public UserDto createUser(UserDto userDto) {
		User user = dtoToUser(userDto);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role role = roleRepo.findById(AppConstants.NORMAL_USER).get();
		user.getRoles().add(role);
		user.getImage().put("imageUrl", AppConstants.DEFAULT_USER_IMAGE_URL);
		user.getImage().put("public_id", AppConstants.DEFAULT_USER_IMAGE_PUBLIC_ID);
//		user.setImage(Map.of(AppConstants.DEFAULT_USER_IMAGE_PUBLIC_ID,AppConstants.DEFAULT_USER_IMAGE_URL));
		user.setLive(true);
		User saveUser = userRepo.save(user);
		return userToDto(saveUser);
	}


	@Override
	public UserDto createAdminUser(UserDto userDto) {
		User user = dtoToUser(userDto);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role adminUser = roleRepo.findById(AppConstants.ADMIN_USER).get();
		Role normalUser = roleRepo.findById(AppConstants.NORMAL_USER).get();
		user.getRoles().add(adminUser);
		user.getRoles().add(normalUser);
		user.getImage().put("imageUrl", AppConstants.DEFAULT_USER_IMAGE_URL);
		user.getImage().put("public_id", AppConstants.DEFAULT_USER_IMAGE_PUBLIC_ID);
		user.setLive(true);
		User save = userRepo.save(user);
		save.setPassword(null);
		return userToDto(save);
	}
	
	@Override
	public UserDto updateUser(UserDto userDto, Integer id,MultipartFile file) {
//		
		User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User"," id ",id));
		if(file!=null) {
			user.getImage().clear();
			Map upload = upload(file,"users");
			String imageUrl = (String) upload.get("secure_url");
			String publicId = (String) upload.get("public_id");
			user.getImage().put("imageUrl", imageUrl);
			user.getImage().put("public_id", publicId);
		}
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
//		user.setPassword(userDto.getPassword());
		user.setAbout(userDto.getAbout());
		User saveUser = userRepo.save(user);
		return userToDto(saveUser);
	}

	@Override
	public UserDto getUserById(Integer id) {
		User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User", "Id", id));
		return userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users= userRepo.findAll();
		List<UserDto> userDtos = users.stream().map(user->userToDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public void deletUser(Integer id) {
		User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User", "id", id));
		userRepo.delete(user);
        try {
            cloudinary.uploader().destroy(user.getImage().get("public_id"), Map.of());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

	public User dtoToUser(UserDto userDto) {		
		User user = mapper.map(userDto, User.class);
		return user;
	}
	
	public UserDto userToDto(User user) {
		return mapper.map(user, UserDto.class);
	}

	@Override
	public UserDto getUserByEmail(String email) {
		User user = userRepo.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User", "email", email));
		return userToDto(user);
	}
	
	public boolean toggleUserActiveStatus(Integer userId) {
	    // Find the user by their ID
	    User user = userRepo.findById(userId)
	        .orElseThrow(() -> new ResourceNotFoundException("User", "user id", userId));
	    
	    // Toggle the isActive attribute
	    user.setLive(!user.isLive());
	    
	    // Save the updated user to the database
	    userRepo.save(user);
	    return user.isLive();
	}


}

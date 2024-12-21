package com.vishal.blog.controllers;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.blog.config.security.jwt.JwtTokenHelper;
import com.vishal.blog.entities.RefreshToken;
import com.vishal.blog.entities.User;
import com.vishal.blog.exceptions.ApiException;
import com.vishal.blog.payloads.JwtRequest;
import com.vishal.blog.payloads.JwtResponse;
import com.vishal.blog.payloads.RefreshTokenRequest;
import com.vishal.blog.payloads.UserDto;
import com.vishal.blog.services.UserService;
import com.vishal.blog.services.impl.RefreshTokenService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@SecurityRequirement(name = "scheme1")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private RefreshTokenService refreshTokenService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtTokenHelper helper;

	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper mapper;

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

		this.doAuthenticate(request.getEmail(), request.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		String token = this.helper.generateToken(userDetails);

		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername());

		JwtResponse response = JwtResponse.builder().jwtToken(token).refreshToken(refreshToken.getRefreshToken())
				.user(this.mapper.map((User) userDetails,UserDto.class)).build();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			manager.authenticate(authentication);
		} catch (BadCredentialsException e) {
			throw new ApiException(" Invalid Username or Password !!");
		}

	}

	@PostMapping("/refresh")
	public JwtResponse refreshJwtToken(@RequestBody RefreshTokenRequest request) {
		RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(request.getRefreshToken());
		User user = refreshToken.getUser();
		String token = helper.generateToken(user);
		return JwtResponse.builder()
				.refreshToken(refreshToken.getRefreshToken())
				.jwtToken(token)
				.user(this.mapper.map(user, UserDto.class)).build();

	}


	@PostMapping("/register")
	public ResponseEntity<UserDto> createNormalUser(@Valid @RequestBody UserDto userDto) {
		UserDto user = userService.createUser(userDto);
		return new ResponseEntity<UserDto>(user,HttpStatus.CREATED);
	}
	
	@PostMapping("/register-admin")
	public ResponseEntity<UserDto> createAdminUser(@Valid @RequestBody UserDto userDto){
		UserDto adminUser = userService.createAdminUser(userDto);
		return new ResponseEntity<UserDto>(adminUser,HttpStatus.CREATED);
	}

}

package com.vishal.blog.services.impl;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vishal.blog.entities.RefreshToken;
import com.vishal.blog.entities.User;
import com.vishal.blog.exceptions.ResourceNotFoundException;
import com.vishal.blog.repositories.RefreshTokenRepository;
import com.vishal.blog.repositories.UserRepo;


@Service
public class RefreshTokenService {
	
	public Long refreshTokenValidity = (long) (10*60*60*1000);
	
	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	
	@Autowired
	private UserRepo userRepository;
	
	public RefreshToken createRefreshToken(String username) {
		User user = userRepository.findByEmail(username).get();
		RefreshToken refreshToken = user.getRefreshToken();
		
		if(refreshToken==null) {
			refreshToken = RefreshToken.builder()
					.refreshToken(UUID.randomUUID().toString())
					.expiry(Instant.now().plusMillis(refreshTokenValidity))
					.user(userRepository.findByEmail(username).get())
					.build();
		}
		else {
			refreshToken.setExpiry(Instant.now().plusMillis(refreshTokenValidity));
		}
		 
		user.setRefreshToken(refreshToken);
		
		refreshTokenRepository.save(refreshToken);
		return refreshToken;
	}
	
	public RefreshToken verifyRefreshToken(String refreshToken) {
		RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken).orElseThrow(()->new ResourceNotFoundException("Refresh Token","token",refreshToken));
		if(token.getExpiry().compareTo(Instant.now())<0) {
			refreshTokenRepository.delete(token);
			throw new RuntimeException("Refresh Token expired");
		}
		return token;
	}
}

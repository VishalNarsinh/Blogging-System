package com.vishal.blog.config;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class BeanConfig {

	@Bean
	ModelMapper modelMapper() {
		return new ModelMapper();
	}
	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	Cloudinary getCloudinary() {
		Map<Object,Object> config = new HashMap<>();
		config.put("cloud_name", "dzew8rxxw");
		config.put("api_key", "132577132533181");
		config.put("api_secret", "OBnwo_60XfuV333U-bnzha5Ubg4");
		config.put("secure", true);
		return new Cloudinary(config);
	}
}

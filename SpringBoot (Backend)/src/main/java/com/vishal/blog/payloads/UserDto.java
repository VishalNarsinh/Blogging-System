package com.vishal.blog.payloads;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@JsonInclude(JsonInclude.Include.NON_NULL) 
public class UserDto {
	private int id;
	
	@NotBlank(message = "Name must not be blank")
	@Size(min = 3,message = "Name is too short")
	private String name;
	
	@NotBlank(message = "Email must not be blank")
	@Email(message = "Invalid Email Address")
	private String email;
	
	@NotBlank(message = "Password must not be blank")
    @Pattern(
    		regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)[a-zA-Z0-9\\W]{6,20}$",
    		message = "Password must be 6-20 characters, contain a digit, uppercase, lowercase, and special character"
    )	
	private String password;
	
	
	@NotBlank(message = "About must not be blank")
	private String about;
	
	private boolean isLive;
	
	private Map<String, String> image=new HashMap<>();
	
	private Set<RoleDto> roles=new HashSet<>();
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
}

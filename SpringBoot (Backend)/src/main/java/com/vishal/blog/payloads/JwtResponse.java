package com.vishal.blog.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class JwtResponse {
	private String jwtToken;
	private String refreshToken;
	private UserDto user;
	@Override
	public String toString() {
		return "JwtResponse [jwtToken=" + jwtToken + ", refreshToken=" + refreshToken + "]";
	}
	

}

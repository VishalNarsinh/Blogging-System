package com.vishal.blog.payloads;

import lombok.Data;

@Data
public class RefreshTokenRequest {
	private String refreshToken;
}

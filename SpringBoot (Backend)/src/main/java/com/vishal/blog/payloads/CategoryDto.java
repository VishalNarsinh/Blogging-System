package com.vishal.blog.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CategoryDto {
	
	private int cId;
	@NotBlank
	@Size(min = 2,max = 100,message = "Name must be 2-100 characters")
	private String name;
	@Size(min = 2,max = 255,message = "Name must be 2-255 characters")
	private String description;
}

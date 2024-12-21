package com.vishal.blog.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
//import io.swagger.v3.oas.models.Components;
//import io.swagger.v3.oas.models.OpenAPI;
//import io.swagger.v3.oas.models.info.Contact;
//import io.swagger.v3.oas.models.info.Info;
//import io.swagger.v3.oas.models.security.SecurityRequirement;
//import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
@SecurityScheme(
		name = "scheme1",
		type = SecuritySchemeType.HTTP,
		bearerFormat = "JWT",
		scheme = "bearer"
		)
@OpenAPIDefinition(
		info = @Info(
				title = "Blog Api",
				description = "",
				version = "",
				contact =  @Contact(
						name = "This is Blog REST API project developed by Vishal Narsinh",
						email = "1.0"				
						)
				)
		)
public class SwaggerConfig {


//	
//	@Bean
//	OpenAPI openAPI() {
//		
//		String schemeName = "bearerScheme";
//		
//		return new OpenAPI()
//				.info(new Info().
//						title("Blog Api").
//						description("This is Blog API project developed by Vishal Narsinh")
//						.version("1.0")
//						.contact(new Contact()
//								.name("Vishal Narsinh")
//								.email("vishalnarsinh@gmail.com"))
//						)
//				.addSecurityItem(new SecurityRequirement().addList(schemeName))
//				.components(new Components()
//								.addSecuritySchemes(schemeName,new SecurityScheme()
//										.name(schemeName)
//										.type(SecurityScheme.Type.HTTP)
//										.bearerFormat("JWT")
//										.scheme("bearer")));
//		
//	}
}

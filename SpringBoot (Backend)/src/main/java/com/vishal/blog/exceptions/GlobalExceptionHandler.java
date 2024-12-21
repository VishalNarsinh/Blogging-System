package com.vishal.blog.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.vishal.blog.payloads.ApiResponse;
import com.vishal.blog.utils.AppConstants;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException exception){
		ApiResponse apiResponse = new ApiResponse(exception.getMessage(),true);
		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception){
		Map<String, String> errors = new HashMap<>();
		exception.getAllErrors().forEach( error -> {
			String fieldName = ((FieldError) error ).getField();
			String message = error.getDefaultMessage();
			errors.put(fieldName, message);
		});
		return ResponseEntity.badRequest().body(errors);
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<Map<String, String>> dataIntegrityViolationExceptionHandler(DataIntegrityViolationException exception){
		Map<String, String> errors = new HashMap<>();
		String cause = exception.getMostSpecificCause().getLocalizedMessage();
		String message = exception.getLocalizedMessage();
		errors.put(cause,message);
		return ResponseEntity.badRequest().body(errors);
	}
	
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> apiExceptionHandler(ApiException exception){
		return ResponseEntity.badRequest().body(new ApiResponse(exception.getMessage(),true));
	}
	
	@ExceptionHandler(ExpiredJwtException.class)
	public ResponseEntity<?> expiredJwtExceptionHandler(ExpiredJwtException exception){
		Map map = new HashMap();
		map.put("message","Jwt Token expired");
		map.put("server-side-message",exception.getMessage());
		map.put("code",AppConstants.JWT_TOKEN_EXPIRED);
		return new ResponseEntity(map,HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> illegalArgumentExceptionHandler(IllegalArgumentException exception){
		Map map = new HashMap();
		map.put("message","Jwt Token expired");
		map.put("server-side-message",exception.getMessage());
		map.put("code",AppConstants.JWT_TOKEN_ILLEGAL_ARGUMENT);
		return new ResponseEntity(map,HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(MalformedJwtException.class)
	public ResponseEntity<?> malformedJwtExceptionHandler(MalformedJwtException exception){
		Map map = new HashMap();
		map.put("message","Jwt Token expired");
		map.put("server-side-message",exception.getMessage());
		map.put("code",AppConstants.JWT_TOKEN_MALFORMED_INFORMATION);
		return new ResponseEntity(map,HttpStatus.UNAUTHORIZED);
	}
	
}

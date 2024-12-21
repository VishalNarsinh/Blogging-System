package com.vishal.blog.utils;

public class AppConstants {
	public static final String PAGE_NUMBER = "0";
	public static final String PAGE_SIZE = "7";
	public static final String SORT_BY = "dateAdded";
	public static final String SORT_DIR = "asc";
	public static final String S3_BUCKET_NAME= "vishal-blog-api-bucket";
	public static final int ADMIN_USER=1;
	public static final int NORMAL_USER=2;
	public static final int VISITOR_USER=3;
	
	public static final String DEFAULT_BLOG_IMAGE_PUBLIC_ID = "blogs/tlnvltucd4otycjstajv";
	public static final String DEFAULT_BLOG_IMAGE_URL = "https://res.cloudinary.com/dzew8rxxw/image/upload/v1732194804/blogs/tlnvltucd4otycjstajv.webp";

	public static final String DEFAULT_USER_IMAGE_PUBLIC_ID = "users/gpwpygjb2pijrcnphmcs";
	public static final String DEFAULT_USER_IMAGE_URL = "https://res.cloudinary.com/dzew8rxxw/image/upload/v1732194111/users/gpwpygjb2pijrcnphmcs.png";
	
	public static final int JWT_TOKEN_EXPIRED = 498;
	// Custom status code for indicating that the JWT token has expired
	public static final int JWT_TOKEN_MALFORMED_INFORMATION = 422; 
	// Custom status code for indicating that the JWT token contains malformed information
	public static final int JWT_TOKEN_ILLEGAL_ARGUMENT = 400; 
	// Custom status code for indicating that an illegal argument was encountered during JWT token processing

}

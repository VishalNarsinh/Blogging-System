package com.vishal.blog.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pId;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false,columnDefinition = "longtext")
	private String content;
	
	@ElementCollection
    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "pId"))
    @MapKeyColumn(name = "keys_image")
    @Column(name = "values_image")
    private Map<String, String> image = new HashMap<>();
	
	private Date dateAdded;
	

	private boolean isLive;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "user_id",nullable = false)
	private User user;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "category_id",nullable = false)
	private Category category;
	
	
	@OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
	private List<Comment> comments=new ArrayList<>();
}

package com.codera.producer_service_kafka.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer {
	
	
	 @Id
	private int id;
    private String name;
    private String email;
    private LocalDate date; 
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	@Override
	public String toString() {
		return "Customer [id=" + id + ", name=" + name + ", email=" + email + ", date=" + date + "]";
	}
	public Customer(int id, String name, String email, LocalDate date) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.date = date;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}

package com.codera.producer_service_kafka.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codera.producer_service_kafka.model.Customer;
import com.codera.producer_service_kafka.service.KafkaProducerService;


@RestController
public class KafkaController {
	
	

	  @Autowired
	    private KafkaProducerService kafkaProducerService;
	  


	  @PostMapping("/sendAllCustomers")
	    public String sendAllCustomers() {
	        kafkaProducerService.fetchAndSendAllCustomers();
	        System.out.println("All customers fetched from DB and sent to Kafka");
	        return "All customers fetched from DB and sent to Kafka!";
	    }
	  
	  @PostMapping("/addCustomer")
	    public ResponseEntity<String> addCustomer(@RequestBody Customer customer) {
	        kafkaProducerService.saveCustomer(customer);
	        kafkaProducerService.sendCustomer(customer);
	        
	        return new ResponseEntity<>("Customer added successfully", HttpStatus.CREATED);
	    }
}

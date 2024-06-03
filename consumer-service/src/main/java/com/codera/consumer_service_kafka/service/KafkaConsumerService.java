package com.codera.consumer_service_kafka.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.codera.producer_service_kafka.model.Customer;

@Service
public class KafkaConsumerService {
	
	public KafkaConsumerService(){
		System.out.println("consuming the data");
		
	}

    @KafkaListener(topics = "codera-nasiruddin", groupId = "group-customer")
    public void consume(Customer customer) {
    	
        System.out.println("Consumed customer: " + customer);
    }
}

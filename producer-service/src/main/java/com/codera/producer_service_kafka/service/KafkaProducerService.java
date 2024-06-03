package com.codera.producer_service_kafka.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.codera.producer_service_kafka.model.Customer;
import com.codera.producer_service_kafka.repository.CustomerRepository;

@Service
public class KafkaProducerService {

    private static final String TOPIC = "codera-nasiruddin";

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    @Autowired
    private CustomerRepository customerRepository;

    public void sendCustomer(Customer customer) {
        LocalDate date = customer.getDate();
        String partition = calculatePartitionFromDate(date);
        kafkaTemplate.send(TOPIC, partition, customer);
//      TOPIC, customer);
        
        
    }

    private String calculatePartitionFromDate(LocalDate date) {
        return String.valueOf(date.getDayOfYear() % 3); 
    }

    
    public void fetchAndSendAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        customers.forEach(this::sendCustomer);
    }
    public void saveCustomer(Customer customer) {
        customerRepository.save(customer);
    }
}
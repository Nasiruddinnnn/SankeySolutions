package com.codera.producer_service_kafka.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codera.producer_service_kafka.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    // Custom query methods (if any) can be defined here
}

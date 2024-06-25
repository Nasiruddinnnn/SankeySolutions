package in.ineuron.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;

public class Customer implements Serializable {

    @JsonProperty("customerId")
    private Integer customerId;

    @JsonProperty("customerName")
    private String customerName;

    @JsonProperty("customerEmail")
    private String customerEmail;

    // Default constructor
    public Customer() {}

    // Constructor with parameters
    public Customer(Integer customerId, String customerName, String customerEmail) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }

    // Getters and setters
    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", customerName=" + customerName + ", customerEmail="
				+ customerEmail + "]";
	}
    
    
}

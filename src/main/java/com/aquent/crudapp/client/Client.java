package com.aquent.crudapp.client;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.aquent.crudapp.person.Person;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Client {

  @Id
  @GeneratedValue
  // @GeneratedValue(strategy = GenerationType.UUID)
  private Integer clientId;

  @NotNull
  @Size(min = 1, max = 50, message = "Company Name is required with maximum length of 50")
  private String name;

  @NotNull
  @Size(min = 1, max = 50, message = "Website URI is required with maximum length of 50")
  private String websiteURI;

  @NotNull
  @Size(min = 1, max = 50, message = "Phone Number is required with maximum length of 50")
  private String phoneNumber;
  // Make this another class/struct?
  // private String mailingAddress;
  @NotNull
  @Size(min = 1, max = 50, message = "Street address is required with maximum length of 50")
  private String streetAddress;

  @NotNull
  @Size(min = 1, max = 50, message = "City is required with maximum length of 50")
  private String city;

  @NotNull
  @Size(min = 2, max = 2, message = "State is required with length 2")
  private String state;

  @NotNull
  @Size(min = 5, max = 5, message = "Zip code is required with length 5")
  private String zipCode;

  private List <Person> contacts;  

}

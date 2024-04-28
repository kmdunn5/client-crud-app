package com.aquent.crudapp.client;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

import com.aquent.crudapp.person.Person;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Client implements Serializable{

  @Id
  @Column(nullable = false)
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID clientId;

  @Column(nullable = false, length = 50)
  private String name;
  
  @Column(nullable = false, length = 50)
  private String websiteUri;

  @Column(nullable = false, length = 50)
  private String phoneNumber;
  // Make this another class/struct?
  // private String mailingAddress;
  @Column(nullable = false, length = 50)
  private String streetAddress;
  
  @Column(nullable = false, length = 50)
  private String city;
  
  @Column(nullable = false , length = 2)
  private String state;
  
  @Column(nullable = false, length = 5)
  private String zipCode;

  @OneToMany(mappedBy = "client")
  private Set<Person> contacts;

}

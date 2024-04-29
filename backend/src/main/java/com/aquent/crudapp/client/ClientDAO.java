package com.aquent.crudapp.client;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.aquent.crudapp.person.PersonDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="clients")
@AllArgsConstructor
@NoArgsConstructor
public class ClientDAO implements Serializable{

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

  @Column(nullable = false, length = 2)
  private String state;

  @Column(nullable = false, length = 5)
  private String zipCode;

  @OneToMany
  @JoinColumn(name = "client_id")
  private List<PersonDAO> contacts;

  public ClientDTO toDTO() {
        return this.toDTO(false);
    }

  public ClientDTO toDTO(boolean transformPerson) {
        return new ClientDTO(this.clientId, this.name, this.websiteUri, this.phoneNumber, this.streetAddress, this.city, this.state, this.zipCode, this.contacts == null || !transformPerson? Collections.emptyList() : this.contacts.stream().map(PersonDAO::toDTO).collect(Collectors.toList()));
    }

}

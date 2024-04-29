package com.aquent.crudapp.client;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.aquent.crudapp.person.PersonDTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO implements Serializable{

  private UUID clientId;

  @NotNull
  @Size(min = 1, max = 50, message = "Street address is required with maximum length of 50")
  private String name;
  
  @NotNull
  @Size(min = 1, max = 50, message = "Street address is required with maximum length of 50")
  private String websiteUri;

  @NotNull
  @Size(min = 1, max = 50, message = "Street address is required with maximum length of 50")
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

  private List<PersonDTO> contacts;

  public ClientDAO toDAO() {
    return this.toDAO(false);
}

  public ClientDAO toDAO(boolean transformPerson) {
    return new ClientDAO(this.clientId, this.name, this.websiteUri, this.phoneNumber, this.streetAddress, this.city, this.state, this.zipCode, this.contacts == null || !transformPerson? Collections.emptyList() : this.contacts.stream().map(PersonDTO::toDAO).collect(Collectors.toList()));
  }

}

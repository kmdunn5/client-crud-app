package com.aquent.crudapp.person;

import java.io.Serializable;
import java.util.UUID;

import com.aquent.crudapp.client.ClientDTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The person entity corresponding to the "person" table in the database.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO implements Serializable {

    private UUID personId;

    @NotNull
    @Size(min = 1, max = 50, message = "First name is required with maximum length of 50")
    private String firstName;

    @NotNull
    @Size(min = 1, max = 50, message = "Last name is required with maximum length of 50")
    private String lastName;

    @NotNull
    @Size(min = 1, max = 50, message = "Email address is required with maximum length of 50")
    private String emailAddress;

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

    // queries load the relationship in JDBC
    private ClientDTO client;

    public PersonDAO toDAO() {
        return this.toDAO(false);
    }

    public PersonDAO toDAO(boolean transformClient) {
        return new PersonDAO(this.personId, this.firstName, this.lastName, this.emailAddress, this.streetAddress, this.city, this.state, this.zipCode, this.client == null || !transformClient ? null : this.client.toDAO());
    }
}

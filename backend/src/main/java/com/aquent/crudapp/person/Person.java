package com.aquent.crudapp.person;

import java.io.Serializable;
import java.util.UUID;

// import javax.validation.constraints.NotNull;
// import javax.validation.constraints.Size;

import com.aquent.crudapp.client.Client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * The person entity corresponding to the "person" table in the database.
 */
@Entity
@Table(name="persons")
@Data
public class Person implements Serializable {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID personId; //why?

    @Column(nullable = false, length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "First name is required with maximum length of 50")
    private String firstName;

    @Column(nullable = false, length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "Last name is required with maximum length of 50")
    private String lastName;

    @Column(nullable = false, length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "Email address is required with maximum length of 50")
    private String emailAddress;

    @Column(nullable = false, length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "Street address is required with maximum length of 50")
    private String streetAddress;

    @Column(nullable = false, length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "City is required with maximum length of 50")
    private String city;

    @Column(nullable = false, length = 2)
    @NotNull
    @Size(min = 2, max = 2, message = "State is required with length 2")
    private String state;

    @Column(nullable = false, length = 5)
    @NotNull
    @Size(min = 5, max = 5, message = "Zip code is required with length 5")
    private String zipCode;

    // queries load the relationship in JDBC
    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;
}

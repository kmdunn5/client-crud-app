package com.aquent.crudapp.person;

import java.util.UUID;

import com.aquent.crudapp.client.ClientDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * The person entity corresponding to the "person" table in the database.
 */
@Entity
@Table(name="persons")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDAO{

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID personId; //why?

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 50)
    private String emailAddress;

    @Column(nullable = false, length = 50)
    private String streetAddress;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false, length = 2)
    private String state;

    @Column(nullable = false, length = 5)
    private String zipCode;

    // queries load the relationship in JDBC
    @ManyToOne
    @JoinColumn(name="client_id")
    private ClientDAO client;

    public PersonDTO toDTO() {
        return this.toDTO(false);
    }

    public PersonDTO toDTO(boolean transformClient) {
        return new PersonDTO(this.personId, this.firstName, this.lastName, this.emailAddress, this.streetAddress, this.city, this.state, this.zipCode, this.client == null || !transformClient ? null : this.client.toDTO());
    }
}

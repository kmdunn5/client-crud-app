package com.aquent.crudapp.person;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

/**
 * Person operations.
 */
@Service
public interface PersonService {

    /**
     * Retrieves all of the person records.
     *
     * @return list of person records
     */
    List<PersonDAO> listPeople();

    /**
     * Creates a new person record.
     *
     * @param person the values to save
     * @return the new person ID
     */
    PersonDAO createPerson(PersonDAO person);

    /**
     * Retrieves a person record by ID.
     *
     * @param id the person ID
     * @return the person record
     */
    PersonDAO readPerson(UUID id);

    /**
     * Updates an existing person record.
     *
     * @param person the new values to save
     */
    PersonDAO updatePerson(PersonDAO person);

    /**
     * Deletes a person record by ID.
     *
     * @param id the person ID
     */
    void deletePerson(UUID id);
}

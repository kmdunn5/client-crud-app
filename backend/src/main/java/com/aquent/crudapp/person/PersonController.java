package com.aquent.crudapp.person;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Controller for handling basic person management operations.
 */
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("person")
public class PersonController {

    private static final Logger logger = LoggerFactory.getLogger(PersonController.class);

    private final PersonService personService;
    private final ObjectMapper mapper;

    public PersonController(PersonService personService, ObjectMapper mapper) {
        this.personService = personService;
        this.mapper = mapper;
    }

    /**
     * Renders the listing page.
     *
     * @return list view populated with the current list of people
     */
    @GetMapping(value = "list")
    public ResponseEntity<List<PersonDTO>> findAll() {
        List<PersonDTO> persons = personService.listPeople().stream().map(PersonDAO::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok().body(persons);
    }

    /**
     * Renders the read page.
     *
     * @param personId the ID of the person to show
     * @return show view populated from the person record
     */
    @GetMapping(value = "{personId}")
    public ResponseEntity<PersonDTO> read(@PathVariable("personId") UUID personId) {
        PersonDTO person = personService.readPerson(personId).toDTO(true);
        return ResponseEntity.ok().body(person);
    }

    /**
     * Validates and saves a new person.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param person populated form bean for the person
     * @return redirect, or create view with errors
     */
    
    @PostMapping
    public ResponseEntity<PersonDTO> create(@Valid @RequestBody PersonDTO person) {
        PersonDAO createdPerson = personService.createPerson(person.toDAO(true));
        return ResponseEntity.created(URI.create("person/" + createdPerson.getPersonId())).body(createdPerson.toDTO(true));
    }

    /**
     * Validates and saves an edited person.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param person populated form bean for the person
     * @return redirect, or edit view with errors
     * @throws JsonProcessingException 
     */
    @PutMapping(value = "{personId}")
    public ResponseEntity<PersonDTO> edit(@Valid @RequestBody() PersonDTO person) throws JsonProcessingException {
        logger.info("person: ", mapper.writeValueAsString(person));
        return ResponseEntity.ok().body(personService.updatePerson(person.toDAO(true)).toDTO(true));
    }

    /**
     * Handles person deletion or cancellation, redirecting to the listing page in either case.
     *
     * @param personId the ID of the person to be deleted
     * @return redirect to the listing page
     */
    @DeleteMapping(value = "{personId}")
    public ResponseEntity<Void> delete(@PathVariable("personId") UUID personId) {
        personService.deletePerson(personId);
        return ResponseEntity.noContent().build();
    }
}

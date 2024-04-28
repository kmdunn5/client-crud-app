package com.aquent.crudapp.person;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling basic person management operations.
 */
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    /**
     * Renders the listing page.
     *
     * @return list view populated with the current list of people
     */
    @GetMapping(value = "list")
    public ResponseEntity<List<Person>> findAll() {
        List<Person> persons = personService.listPeople();
        return ResponseEntity.ok().body(persons);
    }

    /**
     * Renders the read page.
     *
     * @param personId the ID of the person to show
     * @return show view populated from the person record
     */
    @GetMapping(value = "read/{personId}")
    public ResponseEntity<Person> read(@PathVariable UUID personId) {
        Person person = personService.readPerson(personId);
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
    
    @PostMapping(value = "create")
    public ResponseEntity<Person> create(@Valid @RequestBody Person person) {
        Person createdPerson = personService.createPerson(person);
        return ResponseEntity.created(URI.create("person/" + createdPerson.getPersonId())).body(createdPerson);
    }

    /**
     * Validates and saves an edited person.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param person populated form bean for the person
     * @return redirect, or edit view with errors
     */
    @PostMapping(value = "edit")
    public ResponseEntity<Person> edit(Person person) {
        return ResponseEntity.ok().body(personService.updatePerson(person));
    }

    /**
     * Handles person deletion or cancellation, redirecting to the listing page in either case.
     *
     * @param personId the ID of the person to be deleted
     * @return redirect to the listing page
     */
    @PostMapping(value = "delete")
    public ResponseEntity<Void> delete(@RequestParam UUID personId) {
        personService.deletePerson(personId);
        return ResponseEntity.noContent().build();
    }
}

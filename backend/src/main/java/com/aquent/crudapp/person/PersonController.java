package com.aquent.crudapp.person;

import java.util.ArrayList;
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
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller for handling basic person management operations.
 */
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("person")
public class PersonController {

    public static final String COMMAND_DELETE = "Delete";

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
    // @GetMapping(value = "list")
    // public ModelAndView list() {
    //     ModelAndView mav = new ModelAndView("person/list");
    //     mav.addObject("persons", personService.listPeople());
    //     return mav;
    // }

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
     * Renders an empty form used to create a new person record.
     *
     * @return create view populated with an empty person
     */
    @GetMapping(value = "create")
    public ModelAndView create() {
        ModelAndView mav = new ModelAndView("person/create");
        mav.addObject("person", new Person());
        mav.addObject("errors", new ArrayList<String>());
        return mav;
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
        return ResponseEntity.ok().body(personService.createPerson(person));
    }
    // TODO: fix from here down
    /**
     * Renders an edit form for an existing person record.
     *
     * @param personId the ID of the person to edit
     * @return edit view populated from the person record
     */
    @GetMapping(value = "edit/{personId}")
    public ModelAndView edit(@PathVariable UUID personId) {
        ModelAndView mav = new ModelAndView("person/edit");
        mav.addObject("person", personService.readPerson(personId));
        mav.addObject("errors", new ArrayList<String>());
        return mav;
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
    public ModelAndView edit(Person person) {
        personService.updatePerson(person);
        return new ModelAndView("redirect:/person/list");
    }

    /**
     * Renders the deletion confirmation page.
     *
     * @param personId the ID of the person to be deleted
     * @return delete view populated from the person record
     */
    @GetMapping(value = "delete/{personId}")
    public ModelAndView delete(@PathVariable("personId") String personId) {
        ModelAndView mav = new ModelAndView("person/delete");
        mav.addObject("person", personService.readPerson(UUID.fromString(personId)));
        return mav;
    }

    /**
     * Handles person deletion or cancellation, redirecting to the listing page in either case.
     *
     * @param command the command field from the form
     * @param personId the ID of the person to be deleted
     * @return redirect to the listing page
     */
    @PostMapping(value = "delete")
    public String delete(@RequestParam String command, @RequestParam UUID personId) {
        if (COMMAND_DELETE.equals(command)) {
            personService.deletePerson(personId);
        }
        return "redirect:/person/list";
    }
}

package com.aquent.crudapp.person;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Default implementation of {@link PersonService}.
 */
@Component
public class DefaultPersonService implements PersonService {

    private final PersonRepository personRepository;

    public DefaultPersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Person> listPeople() {
        return personRepository.findAll(Sort.by("firstName", "lastName", "personId"));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Person readPerson(UUID id) {
        return personRepository.getReferenceById(id);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Person createPerson(Person person) {
        return personRepository.save(person);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Person updatePerson(Person person) {
        return personRepository.save(person);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void deletePerson(UUID id) {
        personRepository.deleteById(id);
    }
}

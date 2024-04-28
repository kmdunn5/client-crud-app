package com.aquent.crudapp.person;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class DefaultPersonValidator implements Validator  {

  @Override
  public boolean supports(Class<?> clazz) {
    return Person.class.equals(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    Person person = (Person) target;
    if (person.getState().length() != 2) {
      errors.rejectValue("state", "Must be 2 characters");
    }
    if (person.getZipCode().length() != 5) {
      errors.rejectValue("zipCode", "Must be 5 characters");
    }
  }
}

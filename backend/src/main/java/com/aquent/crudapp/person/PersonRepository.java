package com.aquent.crudapp.person;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<PersonDAO, UUID> {  
} 
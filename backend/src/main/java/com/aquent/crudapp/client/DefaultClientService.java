package com.aquent.crudapp.client;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Default implementation of {@link ClientService}.
 */
@Component
public class DefaultClientService implements ClientService {

    private final ClientRepository clientRepository;
    // private final Validator validator;

    public DefaultClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Client> listClients() {
        return clientRepository.findAll(Sort.by("name", "clientId"));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Client readClient(UUID id) {
        return clientRepository.getReferenceById(id);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void deleteClient(UUID id) {
        clientRepository.deleteById(id);
    }

    // @Override
    // public List<String> validateClient(Client client) {
    //     Set<ConstraintViolation<Client>> violations = validator.validate(client);
    //     List<String> errors = new ArrayList<String>(violations.size());
    //     for (ConstraintViolation<Client> violation : violations) {
    //         errors.add(violation.getMessage());
    //     }
    //     Collections.sort(errors);
    //     return errors;
    // }
}

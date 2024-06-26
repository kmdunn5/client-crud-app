package com.aquent.crudapp.client;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

/**
 * Client operations.
 */
@Service
public interface ClientService {

    /**
     * Retrieves all of the client records.
     *
     * @return list of client records
     */
    List<ClientDAO> listClients();

    /**
     * Creates a new client record.
     *
     * @param client the values to save
     * @return the new client ID
     */
    ClientDAO createClient(ClientDAO client);

    /**
     * Retrieves a client record by ID.
     *
     * @param id the client ID
     * @return the client record
     */
    ClientDAO readClient(UUID id);

    /**
     * Updates an existing client record.
     *
     * @param client the new values to save
     */
    ClientDAO updateClient(ClientDAO client);

    /**
     * Deletes a client record by ID.
     *
     * @param id the client ID
     */
    void deleteClient(UUID id);
}

package com.aquent.crudapp.client;

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
 * Controller for handling basic client management operations.
 */
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * Renders the listing page.
     *
     * @return the current list of clients
     */
    @GetMapping(value = "list")
    public ResponseEntity<List<Client>> findAll() {
        List<Client> clients = clientService.listClients();
        return ResponseEntity.ok().body(clients);
    }

    /**
     * Renders the read page.
     *
     * @param clientId the ID of the client to show
     * @return the client record
     */
    @GetMapping(value = "read/{clientId}")
    public ResponseEntity<Client> read(@PathVariable UUID clientId) {
        Client client = clientService.readClient(clientId);
        return ResponseEntity.ok().body(client);
    }

    /**
     * Validates and saves a new client.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param client populated form bean for the client
     * @return response entity with a client record
     */
    
    @PostMapping(value = "create")
    public ResponseEntity<Client> create(@Valid @RequestBody Client client) {
        Client createdClient = clientService.createClient(client);
        return ResponseEntity.created(URI.create("client/" + createdClient.getClientId())).body(createdClient);
    }

    /**
     * Validates and saves an edited client.
     * On success, the user is redirected to the listing page.
     * On failure, the form is redisplayed with the validation errors.
     *
     * @param client populated form bean for the client
     * @return redirect, or edit view with errors
     */
    @PostMapping(value = "edit")
    public ResponseEntity<Client> edit(Client client) {
        return ResponseEntity.ok().body(clientService.updateClient(client));
    }

    /**
     * Handles client deletion or cancellation, redirecting to the listing page in either case.
     *
     * @param clientId the ID of the client to be deleted
     * @return redirect to the listing page
     */
    @PostMapping(value = "delete")
    public ResponseEntity<Void> delete(@RequestParam UUID clientId) {
        clientService.deleteClient(clientId);
        return ResponseEntity.noContent().build();
    }
}

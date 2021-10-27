const axios = require('axios');

const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    },
};

class pleskAPI{

    /**
     * 
     * @param {String} username Useraccount with API access 
     * @param {String} password Password to the account 
     * @param {String} host The host: I.e https://mydomain.se:8443
     */
    constructor(username, password, host){
        this.host = host+"/api/v2";
        this.username = username;
        this.password = password;
    }

    /** Gets the provided endpoint */ 
    async #get(endpoint, params = undefined){
        const result = await axios({
            method: "GET",
            url: this.host+endpoint,
            auth: {
                username: this.username,
                password: this.password
            },
            params: params,
            config,
        });
        return result.data;
    }

    /** Posts payload data to the given endpoint */
    async #post(endpoint, payload){
        const result = await axios({
            method: "POST",
            url: this.host+endpoint,
            auth: {
                username: this.username,
                password: this.password
            },
            data: payload,
            config,
        });
        return result.data;
    }

    /** Sends a delete request */
    async #delete(endpoint){
        const result = await axios({
            method: "DELETE",
            url: this.host+endpoint,
            auth: {
                username: this.username,
                password: this.password
            },
            config,
        });
        return result.data;
    }

    /** Sends a put request to the provided endpoint with the payload. Payload can be undefined */
    async #put(endpoint, payload){
        const result = await axios({
            method: "PUT",
            url: this.host+endpoint,
            auth: {
                username: this.username,
                password: this.password
            },
            body: payload,
            config,
        });
        return result.data;
    }



    /* ##############
    #  CLI section  #
    #################*/

    /** Returns a list of avalible commands. */
    async getCommands(){
        return await this.#get('/cli/commands');
    }

    /** Returns commands reference */
    async getCommandByRef(id){
        return await this.#get(`/cli/${id}/ref`);
    }

    /** Executes the given commands (ID) and passes the payload as data parameter. */
    async commandExecute(id, payload){
        return await this.#post(`/cli/${id}/call`, payload);
    }

    /* ##############
    #  SERVER section  #
    #################*/

    /** Returns information about the server */
    async getServerInfo(){
        return await this.#get('/server');
    }

    /** Returns the ip adresses of the server */
    async getServerIps(){
        return await this.#get('/server/ips');
    }

    /* ##############
    #  EXTENSIONS section  #
    #################*/

    /** Gets a list of installed extensions */
    async getExtensions(){
        return await this.#get(`/extensions`);
    }

    /** Gets information about a specific extension */
    async getExtensionById(id){
        return await this.#get(`/extensions/${id}`);
    }

    /** Installs an extension to the server. */
    async installExtension(payload){
        return await this.#post(`/extensions`, payload);
    }

    /** Gets information about a specific extension */
    async deleteExtension(id){
        return await this.#delete(`/extensions/${id}`);
    }

    /** Enables a specific extension */
    async enableExtension(id){
        return await this.#put(`/extensions/${id}/enable`, undefined);
    }

    /** disables a specific extension */
    async disableExtension(id){
        return await this.#put(`/extensions/${id}/disable`, undefined);
    }


    /* ##############
    #  CLIENTS section  #
    #################*/

    /** Returns a list of clients and information about them */
    async getClients(){
        return await this.#get(`/clients`);
    }

    /** Creates a new client */
    async createClient(payload){
        return await this.#post(`/clients`, payload);
    }

    /** Gets information about a specific client */
    async getClientById(id){
        return await this.#get(`/clients/${id}`);
    }

    /** Updates a specific client */
    async updateClient(id, payload){
        return await this.#put(`/clients/${id}`, payload);
    }

    /** Deletes a client */
    async deleteClient(id){
        return await this.#delete(`/clients/${id}`);
    }

    /** Gets domains that belongs to a specific client */
    async getClientDomains(id){
        return await this.#get(`/clients/${id}/domains`);
    }

    /** Gets statistics about a specific client */
    async getClientStatistics(id){
        return await this.#get(`/clients/${id}/domains`);
    }

    /** Activates a client */
    async updateClient(id){
        return await this.#put(`/clients/${id}/activate`, undefined);
    }

    /** Suspends a client */
    async suspendClient(id){
        return await this.#put(`/clients/${id}/suspend`, undefined);
    }


    /* ##############
    #  DOMAINS section  #
    #################*/

    /**
     * 
     * @returns All domains
     */
    async getDomains(){
        return await this.#get(`/domains`);
    }

    /** Searches for a specific  */
    async getDomainByName(domainName){
        return await this.#get(`/domains`, {
            name: domainName
        });
    }

    /** Lists a specific domain */
    async getDomainById(id){
        return await this.#get(`/domains/${id}`);
    }

    /** Lists a specific domain */
    async createDomain(payload){
        return await this.#post(`/domains`, payload);
    }

    /** Updates a domain */
    async updateDomain(id, payload){
        return await this.#put(`/domains/${id}`, payload);
    }

    /** Deletes a domain */
    async deleteDomain(id){
        return await this.#delete(`/domains/${id}`);
    }

    /** Gets the client of a domain */
    async getDomainClient(domain_id){
        return await this.#get(`/domains/${domain_id}/client`);
    }

    /** Gets domain status */
    async getDomainStatus(domain_id){
        return await this.#get(`/domains/${domain_id}/status`);
    }

    /** Update domain status */
    async updateDomainStatus(domain_id, payload){
        return await this.#put(`/domains/${domain_id}/status`, payload);
    }

    /* ##############
    #  FTP section  #
    #################*/

    /** Gets FTP users */
    async getFtpUsers(){
        return await this.#get(`/ftpusers`);
    }

    /** Gets FTP users by domain */
    async GetFtpUsersByDomain(domain){
        return await this.#get(`/ftpusers`, {
            domain: domain
        });
    }

    /** Gets FTP users by domain and name */
    async GetFtpUsersByDomain(domain, name){
        return await this.#get(`/ftpusers`, {
            domain: domain,
            name: name
        });
    }

    /** Create FTP user */
    async createFtpUser(payload){
        return await this.#post(`/ftpusers`, payload);
    }

    /** Update fpt user */
    async updateFtpUser(name, payload){
        return await this.#put(`/ftpusers/${name}`, payload);
    }

    /** Deletes a FTP user */
    async deleteFtpUser(name){
        return await this.#delete(`/ftpusers/${name}`);
    }


    /* ##############
    #  DATABASE section #
    #################*/

    /** Return all databases */
    async getDatabases(){
        return await this.#get(`/databases`);
    }

    /** Return all databases by domain */
    async getDatabasesByDomain(domain){
        return await this.#get(`/databases`, {
            domain: domain
        });
    }

    /** Creates a new database with passed arguemnts. */
    async createDatabase(payload){
        return await this.#post(`/databases`, payload);
    }

    /** Deletes a database */
    async deleteDatabase(id){
        return await this.#delete(`/databases/${id}`);
    }

    /** Returns user of a database */
    async getDbusers(){
        return await this.#get(`/dbusers`);
    }

    /** Returns user of a database */
    async getDbusersById(database_id){
        return await this.#get(`/dbusers`, {
            dbId: database_id
        });
    }

    /** Create database user */
    async createDatabaseUser(payload){
        return await this.#post(`/dbusers`, payload);
    }

    /** Update database user */
    async updateDatabaseUser(id, payload){
        return await this.#put(`/dbusers/${id}`, payload);
    }

    /** Deletes a database user */
    async deleteDatabaseUser(id){
        return await this.#delete(`/dbusers/${id}`);
    }

    /** Gerts a list of database servers */
    async getDatabaseServers(){
        return await this.#get(`/dbservers`);
    }

    /** Gerts a list of database servers. Filter by server id. */
    async getDatabaseServersById(id){
        return await this.#get(`/dbservers`, {
            id: id
        });
    }
}
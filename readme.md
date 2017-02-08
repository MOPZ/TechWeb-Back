#Binome
Paul Maupas
Benoît TRAN

#Initialize database
* Install postgresql
* Set the command line in the project's /dump folder : `cd myProjectPath/dump`
* Connect to admin user and launch following commands : `psql -U postgres`
    ```
    CREATE USER efrei WITH PASSWORD 'password';
    CREATE SCHEMA efrei;
    CREATE DATABASE efrei;
    GRANT ALL PRIVILEGES ON DATABASE efrei TO efrei;
    ```

* Connect to efrei user : 
    ```
    psql -U efrei
    password
    ```

* Execute following commands to load the database :
    ```
    \i schema.sql;
    \i test-data.sql;
    ```

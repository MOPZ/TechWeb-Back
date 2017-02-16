#Binome
Paul Maupas
Benoît TRAN

#Initialize database
* Install postgresql
* Set the command line in the project's /dump folder : `cd myProjectPath/dump`
* Launch the following commands :
 ```
 psql -U postgres < schema.sql
 psql -U postgres efrei < test-data.sql
 ```

#Initialize project
* Install nodeJS
* Launch the command:

```
npm install
```

#Launch project
```
npm start
```
You might also use `nodemon start` if you installed nodemon
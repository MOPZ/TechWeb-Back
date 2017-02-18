#Binome
Paul Maupas
Benoît TRAN

#Initialize database
* Install postgresql
* Set the command line in the project's /dumps folder : `cd myProjectPath/dumps`
* Launch the following commands :
 
 ```
 psql -U postgres < schema.sql
 psql -U postgres efrei < data-tests.sql
 ```

#Initialize project
* Install nodeJS
* Go to root project : `cd myProjectPath`
* Launch the command:

```
npm install
```

#Launch project
```
npm start
```
You might also use `nodemon start` if you installed nodemon

#Launch tests
* Go to root project : `cd myProjectPath`
* Install avaJS : `npm install -g ava`
* Initialize it : `ava --init`
* Install supertest : `npm install -s supertest`
* Launch tests by doing the command : `ava --serial --verbose tests/`
   <span style="background-color: #FFFF00">Make sure the tests are in the folder </span>`myProjectPath/tests`
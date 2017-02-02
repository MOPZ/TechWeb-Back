INSERT INTO alliances (id, name) VALUES (1, 'Les gentils');
INSERT INTO alliances (id, name) VALUES (2, 'Les méchants');
INSERT INTO alliances (id, name) VALUES (3, 'Les Suisses');

INSERT INTO users (id, name, email, alliance_id) VALUES (1, 'Pierrick', 'pierrick@test.com', 1);
INSERT INTO users (id, name, email, alliance_id) VALUES (2, 'Ronan', 'ronan@test.com', 1);
INSERT INTO users (id, name, email, alliance_id) VALUES (3, 'Godefroy', 'godefroy@test.com', 1);
INSERT INTO users (id, name, email, alliance_id) VALUES (4, 'Bill', 'bill@test.com', 3);
INSERT INTO users (id, name, email, alliance_id) VALUES (5, 'Notch', 'notch@test.com', 2);
INSERT INTO users (id, name, email, alliance_id) VALUES (6, 'Fish', 'fish@test.com', 2);
INSERT INTO users (id, name, email, alliance_id) VALUES (7, 'Meyer', 'meyer@test.com', 2);
INSERT INTO users (id, name, email, alliance_id) VALUES (8, 'Kojima', 'kojima@test.com', 3);

INSERT INTO characters (name, user_id, class, position) VALUES ('Krom', 1, 'warrior', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Gandalf', 1, 'mage', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Gedeon', 2, 'thief', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Gimli', 2, 'warrior', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Pippin', 2, 'thief', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Merry', 3, 'thief', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Aragorn', 4, 'warrior', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Boromir', 4, 'warrior', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Saroumane', 5, 'mage', '(0,0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Golum', 6, 'thief', '(0, 0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Legolas', 7, 'thief', '(0, 0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Sam', 7, 'thief', '(0, 0)');
INSERT INTO characters (name, user_id, class, position) VALUES ('Faramir', 8, 'warrior', '(0, 0)');
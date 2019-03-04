DROP TABLE users;
DROP TABLE groups;
CREATE TABLE IF NOT EXISTS groups ( id INT NOT NULL, name VARCHAR(45) NULL, PRIMARY KEY (id) );
CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL, role VARCHAR(45) NULL, name VARCHAR(45) NULL, PRIMARY KEY (id) );


INSERT INTO users (id, role, name) VALUES (1, 'parent', 'michaelost');
INSERT INTO users (id, role, name) VALUES (2, 'parent', 'mimimi');
INSERT INTO users (id, role, name) VALUES (3, 'parent', 'Chidi');
INSERT INTO users (id, role, name) VALUES (4, 'parent', 'Jahani');




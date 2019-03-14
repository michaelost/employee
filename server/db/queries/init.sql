DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;

CREATE SEQUENCE users_id_seq;
CREATE SEQUENCE groups_id_seq;

CREATE TABLE IF NOT EXISTS users (
  id integer NOT NULL DEFAULT nextval('users_id_seq'),
  role VARCHAR(45) NULL, name VARCHAR(45) NULL, PRIMARY KEY (id) );

ALTER SEQUENCE users_id_seq 
OWNED BY users.id;

CREATE TABLE IF NOT EXISTS groups (
  id integer NOT NULL DEFAULT nextval('groups_id_seq'),
  name VARCHAR(45) NULL, PRIMARY KEY (id)
);

ALTER SEQUENCE groups_id_seq 
OWNED BY groups.id;



INSERT INTO users (role, name) VALUES ('parent', 'michaelost');
INSERT INTO users (role, name) VALUES ('parent', 'mimimi');
INSERT INTO users (role, name) VALUES ('parent', 'Chidi');
INSERT INTO users (role, name) VALUES ('parent', 'Jahani');

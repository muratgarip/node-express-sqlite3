--CREATE TABLE gebruikers(
--id INTEGER PRIMARY KEY,
--naam TEXT NOT NULL,
--gebruikersnaam TEXT NOT NULL UNIQUE,
--email TEXT,
--leeftijd INTEGER,
--aangemaakt_op DATETIME DEFAULT CURRENT_TIMESTAMP
--);

--ALTER TABLE gebruikers ADD COLUMN status TEXT;

--INSERT INTO gebruikers(naam, gebruikersnaam)
--VALUES ('Piet De Piraat', 'pietdp789');

--Select * FROM gebruikers;

--INSERT INTO gebruikers(naam, gebruikersnaam)
--VALUES ('Jan Smets', 'js987'), ('An klaes','ak456'),('Dieter Bijnenes','db258');

--Select * FROM gebruikers
--WHERE gebruikersnaam='ak456';

--Select * FROM gebruikers
--LIMIT 3;

--UPDATE gebruikers SET email='mijnemail@gmail.com' WHERE id=1;
--Select * FROM gebruikers;

--DELETE FROM gebruikers WHERE id=2;
--Select * FROM gebruikers;

--CREATE TABLE chat(
--  id INT PRIMARY KEY,
--  gebruiker_id INTEGER REFERENCES bebruikers(id),  --foreign key
--  titel TEXT NOT NULL,
--  chatinfo TEXT NOT NULL
--);

--INSERT INTO chat (gebruiker_id, titel, chatinfo)
--VALUES(4, 'Afspraak voor deze weekend','We gaan deze weekend met de koersfiets 120km fietsen. We spreken af aan de brug over de albertkanaal in Lennik');

--.headers on
--SELECT * FROM chat;

--CREATE VIEW chat_info AS
--  SELECT c.chatinfo, g.gebruikersnaam, g.naam FROM chat c
--  JOIN gebruikers g ON c.gebruiker_id= g.id;
--
--SELECT * FROM chat_info;

--INSERT INTO chat (gebruiker_id, titel, chatinfo)
--VALUES(1, 'Afspraak voor volgende donderdag','We gaan 15km lopen, afspraak aan de draaibrug van de molenvijver in GENK');

SELECT * FROM chat_info;
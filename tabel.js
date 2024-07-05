// importeren van sqlite3 module. 
// door de method verbose() op te roepen, activeren we de uitgebreide logging voor de 'sqlite3' module
const sqlite= require('sqlite3').verbose();
//we declareren een variabele met een instance van sqlite database, eerder gedeclareerd.
//we maken een bestand aan data.db, deze geven we mee in de eerste parameter.
//we geven de modes aan hoe dat we database gaan gebruiken open read write.
//als laatste parameter geven we een callback function mee dat in geval van een err deze in de console weergeeft.
const db = new sqlite.Database('./data.db',sqlite.OPEN_READWRITE,(err)=>{
  if (err) return console.error(err);
});
//
//We maken nu een sql comando aan om een tabel te creeren
//
const sql= 'CREATE TABLE data(ID INTEGER PRIMARY KEY, film, evaluatie, karakter)';
//
//vervolgens runnen we deze in de terminal
//node ./tabel.js
//node ./tabel.js
// de tweede keer krijgen we een error omdat de tabel al gemaakt is
db.run(sql);
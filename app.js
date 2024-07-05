//
//Express is een webframework voor Node.js waarmee je gemakkelijk webapplicaties en API's kunt bouwen.
//
const express = require ('express');
//
//Om Cross-Origin Resource Sharing (CORS) toe te laten installeren we in de terminal Cors met npm install cors
//
const cors = require('cors'); // importeer de cors module
//
//Body-Parser is middleware die je helpt om de body van inkomende HTTP-requests te ontleden, hoewel de meeste van deze functionaliteit nu direct in Express beschikbaar is.
//
const bodyParser = require ('body-parser');
const { request, response } = require('express');
//
//we declareren een variabele en we stellen ze gelijk aan een functie als waarde.
//
const app = express();
port=10000;//3000
app.use(cors()); // we gebruiken de cors middelware in onze Express server.
//
let sql;//deel2
const url = require("url");//deel3

// importeren van sqlite3 module. 
// door de method verbose() op te roepen, activeren we de uitgebreide logging voor de 'sqlite3' module
const sqlite = require('sqlite3').verbose();
//we declareren een variabele met een instance van sqlite database, eerder gedeclareerd.
//we maken een bestand aan data.db, deze geven we mee in de eerste parameter.
//we geven de modes aan hoe dat we database gaan gebruiken open read write.
//als laatste parameter geven we een callback function mee dat in geval van een err deze in de console weergeeft.
const db = new sqlite.Database('./data.db',sqlite.OPEN_READWRITE,(err)=>{
  if (err) return console.error(err);
});

app.use(bodyParser.json());

//post request
app.post("/data",(request,response) => {
  try{
      //deel2
      const {film, evaluatie, karakter} = request.body;//destructering van de body naar drie variabelen
      sql="INSERT INTO data(film, evaluatie, karakter) VALUES (?,?,?)";
      db.run(sql, [film, evaluatie, karakter], (err)=>{
        if (err) return response.json({status: 300, success:false, error:err});

        console.log("successful input ", film, evaluatie, karakter);
      });
      //deel1 console.log(request.body.film); // in de console zien we wat we van postman krijgen, wanneer we .film weglaten krijgen we alle velden te zien in de console.
      return response.json({
        status:200,  //OK, dit is wat we als antwoord sturen naar postman. Er waren geen fouten (errors)
        success:true
      });
  }catch(error){
    return response.json({
      status:400,   //Bad Request, dit sturen we terug wanneer we een error of een fout hebben.
      success:false
    });
    console.log(error);
  }
});

//get request deel3
app.get("/data",(request, response)=>{
  sql="SELECT * FROM data";
  try{
    const queryObject =url.parse(request.url,true).query// deel4: query parameters 
    if (queryObject.field && queryObject.type){ sql+=` WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`};// deel4: '%..%' betekend "bevat dat string". bv type is film en bevat het woord Wars
    /*
    db.all: Dit is een method van de sqlite3. We gebruiken deze om een query te runnen en de rijen van de databas te bekomen als resultaat.  
    sql: Dit is de variabele die de SQL query bevat.
    []: Dit is een array van parameters die gebruikt kunnen worden in de SQL query. in dit voorbeeld is het leeg, er zijn geen parameters gebruikt.
    (err, rows) => { ... }: Dit is een callback function dat opgeroepen wordt nadat de query uitgevoerd wordt. Het heeft twee parameters: 
       err: Als er zich een fout voordoet tijdens het uitvoeren van de query, wordt hier informatie in gezet over de error.
       rows: Een array van objects dat de rijen voorsteld als resultaat van de query. Elk object stelt een rij voor in de database. 
    */ 
    db.all(sql, [], (err, rows)=>{
      if (err) return response.json({status: 300, success:false, error:err});
      if (rows.length <1) return response.json({status:300, success:false, error:"geen data"});
      console.log('data van sqlite')
      return response.json({status:200, data:rows, success:true});
    });
  }catch (error){
    return response.json({
      status:400,   //Bad Request, dit sturen we terug wanneer we een error of een fout hebben.
      success:false
    });
  }
});


app.listen(3000);   // listen is een method van express. we luisteren naar poort 3000, in postman sturen we naar poort 3000
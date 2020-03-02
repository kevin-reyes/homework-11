// import all of the node modules we installed and need to run this app 
const mysql = require("mysql");
const express = require("express");
const path = require ("path")
const {readFile, writeFile} = require ('fs');

// create an express application
const app = express();
const PORT = 8000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'))

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})

app.get('/notes', function(req,res){
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})

app.get('/api/notes', function(req,res){
  readFile('./Develop/db/db.json', 'utf-8', function(err,data){
    res.json(data)
  })
})

app.post('/api/notes', function(req,res){
  readFile('./Develop/db/db.json', 'utf-8', function(err,data){
    const dataArr = JSON.parse(data);
    dataArr.push(req.body)
    writeFile('./Develop/db/db.json', JSON.stringify(dataArr), function(err){
      if(err)throw err;
      res.send('ok')
    })
  })
})

app.delete('/api/notes/:id', function(req,res){
  readFile('./Develop/db/db.json', 'utf-8', function(err,data){
    const dataArr = JSON.parse(data);
    dataArr.splice(req.params.id,1)
    writeFile('./Develop/db/db.json', JSON.stringify(dataArr), function(err){
      if(err)throw err;
      res.send('ok')
    })
  })
})





// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
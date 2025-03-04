// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//date send
app.get('/api/:date?',(req,res) =>{
  let date = moment(req.params.date, ['YYYYMMD','DDMMMMY', 'MMMMDDY','x']).format();
  if(req.params.date === undefined){
    date = new Date();
    res.send({"unix": Date.parse(date), "utc":date.toUTCString()});
  }
  else if(date !== 'Invalid date'){
    date = new Date(date);
    res.send({"unix":Date.parse(date),"utc":date.toUTCString()});
  }
  else res.send({error: "Invalid Date"});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

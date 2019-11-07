//jshint eversion:6

const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
    
    
});

app.post('/',function(req,res){  
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount
    // var baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/'
    // var finalURL = baseURL + crypto + fiat;
    var options = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }

    }
    request(options, function(error,response,body){

    var data = JSON.parse(body);
    var price = data.price;  
    
     
    var currentDate = data.time;
        
    res.write("<h1>" + amount + " of " + crypto + " is currently worths " + price +  " " + fiat +"</h1>")

    res.write("<p> As of " + currentDate + " </p>");
    res.send();   
    
});
});

app.listen(3000,function(){
    console.log('Server is starting on port 3000');    
});
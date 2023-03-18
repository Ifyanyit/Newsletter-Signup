const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const  app = express();

app.use(express.static("public")); // to serve static files like css and imagies
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    const first_name = req.body.f_name;
    const last_name = req.body.l_name;
    const email_id = req.body.email;

    const data = {
        members: [
            {
                email_address: email_id,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    } ;

    const jsonData = JSON.stringify(data);

    const url = process.env.URL;

    const options = {
        method: "POST",
        auth: procees.env.AUTH;
    }

    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        };
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req, res){
    res.redirect("/");
});

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})

//mailchimp Api
// 366fdd2ff9c57f2799822b5a4977de75-us21
// b0aa09e21f460b6f83f372932f0debf6-us21

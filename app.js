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

    const url = "https://us21.api.mailchimp.com/3.0/lists/fe3bb3e650";

    const options = {
        method: "POST",
        auth: "ifyanyi1:0250324c18ad4181d986633d39f351ac-us21"
    }

    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.send(__dirname + "/failure.html");
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


app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000.")
})

//mailchimp Api
// 366fdd2ff9c57f2799822b5a4977de75-us21
// 0250324c18ad4181d986633d39f351ac-us21
//id s  fe3bb3e650
const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

 const app=express();
 app.use(express.static("public"));  
 app.use(bodyparser.urlencoded({extended:true}));

 app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
 })
 app.listen(process.env.PORT|| 3000,function(){
     console.log("Server Started");
 })
 app.post("/",function(req,res)
 {
    const firstname= req.body.fname;
    const lastname=req.body.lname;
    const E_mail=req.body.email;
    console.log(firstname,lastname,E_mail);
   
    const data={
       members:[{
          email_address:E_mail,
          status:"subscribed",
          merge_fields:{
             FNAME:firstname,
             LNAME:lastname
          }
       }
      ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/7a87a4d001"
    const options={
       method:"POST",
       auth:"ari:3ed2e5e0dcf857d22585edad1aebfe56-us7"
    }

    const request=https.request(url,options,function(response){
       if(response.statusCode==200)
       {
          res.sendFile(__dirname+"/success.html");
       }
       else{
          res.sendFile(__dirname+"/failure.html");
       }
       response.on("data",function(data){
          console.log(JSON.parse(data))
       })
    })
    request.write(jsonData);
    request.end();
 })
   
 
//audience id: 7a87a4d001
//api key:3ed2e5e0dcf857d22585edad1aebfe56-us7
 
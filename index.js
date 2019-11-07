const mongo = require('mongodb').MongoClient

const express = require('express')
//initierar mongo och express

const connectionstring = "mongodb+srv://Samuel:samuel2001@cluster0-fa0m4.mongodb.net/test?retryWrites=true&w=majority"
//initierar en connection string från mongo atlas
Huvuddel()

const app = express()
//middlewear för att kunna parsa req.body

async function Huvuddel() {
    const con = await mongo.connect(connectionstring,{ useNewUrlParser: true, useUnifiedTopology: true });

    const db = await con.db("min-matsedel")

    const col = await db.collection("veckansmat")
    //skapar en databas

    
    
    app.use(express.urlencoded({extended:false}))
    app.listen(5555,function(){
    console.log("port:5555")
    })
    //koppar "app objektet" till vår kollektion

    //col.deleteMany()
    app.veckansmat = col
    require("./create")(app)




    
   
}

app.get("/",function(req,res){
    res.send("test W")
})
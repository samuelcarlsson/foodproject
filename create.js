const objectId = require("mongodb").ObjectID

const renderHtml = require("./render-html")

module.exports = async function (app) {
    app.get("/food", async function(req,res){
        try {
            const main = await app.veckansmat.find().toArray()

            let html = main.reverse().map(function(mat){
            
            return `
            <h2>${mat.food}</h2>
            <h3>${mat.instruktion}</h3>
            <h4>${mat.ingredienser}</h4>
            <a href="/food/delete/${mat.id}"> Delete </a>          
            `               
            })
            
            res.send(renderHtml("all food",html.join("")))

        } catch (error) {
            console.log(error)
            res.send("error!")
        }
    })

    app.get("/food/new", async function(req,res){
        res.sendFile(__dirname+"/main.html")
    })
    app.post("/food/new", async function(req,res){
        try {           
            await app.veckansmat.insertOne(req.body)
            res.redirect("/food")
        } catch (error) {
            console.log(error)
            res.send("food creating error")
        }
    })
}
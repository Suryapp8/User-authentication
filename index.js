const express =  require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;

app.use(expressEjsLayouts)
//extract style and script from sub pages



app.use(express.static("./assets"))
app.set("layout extractStyles" , true)
app.set("layout extractScripts" , true)

app.get("/" , require("./routes/index"))
app.use("/user" , require("./routes/user"))
// app.use("/user" , require("./routes/postUser"))

app.set("view engine" , "ejs");
app.set("views" , "./views")

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`)
    }
    console.log("Server is running on " , port)
})
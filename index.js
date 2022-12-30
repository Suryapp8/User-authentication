const express =  require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const db = require("./config/mongoose")
const cookieParser = require("cookie-parser")
app.use(expressEjsLayouts)
const session = require("express-session")
const passport = require("passport")
const passportLocal = require("./config/passpot-strategy")
const MongoStore = require("connect-mongo")(session)
const sassMiddleware = require("node-sass-middleware")
//extract style and script from sub pages



app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    // debug: true,
    outputStyle : "extended",
    prefix: "/css"
}))

app.use(express.static("./assets"))
app.set("layout extractStyles" , true)
app.set("layout extractScripts" , true)

app.use(express.urlencoded())

app.use(cookieParser())


// app.use("/user" , require("./routes/postUser"))

app.set("view engine" , "ejs");
app.set("views" , "./views")

//mongo store is used to store the session cookie

app.use(session({
    name: "codial",
    secret: "something",
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: "disabled"
        },
        function(err){
            console.log(err || "connect mongo setup")
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUSer)

app.get("/" , require("./routes/index"))
app.use("/user" , require("./routes/user"))
app.use("/posts" , require("./routes/posts"))


app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`)
    }
    console.log("Server is running on " , port)
})
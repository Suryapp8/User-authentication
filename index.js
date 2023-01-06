const express =  require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const db = require("./config/mongoose")
const cookieParser = require("cookie-parser")
app.use(expressEjsLayouts)
const session = require("express-session")
const passport = require("passport")
const passportJWT = require("./config/passport-jwt-strategy")
const passportLocal = require("./config/passpot-strategy")
const MongoStore = require("connect-mongo")(session)
const sassMiddleware = require("node-sass-middleware")
const flash = require("connect-flash")
const customMiddleware = require("./config/middleware")
const passportGoogle = require("./config/passport-google-oauth2-strategy")
const chatServer = require('http').Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
var cors = require('cors');
app.use(cors())
console.log("chat server is on port 5000")
const env = require("./config/environment")
const path = require("path")
//extract style and script from sub pages



app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, "scss"),
    dest: "./assets/css",
    // debug: true,
    outputStyle : "extended",
    prefix: "/css"
}))

app.use(express.static("env.asset_path"))
app.set("layout extractStyles" , true)
app.set("layout extractScripts" , true)

app.use(express.urlencoded())

app.use(cookieParser())

app.use("/uploads" ,express.static(__dirname + "/uploads"))


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
app.use(flash())
app.use(customMiddleware.setFlash)

app.get("/" , require("./routes/index"))
app.use("/user" , require("./routes/user"))
app.use("/posts" , require("./routes/posts"))
app.use('/comments', require('./routes/comments'));
app.use("/api" , require("./routes/api"))
app.use("/api" , require("./routes/api"))
app.use('/likes', require('./routes/likes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`)
    }
    console.log("Server is running on " , port)
})